import assert from "node:assert"
import * as fs from "node:fs/promises"
import path from "node:path"

function part1(input: string): number {
  const output: string[] = []

  let currentId = 0
  let isFileBlock = true
  for (const character of [...input]) {
    const length = Number(character)
    for (let _ = 0; _ < length; _ += 1) {
      if (isFileBlock) {
        output.push(currentId.toString())
      } else {
        output.push(".")
      }
    }

    if (isFileBlock) {
      currentId += 1
    }
    isFileBlock = !isFileBlock
  }

  let leftIndex = 0
  let rightIndex = output.length - 1
  while (
    leftIndex < output.length &&
    rightIndex < output.length &&
    leftIndex < rightIndex
  ) {
    const leftValue = output.at(leftIndex)
    assert(leftValue !== undefined)

    if (leftValue !== ".") {
      leftIndex += 1
      continue
    }

    const rightValue = output.at(rightIndex)
    assert(rightValue !== undefined)

    output[leftIndex] = rightValue
    output[rightIndex] = "."
    rightIndex -= 1
  }

  let answer = 0
  for (const [characterIndex, character] of output.entries()) {
    if (character === ".") {
      continue
    }

    answer += characterIndex * Number(character)
  }

  return answer
}

// 2333133121414131402
// fsfsfsfsfsfsfsfsfsf
// 0123456789111111111
//           012345678
// 0 1 2 3 4 5 6 7 8 9

function isFileBlock(index: number): boolean {
  return index % 2 === 0
}

function getFileId(index: number): number {
  if (!isFileBlock(index)) {
    throw new Error()
  }

  return index / 2
}

function part2(input: string): number {
  const output: string[] = []
  const diskMap = [...input]

  let leftIndex = 0
  let rightIndex = diskMap.length - 1
  while (
    leftIndex < diskMap.length &&
    rightIndex < diskMap.length &&
    leftIndex < rightIndex
  ) {
    const leftValue = Number(output.at(leftIndex))

    if (isFileBlock(leftIndex)) {
      const fileId = getFileId(leftIndex)
      const fileLength = leftValue
      for (let _ = 0; _ < fileLength; _ += 1) {
        output.push(fileId.toString())
      }
    } else {
      const spaceLength = leftValue
      while (true) {}
    }
    leftIndex += 1
    rightIndex -= 1
  }

  let currentId = 0
  // let isFileBlock = true
  for (const character of [...input]) {
    const length = Number(character)
    for (let _ = 0; _ < length; _ += 1) {
      if (isFileBlock) {
        output.push(currentId.toString())
      } else {
        output.push(".")
      }
    }

    if (isFileBlock) {
      currentId += 1
    }
    isFileBlock = !isFileBlock
  }
}

function parse(input: string) {}

if (import.meta.vitest) {
  const { expect, test } = import.meta.vitest

  test("day08", async () => {
    /* eslint-disable @typescript-eslint/no-magic-numbers */
    const input = await fs.readFile(
      path.resolve(import.meta.dirname, "input.txt"),
      "utf8",
    )

    expect.soft(part1(input)).toStrictEqual(1928)
    // expect.soft(part2(input)).toStrictEqual(34)
    /* eslint-enable @typescript-eslint/no-magic-numbers */
  })
}
