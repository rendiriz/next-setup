'use client';

import { Suspense } from 'react';

import { FormBuilder } from './form-builder';
import { SettingProvider } from './setting-provider';

export function Demo() {
  return (
    <SettingProvider>
      <Suspense fallback={'Loading...'}>
        <FormBuilder />
      </Suspense>
    </SettingProvider>
  );
}
