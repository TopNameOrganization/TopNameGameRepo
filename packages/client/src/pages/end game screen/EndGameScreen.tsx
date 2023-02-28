import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLayout } from '../../layouts/AppLayout'
import './EndGameScreen.css'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import EndGameScreen from '../../components/game/EndGameScreen'

export const EndGamePage = () => {
  const navigate = useNavigate()

  return <EndGameScreen></EndGameScreen>
}
