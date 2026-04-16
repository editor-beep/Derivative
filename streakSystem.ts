// streakSystem.ts — daily-puzzle streak tracking

import { DAY_IN_MS } from "./src/dateUtils";
import type { ProgressStore, StreakData } from "./types";

const STREAK_KEY = "_streak" as const;

export const STREAK_MILESTONES = [3, 7, 14, 21, 30, 60, 100] as const;
export type StreakMilestone = (typeof STREAK_MILESTONES)[number];

// Milestone-specific celebration messages
export const STREAK_MILESTONE_MESSAGES: Record<number, string> = {
  3:   "3-day streak 🔥 Keep the imperial veil lifted!",
  7:   "7-day streak 🔥 A week of linguistic resistance!",
  14:  "14-day streak 🔥 Two weeks dismantling the Lingua Imperii!",
  21:  "21-day streak 🔥 Three weeks of etymological insurgency!",
  30:  "30-day streak 🔥 A month unmasking the empire's tongue!",
  60:  "60-day streak 🔥 Two months of relentless linguistic defiance!",
  100: "100-day streak 🔥 A hundred days. The empire never owned your tongue.",
};

// Encouragement pool for non-milestone completions
const ENCOURAGEMENT_POOL = [
  "Resistance Building! Keep the veil lifted.",
  "Another crack in the Lingua Imperii.",
  "Etymology as insurgency. Well done.",
  "The empire's lexicon yields another secret.",
  "Language isn't neutral. Neither is your streak.",
  "Keep tracing the roots of power.",
  "The archive grows. The empire shrinks.",
  "Every root uncovered is a chain broken.",
];

export const getEncouragementMessage = (streak: number): string => {
  if (streak <= 0) return ENCOURAGEMENT_POOL[0] ?? "Resistance Building!";
  return ENCOURAGEMENT_POOL[streak % ENCOURAGEMENT_POOL.length] ?? ENCOURAGEMENT_POOL[0] ?? "Resistance Building!";
};

export const isMilestone = (n: number): boolean =>
  (STREAK_MILESTONES as readonly number[]).includes(n);

// Read the streak safely from a ProgressStore (handles missing/malformed data)
export const getStreak = (store: ProgressStore): StreakData => {
  const raw = store[STREAK_KEY];
  if (
    raw != null &&
    typeof raw === "object" &&
    !Array.isArray(raw) &&
    "current" in raw
  ) {
    const s = raw as Partial<StreakData>;
    return {
      current: typeof s.current === "number" ? s.current : 0,
      longest: typeof s.longest === "number" ? s.longest : 0,
      lastDate: typeof s.lastDate === "string" ? s.lastDate : null,
    };
  }
  return { current: 0, longest: 0, lastDate: null };
};

// UTC-safe: return the date string for the day before dateStr
const getPreviousDay = (dateStr: string): string => {
  const parts = dateStr.split("-").map(Number);
  const y = parts[0] ?? 2000;
  const m = parts[1] ?? 1;
  const d = parts[2] ?? 1;
  const ts = Date.UTC(y, m - 1, d) - DAY_IN_MS;
  const prev = new Date(ts);
  const py = prev.getUTCFullYear();
  const pm = String(prev.getUTCMonth() + 1).padStart(2, "0");
  const pd = String(prev.getUTCDate()).padStart(2, "0");
  return `${py}-${pm}-${pd}`;
};

export interface UpdateStreakResult {
  nextStore: ProgressStore;
  newCurrent: number;
  milestoneReached: number | null;
  /** false when today was already counted (idempotent) */
  changed: boolean;
}

/**
 * Attempt to advance the streak for todayStr.
 * - Already played today  → no-op (idempotent)
 * - Yesterday was last day → +1 (consecutive)
 * - Null lastDate          → first-time user, streak = 1
 * - Gap > 1 day (or timezone travel backwards) → reset to 1
 */
export const updateStreak = (
  store: ProgressStore,
  todayStr: string
): UpdateStreakResult => {
  const current = getStreak(store);

  if (current.lastDate === todayStr) {
    return {
      nextStore: store,
      newCurrent: current.current,
      milestoneReached: null,
      changed: false,
    };
  }

  const yesterday = getPreviousDay(todayStr);
  let newCurrent: number;

  if (current.lastDate === null) {
    // First-time user
    newCurrent = 1;
  } else if (current.lastDate === yesterday) {
    // Consecutive day — extend streak
    newCurrent = current.current + 1;
  } else {
    // Missed one or more days (or timezone travel) — reset
    newCurrent = 1;
  }

  const newLongest = Math.max(current.longest, newCurrent);
  const newStreakData: StreakData = {
    current: newCurrent,
    longest: newLongest,
    lastDate: todayStr,
  };
  const milestoneReached = isMilestone(newCurrent) ? newCurrent : null;

  return {
    nextStore: { ...store, [STREAK_KEY]: newStreakData },
    newCurrent,
    milestoneReached,
    changed: true,
  };
};
