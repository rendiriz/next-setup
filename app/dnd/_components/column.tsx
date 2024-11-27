'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useDndContext, useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { observer } from '@legendapp/state/react';
import { ArrowDown, ArrowUp, Copy, ListPlus, MoreVertical, Trash2 } from 'lucide-react';

import { actions, Status, store, Task } from '../_stores/store';
import { DropIndicator } from './drop-indicator';
import { TaskCard } from './task-card';

interface ColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  status: Status;
}

function ColumnComponent({ id, title, tasks, status }: ColumnProps) {
  const { active } = useDndContext();
  const { setNodeRef } = useDroppable({
    id: status,
  });

  // Only show drop indicators when dragging a template from sidebar
  const isTemplateActive = active?.data.current?.type === 'Template';
  const showDropIndicators = isTemplateActive;

  // Get all columns sorted by order
  const sortedColumns = [...store.columns.get()].sort((a, b) => a.order - b.order);
  const isFirstColumn = sortedColumns[0]?.id === id;
  const isLastColumn = sortedColumns[sortedColumns.length - 1]?.id === id;

  const handleAddColumn = () => {
    actions.addColumnAfter(id, 'New Section');
  };

  const handleDuplicateColumn = () => {
    actions.duplicateColumnAfter(id);
  };

  const handleDeleteColumn = () => {
    actions.deleteColumn(id);
  };

  return (
    <div className="w-full rounded-lg bg-gray-100 p-4 dark:bg-gray-900">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-600 dark:text-gray-300">{title}</h3>
          <span className="rounded-full bg-gray-200 px-2 py-1 text-xs font-medium dark:bg-gray-700">
            {tasks.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleAddColumn}
          >
            <ListPlus className="h-4 w-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-200 dark:hover:bg-gray-800">
              <MoreVertical className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => actions.moveColumnBefore(id)}
                disabled={isFirstColumn}
                className={isFirstColumn ? 'cursor-not-allowed opacity-50' : ''}
              >
                <ArrowUp className="mr-2 h-4 w-4" />
                Move Up
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => actions.moveColumnAfter(id)}
                disabled={isLastColumn}
                className={isLastColumn ? 'cursor-not-allowed opacity-50' : ''}
              >
                <ArrowDown className="mr-2 h-4 w-4" />
                Move Down
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDuplicateColumn}>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate Column
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 dark:text-red-400"
                onClick={handleDeleteColumn}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Column
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div
        ref={setNodeRef}
        className="min-h-[100px] space-y-3"
      >
        {showDropIndicators && (
          <DropIndicator
            id={`${status}-first`}
            className={tasks.length === 0 ? 'h-[120px]' : 'h-4'}
          />
        )}
        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <div key={task.id}>
              <TaskCard task={task} />
              {showDropIndicators && (
                <DropIndicator
                  id={`${task.id}-after`}
                  className="mt-3 h-4"
                />
              )}
            </div>
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

export const Column = observer(ColumnComponent);
