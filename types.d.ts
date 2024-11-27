interface SyncManager {
  register(tag: string): Promise<void>;
}

interface ServiceWorkerRegistration {
  sync?: SyncManager;
}

interface ServiceWorkerGlobalScope {
  registration: ServiceWorkerRegistration;
}
