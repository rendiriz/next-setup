'use client';

import { FormElementQuestion } from '@/components/form/form-element-question';
import { FormElementTitle } from '@/components/form/form-element-title';
import { getRoundedElementClass } from '@/utils/getRoundedElementClass';

import { observer } from '@legendapp/state/react';

import { store } from '../_stores/store';

const content = [
  {
    section: 1,
    question: [
      {
        id: '1-1',
        type: 'question',
      },
      {
        id: '1-2',
        type: 'title',
      },
      {
        id: '1-3',
        type: 'question',
      },
    ],
  },
  {
    section: 2,
    question: [
      {
        id: '2-1',
        type: 'title',
      },
    ],
  },
];

export const FormBuilder = observer(() => {
  const activeElement = store.activeElement.get();

  return (
    <div className="asd mx-auto max-w-3xl p-4">
      {content.map((section, sectionIndex) => (
        <section key={sectionIndex}>
          {/* Header */}
          {content.length > 1 && (
            <div className="flex">
              <div className="rounded-t-lg bg-[var(--builder-color)] px-4 py-2 text-[var(--builder-text-color)]">
                Section {sectionIndex + 1} of {content.length}
              </div>
            </div>
          )}

          {section.question &&
            section.question.map((element, elementIndex) => (
              <div
                key={elementIndex}
                className="mb-4"
              >
                {element.type === 'title' && (
                  <FormElementTitle
                    data={element}
                    isMain={content[0].question[0].id === element.id}
                    rounded={getRoundedElementClass(elementIndex, section.question.length)}
                    isActive={activeElement === element.id}
                    onElementClick={(id) => {
                      store.activeElement.set(id);
                    }}
                  />
                )}
                {element.type === 'question' && (
                  <FormElementQuestion
                    data={element}
                    isMain={content[0].question[0].id === element.id}
                    rounded={getRoundedElementClass(elementIndex, section.question.length)}
                    isActive={activeElement === element.id}
                    onElementClick={(id) => {
                      store.activeElement.set(id);
                    }}
                  />
                )}
              </div>
            ))}
        </section>
      ))}
    </div>
  );
});
