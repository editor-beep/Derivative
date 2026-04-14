import type { LinguisticInsight } from "../../types";
import type { SortPoolEntry } from "../types";
import { BORROWED_POOL } from "../data/borrowedPool";
import { pickAt, buildSortCopy } from "../utils/pick";

export function buildBorrowedInsight(
  r: () => number,
  idx?: number,
): LinguisticInsight {
  const d = pickAt(BORROWED_POOL, r, idx) as SortPoolEntry;
  const copy = buildSortCopy(d);
  return {
    id: `borrowed-${d.root.slice(0, 14).replace(/\s/g, "-")}`,
    type: "BORROWED",
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
