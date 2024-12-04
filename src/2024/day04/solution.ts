import * as fs from "node:fs/promises"
import path from "node:path"

// O(rows * columns)
function part1(wordSearch: string): number {
  let numberOfXmas = 0

  const grid = parse(wordSearch)

  for (const [rowIndex, row] of grid.entries()) {
    for (const [columnIndex, character] of row.entries()) {
      if (character !== "X") {
        continue
      }

      for (const [x, y] of EIGHT_DIRECTIONS) {
        if (
          grid[rowIndex + x]?.[columnIndex + y] === "M" &&
          grid[rowIndex + 2 * x]?.[columnIndex + 2 * y] === "A" &&
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          grid[rowIndex + 3 * x]?.[columnIndex + 3 * y] === "S"
        ) {
          numberOfXmas += 1
        }
      }
    }
  }

  return numberOfXmas
}

// O(rows * columns)
function part2(wordSearch: string): number {
  let numberOfXmas = 0

  const grid = parse(wordSearch)

  for (const [rowIndex, row] of grid.entries()) {
    for (const [columnIndex, character] of row.entries()) {
      if (character !== "A") {
        continue
      }

      const isFirstDiagonalForwardValid =
        grid[rowIndex + 1]?.[columnIndex - 1] === "M" &&
        grid[rowIndex - 1]?.[columnIndex + 1] === "S"
      const isFirstDiagonalBackwardValid =
        grid[rowIndex + 1]?.[columnIndex - 1] === "S" &&
        grid[rowIndex - 1]?.[columnIndex + 1] === "M"
      const isSecondDiagonalForwardValid =
        grid[rowIndex + 1]?.[columnIndex + 1] === "M" &&
        grid[rowIndex - 1]?.[columnIndex - 1] === "S"
      const isSecondDiagonalBackwardValid =
        grid[rowIndex + 1]?.[columnIndex + 1] === "S" &&
        grid[rowIndex - 1]?.[columnIndex - 1] === "M"
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

function parse(wordSearch: string): string[][] {
  const rows = wordSearch.split("\n")

  const grid = Array.from({ length: rows.length }, () =>
    Array.from<string>({ length: rows.at(0)?.length ?? 0 }),
  )

  for (const [rowIndex, row] of rows.entries()) {
    const columns = [...row]
    for (const [columnIndex, character] of columns.entries()) {
      // @ts-expect-error
      grid[rowIndex][columnIndex] = character
    }
  }

  return grid
}

const EIGHT_DIRECTIONS: [number, number][] = [
  [0, 1], // horizontal
  [0, -1], // horizontal backward
  [-1, 0], // vertical
  [1, 0], // vertical backward
  [1, 1], // diagonal
  [-1, 1], // diagonal
  [-1, -1], // diagonal
  [1, -1], // diagonal
]

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
