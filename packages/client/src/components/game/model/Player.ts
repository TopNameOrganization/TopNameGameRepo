export class Player {
  private _x: number;
  private _y: number;

  constructor({ x, y }) {
    this.setPosition({ x, y });
  }

  // TODO: собрать типы в одном месте и назвать по-понятному
  public setPosition({ x, y }: { x: number, y: number }): void {
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
