import { observable } from '@legendapp/state';
import { ObservablePersistLocalStorage } from '@legendapp/state/persist-plugins/local-storage';
import { configureSynced, synced } from '@legendapp/state/sync';
import { syncedFetch } from '@legendapp/state/sync-plugins/fetch';
import { syncedQuery } from '@legendapp/state/sync-plugins/tanstack-query';
import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

const mySyncedFetch = configureSynced(syncedFetch, {
  persist: {
    plugin: ObservablePersistLocalStorage,
    // retrySync: true,
  },
  // retry: {
  //   infinite: true,
  // },
});

// export const createProfileObservable = (userId: string) => {
//   return observable(
//     mySyncedFetch({
//       get: `http://localhost:3000/api/example/${userId}`,
//       set: `http://localhost:3000/api/example/${userId}`,
//       setInit: { method: 'PATCH' },
//       // transform: {
//       //   load: (value, method) => {
//       //     console.log('transform', value, method);
//       //     return value;
//       //   },
//       // },

//       // onSaved: (result) => {
//       //   console.log('onSaved', result);
//       //   return result;
//       // },

//       persist: {
//         name: `profile-${userId}`,
//       },
//       mode: 'set',
//       retry: {
//         infinite: true,
//         backoff: 'exponential',
//         maxDelay: 30,
//       },
//       debounceSet: 500,
//     }),
//   );
// };

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

      const response = await fetch(`http://localhost:3000/api/example/${id}`, {
        body: JSON.stringify(value),
        method: 'PATCH',
      });
      const data = await response.json();
      return data;
    },
    // // setInit: { method: 'PATCH' },
    // transform: {
    //   load: (value, method) => {
    //     console.log(method);

    //     if (method === 'get') {
    //       console.log('get', value);
    //       return value;
    //     }

    //     if (method === 'set') {
    //       console.log('set', value);
    //       return value;
    //     }
    //   },
    // },

    // // onSaved: (result) => {
    // //   console.log('onSaved', result);
    // //   return result;
    // // },

    // // persist: {
    // //   name: `profile`,
    // //   plugin: ObservablePersistLocalStorage,
    // //   retrySync: true,
    // // },
    // // mode: 'set' | 'assign' | 'merge' | 'append' | 'prepend',
    // // mode: 'merge',
    // retry: {
    //   infinite: true,
    //   backoff: 'exponential',
    //   maxDelay: 30,
    // },
    // debounceSet: 500,
  }),
});

// export const store = observable({
//   id: '',
//   example: syncedQuery({
//     queryClient,
//     query: {
//       queryKey: ['example'],
//       queryFn: async () => {
//         // await new Promise((resolve) => setTimeout(resolve, 2000));

//         const id = store.id.get() as string;

//         const response = await fetch(`http://localhost:3000/api/example/${id}`);
//         const data = await response.json();
//         return data;
//       },
//     },
//     mutation: {
//       mutationFn: async (variables) => {
//         // await new Promise((resolve) => setTimeout(resolve, 2000));

//         const id = store.id.get() as string;

//         const response = await fetch(`http://localhost:3000/api/example/${id}`, {
//           body: JSON.stringify(variables),
//           method: 'PATCH',
//         });
//         const data = await response.json();
//         return data;
//       },
//     },
//     // mode: 'set' | 'assign' | 'merge' | 'append' | 'prepend',
//     mode: 'set',
//     transform: {
//       load: (value, method) => {
//         if (method === 'get') {
//           return {
//             ...value,
//             method: 'GET',
//           };
//         } else if (method === 'set') {
//           return {
//             ...value,
//             method: 'PATCH',
//           };
//         }

//         console.log('transform', value);

//         return value;
//       },
//     },
//     retry: {
//       infinite: true,
//       backoff: 'exponential',
//       maxDelay: 30,
//     },
//     debounceSet: 500,
//   }),
// });
