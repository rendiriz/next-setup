import { observable } from '@legendapp/state';
import { enableReactTracking } from '@legendapp/state/config/enableReactTracking';
import { nanoid } from 'nanoid';

enableReactTracking({
  auto: true,
});

export type Status = string;

export type Column = {
  id: string;
  title: string;
  order: number;
};

export type Task = {
  id: string;
  title: string;
  status: Status;
  description?: string;
  createdAt: Date;
  order: number;
  isActive?: boolean;
};

type TaskStore = {
  columns: Column[];
  tasks: Task[];
};

const defaultColumns = [
  { id: 'todo', title: 'To Do', order: 0 },
  { id: 'in_progress', title: 'In Progress', order: 1 },
  { id: 'done', title: 'Done', order: 2 },
];

export const store = observable<TaskStore>({
  columns: defaultColumns,
  tasks: [],
});

if (typeof window !== 'undefined') {
  const initializeStore = () => {
    try {
      const savedState = localStorage.getItem('task-store');
      if (savedState) {
        const parsed = JSON.parse(savedState);
        store.set({
          columns: parsed.columns || defaultColumns,
          tasks: (parsed.tasks || []).map((task: any) => ({
            ...task,
            createdAt: new Date(task.createdAt),
            isActive: false,
          })),
        });
      }

      store.onChange((value) => {
        localStorage.setItem('task-store', JSON.stringify(value));
      });
    } catch (error) {
      console.error('Error initializing store:', error);
      store.set({
        columns: defaultColumns,
        tasks: [],
      });
    }
  };

  if (document.readyState === 'complete') {
    initializeStore();
  } else {
    window.addEventListener('load', initializeStore);
  }
}

