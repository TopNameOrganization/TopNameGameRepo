import React, { useLayoutEffect } from 'react'

import { GameView } from '../components/game/view/GameView'
import { GeneralLayout } from '../layouts'

export const GamePage = () => {
  return (
    <GeneralLayout>
      <GameView />
    </GeneralLayout>
  )
}
