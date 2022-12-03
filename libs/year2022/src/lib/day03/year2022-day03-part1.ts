import { getPriority } from "./year2022-day03-utils";

export function getCommonItemType(
  firstCompartment: string,
  secondCompartment: string
): string {
  const firstCompartmentItems = new Set(firstCompartment.split(""));
  for (const itemType of secondCompartment) {
    if (firstCompartmentItems.has(itemType)) {
      return itemType;
    }
  }
  throw new Error();
}

// O(a * b) (a === input.length and b === rucksackContent.length)
export function year2022Day03Part1(input: string): number {
  const rucksacksContent = input.split("\n").filter(Boolean);

  let prioritySum = 0;
  for (const rucksackContent of rucksacksContent) {
    const rucksackCapacity = rucksackContent.length;
    const firstCompartment = rucksackContent.slice(0, rucksackCapacity / 2);
    const secondCompartment = rucksackContent.slice(rucksackCapacity / 2);
    const commonItemType = getCommonItemType(
      firstCompartment,
      secondCompartment
    );
    prioritySum += getPriority(commonItemType);
  }

  return prioritySum;
}
