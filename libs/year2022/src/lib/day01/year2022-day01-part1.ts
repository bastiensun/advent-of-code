export function year2022Day01Part1(input: string): string {
  const foodCaloriesFromElves = input
    .split("\n\n")
    .map((foodCaloriesFromOneElf) =>
      foodCaloriesFromOneElf.split("\n").map(Number)
    );

  let mostFoodCalories = 0;
  for (const foodCaloriesFromElf of foodCaloriesFromElves) {
    let currentFoodCalories = 0;
    for (const foodCalories of foodCaloriesFromElf) {
      currentFoodCalories += foodCalories;
    }
    if (currentFoodCalories > mostFoodCalories) {
      mostFoodCalories = currentFoodCalories;
    }
  }

  return mostFoodCalories.toString();
}
