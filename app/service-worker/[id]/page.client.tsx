'use client';

import { useEffect } from 'react';

import { Input } from '@/components/ui/input';
import { registerExamplesServiceWorkers } from '@/utils/service-workers/example';

import { observer } from '@legendapp/state/react';

import { SyncMonitor } from './_components/sync-monitor';
import { store } from './store';

interface PageClientProps {
  id: string;
}

function PageClient({ id }: PageClientProps) {
  useEffect(() => {
    registerExamplesServiceWorkers();
  }, []);

  store.id.set(id);
  const example = store.example.get();

  return (
    <div>
      <h1>Service Worker</h1>

      <Input
        type="text"
        value={example?.name}
        onChange={(e) => store.example.set({ ...example, name: e.target.value })}
      />

      <pre>{JSON.stringify(example, null, 2)}</pre>

      <SyncMonitor />
    </div>
  );
}

export default observer(PageClient);
