import React from 'react'

import { Level } from '../components/game/constants'
import { LevelHolder } from '../components/game/level'
import { AnimationHolder } from '../components/game/animation/AnimationHolder'

export const GamePage = () => {
  return (
    <div>
      <LevelHolder level={Level} />
      <AnimationHolder player={{ x: 1, y: 1 }} level={Level} />
    </div>
  )
}
