import React, { useRef, useEffect } from 'react'

import { RunnerAction, TileSize, Tile } from '../constants'
import GameModel from '../model/GameModel'
import { ModelEvents, PlayerInfoType, LevelType, PositionType } from '../model'

import { Sprite } from './sprite'
import { tileCfg } from './spriteConfigs'
import { playerCfg } from './spriteConfigs'

const width = 32 * TileSize
const height = 22 * TileSize

export const GameView = () => {
  const worldRef = useRef<HTMLCanvasElement>(null)
  const actorsRef = useRef<HTMLCanvasElement>(null)

  const tileSpr = new Sprite(tileCfg)
  const playerSpr = new Sprite(playerCfg)

  const updateWorld = ({
    level,
    burn,
  }: {
    level?: LevelType
    burn?: PositionType
  }) => {
    const ctx = worldRef.current?.getContext('2d')
    if (ctx) {
      if (level) {
        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, width, height)
      }
      level?.map((item, y) => {
        item.map((tile, x) => {
          if (![Tile.Empty, Tile.Player, Tile.Enemy].includes(tile)) {
            const src = tileSpr.getPhase(0, tile)
            ctx.drawImage(tileSpr.getPhase(0, tile), x * TileSize, y * TileSize)
          }
        })
      })
      if (burn) {
        const { x, y } = burn
        ctx.fillStyle = 'black'
        ctx.fillRect(x * TileSize, y * TileSize, TileSize, TileSize)
      }
    }
  }

  const drawFrame = (data: { dTime: number; player: PlayerInfoType }) => {
    const ctx = actorsRef.current?.getContext('2d')
    if (ctx) {
      ctx.clearRect(0, 0, width, height)
      const { player, dTime } = data
      // вроде не особо на что влияет, но лучше проверить
      if (player) {
        const { x, y, phase, direction } = player
        ctx.drawImage(playerSpr.getPhase(dTime, phase, direction), x, y)
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
    if (keyCode === 32) {
      evt.preventDefault()
      evt.stopImmediatePropagation()
      GameModel.burn()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keyup', onKeyUp)

    GameModel.on(ModelEvents.UpdateWorld, updateWorld)
    GameModel.on(ModelEvents.Update, drawFrame)
    GameModel.init()
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('keyup', onKeyUp)
      GameModel.off(ModelEvents.UpdateWorld, updateWorld)
      GameModel.off(ModelEvents.Update, drawFrame)
    }
  }, [])

  return (
    <div>
      <canvas ref={worldRef} width={width} height={height} />
      <canvas
        ref={actorsRef}
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
