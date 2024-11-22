import { Todo } from '@/types/todo';

import { observable } from '@legendapp/state';

export interface StoreType {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  loading: boolean;
  error: string | null;
}

export const store = observable<StoreType>({
  todos: [],
  filter: 'all',
  loading: false,
  error: null,
});
