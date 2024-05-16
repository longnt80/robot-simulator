type Directions = "NORTH" | "WEST" | "SOUTH" | "EAST";

type Configs = {
  tableWidth: number;
  tableHeight: number;
};

export class Robot {
  private tableWidth: number = 5;
  private tableHeight: number = 5;
  private x: number | null = null;
  private y: number | null = null;
  private facing: Directions | null = null;
  private readonly directions: Directions[] = [
    "NORTH",
    "WEST",
    "SOUTH",
    "EAST",
  ];

  constructor(configs?: Configs) {
    if (configs?.tableWidth && configs?.tableHeight) {
      this.tableWidth = configs.tableWidth;
      this.tableHeight = configs.tableHeight;
    }
  }

  public place(x: number, y: number, f: Directions) {
    if (x > this.tableWidth || x < 0 || y > this.tableHeight || y < 0) {
      throw new Error("Placed outside table");
    }

    if (!this.directions.includes(f)) {
      throw new Error("Invalid direction");
    }

    this.x = x;
    this.y = y;
    this.facing = f;
  }

  public move() {
    if (this.x === null || this.y === null || this.facing === null) return;

    let newX = this.x;
    let newY = this.y;

    switch (this.facing) {
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
      this.x = newX;
      this.y = newY;
    } else {
      return;
    }
  }

  public left() {
    console.log("turn left");
  }

  public right() {
    console.log("turn right");
  }

  public report() {
    return {
      x: this.x,
      y: this.y,
      facing: this.facing,
    };
  }

  private isValidPosition(x: number, y: number): boolean {
    return x >= 0 && x <= this.tableWidth && y >= 0 && y <= this.tableHeight;
  }
}
