// O(n) (n === input.length)
export function year2022Day01Part2Fp(input: string): number {
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

  return sortedSummedFoodCaloriesFromElves
    .slice(0, 3)
    .reduce((sum, current) => sum + current, 0);
}
