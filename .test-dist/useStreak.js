"use strict";
// useStreak.ts — React hook for reading streak state from the progress store.
// Runs on mount (via the progress store initialised from localStorage) and
// re-derives after every solve (progress is updated in derivative.tsx).
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStreak = void 0;
const react_1 = require("react");
const streakSystem_1 = require("./streakSystem");
const useStreak = (progress) => {
    // Recomputes whenever `progress` reference changes (i.e. after every solve/save)
    const streak = (0, react_1.useMemo)(() => (0, streakSystem_1.getStreak)(progress), [progress]);
    return {
        currentStreak: streak.current,
        longestStreak: streak.longest,
        lastDate: streak.lastDate,
    };
};
exports.useStreak = useStreak;
