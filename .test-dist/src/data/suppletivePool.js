"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUPPLETIVE_POOL = void 0;
const suppletiveParadigms_1 = require("./suppletiveParadigms");
exports.SUPPLETIVE_POOL = [
    ...suppletiveParadigms_1.SUPPLETIVE_EXTENDED_POOL,
    {
        root: "go / went",
        lang: "Old English + Proto-Germanic",
        meaning: "motion",
        groups: [
            {
                id: "go",
                displayLabel: "Group A", solutionLabel: "go (present)",
                accepts: ["go", "goes", "going"],
                related: ["depart", "leave"],
            },
            {
                id: "went",
                displayLabel: "Group B", solutionLabel: "went (past)",
                accepts: ["went"],
                related: ["wended", "journeyed"],
            },
            {
                id: "gone",
                displayLabel: "Group C", solutionLabel: "gone (participle)",
                accepts: ["gone"],
                related: ["absent", "departed"],
            },
        ],
        pool: ["go", "goes", "going", "went", "gone", "depart", "leave"],
        tension: "English 'went' is borrowed from the verb 'wend' — a rare case of full stem suppletion",
    },
    {
        root: "good / better / best",
        lang: "Old English",
        meaning: "quality",
        groups: [
            {
                id: "pos",
                displayLabel: "Group A", solutionLabel: "positive",
                accepts: ["good", "well"],
                related: ["fine", "nice"],
            },
            {
                id: "comp",
                displayLabel: "Group B", solutionLabel: "comparative",
                accepts: ["better", "worse"],
                related: ["superior", "inferior"],
            },
            {
                id: "sup",
                displayLabel: "Group C", solutionLabel: "superlative",
                accepts: ["best", "worst"],
                related: ["optimal", "minimal"],
            },
        ],
        pool: ["good", "well", "better", "worse", "best", "worst", "fine", "nice"],
        tension: "'Better' and 'best' derive from a different root than 'good' — suppletive comparison",
    },
    {
        root: "be / am / was",
        lang: "Old English",
        meaning: "existence",
        groups: [
            {
                id: "pres",
                displayLabel: "Group A", solutionLabel: "present (be-root)",
                accepts: ["be", "being", "been"],
                related: ["exist", "remain"],
            },
            {
                id: "am_is",
                displayLabel: "Group B", solutionLabel: "present (es-root)",
                accepts: ["am", "is", "are"],
                related: ["seems"],
            },
            {
                id: "past",
                displayLabel: "Group C", solutionLabel: "past (wes-root)",
                accepts: ["was", "were"],
                related: ["existed"],
            },
        ],
        pool: [
            "be",
            "being",
            "been",
            "am",
            "is",
            "are",
            "was",
            "were",
            "exist",
            "remain",
        ],
        tension: "English 'to be' fuses three distinct Proto-Germanic roots into one verb paradigm",
    },
    {
        root: "little / less / least",
        lang: "Old English + mixed comparatives",
        meaning: "false comparative system",
        groups: [
            { id: "size", displayLabel: "Group A", solutionLabel: "size", accepts: ["small", "little"], related: [] },
            {
                id: "quantity",
                displayLabel: "Group B", solutionLabel: "quantity",
                accepts: ["fewer", "less"],
                related: [],
            },
            { id: "intensity", displayLabel: "Group C", solutionLabel: "intensity", accepts: [], related: [] },
        ],
        pool: ["little", "less", "least", "small", "fewer", "minimum"],
        tension: "This puzzle offers clean categories, but the pattern fractures: English comparatives are stitched from multiple historical systems.",
        falseSystem: {
            decoys: ["least", "minimum"],
            breakMessage: "SYSTEM FRACTURE: the category model stops explaining the data.",
            revealTruth: "These words are not one semantic grid. They are overlapping leftovers from different historical strata.",
        },
    },
];
