import { useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material'
import { AuthProvider } from './context/AuthContext'
import { Router } from './Router'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ErrorBoundary } from './components/ErrorBoundary'
import { DefaultStub } from './components/DefaultStub'
import { serviceWorkersRegistration } from './serviceWorkersRegistration'

const theme = createTheme()
const queryClient = new QueryClient()

function App() {
  useEffect(() => {
    serviceWorkersRegistration()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary msg={<DefaultStub />}>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </ErrorBoundary>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
