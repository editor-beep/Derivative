import type { LinguisticInsight } from "../../types";
import { IDIOM_POOL } from "../data/idiomPool";
import { pickAt } from "../utils/pick";

export function buildIdiomInsight(
  r: () => number,
  idx?: number,
): LinguisticInsight {
  const d = pickAt(IDIOM_POOL, r, idx);
  const shuffled = [...d.fragments].sort(() => r() - 0.5);
  return {
    id: `idiom-${d.phrase.slice(0, 12).replace(/\s/g, "-")}`,
    type: "IDIOM",
    root: d.phrase,
    language: d.lang,
    words: d.fragments,
    meaning: d.origin,
    tension: d.tension,
    data: {
      phrase: d.phrase,
      fragments: shuffled,
      origin: d.origin,
      questionPrompt: d.questionPrompt,
      revealHeadline: d.revealHeadline,
      revealBody: d.revealBody,
    },
  };
}
