import * as fs from "fs";

export function getInput(path: string): string {
  return fs.readFileSync(path, "utf-8");
}
