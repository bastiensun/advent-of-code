import assert from "node:assert"
import * as fs from "node:fs/promises"
import path from "node:path"

import { Grid } from "../../utils/grid"

// O(rows * columns)
function part1(input: string): number {
  const mappedArea = new MappedArea(input)

  const visitedPositions = mappedArea.simulateGuardPath()

  return visitedPositions.size
}

// O(rows^2 * columns^2)
function part2(input: string): number {
  let numberOfObstructionDifferentPositions = 0

  const mappedArea = new MappedArea(input)

  const visitedPositions = mappedArea.simulateGuardPath()

  const guardPosition = mappedArea.findGuardPosition()
  visitedPositions.delete(getPositionId(guardPosition))

  for (const position of visitedPositions) {
    const [rowIndex, columnIndex] = position.split(",").map(Number)
    assert(rowIndex !== undefined && columnIndex !== undefined)

    if (mappedArea.isObstacle([rowIndex, columnIndex])) {
      continue
    }

    // @ts-ignore
    mappedArea.addObstruction([rowIndex, columnIndex])

    if (mappedArea.isGuardStuckInLoop()) {
      numberOfObstructionDifferentPositions += 1
    }

    // @ts-ignore
    mappedArea.removeObstruction([rowIndex, columnIndex])
  }

  return numberOfObstructionDifferentPositions
}

type Position = [number, number]

class MappedArea extends Grid {
  private static ORDERED_DIRECTIONS = [
    [-1, 0], // up
    [0, 1], // right
    [1, 0], // down
    [0, -1], // left
  ] as const

  addObstruction([rowIndex, columnIndex]: Position): void {
    // @ts-ignore
    this.grid[rowIndex][columnIndex] = "#"
  }

  // O(rows * columns)
  findGuardPosition(): Position {
    for (const [rowIndex, row] of this.grid.entries()) {
      for (const [columnIndex, character] of row.entries()) {
        const isGuard = character === "^"
        if (isGuard) {
          return [rowIndex, columnIndex]
        }
      }
    }

    throw new Error("unexpected error")
  }

  // O(rows * columns)
  isGuardStuckInLoop(): boolean {
    let [guardRowIndex, guardColumnIndex] = this.findGuardPosition()

    const distinctDirectedPositions = new Set<string>()

    let currentDirectionIndex = 0
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    while (true) {
      const directedPositionId = getDirectedPositionId(
        [guardRowIndex, guardColumnIndex],
        currentDirectionIndex,
      )
      if (distinctDirectedPositions.has(directedPositionId)) {
        return true
      }

      distinctDirectedPositions.add(directedPositionId)

      const [currentRowDirection, currentColumnDirection] =
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        MappedArea.ORDERED_DIRECTIONS[currentDirectionIndex]!

      const nextRowIndex = guardRowIndex + currentRowDirection
      const nextColumnIndex = guardColumnIndex + currentColumnDirection

      const isLeavingMap = !(
        0 <= nextRowIndex &&
        nextRowIndex < this.rowsLength &&
        0 <= nextColumnIndex &&
        nextColumnIndex < this.columnsLength
      )
      if (isLeavingMap) {
        return false
      }

      if (this.isObstacle([nextRowIndex, nextColumnIndex])) {
        currentDirectionIndex =
          (currentDirectionIndex + 1) % MappedArea.ORDERED_DIRECTIONS.length
        continue
      }

      guardRowIndex = nextRowIndex
      guardColumnIndex = nextColumnIndex
    }
  }

  isObstacle([rowIndex, columnIndex]: Position): boolean {
    return this.grid[rowIndex]?.[columnIndex] === "#"
  }

  removeObstruction([rowIndex, columnIndex]: Position): void {
    // @ts-ignore
    this.grid[rowIndex][columnIndex] = "."
  }

  // O(rows * columns)
  simulateGuardPath(): Set<string> {
    let [guardRowIndex, guardColumnIndex] = this.findGuardPosition()

    const distinctVisitedPositions = new Set<string>()

    let currentDirectionIndex = 0
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    while (true) {
      distinctVisitedPositions.add(
        getPositionId([guardRowIndex, guardColumnIndex]),
      )

      const [currentRowDirection, currentColumnDirection] =
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        MappedArea.ORDERED_DIRECTIONS[currentDirectionIndex]!

      const nextRowIndex = guardRowIndex + currentRowDirection
      const nextColumnIndex = guardColumnIndex + currentColumnDirection

      const isLeavingMap = !(
        0 <= nextRowIndex &&
        nextRowIndex < this.rowsLength &&
        0 <= nextColumnIndex &&
        nextColumnIndex < this.columnsLength
      )
      if (isLeavingMap) {
        break
      }

      if (this.isObstacle([nextRowIndex, nextColumnIndex])) {
        currentDirectionIndex =
          (currentDirectionIndex + 1) % MappedArea.ORDERED_DIRECTIONS.length
        continue
      }

      guardRowIndex = nextRowIndex
      guardColumnIndex = nextColumnIndex
    }

    return distinctVisitedPositions
  }
}

function getPositionId([rowIndex, columnIndex]: Position): string {
  return `${rowIndex.toString()},${columnIndex.toString()}`
}

function getDirectedPositionId(
  [rowIndex, columnIndex]: Position,
  directionIndex: number,
): string {
  return `${rowIndex.toString()},${columnIndex.toString()},${directionIndex.toString()}`
}

if (import.meta.vitest) {
  const { expect, test } = import.meta.vitest

  test("day06", async () => {
    /* eslint-disable @typescript-eslint/no-magic-numbers */
    const input = await fs.readFile(
      path.resolve(import.meta.dirname, "input.txt"),
      "utf8",
    )

    expect.soft(part1(input)).toStrictEqual(41)
    expect.soft(part2(input)).toStrictEqual(6)
    /* eslint-enable @typescript-eslint/no-magic-numbers */
  })
}
