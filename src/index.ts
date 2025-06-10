export { createStore } from './core/store';
export type { Action, Reducer, Store, Selector, EqualityFn } from './core/types';

// React Redux exports
export { Provider } from './react/Provider';
export { useSelector, useDispatch, useStore } from './react/hooks';

// Zustand-style export
export { create } from './zustand-style';