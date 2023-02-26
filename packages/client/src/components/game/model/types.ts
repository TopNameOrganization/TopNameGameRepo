import { Tile, AnimationPhase } from "../constants"

export type PositionType = {
  x: number,
  y: number,
}

export type SizeType = {
  width: number,
  height: number,
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
  LevelUp = 'levelUp',
  GameOver = 'over'
}
