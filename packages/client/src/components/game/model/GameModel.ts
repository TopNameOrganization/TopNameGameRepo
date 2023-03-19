import { EventBus } from '../utils/EventBus'
import { GameAPI } from '../../../api/GameApi'
import { RunnerAction, Tile, TileSize } from '../constants'
import { worldToMap, getTileAt, mapToWorld } from '../utils'
import Runner from './Runner'
import { Runner as RunnerType } from './Runner'
import {
  LevelMapType,
  LevelType,
  ModelEvents,
  PositionType,
  MessageType,
  PathStepType,
} from './types'
import { checkCollision } from './checkCollision'
import { Agent } from './Agent'
import { verticeId } from './buildGraph'
import { isBrowser } from '../../../constants/is-browser'

const OBSTACLE: Tile[] = [Tile.Brick, Tile.Concrete, Tile.Out]
export class GameModel extends EventBus {
  private reader: FileReader
  private time: number

  private inited = false
  private paused = false

  private levelNum = 0 // TODO: 24? 71!!1 108!!1 113!!1 123!!1 136!!1 141!!1 (33 65)!!1
  private score = 0
  private rest = 5

  private levels: Blob
  private levelMap: LevelMapType
  private player: RunnerType
  private bonuses = 0
  private agent: Agent
  private enemies: Array<RunnerType> = []

  private _lastPressed: number // TODO: подумать где и как это xранить более лучше

  constructor() {
    super()
    this.player = new Runner()
    this.agent = new Agent()

    if (isBrowser) {
      // TODO: убрать это отсюда куда-нить
      GameAPI.read('levels150.set').then(({ data }) => {
        this.levels = data
        this.getLevel(this.levelNum)
      })

      this.reader = new FileReader()
      this.reader.addEventListener('loadend', () => {
        const data = new Int8Array(this.reader.result as ArrayBuffer)
        const level: LevelMapType = []
        let player = { x: 0, y: 0 }
        const enemies: Array<PositionType> = []
        this.enemies = []
        const bonuses = data.reduce((prev, curr, i) => {
          const x = i % 32
          const y = Math.floor(i / 32)
          if (!level[y]) {
            level[y] = []
          }
          level[y][x] =
            curr === Tile.Enemy || curr === Tile.Player ? Tile.Empty : curr
          if (curr === Tile.Player) {
            player = mapToWorld({ x, y })
          }
          if (curr === Tile.Enemy && this.enemies.length === 0) {
            enemies.push(mapToWorld({ x, y }))
            this.enemies.push(new Runner())
          }
          return curr === Tile.Bonus ? prev + 1 : prev
        }, 0)
        this.setLevel({ level, player, bonuses, enemies })
      })
      // ---
    }
  }

  public setLevel({ level, player, bonuses, enemies }: LevelType): void {
    this.time = new Date().getTime()
    this.levelMap = level
    this.agent.updateGraph(enemies)
    this.player.update(player)
    enemies.forEach((runner, i) => this.enemies[i].reset(runner))
    this.bonuses = bonuses
    if (this.inited) {
      this.dispatchUpdate()
    }
  }

  private getLevel(n: number) {
    const start = n * 704
    const end = start + 704
    if (start >= this.levels.size || end > this.levels.size) {
      this.levelNum = 0
      this.getLevel(this.levelNum)
    } else {
      this.reader.readAsArrayBuffer(this.levels.slice(start, end))
    }
  }

  public getLevelMap(): LevelMapType {
    return this.levelMap
  }

  public init() {
    if (this.levelMap) {
      this.dispatchUpdate()
    }
    this.dispatch(ModelEvents.UpdateRest, this.rest)
    this.inited = true
  }

  public togglePause() {
    this.paused = !this.paused
    this.dispatch(ModelEvents.Message, {
      type: this.paused ? MessageType.Pause : MessageType.Hide,
      title: 'PAUSE',
      message: 'select action',
      noRest: this.rest === 0,
    })
    if (!this.paused) {
      this.time = new Date().getTime()
      this.update()
    }
  }

  public resetPause() {
    if (this.paused) {
      this.togglePause()
    }
  }

