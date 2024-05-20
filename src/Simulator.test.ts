import { Simulator } from "./Simulator";

const logSpy = jest.spyOn(console, "log");

afterEach(() => {
  logSpy.mockReset();
});

describe("Simulator", () => {
  describe("simulate", () => {
    test("log the result", () => {
      const simulator = new Simulator();
      const commands = "PLACE 0,0,NORTH REPORT";

      simulator.simulate(commands);

      expect(logSpy).toHaveBeenCalledTimes(1);
    });

    test("no logging without REPORT command the result", () => {
      const simulator = new Simulator();
      const commands = "PLACE 0,0,NORTH";

      simulator.simulate(commands);

      expect(logSpy).toHaveBeenCalledTimes(0);
    });

    test("log multiple REPORTs", () => {
      const simulator = new Simulator();
      const commands = "PLACE 0,0,NORTH MOVE REPORT LEFT REPORT";

      simulator.simulate(commands);

      expect(logSpy).toHaveBeenCalledTimes(2);
      expect(logSpy).toHaveBeenCalledWith(0, 1, "NORTH");
      expect(logSpy).toHaveBeenCalledWith(0, 1, "WEST");
    });

    test("discard commands without valid preceding PLACE command", () => {
      const simulator = new Simulator();
      const commands = "MOVE REPORT LEFT REPORT";

      simulator.simulate(commands);

      expect(logSpy).toHaveBeenCalledTimes(0);
    });
  });
});
