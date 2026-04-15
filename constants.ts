// constants.ts

import type { PuzzleType } from "./types";

export const STORAGE_KEY = "derivative_v4";
export const SPLASH_IMAGE =
  "https://github.com/user-attachments/assets/e6f5403b-5958-4d0e-8be4-439beb2b7a79";

export const TYPE_LABELS: Record<PuzzleType, string> = {
  ROOT: "ROOT",
  SUPPLETIVE: "SUPPLETIVE PAIR",
  GRIMM: "SOUND SHIFT",
  SEMANTIC: "SEMANTIC DRIFT",
  COLLISION: "COLLISION",
  PIE: "DEEP ROOT",
  DECEPTION: "WEIRD DESCENDANT TAGS",
  FALSE_FAMILY: "FALSE FAMILY",
  PHANTOM_ROOT: "INFERRED ROOT",
  IDIOM: "IDIOM SYSTEM",
  BORROWED: "BORROWED LAYER",
  TOPONYM: "PLACE NAMES",
  MATCH: "WORD ↔ GLOSS",
};

export const TYPE_SUBLABELS: Record<PuzzleType, string> = {
  ROOT: "morphological family",
  SUPPLETIVE: "broken paradigm",
  GRIMM: "phonetic machinery",
  SEMANTIC: "meaning drift",
  COLLISION: "language contact",
  PIE: "proto-layer",
  DECEPTION: "french fakeout descendants",
  FALSE_FAMILY: "etymological imposture",
  PHANTOM_ROOT: "reverse inference",
  IDIOM: "fossilized ideology",
  BORROWED: "colonial lexicon",
  TOPONYM: "geographic extraction",
  MATCH: "concept matching",
};

export const COLORS = {
  bg: "#070605",
  bg2: "#0a0907",
  surface: "#0d0b08",
  surface2: "#141208",
  surface3: "#1a160f",

  gold: "#e8b84b",
  goldDim: "#c8922a",
  goldDark: "#7a5618",
  goldLine: "rgba(232,184,75,0.28)",
  goldGlow: "rgba(232,184,75,0.18)",

  cyan: "#4ecfcf",
  cyanDim: "#2a8f8f",
  cyanGlow: "rgba(78,207,207,0.16)",
  cyanLine: "rgba(78,207,207,0.32)",

  red: "#8b3a3a",
  redGlow: "rgba(139,58,58,0.22)",

  textPrimary: "#e8d8b0",
  textSecondary: "#9a8868",
  textMuted: "#5a4a38",
  textFaint: "#3a2e1c",

  blackLine: "#1e1808",
};

export const TYPE_COLORS: Record<PuzzleType, string> = {
  ROOT: COLORS.goldDim,
  SUPPLETIVE: "#b87820",
  GRIMM: COLORS.cyan,
  SEMANTIC: "#d4732a",
  COLLISION: "#8ab8b8",
  PIE: COLORS.gold,
  DECEPTION: "#d66a37",
  FALSE_FAMILY: "#8f73db",
  PHANTOM_ROOT: "#5bcf94",
  IDIOM: "#c46eb0",
  BORROWED: "#7ab87a",
  TOPONYM: "#4db6ac",
  MATCH: "#63b3ed",
};