  public replay() {
    this.rest--
    if (this.rest < 0) {
      console.log('OVER!!1')
    } else {
      this.dispatch(ModelEvents.UpdateRest, this.rest)
      this.getLevel(this.levelNum)
      this.paused = false
      this.dispatch(ModelEvents.Message, { type: MessageType.Hide })
    }
  }

  public levelUp() {
    this.rest--
    if (this.rest < 0) {
      console.log('OVER!!1')
    } else {
      this.dispatch(ModelEvents.UpdateRest, this.rest)
      this.levelNum++
      this.getLevel(this.levelNum)
      this.dispatch(ModelEvents.LevelUp, this.levelNum)

      this.paused = false
      this.dispatch(ModelEvents.Message, { type: MessageType.Hide })
    }
  }

  public gameOver() {
    this.dispatch(ModelEvents.GameOver, {
      score: this.score,
      level: this.levelNum + 1,
    })
  }

  public setVertices(id: string) {
    const { edges } = this.agent.getGraph()[id]
    const vertices = edges.map(({ action, vertice }) => {
      const { x, y } = this.agent.getGraph()[vertice]
      return { x, y, action }
    })
    this.dispatch(ModelEvents.UpdateWorld, { vertices })
  }

  public setEnemyPath(path: Array<PathStepType>) {
    this.enemies[0].setPath(path)
  }

  public dispatchUpdate(): void {
    this.paused = true
    this.dispatch(ModelEvents.UpdateWorld, {
      level: this.levelMap,
      enemies: this.enemies.length,
    })
    const { x, y } = this.enemies[0]
    this.setVertices(verticeId(worldToMap({ x, y })))
    this.dispatch(ModelEvents.Message, {
      type: MessageType.Message,
      title: `LEVEL ${this.levelNum + 1}`,
    })
    this.update()
  }

  public setPlayerAction(action: RunnerAction) {
    this.player.setAction(action)
  }

  public burn() {
    if (!this.paused) {
      const { orientation } = this.player
      const dx = orientation === 0 ? -1 : 1
      let { x, y } = worldToMap({
        x: this.player.x + TileSize / 2,
        y: this.player.y,
      })
      x += dx
      y++
      if (getTileAt({ x, y }) === Tile.Brick) {
        this.player.setAction(RunnerAction.Stay)
        this.levelMap[y][x] = Tile.Empty
        this.dispatch(ModelEvents.UpdateWorld, { burn: { x, y } })
      }
    }
  }

  public update() {
    const currentTime = new Date().getTime()
    let dTime = 0
    if (this.time) {
      dTime = (currentTime - this.time) / 1000
    }

    const newPlayerState = checkCollision(dTime, this.player)
    this.player.update(newPlayerState.position)
    const player = {
      x: this.player.x,
      y: this.player.y,
      phase: newPlayerState.phase,
      direction: this.player.orientation,
    }

    const enemies = this.enemies.map(runner => {
      const newState = this.agent.update(dTime, runner)
      runner.update(newState.position)
      if (runner.pathIsPassed) {
        const goal = this.agent.getNearestVertice({
          x: this.player.x,
          y: this.player.y,
        })
        this.agent.findPath(runner, goal)
      }
      return {
        x: runner.x,
        y: runner.y,
        phase: newState.phase,
        direction: runner.orientation,
      }
    })

    const playerAtMap = worldToMap({
      x: this.player.x + TileSize / 2,
      y: this.player.y + TileSize / 2,
    })
    if (getTileAt(playerAtMap) === Tile.Bonus) {
      this.dispatch(ModelEvents.UpdateWorld, { burn: playerAtMap })
      this.levelMap[playerAtMap.y][playerAtMap.x] = Tile.Empty
      this.bonuses--
      this.score += 100
      this.dispatch(ModelEvents.UpdateScore, this.score)
      if (this.bonuses === 0) {
        this.levelNum++
        this.getLevel(this.levelNum)

        this.dispatch(ModelEvents.LevelUp, this.levelNum)
        return
      }
    }

    this.time = currentTime

    this.dispatch(ModelEvents.Update, { dTime, player, enemies })
    if (!this.paused) {
      requestAnimationFrame(this.update.bind(this))
    }
  }

  // ---
  public setLastPressed(val: number) {
    this._lastPressed = val
  }
  get lastPressed(): number {
    return this._lastPressed
  }
  // ---
}

export default new GameModel()
