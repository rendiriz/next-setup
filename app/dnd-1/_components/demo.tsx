/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { observer } from '@legendapp/state/react';

import { store } from '../_stores/dnd';
import { FormElement } from './form-element';
import { FormSection } from './form-section';

export const Demo = observer(() => {
  const [activeElement, setActiveElement] = useState<any>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Element') {
      setActiveElement(event.active.data.current.element);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveElement(null);

    const { active, over } = event;
    if (!over) return;

    const activeElement = store.elements.get().find((t) => t.id === active.id);
    const overElement = store.elements.get().find((t) => t.id === over.id);

    if (!activeElement) return;

    if (overElement) {
      const activeIndex = store.elements.get().findIndex((t) => t.id === active.id);
      const overIndex = store.elements.get().findIndex((t) => t.id === over.id);

      if (activeIndex !== overIndex) {
        const newElements = arrayMove(store.elements.get(), activeIndex, overIndex).map((element, index) => ({
          ...element,
          order: index,
        }));
        store.reorderElements(newElements);
      }
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAElement = active.data.current?.type === 'Element';
    const isOverASection = store.sections.get().some((col) => col.id === String(overId));

    if (isActiveAElement && isOverASection) {
      store.updateElement(String(activeId), overId as string);
    }
  };

  const sortedSections = [...store.sections.get()].sort((a, b) => a.order - b.order);
  const sortedElements = [...store.elements.get()].sort((a, b) => a.order - b.order);

  return (
    <>
      <div className="flex space-x-2">
        <Button onClick={() => store.addSection()}>Add Section</Button>
      </div>

      <Separator className="my-8" />

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <div className="space-y-6">
          {sortedSections.map((section, index) => (
            <FormSection
              key={section.id}
              index={index}
              id={section.id}
              sectionId={section.id}
              elements={sortedElements.filter((element) => element.sectionId === section.id)}
            />
          ))}
        </div>

        <DragOverlay>{activeElement ? <FormElement element={activeElement} /> : null}</DragOverlay>
      </DndContext>

      <Separator className="my-8" />

      <div className="flex flex-col space-y-2">
        <div>Value:</div>
        <pre className="text-xs">{JSON.stringify(store.sections.get(), null, 2)}</pre>
        <pre className="text-xs">{JSON.stringify(store.elements.get(), null, 2)}</pre>
      </div>
    </>
  );
});
