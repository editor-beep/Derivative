// puzzleSynthesizer.ts

import { LinguisticInsight, LensId, Puzzle } from "./types";

function lensId(insight: LinguisticInsight): LensId {
  return insight.lens?.id ?? "DEFAULT";
}

function lensLabel(insight: LinguisticInsight): string | undefined {
  return insight.lens?.label;
}

function buildRootPuzzle(insight: LinguisticInsight, date: string): Puzzle {
  const { targets, required } = insight.data as { targets: string[]; required: string[] };
  return {
    date,
    type: "ROOT",
    lensId: lensId(insight),
    prompt: `Find words derived from the ${insight.language} root "${insight.root}" (${insight.meaning})`,
    targets,
    required,
    pool: targets,
    meta: {
      root: insight.root,
      lang: insight.language,
      meaning: insight.meaning,
      lensLabel: lensLabel(insight),
    },
    reveal: { headline: "", body: "", connections: [] },
  };
}

function buildSortPuzzle(insight: LinguisticInsight, date: string): Puzzle {
  const { groups, pool, falseSystem } = insight.data as {
    groups: Array<{
      id: string;
      label?: string;
      displayLabel?: string;
      solutionLabel?: string;
      accepts: string[];
      related: string[];
    }>;
    pool: string[];
    falseSystem?: Puzzle["falseSystem"];
  };
  const normalizedGroups = groups.map((group) => {
    const neutralLabel = group.displayLabel ?? group.label ?? group.solutionLabel ?? group.id;
    return {
      ...group,
      label: neutralLabel,
      displayLabel: neutralLabel,
      solutionLabel: group.solutionLabel ?? neutralLabel,
    };
  });
  return {
    date,
    type: insight.type,
    lensId: lensId(insight),
    prompt: insight.tension,
    groups: normalizedGroups,
    pool,
    falseSystem,
    meta: {
      root: insight.root,
      lang: insight.language,
      meaning: insight.meaning,
      lensLabel: lensLabel(insight),
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
    lensId: lensId(insight),
    prompt: `Trace the semantic drift of "${word}"`,
    timeline,
    meta: {
      root: insight.root,
      lang: insight.language,
      meaning: insight.meaning,
      lensLabel: lensLabel(insight),
    },
    reveal: { headline: "", body: "", connections: [] },
  };
}

function buildIdiomPuzzle(insight: LinguisticInsight, date: string): Puzzle {
  const { phrase, origin } = insight.data as {
    phrase: string;
    origin: string;
  };
  return {
    date,
    type: "IDIOM",
    lensId: lensId(insight),
    prompt: insight.tension,
    answer: phrase,
    word: origin,
    meta: {
      root: origin,
      lang: insight.language,
      meaning: insight.meaning,
      lensLabel: lensLabel(insight),
    },
    reveal: { headline: "", body: "", connections: [] },
  };
}

function buildBorrowedPuzzle(insight: LinguisticInsight, date: string): Puzzle {
  return buildSortPuzzle(insight, date);
}

function assertPuzzleShape(puzzle: Puzzle): Puzzle {
  if (!puzzle.prompt || !puzzle.type) {
    throw new Error(`Invalid puzzle core shape for ${puzzle.date}`);
  }

  switch (puzzle.type) {
    case "ROOT":
      if (!puzzle.targets?.length || !puzzle.required?.length || !puzzle.pool?.length) {
        throw new Error(`Invalid ROOT puzzle shape for ${puzzle.date}`);
      }
      break;
    case "SEMANTIC":
      if (!puzzle.timeline?.length) {
        throw new Error(`Invalid SEMANTIC puzzle shape for ${puzzle.date}`);
      }
      break;
    case "IDIOM":
      if (!puzzle.answer || !puzzle.word) {
        throw new Error(`Invalid IDIOM puzzle shape for ${puzzle.date}`);
      }
      break;
    default:
      if (!puzzle.groups?.length || !puzzle.pool?.length) {
        throw new Error(`Invalid ${puzzle.type} puzzle shape for ${puzzle.date}`);
      }
      break;
  }

  return puzzle;
}

export function synthesizePuzzle(insight: LinguisticInsight, date: string): Puzzle {
  switch (insight.type) {
    case "DECEPTION":
      return assertPuzzleShape(buildDeceptionPuzzle(insight, date));

    case "FALSE_FAMILY":
      return assertPuzzleShape(buildFalseFamilyPuzzle(insight, date));

    case "SEMANTIC":
      return assertPuzzleShape(buildTimelinePuzzle(insight, date));

    case "IDIOM":
      return assertPuzzleShape(buildIdiomPuzzle(insight, date));

    case "BORROWED":
      return assertPuzzleShape(buildBorrowedPuzzle(insight, date));

    case "TOPONYM":
      return assertPuzzleShape(buildSortPuzzle(insight, date));

    case "SUPPLETIVE":
    case "COLLISION":
    case "PIE":
    case "PHANTOM_ROOT":
      return assertPuzzleShape(buildSortPuzzle(insight, date));

    default:
      return assertPuzzleShape(buildRootPuzzle(insight, date));
  }
}
