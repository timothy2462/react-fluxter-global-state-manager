import React, { ReactNode } from 'react';
import { StoreContext } from './context';
import { Store } from '../core/types';

interface ProviderProps<S> {
  store: Store<S>;
  children: ReactNode;
}

export function Provider<S>({ store, children }: ProviderProps<S>) {
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
}