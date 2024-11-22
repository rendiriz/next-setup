import { Suspense } from 'react';

import { ThemeTest } from '@/components/theme/ThemeTest';

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl p-4">
      <h1 className="mb-4 text-2xl font-bold">React Query with Legend State</h1>
      <Suspense fallback={'Loading...'}>
        <ThemeTest />
      </Suspense>
    </main>
  );
}
