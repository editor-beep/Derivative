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
  | "BORROWED"
  | "TOPONYM";

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



export type ProvenanceConfidence = "verified" | "probable" | "disputed";

export interface SourceReference {
  sourceId: string;
  sourceTitle: string;
  sourceUrl: string;
  publisher?: string;
  retrievedAt: string;
  license?: string;
}

export interface EntryProvenance {
  sourceIds: string[];
  sources?: SourceReference[];
  confidence: ProvenanceConfidence;
  notes: string;
  counterSourceIds?: string[];
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
  groups?: PuzzleGroup[];
  pairs?: PuzzlePair[];
  timeline?: PuzzleTimelineItem[];
  falseSystem?: FalseSystemConfig;

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

export interface FalseSystemConfig {
  decoys: string[];
  breakMessage: string;
  revealTruth: string;
}

export interface Reveal {
  headline: string;
  body: string;
  connections: [string, string][];
  lensNote?: string;
}

export type PuzzleGroup = {
  id: string;
  label: string;
  displayLabel?: string;
  solutionLabel?: string;
  accepts: string[];
  related: string[];
};

export type PuzzlePair = {
  source: string;
  target: string;
  note?: string;
};

export type PuzzleTimelineItem = {
  era: string;
  meaning: string;
  blank?: boolean;
};
