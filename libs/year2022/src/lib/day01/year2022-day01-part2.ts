// O(n)
export function year2022Day01Part2(input: string): number {
  const foodCaloriesFromElves = input
    .split("\n\n")
    .map((foodCaloriesFromOneElf) =>
      foodCaloriesFromOneElf.split("\n").map(Number)
    );

  let firstMostFoodCalories = 0;
  let secondMostFoodCalories = 0;
  let thirdMostFoodCalories = 0;
  for (const foodCaloriesFromElf of foodCaloriesFromElves) {
    let currentCalories = 0;
    for (const foodCalories of foodCaloriesFromElf) {
      currentCalories += foodCalories;
    }

    if (currentCalories > firstMostFoodCalories) {
      thirdMostFoodCalories = secondMostFoodCalories;
      secondMostFoodCalories = firstMostFoodCalories;
      firstMostFoodCalories = currentCalories;
    } else if (currentCalories > secondMostFoodCalories) {
      thirdMostFoodCalories = secondMostFoodCalories;
      secondMostFoodCalories = currentCalories;
    } else if (currentCalories > thirdMostFoodCalories) {
      thirdMostFoodCalories = currentCalories;
    }
  }

  return firstMostFoodCalories + secondMostFoodCalories + thirdMostFoodCalories;
}
