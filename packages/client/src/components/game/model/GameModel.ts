import { EventBus } from "../utils/EventBus";
import { GameAPI } from '../../../api/GameApi';
import { RunnerAction, Tile, TileSize, AnimationPhase } from "../constants";
import { worldToMap, getTileAt, mapToWorld } from '../utils'
import Runner from './Runner';
import { Runner as RunnerType } from "./Runner";
import { LevelMapType, LevelType, ModelEvents } from "./types";
import { checkCollision } from './checkCollision';
import { agent } from './agent';

export class GameModel extends EventBus {
  private reader: FileReader;
  private time: number;

  private inited = false;
  private paused = false;

  private levelNum = 0;
  private score = 0;
  private rest = 5;

  private levels: Blob;
  private levelMap: LevelMapType;
  private player: RunnerType;
  private bonuses = 0;
  private enemy: RunnerType;

  private _lastPressed: number; // TODO: подумать где и как это xранить более лучше

  constructor() {
    super();
    this.player = new Runner();
    this.enemy = new Runner();

    // TODO: убрать это отсюда куда-нить
    GameAPI.read('levels150.set').then(({ data }) => {
      this.levels = data;
      this.getLevel(this.levelNum);
    })

    this.reader = new FileReader();
    this.reader.addEventListener('loadend', () => {
      const data = new Int8Array(this.reader.result as ArrayBuffer);
      const level: LevelMapType = [];
      let player = { x: 0, y: 0 };
      let enemy = { x: 0, y: 0 };
      const bonuses = data.reduce((prev, curr, i) => {
        const x = i % 32;
        const y = Math.floor(i / 32);
        if (!level[y]) {
          level[y] = [];
        }
        level[y][x] = (curr === Tile.Enemy || curr === Tile.Player) ? Tile.Empty : curr;
        if (curr === Tile.Player) {
          player = mapToWorld({ x, y });
        }
        if (curr === Tile.Enemy) {
          enemy = mapToWorld({ x, y });
        }
        return curr === Tile.Bonus ? prev + 1 : prev;
      }, 0);
      this.setLevel({ level, player, bonuses, enemy });
    });
    // ---
  }

  public setLevel({ level, player, bonuses, enemy }: LevelType): void {
    this.levelMap = level;
    this.player.update(player);
    this.enemy.update(enemy);
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

  public getLevelMap(): LevelMapType {
    return this.levelMap;
  }

  public init() {
    if (this.levelMap) {
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
    this.dispatch(ModelEvents.UpdateWorld, { level: this.levelMap });
    this.enemy.setAction(RunnerAction.MoveLeft);
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
        this.levelMap[y][x] = Tile.Empty;
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

    const newPlayerState = checkCollision(dTime, this.player);
    this.player.update(newPlayerState.position);

    const newEnemyState = agent(dTime, this.enemy);
    this.enemy.update(newEnemyState.position)

    const playerAtMap = worldToMap({ x: this.player.x + TileSize / 2, y: this.player.y + TileSize / 2 });
    if (getTileAt(playerAtMap) === Tile.Bonus) {
      this.dispatch(ModelEvents.UpdateWorld, { burn: playerAtMap });
      this.levelMap[playerAtMap.y][playerAtMap.x] = Tile.Empty;
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
    const player = {
      x: this.player.x,
      y: this.player.y,
      phase: newPlayerState.phase,
      direction: this.player.orientation,
    }
    const enemy = {
      x: this.enemy.x,
      y: this.enemy.y,
      phase: newEnemyState.phase,
      direction: this.enemy.orientation,
    }

    this.dispatch(ModelEvents.Update, { dTime, player, enemy });
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
