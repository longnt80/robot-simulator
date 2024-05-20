import { Simulator } from "./Simulator";
import { Robot } from "./Robot";
import * as readline from "readline";

function readInput(): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question("Enter command(s)): ", (input) => {
      resolve(input);
      rl.close();
    });
  });
}

async function main() {
  const simulator = new Simulator();

  while (true) {
    try {
      const input = await readInput();
      simulator.simulate(input);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
}

// Start the program
main().catch((error) => console.error("An unexpected error occurred:", error));
