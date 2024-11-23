import { ToggleGroupItem } from '@/components/ui/toggle-group';

import type { Editor } from '@tiptap/react';
import { List } from 'lucide-react';

interface FormToggleBulletedListProps {
  className?: string;
  editor: Editor;
}

export const FormToggleBulletedList = ({ editor }: FormToggleBulletedListProps) => {
  return (
    <ToggleGroupItem
      value="bulletList"
      aria-label="Toggle bulleted list"
      onClick={() => editor.chain().focus().toggleBulletList().run()}
      data-state={editor.isActive('bulletList') ? 'on' : 'off'}
    >
      <List className="size-4" />
    </ToggleGroupItem>
  );
};
