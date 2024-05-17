import { Directions, TDirections } from "./Directions";

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

  public place(x: number, y: number, f: TDirections) {
    if (x > this._tableWidth || x < 0 || y > this._tableHeight || y < 0) {
      throw new Error("Placed outside table");
    }

    if (!this._directions.isValid(f)) {
      throw new Error("Invalid direction");
    }

    this._x = x;
    this._y = y;
    this._directions.facing = f;
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
      case "NORTH":
        newY++;
        break;
      case "EAST":
        newX++;
        break;
      case "SOUTH":
        newY--;
        break;
      case "WEST":
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
    return {
      x: this._x,
      y: this._y,
      facing: this._directions.facing,
    };
  }

  private isValidPosition(x: number, y: number): boolean {
    return x >= 0 && x <= this._tableWidth && y >= 0 && y <= this._tableHeight;
  }
}
