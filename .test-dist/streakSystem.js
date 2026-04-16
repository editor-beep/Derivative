"use strict";
// streakSystem.ts — daily-puzzle streak tracking
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStreak = exports.getStreak = exports.isMilestone = exports.getEncouragementMessage = exports.STREAK_MILESTONE_MESSAGES = exports.STREAK_MILESTONES = void 0;
const dateUtils_1 = require("./src/dateUtils");
const STREAK_KEY = "_streak";
exports.STREAK_MILESTONES = [3, 7, 14, 21, 30, 60, 100];
// Milestone-specific celebration messages
exports.STREAK_MILESTONE_MESSAGES = {
    3: "3-day streak 🔥 Keep the imperial veil lifted!",
    7: "7-day streak 🔥 A week of linguistic resistance!",
    14: "14-day streak 🔥 Two weeks dismantling the Lingua Imperii!",
    21: "21-day streak 🔥 Three weeks of etymological insurgency!",
    30: "30-day streak 🔥 A month unmasking the empire's tongue!",
    60: "60-day streak 🔥 Two months of relentless linguistic defiance!",
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
const getEncouragementMessage = (streak) => {
    if (streak <= 0)
        return ENCOURAGEMENT_POOL[0] ?? "Resistance Building!";
    return ENCOURAGEMENT_POOL[streak % ENCOURAGEMENT_POOL.length] ?? ENCOURAGEMENT_POOL[0] ?? "Resistance Building!";
};
exports.getEncouragementMessage = getEncouragementMessage;
const isMilestone = (n) => exports.STREAK_MILESTONES.includes(n);
exports.isMilestone = isMilestone;
// Read the streak safely from a ProgressStore (handles missing/malformed data)
const getStreak = (store) => {
    const raw = store[STREAK_KEY];
    if (raw != null &&
        typeof raw === "object" &&
        !Array.isArray(raw) &&
        "current" in raw) {
        const s = raw;
        return {
            current: typeof s.current === "number" ? s.current : 0,
            longest: typeof s.longest === "number" ? s.longest : 0,
            lastDate: typeof s.lastDate === "string" ? s.lastDate : null,
        };
    }
    return { current: 0, longest: 0, lastDate: null };
};
exports.getStreak = getStreak;
// UTC-safe: return the date string for the day before dateStr
const getPreviousDay = (dateStr) => {
    const parts = dateStr.split("-").map(Number);
    const y = parts[0] ?? 2000;
    const m = parts[1] ?? 1;
    const d = parts[2] ?? 1;
    const ts = Date.UTC(y, m - 1, d) - dateUtils_1.DAY_IN_MS;
    const prev = new Date(ts);
    const py = prev.getUTCFullYear();
    const pm = String(prev.getUTCMonth() + 1).padStart(2, "0");
    const pd = String(prev.getUTCDate()).padStart(2, "0");
    return `${py}-${pm}-${pd}`;
};
/**
 * Attempt to advance the streak for todayStr.
 * - Already played today  → no-op (idempotent)
 * - Yesterday was last day → +1 (consecutive)
 * - Null lastDate          → first-time user, streak = 1
 * - Gap > 1 day (or timezone travel backwards) → reset to 1
 */
const updateStreak = (store, todayStr) => {
    const current = (0, exports.getStreak)(store);
    if (current.lastDate === todayStr) {
        return {
            nextStore: store,
            newCurrent: current.current,
            milestoneReached: null,
            changed: false,
        };
    }
    const yesterday = getPreviousDay(todayStr);
    let newCurrent;
    if (current.lastDate === null) {
        // First-time user
        newCurrent = 1;
    }
    else if (current.lastDate === yesterday) {
        // Consecutive day — extend streak
        newCurrent = current.current + 1;
    }
    else {
        // Missed one or more days (or timezone travel) — reset
        newCurrent = 1;
    }
    const newLongest = Math.max(current.longest, newCurrent);
    const newStreakData = {
        current: newCurrent,
        longest: newLongest,
        lastDate: todayStr,
    };
    const milestoneReached = (0, exports.isMilestone)(newCurrent) ? newCurrent : null;
    return {
        nextStore: { ...store, [STREAK_KEY]: newStreakData },
        newCurrent,
        milestoneReached,
        changed: true,
    };
};
exports.updateStreak = updateStreak;
