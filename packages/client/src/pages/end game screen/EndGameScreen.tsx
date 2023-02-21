import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLayout } from '../../layouts/AppLayout'
import './EndGameScreen.css'
import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material'

export const EndGameScreen = () => {
  const navigate = useNavigate()

  return (
    <AppLayout>
      {/* <Box component="main" className="game-over">
        <Container>
          <Paper
            elevation={24}
            sx={{
              backgroundColor: 'black',
              height: '300px',
              width: 'auto',
              transform: 'translateY(-60%)',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
            <Typography
              variant="h1"
              component="div"
              sx={{
                flexGrow: 1,
                color: 'red',
                fontFamily: 'VT323',
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: '150px',
              }}>
              GAME OVER
            </Typography>
            <Stack
              direction="row"
              spacing={6}
              alignItems="flex-end"
              justifyContent="center">
              <Button variant="contained" color="error">
                try again
              </Button>
              <Button
                onClick={() => navigate('/leaderboard')}
                variant="contained"
                color="error">
                leaderboard
              </Button>
              <Button
                onClick={() => navigate('/home')}
                variant="contained"
                color="error">
                quit
              </Button>
            </Stack>
          </Paper>
        </Container>
      </Box> */}
    </AppLayout>
  )
}
