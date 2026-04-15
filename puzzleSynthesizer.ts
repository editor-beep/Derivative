// puzzleSynthesizer.ts

import { hashString, mulberry32 } from "./seed";
import { CLASSIFICATION_DECOY_POOLS, ClassificationDecoyType } from "./src/data/classificationDecoyPools";
import { InsightByType, LinguisticInsight, LensId, Puzzle } from "./types";

function lensId(insight: LinguisticInsight): LensId {
  return insight.lens?.id ?? "DEFAULT";
}

function lensLabel(insight: LinguisticInsight): string | undefined {
  return insight.lens?.label;
}



const CLASSIFICATION_DECOY_TYPES = new Set<ClassificationDecoyType>([
  "COLLISION",
  "SUPPLETIVE",
  "BORROWED",
  "FALSE_FAMILY",
]);

function seededShuffle(values: string[], seed: string): string[] {
  const r = mulberry32(hashString(seed));
  return [...values]
    .map((value, index) => ({ value, score: r() + index / 10_000 }))
    .sort((a, b) => a.score - b.score)
    .map(({ value }) => value);
}

function injectClassificationDecoys(
  insight: InsightByType<
    "SUPPLETIVE" | "COLLISION" | "PIE" | "PHANTOM_ROOT" | "DECEPTION" | "FALSE_FAMILY" | "BORROWED" | "TOPONYM"
  >,
  date: string,
): { pool: string[]; falseSystem: Puzzle["falseSystem"] } {
  const sourcePool = insight.data.pool ?? [];
  const baseFalseSystem = insight.data.falseSystem;
  if (!CLASSIFICATION_DECOY_TYPES.has(insight.type as ClassificationDecoyType)) {
    return {
      pool: sourcePool,
      falseSystem: baseFalseSystem,
    };
  }

  const acceptedTerms = new Set(insight.data.groups.flatMap((group) => group.accepts));
  const availableDecoys = CLASSIFICATION_DECOY_POOLS[insight.type as ClassificationDecoyType].filter(
    (token) => !acceptedTerms.has(token) && !sourcePool.includes(token),
  );

  if (!availableDecoys.length) {
    return {
      pool: sourcePool,
      falseSystem: baseFalseSystem,
    };
  }

  const shuffled = seededShuffle(availableDecoys, `${date}:${insight.id}:${insight.type}:decoys`);
  const countSeed = hashString(`${date}:${insight.id}:decoy-count`);
  const targetCount = 1 + (countSeed % 2);
  const injected = shuffled.slice(0, Math.min(targetCount, shuffled.length));

  if (!injected.length) {
    return {
      pool: sourcePool,
      falseSystem: baseFalseSystem,
    };
  }

  const authoredDecoys = baseFalseSystem?.decoys ?? [];
  const mergedDecoys = Array.from(new Set([...authoredDecoys, ...injected]));

  return {
    pool: [...sourcePool, ...injected],
    falseSystem: {
      decoys: mergedDecoys,
      breakMessage:
        baseFalseSystem?.breakMessage ??
        "SYSTEM FRACTURE: one or more tokens are bait and do not belong to any true bucket.",
      revealTruth:
        baseFalseSystem?.revealTruth ??
        "Some pool items are deliberate decoys: near-matches that mimic the visible pattern without fitting the historical system.",
    },
  };
}

const claimByType: Partial<Record<LinguisticInsight["type"], string>> = {
  BORROWED: "Prestige reshapes language.",
  COLLISION: "Language is conquest.",
  SUPPLETIVE: "Power rewrites grammar.",
  FALSE_FAMILY: "Similarity is not truth.",
  SEMANTIC: "Meaning shifts over time.",
};

function claimForInsight(insight: LinguisticInsight): string {
  return claimByType[insight.type] ?? "Words carry layered histories.";
}

