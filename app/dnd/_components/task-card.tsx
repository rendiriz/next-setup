'use client';

import { useEffect, useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { observer } from '@legendapp/state/react';
import { format } from 'date-fns';
import { ArrowDown, ArrowUp, Copy, GripVertical, MoreVertical, PlusCircle, Trash2 } from 'lucide-react';

import { actions, store, Task } from '../_stores/store';

interface TaskCardProps {
  task: Task;
}

function TaskCardComponent({ task }: TaskCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
  });

  // Get all tasks in the same column
  const tasksInSameColumn = store.tasks
    .get()
    .filter((t) => t.status === task.status)
    .sort((a, b) => a.order - b.order);

  // Check if current task is first or last
  const isFirstTask = tasksInSameColumn[0]?.id === task.id;
  const isLastTask = tasksInSameColumn[tasksInSameColumn.length - 1]?.id === task.id;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Ignore clicks on buttons and menus
      const target = event.target as HTMLElement;
      if (target.closest('button') || target.closest('[role="menu"]')) {
        return;
      }

      // Check if click is outside the card
      if (cardRef.current && !cardRef.current.contains(target)) {
        actions.setTaskActive(null);
      }
    };

    if (task.isActive) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [task.isActive]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Ignore clicks on interactive elements
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('[role="menu"]') || target.closest('[role="menuitem"]')) {
      return;
    }

    e.stopPropagation();
    actions.setTaskActive(task.id);
  };

  const handleAddTask = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    actions.addTaskAfter(task.id, {
      title: 'New Task',
      status: task.status,
    });
  };

  return (
    <div
      ref={cardRef}
      className="group relative"
    >
      <Card
        ref={setNodeRef}
        style={style}
        onClick={handleCardClick}
        className={`relative w-full bg-white transition-shadow dark:bg-gray-800 ${
          task.isActive ? 'shadow-lg ring-2 ring-indigo-500' : ''
        }`}
      >
        <CardHeader className="flex flex-row items-start justify-between space-y-0 p-3">
          <div className="flex items-start gap-2">
            <button
              className="mt-0.5 inline-flex h-5 w-5 cursor-grab items-center justify-center rounded-md hover:bg-gray-100 active:cursor-grabbing dark:hover:bg-gray-700"
              {...attributes}
              {...listeners}
            >
              <GripVertical className="h-4 w-4 text-gray-500" />
            </button>
            <h4 className="text-sm font-medium">{task.title}</h4>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
              <MoreVertical className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => actions.moveTaskBefore(task.id)}
                disabled={isFirstTask}
                className={isFirstTask ? 'cursor-not-allowed opacity-50' : ''}
              >
                <ArrowUp className="mr-2 h-4 w-4" />
                Move Up
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => actions.moveTaskAfter(task.id)}
                disabled={isLastTask}
                className={isLastTask ? 'cursor-not-allowed opacity-50' : ''}
              >
                <ArrowDown className="mr-2 h-4 w-4" />
                Move Down
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => actions.duplicateTaskAfter(task.id)}>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 dark:text-red-400"
                onClick={() => actions.deleteTask(task.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          {task.description && (
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">{task.description}</p>
          )}
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Created {format(new Date(task.createdAt), 'MMM d, yyyy')}
          </p>
        </CardContent>
      </Card>

      {task.isActive && (
        <div className="absolute -bottom-4 left-1/2 z-10 -translate-x-1/2 transform">
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8 rounded-full bg-white shadow-lg hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
            onClick={handleAddTask}
          >
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

export const TaskCard = observer(TaskCardComponent);
