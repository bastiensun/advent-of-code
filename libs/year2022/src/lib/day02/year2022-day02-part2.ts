import {
  getRoundOutcome,
  getYourShape,
  getYourShapeScore,
} from "./year2022-day02-utils";

export function year2022Day02Part2(input: string): number {
  const rounds = input.split("\n").filter(Boolean);

  let totalScore = 0;
  for (const round of rounds) {
    const [opponentShape, howRoundNeedEnd] = round.split(" ");
    if (!opponentShape || !howRoundNeedEnd) {
      throw new Error();
    }

    const yourShape = getYourShape(opponentShape, howRoundNeedEnd);

    totalScore +=
      getYourShapeScore(yourShape) + getRoundOutcome(opponentShape, yourShape);
  }

  return totalScore;
}
