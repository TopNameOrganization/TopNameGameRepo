import React from 'react'

import { Level } from '../components/game/constants'

import { GameView } from '../components/game/view/GameView'
import GameModel from '../components/game/model/GameModel'

export const GamePage = () => {
  GameModel.setLevel({ level: Level, player: { x: 1, y: 1 } })

  return <GameView />
}
