import { AppStore } from './store/reducers'

export {}

declare const __SERVER_PORT__: number

declare global {
  interface Window {
    initialState?: AppStore
  }
}
