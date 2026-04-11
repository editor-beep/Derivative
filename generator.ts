// generator.ts

import { hashString } from "./seed";
import { generateInsight } from "./insightEngine";
import { synthesizePuzzle } from "./puzzleSynthesizer";
import { generateReveal } from "./revealEngine";

export function generateDailyPuzzle(date: string) {
  const seed = hashString(date);

  const insight = generateInsight(seed);
  const puzzle = synthesizePuzzle(insight, date);

  puzzle.reveal = generateReveal(insight);

  return puzzle;
}