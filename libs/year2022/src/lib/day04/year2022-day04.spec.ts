import * as path from "path";

import { getInput } from "@advent-of-code/utils";

import { year2022Day04Part1 } from "./year2022-day04-part1";
import { year2022Day04Part1Fp } from "./year2022-day04-part1.fp";
import { year2022Day04Part2 } from "./year2022-day04-part2";
import { year2022Day04Part2Fp } from "./year2022-day04-part2.fp";

const exampleInput = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

const part1Cases = [
  {
    input: exampleInput,
    output: 2,
  },
  {
    input: getInput(path.join(__dirname, "input.txt")),
    output: 571,
  },
];

describe.each(part1Cases)(
  "[%#] Year 2022 - Day 04 - Part 1",
  ({ input, output }) => {
    it("Procedural", () => {
      expect(year2022Day04Part1(input)).toEqual(output);
    });

    it("Functional", () => {
      expect(year2022Day04Part1Fp(input)).toEqual(output);
    });
  }
);

const part2Cases = [
  {
    input: exampleInput,
    output: 4,
  },
  {
    input: getInput(path.join(__dirname, "input.txt")),
    output: 917,
  },
];

describe.each(part2Cases)(
  "[%#] Year 2022 - Day 04 - Part 2",
  ({ input, output }) => {
    it("Procedural", () => {
      expect(year2022Day04Part2(input)).toEqual(output);
    });

    it("Functional", () => {
      expect(year2022Day04Part2Fp(input)).toEqual(output);
    });
  }
);
