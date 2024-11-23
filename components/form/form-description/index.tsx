'use client';

import './style.css';

import { useState } from 'react';

import { FormToggleBold } from '@/components/form/form-toggle-bold';
import { FormToggleBulletedList } from '@/components/form/form-toggle-bulleted-list';
import { FormToggleItalic } from '@/components/form/form-toggle-italic';
import { FormToggleLink } from '@/components/form/form-toggle-link';
import { FormToggleOrderedList } from '@/components/form/form-toggle-ordered-list';
import { FormToggleRemoveFormatting } from '@/components/form/form-toggle-remove-formatting';
import { FormToggleUnderline } from '@/components/form/form-toggle-underline';
import { Separator } from '@/components/ui/separator';
import { ToggleGroup } from '@/components/ui/toggle-group';
import { useClickDetection } from '@/hooks/useClickDetection';
import { inter } from '@/lib/fonts';
import { cn } from '@/lib/utils';

import { observer } from '@legendapp/state/react';
import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import Document from '@tiptap/extension-document';
import History from '@tiptap/extension-history';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Placeholder from '@tiptap/extension-placeholder';
import Text from '@tiptap/extension-text';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';

// import { useEditorStore } from './store';

interface FormDescriptionProps {
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
  fontSize: 16,
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

export const FormDescription = observer(
  ({ setting = initialSetting, value = initialValue }: FormDescriptionProps) => {
    const { isTargetClicked, ref } = useClickDetection();
    const [editorContent, setEditorContent] = useState<Record<string, unknown>>(value);

    const editor = useEditor({
      extensions: [
        Document,
        Paragraph,
        Text,
        Placeholder.configure({
          placeholder: 'Form Description',
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
        ListItem,
        OrderedList,
        BulletList,
        History,
      ],
      editorProps: {
        attributes: {
          class: cn(
            'prose focus:outline-none',
            'prose-p:m-0',
            'prose-ol:list-decimal prose-ol:my-3 prose-ol:ml-2 prose-ol:mr-4 prose-ol:py-0 prose-ol:px-4',
            'prose-ul:list-disc prose-ul:my-3 prose-ul:ml-2 prose-ul:mr-4 prose-ul:py-0 prose-ul:px-4',
            'prose-li:m-0',
            '[&>ol>li]:marker:text-[hsl(var(--foreground))]',
            '[&>ul>li]:marker:text-[hsl(var(--foreground))]',
            setting.fontFamily.class,
            'prose-p:font-[family-name:var(--description-font-family)]',
            'prose-p:text-[length:var(--description-font-size)]',
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
                '--description-font-family': setting.fontFamily.variable,
                '--description-font-size': `${setting.fontSize}px`,
              } as React.CSSProperties
            }
            editor={editor}
          />

          <Separator
            style={
              {
                '--description-color': setting.color,
              } as React.CSSProperties
            }
            className={cn('my-2 h-[2px]', isTargetClicked ? 'bg-[var(--description-color)]' : 'bg-border')}
          />

          <ToggleGroup
            type="multiple"
            className={cn('justify-start', isTargetClicked ? 'flex' : 'hidden')}
          >
            <FormToggleBold editor={editor} />
            <FormToggleItalic editor={editor} />
            <FormToggleUnderline editor={editor} />
            <FormToggleLink editor={editor} />
            <FormToggleOrderedList editor={editor} />
            <FormToggleBulletedList editor={editor} />
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
  },
);
