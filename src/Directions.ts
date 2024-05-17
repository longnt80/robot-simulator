export class Directions {
  public NORTH = "NORTH";
  public WEST = "WEST";
  public SOUTH = "SOUTH";
  public EAST = "EAST";
  private _facing: string | null = null;
  private _directions = [this.NORTH, this.WEST, this.SOUTH, this.EAST];

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

  public get facing(): string | null {
    return this._facing;
  }

  public set facing(f: string) {
    if (!this._directions.includes(f)) return;

    this._facing = f;
  }

  public isValid(direction: string) {
    return this._directions.includes(direction);
  }
}
