import * as path from "path";

import { getInput } from "@advent-of-code/utils";

import { year2022Day03Part1 } from "./year2022-day03-part1";
import { year2022Day03Part1Fp } from "./year2022-day03-part1.fp";
import { year2022Day03Part2 } from "./year2022-day03-part2";
import { year2022Day03Part2Fp } from "./year2022-day03-part2.fp";

const exampleInput = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

const part1Cases = [
  {
    input: exampleInput,
    output: 157,
  },
  {
    input: getInput(path.join(__dirname, "input.txt")),
    output: 8_401,
  },
];

describe.each(part1Cases)(
  "[%#] Year 2022 - Day 03 - Part 1",
  ({ input, output }) => {
    it("Procedural", () => {
      expect(year2022Day03Part1(input)).toEqual(output);
    });

    it("Functional", () => {
      expect(year2022Day03Part1Fp(input)).toEqual(output);
    });
  }
);

const part2Cases = [
  {
    input: exampleInput,
    output: 70,
  },
  {
    input: getInput(path.join(__dirname, "input.txt")),
    output: 2641,
  },
];

describe.each(part2Cases)(
  "[%#] Year 2022 - Day 03 - Part 2",
  ({ input, output }) => {
    it("Procedural", () => {
      expect(year2022Day03Part2(input)).toEqual(output);
    });

    it.skip("Functional", () => {
      expect(year2022Day03Part2Fp(input)).toEqual(output);
    });
  }
);
