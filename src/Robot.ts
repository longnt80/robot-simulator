type Directions = "NORTH" | "WEST" | "SOUTH" | "EAST";

type Configs = {
  tableWidth: number;
  tableHeight: number;
};

export class Robot {
  private _tableWidth: number = 5;
  private _tableHeight: number = 5;
  private _x: number | null = null;
  private _y: number | null = null;
  private _facing: Directions | null = null;
  private readonly _directions: Directions[] = [
    "NORTH",
    "WEST",
    "SOUTH",
    "EAST",
  ];

  constructor(configs?: Configs) {
    if (configs?.tableWidth && configs?.tableHeight) {
      this._tableWidth = configs.tableWidth;
      this._tableHeight = configs.tableHeight;
    }
  }

  public place(x: number, y: number, f: Directions) {
    if (x > this._tableWidth || x < 0 || y > this._tableHeight || y < 0) {
      throw new Error("Placed outside table");
    }

    if (!this._directions.includes(f)) {
      throw new Error("Invalid direction");
    }

    this._x = x;
    this._y = y;
    this._facing = f;
  }

  public move() {
    if (this._x === null || this._y === null || this._facing === null) return;

    let newX = this._x;
    let newY = this._y;

    switch (this._facing) {
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
    if (this._facing === null) return;

    const currentIndex = this._directions.indexOf(this._facing);
    this._facing =
      this._directions[(currentIndex + 1) % this._directions.length];
  }

  public right() {
    if (this._facing === null) return;

    const currentIndex = this._directions.indexOf(this._facing);
    this._facing =
      this._directions[(currentIndex + 3) % this._directions.length];
  }

  public report() {
    return {
      x: this._x,
      y: this._y,
      facing: this._facing,
    };
  }

  private isValidPosition(x: number, y: number): boolean {
    return x >= 0 && x <= this._tableWidth && y >= 0 && y <= this._tableHeight;
  }
}
