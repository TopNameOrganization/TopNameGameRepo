import { RunnerActions, Tiles, TileSize } from "../constants";
import Runner from './Runner';
import { Runner as RunnerType } from "./Runner";
import { EventBus } from "../utils/EventBus";
import { LevelType, SizeType, PositionType, ModelEvents } from "./types";

export class GameModel extends EventBus {
  private time: number;
  private player: RunnerType;
  private level: LevelType;

  constructor() {
    super();

    // TODO: унести это отсюда куда-то
    const reader = new FileReader();
    reader.addEventListener('loadend', () => {
      const data = new Int8Array(reader.result);
      const dataLength = data.length;
      let i = 0;
      const level: number[][] = [];
      const player = { x: 0, y: 0 }
      while (i < dataLength) {
        const x = i % 32;
        const y = Math.floor(i / 32);
        if (data[i] === 7) {
          player.x = x * TileSize;
          player.y = y * TileSize;
        }
        if (!level[y]) {
          level[y] = [];
        }
        level[y][x] = data[i];
        i++;
      }
      this.setLevel({ level, player });
    });

    const req = new XMLHttpRequest();
    req.open("GET", "/game/level.bin", true);
    req.responseType = "blob";
    req.onload = () => {
      const blob = req.response;
      reader.readAsArrayBuffer(blob);
    };
    req.send();
  }

  // TODO: подумать более лучше про тип и вообще, как и где это хранить
  public setLevel({ level, player }: { level: LevelType, player: PositionType }): void {
    this.level = level;
    this.player = new Runner(player);
  }

  // чтоб GameView могло узнать, какого размера canvas делать
  public getLevelSize(): SizeType {
    return { width: this.level[0].length * TileSize, height: this.level.length * TileSize };
  }

  // чтоб GameView могло узнать, какой уровень рисовать
  public getLevel(): LevelType {
    return this.level;
  }

  public dispatchUpdate(): void {
    this.update();
  }

  public setPlayerAction(action: RunnerActions) {
    this.player.setAction(action);
  }

  public update() {
    const currentTime = new Date().getTime();

    if (this.time) {
      const dTime = (currentTime - this.time) / 1000;

      const { action } = this.player;
      const { x: xNew, y: yNew } = this.player.getNextPos(dTime);
      let x: number = xNew;
      let y: number = yNew;

      const collision = this.worldToMap(this.player.getCheckCollisionPoint({ x: xNew, y: yNew }));
      const tile = this.getTileAt(collision);
      const playerTile = this.getTileAtPlayer(0, 0);
      const playerTilePos = this.mapToWorld(this.playerAtMap());

      if (action !== RunnerActions.Fall) {
        if (this.checkFall()) {
          this.player.setAction(RunnerActions.Fall);
          this.update();
          return;
        };
      }
      if (action !== RunnerActions.Stay) {
        if (action === RunnerActions.Fall) {
          if (playerTile === Tiles.Rope) {
            y = playerTilePos.y;
            this.player.resetAction();
          }
          if (tile === Tiles.Stair) {
            y = playerTilePos.y;
            this.player.resetAction();
          }
        }

        if (action === RunnerActions.MoveUp) {
          if (playerTile === Tiles.Stair
            && (tile === Tiles.Stair || tile === Tiles.Rope || tile === Tiles.Empty)
          ) {
            x = playerTilePos.x;
          } else {
            y = playerTilePos.y;
          }
        }

        if (action === RunnerActions.MoveDown) {
          if (playerTile === Tiles.Empty
            || playerTile === Tiles.Stair) {
            x = playerTilePos.x;
          }
        }

        if (tile === Tiles.Brick || tile === Tiles.Concrete) {
          // туда нельзя, ровнять координаты по движению
          switch (action) {
            case RunnerActions.MoveLeft:
            case RunnerActions.MoveRight:
              x = playerTilePos.x;
              y = this.player.y;
              break;
            case RunnerActions.MoveUp:
            case RunnerActions.MoveDown:
            case RunnerActions.Fall:
              x = this.player.x;
              y = playerTilePos.y;
              if (action === RunnerActions.Fall) {
                this.player.resetAction();
              }
              break;
          }
        }

        this.player.update({ x, y });
      }
    }
    this.time = currentTime;
    const { x, y } = this.player;
    this.dispatch(ModelEvents.Update, { player: { x, y }, rDeb: { x: 0, y: 0, w: 100, h: 100 } });
    requestAnimationFrame(this.update.bind(this));
  }

  private checkFall(): boolean {
    const mid: PositionType = this.worldToMap({ x: this.player.x + .5 * TileSize, y: this.player.y + .5 * TileSize });
    const bottom: PositionType = this.worldToMap({ x: this.player.x + .5 * TileSize, y: this.player.y + TileSize });
    return this.getTileAt(mid) === Tiles.Empty
      && (this.getTileAt(bottom) === Tiles.Empty || this.getTileAt(bottom) === Tiles.Rope);
  }

  private getTileAt({ x, y }: PositionType): Tiles {
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

  private getTileAtPlayer(x: number, y: number, offset: PositionType = { x: .5, y: .5 }): Tiles {
    const xOffset: number = offset.x * TileSize;
    const yOffset: number = offset.y * TileSize;
    const xTile = Math.floor((this.player.x + xOffset) / TileSize);
    const yTile = Math.floor((this.player.y + yOffset) / TileSize);
    return this.level[yTile + y][xTile + x];
  }
}

export default new GameModel();
