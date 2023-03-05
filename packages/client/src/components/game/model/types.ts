import { Tile, AnimationPhase } from "../constants";

export type PositionType = {
  x: number,
  y: number,
}

export type CheckCollisionType = {
  position: PositionType,
  phase: AnimationPhase,
  isEnd: boolean,
}

export type RunnerInfoType = PositionType & {
  phase: AnimationPhase,
  direction: number,
}

export type LevelMapType = Tile[][];

export type LevelType = {
  level: LevelMapType,
  player: PositionType,
  bonuses: number,
  enemy: PositionType,
}

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
