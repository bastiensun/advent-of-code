import { getPriority } from "./year2022-day03-utils";

export function getCommonItemType(
  firstCompartment: string,
  secondCompartment: string
): string {
  const firstCompartmentItems = new Set(firstCompartment.split(""));
  return secondCompartment
    .split("")
    .filter((item) => firstCompartmentItems.has(item))
    .at(0)!;
}

export function year2022Day03Part1Fp(input: string): number {
  const rucksacksContent = input.split("\n").filter(Boolean);

  return rucksacksContent
    .map((rucksackContent) => ({
      firstCompartment: rucksackContent.slice(0, rucksackContent.length / 2),
      secondCompartment: rucksackContent.slice(rucksackContent.length / 2),
    }))
    .map(({ firstCompartment, secondCompartment }) =>
      getCommonItemType(firstCompartment, secondCompartment)
    )
    .reduce(
      (prioritySum, commonItemType) =>
        prioritySum + getPriority(commonItemType),
      0
    );
}
