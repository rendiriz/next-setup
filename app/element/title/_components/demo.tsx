'use client';

import { FormElementTitle } from '@/components/form/form-element-title';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { inter } from '@/lib/fonts';

import { observable } from '@legendapp/state';
import { observer } from '@legendapp/state/react';

const setting = {
  headerFontFamily: {
    class: inter.variable,
    variable: 'var(--font-inter)',
  },
  headerFontSize: 28,
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
    title: Record<string, unknown>;
    description: Record<string, unknown>;
  };
  isMain: boolean;
  isActive: boolean;
  isEditable: boolean;
  showDescription: boolean;
}

export const store = observable<StoreType>({
  activeElement: '',
  value: {
    id: 'element-ansk8',
    type: 'title',
    title: {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: {
            level: 1,
          },
          content: [
            {
              type: 'text',
              text: 'Untitled form',
            },
          ],
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
  },
  isMain: true,
  isActive: false,
  isEditable: true,
  showDescription: true,
});

export const Demo = observer(() => {
  const value = store.value.get();
  // const activeElement = store.activeElement.get();
  const isMain = store.isMain.get();
  const isActive = store.isActive.get();
  const isEditable = store.isEditable.get();
  const showDescription = store.showDescription.get();

  return (
    <>
      <div
        style={
          {
            '--builder-title-font-family': setting.headerFontFamily.variable,
            '--builder-title-font-size': `${setting.headerFontSize}px`,
            '--builder-description-font-family': setting.textFontFamily.variable,
            '--builder-description-font-size': `${setting.textFontSize}px`,
            '--builder-color': setting.color,
          } as React.CSSProperties
        }
      >
        <FormElementTitle
          onElementClick={(id) => {
            store.activeElement.set(id);
          }}
          isMain={isMain}
          // isActive={activeElement === value.id}
          isActive={isActive}
          isEditable={isEditable}
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
      </div>

      <Separator className="my-8" />

      <div className="flex flex-col space-y-2">
        <div>Value:</div>
        <pre className="text-xs">{JSON.stringify(store.get(), null, 2)}</pre>
      </div>
    </>
  );
});
