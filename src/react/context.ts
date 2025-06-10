import { createContext, useContext } from 'react';
import { Store } from '../core/types';

const StoreContext = createContext<Store<any> | null>(null);

export const useStoreContext = <S>(): Store<S> => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStoreContext must be used within a StoreProvider');
  }
  return store;
};

export { StoreContext };