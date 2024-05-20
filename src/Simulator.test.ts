import { Simulator } from "./Simulator";

const logSpy = jest.spyOn(console, "log");
let simulator: Simulator;

beforeEach(() => {
  simulator = new Simulator();
});

afterEach(() => {
  logSpy.mockReset();
});

describe("Simulator", () => {
  describe("simulate", () => {
    test("log the result", () => {
      const commands = "PLACE 0,0,NORTH REPORT";

      simulator.simulate(commands);

      expect(logSpy).toHaveBeenCalledTimes(1);
    });

    test("no logging without REPORT command the result", () => {
      const commands = "PLACE 0,0,NORTH";

      simulator.simulate(commands);

      expect(logSpy).toHaveBeenCalledTimes(0);
    });

    test("log multiple REPORTs in correct order", () => {
      const commands = "PLACE 0,0,NORTH MOVE REPORT LEFT REPORT";

      simulator.simulate(commands);

      expect(logSpy).toHaveBeenCalledTimes(2);
      expect(logSpy).toHaveBeenNthCalledWith(1, 0, 1, "NORTH");
      expect(logSpy).toHaveBeenNthCalledWith(2, 0, 1, "WEST");
    });

    test("discard commands without valid preceding PLACE command", () => {
      const commands = "MOVE REPORT LEFT REPORT";

      simulator.simulate(commands);

      expect(logSpy).toHaveBeenCalledTimes(0);
    });

    test("irregular strings", () => {
      const commands =
        "place 5 , [5  ]],   south move; right; right] [move] report";

      simulator.simulate(commands);

      expect(logSpy).toHaveBeenCalledWith(5, 5, "NORTH");
    });

    test("throw error on invalid command", () => {
      const commands = "PLACE 0,0,NORTH MOV REPORT";

      expect(() => {
        simulator.simulate(commands);
      }).toThrow();
    });
  });
});
