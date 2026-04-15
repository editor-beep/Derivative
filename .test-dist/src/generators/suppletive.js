"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSuppletiveInsight = buildSuppletiveInsight;
const suppletivePool_1 = require("../data/suppletivePool");
const pick_1 = require("../utils/pick");
function buildSuppletiveInsight(r, idx) {
    const d = (0, pick_1.pickAt)(suppletivePool_1.SUPPLETIVE_POOL, r, idx);
    const copy = (0, pick_1.buildSortCopy)(d);
    return {
        id: `suppletive-${d.root}`,
        type: "SUPPLETIVE",
        root: d.root,
        language: d.lang,
        words: d.pool,
        meaning: d.meaning,
        tension: d.tension,
        data: {
            groups: d.groups,
            pool: d.pool,
            falseSystem: d.falseSystem,
            questionPrompt: copy.questionPrompt,
            revealHeadline: copy.revealHeadline,
            revealBody: copy.revealBody,
        },
    };
}
