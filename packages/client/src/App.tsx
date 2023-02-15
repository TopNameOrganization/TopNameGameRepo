import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material'
import { AuthProvider } from './context/AuthContext'
import { Router } from './Router'
import { QueryClientProvider, QueryClient } from 'react-query'
import { HashRouter } from 'react-router-dom'

const theme = createTheme()
const queryClient = new QueryClient()

function App() {
  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </HashRouter>
  )
}

export default App
