// revealEngine.ts

import { InsightByType, LinguisticInsight, LensId, PuzzleType, Reveal } from "./types";

function lensNote(insight: LinguisticInsight): string | undefined {
  const notes: Partial<Record<LensId, string>> = {
    METAPHOR_DRIFT: "The physical origin has been abstracted away — the root carries the ghost of its original body.",
    ETYMOLOGY_FILTER: "Words traveling via Old French were eroded by phonetic attrition before entering English.",
    FALSE_TWIN: "Visual resemblance to a root is not evidence of shared ancestry — spelling is archaeology, not genealogy.",
    TEMPORAL_DEPTH: "The same root kept arriving in English across centuries — each wave deposited a new layer of vocabulary.",
    COMPOUND_HUNT: "Morphological transparency: once you can decompose a word, you can read its argument structure.",
    REGISTER_SORT: "Register encodes social history — which class of speaker used which word, and why it stuck.",
    SOUND_TRACE: "Sound laws are exceptionless within their domain — every apparent exception signals a different origin.",
  };
  return insight.lens ? notes[insight.lens.id as LensId] : undefined;
}

type RevealContext = {
  root: string;
  language: string;
  system?: string;
  leadWord: string;
  secondWord: string;
};

type BodyTemplate = {
  happened: (insight: LinguisticInsight, context: RevealContext) => string;
  playerDid: (insight: LinguisticInsight, context: RevealContext) => string;
  matters: (insight: LinguisticInsight, context: RevealContext) => string;
};

const TEMPLATE_BY_TYPE: Partial<Record<PuzzleType, BodyTemplate>> = {
  IDIOM: {
    happened: (insight) =>
      insight.type === "IDIOM"
        ? `That line started as ${insight.data.origin} language, then got locked into everyday speech`
        : "This phrase carried a much older story than it first looked",
    playerDid: (insight) =>
      insight.type === "IDIOM"
        ? `You cracked \"${insight.data.phrase}\" and traced where it came from`
        : "You cracked the phrase and traced where it came from",
    matters: (_insight, context) => `That matters because idioms hide old beliefs inside ${context.language} conversation`,
  },
  DECEPTION: {
    happened: (insight, context) => `A fake ${context.system || "pattern"} made unrelated words look connected`,
    playerDid: (_insight, context) => `You spotted the trap and separated real links from lookalikes around ${context.root}`,
    matters: (_insight, context) => `That matters because this keeps your ${context.language} guesses sharp when decoys appear`,
  },
  FALSE_FAMILY: {
    happened: (_insight, context) => `A false family formed around ${context.root} even though the history does not match`,
    playerDid: (_insight, context) => `You split true relatives from copycat forms in the ${context.system || "set"}`,
    matters: (_insight, context) => `That matters because surface spelling can fool you fast in ${context.language}`,
  },
  BORROWED: {
    happened: (_insight, context) => `${context.language} pulled this root in from another source and reshaped it`,
    playerDid: (_insight, context) => `You tracked how ${context.leadWord} and ${context.secondWord} share the same import path`,
    matters: (_insight, context) => `That matters because borrowed layers explain why ${context.system || "the set"} feels uneven`,
  },
  TOPONYM: {
    happened: (_insight, context) => `A place name fed this word family and shifted with local speech`,
    playerDid: (_insight, context) => `You tied ${context.leadWord} back to location history instead of pure sound overlap`,
    matters: (_insight, context) => `That matters because map history often drives meaning change in ${context.language}`,
  },
};

function oneClause(text: string | undefined, fallback: string): string {
  if (!text) return fallback;
  const collapsed = text.replace(/\s+/g, " ").trim();
  if (!collapsed) return fallback;
  const first = collapsed.split(/[.!?]+/)[0]?.trim();
  return (first && first.length > 0 ? first : fallback).replace(/[.!?]+$/, "");
}

