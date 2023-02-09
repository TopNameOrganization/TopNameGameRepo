
import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './router/router'
import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme()

    fetchServerData()
  }, [])
  return <div className="App">
    <RouterProvider router={router}></RouterProvider>
  </div>
  
function App() {
  return (
    <ThemeProvider theme={theme}>
      Вот тут будет жить ваше приложение :)
    </ThemeProvider>
  )
}

export default App
