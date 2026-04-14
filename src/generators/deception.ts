import type { LinguisticInsight } from "../../types";
import type { SortPoolEntry } from "../types";
import { DECEPTION_POOL } from "../data/deceptionPool";
import { pickAt, buildSortCopy } from "../utils/pick";

export function buildDeceptionInsight(
  r: () => number,
  idx?: number,
): LinguisticInsight {
  const d = pickAt(DECEPTION_POOL, r, idx) as SortPoolEntry;
  const copy = buildSortCopy(d);
  return {
    id: `deception-${d.root}`,
    type: "DECEPTION",
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
