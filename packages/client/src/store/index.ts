import { rootReducer, RootState } from './reducers'
import { configureStore } from "@reduxjs/toolkit";

export const setupStore = (initialState?: RootState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState
  });
}
