import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider, createTheme } from '@mui/material'
import { AuthProvider } from './context/AuthContext'
import { QueryClientProvider, QueryClient } from 'react-query'
import { HashRouter } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary'
import { DefaultStub } from './components/DefaultStub'
import { Provider } from 'react-redux'
import { setupStore } from './store'
import { UserService } from './api/UserService'
import { YandexAPIRepository } from './repository/YandexAPIRepository'
import './index.css'

const initialState = window.initialState

delete window.initialState

const theme = createTheme()
const queryClient = new QueryClient()

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <Provider
    store={setupStore(
      new UserService(new YandexAPIRepository()),
      initialState
    )}>
    <HashRouter>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary msg={<DefaultStub />}>
            <AuthProvider>
              <App />
            </AuthProvider>
          </ErrorBoundary>
        </QueryClientProvider>
      </ThemeProvider>
    </HashRouter>
  </Provider>
)
