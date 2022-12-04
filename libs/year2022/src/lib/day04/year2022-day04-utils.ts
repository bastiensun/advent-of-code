export function getIds(pair: string): [number, number] {
  const [startId, endId] = pair.split("-").map(Number);
  return [startId!, endId!];
}

export function isFullyContains(
  firstPair: string,
  secondPair: string
): boolean {
  const [firstPairStartId, firstPairEndId] = getIds(firstPair);
  const [secondPairStartId, secondPairEndId] = getIds(secondPair);

  if (
    firstPairStartId <= secondPairStartId &&
    secondPairEndId <= firstPairEndId
  ) {
    return true;
  }

  if (
    secondPairStartId <= firstPairStartId &&
    firstPairEndId <= secondPairEndId
  ) {
    return true;
  }

  return false;
}

export function isOverlap(firstPair: string, secondPair: string): boolean {
  const [firstPairStartId, firstPairEndId] = getIds(firstPair);
  const [secondPairStartId, secondPairEndId] = getIds(secondPair);

  if (
    firstPairStartId <= secondPairStartId &&
    secondPairStartId <= firstPairEndId
  ) {
    return true;
  }

  if (
    secondPairStartId <= firstPairStartId &&
    firstPairStartId <= secondPairEndId
  ) {
    return true;
  }

  return false;
}
