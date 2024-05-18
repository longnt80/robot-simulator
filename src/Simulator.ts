import { Directions } from "./Directions";
import { Robot } from "./Robot";

export class Simulator {
  private parser(command: string) {
    console.log({ command });
  }

  public simulate(command: string) {
    const validCommands = this.parser(command);
    const directions = new Directions();
    const robot = new Robot(directions);
  }
}
