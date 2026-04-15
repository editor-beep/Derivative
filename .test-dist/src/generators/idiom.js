"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildIdiomInsight = buildIdiomInsight;
const idiomPool_1 = require("../data/idiomPool");
const pick_1 = require("../utils/pick");
function buildIdiomInsight(r, idx) {
    const d = (0, pick_1.pickAt)(idiomPool_1.IDIOM_POOL, r, idx);
    const shuffled = [...d.fragments].sort(() => r() - 0.5);
    return {
        id: `idiom-${d.phrase.slice(0, 12).replace(/\s/g, "-")}`,
        type: "IDIOM",
        root: d.phrase,
        language: d.lang,
        words: d.fragments,
        meaning: d.origin,
        tension: d.tension,
        data: {
            phrase: d.phrase,
            fragments: shuffled,
            origin: d.origin,
            questionPrompt: d.questionPrompt,
            revealHeadline: d.revealHeadline,
            revealBody: d.revealBody,
        },
    };
}
