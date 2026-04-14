import { Puzzle, PuzzleType, Reveal } from "./types";

export type PlayablePuzzle = {
  steps: Step[];
  reveal: Reveal;
  meta?: any;
};

export type Step =
  | {
      type: "CLASSIFY";
      word: string;
      options: string[];
      correct: string;
    }
  | {
      type: "GUESS_SYSTEM";
      options: string[];
      correct: string;
    }
  | {
      type: "INFO";
      text: string;
    };

const SORT_TYPES: PuzzleType[] = [
  "SUPPLETIVE",
  "COLLISION",
  "PIE",
  "GRIMM",
  "BORROWED",
  "FALSE_FAMILY",
  "DECEPTION",
  "PHANTOM_ROOT",
  "TOPONYM",
];

const GUESS_OPTIONS = ["Language contact", "Sound shift", "Borrowing"];
const GUESS_INTERVAL = 4;

function stableHash(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function shufflePool(pool: string[], seed: string): string[] {
  return [...pool]
    .map((word, index) => ({ word, score: stableHash(`${seed}:${word}:${index}`) }))
    .sort((a, b) => a.score - b.score)
    .map(({ word }) => word);
}

function deriveSystemGuess(type: PuzzleType): string {
  switch (type) {
    case "BORROWED":
    case "TOPONYM":
      return "Borrowing";
    case "SUPPLETIVE":
    case "COLLISION":
    case "PIE":
    case "GRIMM":
    case "FALSE_FAMILY":
    case "DECEPTION":
    case "PHANTOM_ROOT":
      return "Sound shift";
    default:
      return "Language contact";
  }
}

function buildSortPlayablePuzzle(puzzle: Puzzle): PlayablePuzzle {
  if (!puzzle.groups?.length) {
    throw new Error(`Missing groups for ${puzzle.type} puzzle on ${puzzle.date}`);
  }
  if (!puzzle.pool?.length) {
    throw new Error(`Empty pool for ${puzzle.type} puzzle on ${puzzle.date}`);
  }

  const options = puzzle.groups.map((group, index) => group.displayLabel || group.label || `Group ${index + 1}`);
  const shuffledWords = shufflePool(puzzle.pool, `${puzzle.date}:${puzzle.type}`);
  const steps: Step[] = [];
  let classifiedCount = 0;

  for (const word of shuffledWords) {
    const matchedGroup = puzzle.groups.find((group) => {
      const accepts = Array.isArray(group.accepts) ? group.accepts : [];
      const related = Array.isArray(group.related) ? group.related : [];
      return accepts.includes(word) || related.includes(word);
    });

    if (!matchedGroup) {
      continue;
    }

    const correct = matchedGroup.displayLabel || matchedGroup.label || options[0];
    if (!correct) {
      continue;
    }

    steps.push({
      type: "CLASSIFY",
      word,
      options,
      correct,
    });

    classifiedCount += 1;
    if (classifiedCount % GUESS_INTERVAL === 0) {
      steps.push({
        type: "GUESS_SYSTEM",
        options: GUESS_OPTIONS,
        correct: deriveSystemGuess(puzzle.type),
      });
    }
  }

  return {
    steps,
    reveal: puzzle.reveal,
    meta: puzzle.meta,
  };
}

export function buildPlayablePuzzle(puzzle: Puzzle): PlayablePuzzle {
  if (SORT_TYPES.includes(puzzle.type)) {
    const playable = buildSortPlayablePuzzle(puzzle);
    const classifyCount = playable.steps.filter((step) => step.type === "CLASSIFY").length;
    const firstGuessIndex = playable.steps.findIndex((step) => step.type === "GUESS_SYSTEM");

    if (firstGuessIndex !== -1) {
      const classifyBeforeFirstGuess = playable.steps
        .slice(0, firstGuessIndex)
        .filter((step) => step.type === "CLASSIFY").length;

      if (classifyBeforeFirstGuess < 3) {
        const guessStep = playable.steps[firstGuessIndex];
        if (!guessStep || guessStep.type !== "GUESS_SYSTEM") {
          return playable;
        }
        const reorderedSteps = playable.steps.filter((_, index) => index !== firstGuessIndex);
        const targetIndex = classifyCount < 3 ? reorderedSteps.length : reorderedSteps.findIndex((step, index) => {
          if (step.type !== "CLASSIFY") {
            return false;
          }
          const classifyBefore = reorderedSteps
            .slice(0, index + 1)
            .filter((candidate) => candidate.type === "CLASSIFY").length;
          return classifyBefore === 3;
        }) + 1;

        reorderedSteps.splice(targetIndex, 0, guessStep);
        playable.steps = reorderedSteps;
      }
    }

    return playable;
  }

  return {
    steps: [
      {
        type: "INFO",
        text: puzzle.prompt,
      },
    ],
    reveal: puzzle.reveal,
    meta: puzzle.meta,
  };
}
