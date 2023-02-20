import { PositionType } from "./types";
import { RunnerActions, VELOCITY, Tiles, TileSize } from "../constants";

export class Runner {
  private _x: number;
  private _y: number;
  private _action: RunnerActions = RunnerActions.Fall;

  private readonly magic: number = 2;

  constructor({ x, y }: PositionType) {
    this.update({ x, y });
  }

  public update({ x, y }: PositionType): void {
    this._x = x;
    this._y = y;
  }

  public setAction(action: RunnerActions) {
    if (this._action !== RunnerActions.Fall) {
      this._action = action;
    }
  }

  public resetAction() {
    this._action = RunnerActions.Stay;
  }

  public getNextPos(dTime: number): PositionType {
    const dx = dTime * VELOCITY;
    const dy = dTime * VELOCITY;
    let x: number = this._x;
    let y: number = this._y;
    switch (this.action) {
      case RunnerActions.MoveLeft:
        x = this._x - dx;
        break;
      case RunnerActions.MoveRight:
        x = this._x + dx;
        break;
      case RunnerActions.MoveUp:
        y = this._y - dy;
        break;
      case RunnerActions.MoveDown:
      case RunnerActions.Fall:
        y = this._y + dy;
        break;
      default:
    }
    return { x, y };
  }

  public getCheckCollisionPoint({ x, y }: PositionType): PositionType {
    switch (this._action) {
      case RunnerActions.MoveLeft:
        return { x, y: y + .5 * TileSize };
      case RunnerActions.MoveUp:
        return { x: x + .5 * TileSize, y };
      case RunnerActions.MoveRight:
        return { x: x + TileSize - this.magic, y: y + .5 * TileSize };
      case RunnerActions.MoveDown:
      case RunnerActions.Fall:
        return { x: x + .5 * TileSize, y: y + TileSize - this.magic };
      default:
        return { x: 0, y: 0 };
    }
  }

  public getCheckPoints({ x, y }: PositionType): PositionType[] {
    switch (this._action) {
      case RunnerActions.MoveLeft:
        return [{ x, y }, { x, y: y + TileSize }];
      case RunnerActions.MoveUp:
        return [{ x, y }, { x: x + TileSize, y }];
      case RunnerActions.MoveRight:
        return [{ x: x + TileSize, y }, { x: x + TileSize, y: y + TileSize }];
      case RunnerActions.MoveDown:
      case RunnerActions.Fall:
        return [{ x, y: y + TileSize }, { x: x + TileSize, y: y + TileSize }];
    }
    return [];
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get action(): RunnerActions {
    return this._action;
  }
}

export default Runner;
