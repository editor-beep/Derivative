// generator.ts

import { hashString, mulberry32 } from "./seed";
import { generateInsight, POOL_FLAT_TABLE } from "./insightEngine";
import { synthesizePuzzle } from "./puzzleSynthesizer";
import { generateReveal } from "./revealEngine";

function shuffleArray<T>(arr: T[], r: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function generateDailyPuzzle(date: string) {
  const seed = hashString(date);
  const year = date.slice(0, 4);

  // Shuffle the full combo table once per year — same year always same order.
  const yearSeed = hashString("year-" + year);
  const shuffled = shuffleArray(POOL_FLAT_TABLE, mulberry32(yearSeed));

  // Map this date to a position in the shuffled table.
  const yearStart = new Date(year + "-01-01");
  const dayOfYear = Math.round(
    (new Date(date).getTime() - yearStart.getTime()) / 86_400_000
  );
  const combo = shuffled[dayOfYear % shuffled.length];

  const insight = generateInsight(seed, combo);
  const puzzle = synthesizePuzzle(insight, date);
  puzzle.reveal = generateReveal(insight);

  return puzzle;
}
