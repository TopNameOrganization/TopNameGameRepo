import React, { useState } from 'react'
import { Box } from '@mui/material'
import { TileSize } from '../../constants'
import GameModel from '../../model/GameModel'
import { PathStepType } from '../../model/types'
import { verticeId } from '../../model/buildGraph'

export const PathControl = ({
  vertices = [],
}: {
  vertices: Array<PathStepType>
}) => {
  const [path, setPath] = useState<Array<PathStepType>>([])
  const click = () => {
    GameModel.setEnemyPath(path)
  }
  const onVertice = (step: PathStepType) => {
    const newPath = [...path]
    newPath.push(step)
    setPath(newPath)
    const { x, y } = step
    GameModel.setVertices(verticeId({ x, y }))
  }
  return (
    <Box
      onClick={click}
      sx={{
        width: '100%',
        height: '100%',
        position: 'absolute',
      }}>
      {path.map(({ x, y }) => (
        <Box
          sx={{
            boxSizing: 'border-box',
            position: 'absolute',
            left: x * TileSize,
            top: y * TileSize,
            width: TileSize,
            height: TileSize,
            border: '4px solid green',
          }}
        />
      ))}
      {vertices.map(({ x, y, action }) => (
        <Box
          onClick={evt => {
            evt.stopPropagation()
            onVertice({ x, y, action })
          }}
          sx={{
            boxSizing: 'border-box',
            position: 'absolute',
            left: x * TileSize + 3,
            top: y * TileSize + 3,
            width: TileSize - 6,
            height: TileSize - 6,
            border: '4px solid pink',
            borderRadius: 1,
          }}
        />
      ))}
    </Box>
  )
}
