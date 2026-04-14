import type { LinguisticInsight } from "../../types";
import type { SortPoolEntry } from "../types";
import { TOPONYM_POOL } from "../data/toponymPool";
import { pickAt, buildSortCopy } from "../utils/pick";

export function buildToponymInsight(
  r: () => number,
  idx?: number,
): LinguisticInsight {
  const d = pickAt(TOPONYM_POOL, r, idx) as SortPoolEntry;
  const copy = buildSortCopy(d);
  return {
    id: `toponym-${d.root.slice(0, 14).replace(/\s/g, "-")}`,
    type: "TOPONYM",
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
