const OPPONENT_ROCK = "A";
const OPPONENT_PAPER = "B";
const OPPONENT_SCISSORS = "C";

const YOUR_ROCK = "X";
const YOUR_PAPER = "Y";
const YOUR_SCISSORS = "Z";

const ROCK_SHAPE_SCORE = 1;
const PAPER_SHAPE_SCORE = 2;
const SCISSORS_SHAPE_SCORE = 3;

const LOST_ROUND_OUTCOME = 0;
const DRAW_ROUND_OUTCOME = 3;
const WIN_ROUND_OUTCOME = 6;

const NEED_TO_LOSE = "X";
const NEED_TO_DRAW = "Y";
const NEED_TO_WIN = "Z";

export function getRoundOutcome(
  opponentShape: string,
  yourShape: string
): number {
  switch (opponentShape) {
    case OPPONENT_ROCK:
      switch (yourShape) {
        case YOUR_ROCK:
          return DRAW_ROUND_OUTCOME;
        case YOUR_PAPER:
          return WIN_ROUND_OUTCOME;
        case YOUR_SCISSORS:
          return LOST_ROUND_OUTCOME;
        default:
          throw new Error();
      }

    case OPPONENT_PAPER:
      switch (yourShape) {
        case YOUR_ROCK:
          return LOST_ROUND_OUTCOME;
        case YOUR_PAPER:
          return DRAW_ROUND_OUTCOME;
        case YOUR_SCISSORS:
          return WIN_ROUND_OUTCOME;
        default:
          throw new Error();
      }

    case OPPONENT_SCISSORS:
      switch (yourShape) {
        case YOUR_ROCK:
          return WIN_ROUND_OUTCOME;
        case YOUR_PAPER:
          return LOST_ROUND_OUTCOME;
        case YOUR_SCISSORS:
          return DRAW_ROUND_OUTCOME;
        default:
          throw new Error();
      }

    default:
      throw new Error();
  }
}

export function getYourShapeScore(yourShape: string): number {
  switch (yourShape) {
    case YOUR_ROCK:
      return ROCK_SHAPE_SCORE;
    case YOUR_PAPER:
      return PAPER_SHAPE_SCORE;
    case YOUR_SCISSORS:
      return SCISSORS_SHAPE_SCORE;
    default:
      throw new Error();
  }
}

export function getYourShape(
  opponentShape: string,
  howRoundNeedToEnd: string
): string {
  switch (opponentShape) {
    case OPPONENT_ROCK:
      switch (howRoundNeedToEnd) {
        case NEED_TO_LOSE:
          return YOUR_SCISSORS;
        case NEED_TO_DRAW:
          return YOUR_ROCK;
        case NEED_TO_WIN:
          return YOUR_PAPER;
        default:
          throw new Error();
      }

    case OPPONENT_PAPER:
      switch (howRoundNeedToEnd) {
        case NEED_TO_LOSE:
          return YOUR_ROCK;
        case NEED_TO_DRAW:
          return YOUR_PAPER;
        case NEED_TO_WIN:
          return YOUR_SCISSORS;
        default:
          throw new Error();
      }

    case OPPONENT_SCISSORS:
      switch (howRoundNeedToEnd) {
        case NEED_TO_LOSE:
          return YOUR_PAPER;
        case NEED_TO_DRAW:
          return YOUR_SCISSORS;
        case NEED_TO_WIN:
          return YOUR_ROCK;
        default:
          throw new Error();
      }

    default:
      throw new Error();
  }
}
