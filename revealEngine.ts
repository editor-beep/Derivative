// revealEngine.ts

import { InsightByType, LinguisticInsight, LensId, Reveal } from "./types";

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

function defaultReveal(insight: LinguisticInsight): Reveal {
  const root = insight.root || insight.words[0] || "";
  const lang = insight.language || "unknown";
  const sample = insight.words.slice(0, 6);
  return {
    headline: insight.type !== "ROOT" && "revealHeadline" in insight.data && typeof insight.data.revealHeadline === "string"
      ? insight.data.revealHeadline
      : `${root.toUpperCase()} — ${lang}`,
    body: insight.type !== "ROOT" && "revealBody" in insight.data && typeof insight.data.revealBody === "string"
      ? insight.data.revealBody
      : insight.tension,
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
    body: "revealBody" in insight.data && typeof insight.data.revealBody === "string"
      ? insight.data.revealBody
      : insight.tension,
    connections: words
      .slice(0, 4)
      .map((w, i) => [w, words[(i + offset) % words.length]] as [string, string]),
    lensNote: lensNote(insight),
  };
}

function deceptionReveal(insight: LinguisticInsight): Reveal { return buildGroupReveal(insight, "DECEPTION", 2); }

function falseFamilyReveal(insight: LinguisticInsight): Reveal { return buildGroupReveal(insight, "FALSE FAMILY", 1); }

function idiomReveal(insight: InsightByType<"IDIOM">): Reveal {
  const { phrase, origin, revealHeadline, revealBody } = insight.data;
  const words = phrase.split(" ");
  return {
    headline: revealHeadline,
    body: revealBody,
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
