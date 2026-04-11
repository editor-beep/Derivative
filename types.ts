// types.ts

export type PuzzleType =
  | "ROOT"
  | "SEMANTIC"
  | "SUPPLETIVE"
  | "GRIMM"
  | "COLLISION"
  | "PIE"
  | "DECEPTION"
  | "FALSE_FAMILY"
  | "PHANTOM_ROOT"
  | "IDIOM"
  | "BORROWED";

export interface LinguisticInsight {
  id: string;
  type: PuzzleType;

  root?: string;
  language?: string;

  words: string[];
  meaning?: string;

  // The contradiction / tension
  tension: string;

  // raw data for building puzzles
  data: any;
}

export interface Puzzle {
  date: string;
  type: PuzzleType;

  prompt: string;

  // flexible structure depending on type
  pool?: string[];
  targets?: string[];
  required?: string[];
  groups?: any[];
  pairs?: any[];
  timeline?: any[];

  // IDIOM-specific
  fragments?: string[];
  answer?: string;
  word?: string;

  meta: {
    root?: string;
    lang?: string;
    meaning?: string;
  };

  reveal: Reveal;
}

export interface Reveal {
  headline: string;
  body: string;
  connections: [string, string][];
}