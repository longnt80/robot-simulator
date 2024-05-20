import { inputToCommands } from "./index";

describe("inputToCommands", () => {
  test("return an array", () => {
    const input = "PLACE";

    expect(Array.isArray(inputToCommands(input))).toBe(true);
  });

  test("return array of commands", () => {
    const input = "PLACE 1,2,SOUTH MOVE LEFT MOVE RIGHT REPORT";
    const expected = [
      "PLACE",
      "1,2,SOUTH",
      "MOVE",
      "LEFT",
      "MOVE",
      "RIGHT",
      "REPORT",
    ];

    expect(inputToCommands(input)).toEqual(expected);
  });

  test("without special characters and extra white spaces", () => {
    const input = "place 5 , [5  ]],   south move; right; right] [move] REPORT";
    const expected = [
      "PLACE",
      "5,5,SOUTH",
      "MOVE",
      "RIGHT",
      "RIGHT",
      "MOVE",
      "REPORT",
    ];

    expect(inputToCommands(input)).toEqual(expected);
  });

  test("with extra whitespaces between", () => {
    const input = "PLACE 1,  2 ,  NORTH";
    const expected = ["PLACE", "1,2,NORTH"];

    expect(inputToCommands(input)).toEqual(expected);
  });

  test("discard extra subtring when having extra commas", () => {
    const input = "PLACE 1,2,SOUTH, MOVE";
    const expected = ["PLACE", "1,2,SOUTH"];

    expect(inputToCommands(input)).toEqual(expected);
  });

  test("transform to uppercase", () => {
    const input = "place 1,2,north move";
    const expected = ["PLACE", "1,2,NORTH", "MOVE"];

    expect(inputToCommands(input)).toEqual(expected);
  });
});
