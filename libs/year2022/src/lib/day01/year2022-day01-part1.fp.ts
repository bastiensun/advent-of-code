export function year2022Day01Part1Fp(input: string): string {
  const foodCaloriesFromElves = input
    .split("\n\n")
    .map((foodCaloriesFromOneElf) =>
      foodCaloriesFromOneElf.split("\n").map(Number)
    );

  const summedFoodCaloriesFromElves = foodCaloriesFromElves.map(
    (foodCaloriesFromElf) =>
      foodCaloriesFromElf.reduce((sum, foodCalories) => sum + foodCalories, 0)
  );

  return Math.max(...summedFoodCaloriesFromElves).toString();
}
