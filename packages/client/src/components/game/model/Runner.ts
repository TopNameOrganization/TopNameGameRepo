import { PositionType } from "./types";
import { RunnerAction, VELOCITY, TileSize, Orientation } from "../constants";

export class Runner {
  private _x: number;
  private _y: number;
  private _action: RunnerAction = RunnerAction.Fall;
  private _orientation: Orientation = Orientation.Right;

  private readonly magic: number = 2;

  constructor({ x, y }: PositionType = { x: 0, y: 0 }) {
    this.update({ x, y });
  }

  public update({ x, y }: PositionType): void {
    this._x = x;
    this._y = y;
  }

  public setAction(action: RunnerAction) {
    if (this._action !== RunnerAction.Fall) {
      this._action = action;
      if (this._action === RunnerAction.MoveLeft) {
        this._orientation = 0;
      }
      if (this._action === RunnerAction.MoveRight) {
        this._orientation = 1;
      }
    }
  }

  public resetAction() {
    this._action = RunnerAction.Stay;
  }

  public getNextPos(dTime: number): PositionType {
    const dx = dTime * VELOCITY;
    const dy = dTime * VELOCITY;
    let x: number = this._x;
    let y: number = this._y;
    switch (this.action) {
      case RunnerAction.MoveLeft:
        x = this._x - dx;
        break;
      case RunnerAction.MoveRight:
        x = this._x + dx;
        break;
      case RunnerAction.MoveUp:
        y = this._y - dy;
        break;
      case RunnerAction.MoveDown:
      case RunnerAction.Fall:
        y = this._y + dy;
        break;
      default:
    }
    return { x, y };
  }

  public getCheckCollisionPoint({ x, y }: PositionType): PositionType {
    switch (this._action) {
      case RunnerAction.MoveLeft:
        return { x, y: y + .5 * TileSize };
      case RunnerAction.MoveUp:
        return { x: x + .5 * TileSize, y };
      case RunnerAction.MoveRight:
        return { x: x + TileSize - this.magic, y: y + .5 * TileSize };
      case RunnerAction.MoveDown:
      case RunnerAction.Fall:
        return { x: x + .5 * TileSize, y: y + TileSize - this.magic };
      default:
        return { x: 0, y: 0 };
    }
  }

  public getCheckPoints({ x, y }: PositionType): PositionType[] {
    switch (this._action) {
      case RunnerAction.MoveLeft:
        return [{ x, y }, { x, y: y + TileSize }];
      case RunnerAction.MoveUp:
        return [{ x, y }, { x: x + TileSize, y }];
      case RunnerAction.MoveRight:
        return [{ x: x + TileSize, y }, { x: x + TileSize, y: y + TileSize }];
      case RunnerAction.MoveDown:
      case RunnerAction.Fall:
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

  get action(): RunnerAction {
    return this._action;
  }

  get orientation(): number {
    return this._orientation;
  }
}

export default Runner;
