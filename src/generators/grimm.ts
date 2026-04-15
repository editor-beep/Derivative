import type { LinguisticInsight, PuzzlePair } from "../../types";
import { GRIMM_POOL } from "../data/grimmPool";
import { pickAt } from "../utils/pick";

type GrimmEntry = {
  root: string;
  lang: string;
  meaning: string;
  pairs: PuzzlePair[];
  tension: string;
};

export function buildGrimmInsight(
  r: () => number,
  idx?: number,
): LinguisticInsight {
  const d = pickAt(GRIMM_POOL, r, idx) as GrimmEntry;
  return {
    id: `grimm-${d.root.replace(/\s/g, "-")}`,
    type: "GRIMM",
    root: d.root,
    language: d.lang,
    words: d.pairs.map((p) => p.target),
    meaning: d.meaning,
    tension: d.tension,
    data: {
      pairs: d.pairs,
    },
  };
}
