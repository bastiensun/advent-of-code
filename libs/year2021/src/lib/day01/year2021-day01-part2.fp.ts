export function year2021Day01Part2FP(input: string): string {
  const sum = (xs: number[]): number =>
    xs.reduce((previousValue, currentValue) => previousValue + currentValue, 0);

  return input
    .split("\n")
    .map(Number)
    .filter((_, measurementIndex, measurements) => {
      const currentThreeMeasurement = measurements.slice(
        measurementIndex,
        measurementIndex + 3
      );
      const lastThreeMeasurement = measurements.slice(
        measurementIndex - 1,
        measurementIndex + 2
      );

      if (
        currentThreeMeasurement.length !== 3 ||
        lastThreeMeasurement.length !== 3
      ) {
        return false;
      }

      return sum(currentThreeMeasurement) > sum(lastThreeMeasurement);
    })
    .length.toString();
}
