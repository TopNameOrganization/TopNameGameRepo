import { Tile } from '../../constants'
import { getImage } from './get-image';
import tileImg from '../../../../assets/game/editor/tiles.png'

export const tileEditorCfg = {
  img: getImage(tileImg)!,
  fps: 15,
  phases: {
    [Tile.Brick]: { start: 0, length: 1 },
    [Tile.Concrete]: { start: 1, length: 1 },
    [Tile.Stair]: { start: 2, length: 1 },
    [Tile.Rope]: { start: 3, length: 1 },
    [Tile.Bonus]: { start: 4, length: 1 },
    [Tile.Enemy]: { start: 5, length: 1 },
    [Tile.Player]: { start: 6, length: 1 },
  },
}
