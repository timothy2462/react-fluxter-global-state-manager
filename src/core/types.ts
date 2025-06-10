export type Action = { type: string } & Record<string, any>;
export type Reducer<S> = (currentState: S, action: Action) => S;
export type Store<S> = {
  getState: () => S;
  dispatch: (action: Action) => void;
  subscribe: (listener: () => void) => () => boolean;
  getStoreName: () => string;
  setStoreName: (name: string) => void;
};
export type Selector<S, T> = (state: S) => T;
export type EqualityFn<T> = (a: T, b: T) => boolean;