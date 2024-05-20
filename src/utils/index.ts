export function inputToCommands(input: string): string[] {
  const nonWhiteSpaceSpecialCharacters = /[^,\s\w]/g;
  const whiteSpacesBetweenWords = /(?<=\w)\s(?=\w|\s)/g;

  return input
    .trim()
    .replace(nonWhiteSpaceSpecialCharacters, "")
    .split(whiteSpacesBetweenWords)
    .map((cmdString) =>
      cmdString.includes(",")
        ? parsePLACEArguments(cmdString)
        : cmdString.trim().toUpperCase()
    );
}

function parsePLACEArguments(args: string) {
  return args
    .split(",")
    .map((text) => text.trim().toUpperCase())
    .splice(0, 3)
    .join(",");
}
