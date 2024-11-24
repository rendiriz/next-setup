'use client';

import { FormQuestion } from '@/components/form/form-question';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { inter } from '@/lib/fonts';
import { cn } from '@/lib/utils';

import { observable } from '@legendapp/state';
import { observer } from '@legendapp/state/react';

const setting = {
  questionFontFamily: {
    class: inter.variable,
    variable: 'var(--font-inter)',
  },
  questionFontSize: 18,
  color: '#673ab7',
};

const initialValue = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
    },
  ],
};

export interface StoreType {
  value: Record<string, unknown>;
  isActive: boolean;
  isEditable: boolean;
  isRequired: boolean;
}

export const store = observable<StoreType>({
  value: initialValue,
  isActive: false,
  isEditable: true,
  isRequired: false,
});

export const Demo = observer(() => {
  const value = store.value.get();
  const isActive = store.isActive.get();
  const isEditable = store.isEditable.get();
  const isRequired = store.isRequired.get();

  return (
    <>
      <div
        style={
          {
            '--builder-question-font-family': setting.questionFontFamily.variable,
            '--builder-question-font-size': `${setting.questionFontSize}px`,
            '--builder-color': setting.color,
          } as React.CSSProperties
        }
        className={cn(setting.questionFontFamily.class)}
      >
        <FormQuestion
          isActive={isActive}
          isEditable={isEditable}
          isRequired={isRequired}
          value={value}
          onChangeValue={(value) => store.value.set(value)}
        />
      </div>

      <Separator className="my-8" />

      <div className="flex flex-col space-y-2">
        <div>State:</div>
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
        <pre className="text-xs">{JSON.stringify(value, null, 2)}</pre>
      </div>
    </>
  );
});
