import { Suspense } from 'react';

import PageClient from './page.client';

interface PageClientProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageClientProps) {
  const id = (await params).id;

  return (
    <div>
      <Suspense fallback={<div>Loading client component...</div>}>
        <PageClient id={id} />
      </Suspense>
    </div>
  );
}
