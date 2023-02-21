import { Tiles } from "../constants"

export type PositionType = {
  x: number,
  y: number,
}

export type SizeType = {
  width: number,
  height: number,
}

export type PlayerInfoType = PositionType & {
  phase: AnimationPhases,
  direction: number,
}

export enum AnimationPhases {
  Stay = 0,
  Run = 1,
  Climb = 2,
  Hang = 3,
  Fall = 4,
}

export type LevelType = Tiles[][];

// TODO: всё кроме Update - это неточно
export enum ModelEvents {
  Update = 'update',
  GameStart = 'start',
  LevelUp = 'levelUp',
  GameOver = 'over'
}
