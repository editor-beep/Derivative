// revealEngine.ts

import { LinguisticInsight, Reveal } from "./types";

export function generateReveal(insight: LinguisticInsight): Reveal {
  switch (insight.type) {
    case "DECEPTION":
      return deceptionReveal(insight);

    case "FALSE_FAMILY":
      return falseFamilyReveal(insight);

    default:
      return defaultReveal(insight);
  }
}