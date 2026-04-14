import type { LinguisticInsight } from "../../types";
import type { SortPoolEntry } from "../types";
import { SUPPLETIVE_POOL } from "../data/suppletivePool";
import { pickAt, buildSortCopy } from "../utils/pick";

export function buildSuppletiveInsight(
  r: () => number,
  idx?: number,
): LinguisticInsight {
  const d = pickAt(SUPPLETIVE_POOL, r, idx) as SortPoolEntry;
  const copy = buildSortCopy(d);
  return {
    id: `suppletive-${d.root}`,
    type: "SUPPLETIVE",
    root: d.root,
    language: d.lang,
    words: d.pool,
    meaning: d.meaning,
    tension: d.tension,
    data: {
      groups: d.groups,
      pool: d.pool,
      falseSystem: d.falseSystem,
      questionPrompt: copy.questionPrompt,
      revealHeadline: copy.revealHeadline,
      revealBody: copy.revealBody,
    },
  };
}
