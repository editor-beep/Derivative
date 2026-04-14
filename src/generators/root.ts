import type { LinguisticInsight } from "../../types";
import type { RootPoolEntry } from "../types";
import { ROOT_POOL } from "../data/rootPool";
import { pickAt } from "../utils/pick";

export function buildRootInsight(
  r: () => number,
  idx?: number,
): LinguisticInsight {
  const d = pickAt(ROOT_POOL, r, idx) as RootPoolEntry;
  return {
    id: `root-${d.root}`,
    type: "ROOT",
    root: d.root,
    language: d.lang,
    words: d.targets,
    meaning: d.meaning,
    tension: d.tension,
    data: {
      targets: d.targets,
      required: d.required,
      metaphorSplit: d.metaphorSplit,
      entryPaths: d.entryPaths,
      impostors: d.impostors,
      eras: d.eras,
      decompositions: d.decompositions,
    },
  };
}
