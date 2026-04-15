"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildToponymInsight = buildToponymInsight;
const toponymPool_1 = require("../data/toponymPool");
const pick_1 = require("../utils/pick");
function buildToponymInsight(r, idx) {
    const d = (0, pick_1.pickAt)(toponymPool_1.TOPONYM_POOL, r, idx);
    const copy = (0, pick_1.buildSortCopy)(d);
    return {
        id: `toponym-${d.root.slice(0, 14).replace(/\s/g, "-")}`,
        type: "TOPONYM",
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
