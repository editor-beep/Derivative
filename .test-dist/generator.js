"use strict";
// generator.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDailyPuzzle = generateDailyPuzzle;
const seed_1 = require("./seed");
const insightEngine_1 = require("./insightEngine");
const puzzleSynthesizer_1 = require("./puzzleSynthesizer");
const revealEngine_1 = require("./revealEngine");
const playablePuzzleBuilder_1 = require("./playablePuzzleBuilder");
const puzzleManifest_1 = require("./src/data/puzzleManifest");
function generateDailyPuzzle(date) {
    const manifestEntry = (0, puzzleManifest_1.getPuzzleManifestEntry)(date);
    if (!manifestEntry) {
        throw new Error(`No manifest puzzle scheduled for ${date}`);
    }
    const seed = (0, seed_1.hashString)(`manifest:${manifestEntry.id}:${date}`);
    const insight = (0, insightEngine_1.generateInsight)(seed, {
        builderIdx: manifestEntry.builderIdx,
        entryIdx: manifestEntry.entryIdx,
        lensIdx: manifestEntry.lensIdx,
    });
    const puzzle = (0, puzzleSynthesizer_1.synthesizePuzzle)(insight, date);
    const playable = (0, playablePuzzleBuilder_1.buildPlayablePuzzle)(puzzle);
    const reveal = (0, revealEngine_1.generateReveal)(insight);
    return { ...puzzle, steps: playable.steps, reveal };
}
