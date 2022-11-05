export function year2021Day01Part1FP(input: string): string {
  return input
    .split("\n")
    .map(Number)
    .reduce(
      (
        previousCount,
        currentMeasurement,
        currentMeasurementIndex,
        measurements
      ) => {
        const previousMeasurement = measurements[currentMeasurementIndex - 1];
        return (
          previousCount +
          (previousMeasurement && currentMeasurement > previousMeasurement
            ? 1
            : 0)
        );
      },
      0
    )
    .toString();
}
