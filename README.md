

# React Global State

A lightweight, TypeScript-first state management library for React and React Native applications. This library provides two familiar APIs: Redux-style for complex state management and Zustand-style for simpler use cases.

## Features

- 🚀 **Lightweight** - Minimal bundle size with zero dependencies (except React)
- 🎯 **TypeScript First** - Full TypeScript support with excellent type inference
- 🔄 **Two APIs** - Choose between Redux-style or Zustand-style based on your needs
- ⚡ **Performance** - Uses React 18's `useSyncExternalStore` for optimal performance
- 📱 **Universal** - Works with both React and React Native
- 🎨 **Flexible** - Support for multiple stores and custom equality functions

## Installation

```bash
npm install react-fluxter
# or
yarn add react-fluxter
```

## Quick Start

### Redux-Style API

Perfect for complex applications that need structured state management with actions and reducers.

#### 1. Define Your State and Actions

```typescript
// types.ts
export interface CounterState {
  count: number;
  name: string;
}

export type CounterAction = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'SET_COUNT'; payload: number }
  | { type: 'SET_NAME'; payload: string };
```

#### 2. Create a Reducer

```typescript
// reducer.ts
import { CounterState, CounterAction } from './types';

const initialState: CounterState = {
  count: 0,
  name: 'Counter App'
};

export function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'SET_COUNT':
      return { ...state, count: action.payload };
    case 'SET_NAME':
      return { ...state, name: action.payload };
    default:
      return state;
  }
}

export { initialState };
```

#### 3. Create and Provide the Store

```typescript
// App.tsx
import React from 'react';
import { createStore, Provider } from 'react-fluxter';
import { counterReducer, initialState } from './store/reducer';
import Counter from './components/Counter';

const store = createStore(initialState, counterReducer, 'counter-store');

function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

export default App;
```

#### 4. Use the Store in Components

```typescript
// components/Counter.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-fluxter';
import { CounterState, CounterAction } from '../store/types';

function Counter() {
  // Select specific parts of state
  const count = useSelector<CounterState, number>(state => state.count);
  const name = useSelector<CounterState, string>(state => state.name);
  
  // Get dispatch function
  const dispatch = useDispatch<CounterState>();

  const handleIncrement = () => {
    dispatch({ type: 'INCREMENT' });
  };

  const handleDecrement = () => {
    dispatch({ type: 'DECREMENT' });
  };

  const handleSetName = () => {
    dispatch({ type: 'SET_NAME', payload: 'Updated Counter' });
  };

  return (
    <div>
      <h1>{name}</h1>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
      <button onClick={handleSetName}>Change Name</button>
    </div>
  );
}

export default Counter;
```

### Zustand-Style API

Perfect for simpler state management needs with a more direct approach.

#### 1. Create a Store Hook

```typescript
// store/useCounterStore.ts
import { create } from 'react-fluxter';

interface CounterState {
  count: number;
  name: string;
}

type CounterAction = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'SET_COUNT'; payload: number }
  | { type: 'SET_NAME'; payload: string };

const initialState: CounterState = {
  count: 0,
  name: 'Zustand Counter'
};

function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'SET_COUNT':
      return { ...state, count: action.payload };
    case 'SET_NAME':
      return { ...state, name: action.payload };
    default:
      return state;
  }
}

export const useCounterStore = create(initialState, counterReducer, 'zustand-counter');
```

#### 2. Use the Store Directly in Components

```typescript
// components/ZustandCounter.tsx
import React from 'react';
import { useCounterStore } from '../store/useCounterStore';

function ZustandCounter() {
  // Get entire state
  const { count, name } = useCounterStore();
  
  // Or select specific parts
  const justCount = useCounterStore(state => state.count);
  const justName = useCounterStore(state => state.name);

  // Note: You'll need to modify the Zustand-style API to return dispatch
  // For now, this shows the concept - see "Advanced Usage" for dispatch access

  return (
    <div>
      <h1>{name}</h1>
      <p>Count: {count}</p>
      {/* Actions would need to be implemented differently */}
    </div>
  );
}

export default ZustandCounter;
```

## React Native Usage

The library works identically in React Native:

```typescript
// App.tsx (React Native)
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createStore, Provider, useSelector, useDispatch } from 'react-fluxter';

// ... same store setup as React ...

function CounterScreen() {
  const count = useSelector<CounterState, number>(state => state.count);
  const dispatch = useDispatch<CounterState>();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>Count: {count}</Text>
      <TouchableOpacity 
        onPress={() => dispatch({ type: 'INCREMENT' })}
        style={{ backgroundColor: 'blue', padding: 10, margin: 5 }}
      >
        <Text style={{ color: 'white' }}>Increment</Text>
      </TouchableOpacity>
    </View>
  );
}
```

## Advanced Usage

