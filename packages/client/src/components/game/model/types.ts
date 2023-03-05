import { Tile, AnimationPhase } from "../constants"

export type PositionType = {
  x: number,
  y: number,
}

export type CheckCollisionType = {
  position: PositionType,
  phase: AnimationPhase,
  event?: string,
}

export type PlayerInfoType = PositionType & {
  phase: AnimationPhase,
  direction: number,
}

export type LevelType = Tile[][];

// TODO: всё кроме Update - это неточно
export enum ModelEvents {
  Update = 'update',
  UpdateWorld = 'updateWorld',
  GameStart = 'start',
  Pause = 'pause',
  LevelUp = 'levelUp',
  UpdateScore = 'updateScore',
  UpdateRest = 'updateRest',
  GameOver = 'over'
}
