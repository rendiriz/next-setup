import { ToggleGroupItem } from '@/components/ui/toggle-group';

import type { Editor } from '@tiptap/react';
import { RemoveFormatting } from 'lucide-react';

interface FormToggleRemoveFormattingProps {
  className?: string;
  editor: Editor;
}

export const FormToggleRemoveFormatting = ({ editor }: FormToggleRemoveFormattingProps) => {
  return (
    <ToggleGroupItem
      value="removeFormatting"
      aria-label="Toggle remove formatting"
      onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
      data-state="off"
    >
      <RemoveFormatting className="size-4" />
    </ToggleGroupItem>
  );
};
