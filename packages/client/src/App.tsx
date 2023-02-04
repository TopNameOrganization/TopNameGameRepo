import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material'

function App() {
  const theme = createTheme()

  return (
    <ThemeProvider theme={theme}>
      Вот тут будет жить ваше приложение :)
    </ThemeProvider>
  )
}

export default App
