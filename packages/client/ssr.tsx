import App from './src/App'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { setupStore } from './src/store'
import { Provider } from 'react-redux'
import { UserService } from './src/api/UserService'
import { matchPath } from 'react-router-dom'
import React from 'react'
import { ROUTES } from './src/constants'
import { ThemeProvider, createTheme } from '@mui/material'
import { AuthProvider } from './src/context/AuthContext'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ErrorBoundary } from './src/components/ErrorBoundary'
import { DefaultStub } from './src/components/DefaultStub'
import './src/index.css'

const theme = createTheme()
const queryClient = new QueryClient()

async function render(uri, repository) {
  const [pathname] = uri.split('?')
  const store = setupStore(new UserService(repository))
  const currentRoute = Object.values(ROUTES).find(route =>
    matchPath(pathname, route.path)
  )
  if (currentRoute?.loader) {
    await currentRoute.loader(store.dispatch)
  }
  const initialState = store.getState()
  const renderResult = renderToString(
    <StaticRouter location={uri}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <ErrorBoundary msg={<DefaultStub />}>
              <AuthProvider>
                <App />
              </AuthProvider>
            </ErrorBoundary>
          </QueryClientProvider>
        </ThemeProvider>
      </Provider>
    </StaticRouter>
  )
  return [initialState, renderResult]
}

export { render }
