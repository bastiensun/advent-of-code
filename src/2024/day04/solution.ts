import * as fs from "node:fs/promises"
import path from "node:path"

import { Grid } from "../../utils/grid"

// O(rows * columns)
function part1(wordSearch: string): number {
  const grid = new XmasGrid(wordSearch)
  return grid.computeNumberOfXmasPart1()
}

// O(rows * columns)
function part2(wordSearch: string): number {
  const grid = new XmasGrid(wordSearch)
  return grid.computeNumberOfXmasPart2()
}

class XmasGrid extends Grid {
  computeNumberOfXmasPart1(): number {
    let numberOfXmas = 0

    for (const [rowIndex, row] of this.grid.entries()) {
      for (const [columnIndex, character] of row.entries()) {
        if (character !== "X") {
          continue
        }

        for (const [x, y] of Grid.EIGHT_DIRECTIONS) {
          if (
            this.grid[rowIndex + x]?.[columnIndex + y] === "M" &&
            this.grid[rowIndex + 2 * x]?.[columnIndex + 2 * y] === "A" &&
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            this.grid[rowIndex + 3 * x]?.[columnIndex + 3 * y] === "S"
          ) {
            numberOfXmas += 1
          }
        }
      }
    }

    return numberOfXmas
  }

  computeNumberOfXmasPart2(): number {
    let numberOfXmas = 0

    for (const [rowIndex, row] of this.grid.entries()) {
      for (const [columnIndex, character] of row.entries()) {
        if (character !== "A") {
          continue
        }

        const isFirstDiagonalForwardValid =
          this.grid[rowIndex + 1]?.[columnIndex - 1] === "M" &&
          this.grid[rowIndex - 1]?.[columnIndex + 1] === "S"
        const isFirstDiagonalBackwardValid =
          this.grid[rowIndex + 1]?.[columnIndex - 1] === "S" &&
          this.grid[rowIndex - 1]?.[columnIndex + 1] === "M"
        const isSecondDiagonalForwardValid =
          this.grid[rowIndex + 1]?.[columnIndex + 1] === "M" &&
          this.grid[rowIndex - 1]?.[columnIndex - 1] === "S"
        const isSecondDiagonalBackwardValid =
          this.grid[rowIndex + 1]?.[columnIndex + 1] === "S" &&
          this.grid[rowIndex - 1]?.[columnIndex - 1] === "M"
        if (
          (isFirstDiagonalForwardValid || isFirstDiagonalBackwardValid) &&
          (isSecondDiagonalForwardValid || isSecondDiagonalBackwardValid)
        ) {
          numberOfXmas += 1
        }
      }
    }

    return numberOfXmas
  }
}

if (import.meta.vitest) {
  const { expect, test } = import.meta.vitest

  test("day04", async () => {
    /* eslint-disable @typescript-eslint/no-magic-numbers */
    const input = await fs.readFile(
      path.resolve(import.meta.dirname, "input.txt"),
      "utf8",
    )

    expect.soft(part1(input)).toStrictEqual(18)
    expect.soft(part2(input)).toStrictEqual(9)
    /* eslint-enable @typescript-eslint/no-magic-numbers */
  })
}
