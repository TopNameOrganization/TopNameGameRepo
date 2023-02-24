import { RunnerAction, Tile, TileSize, AnimationPhase } from "../constants";
import Runner from './Runner';
import { Runner as RunnerType } from "./Runner";
import { EventBus } from "../utils/EventBus";
import { LevelType, SizeType, PositionType, ModelEvents } from "./types";

export class GameModel extends EventBus {
  private reader: FileReader;
  private time: number;
  private inited = false;
  private player: RunnerType;
  private levelNum = 0;
  private level: LevelType;
  private levels: Blob;
  private bonuses = 0;

  private _lastPressed: number; // TODO: подумать где и как это xранить более лучше

  constructor() {
    super();
    this.player = new Runner();

    const req = new XMLHttpRequest();
    req.open("GET", "/game/levels150.set", true);
    req.responseType = "blob";
    req.onload = () => {
      this.levels = req.response;
      this.getLevel(this.levelNum);
    };

    this.reader = new FileReader();
    this.reader.addEventListener('loadend', (evt: ProgressEvent<FileReader>) => {
      const data = new Int8Array(evt.currentTarget.result);
      const level: LevelType = [];
      const player = { x: 0, y: 0 };
      const bonuses = data.reduce((prev, curr, i) => {
        const x = i % 32;
        const y = Math.floor(i / 32);
        if (!level[y]) {
          level[y] = [];
        }
        level[y][x] = (curr === Tile.Enemy || curr === Tile.Player) ? Tile.Empty : curr;
        if (curr === Tile.Player) {
          player.x = x * TileSize;
          player.y = y * TileSize;
        }
        return curr === Tile.Bonus ? prev + 1 : prev;
      }, 0);
      this.setLevel({ level, player, bonuses });
    });

    req.send();
  }

  public setLevel({ level, player, bonuses }: { level: LevelType, player: PositionType, bonuses: number }): void {
    this.level = level;
    this.player.update(player);
    this.bonuses = bonuses;
    if (this.inited) {
      this.dispatchUpdate();
    }
  }

  private getLevel(n: number) {
    const start = n * 704;
    const end = start + 704;
    if (start >= this.levels.size || end > this.levels.size) {
      this.levelNum = 0;
      this.getLevel(this.levelNum);
    } else {
      this.reader.readAsArrayBuffer(this.levels.slice(start, end));
    }
  }

  public init() {
    if (this.level) {
      this.dispatchUpdate();
    }
    this.inited = true;
  }

  public dispatchUpdate(): void {
    this.dispatch(ModelEvents.UpdateWorld, { level: this.level });
    this.update();
  }

  public setPlayerAction(action: RunnerAction) {
    this.player.setAction(action);
  }

  public burn() {
    const { orientation } = this.player;
    const dx = orientation === 0 ? -1 : 1;
    let { x, y } = this.playerAtMap();
    x += dx;
    y++;
    if (this.getTileAt({ x, y }) === Tile.Brick) {
      this.player.setAction(RunnerAction.Stay);
      this.level[y][x] = Tile.Empty;
      this.dispatch(ModelEvents.UpdateWorld, { burn: { x, y } })
    }
  }

