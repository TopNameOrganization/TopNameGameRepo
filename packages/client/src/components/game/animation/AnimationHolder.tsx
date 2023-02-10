import React, { useRef, useEffect } from 'react'
import { TileSize, Directions } from '../constants'
import { Player } from '../engine/Player'

export function AnimationHolder({ player, level }) {
  const playerInst = new Player(player, level)
  const canvasRef = useRef(null)

  const width = TileSize * level[0].length
  const height = TileSize * level.length

  const drawFrame = () => {
    const ctx = canvasRef.current.getContext('2d')
    ctx.clearRect(0, 0, width, height)

    const { x, y } = playerInst

    ctx.fillStyle = 'grey'
    ctx.fillRect(x * TileSize, y * TileSize, TileSize, TileSize)

    if (playerInst.checkFall()) {
      playerInst.move(Directions.Down)
      drawFrame()
    }
  }

  const onKey = (evt: KeyboardEvent) => {
    evt.defaultPrevented
    switch (evt.keyCode) {
      case 37: //left
        playerInst.move(Directions.Left)
        break
      case 38: //up
        playerInst.move(Directions.Up)
        break
      case 39: //right
        playerInst.move(Directions.Right)
        break
      case 40: //down
        playerInst.move(Directions.Down)
        break
      default:
    }
    drawFrame()
  }

  useEffect(() => {
    document.addEventListener('keyup', onKey)
  }, [])

  useEffect(() => {
    drawFrame()
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        position: 'relative',
        top: `${-height}px`,
      }}
    />
  )
}
