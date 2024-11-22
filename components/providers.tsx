'use client';

import { ReactNode } from 'react';

import { enableReactTracking } from '@legendapp/state/config/enableReactTracking';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

enableReactTracking({
  auto: true,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools
        initialIsOpen={false}
        buttonPosition="bottom-left"
      />
    </QueryClientProvider>
  );
}
