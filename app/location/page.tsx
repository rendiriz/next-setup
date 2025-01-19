import { Suspense } from 'react';

import PageClient from './page.client';

export default async function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading client component...</div>}>
        <PageClient />
      </Suspense>
    </div>
  );
}
