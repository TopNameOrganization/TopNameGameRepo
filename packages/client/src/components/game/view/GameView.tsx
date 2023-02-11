import React, { useRef, useEffect } from 'react'

import { Directions, TileSize } from '../constants'
import GameModel from '../model/GameModel'

import { LevelHolder } from './elements/level'

export const GameView = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const model = GameModel
  const { width, height } = model.getLevelSize()

  const drawFrame = () => {
    const ctx = canvasRef.current.getContext('2d')
    // TODO: это должен делать спрайт, каждый сам за себя
    ctx.clearRect(0, 0, width, height)

    const { x, y } = model.getPlayerPosition()
    ctx.fillStyle = 'grey'
    ctx.fillRect(x * TileSize, y * TileSize, TileSize, TileSize)

    // TODO: перепилить на события, не обращаться к модели напрямую, а подписаться на изменения в ней
    if (model.checkPlayerFall()) {
      model.movePlayer(Directions.Down)
      drawFrame()
    }
  }

  const onKey = (evt: KeyboardEvent): void => {
    evt.preventDefault()
    const { keyCode } = evt
    if (keyCode >= Directions.Left && keyCode <= Directions.Down) {
      model.movePlayer(keyCode)
      drawFrame()
    }
  }

  useEffect(() => {
    document.addEventListener('keyup', onKey)
    drawFrame()
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
