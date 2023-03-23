import { useEffect } from 'react'
import { AuthProvider } from './context/AuthContext'
import { Router } from './Router'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ErrorBoundary } from './components/ErrorBoundary'
import { DefaultStub } from './components/DefaultStub'
import { serviceWorkersRegistration } from './serviceWorkersRegistration'
import { CustomThemeProvider } from './context/ThemeProvider'

const queryClient = new QueryClient()

function App() {
  useEffect(() => {
    serviceWorkersRegistration()
  }, [])

  return (
    <CustomThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary msg={<DefaultStub />}>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </ErrorBoundary>
      </QueryClientProvider>
    </CustomThemeProvider>
  )
}

export default App
