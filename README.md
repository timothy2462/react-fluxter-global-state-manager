# react-fluxter-global-state-manager
npm install npm i react-fluxter
```

### Redux-style usage:

import { createStore, Provider, useSelector, useDispatch } from 'react-fluxter';

// Create store
const store = createStore(
  { count: 0, name: 'John' },
  (state, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return { ...state, count: state.count + 1 };
      default:
        return state;
    }
  }
);

// Wrap app
function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

// Use in components
function Counter() {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();
  
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>
        Increment
      </button>
    </div>
  );
}
```

### Zustand-style usage:
```
import { create } from 'react-fluxter';

const useStore = create(
  { count: 0, name: 'John' },
  (state, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return { ...state, count: state.count + 1 };
      default:
        return state;
    }
  }
);

function Counter() {
  const count = useStore(state => state.count);
  const fullState = useStore();
  
  return <div>{count}</div>;
}
```