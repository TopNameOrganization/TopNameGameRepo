import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLayout } from '../../layouts/AppLayout'
import './EndGameScreen.css'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'

export const EndGameScreen = () => {
  const navigate = useNavigate()

  return (
    <AppLayout>
      <Box sx={{
        position: 'absolute',
        top: '562px',
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'translateY(-50%)',
      }}>
        <Paper
          elevation={24}
          sx={{
            backgroundColor: 'black',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '24px 32px'
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
            direction={{ xs: 'column', sm: 'row', md: 'row' }}
            spacing={6}
            alignItems={{ xs: 'center', sm: 'flex-end', md: 'flex-end' }}
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
      </Box>
    </AppLayout>
  )
}
