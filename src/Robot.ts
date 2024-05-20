import { Directions } from "./Directions";

type Table = {
  width: number;
  height: number;
};

export class Robot {
  private _tableWidth: number = 5;
  private _tableHeight: number = 5;
  private _x: number | null = null;
  private _y: number | null = null;
  private _directions!: Directions;

  constructor(directions: Directions, table?: Table) {
    if (table?.width && table?.height) {
      this._tableWidth = table.width;
      this._tableHeight = table.height;
    }

    this._directions = directions;
  }

  public place(x: number, y: number, f: string) {
    if (this.isValidPosition(x, y) && this._directions.isValid(f)) {
      this._x = x;
      this._y = y;
      this._directions.facing = f;

      return true;
    }

    return false;
  }

  public move() {
    if (
      this._x === null ||
      this._y === null ||
      this._directions.facing === null
    )
      return;

    let newX = this._x;
    let newY = this._y;

    switch (this._directions.facing) {
      case this._directions.NORTH:
        newY++;
        break;
      case this._directions.EAST:
        newX++;
        break;
      case this._directions.SOUTH:
        newY--;
        break;
      case this._directions.WEST:
        newX--;
        break;
    }

    if (this.isValidPosition(newX, newY)) {
      this._x = newX;
      this._y = newY;
    } else {
      return;
    }
  }

  public left() {
    this._directions.rotateLeft();
  }

  public right() {
    this._directions.rotateRight();
  }

  public report() {
    const result = {
      x: this._x,
      y: this._y,
      facing: this._directions.facing,
    };
    return result;
  }

  private isValidPosition(x: number, y: number): boolean {
    return x >= 0 && x <= this._tableWidth && y >= 0 && y <= this._tableHeight;
  }
}
