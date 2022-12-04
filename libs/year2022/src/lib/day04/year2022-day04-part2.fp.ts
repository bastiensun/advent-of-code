import { isOverlap } from "./year2022-day04-utils";

export function year2022Day04Part2Fp(input: string): number {
  const sectionAssignmentPairs = input.split("\n").filter(Boolean);

  return sectionAssignmentPairs
    .map((sectionAssignmentPair) => sectionAssignmentPair.split(","))
    .filter(([firstPair, secondPair]) => isOverlap(firstPair!, secondPair!))
    .length;
}
