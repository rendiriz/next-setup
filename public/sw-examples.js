const MAX_RETRIES = 3;
const RETRY_DELAY = 5000;
const REQUEST_TIMEOUT = 30000;

const syncStatus = {
  inProgress: false,
  totalItems: 0,
  processedItems: 0,
  failedItems: 0,
  lastSync: null,
};

self.addEventListener('install', (event) => {
  console.log('[SW] Install');
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activate');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('sync', (event) => {
  console.log('[SW] Sync event received:', event.tag);
  if (event.tag === 'background-PUT') {
    event.waitUntil(handleBackgroundPUT());
  }
});

self.addEventListener('message', (event) => {
  if (event.data.type === 'GET_SYNC_STATUS') {
    event.ports[0].postMessage(syncStatus);
  }
});

async function openDB(dbName, storeName) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        const store = db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
        store.createIndex('retries', 'retries', { unique: false });
        store.createIndex('lastAttempt', 'lastAttempt', { unique: false });
      }
    };
  });
}

async function getAuthToken() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('AuthDB', 1);

    request.onerror = () => reject(request.error);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('auth')) {
        db.createObjectStore('auth', { keyPath: 'id' });
      }
    };

    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction('auth', 'readonly');
      const store = tx.objectStore('auth');

      const tokenRequest = store.get('accessToken');
      tokenRequest.onerror = () => reject(tokenRequest.error);
      tokenRequest.onsuccess = () => {
        resolve(tokenRequest.result?.accessToken);
      };
    };
  });
}

async function getAllPendingPUTs(store) {
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result || []);
  });
}

async function fetchWithTimeout(url, options, timeout) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    // Get the token
    const token = await getAuthToken();
    console.log('[SW] Token:', token);

    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(id);

    if (response.status === 401) {
      // You might want to implement token refresh logic here
      throw new Error('Token expired or invalid');
    }

    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

async function processPUT(put, db) {
  const { id, data } = put.data;
  const retries = put.retries || 0;

  try {
    console.log(`[SW] Processing PUT for ID: ${id}, attempt: ${retries + 1}`);

    const response = await fetchWithTimeout(
      `/api/example/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
      REQUEST_TIMEOUT,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Success - remove from queue
    const deleteTx = db.transaction('pendingPUTs', 'readwrite');
    const deleteStore = deleteTx.objectStore('pendingPUTs');
    await deleteStore.delete(put.id);

    syncStatus.processedItems++;
    console.log(`[SW] Successfully processed PUT for ID: ${id}`);
    return true;
  } catch (error) {
    console.error(`[SW] Error processing PUT for ID: ${id}:`, error);

    if (retries < MAX_RETRIES && !error.name === 'AbortError') {
      // Update retry count and timestamp
      const updateTx = db.transaction('pendingPUTs', 'readwrite');
      const updateStore = updateTx.objectStore('pendingPUTs');
      await updateStore.put({
        ...put,
        retries: retries + 1,
        lastAttempt: Date.now(),
      });

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      return false;
    } else {
      syncStatus.failedItems++;
      return true; // Stop retrying
    }
  }
}

async function handleBackgroundPUT() {
  if (syncStatus.inProgress) {
    console.log('[SW] Sync already in progress');
    return;
  }

  console.log('[SW] Starting background PUT');

  try {
    syncStatus.inProgress = true;
    syncStatus.processedItems = 0;
    syncStatus.failedItems = 0;
    syncStatus.lastSync = Date.now();

    const db = await openDB('ExamplesDB', 'pendingPUTs');
    const tx = db.transaction('pendingPUTs', 'readonly');
    const store = tx.objectStore('pendingPUTs');

    // Use the new getAllPendingPUTs function
    const pendingPUTs = await getAllPendingPUTs(store);
    console.log('[SW] Found pending PUTs:', pendingPUTs);

    if (!Array.isArray(pendingPUTs)) {
      console.error('[SW] pendingPUTs is not an array:', pendingPUTs);
      return;
    }

    syncStatus.totalItems = pendingPUTs.length;

    // Process items sequentially with retry logic
    for (const put of pendingPUTs) {
      if (!put || !put.data) {
        console.error('[SW] Invalid PUT data:', put);
        continue;
      }

      let processed = false;
      while (!processed) {
        processed = await processPUT(put, db);
      }
    }

    // Notify all clients of completion
    const clients = await self.clients.matchAll();
    clients.forEach((client) => {
      client.postMessage({
        type: 'SYNC_COMPLETE',
        status: syncStatus,
      });
    });
  } catch (error) {
    console.error('[SW] Background sync failed:', error);
    syncStatus.failedItems = syncStatus.totalItems - syncStatus.processedItems;
  } finally {
    syncStatus.inProgress = false;
  }
}
