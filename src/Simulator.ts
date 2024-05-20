import { Directions } from "./Directions";
import { Robot } from "./Robot";
import { inputToCommands } from "./utils";
export class Simulator {
  private _robot!: Robot;

  constructor() {
    this._robot = new Robot(new Directions());
  }

  public simulate(command: string) {
    const validCommands = inputToCommands(command);
    this._processCommands(validCommands);
  }

  private _processCommands(commands: string[]) {
    let i = 0;

    while (i < commands.length) {
      const currentCommands = commands[i];

      switch (currentCommands) {
        case "PLACE":
          const placeArgs = commands[i + 1];
          const [x, y, f] = placeArgs.split(",");
          const placed = this._robot.place(parseInt(x), parseInt(y), f);
          if (placed) {
            i = i + 2;
          } else {
            i++;
          }
          break;
        case "MOVE":
          this._robot.move();
          i++;
          break;
        case "LEFT":
          this._robot.left();
          i++;
          break;
        case "RIGHT":
          this._robot.right();
          i++;
          break;
        case "REPORT":
          const { x: reportedX, y: reportedY, facing } = this._robot.report();
          if (reportedX != null && reportedY != null && facing != null) {
            console.log(`${reportedX}, ${reportedY}, ${facing}`);
          }
          i++;
          break;
        default:
          throw new Error(`Invalid command: "${currentCommands}"`);
      }
    }
  }
}
