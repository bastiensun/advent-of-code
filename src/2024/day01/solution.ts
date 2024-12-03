import assert from "node:assert"
import * as fs from "node:fs/promises"
import path from "node:path"

// O(nlog(n))
function part1(input: string): number {
  const [leftList, rightList] = parse(input)

  const sortedLeftList = leftList.toSorted((a, b) => a - b)
  const sortedRightList = rightList.toSorted((a, b) => a - b)

  let leftIndex = 0
  let rightIndex = 0
  let totalDistance = 0
  while (
    leftIndex < sortedLeftList.length &&
    rightIndex < sortedRightList.length
  ) {
    const leftNumber = sortedLeftList.at(leftIndex)
    const rightNumber = sortedRightList.at(rightIndex)
    assert(leftNumber !== undefined && rightNumber !== undefined)

    totalDistance += Math.abs(leftNumber - rightNumber)

    leftIndex += 1
    rightIndex += 1
  }

  return totalDistance
}

// O(n)
function part2(input: string): number {
  const [leftList, rightList] = parse(input)

  const numberToCount = count(rightList)

  let similarityScore = 0
  for (const number of leftList) {
    const count = numberToCount.get(number) ?? 0
    similarityScore += number * count
  }

  return similarityScore
}

function parse(input: string): [number[], number[]] {
  const leftList: number[] = []
  const rightList: number[] = []

  for (const line of input.split("\n")) {
    const [leftNumber, rightNumber] = line.split("   ").map(Number)
    assert(leftNumber !== undefined && rightNumber !== undefined)

    leftList.push(leftNumber)
    rightList.push(rightNumber)
  }

  return [leftList, rightList]
}

function count(numbers: number[]): Map<number, number> {
  const numberToCount = new Map<number, number>()
  for (const number of numbers) {
    const currentCount = numberToCount.get(number) ?? 0
    numberToCount.set(number, currentCount + 1)
  }

  return numberToCount
}

if (import.meta.vitest) {
  const { expect, test } = import.meta.vitest

  test("day01", async () => {
    /* eslint-disable @typescript-eslint/no-magic-numbers */
    const input = await fs.readFile(
      path.resolve(import.meta.dirname, "input.txt"),
      "utf8",
    )

    expect.soft(part1(input)).toStrictEqual(11)
    expect.soft(part2(input)).toStrictEqual(31)
    /* eslint-enable @typescript-eslint/no-magic-numbers */
  })
}