  public update() {
    const currentTime = new Date().getTime();
    let dTime = 0;
    let phase: AnimationPhase = AnimationPhase.Stay;
    if (this.time) {
      dTime = (currentTime - this.time) / 1000;

      const { action } = this.player;
      const { x: xNew, y: yNew } = this.player.getNextPos(dTime);
      let x: number = xNew;
      let y: number = yNew;

      const collision = this.worldToMap(this.player.getCheckCollisionPoint({ x: xNew, y: yNew }));
      const tile = this.getTileAt(collision);
      const playerTile = this.getTileAtPlayer(0, 0);
      const playerTilePos = this.mapToWorld(this.playerAtMap());

      if (action !== RunnerAction.Fall) {
        if (this.checkFall()) {
          this.player.setAction(RunnerAction.Fall);
          this.update();
          return;
        };
      }
      if (action !== RunnerAction.Stay) {
        if (action === RunnerAction.Fall) {
          if (playerTile === Tile.Rope) {
            y = playerTilePos.y;
            this.player.resetAction();
          }
          if (tile === Tile.Stair) {
            y = playerTilePos.y;
            this.player.resetAction();
          }
        }

        if (action === RunnerAction.MoveUp) {
          if (playerTile === Tile.Stair
            && (tile === Tile.Stair || tile === Tile.Rope || tile === Tile.Empty || tile === Tile.Bonus)
          ) {
            x = playerTilePos.x;
          } else {
            y = playerTilePos.y;
          }
        }

        if (action === RunnerAction.MoveDown) {
          if (playerTile === Tile.Empty
            || playerTile === Tile.Stair) {
            x = playerTilePos.x;
          }
        }

        if (tile === Tile.Brick || tile === Tile.Concrete || tile === Tile.Out) {
          // туда нельзя, ровнять координаты по движению
          switch (action) {
            case RunnerAction.MoveLeft:
            case RunnerAction.MoveRight:
              x = playerTilePos.x;
              y = this.player.y;
              break;
            case RunnerAction.MoveUp:
            case RunnerAction.MoveDown:
            case RunnerAction.Fall:
              x = this.player.x;
              y = playerTilePos.y;
              if (action === RunnerAction.Fall) {
                this.player.resetAction();
              }
              break;
          }
        }

        if (playerTile === Tile.Bonus) {
          this.dispatch(ModelEvents.UpdateWorld, { burn: this.playerAtMap() });
          this.level[this.playerAtMap().y][this.playerAtMap().x] = Tile.Empty;
          this.bonuses--;
          if (this.bonuses === 0) {
            this.levelNum++;
            this.getLevel(this.levelNum);
            // this.dispatch(ModelEvents.LevelUp);
            return;
          }
        }

        this.player.update({ x, y });

        switch (action) {
          case RunnerAction.MoveLeft:
          case RunnerAction.MoveRight:
            phase = playerTile === Tile.Rope ? AnimationPhase.Hang : AnimationPhase.Run;
            break;
          case RunnerAction.MoveDown:
          case RunnerAction.MoveUp:
            phase = AnimationPhase.Climb;
            break;
          case RunnerAction.Fall:
            phase = AnimationPhase.Fall;
            break;
          default:
        }
      }
    };

    this.time = currentTime;
    const { x, y, orientation: direction } = this.player;

    this.dispatch(ModelEvents.Update, { dTime, player: { x, y, phase, direction } });
    requestAnimationFrame(this.update.bind(this));
  }

  private checkFall(): boolean {
    const mid: PositionType = this.worldToMap({ x: this.player.x + .5 * TileSize, y: this.player.y + .5 * TileSize });
    const bottom: PositionType = this.worldToMap({ x: this.player.x + .5 * TileSize, y: this.player.y + TileSize });
    return this.getTileAt(mid) === Tile.Empty
      && (this.getTileAt(bottom) === Tile.Empty
        || this.getTileAt(bottom) === Tile.Rope
        || this.getTileAt(bottom) === Tile.Bonus);
  }

  private getTileAt({ x, y }: PositionType): Tile {
    if (x < 0 || y < 0 || x >= this.level[0].length || y >= this.level.length) {
      return Tile.Out;
    }
    return this.level[y][x];
  }

  // координаты мира -> координаты карты
  private worldToMap({ x, y }: PositionType): PositionType {
    return { x: Math.floor(x / TileSize), y: Math.floor(y / TileSize) };
  }

  // координаты карты -> координаты мира
  private mapToWorld({ x, y }: PositionType): PositionType {
    return { x: x * TileSize, y: y * TileSize };
  }

  private playerAtMap(offset: PositionType = { x: .5, y: .5 }): PositionType {
    const { x, y } = this.player;
    return {
      x: Math.floor((x + offset.x * TileSize) / TileSize),
      y: Math.floor((y + offset.y * TileSize) / TileSize)
    };
  }

  private getTileAtPlayer(x: number, y: number, offset: PositionType = { x: .5, y: .5 }): Tile {
    const xOffset: number = offset.x * TileSize;
    const yOffset: number = offset.y * TileSize;
    const xTile = Math.floor((this.player.x + xOffset) / TileSize);
    const yTile = Math.floor((this.player.y + yOffset) / TileSize);
    return this.level[yTile + y][xTile + x];
  }

  // ---
  public setLastPressed(val: number) {
    this._lastPressed = val;
  }
  get lastPressed(): number {
    return this._lastPressed;
  }
  // ---
}

export default new GameModel();
