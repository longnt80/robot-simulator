type Directions = "NORTH" | "WEST" | "SOUTH" | "EAST";

class Robot {
  private x: any = null;
  private y: number | null = null;
  private facing: Directions | null = null;
  private readonly directions: Directions[] = [
    "NORTH",
    "WEST",
    "SOUTH",
    "EAST",
  ];
}
