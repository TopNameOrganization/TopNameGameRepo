import { rootReducer } from './reducers'
import { configureStore } from "@reduxjs/toolkit";
import { createBrowserHistory, createMemoryHistory } from 'history';

export const isServer = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export const setupStore = (url = '/') => {
  const history = isServer
        ? createMemoryHistory({ initialEntries: [url] })
        : createBrowserHistory();
  const store = configureStore({
    reducer: rootReducer(history),
    //preloadedState: initialState
  });

  return {
    store,
    history,
  };
}
