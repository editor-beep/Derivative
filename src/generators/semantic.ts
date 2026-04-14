import type { LinguisticInsight } from "../../types";
import { SEMANTIC_POOL } from "../data/semanticPool";
import { pickAt } from "../utils/pick";

export function buildSemanticShiftInsight(
  r: () => number,
  idx?: number,
): LinguisticInsight {
  const d = pickAt(SEMANTIC_POOL, r, idx);
  return {
    id: `semantic-${d.root}`,
    type: "SEMANTIC",
    root: d.root,
    language: d.lang,
    words: [d.root],
    meaning: d.meaning,
    tension: d.tension,
    data: { timeline: d.timeline, word: d.root },
  };
}
