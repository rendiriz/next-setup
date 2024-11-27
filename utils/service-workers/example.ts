/* eslint-disable @typescript-eslint/no-explicit-any */
import { openIndexedDB } from '@/lib/indexedDB';

export interface SyncStatus {
  inProgress: boolean;
  totalItems: number;
  processedItems: number;
  failedItems: number;
  lastSync: number | null;
}

let serviceWorkerRegistered = false;

export async function registerExamplesServiceWorkers() {
  if (!serviceWorkerRegistered && 'serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw-examples.js');
      console.log('[Client] Service Worker registered:', registration);
      serviceWorkerRegistered = true;

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data.type === 'SYNC_COMPLETE') {
          console.log('[Client] Sync completed:', event.data.status);
          // You can trigger any UI updates here
        }
      });

      // Wait for the service worker to be ready
      await navigator.serviceWorker.ready;
      console.log('[Client] Service Worker is ready');
    } catch (error) {
      console.error('[Client] Service Worker registration failed:', error);
    }
  }
}

export async function getSyncStatus(): Promise<SyncStatus> {
  if (!navigator.serviceWorker.controller) {
    throw new Error('Service worker not active');
  }

  return new Promise((resolve) => {
    const channel = new MessageChannel();
    channel.port1.onmessage = (event) => resolve(event.data);
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'GET_SYNC_STATUS' }, [channel.port2]);
    }
  });
}

export async function schedulePUT(id: string, data: any) {
  try {
    // Ensure service worker is registered
    await registerExamplesServiceWorkers();

    // Store in IndexedDB
    console.log('[Client] Storing data in IndexedDB');
    const db = await openIndexedDB('ExamplesDB', 'pendingPUTs');
    const tx = db.transaction('pendingPUTs', 'readwrite');
    const store = tx.objectStore('pendingPUTs');

    await store.add({
      data: { id, data },
    });

    console.log('[Client] Data stored in IndexedDB');

    const registration = await navigator.serviceWorker.ready;
    if (registration.sync) {
      await registration.sync.register('background-PUT');
      console.log('[Client] Background sync registered');
    } else {
      console.log('[Client] Sync not available, processing immediately');
      await processPUT(id, data);
    }

    return true;
  } catch (error) {
    console.error('[Client] Failed to schedule PUT:', error);
    throw error;
  }
}

async function processPUT(id: string, data: any) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/example/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
