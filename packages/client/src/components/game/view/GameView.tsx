import React, { useRef, useEffect } from 'react'

import { RunnerActions, TileSize } from '../constants'
import GameModel from '../model/GameModel'
import { ModelEvents, PositionType } from '../model'

import { LevelHolder } from './elements/level'

export const GameView = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const { width, height } = GameModel.getLevelSize()

  const drawFrame = (data: {
    player: PositionType
    rDeb: { x: number; y: number; w: number; h: number }
  }) => {
    const ctx = canvasRef.current?.getContext('2d')
    if (ctx) {
      // TODO: это должен делать спрайт, каждый сам за себя, а не весь canvas перерисовывать
      ctx.clearRect(0, 0, width, height)
      const { player, rDeb } = data
      // вроде не особо на что влияет, но лучше проверить
      if (player) {
        const { x, y } = player

        ctx.fillStyle = 'grey'
        ctx.fillRect(x, y, TileSize, TileSize)
      }
    }
  }

  const onKeyUp = (evt: KeyboardEvent): void => {
    evt.preventDefault()
    const { keyCode } = evt
    if (
      keyCode >= RunnerActions.MoveLeft &&
      keyCode <= RunnerActions.MoveDown
    ) {
      evt.stopImmediatePropagation()
      GameModel.setPlayerAction(RunnerActions.Stay)
      // GameModel.movePlayer(keyCode)
    }
  }

  const onKeyDown = (evt: KeyboardEvent): void => {
    evt.preventDefault()
    const { keyCode } = evt
    if (
      keyCode >= RunnerActions.MoveLeft &&
      keyCode <= RunnerActions.MoveDown
    ) {
      evt.stopImmediatePropagation()
      GameModel.setPlayerAction(keyCode)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keyup', onKeyUp)
    GameModel.on(ModelEvents.Update, drawFrame)
    GameModel.dispatchUpdate()
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('keyup', onKeyUp)
      GameModel.off(ModelEvents.Update, drawFrame)
    }
  }, [])

  return (
    <div>
      <LevelHolder level={GameModel.getLevel()} />
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
