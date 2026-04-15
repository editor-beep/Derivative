"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FALSE_FAMILY_POOL = void 0;
exports.FALSE_FAMILY_POOL = [
    {
        root: "ear (two homonyms)",
        lang: "Old English",
        meaning: "accidental collision",
        groups: [
            {
                id: "hear",
                displayLabel: "Group A", solutionLabel: "ear (hearing organ) — OE ēare",
                accepts: ["ear", "eardrum", "earlap", "aural"],
                related: ["listen", "hearing"],
            },
            {
                id: "grain",
                displayLabel: "Group B", solutionLabel: "ear (of grain) — OE ēar",
                accepts: ["earworm", "spike", "kernel"],
                related: ["grain", "corn"],
            },
        ],
        pool: [
            "ear",
            "eardrum",
            "earlap",
            "aural",
            "earworm",
            "spike",
            "kernel",
            "listen",
            "hearing",
            "grain",
            "corn",
        ],
        tension: "Two different Old English words — 'ēare' and 'ēar' — became identical in Modern English",
    },
    {
        root: "sound (three homonyms)",
        lang: "Latin + Old Norse + Old English",
        meaning: "triple collision",
        groups: [
            {
                id: "noise",
                displayLabel: "Group A", solutionLabel: "sound (noise) — Latin sonus",
                accepts: ["sonic", "resound", "resonance", "ultrasound"],
                related: ["noise"],
            },
            {
                id: "water",
                displayLabel: "Group B", solutionLabel: "sound (water channel) — Old Norse sund",
                accepts: ["fathom", "strait", "inlet"],
                related: ["swim"],
            },
            {
                id: "healthy",
                displayLabel: "Group C", solutionLabel: "sound (healthy) — Old English gesund",
                accepts: ["unsound", "soundly", "soundness"],
                related: ["healthy"],
            },
        ],
        pool: [
            "sonic",
            "resound",
            "resonance",
            "ultrasound",
            "fathom",
            "strait",
            "inlet",
            "unsound",
            "soundly",
            "soundness",
            "noise",
            "swim",
            "healthy",
        ],
        tension: "Three unrelated words — from Latin, Old Norse, and Old English — collapsed into 'sound'",
    },
];
