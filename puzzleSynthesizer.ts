// puzzleSynthesizer.ts

import { LinguisticInsight, Puzzle } from "./types";

export function synthesizePuzzle(insight: LinguisticInsight, date: string): Puzzle {
  switch (insight.type) {
    case "DECEPTION":
      return buildDeceptionPuzzle(insight, date);

    case "FALSE_FAMILY":
      return buildFalseFamilyPuzzle(insight, date);

    case "SEMANTIC":
      return buildTimelinePuzzle(insight, date);

    case "SUPPLETIVE":
      return buildSortPuzzle(insight, date);

    default:
      return buildRootPuzzle(insight, date);
  }
}