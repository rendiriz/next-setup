'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { store } from '@/stores/theme';

import { observer } from '@legendapp/state/react';

export const ThemeTest = observer(() => {
  const theme = store.theme.get();
  const [fontHeaderSize, setFontHeaderSize] = useState(24);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    store.theme.set({ fontHeaderSize });
    setFontHeaderSize(24); // Clear the input after submission
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={fontHeaderSize}
          onChange={(e) => setFontHeaderSize(Number(e.target.value))}
          placeholder="Enter title"
        />
        <Button type="submit">Test Mutation</Button>
      </form>

      {theme?.fontHeaderSize}

      <div
        style={{ '--font-header-size': `${theme.fontHeaderSize}px` }}
        // className="prose"
        className="prose prose-h1:text-[var(--font-header-size)]"
      >
        <h1>Heading</h1>
      </div>
    </div>
  );
});
