import { PositionType } from "./types";

export class Player {
  private _x: number;
  private _y: number;

  constructor({ x, y }: PositionType) {
    this.setPosition({ x, y });
  }

  public setPosition({ x, y }: PositionType): void {
    this._x = x;
    this._y = y;
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }
}

export default new Player({ x: 0, y: 0 });
