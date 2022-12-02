// O(n) (n === input.length)
import { getRoundOutcome, getYourShapeScore } from "./year2022-day02-utils";

export function year2022Day02Part1(input: string): number {
  const rounds = input.split("\n").filter(Boolean);

  let totalScore = 0;
  for (const round of rounds) {
    const [opponentShape, yourShape] = round.split(" ");
    if (!opponentShape || !yourShape) {
      throw new Error();
    }

    totalScore +=
      getYourShapeScore(yourShape) + getRoundOutcome(opponentShape, yourShape);
  }

  return totalScore;
}
