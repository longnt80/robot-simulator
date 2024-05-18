import { Simulator } from "./Simulator";
import * as readline from "readline";

function main() {
  const simulator = new Simulator();

  let commandString: string = "";

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.setPrompt(
    ["Enter your commands", "Press Ctrl+C to simulate the robot", "\n"].join(
      "\n"
    )
  );
  rl.prompt();

  rl.on("line", (input) => {
    commandString = commandString + " " + input;
  });

  rl.on("SIGINT", () => {
    rl.question("Do you want to simulate the robot now? (y/N): ", (answer) => {
      if (answer.match(/^y(es)?$/i)) {
        simulator.simulate(commandString);
        rl.close();
      }
    });
  });
}

main();
