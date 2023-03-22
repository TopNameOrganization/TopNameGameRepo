import { useEffect } from 'react'
import { AuthProvider } from './context/AuthContext'
import { Router } from './Router'
import { QueryClientProvider, QueryClient } from 'react-query'
import { HashRouter } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary'
import { DefaultStub } from './components/DefaultStub'
import { Provider } from 'react-redux'
import { serviceWorkersRegistration } from './serviceWorkersRegistration'
import { setupStore } from './store'
import { CustomThemeProvider } from './context/ThemeProvider'

const queryClient = new QueryClient()
const store = setupStore()

function App() {
  useEffect(() => {
    serviceWorkersRegistration()
  }, [])

  return (
    <Provider store={store}>
      <HashRouter>
        <CustomThemeProvider>
          <QueryClientProvider client={queryClient}>
            <ErrorBoundary msg={<DefaultStub />}>
              <AuthProvider>
                <Router />
              </AuthProvider>
            </ErrorBoundary>
          </QueryClientProvider>
        </CustomThemeProvider>
      </HashRouter>
    </Provider>
  )
}

export default App
