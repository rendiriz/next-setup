'use client';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { store } from '@/stores/theme';

import { observer } from '@legendapp/state/react';
import { CheckIcon } from 'lucide-react';

const FONT_FAMILY = [
  {
    value: 'inter',
    label: 'Inter',
  },
  {
    value: 'roboto',
    label: 'Roboto',
  },
  {
    value: 'jakarta-plus-sans',
    label: 'Jakarta Plus Sans',
  },
];
const HEADER_FONT_SIZE = [18, 19, 20, 21, 22, 23, 24];
const QUESTION_FONT_SIZE = [12, 14, 16, 18];
const TEXT_FONT_SIZE = [12, 14, 16];
const COLOR = [
  {
    value: '#db4437',
    label: 'Red',
    background: [
      {
        value: '#fae3e1',
        label: 'Light',
      },
      {
        value: '#f6d0cd',
        label: 'Medium',
      },
      {
        value: '#f6f6f6',
        label: 'Gray',
      },
    ],
  },
  {
    value: '#673ab7',
    label: 'Purple',
    background: [
      {
        value: '#f0ebf8',
        label: 'Light',
      },
      {
        value: '#e1d8f1',
        label: 'Medium',
      },
      {
        value: '#f6f6f6',
        label: 'Gray',
      },
    ],
  },
];

export const ThemeTest = observer(() => {
  const theme = store.theme.get();
  const isLoading = store.isLoading.get();
  const headerFontFamily = store.headerFontFamily.get();
  const questionFontFamily = store.questionFontFamily.get();
  const textFontFamily = store.textFontFamily.get();

  return (
    <div>
      <p className="mb-8">{isLoading ? 'Saving...' : 'All changes saved'}</p>

      <div className="grid w-full items-center gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Header</Label>

          <div className="grid grid-cols-3 gap-4">
            <Select
              value={theme?.headerFontFamily}
              onValueChange={(value) => store.theme.set({ ...theme, headerFontFamily: value })}
            >
              <SelectTrigger className="col-span-2">
                <SelectValue placeholder="Select font family" />
              </SelectTrigger>
              <SelectContent>
                {FONT_FAMILY.map((item, index) => (
                  <SelectItem
                    key={index}
                    value={item.value}
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={theme?.headerFontSize.toString()}
              onValueChange={(value) => store.theme.set({ ...theme, headerFontSize: Number(value) })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select font size" />
              </SelectTrigger>
              <SelectContent>
                {HEADER_FONT_SIZE.map((item, index) => (
                  <SelectItem
                    key={index}
                    value={item.toString()}
                  >
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Question</Label>

          <div className="grid grid-cols-3 gap-4">
            <Select
              value={theme?.questionFontFamily}
              onValueChange={(value) => store.theme.set({ ...theme, questionFontFamily: value })}
            >
              <SelectTrigger className="col-span-2">
                <SelectValue placeholder="Select font family" />
              </SelectTrigger>
              <SelectContent>
                {FONT_FAMILY.map((item, index) => (
                  <SelectItem
                    key={index}
                    value={item.value}
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={theme?.questionFontSize.toString()}
              onValueChange={(value) => store.theme.set({ ...theme, questionFontSize: Number(value) })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select font size" />
              </SelectTrigger>
              <SelectContent>
                {QUESTION_FONT_SIZE.map((item, index) => (
                  <SelectItem
                    key={index}
                    value={item.toString()}
                  >
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Text</Label>

          <div className="grid grid-cols-3 gap-4">
            <Select
              value={theme?.textFontFamily}
              onValueChange={(value) => store.theme.set({ ...theme, textFontFamily: value })}
            >
              <SelectTrigger className="col-span-2">
                <SelectValue placeholder="Select font family" />
              </SelectTrigger>
              <SelectContent>
                {FONT_FAMILY.map((item, index) => (
                  <SelectItem
                    key={index}
                    value={item.value}
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={theme?.textFontSize.toString()}
              onValueChange={(value) => store.theme.set({ ...theme, textFontSize: Number(value) })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select font size" />
              </SelectTrigger>
              <SelectContent>
                {TEXT_FONT_SIZE.map((item, index) => (
                  <SelectItem
                    key={index}
                    value={item.toString()}
                  >
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Color</Label>

          <div className="flex gap-2">
            {COLOR.map((item, index) => (
              <div
                key={index}
                role="button"
                style={
                  {
                    '--form-color': item.value,
                  } as React.CSSProperties
                }
                className={cn(
                  'flex size-8 items-center justify-center rounded-full bg-[var(--form-color)] text-white',
                  item.value === theme?.color ? 'scale-110' : 'hover:scale-105',
                )}
                onClick={() =>
                  store.theme.set({ ...theme, color: item.value, backgroundColor: item.background[0].value })
                }
              >
                {item.value === theme?.color && <CheckIcon className="size-5" />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Background Color</Label>

          <div className="flex gap-2">
            {COLOR.find((item) => item.value === theme?.color)?.background.map((item, index) => (
              <div
                key={index}
                role="button"
                style={
                  {
                    '--form-color': item.value,
                  } as React.CSSProperties
                }
                className={cn(
                  'flex size-8 items-center justify-center rounded-full bg-[var(--form-color)]',
                  item.value === theme?.backgroundColor ? 'scale-110' : 'hover:scale-105',
                )}
                onClick={() => store.theme.set({ ...theme, backgroundColor: item.value })}
              >
                {item.value === theme?.backgroundColor && <CheckIcon className="size-5" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      <div
        style={
          {
            '--header-font-family': headerFontFamily.variable,
            '--header-font-size': `${theme?.headerFontSize}px`,
            '--question-font-family': questionFontFamily.variable,
            '--question-font-size': `${theme?.questionFontSize}px`,
            '--text-font-family': textFontFamily.variable,
            '--text-font-size': `${theme?.textFontSize}px`,
          } as React.CSSProperties
        }
        className={cn(
          'prose',
          headerFontFamily.class,
          'prose-h1:font-[family-name:var(--header-font-family)]',
          'prose-h1:text-[length:var(--header-font-size)]',
          questionFontFamily.class,
          '[&>p.question]:font-[family-name:var(--question-font-family)]',
          '[&>p.question]:text-[length:var(--question-font-size)]',
          textFontFamily.class,
          'prose-p:font-[family-name:var(--text-font-family)]',
          'prose-p:text-[length:var(--text-font-size)]',
        )}
      >
        <h1>Heading</h1>
        <p>Lorem ipsum dollor sit amet</p>
        <p className="question">Question</p>
      </div>

      <Separator className="my-8" />

      <div className="text-xs">
        Value:
        <pre>{JSON.stringify(theme, null, 2)}</pre>
      </div>
    </div>
  );
});
