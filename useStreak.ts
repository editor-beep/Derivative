// useStreak.ts — React hook for reading streak state from the progress store.
// Runs on mount (via the progress store initialised from localStorage) and
// re-derives after every solve (progress is updated in derivative.tsx).

import { useMemo } from "react";
import { getStreak } from "./streakSystem";
import type { ProgressStore } from "./types";

export interface UseStreakResult {
  currentStreak: number;
  longestStreak: number;
  lastDate: string | null;
}

export const useStreak = (progress: ProgressStore): UseStreakResult => {
  // Recomputes whenever `progress` reference changes (i.e. after every solve/save)
  const streak = useMemo(() => getStreak(progress), [progress]);

  return {
    currentStreak: streak.current,
    longestStreak: streak.longest,
    lastDate: streak.lastDate,
  };
};
