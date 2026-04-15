"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildBorrowedInsight = buildBorrowedInsight;
const borrowedPool_1 = require("../data/borrowedPool");
const pick_1 = require("../utils/pick");
function buildBorrowedInsight(r, idx) {
    const d = (0, pick_1.pickAt)(borrowedPool_1.BORROWED_POOL, r, idx);
    const copy = (0, pick_1.buildSortCopy)(d);
    const matchPairs = d.matchPairs;
    const isMatch = !!matchPairs?.length;
    if (isMatch) {
        return {
            id: `borrowed-${d.root.slice(0, 14).replace(/\s/g, "-")}`,
            type: "MATCH",
            root: d.root,
            language: d.lang,
            words: d.pool,
            meaning: d.meaning,
            tension: d.tension,
            data: {
                pairs: matchPairs || [],
                pool: d.pool,
                questionPrompt: copy.questionPrompt,
                revealHeadline: copy.revealHeadline,
                revealBody: copy.revealBody,
            },
        };
    }
    return {
        id: `borrowed-${d.root.slice(0, 14).replace(/\s/g, "-")}`,
        type: "BORROWED",
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
