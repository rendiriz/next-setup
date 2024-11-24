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
import History from '@tiptap/extension-history';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import Paragraph from '@tiptap/extension-paragraph';
import Placeholder from '@tiptap/extension-placeholder';
import Text from '@tiptap/extension-text';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';

interface FormQuestionProps {
  className?: string;
  isActive: boolean;
  isEditable: boolean;
  isRequired: boolean;
  value: Record<string, unknown>;
  onChangeValue: ({ value }: Record<string, unknown>) => void;
}

export const FormQuestion = observer((props: FormQuestionProps) => {
  const { className, isActive, isEditable, isRequired, value, onChangeValue } = props;
  const { isTargetClicked, ref } = useClickDetection();

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Placeholder.configure({
        placeholder: 'Question',
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
          'prose-p:m-0',
          'prose-a:text-[hsl(var(--link))]',
          'prose-a:pointer',
          'prose-a:hover:text-[hsl(var(--link-hover))]',
          'prose-ol:list-decimal prose-ol:my-3 prose-ol:ml-2 prose-ol:mr-4 prose-ol:py-0 prose-ol:px-4',
          'prose-ul:list-disc prose-ul:my-3 prose-ul:ml-2 prose-ul:mr-4 prose-ul:py-0 prose-ul:px-4',
          'prose-li:m-0',
          '[&>ol>li]:marker:text-[hsl(var(--foreground))]',
          '[&>ul>li]:marker:text-[hsl(var(--foreground))]',
          'prose-p:font-[family-name:var(--question-font-family)]',
          'prose-p:text-[length:var(--question-font-size)]',
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
      <div className="flex space-x-2">
        <EditorContent
          className={cn(isEditable && 'w-full', isEditable && isActive ? 'bg-gray-50 p-4' : '')}
          editor={editor}
        />
        {!isEditable && isRequired ? <span className="text-red-500">*</span> : null}
      </div>

      {isEditable && isActive ? (
        <Separator
          className={cn('mb-2 h-[1px]', isTargetClicked ? 'bg-[var(--builder-color)]' : 'bg-border')}
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
