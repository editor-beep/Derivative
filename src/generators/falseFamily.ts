import type { LinguisticInsight } from "../../types";
import type { SortPoolEntry } from "../types";
import { FALSE_FAMILY_POOL } from "../data/falseFamilyPool";
import { pickAt, buildSortCopy } from "../utils/pick";

export function buildFalseFamilyInsight(
  r: () => number,
  idx?: number,
): LinguisticInsight {
  const d = pickAt(FALSE_FAMILY_POOL, r, idx) as SortPoolEntry;
  const copy = buildSortCopy(d);
  return {
    id: `false-family-${d.root}`,
    type: "FALSE_FAMILY",
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
