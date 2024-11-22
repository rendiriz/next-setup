'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { store } from '@/stores/todo';

import { observer } from '@legendapp/state/react';
import { PlusCircle } from 'lucide-react';

export const TodoInput = observer(() => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTodo = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
    };

    store.todos.push(newTodo);
    setTitle('');
  };

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <form
          onSubmit={handleSubmit}
          className="flex gap-2"
        >
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1"
          />
          <Button
            type="submit"
            size="default"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add
          </Button>
        </form>
      </CardContent>
    </Card>
  );
});
