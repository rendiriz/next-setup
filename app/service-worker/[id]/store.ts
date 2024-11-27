import { schedulePUT } from '@/utils/service-workers/example';

import { observable } from '@legendapp/state';
import { ObservablePersistLocalStorage } from '@legendapp/state/persist-plugins/local-storage';
import { synced } from '@legendapp/state/sync';

export const store = observable({
  id: '',
  example: synced({
    get: async () => {
      const id = store.id.get() as string;

      const response = await fetch(`http://localhost:3000/api/example/${id}`);
      const data = await response.json();
      return data;
    },
    set: async ({ value }) => {
      const id = store.id.get() as string;

      const response = await schedulePUT(id, value);

      console.log('response', response);

      // const response = await fetch(`http://localhost:3000/api/example/${id}`, {
      //   body: JSON.stringify(value),
      //   method: 'PUT',
      // });
      // const data = await response.json();
      // return data;
    },
    persist: {
      name: `profile`,
      plugin: ObservablePersistLocalStorage,
      retrySync: true,
    },
  }),
});
