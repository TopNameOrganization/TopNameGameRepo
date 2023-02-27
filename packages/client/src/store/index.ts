import { rootReducer } from './reducers'
import { configureStore } from "@reduxjs/toolkit";

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}