function normalizeCopy(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function diceCoefficient(a: string, b: string): number {
  if (!a || !b) return 0;
  if (a === b) return 1;
  const grams = (s: string) => {
    const out = new Set<string>();
    for (let i = 0; i < s.length - 1; i += 1) out.add(s.slice(i, i + 2));
    return out;
  };
  const aGrams = grams(a);
  const bGrams = grams(b);
  let overlap = 0;
  aGrams.forEach((g) => {
    if (bGrams.has(g)) overlap += 1;
  });
  return (2 * overlap) / (aGrams.size + bGrams.size);
}

function guardPrompt({
  type,
  id,
  prompt,
  revealBody,
  fallback,
}: {
  type: string;
  id: string;
  prompt?: string;
  revealBody?: string;
  fallback: string;
}): string {
  const safePrompt = prompt?.trim() || fallback;
  const promptNorm = normalizeCopy(safePrompt);
  const revealNorm = normalizeCopy(revealBody ?? "");
  const isTooSimilar = !!revealNorm && (promptNorm === revealNorm || diceCoefficient(promptNorm, revealNorm) >= 0.9);
  if (!isTooSimilar) return safePrompt;
  console.warn(`[content-guard] Prompt matched reveal copy for ${type}:${id}. Replaced with generic non-spoiler prompt.`);
  return fallback;
}

function buildRootPuzzle(insight: InsightByType<"ROOT">, date: string): Puzzle {
  const { targets, required } = insight.data;
  return {
    date,
    type: "ROOT",
    lensId: lensId(insight),
    prompt: `Find words derived from the ${insight.language} root "${insight.root}" (${insight.meaning})`,
    targets,
    required,
    pool: targets,
    meta: {
      claim: claimForInsight(insight),
      root: insight.root,
      lang: insight.language,
      meaning: insight.meaning,
      lensLabel: lensLabel(insight),
    },
    reveal: { headline: "", body: "", connections: [] },
  };
}

function buildSortPuzzle(insight: InsightByType<"SUPPLETIVE" | "COLLISION" | "PIE" | "PHANTOM_ROOT" | "DECEPTION" | "FALSE_FAMILY" | "BORROWED" | "TOPONYM">, date: string): Puzzle {
  const { groups, questionPrompt, revealBody } = insight.data;
  const { pool, falseSystem } = injectClassificationDecoys(insight, date);
  const normalizedGroups = groups.map((group, index) => {
    const fallbackLabel = `Group ${String.fromCharCode(65 + index)}`;
    const displayLabel = group.displayLabel ?? fallbackLabel;
    const solutionLabel = group.solutionLabel ?? group.label ?? displayLabel;
    return {
      ...group,
      label: displayLabel,
      displayLabel,
      solutionLabel,
    };
  });
  return {
    date,
    type: insight.type,
    lensId: lensId(insight),
    prompt: guardPrompt({
      type: insight.type,
      id: insight.id,
      prompt: questionPrompt,
      revealBody,
      fallback: "There is a hidden system here. Find it.",
    }),
    groups: normalizedGroups,
    pool,
    falseSystem,
    meta: {
      claim: claimForInsight(insight),
      root: insight.root,
      lang: insight.language,
      meaning: insight.meaning,
      lensLabel: lensLabel(insight),
    },
    reveal: { headline: "", body: "", connections: [] },
  };
}

function buildDeceptionPuzzle(insight: InsightByType<"DECEPTION">, date: string): Puzzle {
  return buildSortPuzzle(insight, date);
}

function buildFalseFamilyPuzzle(insight: InsightByType<"FALSE_FAMILY">, date: string): Puzzle {
  return buildSortPuzzle(insight, date);
}

function buildTimelinePuzzle(insight: InsightByType<"SEMANTIC">, date: string): Puzzle {
  const { timeline, word } = insight.data;
  return {
    date,
    type: "SEMANTIC",
    lensId: lensId(insight),
    prompt: `Trace the semantic drift of "${word}"`,
    timeline,
    meta: {
      claim: claimForInsight(insight),
      root: insight.root,
      lang: insight.language,
      meaning: insight.meaning,
      lensLabel: lensLabel(insight),
    },
    reveal: { headline: "", body: "", connections: [] },
  };
}

function buildIdiomPuzzle(insight: InsightByType<"IDIOM">, date: string): Puzzle {
  const { phrase, origin, questionPrompt, revealBody } = insight.data;
  return {
    date,
    type: "IDIOM",
    lensId: lensId(insight),
    prompt: guardPrompt({
      type: insight.type,
      id: insight.id,
      prompt: questionPrompt,
      revealBody,
      fallback: "Reassemble the idiom from the fragments.",
    }),
    answer: phrase,
    word: origin,
    meta: {
      claim: claimForInsight(insight),
      root: origin,
      lang: insight.language,
      meaning: insight.meaning,
      lensLabel: lensLabel(insight),
    },
    reveal: { headline: "", body: "", connections: [] },
  };
}

function buildGrimmPuzzle(insight: InsightByType<"GRIMM">, date: string): Puzzle {
  const { pairs } = insight.data;
  return {
    date,
    type: "GRIMM",
    lensId: lensId(insight),
    prompt: insight.tension,
    pairs,
    meta: {
      claim: "Sound shifts are law.",
      root: insight.root,
      lang: insight.language,
      meaning: insight.meaning,
      lensLabel: lensLabel(insight),
    },
    reveal: { headline: "", body: "", connections: [] },
  };
}

function buildBorrowedPuzzle(insight: InsightByType<"BORROWED">, date: string): Puzzle {
  return buildSortPuzzle(insight, date);
}

function buildMatchPuzzle(insight: InsightByType<"MATCH">, date: string): Puzzle {
  const { pairs, pool, questionPrompt, revealBody } = insight.data;
  return {
    date,
    type: "MATCH",
    lensId: lensId(insight),
    prompt: guardPrompt({
      type: insight.type,
      id: insight.id,
      prompt: questionPrompt,
      revealBody,
      fallback: "Match each word to its historical gloss.",
    }),
    pairs,
    pool,
    meta: {
      claim: claimForInsight(insight),
      root: insight.root,
      lang: insight.language,
      meaning: insight.meaning,
      lensLabel: lensLabel(insight),
    },
    reveal: { headline: "", body: "", connections: [] },
  };
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
    case "MATCH":
      if (!puzzle.pairs?.length || !puzzle.pool?.length) {
        throw new Error(`Invalid MATCH puzzle shape for ${puzzle.date}`);
      }
      break;
    case "GRIMM":
      if (!puzzle.pairs?.length) {
        throw new Error(`Invalid GRIMM puzzle shape for ${puzzle.date}`);
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
    case "ROOT":
      return assertPuzzleShape(buildRootPuzzle(insight, date));

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

    case "MATCH":
      return assertPuzzleShape(buildMatchPuzzle(insight, date));

    case "TOPONYM":
      return assertPuzzleShape(buildSortPuzzle(insight, date));

    case "SUPPLETIVE":
    case "COLLISION":
    case "PIE":
    case "PHANTOM_ROOT":
      return assertPuzzleShape(buildSortPuzzle(insight, date));

    case "GRIMM":
      return assertPuzzleShape(buildGrimmPuzzle(insight, date));

    default: {
      const neverType: never = insight;
      throw new Error(`Unsupported puzzle type: ${JSON.stringify(neverType)}`);
    }
  }
}
