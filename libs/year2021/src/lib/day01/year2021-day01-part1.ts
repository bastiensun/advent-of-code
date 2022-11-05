export function year2021Day01Part1(input: string): string {
  const measurements = input.split("\n").map(Number);

  let count = 0;

  let lastMeasurement = NaN;
  for (const measurement of measurements) {
    if (measurement > lastMeasurement) {
      count += 1;
    }

    lastMeasurement = measurement;
  }

  return count.toString();
}
