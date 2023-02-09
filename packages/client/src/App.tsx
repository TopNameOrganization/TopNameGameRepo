import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme()

function App() {
  return (
    <ThemeProvider theme={theme}>
      Вот тут будет жить ваше приложение :)
    </ThemeProvider>
  )
}

export default App
