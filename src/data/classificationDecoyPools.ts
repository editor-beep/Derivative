import type { PuzzleType } from "../../types";

export type ClassificationDecoyType = Extract<
  PuzzleType,
  "COLLISION" | "SUPPLETIVE" | "BORROWED" | "FALSE_FAMILY"
>;

export const CLASSIFICATION_DECOY_POOLS: Record<ClassificationDecoyType, string[]> = {
  COLLISION: [
    "skipper",
    "shiver",
    "fractal",
    "fragrant",
    "guaranty",
    "warrener",
  ],
  SUPPLETIVE: [
    "goed",
    "beed",
    "gooder",
    "bestest",
    "wenter",
    "amn't",
  ],
  BORROWED: [
    "algorism",
    "chocolat",
    "avocato",
    "bungalo",
    "dextral",
    "sinistra",
  ],
  FALSE_FAMILY: [
    "earring",
    "earful",
    "sounder",
    "resonate",
    "straits",
    "healthful",
  ],
};
