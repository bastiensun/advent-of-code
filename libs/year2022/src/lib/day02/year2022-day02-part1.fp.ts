import { getRoundOutcome, getYourShapeScore } from "./year2022-day02-utils";

export function year2022Day02Part1Fp(input: string): number {
  const rounds = input.split("\n").filter(Boolean);

  return rounds
    .map((currentRound) => {
      const [opponentShape, yourShape] = currentRound.split(" ");
      return { opponentShape, yourShape };
    })
    .reduce(
      (totalScore, { opponentShape, yourShape }) =>
        totalScore +
        getYourShapeScore(yourShape!) +
        getRoundOutcome(opponentShape!, yourShape!),
      0
    );
}
