"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFalseFamilyInsight = buildFalseFamilyInsight;
const falseFamilyPool_1 = require("../data/falseFamilyPool");
const pick_1 = require("../utils/pick");
function buildFalseFamilyInsight(r, idx) {
    const d = (0, pick_1.pickAt)(falseFamilyPool_1.FALSE_FAMILY_POOL, r, idx);
    const copy = (0, pick_1.buildSortCopy)(d);
    return {
        id: `false-family-${d.root}`,
        type: "FALSE_FAMILY",
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
