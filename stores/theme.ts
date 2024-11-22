import { observable } from '@legendapp/state';
import { syncedQuery } from '@legendapp/state/sync-plugins/tanstack-query';
import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const store = observable({
  theme: syncedQuery({
    queryClient,
    query: {
      queryKey: ['theme'],
      queryFn: async () => {
        return fetch('http://localhost:3000/api/theme').then((v) => v.json());
        // return fetch('https://dummyjson.com/posts/1').then((v) => v.json());
      },
    },
    mutation: {
      mutationFn: async (variables) => {
        return fetch('http://localhost:3000/api/theme', {
          body: JSON.stringify(variables),
          method: 'PUT',
        });
        // return fetch('https://dummyjson.com/posts/1', { body: JSON.stringify(variables), method: 'PUT' });
      },
    },
  }),
});
