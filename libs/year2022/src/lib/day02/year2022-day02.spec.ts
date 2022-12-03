import * as path from "path";

import { getInput } from "@advent-of-code/utils";

import { year2022Day02Part1 } from "./year2022-day02-part1";
import { year2022Day02Part1Fp } from "./year2022-day02-part1.fp";
import { year2022Day02Part2 } from "./year2022-day02-part2";
import { year2022Day02Part2Fp } from "./year2022-day02-part2.fp";

const exampleInput = `A Y
B X
C Z`;

const part1Cases = [
  {
    input: exampleInput,
    output: 15,
  },
  {
    input: getInput(path.join(__dirname, "input.txt")),
    output: 12_794,
  },
];

describe.each(part1Cases)(
  "[%#] Year 2022 - Day 02 - Part 1",
  ({ input, output }) => {
    it("Procedural", () => {
      expect(year2022Day02Part1(input)).toEqual(output);
    });

    it("Functional", () => {
      expect(year2022Day02Part1Fp(input)).toEqual(output);
    });
  }
);

const part2Cases = [
  {
    input: exampleInput,
    output: 12,
  },
  {
    input: getInput(path.join(__dirname, "input.txt")),
    output: 14_979,
  },
];

describe.each(part2Cases)(
  "[%#] Year 2022 - Day 02 - Part 2",
  ({ input, output }) => {
    it("Procedural", () => {
      expect(year2022Day02Part2(input)).toEqual(output);
    });

    it("Functional", () => {
      expect(year2022Day02Part2Fp(input)).toEqual(output);
    });
  }
);
