export function year2022Day01Part2Fp(input: string): string {
  const foodCaloriesFromElves = input
    .split("\n\n")
    .map((foodCaloriesFromOneElf) =>
      foodCaloriesFromOneElf.split("\n").map(Number)
    );

  const summedFoodCaloriesFromElves = foodCaloriesFromElves.map(
    (foodCaloriesFromElf) =>
      foodCaloriesFromElf.reduce((sum, foodCalories) => sum + foodCalories, 0)
  );

  // eslint-disable-next-line fp/no-mutating-methods
  const sortedSummedFoodCaloriesFromElves = summedFoodCaloriesFromElves
    .slice()
    .sort((a, b) => b - a);

  return (
    (sortedSummedFoodCaloriesFromElves.at(0) ?? 0) +
    (sortedSummedFoodCaloriesFromElves.at(1) ?? 0) +
    (sortedSummedFoodCaloriesFromElves.at(2) ?? 0)
  ).toString();
}
