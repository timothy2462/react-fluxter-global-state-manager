import { useSyncExternalStore } from 'react';
import { createStore } from './core/store';
import { Action, Reducer, Selector, EqualityFn } from './core/types';

const defaultEqualityFn: EqualityFn<any> = (a, b) => a === b;

export function create<S extends Record<string, any>>(
  initialState: S,
  reducer: Reducer<S>,
  storeName: string = "zustand-store"
) {
  const store = createStore(initialState, reducer, storeName);
  
  return function useStore<T = S>(
    selector?: Selector<S, T>,
    equalityFn: EqualityFn<T> = defaultEqualityFn
  ): T {
    return useSyncExternalStore(
      store.subscribe,
      () => selector ? selector(store.getState()) : store.getState() as unknown as T,
      () => selector ? selector(store.getState()) : store.getState() as unknown as T
    );
  };
}