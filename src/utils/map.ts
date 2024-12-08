export class Grid {
  protected grid: string[][]

  constructor(input: string) {
    this.grid = this.parse(input)
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
