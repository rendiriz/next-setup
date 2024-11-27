'usee client';

import { useEffect, useState } from 'react';

import { getSyncStatus, SyncStatus } from '@/utils/service-workers/example';

export function SyncMonitor() {
  const [status, setStatus] = useState<SyncStatus | null>(null);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const currentStatus = await getSyncStatus();
        setStatus(currentStatus);
      } catch (error) {
        console.error('Failed to get sync status:', error);
      }
    };

    // Check status initially and every 5 seconds
    checkStatus();
    const interval = setInterval(checkStatus, 5000);

    // Listen for sync complete messages
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'SYNC_COMPLETE') {
        setStatus(event.data.status);
      }
    };
    navigator.serviceWorker.addEventListener('message', handleMessage);

    return () => {
      clearInterval(interval);
      navigator.serviceWorker.removeEventListener('message', handleMessage);
    };
  }, []);

  if (!status) return null;

  return (
    <div className="rounded border p-4 shadow-sm">
      <h3 className="mb-2 text-lg font-semibold">Sync Status</h3>
      <div className="space-y-2">
        <p>Status: {status.inProgress ? 'In Progress' : 'Idle'}</p>
        <p>Total Items: {status.totalItems}</p>
        <p>Processed: {status.processedItems}</p>
        <p>Failed: {status.failedItems}</p>
        {status.lastSync && <p>Last Sync: {new Date(status.lastSync).toLocaleString()}</p>}
      </div>
    </div>
  );
}
