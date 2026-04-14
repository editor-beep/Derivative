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
  | "TOPONYM"
  | "MATCH";

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

export interface RootInsightData extends RootInsightFragment {
  targets: string[];
  required: string[];
  pool?: string[];
  impostor?: string;
  timeline?: PuzzleTimelineItem[];
}

export interface SortInsightData {
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
  falseSystem?: FalseSystemConfig;
  registers?: Record<string, "formal" | "informal" | "technical" | string>;
  questionPrompt?: string;
  revealHeadline?: string;
  revealBody?: string;
}

export interface SemanticInsightData {
  timeline: PuzzleTimelineItem[];
  word: string;
}

export interface MatchInsightData {
  pairs: PuzzlePair[];
  pool: string[];
  questionPrompt?: string;
  revealHeadline?: string;
  revealBody?: string;
}

export interface IdiomInsightData {
  phrase: string;
  fragments: string[];
  origin: string;
  questionPrompt?: string;
  revealHeadline: string;
  revealBody: string;
}

export type InsightDataByType = {
  ROOT: RootInsightData;
  SEMANTIC: SemanticInsightData;
  SUPPLETIVE: SortInsightData;
  GRIMM: SortInsightData;
  COLLISION: SortInsightData;
  PIE: SortInsightData;
  DECEPTION: SortInsightData;
  FALSE_FAMILY: SortInsightData;
  PHANTOM_ROOT: SortInsightData;
  IDIOM: IdiomInsightData;
  BORROWED: SortInsightData;
  TOPONYM: SortInsightData;
  MATCH: MatchInsightData;
};

export interface LinguisticInsightBase<TType extends PuzzleType> {
  id: string;
  type: TType;

  // The lens applied to this insight — set by applyLens(), DEFAULT if absent
  lens?: Lens;

  root?: string;
  language?: string;

  words: string[];
  meaning?: string;

  // The contradiction / tension — may be modified by applyLens()
  tension: string;

  // raw data for building puzzles — may be augmented by applyLens()
  data: InsightDataByType[TType];
}

export type LinguisticInsight = {
  [TType in PuzzleType]: LinguisticInsightBase<TType>;
}[PuzzleType];

export type InsightByType<TType extends PuzzleType> = Extract<LinguisticInsight, { type: TType }>;

export interface Puzzle {
  date: string;
  type: PuzzleType;
  lensId: LensId;
  root?: string;
  lang?: string;
  meaning?: string;

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
    claim: string;
    root?: string;
    lang?: string;
    meaning?: string;
    lensLabel?: string;
  };

  reveal: Reveal;
  steps?: any[];
}

export interface PuzzleState {
  found?: string[];
  assigned?: Record<string, string>;
  answers?: Record<number, string>;
  sequence?: string[];
  idiomFound?: number[];
  stepAnswers?: Record<number, string>;
}

export interface PuzzleProgressEntry {
  state?: PuzzleState;
  revealed?: boolean;
}

export interface ProgressStore {
  _hasPlayed?: boolean;
  discoveredSystems?: string[];
  [dateOrFlag: string]: PuzzleProgressEntry | boolean | string[] | undefined;
}

export interface RootInsightFragment {
  metaphorSplit?: {
    literal: string[];
    abstract: string[];
  };
  entryPaths?: Record<string, "via_french" | "direct_latin" | string>;
  impostors?: string[];
  eras?: Record<string, string>;
  decompositions?: Record<string, string>;
  registers?: Record<string, "formal" | "informal" | "technical" | string>;
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
  hint?: string;
  hintLevel2?: string;
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
