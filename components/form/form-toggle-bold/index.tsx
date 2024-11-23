import { ToggleGroupItem } from '@/components/ui/toggle-group';

import type { Editor } from '@tiptap/react';
import { Bold } from 'lucide-react';

interface FormToggleBoldProps {
  className?: string;
  editor: Editor;
}

export const FormToggleBold = ({ editor }: FormToggleBoldProps) => {
  return (
    <ToggleGroupItem
      value="bold"
      aria-label="Toggle bold"
      onClick={() => editor.chain().focus().toggleBold().run()}
      data-state={editor.isActive('bold') ? 'on' : 'off'}
    >
      <Bold className="size-4" />
    </ToggleGroupItem>
  );
};
