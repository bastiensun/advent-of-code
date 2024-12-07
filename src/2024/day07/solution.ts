import assert from "node:assert"
import * as fs from "node:fs/promises"
import path from "node:path"

// O(calibrationEquations * 2^remainingNumbers) without memoization / dynamic programming
// O(calibrationEquations * remainingNumbers) with memoization / dynamic programming
function part1(input: string): number {
  const calibrationEquations = parse(input)
  return getTotalCalibrationResult(
    calibrationEquations,
    addition,
    multiplication,
  )
}

// O(calibrationEquations * 3^remainingNumbers) without memoization / dynamic programming
// O(calibrationEquations * remainingNumbers) with memoization / dyanamic programming
function part2(input: string): number {
  const calibrationEquations = parse(input)
  return getTotalCalibrationResult(
    calibrationEquations,
    addition,
    multiplication,
    concatenation,
  )
}

type CalibrationEquation = {
  remainingNumbers: number[]
  testValue: number
}
function parse(input: string): CalibrationEquation[] {
  const calibrationEquations: CalibrationEquation[] = []
  for (const calibrationEquation of input.split("\n")) {
    const [testValue, ...remainingNumbers] = calibrationEquation
      .split(/\D+/)
      .map(Number)
    assert(testValue !== undefined)

    calibrationEquations.push({ remainingNumbers, testValue })
  }

  return calibrationEquations
}

function getTotalCalibrationResult(
  calibrationEquations: CalibrationEquation[],
  ...operators: ((a: number, b: number) => number)[]
): number {
  let totalCalibrationResult = 0

  for (const { remainingNumbers, testValue } of calibrationEquations) {
    const memo = new Map<string, boolean>()

    function dfs(
      currentRemainingNumbersIndex: number,
      currentResult: number,
    ): boolean {
      const memoKey = getKey(currentRemainingNumbersIndex, currentResult)
      if (memo.has(memoKey)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return memo.get(memoKey)!
      }

      if (currentResult > testValue) {
        memo.set(memoKey, false)
        return false
      }

      if (currentRemainingNumbersIndex === remainingNumbers.length) {
        const isTrue = currentResult === testValue
        memo.set(memoKey, isTrue)
        return isTrue
      }

      const currentRemainingNumber = remainingNumbers.at(
        currentRemainingNumbersIndex,
      )
      assert(currentRemainingNumber !== undefined)

      for (const operator of operators) {
        if (
          dfs(
            currentRemainingNumbersIndex + 1,
            operator(currentResult, currentRemainingNumber),
          )
        ) {
          memo.set(memoKey, true)
          return true
        }
      }

      memo.set(memoKey, false)
      return false
    }

    if (dfs(0, 0)) {
      totalCalibrationResult += testValue
    }
  }

  return totalCalibrationResult
}

const addition = (a: number, b: number): number => a + b
const multiplication = (a: number, b: number): number => a * b
const concatenation = (a: number, b: number): number =>
  Number(`${a.toString()}${b.toString()}`)

function getKey(
  currentRemainingNumbersIndex: number,
  currentResult: number,
): string {
  return `${currentRemainingNumbersIndex.toString()},${currentResult.toString()}`
}

if (import.meta.vitest) {
  const { expect, test } = import.meta.vitest

  test("day07", async () => {
    /* eslint-disable @typescript-eslint/no-magic-numbers */
    const input = await fs.readFile(
      path.resolve(import.meta.dirname, "input.txt"),
      "utf8",
    )

    expect.soft(part1(input)).toStrictEqual(3749)
    expect.soft(part2(input)).toStrictEqual(11_387)
    /* eslint-enable @typescript-eslint/no-magic-numbers */
  })
}
