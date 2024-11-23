import { ToggleGroupItem } from '@/components/ui/toggle-group';

import type { Editor } from '@tiptap/react';
import { ListOrdered } from 'lucide-react';

interface FormToggleOrderedListProps {
  className?: string;
  editor: Editor;
}

export const FormToggleOrderedList = ({ editor }: FormToggleOrderedListProps) => {
  return (
    <ToggleGroupItem
      value="orderedList"
      aria-label="Toggle numbered list"
      onClick={() => editor.chain().focus().toggleOrderedList().run()}
      data-state={editor.isActive('orderedList') ? 'on' : 'off'}
    >
      <ListOrdered className="size-4" />
    </ToggleGroupItem>
  );
};
