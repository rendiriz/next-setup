'use client';

import './style.css';

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

interface FormDescriptionProps {
  className?: string;
  isActive: boolean;
  isEditable: boolean;
  value: Record<string, unknown>;
  onChangeValue: (value: Record<string, unknown>) => void;
}

export const FormDescription = observer((props: FormDescriptionProps) => {
  const { className, isActive, isEditable, value, onChangeValue } = props;
  const { isTargetClicked, ref } = useClickDetection();

  const editor = useEditor({
    immediatelyRender: true,
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
          'prose-a:text-[hsl(var(--link))]',
          'prose-a:pointer',
          'prose-a:hover:text-[hsl(var(--link-hover))]',
          'prose-ol:list-decimal prose-ol:my-3 prose-ol:ml-2 prose-ol:mr-4 prose-ol:py-0 prose-ol:px-4',
          'prose-ul:list-disc prose-ul:my-3 prose-ul:ml-2 prose-ul:mr-4 prose-ul:py-0 prose-ul:px-4',
          'prose-li:m-0',
          '[&>ol>li]:marker:text-[hsl(var(--foreground))]',
          '[&>ul>li]:marker:text-[hsl(var(--foreground))]',
          'prose-p:font-[family-name:var(--builder-description-font-family)]',
          'prose-p:text-[length:var(--builder-description-font-size)]',
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
      className={cn(className)}
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
        <FormToggleOrderedList editor={editor} />
        <FormToggleBulletedList editor={editor} />
        <FormToggleRemoveFormatting editor={editor} />
      </ToggleGroup>
    </div>
  );
});