export const actions = {
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'order'> & { order?: number }) => {
    const tasksInStatus = store.tasks.get().filter((t) => t.status === task.status);

    // If order is provided, use it. Otherwise, add to the end
    const order =
      task.order !== undefined ? task.order : Math.max(...tasksInStatus.map((t) => t.order), -1) + 1;

    // Shift existing tasks to make room for the new task
    const updatedTasks = store.tasks.get().map((t) => {
      if (t.status === task.status && t.order >= order) {
        return { ...t, order: t.order + 1 };
      }
      return t;
    });

    // Add new task
    const newTask = {
      ...task,
      id: nanoid(),
      createdAt: new Date(),
      order,
      isActive: false,
    };

    store.tasks.set([...updatedTasks, newTask]);
  },

  addTaskAfter: (taskId: string, task: Omit<Task, 'id' | 'createdAt' | 'order'>) => {
    const tasks = store.tasks.get();
    const targetTask = tasks.find((t) => t.id === taskId);
    if (!targetTask) return;

    const tasksInStatus = tasks.filter((t) => t.status === targetTask.status);
    const targetIndex = tasksInStatus.findIndex((t) => t.id === taskId);

    // Update orders for tasks after the insertion point
    const updatedTasks = tasks.map((t) => {
      if (t.status === targetTask.status && t.order > targetTask.order) {
        return { ...t, order: t.order + 1 };
      }
      return t;
    });

    // Insert new task
    const newTask = {
      ...task,
      id: nanoid(),
      createdAt: new Date(),
      order: targetTask.order + 1,
      isActive: false,
    };

    store.tasks.set([...updatedTasks, newTask]);
  },

  duplicateTaskAfter: (taskId: string) => {
    const tasks = store.tasks.get();
    const sourceTask = tasks.find((t) => t.id === taskId);
    if (!sourceTask) return;

    // Update orders for tasks after the insertion point
    const updatedTasks = tasks.map((t) => {
      if (t.status === sourceTask.status && t.order > sourceTask.order) {
        return { ...t, order: t.order + 1 };
      }
      return t;
    });

    // Create duplicate task
    const duplicatedTask = {
      ...sourceTask,
      id: nanoid(),
      createdAt: new Date(),
      order: sourceTask.order + 1,
      isActive: false,
      title: `${sourceTask.title} Copy`,
    };

    store.tasks.set([...updatedTasks, duplicatedTask]);
  },

  updateTask: (taskId: string, status: Status) => {
    const task = store.tasks.get().find((t) => t.id === taskId);
    if (!task) return;

    const tasksInNewStatus = store.tasks.get().filter((t) => t.status === status);
    const maxOrder = Math.max(...tasksInNewStatus.map((t) => t.order), -1);

    store.tasks.set((tasks) =>
      tasks.map((t) => (t.id === taskId ? { ...t, status, order: maxOrder + 1 } : t)),
    );
  },

  updateTaskOrder: (taskId: string, status: Status, order: number) => {
    store.tasks.set((tasks) => tasks.map((t) => (t.id === taskId ? { ...t, status, order } : t)));
  },

  deleteTask: (taskId: string) => {
    store.tasks.set((tasks) => tasks.filter((t) => t.id !== taskId));
  },

  duplicateTask: (taskId: string) => {
    const task = store.tasks.get().find((t) => t.id === taskId);
    if (!task) return;

    const tasksInStatus = store.tasks.get().filter((t) => t.status === task.status);
    const maxOrder = Math.max(...tasksInStatus.map((t) => t.order), -1);

    store.tasks.push({
      ...task,
      id: nanoid(),
      createdAt: new Date(),
      order: maxOrder + 1,
      isActive: false,
      title: `${task.title} Copy`,
    });
  },

  reorderTasks: (tasks: Task[]) => {
    store.tasks.set(tasks);
  },

  setTaskActive: (taskId: string | null) => {
    store.tasks.set((tasks) =>
      tasks.map((task) => ({
        ...task,
        isActive: task.id === taskId,
      })),
    );
  },

  moveTaskBefore: (taskId: string) => {
    const tasks = store.tasks.get();
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const tasksInStatus = tasks.filter((t) => t.status === task.status).sort((a, b) => a.order - b.order);

    const currentIndex = tasksInStatus.findIndex((t) => t.id === taskId);
    if (currentIndex <= 0) return; // Already first

    const targetOrder = tasksInStatus[currentIndex - 1].order;

    // Update orders
    const updatedTasks = tasks.map((t) => {
      if (t.id === taskId) {
        return { ...t, order: targetOrder };
      }
      if (t.status === task.status && t.order === targetOrder) {
        return { ...t, order: task.order };
      }
      return t;
    });

    store.tasks.set(updatedTasks);
  },

  moveTaskAfter: (taskId: string) => {
    const tasks = store.tasks.get();
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const tasksInStatus = tasks.filter((t) => t.status === task.status).sort((a, b) => a.order - b.order);

    const currentIndex = tasksInStatus.findIndex((t) => t.id === taskId);
    if (currentIndex === -1 || currentIndex === tasksInStatus.length - 1) return; // Already last

    const targetOrder = tasksInStatus[currentIndex + 1].order;

    // Update orders
    const updatedTasks = tasks.map((t) => {
      if (t.id === taskId) {
        return { ...t, order: targetOrder };
      }
      if (t.status === task.status && t.order === targetOrder) {
        return { ...t, order: task.order };
      }
      return t;
    });

    store.tasks.set(updatedTasks);
  },

  addColumn: (title: string) => {
    const columns = store.columns.get();
    const maxOrder = Math.max(...columns.map((c) => c.order), -1);

    store.columns.push({
      id: nanoid(),
      title,
      order: maxOrder + 1,
    });
  },

  addColumnAfter: (columnId: string, title: string) => {
    const columns = store.columns.get();
    const targetColumn = columns.find((c) => c.id === columnId);
    if (!targetColumn) return;

    // Update orders for columns after the insertion point
    const updatedColumns = columns.map((c) => {
      if (c.order > targetColumn.order) {
        return { ...c, order: c.order + 1 };
      }
      return c;
    });

    // Insert new column
    const newColumn = {
      id: nanoid(),
      title,
      order: targetColumn.order + 1,
    };

    store.columns.set([...updatedColumns, newColumn]);
  },

  deleteColumn: (columnId: string) => {
    store.columns.set((columns) => columns.filter((c) => c.id !== columnId));
    store.tasks.set((tasks) => tasks.filter((t) => t.status !== columnId));
  },

  duplicateColumn: (columnId: string) => {
    const column = store.columns.get().find((c) => c.id === columnId);
    if (!column) return;

    const newColumnId = nanoid();
    const maxOrder = Math.max(...store.columns.get().map((c) => c.order), -1);

    // Add new column
    store.columns.push({
      ...column,
      id: newColumnId,
      title: `${column.title} Copy`,
      order: maxOrder + 1,
    });

    // Duplicate tasks in the column
    const tasksToClone = store.tasks.get().filter((t) => t.status === columnId);
    tasksToClone.forEach((task, index) => {
      store.tasks.push({
        ...task,
        id: nanoid(),
        status: newColumnId,
        createdAt: new Date(),
        order: index,
        isActive: false,
      });
    });
  },

  duplicateColumnAfter: (columnId: string) => {
    const columns = store.columns.get();
    const sourceColumn = columns.find((c) => c.id === columnId);
    if (!sourceColumn) return;

    const newColumnId = nanoid();

    // Update orders for columns after the insertion point
    const updatedColumns = columns.map((c) => {
      if (c.order > sourceColumn.order) {
        return { ...c, order: c.order + 1 };
      }
      return c;
    });

    // Create new column
    const newColumn = {
      ...sourceColumn,
      id: newColumnId,
      title: `${sourceColumn.title} Copy`,
      order: sourceColumn.order + 1,
    };

    // Add the new column
    store.columns.set([...updatedColumns, newColumn]);

    // Duplicate tasks in the column
    const tasksToClone = store.tasks.get().filter((t) => t.status === columnId);
    tasksToClone.forEach((task, index) => {
      store.tasks.push({
        ...task,
        id: nanoid(),
        status: newColumnId,
        createdAt: new Date(),
        order: index,
        isActive: false,
      });
    });
  },

  moveColumnBefore: (columnId: string) => {
    const columns = store.columns.get();
    const column = columns.find((c) => c.id === columnId);
    if (!column) return;

    const sortedColumns = [...columns].sort((a, b) => a.order - b.order);
    const currentIndex = sortedColumns.findIndex((c) => c.id === columnId);
    if (currentIndex <= 0) return; // Already first

    const targetOrder = sortedColumns[currentIndex - 1].order;

    // Swap orders with previous column
    const updatedColumns = columns.map((c) => {
      if (c.id === columnId) {
        return { ...c, order: targetOrder };
      }
      if (c.order === targetOrder) {
        return { ...c, order: column.order };
      }
      return c;
    });

    store.columns.set(updatedColumns);
  },

  moveColumnAfter: (columnId: string) => {
    const columns = store.columns.get();
    const column = columns.find((c) => c.id === columnId);
    if (!column) return;

    const sortedColumns = [...columns].sort((a, b) => a.order - b.order);
    const currentIndex = sortedColumns.findIndex((c) => c.id === columnId);
    if (currentIndex === -1 || currentIndex === sortedColumns.length - 1) return; // Already last

    const targetOrder = sortedColumns[currentIndex + 1].order;

    // Swap orders with next column
    const updatedColumns = columns.map((c) => {
      if (c.id === columnId) {
        return { ...c, order: targetOrder };
      }
      if (c.order === targetOrder) {
        return { ...c, order: column.order };
      }
      return c;
    });

    store.columns.set(updatedColumns);
  },
};
