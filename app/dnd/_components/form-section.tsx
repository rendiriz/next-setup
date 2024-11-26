'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { observer } from '@legendapp/state/react';
import { Copy, MoreVertical, Trash2 } from 'lucide-react';

import { store, type Element, type Status } from '../_stores/dnd';
import { FormElement } from './form-element';

interface FormSectionProps {
  index: number;
  id: string;
  elements: Element[];
  sectionId: Status;
}

export const FormSection = observer((props: FormSectionProps) => {
  const { index, id, elements, sectionId } = props;

  const { setNodeRef } = useDroppable({
    id: sectionId,
  });

  const handleAddSection = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    store.addSectionAfter(id);
  };

  const handleAddElement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    store.addElement({
      type: 'title',
      title: 'Element',
      sectionId: id,
    });
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>Section {index + 1}</div>

        <div className="flex items-center gap-2">
          <Button onClick={handleAddSection}>Add Section</Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
              >
                <MoreVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => store.duplicateSection(id)}>
                <Copy className="mr-2 size-4" />
                Duplicate Section
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 dark:text-red-400"
                onClick={() => store.deleteSection(id)}
              >
                <Trash2 className="mr-2 size-4" />
                Delete Section
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div
        ref={setNodeRef}
        className="min-h-[100px] space-y-3"
      >
        <SortableContext
          items={elements.map((element) => element.id)}
          key={id}
          strategy={verticalListSortingStrategy}
        >
          {elements.map((element) => (
            <>
              <FormElement
                key={element.id}
                sectionId={id}
                element={element}
              />
            </>
          ))}

          {elements.length === 0 ? (
            <div>
              <Button onClick={handleAddElement}>Add Element</Button>
            </div>
          ) : null}
        </SortableContext>
      </div>
    </>
  );
});
