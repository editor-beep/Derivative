// difficulty.ts
// Maps (PuzzleType, LensId) → DifficultyLevel for display in the puzzle UI and archive.

import type { PuzzleType, LensId } from "./types";

export type DifficultyLevel = "EASY" | "MEDIUM" | "HARD" | "VERY_HARD";

// ── Difficulty metadata ────────────────────────────────────────────────────────

export const DIFFICULTY_META: Record<
  DifficultyLevel,
  { label: string; sublabel: string; color: string }
> = {
  EASY: {
    label: "Word Curious",
    sublabel: "easy",
    color: "#5bcf94",
  },
  MEDIUM: {
    label: "Vocabulary Vanguard",
    sublabel: "medium",
    color: "#e8b84b",
  },
  HARD: {
    label: "Etymologist",
    sublabel: "hard",
    color: "#d4732a",
  },
  VERY_HARD: {
    label: "Doctor of English History",
    sublabel: "very hard",
    color: "#8f73db",
  },
};

// ── Classification logic ───────────────────────────────────────────────────────

// Inherent cognitive demand of each puzzle type (0 = easy, 2 = hard)
const TYPE_BASE: Record<PuzzleType, 0 | 1 | 2> = {
  // 0 — accessible with general English knowledge
  ROOT: 0,
  SEMANTIC: 0,
  BORROWED: 0,
  MATCH: 0,
  TOPONYM: 0,   // accessible — everyday words with surprising hidden geography
  COLLISION: 0,
  // 1 — requires some grammatical / vocabulary depth
  SUPPLETIVE: 1,
  IDIOM: 1,
  FALSE_FAMILY: 1,
  // 2 — demands specialist linguistic knowledge
  PIE: 2,
  GRIMM: 2,
  DECEPTION: 2,
  PHANTOM_ROOT: 2,
};

// Lenses that add one extra difficulty level
const COMPLEX_LENSES = new Set<LensId>([
  "ETYMOLOGY_FILTER",
  "COMPOUND_HUNT",
  "TEMPORAL_DEPTH",
  "FALSE_TWIN",
  "SOUND_TRACE",
]);

const LEVELS: DifficultyLevel[] = ["EASY", "MEDIUM", "HARD", "VERY_HARD"];

export function getDifficulty(type: PuzzleType, lensId: LensId): DifficultyLevel {
  const base = TYPE_BASE[type] ?? 0;
  const bump = COMPLEX_LENSES.has(lensId) ? 1 : 0;
  return LEVELS[Math.min(base + bump, 3)] ?? "VERY_HARD";
}

// ── Day-of-week difficulty schedule ───────────────────────────────────────────
// Maps UTC day index (0 = Sunday … 6 = Saturday) to the allowed difficulty
// levels for that day.  The schedule is designed to give newcomers an easy
// entry point early in the week and build toward a challenging Sunday capstone.
//
//   Mon / Tue   → Easy
//   Wed         → Easy  or Medium
//   Thu         → Medium
//   Fri / Sat   → Medium or Hard
//   Sun         → Very Hard (always)

export const DIFFICULTY_SCHEDULE: Readonly<Record<number, readonly DifficultyLevel[]>> = {
  0: ["VERY_HARD"],          // Sunday
  1: ["EASY"],               // Monday
  2: ["EASY"],               // Tuesday
  3: ["EASY", "MEDIUM"],     // Wednesday
  4: ["MEDIUM"],             // Thursday
  5: ["MEDIUM", "HARD"],     // Friday
  6: ["MEDIUM", "HARD"],     // Saturday
};

/**
 * Returns the difficulty levels that are scheduled for the given UTC date.
 * The date string must be in "YYYY-MM-DD" format.
 * Throws if the date string is not a valid YYYY-MM-DD date.
 */
export function getDayOfWeekDifficulty(date: string): readonly DifficultyLevel[] {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!match) {
    throw new Error(`getDayOfWeekDifficulty: invalid date format "${date}" (expected YYYY-MM-DD)`);
  }
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const utcDay = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  const levels = DIFFICULTY_SCHEDULE[utcDay];
  if (!levels) {
    throw new Error(`getDayOfWeekDifficulty: no schedule entry for UTC day ${utcDay}`);
  }
  return levels;
}
