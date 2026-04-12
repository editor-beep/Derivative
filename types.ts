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

export type LensId =
  | "DEFAULT"
  | "METAPHOR_DRIFT"
  | "ETYMOLOGY_FILTER"
  | "FALSE_TWIN"
  | "TEMPORAL_DEPTH"
  | "COMPOUND_HUNT"
  | "REGISTER_SORT"
  | "SOUND_TRACE";

export interface Lens {
  id: LensId;
  label: string;
  sublabel: string;
  applicableTo: PuzzleType[];
}

export interface LinguisticInsight {
  id: string;
  type: PuzzleType;

  // The lens applied to this insight — set by applyLens(), DEFAULT if absent
  lens?: Lens;

  root?: string;
  language?: string;

  words: string[];
  meaning?: string;

  // The contradiction / tension — may be modified by applyLens()
  tension: string;

  // raw data for building puzzles — may be augmented by applyLens()
  data: any;
}

export interface Puzzle {
  date: string;
  type: PuzzleType;
  lensId: LensId;

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
    lensLabel?: string;
  };

  reveal: Reveal;
}

export interface Reveal {
  headline: string;
  body: string;
  connections: [string, string][];
  lensNote?: string;
}
