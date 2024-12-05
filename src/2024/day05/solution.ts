import assert from "node:assert"
import * as fs from "node:fs/promises"
import path from "node:path"

// O(pageOrderingRules.length * pagesToProduceInEachUpdate.length * pagesToProduceInEachUpdate[number].length)
function part1(input: string): number {
  const { pageOrderingRules, pagesToProduceInEachUpdate } = parse(input)
  const pageNumberToNextPageNumbers = extractNextPageNumbers(pageOrderingRules)

  let orderedMiddlePageNumberSum = 0
  for (const pagesToProduce of pagesToProduceInEachUpdate) {
    if (!isRightOrder(pagesToProduce, pageNumberToNextPageNumbers)) {
      continue
    }

    const middlePageNumber = pagesToProduce.at(pagesToProduce.length / 2) ?? 0
    orderedMiddlePageNumberSum += middlePageNumber
  }

  return orderedMiddlePageNumberSum
}

// O(pageOrderingRules.length * pagesToProduceInEachUpdate.length * pagesToProduceInEachUpdate[number].length)
function part2(input: string): number {
  const { pageOrderingRules, pagesToProduceInEachUpdate } = parse(input)
  const pageNumberToNextPageNumbers = extractNextPageNumbers(pageOrderingRules)

  let orderedMiddlePageNumberSum = 0
  for (const pagesToProduce of pagesToProduceInEachUpdate) {
    if (isRightOrder(pagesToProduce, pageNumberToNextPageNumbers)) {
      continue
    }

    const orderedPageNumbers = topologicalSort(
      pagesToProduce,
      pageNumberToNextPageNumbers,
    )

    const middlePageNumber =
      orderedPageNumbers.at(orderedPageNumbers.length / 2) ?? 0

    orderedMiddlePageNumberSum += middlePageNumber
  }

  return orderedMiddlePageNumberSum
}

// Time complexity: O(pageOrderingRules.length + pagesToProduceInEachUpdate.length * pagesToProduceInEachUpdate[number].length)
function parse(input: string): {
  pageOrderingRules: [number, number][]
  pagesToProduceInEachUpdate: number[][]
} {
  const [firstSection, secondSection] = input.split("\n\n")
  assert(firstSection !== undefined && secondSection !== undefined)

  const pageOrderingRules: [number, number][] = []
  for (const pageOrderingRule of firstSection.split("\n")) {
    const [previousPageNumber, nextPageNumber] = pageOrderingRule
      .split("|")
      .map(Number)
    assert(previousPageNumber !== undefined && nextPageNumber !== undefined)

    pageOrderingRules.push([previousPageNumber, nextPageNumber])
  }

  const pagesToProduceInEachUpdate: number[][] = []
  for (const pagesToProduce of secondSection.split("\n")) {
    const pageNumbers = pagesToProduce.split(",").map(Number)
    pagesToProduceInEachUpdate.push(pageNumbers)
  }

  return { pageOrderingRules, pagesToProduceInEachUpdate }
}

// Time complexity: O(pageOrderingRules.length)
function extractNextPageNumbers(
  pageOrderingRules: [number, number][],
): Map<number, Set<number>> {
  const pageNumberToNextPageNumbers = new Map<number, Set<number>>()
  for (const [previousPageNumber, nextPageNumber] of pageOrderingRules) {
    const nextPageNumbers = pageNumberToNextPageNumbers.get(previousPageNumber)
    if (nextPageNumbers === undefined) {
      pageNumberToNextPageNumbers.set(
        previousPageNumber,
        new Set([nextPageNumber]),
      )
      continue
    }

    nextPageNumbers.add(nextPageNumber)
  }

  return pageNumberToNextPageNumbers
}

// Time complexity: O(pagesToProduceInEachUpdate[number].length * pageOrderingRules.length)
function isRightOrder(
  pageNumbers: number[],
  pageNumberToNextPageNumbers: Map<number, Set<number>>,
): boolean {
  const seenPages = new Set<number>()
  for (const pageNumber of pageNumbers) {
    const nextPageNumbers =
      pageNumberToNextPageNumbers.get(pageNumber) ?? new Set()

    if (!isDisjointFrom(seenPages, nextPageNumbers)) {
      return false
    }

    seenPages.add(pageNumber)
  }

  return true
}

// Time complexity: O(set1.size)
function isDisjointFrom<T>(set1: Set<T>, set2: Set<T>): boolean {
  for (const s1 of set1) {
    if (set2.has(s1)) {
      return false
    }
  }

  return true
}

// Time complexity: O(pagesToProduceInEachUpdate[number].length + pageOrderingRules.length)
function topologicalSort(
  unorderedPageNumbers: number[],
  pageNumberToNextPageNumbers: Map<number, Set<number>>,
): number[] {
  const unorderedPageNumberSet = new Set(unorderedPageNumbers)

  const pageNumberToIndegree = calculateIndegree(
    unorderedPageNumberSet,
    pageNumberToNextPageNumbers,
  )

  const queue: number[] = []
  for (const unorderedPageNumber of unorderedPageNumberSet) {
    if (!pageNumberToIndegree.has(unorderedPageNumber)) {
      queue.push(unorderedPageNumber)
    }
  }

  const orderedPageNumbers: number[] = []
  while (queue.length > 0) {
    const currentUnorderedPageNumber = queue.shift()
    assert(currentUnorderedPageNumber !== undefined)

    orderedPageNumbers.push(currentUnorderedPageNumber)

    const nextPageNumbers =
      pageNumberToNextPageNumbers.get(currentUnorderedPageNumber) ?? new Set()
    for (const nextPageNumber of nextPageNumbers) {
      if (!unorderedPageNumberSet.has(nextPageNumber)) {
        continue
      }

      const currentIndegree = pageNumberToIndegree.get(nextPageNumber)
      assert(currentIndegree !== undefined)

      const newIndegree = currentIndegree - 1

      pageNumberToIndegree.set(nextPageNumber, newIndegree)

      if (newIndegree === 0) {
        queue.push(nextPageNumber)
      }
    }
  }

  return orderedPageNumbers
}

function calculateIndegree(
  pageNumbers: Set<number>,
  pageNumberToNextPageNumbers: Map<number, Set<number>>,
): Map<number, number> {
  const pageNumberToIndegree = new Map<number, number>()

  for (const [pageNumber, nextPageNumbers] of pageNumberToNextPageNumbers) {
    if (!pageNumbers.has(pageNumber)) {
      continue
    }

    for (const nextPageNumber of nextPageNumbers) {
      const currentIndegree = pageNumberToIndegree.get(nextPageNumber) ?? 0
      pageNumberToIndegree.set(nextPageNumber, currentIndegree + 1)
    }
  }

  return pageNumberToIndegree
}

if (import.meta.vitest) {
  const { expect, test } = import.meta.vitest

  test("day05", async () => {
    /* eslint-disable @typescript-eslint/no-magic-numbers */
    const input = await fs.readFile(
      path.resolve(import.meta.dirname, "input.txt"),
      "utf8",
    )

    expect.soft(part1(input)).toStrictEqual(143)
    expect.soft(part2(input)).toStrictEqual(123)
    /* eslint-enable @typescript-eslint/no-magic-numbers */
  })
}
