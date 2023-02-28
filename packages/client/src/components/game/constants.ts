export const TileSize = 32;
export enum Tile {
  Empty = 0,
  Brick = 1,
  Concrete = 2,
  Stair = 3,
  Rope = 4,
  Bonus = 5,
  Enemy = 6,
  Player = 7,
  Out = 100,
}

export const VELOCITY = 200;
export enum Orientation {
  Left = 0,
  Right = 1,
}
export enum RunnerAction {
  Stay = 0,
  Fall = 1000,
  MoveLeft = 37,
  MoveUp = 38,
  MoveRight = 39,
  MoveDown = 40,
}

export enum AnimationPhase {
  Stay = 0,
  Run = 1,
  Climb = 2,
  Hang = 3,
  Fall = 4,
}
