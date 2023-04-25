import { useState, useRef, SyntheticEvent, useEffect } from 'react'
import {
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from '@mui/material'
import { GeneralLayout } from '../layouts'
import { Tile, TileSize } from '../components/game/constants'
import { worldToMap, mapToWorld } from '../components/game/utils'
import { Sprite } from '../components/game/view/sprite'
import { tileEditorCfg } from '../components/game/view/spriteConfigs'
import { PositionType } from '../components/game/model/types'

const width = 32 * TileSize
const height = 22 * TileSize
const tileSpr = new Sprite(tileEditorCfg)
const ACTORS = [Tile.Player, Tile.Enemy]

const imagesData = [
  {
    img: '/src/assets/game/editor/brick.png',
    alt: 'Brick',
    type: Tile.Brick,
  },
  {
    img: '/src/assets/game/editor/concrete.png',
    alt: 'Concrete',
    type: Tile.Concrete,
  },
  {
    img: '/src/assets/game/editor/stair.png',
    alt: 'Stair',
    type: Tile.Stair,
  },
  {
    img: '/src/assets/game/editor/rope.png',
    alt: 'Rope',
    type: Tile.Rope,
  },
  {
    img: '/src/assets/game/editor/bonus.png',
    alt: 'Bonus',
    type: Tile.Bonus,
  },
  {
    img: '/src/assets/game/editor/enemy.png',
    alt: 'Enemy',
    type: Tile.Enemy,
  },
  {
    img: '/src/assets/game/editor/player.png',
    alt: 'Player',
    type: Tile.Player,
  },
  {
    img: '/src/assets/game/editor/remove.png',
    alt: 'Remove',
    type: Tile.Empty,
  },
]

export const LevelEditorPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctx = canvasRef.current?.getContext('2d')

  const [itemType, setItemType] = useState<Tile>(Tile.Brick)
  const [levelArray, setLevelArray] = useState<Array<Tile>>(
    new Array(32 * 22).fill(Tile.Empty, 0)
  )
  const [playerPos, setPlayerPos] = useState<PositionType | null>(null)

  const onCanvasClick = ({ nativeEvent }: SyntheticEvent) => {
    const { offsetX, offsetY } = nativeEvent as PointerEvent
    const { x, y } = worldToMap({ x: offsetX, y: offsetY })
    const index = y * 22 + x
    if (ACTORS.includes(itemType) && levelArray[index] !== Tile.Empty) {
      // do nothing
    } else {
      if (itemType === Tile.Player) {
        setPlayerPos({ x, y })
      } else if (levelArray[index] === Tile.Player) {
        setPlayerPos(null)
      }
      setLevelArray(
        levelArray.map((tile, i) => (i === index ? itemType : tile))
      )
      if (ctx) {
        ctx.clearRect(x * TileSize, y * TileSize, TileSize, TileSize)
        if (itemType !== Tile.Empty) {
          ctx.drawImage(
            tileSpr.getPhase(0, itemType),
            x * TileSize,
            y * TileSize
          )
        }
      }
    }
  }

  useEffect(() => {
    return () => {
      if (playerPos && itemType === Tile.Player) {
        if (ctx) {
          const atWorld = mapToWorld(playerPos)
          ctx.clearRect(atWorld.x, atWorld.y, TileSize, TileSize)
          const index = playerPos.y * 22 + playerPos.x
          setLevelArray(
            levelArray.map((tile, i) => (i === index ? Tile.Empty : tile))
          )
        }
      }
    }
  }, [playerPos])

  return (
    <GeneralLayout>
      <Grid container spacing={2} sx={{ padding: '20px' }}>
        <Grid item xs={10}>
          <Typography component="h6" variant="h6">
            Level preview
          </Typography>
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            onClick={onCanvasClick}
            style={{
              border: '2px grey solid',
              background: `url('src/assets/game/editor/grid.png') repeat`,
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Typography component="h6" variant="h6">
            Select type
          </Typography>
          <ImageList variant="masonry" cols={2} gap={4}>
            {imagesData.map(item => (
              <ImageListItem
                key={item.img}
                sx={{
                  padding: '8px',
                  width: '50px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  boxSizing: 'border-box',
                  border: itemType === item.type ? '1px red solid' : 'none',
                }}>
                <img
                  src={item.img}
                  srcSet={item.img}
                  onClick={() => setItemType(item.type)}
                  title={item.alt}
                  alt={item.alt}
                  loading="lazy"
                  style={{ border: '1px solid #dddddd', borderRadius: '2px' }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
      </Grid>
    </GeneralLayout>
  )
}
