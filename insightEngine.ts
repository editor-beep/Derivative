// insightEngine.ts

import { LinguisticInsight } from "./types";

export function generateInsight(seed: number): LinguisticInsight {
  const r = mulberry32(seed);

  const types = [
    buildRootInsight,
    buildSuppletiveInsight,
    buildSemanticShiftInsight,
    buildCollisionInsight,
    buildDeceptionInsight,
    buildFalseFamilyInsight
  ];

  const pick = types[Math.floor(r() * types.length)];
  return pick(r);
}