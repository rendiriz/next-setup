'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { store } from '@/stores/todo';

import { computed } from '@legendapp/state';
import { observer } from '@legendapp/state/react';
import { Trash2 } from 'lucide-react';

export const TodoList = observer(() => {
  const filteredTodos = computed(() => {
    const todos = store.todos.get();
    const filter = store.filter.get();

    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  });

  const toggleTodo = (id: number) => {
    const todoIndex = store.todos.get().findIndex((todo) => todo.id === id);
    if (todoIndex !== -1) {
      store.todos[todoIndex].completed.toggle();
    }
  };

  const deleteTodo = (id: number) => {
    store.todos.set((todos) => todos.filter((todo) => todo.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-center gap-2">
          <Button
            variant={store.filter.get() === 'all' ? 'default' : 'outline'}
            onClick={() => store.filter.set('all')}
          >
            All
          </Button>
          <Button
            variant={store.filter.get() === 'active' ? 'default' : 'outline'}
            onClick={() => store.filter.set('active')}
          >
            Active
          </Button>
          <Button
            variant={store.filter.get() === 'completed' ? 'default' : 'outline'}
            onClick={() => store.filter.set('completed')}
          >
            Completed
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {filteredTodos.get().map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-2 rounded border p-2 hover:bg-slate-50"
            >
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(todo.id)}
                id={`todo-${todo.id}`}
              />
              <label
                htmlFor={`todo-${todo.id}`}
                className={`flex-1 cursor-pointer ${todo.completed ? 'text-slate-500 line-through' : ''}`}
              >
                {todo.title}
              </label>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Todo</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this todo? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteTodo(todo.id)}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))}
          {filteredTodos.get().length === 0 && (
            <div className="py-4 text-center text-slate-500">No todos found</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
});
