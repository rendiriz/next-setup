'use client';

import './style.css';

import { FormToggleBold } from '@/components/form/form-toggle-bold';
import { FormToggleItalic } from '@/components/form/form-toggle-italic';
import { FormToggleLink } from '@/components/form/form-toggle-link';
import { FormToggleRemoveFormatting } from '@/components/form/form-toggle-remove-formatting';
import { FormToggleUnderline } from '@/components/form/form-toggle-underline';
import { Separator } from '@/components/ui/separator';
import { ToggleGroup } from '@/components/ui/toggle-group';
import { useClickDetection } from '@/hooks/useClickDetection';
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

interface FormTitleProps {
  className?: string;
  isActive: boolean;
  isEditable: boolean;
  value: Record<string, unknown>;
  onChangeValue: ({ value }: Record<string, unknown>) => void;
}

export const FormTitle = observer((props: FormTitleProps) => {
  const { className, isActive, isEditable, value, onChangeValue } = props;
  const { isTargetClicked, ref } = useClickDetection();

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
          'prose-a:text-[hsl(var(--link))]',
          'prose-a:pointer',
          'prose-a:hover:text-[hsl(var(--link-hover))]',
          'prose-h1:font-[family-name:var(--builder-title-font-family)]',
          'prose-h1:text-[length:var(--builder-title-font-size)]',
        ),
      },
    },
    editable: isEditable,
    content: value,
    onUpdate: ({ editor }) => {
      onChangeValue(editor.getJSON());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div
      ref={isEditable ? ref : null}
      className={cn('pb-2', className)}
    >
      <EditorContent editor={editor} />

      {isEditable && isActive ? (
        <Separator
          className={cn('my-2 h-[1px]', isTargetClicked ? 'bg-[var(--builder-color)]' : 'bg-border')}
        />
      ) : null}

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
  );
});
