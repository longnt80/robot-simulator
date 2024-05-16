import { Robot } from "./Robot";

describe("Robot", () => {
  describe("report", () => {
    test("invoked with correct result", () => {
      const robot = new Robot();

      const expected = { x: null, y: null, facing: null };
      const result = robot.report();

      expect(result).toEqual(expected);
    });
  });

  describe("place", () => {
    test("place the robot on the table correctly", () => {
      const robot = new Robot();
      robot.place(0, 2, "NORTH");

      const expected = { x: 0, y: 2, facing: "NORTH" };
      const result = robot.report();

      expect(result).toEqual(expected);
    });

    test("throw when given invalid direction", () => {
      const robot = new Robot();

      expect(() => {
        // @ts-ignore
        robot.place(0, 2, "DOWNUNDER");
      }).toThrow("Invalid direction");
    });

    test("throw when placed outside table", () => {
      const robot = new Robot();

      // Assume the default table is 5x5

      expect(() => {
        robot.place(-1, 2, "NORTH");
      }).toThrow("Placed outside table");
      expect(() => {
        robot.place(0, 6, "NORTH");
      }).toThrow("Placed outside table");
    });
  });
});
