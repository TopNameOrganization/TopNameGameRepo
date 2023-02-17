import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material'
import { AuthProvider } from './context/AuthContext'
import { Router } from './Router'
import { QueryClientProvider, QueryClient } from 'react-query'
import { HashRouter } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary'
import { DefaultStub } from './components/DefaultStub'
import { Provider } from 'react-redux'
import { store } from "./store";

const theme = createTheme()
const queryClient = new QueryClient()

function App() {
  return (
    <Provider store={store}>
        <HashRouter>
          <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
              <ErrorBoundary msg={<DefaultStub />}>
                <AuthProvider>
                  <Router />
                </AuthProvider>
              </ErrorBoundary>
            </QueryClientProvider>
          </ThemeProvider>
        </HashRouter>
    </Provider>
  )
}

export default App
