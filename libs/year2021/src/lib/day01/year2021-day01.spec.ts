import * as path from "path";

import { getInput } from "@advent-of-code/utils";

import { year2021Day01Part1 } from "./year2021-day01-part1";
import { year2021Day01Part2 } from "./year2021-day01-part2";
import { year2021Day01Part1FP } from "./year2021-day01-part1.fp";
import { year2021Day01Part2FP } from "./year2021-day01-part2.fp";

const exampleInput = `199
200
208
210
200
207
240
269
260
263`;

const part1Cases = [
  {
    input: exampleInput,
    output: "7",
  },
  {
    input: getInput(path.join(__dirname, "input.txt")),
    output: "1475",
  },
];

describe.each(part1Cases)(
  "[%#] Year 2021 - Day 01 - Part 1",
  ({ input, output }) => {
    it("Procedural", () => {
      expect(year2021Day01Part1(input)).toEqual(output);
    });

    it("Functional", () => {
      expect(year2021Day01Part1FP(input)).toEqual(output);
    });
  }
);

const part2Cases = [
  {
    input: exampleInput,
    output: "5",
  },
  {
    input: getInput(path.join(__dirname, "input.txt")),
    output: "1516",
  },
];

describe.each(part2Cases)(
  "[%#] Year 2021 - Day 01 - Part 2",
  ({ input, output }) => {
    it("Procedural", () => {
      expect(year2021Day01Part2(input)).toEqual(output);
    });

    it("Functional", () => {
      expect(year2021Day01Part2FP(input)).toEqual(output);
    });
  }
);
