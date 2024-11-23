import { ToggleGroupItem } from '@/components/ui/toggle-group';

import type { Editor } from '@tiptap/react';
import { Underline } from 'lucide-react';

interface FormToggleUnderlineProps {
  className?: string;
  editor: Editor;
}

export const FormToggleUnderline = ({ editor }: FormToggleUnderlineProps) => {
  return (
    <ToggleGroupItem
      value="underline"
      aria-label="Toggle underline"
      onClick={() => editor.chain().focus().toggleUnderline().run()}
      data-state={editor.isActive('underline') ? 'on' : 'off'}
    >
      <Underline className="size-4" />
    </ToggleGroupItem>
  );
};
