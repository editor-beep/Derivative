// revealEngine.ts

import { LinguisticInsight, Reveal } from "./types";

function defaultReveal(insight: LinguisticInsight): Reveal {
  const root = insight.root || insight.words[0] || "";
  const lang = insight.language || "unknown";
  const sample = insight.words.slice(0, 6);
  return {
    headline: `${root.toUpperCase()} — ${lang}`,
    body: insight.tension,
    connections: sample
      .slice(0, 3)
      .map((w, i) => [w, sample[i + 1] ?? root] as [string, string]),
  };
}

function deceptionReveal(insight: LinguisticInsight): Reveal {
  const root = insight.root || "";
  const words = insight.words;
  return {
    headline: `DECEPTION — ${root}`,
    body: insight.tension,
    connections: words
      .slice(0, 4)
      .map((w, i) => [w, words[(i + 2) % words.length]] as [string, string]),
  };
}

function falseFamilyReveal(insight: LinguisticInsight): Reveal {
  const root = insight.root || "";
  const words = insight.words;
  return {
    headline: `FALSE FAMILY — ${root}`,
    body: insight.tension,
    connections: words
      .slice(0, 4)
      .map((w, i) => [w, words[(i + 1) % words.length]] as [string, string]),
  };
}

function idiomReveal(insight: LinguisticInsight): Reveal {
  const { phrase, origin, revealHeadline, revealBody } = insight.data as {
    phrase: string;
    origin: string;
    revealHeadline: string;
    revealBody: string;
  };
  const words = phrase.split(" ");
  return {
    headline: revealHeadline,
    body: revealBody,
    connections: [
      [phrase, origin],
      [words[0], insight.language || "unknown"],
      [insight.tension.slice(0, 40) + "…", "fossilized ideology"],
    ] as [string, string][],
  };
}

function borrowedReveal(insight: LinguisticInsight): Reveal {
  const root = insight.root || "";
  const words = insight.words;
  return {
    headline: `BORROWED — ${root}`,
    body: insight.tension,
    connections: words
      .slice(0, 4)
      .map((w, i) => [w, words[(i + 2) % words.length]] as [string, string]),
  };
}

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

    default:
      return defaultReveal(insight);
  }
}
