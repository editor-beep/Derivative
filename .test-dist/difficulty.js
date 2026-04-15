"use strict";
// difficulty.ts
// Maps (PuzzleType, LensId) → DifficultyLevel for display in the puzzle UI and archive.
Object.defineProperty(exports, "__esModule", { value: true });
exports.DIFFICULTY_META = void 0;
exports.getDifficulty = getDifficulty;
// ── Difficulty metadata ────────────────────────────────────────────────────────
exports.DIFFICULTY_META = {
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
const TYPE_BASE = {
    // 0 — accessible with general English knowledge
    ROOT: 0,
    SEMANTIC: 0,
    BORROWED: 0,
    MATCH: 0,
    TOPONYM: 0, // accessible — everyday words with surprising hidden geography
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
const COMPLEX_LENSES = new Set([
    "ETYMOLOGY_FILTER",
    "COMPOUND_HUNT",
    "TEMPORAL_DEPTH",
    "FALSE_TWIN",
    "SOUND_TRACE",
]);
const LEVELS = ["EASY", "MEDIUM", "HARD", "VERY_HARD"];
function getDifficulty(type, lensId) {
    const base = TYPE_BASE[type] ?? 0;
    const bump = COMPLEX_LENSES.has(lensId) ? 1 : 0;
    return LEVELS[Math.min(base + bump, 3)] ?? "VERY_HARD";
}
