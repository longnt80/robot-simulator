export type TDirections = "NORTH" | "WEST" | "SOUTH" | "EAST";

export class Directions {
  private _facing: TDirections | null = null;
  private _directions: TDirections[] = ["NORTH", "WEST", "SOUTH", "EAST"];

  public rotateLeft() {
    if (this._facing == null) return;

    const currentIndex = this._directions.indexOf(this._facing);
    this._facing =
      this._directions[(currentIndex + 1) % this._directions.length];
  }

  public rotateRight() {
    if (this._facing == null) return;

    const currentIndex = this._directions.indexOf(this._facing);
    this._facing =
      this._directions[(currentIndex + 3) % this._directions.length];
  }

  public get facing(): TDirections | null {
    return this._facing;
  }

  public set facing(f: TDirections) {
    if (!this._directions.includes(f)) return;

    this._facing = f;
  }

  public isValid(direction: TDirections) {
    return this._directions.includes(direction);
  }
}
