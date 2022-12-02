import * as path from "path";

import { getInput } from "@advent-of-code/utils";

import { year2022Day01Part1 } from "./year2022-day01-part1";
import { year2022Day01Part1Fp } from "./year2022-day01-part1.fp";
import { year2022Day01Part2 } from "./year2022-day01-part2";
import { year2022Day01Part2Fp } from "./year2022-day01-part2.fp";

const exampleInput = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

const part1Cases = [
  {
    input: exampleInput,
    output: 24_000,
  },
  {
    input: getInput(path.join(__dirname, "input.txt")),
    output: 75_622,
  },
];

describe.each(part1Cases)(
  "[%#] Year 2022 - Day 01 - Part 1",
  ({ input, output }) => {
    it("Procedural", () => {
      expect(year2022Day01Part1(input)).toEqual(output);
    });

    it("Functional", () => {
      expect(year2022Day01Part1Fp(input)).toEqual(output);
    });
  }
);

const part2Cases = [
  {
    input: exampleInput,
    output: 45_000,
  },
  {
    input: getInput(path.join(__dirname, "input.txt")),
    output: 213_159,
  },
];

describe.each(part2Cases)(
  "[%#] Year 2022 - Day 01 - Part 2",
  ({ input, output }) => {
    it("Procedural", () => {
      expect(year2022Day01Part2(input)).toEqual(output);
    });

    it("Functional", () => {
      expect(year2022Day01Part2Fp(input)).toEqual(output);
    });
  }
);
