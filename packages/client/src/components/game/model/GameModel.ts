import { Directions, Tiles, TileSize } from "../constants";
import Player from './Player';
import { Player as PlayerType } from "./Player";
import { EventBus } from "../utils/EventBus";
import { LevelType, SizeType, PositionType, ModelEvents } from "./types";

export class GameModel extends EventBus {
  private _player: PlayerType;
  private _level: LevelType;

  constructor() {
    super();
    this._player = Player;
  }

  // TODO: подумать более лучше про тип и вообще, как и где это хранить
  public setLevel({ level, player }: { level: LevelType, player: PositionType }): void {
    this._level = level;
    this._player.setPosition(player);
  }

  public dispatchUpdate(): void {
    // TODO: диспатчить ВСЕ изменения, а не только игрока
    this.dispatch(ModelEvents.Update, this.getPlayerPosition());
  }

  public getLevelSize(): SizeType {
    return { width: this._level[0].length * TileSize, height: this._level.length * TileSize };
  }

  public getLevel(): LevelType {
    return this._level;
  }

  public movePlayer(dir: Directions): void {
    const tile = this.getTileAtPlayer(0, 0);
    const tileUnder = this.getTileAtPlayer(0, 1);

    const { x, y } = this._player;
    const dy = dir === Directions.Down ? 1 : -1;
    const dx = dir === Directions.Right ? 1 : -1;

    switch (dir) {
      case Directions.Up:
      case Directions.Down:
        if (y + dy < 0 || y + dy >= this._level.length) {
          break;
        }
        if (this.checkPlayerFall()) {
          this._player.setPosition({ x, y: y + 1 });
          break;
        }
        if (tile === Tiles.Stair || tileUnder === Tiles.Stair) {
          if (this.getTileAtPlayer(0, dy) === Tiles.Brick || (dir === Directions.Up && tile === Tiles.Empty)) {
            break;
          }
          this._player.setPosition({ x, y: y + dy });
        }
        break;
      case Directions.Right:
      case Directions.Left:
        if (x + dx < 0 || x + dx >= this._level[0].length) {
          break;
        }
        if (this.getTileAtPlayer(dx, 0) === Tiles.Brick) {
          break;
        }
        this._player.setPosition({ x: x + dx, y });
        break;
    }

    if (this.checkPlayerFall()) {
      this.movePlayer(Directions.Down);
    }

    this.dispatchUpdate();
  }

  public checkPlayerFall(): boolean {
    return this.getTileAtPlayer(0, 1) === Tiles.Empty && this.getTileAtPlayer(0, 0) === Tiles.Empty;
  }

  private getPlayerPosition(): { x: number, y: number } {
    const { x, y } = this._player;
    return { x, y };
  }

  private getTileAtPlayer(x: number, y: number): Tiles {
    return this._level[this._player.y + y][this._player.x + x]
  }
}

export default new GameModel();
