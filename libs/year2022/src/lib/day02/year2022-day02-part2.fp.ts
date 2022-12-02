import { getRoundOutcome, getYourShapeScore } from "./year2022-day02-utils";

export function year2022Day02Part2Fp(input: string): number {
  const rounds = input.split("\n").filter(Boolean);

  return rounds.reduce((totalScore, currentRound) => {
    const [opponentShape, howRoundNeedToEnd] = currentRound.split(" ");
    return (
      totalScore +
      getYourShapeScore(howRoundNeedToEnd!) +
      getRoundOutcome(opponentShape!, howRoundNeedToEnd!)
    );
  }, 0);
}
