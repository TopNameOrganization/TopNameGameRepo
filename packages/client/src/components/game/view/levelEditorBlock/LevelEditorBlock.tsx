import React, { FC } from 'react'
import { LevelEditorBlockProps } from './types'

export const LevelEditorBlock: FC<LevelEditorBlockProps> = ({
  width,
  height,
  strokeStyle,
  lineWidth,
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const ctx = canvasRef.current?.getContext('2d')

  if (ctx) {
    ctx.strokeStyle = strokeStyle
    ctx.lineWidth = lineWidth
    ctx.strokeRect(0, 0, width, height)
  }

  const handleClick = () => {
    console.log('Clicked from block')
  }

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onClick={handleClick}
    />
  )
}
