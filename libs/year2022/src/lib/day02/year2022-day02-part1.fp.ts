import { getRoundOutcome, getYourShapeScore } from "./year2022-day02-utils";

export function year2022Day02Part1Fp(input: string): number {
  const rounds = input.split("\n").filter(Boolean);

  return rounds.reduce((totalScore, currentRound) => {
    const [opponentShape, yourShape] = currentRound.split(" ");
    return (
      totalScore +
      getYourShapeScore(yourShape!) +
      getRoundOutcome(opponentShape!, yourShape!)
    );
  }, 0);
}
