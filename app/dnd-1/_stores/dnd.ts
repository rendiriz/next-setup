import { observable } from '@legendapp/state';
import { ObservablePersistLocalStorage } from '@legendapp/state/persist-plugins/local-storage';
import { syncObservable } from '@legendapp/state/sync';
import { nanoid } from 'nanoid';

export type Status = string;

export type Section = {
  id: string;
  title: string;
  order: number;
};

export type Element = {
  id: string;
  sectionId: Status;
  type: 'title' | 'question';
  title: string;
  order: number;
};

type FormStore = {
  sections: Section[];
  elements: Element[];
  // State
  activeElement: string | null;
  // Action
  addSection: () => void;
  addSectionAfter: (afterSectionId: string) => void;
  duplicateSection: (sectionId: string) => void;
  deleteSection: (sectionId: string) => void;
  addElement: (element: Omit<Element, 'id' | 'createdAt' | 'order'>) => void;
  addElementAfter: (afterElementId: string, element: Omit<Element, 'id' | 'createdAt' | 'order'>) => void;
  duplicateElement: (elementId: string) => void;
  deleteElement: (elementId: string) => void;
  updateElement: (id: string, sectionId: Status) => void;
  reorderSections: (sections: Section[]) => void;
  reorderElements: (elements: Element[]) => void;
};

const defaultSections: Section[] = [{ id: nanoid(), title: 'Section', order: 0 }];

export const store = observable<FormStore>({
  sections: defaultSections,
  elements: [],
  // State
  activeElement: null,
  // Action
  addSection: () => {
    const id = nanoid();
    const sections = store.sections.get();
    const maxOrder = Math.max(...sections.map((c) => c.order), -1);
    store.sections.push({
      id,
      title: 'Section',
      order: maxOrder + 1,
    });
  },
  addSectionAfter: (afterSectionId: string) => {
    const id = nanoid();
    const sections = store.sections.get();
    const afterSection = sections.find((col) => col.id === afterSectionId);
    if (!afterSection) return;

    const updatedSections = sections.map((col) => ({
      ...col,
      order: col.order > afterSection.order ? col.order + 1 : col.order,
    }));

    updatedSections.push({
      id,
      title: 'Section',
      order: afterSection.order + 1,
    });

    store.sections.set(updatedSections.sort((a, b) => a.order - b.order));
  },
  duplicateSection: (sectionId: string) => {
    const sections = store.sections.get();
    const sectionIndex = sections.findIndex((col) => col.id === sectionId);
    if (sectionIndex === -1) return;

    const sectionToDuplicate = sections[sectionIndex];
    const newId = nanoid();

    const updatedSections = sections.map((col) => ({
      ...col,
      order: col.order > sectionToDuplicate.order ? col.order + 1 : col.order,
    }));

    updatedSections.push({
      id: newId,
      title: `${sectionToDuplicate.title} Copy`,
      order: sectionToDuplicate.order + 1,
    });

    store.sections.set(updatedSections.sort((a, b) => a.order - b.order));

    const elementsInSection = store.elements.get().filter((element) => element.sectionId === sectionId);
    elementsInSection.forEach((element) => {
      store.addElement({
        type: element.type,
        title: element.title,
        sectionId: newId,
      });
    });
  },
  deleteSection: (id: string) => {
    const sections = store.sections.get();
    const deletedSection = sections.find((col) => col.id === id);
    if (!deletedSection) return;

    const updatedSections = sections
      .filter((col) => col.id !== id)
      .map((col) => ({
        ...col,
        order: col.order > deletedSection.order ? col.order - 1 : col.order,
      }));

    store.sections.set(updatedSections);
    store.elements.set((elements) => elements.filter((element) => element.sectionId !== id));
  },
  addElement: (element: Omit<Element, 'id' | 'createdAt' | 'order'>) => {
    const elementsInStatus = store.elements.get().filter((t) => t.sectionId === element.sectionId);
    const maxOrder = Math.max(...elementsInStatus.map((t) => t.order), -1);

    store.elements.push({
      ...element,
      id: nanoid(),
      order: maxOrder + 1,
    });
  },
  addElementAfter: (afterElementId: string, element: Omit<Element, 'id' | 'createdAt' | 'order'>) => {
    const elements = store.elements.get();
    const afterElement = elements.find((t) => t.id === afterElementId);
    if (!afterElement) return;

    // const elementsInStatus = elements.filter((t) => t.sectionId === element.sectionId);
    const updatedElements = elements.map((t) => ({
      ...t,
      order: t.sectionId === element.sectionId && t.order > afterElement.order ? t.order + 1 : t.order,
    }));

    const newElement = {
      ...element,
      id: nanoid(),
      createdAt: new Date(),
      order: afterElement.order + 1,
    };

    store.elements.set([...updatedElements, newElement].sort((a, b) => a.order - b.order));
  },
  duplicateElement: (elementId: string) => {
    const elements = store.elements.get();
    const elementToDuplicate = elements.find((t) => t.id === elementId);
    if (!elementToDuplicate) return;

    store.addElementAfter(elementId, {
      type: elementToDuplicate.type,
      title: `${elementToDuplicate.title} Copy`,
      sectionId: elementToDuplicate.sectionId,
    });
  },
  deleteElement: (id: string) => {
    store.elements.set((elements) => elements.filter((element) => element.id !== id));
  },
  updateElement: (id: string, sectionId: Status) => {
    const elementsInNewStatus = store.elements.get().filter((t) => t.sectionId === sectionId);
    const maxOrder = Math.max(...elementsInNewStatus.map((t) => t.order), -1);

    store.elements.set((elements) =>
      elements.map((element) =>
        element.id === id ? { ...element, sectionId, order: maxOrder + 1 } : element,
      ),
    );
  },
  reorderSections: (sections: Section[]) => {
    store.sections.set(sections);
  },
  reorderElements: (elements: Element[]) => {
    store.elements.set(elements);
  },
});

syncObservable(store, {
  persist: {
    name: 'form',
    plugin: ObservablePersistLocalStorage,
  },
});
