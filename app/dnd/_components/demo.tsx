'use client';

import { useState } from 'react';

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { observer } from '@legendapp/state/react';
import { Kanban } from 'lucide-react';

import { actions, store } from '../_stores/store';
import { Column } from './column';
import { CreateColumnDialog } from './create-column-dialog';
import { CreateTaskDialog } from './create-task-dialog';
import { TaskCard } from './task-card';
import { TaskTemplate } from './task-template';
import { TaskTemplatesSidebar } from './task-templates-sidebar';

export const Demo = observer(() => {
  const [activeTask, setActiveTask] = useState<any>(null);
  const [activeTemplate, setActiveTemplate] = useState<any>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task);
    } else if (event.active.data.current?.type === 'Template') {
      setActiveTemplate(event.active.data.current.template);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    setActiveTemplate(null);

    const { active, over } = event;
    if (!over) return;

    const activeTask = store.tasks.get().find((t) => t.id === active.id);
    const overId = String(over.id);

    // Handle template drops
    if (!activeTask && active.data.current?.type === 'Template') {
      const template = active.data.current.template;

      if (overId.includes('-first')) {
        const columnId = overId.split('-first')[0];
        actions.addTask({
          ...template,
          status: columnId,
          order: 0,
        });
        return;
      }

      if (overId.includes('-after')) {
        const targetId = overId.split('-after')[0];
        const targetTask = store.tasks.get().find((t) => t.id === targetId);

        if (targetTask) {
          actions.addTaskAfter(targetId, {
            ...template,
            status: targetTask.status,
          });
        }
        return;
      }

      if (store.columns.get().some((col) => col.id === overId)) {
        actions.addTask({
          ...template,
          status: overId,
          order: 0,
        });
      }
      return;
    }

    // Handle task reordering and column changes
    if (activeTask) {
      const targetTask = store.tasks.get().find((t) => t.id === overId);

      if (targetTask) {
        // Moving within the same column
        if (activeTask.status === targetTask.status) {
          const tasksInColumn = store.tasks
            .get()
            .filter((t) => t.status === targetTask.status)
            .sort((a, b) => a.order - b.order);

          const oldIndex = tasksInColumn.findIndex((t) => t.id === activeTask.id);
          const newIndex = tasksInColumn.findIndex((t) => t.id === targetTask.id);

          if (oldIndex !== -1 && newIndex !== -1) {
            const reorderedTasks = arrayMove(tasksInColumn, oldIndex, newIndex);
            const updatedTasks = store.tasks.get().map((task) => {
              const newPosition = reorderedTasks.findIndex((t) => t.id === task.id);
              if (newPosition !== -1 && task.status === targetTask.status) {
                return { ...task, order: newPosition };
              }
              return task;
            });
            actions.reorderTasks(updatedTasks);
          }
        } else {
          // Moving to a different column
          const tasksInTargetColumn = store.tasks
            .get()
            .filter((t) => t.status === targetTask.status)
            .sort((a, b) => a.order - b.order);

          const targetIndex = tasksInTargetColumn.findIndex((t) => t.id === targetTask.id);

          // Insert after the target task
          const updatedTasks = store.tasks.get().map((task) => {
            if (task.id === activeTask.id) {
              return { ...task, status: targetTask.status, order: targetIndex + 1 };
            }
            if (task.status === targetTask.status && task.order > targetIndex) {
              return { ...task, order: task.order + 1 };
            }
            return task;
          });

          actions.reorderTasks(updatedTasks);
        }
      } else if (overId.includes('-first')) {
        // Moving to the start of a column
        const columnId = overId.split('-first')[0];
        const updatedTasks = store.tasks.get().map((task) => {
          if (task.id === activeTask.id) {
            return { ...task, status: columnId, order: 0 };
          }
          if (task.status === columnId) {
            return { ...task, order: task.order + 1 };
          }
          return task;
        });
        actions.reorderTasks(updatedTasks);
      } else if (store.columns.get().some((col) => col.id === overId)) {
        // Moving to an empty column
        const columnId = overId;
        const updatedTasks = store.tasks.get().map((task) => {
          if (task.id === activeTask.id) {
            return { ...task, status: columnId, order: 0 };
          }
          return task;
        });
        actions.reorderTasks(updatedTasks);
      }
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === 'Task';
    if (!isActiveATask) return;

    const activeTask = store.tasks.get().find((t) => t.id === activeId);
    if (!activeTask) return;

    const targetTask = store.tasks.get().find((t) => t.id === overId);

    if (targetTask) {
      // Moving within the same column
      if (activeTask.status === targetTask.status) {
        const tasksInColumn = store.tasks
          .get()
          .filter((t) => t.status === targetTask.status)
          .sort((a, b) => a.order - b.order);

        const oldIndex = tasksInColumn.findIndex((t) => t.id === activeTask.id);
        const newIndex = tasksInColumn.findIndex((t) => t.id === targetTask.id);

        if (oldIndex !== -1 && newIndex !== -1) {
          const reorderedTasks = arrayMove(tasksInColumn, oldIndex, newIndex);
          const updatedTasks = store.tasks.get().map((task) => {
            const newPosition = reorderedTasks.findIndex((t) => t.id === task.id);
            if (newPosition !== -1 && task.status === targetTask.status) {
              return { ...task, order: newPosition };
            }
            return task;
          });
          actions.reorderTasks(updatedTasks);
        }
      } else {
        // Moving to a different column
        const updatedTasks = store.tasks.get().map((task) => {
          if (task.id === activeId) {
            return { ...task, status: targetTask.status };
          }
          return task;
        });
        actions.reorderTasks(updatedTasks);
      }
    } else if (overId.includes('-first')) {
      const columnId = overId.split('-first')[0];
      if (activeTask.status !== columnId) {
        const updatedTasks = store.tasks.get().map((task) => {
          if (task.id === activeId) {
            return { ...task, status: columnId, order: 0 };
          }
          if (task.status === columnId) {
            return { ...task, order: task.order + 1 };
          }
          return task;
        });
        actions.reorderTasks(updatedTasks);
      }
    } else if (store.columns.get().some((col) => col.id === overId)) {
      if (activeTask.status !== overId) {
        const updatedTasks = store.tasks.get().map((task) => {
          if (task.id === activeId) {
            return { ...task, status: overId as string, order: 0 };
          }
          return task;
        });
        actions.reorderTasks(updatedTasks);
      }
    }
  };

  const sortedColumns = [...store.columns.get()].sort((a, b) => a.order - b.order);
  const sortedTasks = [...store.tasks.get()].sort((a, b) => a.order - b.order);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
        <TaskTemplatesSidebar />
        <main className="flex-1 p-4 md:p-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Kanban className="h-8 w-8 text-indigo-500" />
                <h1 className="text-2xl font-bold">Kanban Board</h1>
              </div>
              <div className="flex gap-2">
                <CreateColumnDialog />
                <CreateTaskDialog />
              </div>
            </div>

            <div className="space-y-6">
              {sortedColumns.map((column) => (
                <Column
                  key={column.id}
                  id={column.id}
                  title={column.title}
                  status={column.id}
                  tasks={sortedTasks.filter((task) => task.status === column.id)}
                />
              ))}
            </div>
          </div>
        </main>

        <DragOverlay>
          {activeTask ? (
            <TaskCard task={activeTask} />
          ) : activeTemplate ? (
            <TaskTemplate
              id="dragging-template"
              title={activeTemplate.title}
              description={activeTemplate.description}
            />
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
});
