'use client';

import { FormElementQuestion } from '@/components/form/form-element-question';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { inter } from '@/lib/fonts';
import type { QuestionType, ValidationState } from '@/types/validation';

import { observable } from '@legendapp/state';
import { observer } from '@legendapp/state/react';

const setting = {
  questionFontFamily: {
    class: inter.variable,
    variable: 'var(--font-inter)',
  },
  questionFontSize: 18,
  textFontFamily: {
    class: inter.variable,
    variable: 'var(--font-inter)',
  },
  textFontSize: 16,
  color: '#673ab7',
};

export interface StoreType {
  activeElement: string;
  value: {
    id: string;
    type: 'title' | 'question';
    question: Record<string, unknown>;
    description: Record<string, unknown>;
    answer: {
      value: string;
      type: QuestionType;
      name: string;
      isPublished: boolean;
      isResponseValidation: boolean;
      validation: ValidationState;
    };
  };
  isMain: boolean;
  isActive: boolean;
  isEditable: boolean;
  isRequired: boolean;
  showDescription: boolean;
}

export const store = observable<StoreType>({
  activeElement: '',
  value: {
    id: 'element-9skdj',
    type: 'question',
    question: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
        },
      ],
    },
    description: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
        },
      ],
    },
    answer: {
      value: '',
      type: 'short-answer',
      name: 'short-answer-Ksd8w',
      isPublished: false,
      isResponseValidation: false,
      validation: {
        type: 'text',
        required: true,
        rule: 'contains',
        value: '',
        customError: '',
      },
    },
  },
  isMain: true,
  isActive: false,
  isEditable: true,
  isRequired: false,
  showDescription: false,
});

export const Demo = observer(() => {
  const value = store.value.get();
  // const activeElement = store.activeElement.get();
  const isMain = store.isMain.get();
  const isActive = store.isActive.get();
  const isEditable = store.isEditable.get();
  const isRequired = store.isRequired.get();
  const showDescription = store.showDescription.get();

  return (
    <>
      <div
        style={
          {
            '--builder-question-font-family': setting.questionFontFamily.variable,
            '--builder-question-font-size': `${setting.questionFontSize}px`,
            '--builder-description-font-family': setting.textFontFamily.variable,
            '--builder-description-font-size': `${setting.textFontSize}px`,
            '--builder-color': setting.color,
          } as React.CSSProperties
        }
      >
        <FormElementQuestion
          onElementClick={(id) => {
            store.activeElement.set(id);
          }}
          isMain={isMain}
          // isActive={activeElement === value.id}
          isActive={isActive}
          isEditable={isEditable}
          isRequired={isRequired}
          value={value}
          onChangeValue={(newValue) => {
            store.value.set(newValue);
          }}
          showDescription={showDescription}
          onCopy={(id) => {
            console.log('onCopy', id);
          }}
          onDelete={(id) => {
            console.log('onDelete', id);
          }}
          onChangeShowDescription={(newValue) => {
            store.showDescription.set(newValue);
          }}
        />
      </div>

      <Separator className="my-8" />

      <div className="flex flex-col space-y-2">
        <div>State:</div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="isMain"
            checked={isMain}
            onCheckedChange={() => store.isMain.toggle()}
          />
          <label
            htmlFor="isMain"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            isMain
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="isActive"
            checked={isActive}
            onCheckedChange={() => store.isActive.toggle()}
          />
          <label
            htmlFor="isActive"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            isActive
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="isEditable"
            checked={isEditable}
            onCheckedChange={() => store.isEditable.toggle()}
          />
          <label
            htmlFor="isEditable"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            isEditable
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="isRequired"
            checked={isRequired}
            onCheckedChange={() => store.isRequired.toggle()}
          />
          <label
            htmlFor="isRequired"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            isRequired
          </label>
        </div>
      </div>

      <Separator className="my-8" />

      <div className="flex flex-col space-y-2">
        <div>Value:</div>
        <pre className="text-xs">{JSON.stringify(store.get(), null, 2)}</pre>
      </div>
    </>
  );
});
