import { Tiles } from "../constants"

export type PositionType = {
  x: number,
  y: number,
}

export type SizeType = {
  width: number,
  height: number,
}

export type LevelType = Tiles[][];

// TODO: всё кроме Update - это неточно
export enum ModelEvents {
  Update = 'update',
  GameStart = 'start',
  LevelUp = 'levelUp',
  GameOver = 'over'
}
