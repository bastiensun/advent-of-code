import { getRoundOutcome, getYourShapeScore } from "./year2022-day02-utils";

export function year2022Day02Part2Fp(input: string): number {
  const rounds = input.split("\n").filter(Boolean);

  return rounds
    .map((currentRound) => {
      const [opponentShape, howRoundNeedToEnd] = currentRound.split(" ");
      return { opponentShape, howRoundNeedToEnd };
    })
    .reduce(
      (totalScore, { opponentShape, howRoundNeedToEnd }) =>
        totalScore +
        getYourShapeScore(howRoundNeedToEnd!) +
        getRoundOutcome(opponentShape!, howRoundNeedToEnd!),
      0
    );
}
