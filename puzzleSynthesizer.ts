// puzzleSynthesizer.ts

import { LinguisticInsight, Puzzle } from "./types";

function buildRootPuzzle(insight: LinguisticInsight, date: string): Puzzle {
  const { targets, required } = insight.data as { targets: string[]; required: string[] };
  return {
    date,
    type: "ROOT",
    prompt: `Find words derived from the ${insight.language} root "${insight.root}" (${insight.meaning})`,
    targets,
    required,
    pool: targets,
    meta: {
      root: insight.root,
      lang: insight.language,
      meaning: insight.meaning,
    },
    reveal: { headline: "", body: "", connections: [] },
  };
}

function buildSortPuzzle(insight: LinguisticInsight, date: string): Puzzle {
  const { groups, pool } = insight.data as {
    groups: Array<{ id: string; label: string; accepts: string[]; related: string[] }>;
    pool: string[];
  };
  return {
    date,
    type: insight.type,
    prompt: insight.tension,
    groups,
    pool,
    meta: {
      root: insight.root,
      lang: insight.language,
      meaning: insight.meaning,
    },
    reveal: { headline: "", body: "", connections: [] },
  };
}

function buildDeceptionPuzzle(insight: LinguisticInsight, date: string): Puzzle {
  return buildSortPuzzle(insight, date);
}

function buildFalseFamilyPuzzle(insight: LinguisticInsight, date: string): Puzzle {
  return buildSortPuzzle(insight, date);
}

function buildTimelinePuzzle(insight: LinguisticInsight, date: string): Puzzle {
  const { timeline, word } = insight.data as {
    timeline: Array<{ era: string; meaning: string; blank?: boolean }>;
    word: string;
  };
  return {
    date,
    type: "SEMANTIC",
    prompt: `Trace the semantic drift of "${word}"`,
    timeline,
    meta: {
      root: insight.root,
      lang: insight.language,
      meaning: insight.meaning,
    },
    reveal: { headline: "", body: "", connections: [] },
  };
}

export function synthesizePuzzle(insight: LinguisticInsight, date: string): Puzzle {
  switch (insight.type) {
    case "DECEPTION":
      return buildDeceptionPuzzle(insight, date);

    case "FALSE_FAMILY":
      return buildFalseFamilyPuzzle(insight, date);

    case "SEMANTIC":
      return buildTimelinePuzzle(insight, date);

    case "SUPPLETIVE":
    case "COLLISION":
    case "PIE":
    case "PHANTOM_ROOT":
      return buildSortPuzzle(insight, date);

    default:
      return buildRootPuzzle(insight, date);
  }
}
