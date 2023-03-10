import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { setupStore } from './store'
import { ConnectedRouter } from "connected-react-router";
import { Provider } from 'react-redux'

const { store, history } = setupStore()

ReactDOM.hydrateRoot(
  document.getElementById('root')!,
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
)