'use client';

import { FormDescription } from '@/components/form/form-description';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { inter } from '@/lib/fonts';
import { cn } from '@/lib/utils';

import { observable } from '@legendapp/state';
import { observer } from '@legendapp/state/react';

const setting = {
  textFontFamily: {
    class: inter.variable,
    variable: 'var(--font-inter)',
  },
  textFontSize: 16,
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
}

export const store = observable<StoreType>({
  value: initialValue,
  isActive: false,
  isEditable: true,
});

export const Demo = observer(() => {
  const value = store.value.get();
  const isActive = store.isActive.get();
  const isEditable = store.isEditable.get();

  return (
    <>
      <div
        style={
          {
            '--builder-description-font-family': setting.textFontFamily.variable,
            '--builder-description-font-size': `${setting.textFontSize}px`,
            '--builder-color': setting.color,
          } as React.CSSProperties
        }
        className={cn(setting.textFontFamily.class)}
      >
        <FormDescription
          isActive={isActive}
          isEditable={isEditable}
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
      </div>

      <Separator className="my-8" />

      <div className="flex flex-col space-y-2">
        <div>Value:</div>
        <pre className="text-xs">{JSON.stringify(value, null, 2)}</pre>
      </div>
    </>
  );
});
