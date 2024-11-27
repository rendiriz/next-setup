'use client';

import { cn } from '@/lib/utils';

import { useDroppable } from '@dnd-kit/core';

interface DropIndicatorProps {
  id: string;
  className?: string;
}

export function DropIndicator({ id, className }: DropIndicatorProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'rounded-md transition-colors',
        isOver
          ? 'border-2 border-indigo-500 bg-indigo-500/40'
          : 'border-2 border-dashed border-gray-300/50 bg-transparent',
        className,
      )}
    />
  );
}
