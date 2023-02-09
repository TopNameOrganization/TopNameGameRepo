import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material'
import './App.css'
import router from './router/router'


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
