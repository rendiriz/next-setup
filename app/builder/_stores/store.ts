import { observable } from '@legendapp/state';

export interface StoreType {
  activeElement: string | null;
}

export const store = observable<StoreType>({
  activeElement: null,
});
