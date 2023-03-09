import { rootReducer, RootState } from './reducers'
import { configureStore } from "@reduxjs/toolkit";
import { createBrowserHistory, createMemoryHistory } from 'history';


export const isServer = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export const setupStore = (url: string) => {
  const history = isServer
        ? createMemoryHistory({ initialEntries: [url] })
        : createBrowserHistory();
  return configureStore({
    reducer: rootReducer(history),
    //preloadedState: initialState
  })
}
