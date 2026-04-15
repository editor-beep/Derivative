"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildRootInsight = buildRootInsight;
const rootPool_1 = require("../data/rootPool");
const pick_1 = require("../utils/pick");
function buildRootInsight(r, idx) {
    const d = (0, pick_1.pickAt)(rootPool_1.ROOT_POOL, r, idx);
    return {
        id: `root-${d.root}`,
        type: "ROOT",
        root: d.root,
        language: d.lang,
        words: d.targets,
        meaning: d.meaning,
        tension: d.tension,
        data: {
            targets: d.targets,
            required: d.required,
            metaphorSplit: d.metaphorSplit,
            entryPaths: d.entryPaths,
            impostors: d.impostors,
            eras: d.eras,
            decompositions: d.decompositions,
            forms: d.forms,
        },
    };
}