### Custom Equality Functions

Optimize re-renders with custom equality functions:

```typescript
import { useSelector } from 'react-fluxter';

// Shallow equality for objects
const shallowEqual = (a: any, b: any) => {
  const keys1 = Object.keys(a);
  const keys2 = Object.keys(b);
  
  if (keys1.length !== keys2.length) return false;
  
  for (let key of keys1) {
    if (a[key] !== b[key]) return false;
  }
  
  return true;
};

function MyComponent() {
  const userInfo = useSelector(
    state => ({ name: state.user.name, email: state.user.email }),
    shallowEqual
  );
  
  return <div>{userInfo.name} - {userInfo.email}</div>;
}
```

### Multiple Stores

You can create and use multiple stores:

```typescript
// Create different stores for different domains
const userStore = createStore(userInitialState, userReducer, 'user-store');
const cartStore = createStore(cartInitialState, cartReducer, 'cart-store');

function App() {
  return (
    <Provider store={userStore}>
      <Provider store={cartStore}>
        <MyApp />
      </Provider>
    </Provider>
  );
}
```

### Store Name Management

Stores have names that can be changed dynamically:

```typescript
const store = createStore(initialState, reducer, 'my-store');

// Get current store name
console.log(store.getStoreName()); // 'my-store'

// Change store name (triggers subscribers)
store.setStoreName('updated-store');

// Or dispatch the special rename action
store.dispatch({ type: '@@RENAME_STORE', name: 'new-store-name' });
```

### Direct Store Access

Access the store directly without hooks:

```typescript
const store = createStore(initialState, reducer);

// Get current state
const currentState = store.getState();

// Subscribe to changes
const unsubscribe = store.subscribe(() => {
  console.log('State changed:', store.getState());
});

// Dispatch actions
store.dispatch({ type: 'INCREMENT' });

// Unsubscribe when done
unsubscribe();
```

## API Reference

### Core Functions

#### `createStore<S>(initialState, reducer, storeName?)`
Creates a new store instance.

- `initialState`: Initial state object
- `reducer`: Reducer function that handles actions
- `storeName`: Optional name for the store (default: "default")
- Returns: Store instance

#### `Provider<S>({ store, children })`
React context provider for the store.

- `store`: Store instance created with `createStore`
- `children`: React children to wrap

### Hooks

#### `useSelector<S, T>(selector, equalityFn?)`
Selects and subscribes to a part of the state.

- `selector`: Function that extracts data from state
- `equalityFn`: Optional equality function for optimization
- Returns: Selected data

#### `useDispatch<S>()`
Returns the dispatch function for the current store.

- Returns: Dispatch function

#### `useStore<S>()`
Returns the entire state object.

- Returns: Complete state object

### Zustand-Style

#### `create<S>(initialState, reducer, storeName?)`
Creates a Zustand-style hook for state management.

- `initialState`: Initial state object
- `reducer`: Reducer function that handles actions
- `storeName`: Optional name for the store
- Returns: Hook function that can accept selector and equalityFn

## TypeScript Tips

### Strict Typing with Actions

```typescript
// Create a discriminated union for type safety
type AppAction = 
  | { type: 'user/SET_NAME'; payload: string }
  | { type: 'user/SET_AGE'; payload: number }
  | { type: 'cart/ADD_ITEM'; payload: { id: string; name: string } }
  | { type: 'cart/REMOVE_ITEM'; payload: string };

// Reducer with full type safety
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'user/SET_NAME':
      return { ...state, user: { ...state.user, name: action.payload } };
    // TypeScript knows payload is string here
    
    case 'cart/ADD_ITEM':
      return { ...state, cart: [...state.cart, action.payload] };
    // TypeScript knows payload is { id: string; name: string } here
    
    default:
      return state;
  }
}
```

### Selector Type Inference

```typescript
// TypeScript automatically infers the return type
const userName = useSelector(state => state.user.name); // string
const userAge = useSelector(state => state.user.age);   // number
const cartCount = useSelector(state => state.cart.length); // number
```

## Performance Tips

1. **Use specific selectors** instead of selecting large objects
2. **Implement custom equality functions** for complex objects
3. **Memoize selectors** when performing expensive computations
4. **Split large stores** into smaller, domain-specific stores
5. **Use the Zustand-style API** for simpler use cases

## Migration Guide

### From Redux
- Replace `combineReducers` with multiple stores
- `useSelector` works similarly but requires type parameters
- `useDispatch` works the same way
- No need for Redux DevTools (but you can access state directly)

### From Zustand
- Use the `create` function for similar API
- Actions are handled through reducers instead of direct mutations
- Selectors work the same way

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests to our GitHub repository.
https://github.com/timothy2462/react-fluxter-global-state-manager

## License

MIT License - see LICENSE file for details.