import React from 'react'
import { Tile } from './styled'

export function LevelHolder({ level }) {
  return (
    <div>
      {level.map(item => (
        <div style={{ display: 'flex' }}>
          {item.map(type => (
            <Tile type={type} />
          ))}
        </div>
      ))}
    </div>
  )
}
