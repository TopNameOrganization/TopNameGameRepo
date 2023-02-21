import React, { useRef, useEffect } from 'react'

import { RunnerAction, TileSize, AnimationPhases } from '../constants'
import GameModel from '../model/GameModel'
import { ModelEvents, PlayerInfoType } from '../model'

import { LevelHolder } from './elements/level'
import { Sprite } from './elements/sprite'
import { playerCfg } from './spriteConfigs'

export const GameView = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sprite = new Sprite(playerCfg)

  const { width, height } = GameModel.getLevelSize()

  const drawFrame = (data: { dTime: number; player: PlayerInfoType }) => {
    const ctx = canvasRef.current?.getContext('2d')
    if (ctx) {
      ctx.clearRect(0, 0, width, height)
      const { player, dTime } = data
      // вроде не особо на что влияет, но лучше проверить
      if (player) {
        const { x, y, phase, direction } = player

        const src = sprite.getPhase(dTime, phase, direction)
        ctx.drawImage(
          src.img,
          src.x,
          src.y,
          TileSize,
          TileSize,
          x,
          y,
          TileSize,
          TileSize
        )
      }
    }
  }

  const onKeyUp = (evt: KeyboardEvent): void => {
    const { keyCode } = evt
    if (GameModel.lastPressed === keyCode) {
      if (
        keyCode >= RunnerAction.MoveLeft &&
        keyCode <= RunnerAction.MoveDown
      ) {
        evt.preventDefault()
        evt.stopImmediatePropagation()
        GameModel.setPlayerAction(RunnerAction.Stay)
      }
    }
  }

  const onKeyDown = (evt: KeyboardEvent): void => {
    const { keyCode } = evt
    if (keyCode >= RunnerAction.MoveLeft && keyCode <= RunnerAction.MoveDown) {
      evt.preventDefault()
      evt.stopImmediatePropagation()
      GameModel.setPlayerAction(keyCode)
      GameModel.setLastPressed(keyCode)
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
