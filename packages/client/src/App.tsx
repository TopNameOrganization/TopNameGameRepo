import React from 'react'
import { ThemeProvider, createTheme, ListSubheader } from '@mui/material'
import LeaderBoardPage from './pages/LeaderBoardPage'

function App() {
  const theme = createTheme()

  return (
    <ThemeProvider theme={theme}>
      <LeaderBoardPage></LeaderBoardPage>
      Вот тут будет жить ваше приложение :)
    </ThemeProvider>
  )
}

export default App
