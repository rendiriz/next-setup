'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { store } from '@/stores/react-query';

import { observer } from '@legendapp/state/react';

export const ReactQueryTest = observer(() => {
  const post = store.post.get();
  const [title, setTitle] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    store.post.set({ title });
    setTitle(''); // Clear the input after submission
  };

  return (
    <div>
      <div>Title: {post?.title}</div>

      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
        />
        <Button type="submit">Test Mutation</Button>
      </form>
    </div>
  );
});
