import React from 'react'

import { LevelType } from '../../../model'
import { Tile, FlexContainer } from './styled'

export function LevelHolder({ level }: { level: LevelType }) {
  return (
    <div>
      {level.map((item, i) => (
        <FlexContainer key={`row${i}`}>
          {item.map((type, j) => (
            <Tile key={`tile${j}${i}`} type={type} />
          ))}
        </FlexContainer>
      ))}
    </div>
  )
}
