import { MEANING_DRIFT_POOL } from "./meaningDrift";
import { MEANING_DRIFT_POOL_2 } from "./meaningDrift2";

export const SEMANTIC_POOL = [
  ...MEANING_DRIFT_POOL,
  ...MEANING_DRIFT_POOL_2,
  {
    root: "nice",
    lang: "Latin → Old French → English",
    meaning: "semantic drift",
    timeline: [
      { era: "Latin (nescius)", meaning: "ignorant, not knowing" },
      { era: "Old French (nice)", meaning: "foolish, simple", blank: true },
      { era: "Middle English", meaning: "wanton, lascivious" },
      {
        era: "Late Middle English",
        meaning: "precise, fastidious",
        blank: true,
      },
      { era: "Modern English", meaning: "pleasant, agreeable" },
    ],
    tension:
      "The word 'nice' drifted from 'foolish' to 'pleasant' over 700 years",
  },
  {
    root: "silly",
    lang: "Old English → Middle English",
    meaning: "semantic drift",
    timeline: [
      { era: "Old English (sælig)", meaning: "blessed, happy" },
      {
        era: "Early Middle English",
        meaning: "innocent, harmless",
        blank: true,
      },
      { era: "Late Middle English", meaning: "deserving of pity" },
      { era: "Early Modern English", meaning: "weak, feeble", blank: true },
      { era: "Modern English", meaning: "foolish, absurd" },
    ],
    tension:
      "'Silly' reversed from 'blessed' to 'foolish' through a chain of pity associations",
  },
  {
    root: "awful",
    lang: "Old English",
    meaning: "semantic drift",
    timeline: [
      { era: "Old English (egefull)", meaning: "inspiring awe or dread" },
      { era: "Middle English", meaning: "worthy of deep respect", blank: true },
      { era: "Early Modern English", meaning: "solemnly impressive" },
      {
        era: "Modern English",
        meaning: "extremely bad, terrible",
        blank: true,
      },
    ],
    tension:
      "'Awful' shifted from 'awe-inspiring' to 'terrible' — a textbook pejoration",
  },
  {
    root: "villain",
    lang: "Latin → Old French → English",
    meaning: "semantic drift",
    timeline: [
      { era: "Latin (villanus)", meaning: "farm worker, serf" },
      { era: "Old French (vilain)", meaning: "peasant, commoner", blank: true },
      { era: "Middle English", meaning: "person of low social class" },
      {
        era: "Late Middle English",
        meaning: "wicked, depraved person",
        blank: true,
      },
      { era: "Modern English", meaning: "deliberate scoundrel, antagonist" },
    ],
    tension:
      "Class prejudice transformed 'farm worker' into 'evil person' over 400 years",
  },
  {
    root: "bully",
    lang: "Dutch → English",
    meaning: "semantic drift",
    timeline: [
      { era: "Dutch (boel)", meaning: "lover, sweetheart" },
      { era: "Early English", meaning: "fine fellow, darling", blank: true },
      { era: "17th century", meaning: "blusterer, swaggerer" },
      { era: "18th century", meaning: "hired ruffian", blank: true },
      { era: "Modern English", meaning: "one who harms the weaker" },
    ],
    tension: "'Bully' inverted from a term of endearment into a term of menace",
  },
];
