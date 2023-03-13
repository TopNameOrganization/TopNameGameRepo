import { rootReducer } from './reducers'
import { configureStore } from '@reduxjs/toolkit'
import { UserService } from './types'

export const setupStore = (service: UserService, initialState?: any) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware({
        thunk: {
          extraArgument: service,
        },
      })
    },
  })
}
