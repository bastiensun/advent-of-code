import * as fs from "node:fs/promises"
import path from "node:path"

import { Grid } from "../../utils/map"

function part1(input: string): number {
  const antennaMap = new AntennaMap(input)
  return antennaMap.calculateNumberOfUniqueAntinode()
}

function part2(input: string): number {
  const antennaMap = new AntennaMap(input)
  return antennaMap.calculateNumberOfUniqueAntinode(true)
}

class AntennaMap extends Grid {
  calculateNumberOfUniqueAntinode(hasResonantHarmonics = false): number {
    const uniqueLocations = new Set<string>()
    const specificFrequencyAntennaToSeenAntennaLocations = new Map<
      string,
      [number, number][]
    >()

    for (const [rowIndex, row] of this.grid.entries()) {
      for (const [columnIndex, character] of row.entries()) {
        if (character === ".") {
          continue
        }

        if (hasResonantHarmonics) {
          uniqueLocations.add(new Location(rowIndex, columnIndex).getKey())
        }

        const currentSeenAntennaLocations =
          specificFrequencyAntennaToSeenAntennaLocations.get(character)
        if (currentSeenAntennaLocations === undefined) {
          specificFrequencyAntennaToSeenAntennaLocations.set(character, [
            [rowIndex, columnIndex],
          ])
          continue
        }

        for (const [
          seenAntennaRowIndex,
          seenAntennaColumnIndex,
        ] of currentSeenAntennaLocations) {
          const deltaRow = rowIndex - seenAntennaRowIndex
          const deltaColumn = columnIndex - seenAntennaColumnIndex

          let antinode1 = new Location(
            seenAntennaRowIndex - deltaRow,
            seenAntennaColumnIndex - deltaColumn,
          )
          let antinode2 = new Location(
            rowIndex + deltaRow,
            columnIndex + deltaColumn,
          )

          while (this.isWithin(antinode1)) {
            uniqueLocations.add(antinode1.getKey())

            if (!hasResonantHarmonics) {
              break
            }

            antinode1 = new Location(
              antinode1.rowIndex - deltaRow,
              antinode1.columnIndex - deltaColumn,
            )
          }

          while (this.isWithin(antinode2)) {
            uniqueLocations.add(antinode2.getKey())

            if (!hasResonantHarmonics) {
              break
            }

            antinode2 = new Location(
              antinode2.rowIndex + deltaRow,
              antinode2.columnIndex + deltaColumn,
            )
          }
        }

        currentSeenAntennaLocations.push([rowIndex, columnIndex])
      }
    }

    return uniqueLocations.size
  }

  isWithin(location: Location): boolean {
    const rowsLength = this.grid.length
    const columnsLength = this.grid.at(0)?.length ?? 0

    return (
      0 <= location.rowIndex &&
      location.rowIndex < rowsLength &&
      0 <= location.columnIndex &&
      location.columnIndex < columnsLength
    )
  }
}

class Location {
  columnIndex: number
  rowIndex: number

  constructor(rowIndex: number, columnIndex: number) {
    this.rowIndex = rowIndex
    this.columnIndex = columnIndex
  }

  getKey(): string {
    return `${this.rowIndex.toString()},${this.columnIndex.toString()}`
  }
}

if (import.meta.vitest) {
  const { expect, test } = import.meta.vitest

  test("day08", async () => {
    /* eslint-disable @typescript-eslint/no-magic-numbers */
    const input = await fs.readFile(
      path.resolve(import.meta.dirname, "input.txt"),
      "utf8",
    )

    expect.soft(part1(input)).toStrictEqual(14)
    expect.soft(part2(input)).toStrictEqual(34)
    /* eslint-enable @typescript-eslint/no-magic-numbers */
  })
}
