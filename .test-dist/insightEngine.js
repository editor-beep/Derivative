"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POOL_FLAT_TABLE = exports.PUZZLE_SOURCES = exports.applyLens = exports.LENSES = void 0;
exports.generateInsight = generateInsight;
const seed_1 = require("./seed");
const root_1 = require("./src/generators/root");
const suppletive_1 = require("./src/generators/suppletive");
const semantic_1 = require("./src/generators/semantic");
const collision_1 = require("./src/generators/collision");
const deception_1 = require("./src/generators/deception");
const falseFamily_1 = require("./src/generators/falseFamily");
const idiom_1 = require("./src/generators/idiom");
const borrowed_1 = require("./src/generators/borrowed");
const toponym_1 = require("./src/generators/toponym");
const grimm_1 = require("./src/generators/grimm");
const pie_1 = require("./src/generators/pie");
const rootPool_1 = require("./src/data/rootPool");
const suppletivePool_1 = require("./src/data/suppletivePool");
const semanticPool_1 = require("./src/data/semanticPool");
const collisionPool_1 = require("./src/data/collisionPool");
const deceptionPool_1 = require("./src/data/deceptionPool");
const falseFamilyPool_1 = require("./src/data/falseFamilyPool");
const idiomPool_1 = require("./src/data/idiomPool");
const borrowedPool_1 = require("./src/data/borrowedPool");
const toponymPool_1 = require("./src/data/toponymPool");
const grimmPool_1 = require("./src/data/grimmPool");
const piePool_1 = require("./src/data/piePool");
const lenses_1 = require("./src/lenses");
Object.defineProperty(exports, "LENSES", { enumerable: true, get: function () { return lenses_1.LENSES; } });
Object.defineProperty(exports, "applyLens", { enumerable: true, get: function () { return lenses_1.applyLens; } });
exports.PUZZLE_SOURCES = [
    {
        builderType: "ROOT",
        builder: root_1.buildRootInsight,
        entryCount: rootPool_1.ROOT_POOL.length,
        lensRule: (lens) => lens.applicableTo.includes("ROOT"),
    },
    {
        builderType: "SUPPLETIVE",
        builder: suppletive_1.buildSuppletiveInsight,
        entryCount: suppletivePool_1.SUPPLETIVE_POOL.length,
        lensRule: (lens) => lens.applicableTo.includes("SUPPLETIVE"),
    },
    {
        builderType: "SEMANTIC",
        builder: semantic_1.buildSemanticShiftInsight,
        entryCount: semanticPool_1.SEMANTIC_POOL.length,
        lensRule: (lens) => lens.applicableTo.includes("SEMANTIC"),
    },
    {
        builderType: "COLLISION",
        builder: collision_1.buildCollisionInsight,
        entryCount: collisionPool_1.COLLISION_POOL.length,
        lensRule: (lens) => lens.applicableTo.includes("COLLISION"),
    },
    {
        builderType: "DECEPTION",
        builder: deception_1.buildDeceptionInsight,
        entryCount: deceptionPool_1.DECEPTION_POOL.length,
        lensRule: (lens) => lens.applicableTo.includes("DECEPTION"),
    },
    {
        builderType: "FALSE_FAMILY",
        builder: falseFamily_1.buildFalseFamilyInsight,
        entryCount: falseFamilyPool_1.FALSE_FAMILY_POOL.length,
        lensRule: (lens) => lens.applicableTo.includes("FALSE_FAMILY"),
    },
    {
        builderType: "IDIOM",
        builder: idiom_1.buildIdiomInsight,
        entryCount: idiomPool_1.IDIOM_POOL.length,
        lensRule: (lens) => lens.applicableTo.includes("IDIOM"),
    },
    {
        builderType: "BORROWED",
        builder: borrowed_1.buildBorrowedInsight,
        entryCount: borrowedPool_1.BORROWED_POOL.length,
        lensRule: (lens) => lens.applicableTo.includes("BORROWED") || lens.applicableTo.includes("MATCH"),
    },
    {
        builderType: "TOPONYM",
        builder: toponym_1.buildToponymInsight,
        entryCount: toponymPool_1.TOPONYM_POOL.length,
        lensRule: (lens) => lens.applicableTo.includes("TOPONYM"),
    },
    {
        builderType: "GRIMM",
        builder: grimm_1.buildGrimmInsight,
        entryCount: grimmPool_1.GRIMM_POOL.length,
        lensRule: (lens) => lens.applicableTo.includes("GRIMM"),
    },
    {
        builderType: "PIE",
        builder: pie_1.buildPIEInsight,
        entryCount: piePool_1.PIE_POOL.length,
        lensRule: (lens) => lens.applicableTo.includes("PIE"),
    },
];
for (const source of exports.PUZZLE_SOURCES) {
    if (source.entryCount === 0) {
        throw new Error(`Puzzle source "${source.builderType}" has zero entries.`);
    }
}
exports.POOL_FLAT_TABLE = (() => {
    const result = [];
    for (let b = 0; b < exports.PUZZLE_SOURCES.length; b++) {
        const source = exports.PUZZLE_SOURCES[b];
        if (!source)
            continue;
        for (let e = 0; e < source.entryCount; e++) {
            for (let l = 0; l < lenses_1.LENSES.length; l++) {
                const lens = lenses_1.LENSES[l];
                if (!lens)
                    continue;
                if (source.lensRule(lens)) {
                    result.push({ builderIdx: b, entryIdx: e, lensIdx: l });
                }
            }
        }
    }
    return result;
})();
function generateInsight(seed, override) {
    if (override) {
        const r = (0, seed_1.mulberry32)((seed ^ 0xfacefeed) >>> 0);
        const source = exports.PUZZLE_SOURCES[override.builderIdx];
        const lens = lenses_1.LENSES[override.lensIdx];
        if (!source || !lens) {
            throw new Error("Invalid override indices for puzzle generation.");
        }
        const insight = source.builder(r, override.entryIdx);
        return (0, lenses_1.applyLens)(insight, lens, r);
    }
    const r = (0, seed_1.mulberry32)(seed);
    const chosen = exports.PUZZLE_SOURCES[Math.floor(r() * exports.PUZZLE_SOURCES.length)];
    if (!chosen) {
        throw new Error("No puzzle sources configured.");
    }
    const insight = chosen.builder(r);
    const rLens = (0, seed_1.mulberry32)((seed ^ 0xd1ce5eed) >>> 0);
    const lens = lenses_1.LENSES[Math.floor(rLens() * lenses_1.LENSES.length)];
    if (!lens) {
        throw new Error("No lenses configured.");
    }
    return (0, lenses_1.applyLens)(insight, lens, r);
}
