import { Action, Reducer, Store } from './types';

export function createStore<S extends Record<string, any>>(
  initialState: S,
  reducer: Reducer<S>,
  initialName: string = "default"
): Store<S> {
  let currentState = initialState;
  let storeName = initialName;
  let listeners: (() => void)[] = [];
  
  const getState = (): S => {
    return currentState;
  };
  
  const getStoreName = (): string => {
    return storeName;
  };
  
  const setStoreName = (newName: string): void => {
    storeName = newName;
    listeners.forEach(listener => listener());
  };
  
  const dispatch = (action: Action): void => {
    if (action.type === '@@RENAME_STORE') {
      if (typeof action.name === 'string') {
        setStoreName(action.name);
        return;
      }
    } 
    currentState = reducer(currentState, action);
    listeners.forEach(listener => listener());
  };
  
  const subscribe = (listener: () => void): (() => boolean) => {
    listeners.push(listener);
    
    return (): boolean => {
      const index = listeners.indexOf(listener);
      if (index === -1) {
        return false;
      }
      listeners.splice(index, 1);
      return true;
    };
  };
  
  dispatch({ type: '@@INIT' });
  
  return {
    getState,
    dispatch,
    subscribe,
    getStoreName,
    setStoreName
  };
}