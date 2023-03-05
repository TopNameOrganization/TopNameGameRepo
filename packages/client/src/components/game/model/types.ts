import { Tile, AnimationPhase } from "../constants";

export type PositionType = {
  x: number,
  y: number,
};

export type SizeType = {
  width: number,
  height: number,
};

export type PlayerInfoType = PositionType & {
  phase: AnimationPhase,
  direction: number,
};

export type LevelType = Tile[][];

export enum ModelEvents {
  Update = 'update',
  UpdateWorld = 'updateWorld',
  GameStart = 'start',
  Message = 'message',
  LevelUp = 'levelUp',
  UpdateScore = 'updateScore',
  UpdateRest = 'updateRest',
  GameOver = 'over',
};

export enum MessageType {
  Hide = 'hide',
  Pause = 'pause',
  Message = 'message',
};

export type ModelMessageType = {
  type: MessageType,
  noRest?: boolean,
  title?: string,
  message?: string,
};
