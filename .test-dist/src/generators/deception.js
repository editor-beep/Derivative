"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDeceptionInsight = buildDeceptionInsight;
const deceptionPool_1 = require("../data/deceptionPool");
const pick_1 = require("../utils/pick");
function buildDeceptionInsight(r, idx) {
    const d = (0, pick_1.pickAt)(deceptionPool_1.DECEPTION_POOL, r, idx);
    const copy = (0, pick_1.buildSortCopy)(d);
    return {
        id: `deception-${d.root}`,
        type: "DECEPTION",
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
