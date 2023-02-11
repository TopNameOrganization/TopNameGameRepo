import React, { useRef, useEffect } from 'react'

import { Directions, TileSize } from '../constants'
import GameModel from '../model/GameModel'
import { ModelEvents, PositionType } from '../model'

import { LevelHolder } from './elements/level'

export const GameView = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const model = GameModel
  const { width, height } = model.getLevelSize()

  const drawFrame = (playerPosition: PositionType) => {
    const ctx = canvasRef.current.getContext('2d')
    // TODO: это должен делать спрайт, каждый сам за себя, а не весь canvas перерисовывать
    ctx.clearRect(0, 0, width, height)

    // вроде не особо на что влияет, но лучше проверить
    if (playerPosition) {
      const { x, y } = playerPosition
      ctx.fillStyle = 'grey'
      ctx.fillRect(x * TileSize, y * TileSize, TileSize, TileSize)
    }
  }

  const onKey = (evt: KeyboardEvent): void => {
    evt.preventDefault()
    const { keyCode } = evt
    if (keyCode >= Directions.Left && keyCode <= Directions.Down) {
      model.movePlayer(keyCode)
    }
  }

  useEffect(() => {
    document.addEventListener('keyup', onKey)
    model.on(ModelEvents.Update, drawFrame)
    model.dispatchUpdate()
  }, [])

  return (
    <div>
      <LevelHolder level={model.getLevel()} />
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          position: 'relative',
          top: `${-height}px`,
        }}
      />
    </div>
  )
}
