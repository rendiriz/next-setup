'use client';

import './style.css';

import { useState } from 'react';

import { FormToggleBold } from '@/components/form/form-toggle-bold';
import { FormToggleItalic } from '@/components/form/form-toggle-italic';
import { FormToggleLink } from '@/components/form/form-toggle-link';
import { FormToggleRemoveFormatting } from '@/components/form/form-toggle-remove-formatting';
import { FormToggleUnderline } from '@/components/form/form-toggle-underline';
import { Separator } from '@/components/ui/separator';
import { ToggleGroup } from '@/components/ui/toggle-group';
import { useClickDetection } from '@/hooks/useClickDetection';
import { inter } from '@/lib/fonts';
import { cn } from '@/lib/utils';

import { observer } from '@legendapp/state/react';
import Bold from '@tiptap/extension-bold';
import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import History from '@tiptap/extension-history';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import Paragraph from '@tiptap/extension-paragraph';
import Placeholder from '@tiptap/extension-placeholder';
import Text from '@tiptap/extension-text';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';

// import { useEditorStore } from './store';

interface FormTitleProps {
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setting?: any; // TODO: types
  value?: Record<string, unknown>;
}

const initialSetting = {
  fontFamily: {
    class: inter.variable,
    variable: 'var(--font-inter)',
  },
  fontSize: 28,
  color: '#673ab7',
};

const initialValue = {
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
};

export const FormTitle = observer(({ setting = initialSetting, value = initialValue }: FormTitleProps) => {
  const { isTargetClicked, ref } = useClickDetection();
  const [editorContent, setEditorContent] = useState<Record<string, unknown>>(value);

  const editor = useEditor({
    extensions: [
      Document.extend({
        content: 'heading',
      }),
      Paragraph,
      Text,
      Heading.configure({
        levels: [1],
      }),
      Placeholder.configure({
        placeholder: 'Form title',
      }),
      Bold,
      Italic,
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
      }),
      History,
    ],
    editorProps: {
      attributes: {
        class: cn(
          'prose focus:outline-none',
          setting.fontFamily.class,
          'prose-h1:font-[family-name:var(--title-font-family)]',
          'prose-h1:text-[length:var(--title-font-size)]',
        ),
      },
    },
    content: editorContent,
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getJSON());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <div ref={ref}>
        <EditorContent
          style={
            {
              '--title-font-family': setting.fontFamily.variable,
              '--title-font-size': `${setting.fontSize}px`,
            } as React.CSSProperties
          }
          editor={editor}
        />

        <Separator
          style={
            {
              '--title-color': setting.color,
            } as React.CSSProperties
          }
          className={cn('my-2 h-[2px]', isTargetClicked ? 'bg-[var(--title-color)]' : 'bg-border')}
        />

        <ToggleGroup
          type="multiple"
          className={cn('justify-start', isTargetClicked ? 'flex' : 'hidden')}
        >
          <FormToggleBold editor={editor} />
          <FormToggleItalic editor={editor} />
          <FormToggleUnderline editor={editor} />
          <FormToggleLink editor={editor} />
          <FormToggleRemoveFormatting editor={editor} />
        </ToggleGroup>
      </div>

      <Separator className="my-8" />

      <div className="text-xs">
        Value:
        <pre>{JSON.stringify(editorContent, null, 2)}</pre>
      </div>
    </>
  );
});
