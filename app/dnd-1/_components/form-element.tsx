'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { observer } from '@legendapp/state/react';
import { Copy, GripHorizontal, MoreVertical, Trash2 } from 'lucide-react';

import { store, type Element } from '../_stores/dnd';

interface FormElementProps {
  sectionId?: string;
  element: Element;
}

export const FormElement = observer((props: FormElementProps) => {
  const { sectionId, element } = props;

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: element.id,
    data: {
      type: 'Element',
      element,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleAddElementAfter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    store.addElementAfter(element.id, {
      type: 'title',
      title: 'New Element',
      sectionId: sectionId as string,
    });
  };

  return (
    <>
      <Card
        ref={setNodeRef}
        style={style}
        className={cn(
          'relative w-full bg-white dark:bg-gray-800',
          // store.activeElement.get() === element.id && 'border-[var(--builder-color)]',
        )}
        onClick={() => {
          store.activeElement.set(element.id);
        }}
      >
        <CardContent className="p-0">
          <div
            className="flex cursor-grab justify-center active:cursor-grabbing"
            {...attributes}
            {...listeners}
          >
            <div className="flex size-6 items-center justify-center">
              <GripHorizontal className="size-4" />
            </div>
          </div>

          <div className="mb-6 flex flex-col space-y-2">
            <div className="flex space-x-4 pl-6 pr-4">
              <div className="grow">FormTitle</div>

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
                  <DropdownMenuItem onClick={() => store.duplicateElement(element.id)}>
                    <Copy className="mr-2 size-4" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600 dark:text-red-400"
                    onClick={() => store.deleteElement(element.id)}
                  >
                    <Trash2 className="mr-2 size-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex px-6">FormDescription</div>
          </div>
        </CardContent>
      </Card>

      {store.activeElement.get() === element.id ? (
        <div>
          <Button onClick={handleAddElementAfter}>Add Element</Button>
        </div>
      ) : null}
    </>
  );
});
