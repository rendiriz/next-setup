import { ToggleGroupItem } from '@/components/ui/toggle-group';

import type { Editor } from '@tiptap/react';
import { Italic } from 'lucide-react';

interface FormToggleItalicProps {
  className?: string;
  editor: Editor;
}

export const FormToggleItalic = ({ editor }: FormToggleItalicProps) => {
  return (
    <ToggleGroupItem
      value="italic"
      aria-label="Toggle italic"
      onClick={() => editor.chain().focus().toggleItalic().run()}
      data-state={editor.isActive('italic') ? 'on' : 'off'}
    >
      <Italic className="size-4" />
    </ToggleGroupItem>
  );
};
