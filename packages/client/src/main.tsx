import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { setupStore } from './store'
import { Provider } from 'react-redux'
import { RootState } from './store/reducers'
import { BrowserRouter } from 'react-router-dom'

declare const __INITIAL_STATE__: RootState;

const store = setupStore(__INITIAL_STATE__);

ReactDOM.hydrateRoot(
  document.getElementById('root')!,
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)