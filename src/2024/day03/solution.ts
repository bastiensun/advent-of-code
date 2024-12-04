import assert from "node:assert"
import * as fs from "node:fs/promises"
import path from "node:path"

// Time complexity: O(lines * sequence.length)
function solution(corruptedMemory: string): number {
  let result = 0

  let isEnabled = true
  for (const line of corruptedMemory.split("\n")) {
    let leftIndex = 0
    let rightIndex = 0
    while (leftIndex < line.length && rightIndex < line.length) {
      leftIndex = rightIndex
      rightIndex = leftIndex

      while (
        leftIndex < line.length &&
        rightIndex < line.length &&
        line.slice(leftIndex, rightIndex) !== "mul("
      ) {
        if (isEnabledInstruction(line, leftIndex)) {
          isEnabled = true
        }

        if (isDisabledInstruction(line, leftIndex)) {
          isEnabled = false
        }

        leftIndex += 1
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        rightIndex = leftIndex + 4
      }

      const firstNumber = extractNumber(line, rightIndex)
      if (firstNumber === undefined) {
        continue
      }

      rightIndex += firstNumber.toString().length

      if (line.at(rightIndex) !== ",") {
        continue
      }

      rightIndex += 1

      const secondNumber = extractNumber(line, rightIndex)
      if (secondNumber === undefined) {
        continue
      }
      rightIndex += secondNumber.toString().length

      if (line.at(rightIndex) !== ")") {
        continue
      }

      if (!isEnabled) {
        continue
      }

      result += firstNumber * secondNumber
    }
  }

  return result
}

function extractNumber(
  sequence: string,
  startIndex: number,
): number | undefined {
  let number = ""
  let currentIndex = startIndex
  while (currentIndex < sequence.length && isDigit(sequence.at(currentIndex))) {
    const digit = sequence.at(currentIndex)
    assert(digit !== undefined)

    number += digit
    currentIndex += 1
  }

  if (number === "") {
    return undefined
  }

  return Number(number)
}

function isDigit(character: string | undefined): boolean {
  if (character === undefined) {
    return false
  }

  return "0" <= character && character <= "9"
}

function isEnabledInstruction(sequence: string, startIndex: number): boolean {
  const enabledInstruction = "do()"
  return (
    sequence.slice(startIndex, startIndex + enabledInstruction.length) ===
    enabledInstruction
  )
}

function isDisabledInstruction(sequence: string, startIndex: number): boolean {
  const disabledInstruction = "don't()"
  return (
    sequence.slice(startIndex, startIndex + disabledInstruction.length) ===
    disabledInstruction
  )
}

if (import.meta.vitest) {
  const { expect, test } = import.meta.vitest

  test("day03", async () => {
    /* eslint-disable @typescript-eslint/no-magic-numbers */
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const input1 = await fs.readFile(
      path.resolve(import.meta.dirname, "input1.txt"),
      "utf8",
    )
    expect.soft(solution(input1)).toStrictEqual(161)

    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const input2 = await fs.readFile(
      path.resolve(import.meta.dirname, "input2.txt"),
      "utf8",
    )
    expect.soft(solution(input2)).toStrictEqual(48)
    /* eslint-enable @typescript-eslint/no-magic-numbers */
  })
}
