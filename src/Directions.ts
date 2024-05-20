export class Directions {
  static NORTH = "NORTH";
  static WEST = "WEST";
  static SOUTH = "SOUTH";
  static EAST = "EAST";
  private _facing: string | null = null;
  static directions = [
    Directions.NORTH,
    Directions.WEST,
    Directions.SOUTH,
    Directions.EAST,
  ];

  public rotateLeft() {
    if (this._facing == null) return;

    const currentIndex = Directions.directions.indexOf(this._facing);
    this._facing =
      Directions.directions[(currentIndex + 1) % Directions.directions.length];
  }

  public rotateRight() {
    if (this._facing == null) return;

    const currentIndex = Directions.directions.indexOf(this._facing);
    this._facing =
      Directions.directions[(currentIndex + 3) % Directions.directions.length];
  }

  public get facing(): string | null {
    return this._facing;
  }

  public set facing(f: string) {
    if (!Directions.directions.includes(f)) return;

    this._facing = f;
  }

  static isValid(direction: string) {
    return Directions.directions.includes(direction);
  }
}
