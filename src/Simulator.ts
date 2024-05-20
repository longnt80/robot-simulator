import { Directions } from "./Directions";
import { Robot } from "./Robot";
import { inputToCommands } from "./utils";

export class Simulator {
  public simulate(command: string) {
    const validCommands = inputToCommands(command);
    this._processCommands(validCommands);
  }

  private _processCommands(commands: string[]) {
    const robot = new Robot(new Directions());
    const firstPLACEIndex = commands.indexOf("PLACE");

    if (firstPLACEIndex < 0) return;

    let i = firstPLACEIndex;

    while (i < commands.length) {
      const currentCommands = commands[i];

      switch (currentCommands) {
        case "PLACE":
          const placeArgs = commands[i + 1];
          const [x, y, f] = placeArgs.split(",");
          const placed = robot.place(parseInt(x), parseInt(y), f);
          if (placed) {
            i = i + 2;
          } else {
            i++;
          }
          break;
        case "MOVE":
          robot.move();
          i++;
          break;
        case "LEFT":
          robot.left();
          i++;
          break;
        case "RIGHT":
          robot.right();
          i++;
          break;
        case "REPORT":
          const { x: reportedX, y: reportedY, facing } = robot.report();
          console.log(reportedX, reportedY, facing);
          i++;
        default:
          break;
      }
    }
  }
}
