"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPIEInsight = buildPIEInsight;
const piePool_1 = require("../data/piePool");
const pick_1 = require("../utils/pick");
function buildPIEInsight(r, idx) {
    const d = (0, pick_1.pickAt)(piePool_1.PIE_POOL, r, idx);
    const copy = (0, pick_1.buildSortCopy)(d);
    return {
        id: `pie-${d.root.replace(/\s/g, "-")}`,
        type: "PIE",
        root: d.root,
        language: d.lang,
        words: d.pool,
        meaning: d.meaning,
        tension: d.tension,
        data: {
            groups: d.groups,
            pool: d.pool,
            questionPrompt: copy.questionPrompt,
            revealHeadline: copy.revealHeadline,
            revealBody: copy.revealBody,
        },
    };
}
