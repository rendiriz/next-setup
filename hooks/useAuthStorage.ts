'use client';

import { useEffect } from 'react';

import { openIndexedDB } from '@/lib/indexedDB';

import { useSession } from 'next-auth/react';

export function useAuthStorage() {
  const { data: session } = useSession();

  useEffect(() => {
    const setToken = async (accessToken: string) => {
      const db = await openIndexedDB('AuthDB', 'auth');
      const tx = db.transaction('auth', 'readwrite');
      const store = tx.objectStore('auth');

      store.put({ id: 'accessToken', accessToken });
    };

    const removeToken = async () => {
      const db = await openIndexedDB('AuthDB', 'auth');
      const tx = db.transaction('auth', 'readwrite');
      const store = tx.objectStore('auth');

      store.delete('accessToken');
    };

    if (session?.accessToken) {
      setToken(session.accessToken);
    } else {
      removeToken();
    }
  }, [session?.accessToken]);

  return null;
}
