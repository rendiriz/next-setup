'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

import { useDraggable } from '@dnd-kit/core';
import { GripVertical } from 'lucide-react';

interface TaskTemplateProps {
  id: string;
  title: string;
  description?: string;
}

export function TaskTemplate({ id, title, description }: TaskTemplateProps) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
    data: {
      type: 'Template',
      template: { title, description },
    },
  });

  const style = undefined;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="cursor-grab bg-white transition-all active:cursor-grabbing dark:bg-gray-800"
    >
      <CardHeader className="flex flex-row items-start space-y-0 p-3">
        <div className="flex items-start gap-2">
          <button
            className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-4 w-4 text-gray-500" />
          </button>
          <h4 className="text-sm font-medium">{title}</h4>
        </div>
      </CardHeader>
      {description && (
        <CardContent className="p-3 pt-0">
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </CardContent>
      )}
    </Card>
  );
}
