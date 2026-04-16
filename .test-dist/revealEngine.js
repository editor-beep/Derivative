"use strict";
// revealEngine.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReveal = generateReveal;
// ── ROOT reveal variety engine ────────────────────────────────────────────────
// No per-root data changes required. All variety is driven by a deterministic
// hash of the root string so each root always gets the same reveal, but
// different roots feel distinct and unpredictable.
/** djb2-style hash → unsigned 32-bit integer. */
function rootHashCode(root) {
    let h = 0;
    for (let i = 0; i < root.length; i++) {
        h = (Math.imul(31, h) + root.charCodeAt(i)) | 0;
    }
    return h >>> 0;
}
/** Pick an item from an array deterministically using a pre-computed hash. */
function pickByHash(pool, hash) {
    // pool is guaranteed non-empty at all call sites
    return pool[hash % pool.length];
}
const ROOT_HEADLINE_SUFFIXES = [
    "",
    " (stolen)",
    " (they never wanted you to see this)",
    " (the gatekeepers are furious)",
];
function rootPlayerDidPool(root, leadWord, secondWord) {
    return [
        `You weaponized the forbidden link between ${leadWord} and ${secondWord} through the underground ${root}`,
        `You ripped the veil and slammed ${leadWord} into ${secondWord} using the contraband ${root}`,
        `You hijacked the connection between ${leadWord} and ${secondWord} with the smuggled code ${root}`,
        `You exposed the hidden circuit between ${leadWord} and ${secondWord} by activating the rebel ${root}`,
        `You forged an illegal bridge between ${leadWord} and ${secondWord} using the black-market ${root}`,
        `You detonated the link between ${leadWord} and ${secondWord} with the suppressed ${root}`,
        `You cracked the establishment wall between ${leadWord} and ${secondWord} via the outlawed ${root}`,
        `You ran ${leadWord} and ${secondWord} through the rogue pipeline the suits tried to bury`,
    ];
}
const ROOT_MATTERS_BASE = [
    "That matters because the overlords buried this machinery to keep the rest of us linguistically lobotomized",
    "That matters because this is exactly how the empire always meant to keep the control grid hidden from the unwashed",
    "That matters because every time we expose one of these roots we're sawing through the chains the elites bolted onto language itself",
    "That matters because the gatekeepers spent centuries making sure the machinery stayed invisible to anyone who might actually use it against them",
    "That matters because this is the forbidden gear the linguistic priesthood never wanted the rabble to get their dirty hands on",
    "That matters because the system only works when the machinery stays buried and we stay obediently illiterate",
    "That matters because every revealed root is another brick ripped out of the wall they built to own how we think and speak",
];
// Language-multiplier bonus lines: Latin/Greek get "imperial" flavour; Old
// English / Old Norse get "peasant uprising" flavour.
const ROOT_MATTERS_IMPERIAL = [
    "That matters because this is a live wire from the empire's own electrical grid — and you just touched it without insulation",
    "That matters because the Roman and Greek academies hoarded this root for the educated class and made sure nobody else could use it as a weapon",
];
const ROOT_MATTERS_PEASANT = [
    "That matters because this root survived the Conquest in the mouths of people the conquerors tried to make voiceless, and you just kept it alive",
    "That matters because the peasant tongue outlasted every attempt to replace it with the master's Latin and French, and this root is proof",
];
function rootMattersPool(language) {
    if (language.startsWith("Latin") || language.startsWith("Greek")) {
        return [...ROOT_MATTERS_BASE, ...ROOT_MATTERS_IMPERIAL];
    }
    if (language.startsWith("Old")) {
        return [...ROOT_MATTERS_BASE, ...ROOT_MATTERS_PEASANT];
    }
    return ROOT_MATTERS_BASE;
}
// ─────────────────────────────────────────────────────────────────────────────
function lensNote(insight) {
    const notes = {
        METAPHOR_DRIFT: "The body was erased — the physical origin abstracted away until the root carries only the ghost of the violence it once named.",
        ETYMOLOGY_FILTER: "Old French was the empire's phonetic filter — the conquered tongue was ground down before the master's language would accept it.",
        FALSE_TWIN: "Spelling is the conqueror's archaeology, not the word's genealogy — the resemblance was constructed to make you stop asking questions.",
        TEMPORAL_DEPTH: "The same root arrived in colonial waves across centuries — each new era deposited a fresh extraction layer over the one before.",
        COMPOUND_HUNT: "Decompose the word and you read the argument structure the empire tried to make invisible — transparency is an act of resistance.",
        REGISTER_SORT: "Register is class war frozen in vocabulary — which speaker was granted which word, and at what cost to everyone else.",
        SOUND_TRACE: "Sound laws are the only rules the empire could not rewrite — every apparent exception marks a site of resistance or erasure.",
    };
    return insight.lens ? notes[insight.lens.id] : undefined;
}
const TEMPLATE_BY_TYPE = {
    IDIOM: {
        happened: (insight) => insight.type === "IDIOM"
            ? `The phrase was sealed inside ${insight.language || "the imperial tongue"} — the original ${insight.data.origin} speaker erased and its ideology smuggled in as harmless common speech`
            : "This phrase buried a much older wound than its surface lets on",
        playerDid: (insight) => insight.type === "IDIOM"
            ? `You broke the seal on "${insight.data.phrase}" and named the culture it was seized from`
            : "You named the source the phrase was seized from",
        matters: (_insight, context) => `That matters because every ${context.language} idiom is a site of extraction — and now the ideology fossilized inside it is exposed`,
    },
    DECEPTION: {
        happened: (_insight, context) => `A false ${context.system || "pattern"} was engineered — a visual trap so the eye would obey the spelling and never question the ancestry`,
        playerDid: (_insight, context) => `You refused the counterfeit system and separated the real etymological kin from the impostors planted around ${context.root}`,
        matters: (_insight, context) => `That matters because the ${context.language} cage is built from lookalikes — one cracked bar breaks the whole structure of the deception`,
    },
    FALSE_FAMILY: {
        happened: (_insight, context) => `A false lineage was forged around ${context.root} — the words were dressed as kin but the bloodline was fabricated`,
        playerDid: (_insight, context) => `You severed the false bond and recovered the actual genealogy from within the ${context.system || "corrupted set"}`,
        matters: (_insight, context) => `That matters because fabricated families are how ${context.language} absorbs and erases — surface spelling is not ancestry`,
    },
    BORROWED: {
        happened: (_insight, context) => `${context.language} seized this root from another tongue and reprocessed it through the imperial machine`,
        playerDid: (_insight, context) => `You traced how ${context.leadWord} and ${context.secondWord} share the same colonial import route`,
        matters: (_insight, context) => `That matters because the ${context.system || "transit route"} exposes the extraction tax levied when meaning crossed the border`,
    },
    TOPONYM: {
        happened: (_insight, context) => `A place was absorbed and renamed — the original geography overwritten by the language of the conqueror's map`,
        playerDid: (_insight, context) => `You recovered the location buried inside ${context.leadWord} and refused to let the map erase it`,
        matters: (_insight, context) => `That matters because when ${context.language} swallowed the place name, it tried to swallow the history encoded inside it`,
    },
};
function oneClause(text, fallback) {
    if (!text)
        return fallback;
    const collapsed = text.replace(/\s+/g, " ").trim();
    if (!collapsed)
        return fallback;
    const first = collapsed.split(/[.!?]+/)[0]?.trim();
    return (first && first.length > 0 ? first : fallback).replace(/[.!?]+$/, "");
}
function systemLabel(insight) {
    if (insight.type !== "ROOT" && "falseSystem" in insight.data && insight.data.falseSystem?.revealTruth) {
        return insight.data.falseSystem.revealTruth;
    }
    return undefined;
}
function buildBody(insight) {
    const context = {
        root: insight.root || insight.words[0] || "this root",
        language: insight.language || "English",
        system: systemLabel(insight),
        leadWord: insight.words[0] || insight.root || "this word",
        secondWord: insight.words[1] || insight.root || "its pair",
    };
    // ROOT puzzles use the variety engine — hash-seeded, no per-root templates.
    if (insight.type === "ROOT") {
        const hash = rootHashCode(context.root);
        const happened = oneClause(insight.tension, "The cage finally cracked open");
        const playerDidPool = rootPlayerDidPool(context.root, context.leadWord, context.secondWord);
        const mattersPool = rootMattersPool(context.language);
        const playerDid = pickByHash(playerDidPool, hash);
        const matters = pickByHash(mattersPool, hash + 4);
        return `${happened}. ${playerDid}. ${matters}.`;
    }
    const template = TEMPLATE_BY_TYPE[insight.type];
    const happenedSource = "revealBody" in insight.data && typeof insight.data.revealBody === "string"
        ? insight.data.revealBody
        : insight.tension;
    const happened = oneClause(template?.happened(insight, context) ?? happenedSource, "The cage finally cracked open");
    const playerDid = oneClause(template?.playerDid(insight, context) ?? `You connected ${context.leadWord} with ${context.secondWord} through ${context.root}`, "You traced the extraction back to its source");
    const matters = oneClause(template?.matters(insight, context) ?? `That matters because this is how the ${context.language} machinery was always meant to stay hidden`, "That matters because the mechanism is no longer invisible");
    return `${happened}. ${playerDid}. ${matters}.`;
}
function defaultReveal(insight) {
    const root = insight.root || insight.words[0] || "";
    const lang = insight.language || "unknown";
    const sample = insight.words.slice(0, 6);
    let headline;
    if (insight.type === "ROOT") {
        const suffix = pickByHash(ROOT_HEADLINE_SUFFIXES, rootHashCode(root));
        headline = `${root.toUpperCase()} — ${lang}${suffix}`;
    }
    else {
        headline = "revealHeadline" in insight.data && typeof insight.data.revealHeadline === "string"
            ? insight.data.revealHeadline
            : `${root.toUpperCase()} — ${lang}`;
    }
    return {
        headline,
        body: buildBody(insight),
        connections: sample
            .slice(0, 3)
            .map((w, i) => [w, sample[i + 1] ?? root]),
        lensNote: lensNote(insight),
    };
}
function buildGroupReveal(insight, label, offset) {
    const root = insight.root || "";
    const words = insight.words;
    return {
        headline: "revealHeadline" in insight.data && typeof insight.data.revealHeadline === "string"
            ? insight.data.revealHeadline
            : `${label} — ${root}`,
        body: buildBody(insight),
        connections: words
            .slice(0, 4)
            .map((w, i) => [w, words[(i + offset) % words.length]]),
        lensNote: lensNote(insight),
    };
}
function deceptionReveal(insight) { return buildGroupReveal(insight, "DECEPTION", 2); }
function falseFamilyReveal(insight) { return buildGroupReveal(insight, "FALSE FAMILY", 1); }
function idiomReveal(insight) {
    const { phrase, origin, revealHeadline } = insight.data;
    const words = phrase.split(" ");
    return {
        headline: revealHeadline,
        body: buildBody(insight),
        connections: [
            [phrase, origin],
            [words[0], insight.language || "unknown"],
            [insight.tension.slice(0, 40) + "…", "fossilized ideology"],
        ],
        lensNote: lensNote(insight),
    };
}
function toponymReveal(insight) { return buildGroupReveal(insight, "TOPONYM", 2); }
function borrowedReveal(insight) { return buildGroupReveal(insight, "BORROWED", 2); }
function generateReveal(insight) {
    switch (insight.type) {
        case "DECEPTION":
            return deceptionReveal(insight);
        case "FALSE_FAMILY":
            return falseFamilyReveal(insight);
        case "IDIOM":
            return idiomReveal(insight);
        case "BORROWED":
            return borrowedReveal(insight);
        case "TOPONYM":
            return toponymReveal(insight);
        default:
            return defaultReveal(insight);
    }
}
