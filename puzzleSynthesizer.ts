// puzzleSynthesizer.ts

import { InsightByType, LinguisticInsight, LensId, Puzzle } from "./types";

function lensId(insight: LinguisticInsight): LensId {
  return insight.lens?.id ?? "DEFAULT";
}

function lensLabel(insight: LinguisticInsight): string | undefined {
  return insight.lens?.label;
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
      root: insight.root,
      lang: insight.language,
      meaning: insight.meaning,
      lensLabel: lensLabel(insight),
    },
    reveal: { headline: "", body: "", connections: [] },
  };
}

function buildSortPuzzle(insight: InsightByType<"SUPPLETIVE" | "GRIMM" | "COLLISION" | "PIE" | "PHANTOM_ROOT" | "DECEPTION" | "FALSE_FAMILY" | "BORROWED" | "TOPONYM">, date: string): Puzzle {
  const { groups, pool, falseSystem, questionPrompt, revealBody } = insight.data;
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
      fallback: "Sort the words into their hidden historical groups.",
    }),
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
      root: origin,
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

    case "TOPONYM":
      return assertPuzzleShape(buildSortPuzzle(insight, date));

    case "SUPPLETIVE":
    case "COLLISION":
    case "PIE":
    case "GRIMM":
    case "PHANTOM_ROOT":
      return assertPuzzleShape(buildSortPuzzle(insight, date));

    default: {
      const neverType: never = insight;
      throw new Error(`Unsupported puzzle type: ${JSON.stringify(neverType)}`);
    }
  }
}
