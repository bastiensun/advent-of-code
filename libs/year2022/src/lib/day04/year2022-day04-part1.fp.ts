import { isFullyContains } from "./year2022-day04-utils";

export function year2022Day04Part1Fp(input: string): number {
  const sectionAssignmentPairs = input.split("\n").filter(Boolean);

  return sectionAssignmentPairs
    .map((sectionAssignmentPair) => sectionAssignmentPair.split(","))
    .filter(([firstPair, secondPair]) =>
      isFullyContains(firstPair!, secondPair!)
    ).length;
}
