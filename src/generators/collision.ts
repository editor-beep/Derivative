import type { LinguisticInsight } from "../../types";
import type { SortPoolEntry } from "../types";
import { COLLISION_POOL } from "../data/collisionPool";
import { pickAt, buildSortCopy } from "../utils/pick";

export function buildCollisionInsight(
  r: () => number,
  idx?: number,
): LinguisticInsight {
  const d = pickAt(COLLISION_POOL, r, idx) as SortPoolEntry;
  const copy = buildSortCopy(d);
  return {
    id: `collision-${d.root}`,
    type: "COLLISION",
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
