export function year2022Day01Part2(input: string): string {
  const foodCaloriesFromElves = input
    .split("\n\n")
    .map((foodCaloriesFromOneElf) =>
      foodCaloriesFromOneElf.split("\n").map(Number)
    );

  const summedFoodCaloriedsFromElves = [];
  for (const foodCaloriesFromElf of foodCaloriesFromElves) {
    let currentCalories = 0;
    for (const foodCalories of foodCaloriesFromElf) {
      currentCalories += foodCalories;
    }
    summedFoodCaloriedsFromElves.push(currentCalories);
  }

  summedFoodCaloriedsFromElves.sort((a, b) => b - a);

  let topThreeElvesFoodCalories = 0;
  for (let i = 0; i < 3; i += 1) {
    topThreeElvesFoodCalories += summedFoodCaloriedsFromElves.at(i) ?? 0;
  }

  return topThreeElvesFoodCalories.toString();
}
