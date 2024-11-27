'use client';

import { Input } from '@/components/ui/input';

import { observer } from '@legendapp/state/react';

import { createProfileObservable, store } from './store';

interface PageClientProps {
  id: string;
}

function PageClient({ id }: PageClientProps) {
  // const profile$ = createProfileObservable(id);
  // const profile = profile$.get();

  store.id.set(id);
  const example = store.example.get();

  return (
    <div>
      <h1>React Query</h1>

      {/* <Input
        type="text"
        value={profile.name}
        onChange={(e) => profile$.set({ name: e.target.value })}
      /> */}

      <Input
        type="text"
        value={example?.name}
        onChange={(e) => store.example.set({ ...example, name: e.target.value })}
      />

      {/* <pre>{JSON.stringify(profile, null, 2)}</pre> */}
      <pre>{JSON.stringify(example, null, 2)}</pre>
    </div>
  );
}

export default observer(PageClient);
