export function inputToCommands(input: string): string[] {
  const nonWhiteSpaceSpecialCharacters = /[^,\s\w]/;
  const whiteSpacesBetweenWords = /(?<=\w)\s(?=\w|\s)/;

  return input
    .trim()
    .replace(nonWhiteSpaceSpecialCharacters, "")
    .split(whiteSpacesBetweenWords)
    .map((cmdString) => cmdString.trim());
}

export function parsePLACEArguments(args: string) {
  const [x, y, facing] = args.split(",").map((text) => text.trim());
  return {
    x: parseInt(x),
    y: parseInt(y),
    f: facing,
  };
}