function systemLabel(insight: LinguisticInsight): string | undefined {
  if (insight.type !== "ROOT" && "falseSystem" in insight.data && insight.data.falseSystem?.revealTruth) {
    return insight.data.falseSystem.revealTruth;
  }
  return undefined;
}

function buildBody(insight: LinguisticInsight): string {
  const context: RevealContext = {
    root: insight.root || insight.words[0] || "this root",
    language: insight.language || "English",
    system: systemLabel(insight),
    leadWord: insight.words[0] || insight.root || "this word",
    secondWord: insight.words[1] || insight.root || "its pair",
  };

  const template = TEMPLATE_BY_TYPE[insight.type];
  const happenedSource = insight.type !== "ROOT" && "revealBody" in insight.data && typeof insight.data.revealBody === "string"
    ? insight.data.revealBody
    : insight.tension;

  const happened = oneClause(template?.happened(insight, context) ?? happenedSource, "The pattern finally clicked");
  const playerDid = oneClause(
    template?.playerDid(insight, context) ?? `You connected ${context.leadWord} with ${context.secondWord} through ${context.root}`,
    "You connected the key words",
  );
  const matters = oneClause(
    template?.matters(insight, context) ?? `That matters because this gives you a faster read on ${context.language} word history`,
    "That matters because now the logic is reusable",
  );

  return `${happened}. ${playerDid}. ${matters}.`;
}

function defaultReveal(insight: LinguisticInsight): Reveal {
  const root = insight.root || insight.words[0] || "";
  const lang = insight.language || "unknown";
  const sample = insight.words.slice(0, 6);
  return {
    headline: insight.type !== "ROOT" && "revealHeadline" in insight.data && typeof insight.data.revealHeadline === "string"
      ? insight.data.revealHeadline
      : `${root.toUpperCase()} — ${lang}`,
    body: buildBody(insight),
    connections: sample
      .slice(0, 3)
      .map((w, i) => [w, sample[i + 1] ?? root] as [string, string]),
    lensNote: lensNote(insight),
  };
}

function buildGroupReveal(insight: LinguisticInsight, label: string, offset: number): Reveal {
  const root = insight.root || "";
  const words = insight.words;
  return {
    headline: "revealHeadline" in insight.data && typeof insight.data.revealHeadline === "string"
      ? insight.data.revealHeadline
      : `${label} — ${root}`,
    body: buildBody(insight),
    connections: words
      .slice(0, 4)
      .map((w, i) => [w, words[(i + offset) % words.length]] as [string, string]),
    lensNote: lensNote(insight),
  };
}

function deceptionReveal(insight: LinguisticInsight): Reveal { return buildGroupReveal(insight, "DECEPTION", 2); }

function falseFamilyReveal(insight: LinguisticInsight): Reveal { return buildGroupReveal(insight, "FALSE FAMILY", 1); }

function idiomReveal(insight: InsightByType<"IDIOM">): Reveal {
  const { phrase, origin, revealHeadline } = insight.data;
  const words = phrase.split(" ");
  return {
    headline: revealHeadline,
    body: buildBody(insight),
    connections: [
      [phrase, origin],
      [words[0], insight.language || "unknown"],
      [insight.tension.slice(0, 40) + "…", "fossilized ideology"],
    ] as [string, string][],
    lensNote: lensNote(insight),
  };
}

function toponymReveal(insight: LinguisticInsight): Reveal { return buildGroupReveal(insight, "TOPONYM", 2); }

function borrowedReveal(insight: LinguisticInsight): Reveal { return buildGroupReveal(insight, "BORROWED", 2); }

export function generateReveal(insight: LinguisticInsight): Reveal {
  switch (insight.type) {
    case "DECEPTION":
      return deceptionReveal(insight);

    case "FALSE_FAMILY":
      return falseFamilyReveal(insight);

    case "IDIOM":
      return idiomReveal(insight);

    case "BORROWED":
      return borrowedReveal(insight);

    case "TOPONYM":
      return toponymReveal(insight);

    default:
      return defaultReveal(insight);
  }
}
