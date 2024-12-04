import assert from "node:assert"
import * as fs from "node:fs/promises"
import path from "node:path"

// Time complexity: O(reports * levels)
function part1(unusualData: string): number {
  let numberOfSafeReports = 0

  const reports = unusualData.split("\n")
  for (const report of reports) {
    const levels = report.split(" ").map(Number)

    if (isSafe(levels)) {
      numberOfSafeReports += 1
    }
  }

  return numberOfSafeReports
}

// Time complexity: O(reports * levels^2)
function part2(unusualData: string): number {
  let numberOfSafeReports = 0

  const reports = unusualData.split("\n")
  for (const report of reports) {
    const levels = report.split(" ").map(Number)

    if (isSafe(levels)) {
      numberOfSafeReports += 1
      continue
    }

    for (const index of levels.keys()) {
      const removedLevels = levels.toSpliced(index, 1)
      if (isSafe(removedLevels)) {
        numberOfSafeReports += 1
        break
      }
    }
  }

  return numberOfSafeReports
}

function isSafe(levels: number[]): boolean {
  return (
    isMonotonic(levels) &&
    isTwoAdjacentLevelsDifferByAtLeastOneAndAtMostThree(levels)
  )
}

function isMonotonic(levels: number[]): boolean {
  let isIncreasing = false
  let isDecreasing = false

  for (let index = 0; index < levels.length - 1; index += 1) {
    const currentLevel = levels.at(index)
    const nextLevel = levels.at(index + 1)
    assert(currentLevel !== undefined && nextLevel !== undefined)

    if (currentLevel < nextLevel) {
      isIncreasing = true
    }

    if (currentLevel > nextLevel) {
      isDecreasing = true
    }

    if (isIncreasing && isDecreasing) {
      return false
    }
  }

  return true
}

function isTwoAdjacentLevelsDifferByAtLeastOneAndAtMostThree(
  levels: number[],
): boolean {
  for (let index = 0; index < levels.length - 1; index += 1) {
    const currentLevel = levels.at(index)
    const nextLevel = levels.at(index + 1)
    assert(currentLevel !== undefined && nextLevel !== undefined)

    const minDifference = 1
    const maxDifference = 3
    const difference = Math.abs(currentLevel - nextLevel)
    if (!(minDifference <= difference && difference <= maxDifference)) {
      return false
    }
  }

  return true
}

if (import.meta.vitest) {
  const { expect, test } = import.meta.vitest

  test("day02", async () => {
    /* eslint-disable @typescript-eslint/no-magic-numbers */
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const input = await fs.readFile(
      path.resolve(import.meta.dirname, "input.txt"),
      "utf8",
    )

    expect.soft(part1(input)).toStrictEqual(2)
    expect.soft(part2(input)).toStrictEqual(4)
    /* eslint-enable @typescript-eslint/no-magic-numbers */
  })
}
