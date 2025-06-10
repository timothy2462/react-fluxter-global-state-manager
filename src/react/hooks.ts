import { useSyncExternalStore } from 'react';
import { useStoreContext } from './context';
import { Selector, EqualityFn, Action } from '../core/types';

const defaultEqualityFn: EqualityFn<any> = (a, b) => a === b;

export function useSelector<S, T>(
  selector: Selector<S, T>,
  equalityFn: EqualityFn<T> = defaultEqualityFn
): T {
  const store = useStoreContext<S>();
  
  return useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState()),
    () => selector(store.getState())
  );
}

export function useDispatch<S>() {
  const store = useStoreContext<S>();
  return store.dispatch;
}

export function useStore<S>(): S {
  const store = useStoreContext<S>();
  
  return useSyncExternalStore(
    store.subscribe,
    () => store.getState(),
    () => store.getState()
  );
}