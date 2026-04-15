import type { FalseSystemConfig, RootInsightFragment } from "../types";

export type SuppletiveEntry = {
  root: string;
  lang: string;
  meaning: string;
  groups: Array<{
    id: string;
    label?: string;
    displayLabel?: string;
    solutionLabel?: string;
    hint?: string;
    hintLevel2?: string;
    accepts: string[];
    related: string[];
  }>;
  pool: string[];
  tension: string;
  questionPrompt?: string;
  revealBody?: string;
  falseSystem?: FalseSystemConfig;
};

export type SortPoolEntry = {
  root: string;
  lang: string;
  meaning: string;
  groups: Array<{
    id: string;
    label?: string;
    displayLabel?: string;
    solutionLabel?: string;
    hint?: string;
    hintLevel2?: string;
    accepts: string[];
    related: string[];
  }>;
  pool: string[];
  tension: string;
  questionPrompt?: string;
  revealHeadline?: string;
  revealBody?: string;
  falseSystem?: FalseSystemConfig;
  matchPairs?: Array<{
    source: string;
    target: string;
    note?: string;
  }>;
};

export type RootPoolEntry = {
  root: string;
  lang: string;
  meaning: string;
  targets: string[];
  required: string[];
  tension: string;
} & RootInsightFragment;

export type IdiomEntry = {
  phrase: string;
  origin: string;
  lang: string;
  fragments: string[];
  questionPrompt?: string;
  tension: string;
  revealHeadline: string;
  revealBody: string;
};

export type MoorishArabicEntry = {
  word: string;
  origin: string;
  definition: string;
  insight: string;
  difficulty: "Easy" | "Medium" | "Hard";
};

export type WomanCentricEntry = {
  word: string;
  origin: string;
  definition: string;
  insight: string;
  difficulty: "Easy" | "Medium" | "Hard";
};
