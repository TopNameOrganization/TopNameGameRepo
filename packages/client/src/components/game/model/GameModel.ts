import { EventBus } from "../utils/EventBus";
import { GameAPI } from '../../../api/GameApi';
import { RunnerAction, Tile, TileSize } from "../constants";
import { worldToMap, getTileAt } from '../utils'
import Runner from './Runner';
import { Runner as RunnerType } from "./Runner";
import { LevelType, PositionType, ModelEvents } from "./types";
import { checkCollision } from './checkCollision'

export class GameModel extends EventBus {
  private reader: FileReader;
  private time: number;

  private inited = false;
  private paused = false;

  private levelNum = 0;
  private score = 0;
  private rest = 5;

  private player: RunnerType;
  private level: LevelType;
  private levels: Blob;
  private bonuses = 0;

  private _lastPressed: number; // TODO: подумать где и как это xранить более лучше

  constructor() {
    super();
    this.player = new Runner();

    // TODO: убрать это отсюда куда-нить
    GameAPI.read('levels150.set').then(({ data }) => {
      this.levels = data;
      this.getLevel(this.levelNum);
    })

    this.reader = new FileReader();
    this.reader.addEventListener('loadend', () => {
      const data = new Int8Array(this.reader.result as ArrayBuffer);
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
    // ---
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

  public getLevelMap(): LevelType {
    return this.level;
  }

  public init() {
    if (this.level) {
      this.dispatchUpdate();
    }
    this.dispatch(ModelEvents.UpdateRest, this.rest);
    this.inited = true;
  }

  public togglePause() {
    this.paused = !this.paused;
    this.dispatch(ModelEvents.Pause, this.paused);
    if (!this.paused) {
      this.time = new Date().getTime();
      this.update();
    }
  }

  public replay() {
    this.rest--;
    if (this.rest < 0) {
      console.log('OVER!!1');
    } else {
      this.dispatch(ModelEvents.UpdateRest, this.rest);
      this.getLevel(this.levelNum);
      this.paused = false;
      this.dispatch(ModelEvents.Pause, this.paused);
    }
  }

  public levelUp() {
    this.rest--;
    if (this.rest < 0) {
      console.log('OVER!!1');
    } else {
      this.dispatch(ModelEvents.UpdateRest, this.rest);
      this.levelNum++;
      this.getLevel(this.levelNum);
      this.dispatch(ModelEvents.LevelUp, this.levelNum);

      this.paused = false;
      this.dispatch(ModelEvents.Pause, this.paused);
    }
  }

  public gameOver() {
    this.dispatch(ModelEvents.GameOver, { score: this.score, level: this.levelNum + 1 })
  }

  public dispatchUpdate(): void {
    this.dispatch(ModelEvents.UpdateWorld, { level: this.level });
    this.update();
  }

  public setPlayerAction(action: RunnerAction) {
    this.player.setAction(action);
  }

  public burn() {
    if (!this.paused) {
      const { orientation } = this.player;
      const dx = orientation === 0 ? -1 : 1;
      let { x, y } = worldToMap({ x: this.player.x + TileSize / 2, y: this.player.y });
      x += dx;
      y++;
      if (getTileAt({ x, y }) === Tile.Brick) {
        this.player.setAction(RunnerAction.Stay);
        this.level[y][x] = Tile.Empty;
        this.dispatch(ModelEvents.UpdateWorld, { burn: { x, y } })
      }
    }
  }

  public update() {
    const currentTime = new Date().getTime();
    let dTime = 0;
    if (this.time) {
      dTime = (currentTime - this.time) / 1000;
    };

    const collision = checkCollision(dTime, this.player);
    const { position, phase } = collision;
    this.player.update(position);

    const playerAtMap = worldToMap({ x: this.player.x, y: this.player.y });
    if (getTileAt(playerAtMap) === Tile.Bonus) {
      this.dispatch(ModelEvents.UpdateWorld, { burn: playerAtMap });
      this.level[playerAtMap.y][playerAtMap.x] = Tile.Empty;
      this.bonuses--;
      this.score += 100;
      this.dispatch(ModelEvents.UpdateScore, this.score);
      if (this.bonuses === 0) {
        this.levelNum++;
        this.getLevel(this.levelNum);

        this.dispatch(ModelEvents.LevelUp, this.levelNum);
        return;
      }
    }

    this.time = currentTime;
    const { x, y, orientation: direction } = this.player;

    this.dispatch(ModelEvents.Update, { dTime, player: { x, y, phase, direction } });
    if (!this.paused) {
      requestAnimationFrame(this.update.bind(this));
    }
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
