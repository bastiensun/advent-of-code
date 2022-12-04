// O(n)
import { isOverlap } from "./year2022-day04-utils";

export function year2022Day04Part2(input: string): number {
  const sectionAssignmentPairs = input.split("\n").filter(Boolean);

  let fullyCountainsCount = 0;
  for (const sectionAssignmentPair of sectionAssignmentPairs) {
    const [firstPair, secondPair] = sectionAssignmentPair.split(",");

    if (isOverlap(firstPair!, secondPair!)) {
      fullyCountainsCount += 1;
    }
  }

  return fullyCountainsCount;
}
