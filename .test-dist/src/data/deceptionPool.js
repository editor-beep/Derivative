"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DECEPTION_POOL = void 0;
const frenchFakeouts_1 = require("./frenchFakeouts");
const folkEtymology_1 = require("./folkEtymology");
exports.DECEPTION_POOL = [
    ...frenchFakeouts_1.FRENCH_VISUAL_FRAUD_POOL,
    ...folkEtymology_1.FOLK_ETYMOLOGY_POOL,
    {
        root: "island",
        lang: "Old English",
        meaning: "false etymology insertion",
        groups: [
            {
                id: "real",
                label: "True OE etymology (iegland)",
                accepts: ["island", "eyot", "ait"],
                related: ["isle"],
            },
            {
                id: "false",
                label: "Spurious Latin insertion (16th c.)",
                accepts: ["aisle", "isle", "islet"],
                related: ["island"],
            },
        ],
        pool: ["island", "eyot", "ait", "aisle", "isle", "islet"],
        tension: "'Island' had no 's' until scholars falsely connected it to Latin 'insula' in the 1500s",
    },
    {
        root: "pea",
        lang: "Middle English",
        meaning: "false back-formation",
        groups: [
            {
                id: "real",
                label: "Correct back-formations",
                accepts: ["pea", "cherry", "sherry", "statistic"],
                related: ["asset"],
            },
            {
                id: "false",
                label: "Original non-plural forms",
                accepts: ["pease", "cherise", "sherris", "statistics"],
                related: ["assets"],
            },
        ],
        pool: [
            "pea",
            "cherry",
            "sherry",
            "statistic",
            "pease",
            "cherise",
            "sherris",
            "statistics",
        ],
        tension: "'Pea', 'cherry', and 'sherry' were all created by mistaking a final -s as a plural marker",
    },
];
