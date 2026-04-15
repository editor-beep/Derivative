"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSemanticShiftInsight = buildSemanticShiftInsight;
const semanticPool_1 = require("../data/semanticPool");
const pick_1 = require("../utils/pick");
function buildSemanticShiftInsight(r, idx) {
    const d = (0, pick_1.pickAt)(semanticPool_1.SEMANTIC_POOL, r, idx);
    return {
        id: `semantic-${d.root}`,
        type: "SEMANTIC",
        root: d.root,
        language: d.lang,
        words: [d.root],
        meaning: d.meaning,
        tension: d.tension,
        data: { timeline: d.timeline, word: d.root },
    };
}
