import { Robot } from "./Robot";

let robot: Robot;

beforeEach(() => {
  robot = new Robot();
});

describe("Robot", () => {
  describe("report", () => {
    test("invoked with correct result", () => {
      const expected = { x: null, y: null, facing: null };
      const result = robot.report();

      expect(result).toEqual(expected);
    });
  });

  describe("place", () => {
    test("place the robot on the table correctly", () => {
      robot.place(0, 2, "NORTH");

      const expected = { x: 0, y: 2, facing: "NORTH" };
      const result = robot.report();

      expect(result).toEqual(expected);
    });

    test("throw when given invalid direction", () => {
      expect(() => {
        // @ts-ignore
        robot.place(0, 2, "DOWNUNDER");
      }).toThrow("Invalid direction");
    });

    test("throw when placed outside table", () => {
      // Assume the default table is 5x5
      expect(() => {
        robot.place(-1, 2, "NORTH");
      }).toThrow("Placed outside table");
      expect(() => {
        robot.place(0, 6, "NORTH");
      }).toThrow("Placed outside table");
    });
  });

  describe("move", () => {
    describe("valid moves", () => {
      test("move NORTH", () => {
        robot.place(0, 0, "NORTH");
        robot.move();

        const expected = { x: 0, y: 1, facing: "NORTH" };
        const result = robot.report();

        expect(result).toEqual(expected);
      });

      test("move SOUTH", () => {
        robot.place(5, 4, "SOUTH");
        robot.move();

        const expected = { x: 5, y: 3, facing: "SOUTH" };
        const result = robot.report();

        expect(result).toEqual(expected);
      });

      test("move EAST", () => {
        robot.place(4, 0, "EAST");
        robot.move();

        const expected = { x: 5, y: 0, facing: "EAST" };
        const result = robot.report();

        expect(result).toEqual(expected);
      });

      test("move WEST", () => {
        robot.place(1, 0, "WEST");
        robot.move();

        const expected = { x: 0, y: 0, facing: "WEST" };
        const result = robot.report();

        expect(result).toEqual(expected);
      });
    });

    describe("out of bound moves", () => {
      test("move outside table", () => {
        robot.place(0, 0, "SOUTH");
        robot.move();

        const expected = { x: 0, y: 0, facing: "SOUTH" };
        const result = robot.report();

        expect(result).toEqual(expected);
      });
    });
  });

  describe("left", () => {
    test("turn 90 degrees to the left", () => {
      robot.place(0, 0, "NORTH");
      robot.left();
      expect(robot.report().facing).toBe("WEST");
      robot.left();
      expect(robot.report().facing).toBe("SOUTH");
      robot.left();
      expect(robot.report().facing).toBe("EAST");
      robot.left();
      expect(robot.report().facing).toBe("NORTH");
    });
  });

  describe("right", () => {
    test("turn 90 degrees to the right", () => {
      robot.place(0, 0, "NORTH");
      robot.right();
      expect(robot.report().facing).toBe("EAST");
      robot.right();
      expect(robot.report().facing).toBe("SOUTH");
      robot.right();
      expect(robot.report().facing).toBe("WEST");
      robot.right();
      expect(robot.report().facing).toBe("NORTH");
    });
  });
});
