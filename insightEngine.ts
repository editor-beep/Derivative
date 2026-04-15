// insightEngine.ts — orchestrator
import type { LinguisticInsight, Lens } from "./types";
import { mulberry32 } from "./seed";

import { buildRootInsight } from "./src/generators/root";
import { buildSuppletiveInsight } from "./src/generators/suppletive";
import { buildSemanticShiftInsight } from "./src/generators/semantic";
import { buildCollisionInsight } from "./src/generators/collision";
import { buildDeceptionInsight } from "./src/generators/deception";
import { buildFalseFamilyInsight } from "./src/generators/falseFamily";
import { buildIdiomInsight } from "./src/generators/idiom";
import { buildBorrowedInsight } from "./src/generators/borrowed";
import { buildToponymInsight } from "./src/generators/toponym";
import { buildGrimmInsight } from "./src/generators/grimm";
import { buildPIEInsight } from "./src/generators/pie";

import { ROOT_POOL } from "./src/data/rootPool";
import { SUPPLETIVE_POOL } from "./src/data/suppletivePool";
import { SEMANTIC_POOL } from "./src/data/semanticPool";
import { COLLISION_POOL } from "./src/data/collisionPool";
import { DECEPTION_POOL } from "./src/data/deceptionPool";
import { FALSE_FAMILY_POOL } from "./src/data/falseFamilyPool";
import { IDIOM_POOL } from "./src/data/idiomPool";
import { BORROWED_POOL } from "./src/data/borrowedPool";
import { TOPONYM_POOL } from "./src/data/toponymPool";
import { GRIMM_POOL } from "./src/data/grimmPool";
import { PIE_POOL } from "./src/data/piePool";

import { LENSES, applyLens } from "./src/lenses";
export { LENSES, applyLens };

type Builder = (r: () => number, idx?: number) => LinguisticInsight;
type PuzzleBuilderType = Extract<
  LinguisticInsight["type"],
  | "ROOT"
  | "SUPPLETIVE"
  | "SEMANTIC"
  | "COLLISION"
  | "DECEPTION"
  | "FALSE_FAMILY"
  | "IDIOM"
  | "BORROWED"
  | "TOPONYM"
  | "GRIMM"
  | "PIE"
>;

type PuzzleSource = {
  builderType: PuzzleBuilderType;
  builder: Builder;
  entryCount: number;
  lensRule: (lens: Lens) => boolean;
};

export const PUZZLE_SOURCES: readonly PuzzleSource[] = [
  {
    builderType: "ROOT",
    builder: buildRootInsight,
    entryCount: ROOT_POOL.length,
    lensRule: (lens) => lens.applicableTo.includes("ROOT"),
  },
  {
    builderType: "SUPPLETIVE",
    builder: buildSuppletiveInsight,
    entryCount: SUPPLETIVE_POOL.length,
    lensRule: (lens) => lens.applicableTo.includes("SUPPLETIVE"),
  },
  {
    builderType: "SEMANTIC",
    builder: buildSemanticShiftInsight,
    entryCount: SEMANTIC_POOL.length,
    lensRule: (lens) => lens.applicableTo.includes("SEMANTIC"),
  },
  {
    builderType: "COLLISION",
    builder: buildCollisionInsight,
    entryCount: COLLISION_POOL.length,
    lensRule: (lens) => lens.applicableTo.includes("COLLISION"),
  },
  {
    builderType: "DECEPTION",
    builder: buildDeceptionInsight,
    entryCount: DECEPTION_POOL.length,
    lensRule: (lens) => lens.applicableTo.includes("DECEPTION"),
  },
  {
    builderType: "FALSE_FAMILY",
    builder: buildFalseFamilyInsight,
    entryCount: FALSE_FAMILY_POOL.length,
    lensRule: (lens) => lens.applicableTo.includes("FALSE_FAMILY"),
  },
  {
    builderType: "IDIOM",
    builder: buildIdiomInsight,
    entryCount: IDIOM_POOL.length,
    lensRule: (lens) => lens.applicableTo.includes("IDIOM"),
  },
  {
    builderType: "BORROWED",
    builder: buildBorrowedInsight,
    entryCount: BORROWED_POOL.length,
    lensRule: (lens) => lens.applicableTo.includes("BORROWED") || lens.applicableTo.includes("MATCH"),
  },
  {
    builderType: "TOPONYM",
    builder: buildToponymInsight,
    entryCount: TOPONYM_POOL.length,
    lensRule: (lens) => lens.applicableTo.includes("TOPONYM"),
  },
  {
    builderType: "GRIMM",
    builder: buildGrimmInsight,
    entryCount: GRIMM_POOL.length,
    lensRule: (lens) => lens.applicableTo.includes("GRIMM"),
  },
  {
    builderType: "PIE",
    builder: buildPIEInsight,
    entryCount: PIE_POOL.length,
    lensRule: (lens) => lens.applicableTo.includes("PIE"),
  },
];

for (const source of PUZZLE_SOURCES) {
  if (source.entryCount === 0) {
    throw new Error(`Puzzle source "${source.builderType}" has zero entries.`);
  }
}

export const POOL_FLAT_TABLE: Array<{
  builderIdx: number;
  entryIdx: number;
  lensIdx: number;
}> = (() => {
  const result: Array<{
    builderIdx: number;
    entryIdx: number;
    lensIdx: number;
  }> = [];
  for (let b = 0; b < PUZZLE_SOURCES.length; b++) {
    const source = PUZZLE_SOURCES[b];
    if (!source) continue;
    for (let e = 0; e < source.entryCount; e++) {
      for (let l = 0; l < LENSES.length; l++) {
        const lens = LENSES[l];
        if (!lens) continue;
        if (source.lensRule(lens)) {
          result.push({ builderIdx: b, entryIdx: e, lensIdx: l });
        }
      }
    }
  }
  return result;
})();

export function generateInsight(
  seed: number,
  override?: { builderIdx: number; entryIdx: number; lensIdx: number },
): LinguisticInsight {
  if (override) {
    const r = mulberry32((seed ^ 0xfacefeed) >>> 0);
    const source = PUZZLE_SOURCES[override.builderIdx];
    const lens = LENSES[override.lensIdx];
    if (!source || !lens) {
      throw new Error("Invalid override indices for puzzle generation.");
    }
    const insight = source.builder(r, override.entryIdx);
    return applyLens(insight, lens, r);
  }

  const r = mulberry32(seed);
  const chosen = PUZZLE_SOURCES[Math.floor(r() * PUZZLE_SOURCES.length)];
  if (!chosen) {
    throw new Error("No puzzle sources configured.");
  }
  const insight = chosen.builder(r);
  const rLens = mulberry32((seed ^ 0xd1ce5eed) >>> 0);
  const lens = LENSES[Math.floor(rLens() * LENSES.length)];
  if (!lens) {
    throw new Error("No lenses configured.");
  }
  return applyLens(insight, lens, r);
}
