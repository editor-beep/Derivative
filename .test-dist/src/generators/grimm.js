"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildGrimmInsight = buildGrimmInsight;
const grimmPool_1 = require("../data/grimmPool");
const pick_1 = require("../utils/pick");
function buildGrimmInsight(r, idx) {
    const d = (0, pick_1.pickAt)(grimmPool_1.GRIMM_POOL, r, idx);
    return {
        id: `grimm-${d.root.replace(/\s/g, "-")}`,
        type: "GRIMM",
        root: d.root,
        language: d.lang,
        words: d.pairs.map((p) => p.target),
        meaning: d.meaning,
        tension: d.tension,
        data: {
            pairs: d.pairs,
        },
    };
}
