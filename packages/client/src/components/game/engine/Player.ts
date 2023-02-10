import { Tiles, Directions } from "../constants";

export class Player {
  private _x: number;
  private _y: number;
  private _level;

  constructor({ x, y }, level) {
    this._x = x;
    this._y = y;
    this._level = level;
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  public move = (dir: Directions) => {
    const tile = this.getTileAt(0, 0)
    const tileUnder = this.getTileAt(0, 1)
    const dy = dir === Directions.Down ? 1 : -1;
    const dx = dir === Directions.Right ? 1 : -1
    switch (dir) {
      case Directions.Up:
      case Directions.Down:
        if (this.checkFall()) {
          this._y += 1;
          break;
        }
        if (tile === Tiles.Stair || tileUnder === Tiles.Stair) {
          if (this.getTileAt(0, dy) === Tiles.Brick || (dir === Directions.Up && tile === Tiles.Empty)) {
            break;
          }
          this._y += dy;
        }
        break;
      case Directions.Right:
      case Directions.Left:
        if (this.getTileAt(dx, 0) === Tiles.Brick) {
          break;
        }
        this._x += dx;
        break;
    }
  }

  public checkFall(): boolean {
    return this.getTileAt(0, 1) === Tiles.Empty && this.getTileAt(0, 0) === Tiles.Empty;
  }

  private getTileAt(x, y): Tiles {
    return this._level[this.y + y][this._x + x];
  }
}
