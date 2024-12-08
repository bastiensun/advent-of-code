export class Grid {
  protected static EIGHT_DIRECTIONS: [number, number][] = [
    [-1, 0], // up
    [-1, 1], // diagonal
    [0, 1], // right
    [1, 1], // diagonal
    [1, 0], // down
    [1, -1], // diagonal
    [0, -1], // left
    [-1, -1], // diagonal
  ]
  protected static FOUR_DIRECTIONS: [number, number][] = [
    [-1, 0], // up
    [0, 1], // right
    [1, 0], // down
    [0, -1], // left
  ]

  protected grid: string[][]
  columnsLength: number
  rowsLength: number

  constructor(input: string) {
    this.grid = this.parse(input)
    this.rowsLength = this.grid.length
    this.columnsLength = this.grid.at(0)?.length ?? 0
  }

  private parse(input: string): string[][] {
    const rows = input.split("\n")

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
}

export class Coordinate {
  columnIndex: number
  rowIndex: number

  constructor(rowIndex: number, columnIndex: number) {
    this.rowIndex = rowIndex
    this.columnIndex = columnIndex
  }

  getKey(): string {
    return `${this.rowIndex.toString()},${this.columnIndex.toString()}`
  }

  isWithin(grid: Grid): boolean {
    const rowsLength = grid.rowsLength
    const columnsLength = grid.columnsLength

    return (
      0 <= this.rowIndex &&
      this.rowIndex < rowsLength &&
      0 <= this.columnIndex &&
      this.columnIndex < columnsLength
    )
  }
}
