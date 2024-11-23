import { Suspense } from 'react';

import { ThemeTest } from '@/components/theme/ThemeTest';

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl p-4">
      <h1 className="mb-8 text-2xl font-bold">Theme Builder</h1>
      <Suspense fallback={'Loading...'}>
        <ThemeTest />
      </Suspense>
    </main>
  );
}
