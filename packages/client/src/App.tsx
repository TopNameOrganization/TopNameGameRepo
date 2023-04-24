import { useEffect } from 'react'
import { AuthProvider } from './context/AuthContext'
import { Router } from './Router'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ErrorBoundary } from './components/ErrorBoundary'
import { DefaultStub } from './components/DefaultStub'
import { serviceWorkersRegistration } from './serviceWorkersRegistration'
import { CustomThemeProvider } from './context/ThemeProvider'
import React from 'react'

const queryClient = new QueryClient()

function App() {
  useEffect(() => {
    serviceWorkersRegistration()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary msg={<DefaultStub />}>
        <AuthProvider>
          <CustomThemeProvider>
            <Router />
          </CustomThemeProvider>
        </AuthProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  )
}

export default App
