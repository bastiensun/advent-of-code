export function year2021Day01Part2(input: string): string {
  const measurements = input.split("\n").map(Number);

  let count = 0;

  let lastThreeMeasurement = NaN;
  for (
    let measurementIndex = 0;
    measurementIndex < measurements.length - 2;
    measurementIndex += 1
  ) {
    const threeMeasurement =
      measurements[measurementIndex]! +
      measurements[measurementIndex + 1]! +
      measurements[measurementIndex + 2]!;

    if (threeMeasurement > lastThreeMeasurement) {
      count += 1;
    }

    lastThreeMeasurement = threeMeasurement;
  }

  return count.toString();
}
