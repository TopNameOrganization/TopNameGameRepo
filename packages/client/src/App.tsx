import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './router/router'
import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme()


    function App() {
      return (
        <div className="App">
    <ThemeProvider theme={theme}>
<RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  </div>
  )
}

export default App
