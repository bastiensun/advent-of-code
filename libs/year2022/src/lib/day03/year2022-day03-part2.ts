import { getPriority } from "./year2022-day03-utils";

export function getBadgeItemType(
  firstElfRucksack: string,
  secondElfRucksack: string,
  thirdElfRucksack: string
): string {
  const firstElfItems = new Set(firstElfRucksack.split(""));

  const commonItemTypeBetweenFirstAndSecondElves = new Set();
  for (const itemType of secondElfRucksack) {
    if (firstElfItems.has(itemType)) {
      commonItemTypeBetweenFirstAndSecondElves.add(itemType);
    }
  }

  for (const itemType of thirdElfRucksack) {
    if (commonItemTypeBetweenFirstAndSecondElves.has(itemType)) {
      return itemType;
    }
  }

  throw new Error();
}

// O(a * b) (a === input.length and b === elfRucksack.length)
export function year2022Day03Part2(input: string): number {
  const rucksacksContent = input.split("\n").filter(Boolean);

  let prioritySum = 0;
  for (
    let rucksacksContentIndex = 0;
    rucksacksContentIndex < rucksacksContent.length;
    rucksacksContentIndex += 3
  ) {
    const firstElfRucksack = rucksacksContent[rucksacksContentIndex];
    const secondElfRucksack = rucksacksContent[rucksacksContentIndex + 1];
    const thirdElfRucksack = rucksacksContent[rucksacksContentIndex + 2];

    const badgeItemType = getBadgeItemType(
      firstElfRucksack!,
      secondElfRucksack!,
      thirdElfRucksack!
    );

    prioritySum += getPriority(badgeItemType);
  }

  return prioritySum;
}
