"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCollisionInsight = buildCollisionInsight;
const collisionPool_1 = require("../data/collisionPool");
const pick_1 = require("../utils/pick");
function buildCollisionInsight(r, idx) {
    const d = (0, pick_1.pickAt)(collisionPool_1.COLLISION_POOL, r, idx);
    const copy = (0, pick_1.buildSortCopy)(d);
    return {
        id: `collision-${d.root}`,
        type: "COLLISION",
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
