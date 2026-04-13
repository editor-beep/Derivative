// generator.ts

import { hashString } from "./seed";
import { generateInsight } from "./insightEngine";
import { synthesizePuzzle } from "./puzzleSynthesizer";
import { generateReveal } from "./revealEngine";
import { getPuzzleManifestEntry } from "./src/data/puzzleManifest";

export function generateDailyPuzzle(date: string) {
  const manifestEntry = getPuzzleManifestEntry(date);

  if (!manifestEntry) {
    throw new Error(`No manifest puzzle scheduled for ${date}`);
  }

  const seed = hashString(`manifest:${manifestEntry.id}:${date}`);
  const insight = generateInsight(seed, {
    builderIdx: manifestEntry.builderIdx,
    entryIdx: manifestEntry.entryIdx,
    lensIdx: manifestEntry.lensIdx,
  });

  const puzzle = synthesizePuzzle(insight, date);
  puzzle.reveal = generateReveal(insight);

  return puzzle;
}
