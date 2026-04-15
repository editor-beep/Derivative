import type { LinguisticInsight } from "../../types";
import type { SortPoolEntry } from "../types";
import { PIE_POOL } from "../data/piePool";
import { pickAt, buildSortCopy } from "../utils/pick";

export function buildPIEInsight(
  r: () => number,
  idx?: number,
): LinguisticInsight {
  const d = pickAt(PIE_POOL, r, idx) as SortPoolEntry;
  const copy = buildSortCopy(d);
  return {
    id: `pie-${d.root.replace(/\s/g, "-")}`,
    type: "PIE",
    root: d.root,
    language: d.lang,
    words: d.pool,
    meaning: d.meaning,
    tension: d.tension,
    data: {
      groups: d.groups,
      pool: d.pool,
      questionPrompt: copy.questionPrompt,
      revealHeadline: copy.revealHeadline,
      revealBody: copy.revealBody,
    },
  };
}
