import React, { useLayoutEffect } from 'react'

import { Level } from '../components/game/constants'
import { Level2 } from '../components/game/constants'

import { GameView } from '../components/game/view/GameView'
import GameModel from '../components/game/model/GameModel'
import { ModelEvents } from '../components/game/model'

export const GamePage = () => {
  // GameModel.setLevel({ level: Level })
  // GameModel.on(ModelEvents.LevelUp, () => {
  //   GameModel.setLevel({ level: Level2 })
  //   GameModel.dispatchUpdate()
  // })

  return <GameView />
}
