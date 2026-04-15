import type { PuzzleType } from "../types";

export const HELP_MODAL_BY_TYPE: Record<PuzzleType, { title: string; points: string[] }> = {
  ROOT: {
    title: "Root Hunt Mechanics",
    points: [
      "Enter words connected to the displayed root.",
      "Required words advance puzzle completion; bonus words still score as discoveries.",
      "Use the graph to spot lexical neighbors and semantic branches.",
    ],
  },
  SEMANTIC: {
    title: "Semantic Shift Mechanics",
    points: [
      "Follow the timeline and fill each blank era with the missing meaning.",
      "Answers are checked by keyword overlap, so short close paraphrases count.",
      "Complete every blank stage to finish the puzzle.",
    ],
  },
  SUPPLETIVE: {
    title: "Sound Shift Mechanics",
    points: [
      "Classify each word into the best-fit system group.",
      "After a few classifications, you'll guess the larger historical force at work.",
      "Solve by correctly sorting the classify words.",
    ],
  },
  GRIMM: {
    title: "Sound Shift Mechanics",
    points: [
      "Convert each source form into the expected target form.",
      "Each correct pair locks in permanently.",
      "Find all target forms to complete the set.",
    ],
  },
  COLLISION: {
    title: "Sound Shift Mechanics",
    points: [
      "Classify each word by which historical pathway produced it.",
      "Expect similar-looking words to split into different origins.",
      "Solve by correctly sorting the classify words.",
    ],
  },
  PIE: {
    title: "Sound Shift Mechanics",
    points: [
      "Sort reflexes by inherited sound-change pattern.",
      "Watch for regular correspondences rather than modern spelling.",
      "Solve by correctly sorting the classify words.",
    ],
  },
  DECEPTION: {
    title: "Sound Shift Mechanics",
    points: [
      "Separate true historical outcomes from misleading look-alikes.",
      "The system-guess checkpoints test pattern recognition, not memorization.",
      "Solve by correctly sorting the classify words.",
    ],
  },
  FALSE_FAMILY: {
    title: "Sound Shift Mechanics",
    points: [
      "Group words by real lineage, not superficial resemblance.",
      "Some terms feel related but diverge under sound laws.",
      "Solve by correctly sorting the classify words.",
    ],
  },
  PHANTOM_ROOT: {
    title: "Sound Shift Mechanics",
    points: [
      "Distinguish genuine root descendants from phantom reconstructions.",
      "Use category labels as clues to historical plausibility.",
      "Solve by correctly sorting the classify words.",
    ],
  },
  IDIOM: {
    title: "Idiom Reconstruction Mechanics",
    points: [
      "Rebuild the phrase by guessing individual words or the full expression.",
      "Correct words reveal their exact slots and repeated words can unlock multiple positions.",
      "Complete when every word in the expression is exposed.",
    ],
  },
  BORROWED: {
    title: "Borrowing Mechanics",
    points: [
      "Classify each word by borrowing pathway or source grouping.",
      "Checkpoint prompts ask you to infer the broader system driving the set.",
      "Solve by correctly sorting the classify words.",
    ],
  },
  TOPONYM: {
    title: "Borrowing Mechanics",
    points: [
      "Sort place-based words by historical transmission channel.",
      "Expect geography and contact history to matter more than spelling.",
      "Solve by correctly sorting the classify words.",
    ],
  },
  MATCH: {
    title: "Match Mechanics",
    points: [
      "Match each source term to its correct gloss.",
      "Every row is independent; adjust mismatches until all pairs align.",
      "Complete by making every source-target assignment correct.",
    ],
  },
};
