import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from '@mui/material'

import { LeaderData, User } from '../api/types'
import { LeaderBoardAPI } from '../api/LeaderBoardApi'
import { GeneralLayout } from '../layouts'
import { ROUTES } from '../constants'
import { useAppSelector } from '../hooks/redux'
import GameModel from '../components/game/model/GameModel'
import { ModelEvents } from '../components/game/model'
import { GameView } from '../components/game/view/GameView'
import { useAuth } from '../context/AuthContext'

export const GamePage = () => {
  const navigate = useNavigate()
  const {
    user: { data: user },
  } = useAuth()

  const onOver = async (data: { score: number; level: number }) => {
    if (user) {
      const { id, login: name } = user
      await LeaderBoardAPI.addLeader({ id, name, ...data })
    }
    navigate(ROUTES.leaderBoard.path)
  }
  useEffect(() => {
    GameModel.on(ModelEvents.GameOver, onOver)
  }, [])

  return (
    <GeneralLayout>
      <Container>
        <GameView />
      </Container>
    </GeneralLayout>
  )
}
