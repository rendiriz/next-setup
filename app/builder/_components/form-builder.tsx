/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { FormElementQuestion } from '@/components/form/form-element-question';
import { FormElementTitle } from '@/components/form/form-element-title';
import { getRoundedElementClass } from '@/utils/getRoundedElementClass';

import { observer } from '@legendapp/state/react';

import { store, storeForm } from '../_stores/store';

export const FormBuilder = observer(() => {
  const activeElement = store.activeElement.get();
  // const status = storeForm.status.get();
  const form = storeForm.form.get();

  console.log(form);

  return <pre className="text-xs">{JSON.stringify(form, null, 2)}</pre>;

  // if (!form) return null;

  return (
    <div className="asd mx-auto max-w-3xl p-4">
      {form.form.sections.map((section: any, sectionIndex: number) => (
        <section key={section.id}>
          {/* Header */}
          {section.length > 1 && (
            <div className="flex">
              <div className="rounded-t-lg bg-[var(--builder-color)] px-4 py-2 text-[var(--builder-text-color)]">
                Section {sectionIndex + 1} of {section.length}
              </div>
            </div>
          )}

          {section.elements &&
            section.elements.map((element: any) => (
              <div
                key={element.id}
                className="mb-4"
              >
                {element.type === 'title' && (
                  <FormElementTitle
                    onElementClick={(id) => {
                      store.activeElement.set(id);
                    }}
                    isMain={true}
                    isActive={activeElement === section.id}
                    isEditable={true}
                    value={section}
                    onChangeValue={(newValue) => {
                      section.title.set(newValue);
                    }}
                    showDescription={section.isDescription}
                    onCopy={(id) => {
                      console.log('onCopy', id);
                    }}
                    onDelete={(id) => {
                      console.log('onDelete', id);
                    }}
                    onChangeShowDescription={(newValue) => {
                      // sections[sectionIndex].isDescription.set(newValue);
                      // sections[sectionIndex].set({
                      //   ...sections[sectionIndex].get(),
                      //   newValue
                      // });
                      // sections.set(prev => {
                      //   const updated = [...prev];
                      //   updated[index] = { ...updated[index], value };
                      //   return updated;
                      // });
                    }}
                  />
                )}

                {/* {element.type === 'question' && (
                  <FormElementQuestion
                    data={element}
                    isMain={content[0].question[0].id === element.id}
                    rounded={getRoundedElementClass(elementIndex, section.question.length)}
                    isActive={activeElement === element.id}
                    onElementClick={(id) => {
                      store.activeElement.set(id);
                    }}
                  />
                )} */}
              </div>
            ))}
        </section>
      ))}
    </div>
  );
});
