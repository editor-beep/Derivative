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
    ROOT: {
        event: (insight) => oneClause(insight.tension, "The root mechanism finally surfaced"),
        playerAction: (_insight, context) => `You connected ${context.leadWord} to ${context.secondWord} through ${context.root}`,
        systemExplanation: (_insight, context) => `Root systems stay productive because one core form keeps generating new words across domains`,
        politicalClaim: (_insight, context) => `Control over standard vocabulary is control over power, and root literacy interrupts that gatekeeping`,
    },
    SEMANTIC: {
        event: (_insight, context) => `Meaning shifted over time and the word no longer matches its earliest use`,
        playerAction: (_insight, context) => `You followed the path from older senses to the current one`,
        systemExplanation: (_insight, context) => `Semantic drift is structured adaptation: words are reassigned as social needs and institutions change`,
        politicalClaim: (_insight, context) => `Under capitalism, meaning is repeatedly repurposed for new functions, so dominant institutions decide which sense becomes normal`,
    },
    SUPPLETIVE: {
        event: (_insight, context) => `The paradigm combines forms that do not come from one root lineage`,
        playerAction: (_insight, context) => `You treated the mixed forms as one operating system and mapped the breaks`,
        systemExplanation: (_insight, context) => `Suppletion appears when high-frequency grammar preserves older fragments instead of regularizing them`,
        politicalClaim: (_insight, context) => `That patchwork reflects uneven development: continuity is enforced after disruption by institutions that need a stable standard`,
    },
    GRIMM: {
        event: (_insight, context) => `The consonants shifted in a regular pattern across related words`,
        playerAction: (_insight, context) => `You tracked the sound correspondences instead of guessing by spelling`,
        systemExplanation: (_insight, context) => `Sound change is systematic, so each pair records the same mechanism at work in different vocabulary`,
        politicalClaim: (_insight, context) => `Structure drives outcomes here too: language change follows patterned constraints regardless of individual intention or prestige claims`,
    },
    COLLISION: {
        event: (_insight, context) => `Two language systems collided and stayed side by side instead of merging cleanly`,
        playerAction: (_insight, context) => `You separated which forms came from each source layer`,
        systemExplanation: (_insight, context) => `Contact systems retain duplicates because conquest and coexistence distribute words by domain and status`,
        politicalClaim: (_insight, context) => `This is how conquest persists: dominant forms become standard while other forms are kept as marginal residue`,
    },
    PIE: {
        event: (_insight, context) => `The forms point back to a reconstructed ancestor rather than a directly recorded word`,
        playerAction: (_insight, context) => `You matched descendants by inherited pattern instead of surface similarity`,
        systemExplanation: (_insight, context) => `Comparative reconstruction works because regular correspondences preserve system history across branches`,
        politicalClaim: (_insight, context) => `Who gets treated as the linguistic center is a power question: prestige traditions decide which ancestry is taught as foundational`,
    },
    PHANTOM_ROOT: {
        event: (_insight, context) => `A convincing root was projected onto words that do not share one origin`,
        playerAction: (_insight, context) => `You stripped away the projection and kept only defensible relationships`,
        systemExplanation: (_insight, context) => `Phantom roots spread when repeated teaching turns a mnemonic shortcut into supposed history`,
        politicalClaim: (_insight, context) => `Authority can manufacture etymology: once institutions repeat a story, it gains prestige even when evidence is weak`,
    },
    MATCH: {
        event: (_insight, context) => `Pairs aligned through mechanism, not through coincidence`,
        playerAction: (_insight, context) => `You matched each item by the underlying relation it encoded`,
        systemExplanation: (_insight, context) => `Matching reveals structure by forcing each form to justify itself against an explicit counterpart`,
        politicalClaim: (_insight, context) => `Making relations explicit redistributes power: standards stop looking natural once their construction is visible`,
    },
    IDIOM: {
        event: (insight) => insight.type === "IDIOM"
            ? `The phrase was sealed inside ${insight.language || "the imperial tongue"} while the ${insight.data.origin} source was treated as disposable`
            : "The phrase kept circulating after its source context was stripped out",
        playerAction: (insight) => insight.type === "IDIOM"
            ? `You broke open "${insight.data.phrase}" and named the source culture directly`
            : "You named the source culture the phrase depends on",
        systemExplanation: (_insight, context) => `${context.language} idioms survive by repeating compressed social history until it feels natural`,
        politicalClaim: (_insight, context) => `That repetition protects power: prestige speakers keep the phrase, while the people who produced it get erased from standard memory`,
    },
    DECEPTION: {
        event: (_insight, context) => `A false ${context.system || "pattern"} was engineered so surface form could pass for lineage`,
        playerAction: (_insight, context) => `You rejected the counterfeit grouping and separated real kin from planted impostors around ${context.root}`,
        systemExplanation: (_insight, context) => `This mechanism works by rewarding visual familiarity over historical relation`,
        politicalClaim: (_insight, context) => `That bias serves power: institutions that control spelling conventions also control which families look legitimate`,
    },
    FALSE_FAMILY: {
        event: (_insight, context) => `A false lineage was forged around ${context.root} and sold as common sense`,
        playerAction: (_insight, context) => `You severed the fake bond and reconstructed the actual genealogy`,
        systemExplanation: (_insight, context) => `False families persist when shared spelling is treated as stronger evidence than historical descent`,
        politicalClaim: (_insight, context) => `That rule protects prestige narratives: dominant groups keep their preferred origin story while other histories are pushed out`,
    },
    BORROWED: {
        event: (_insight, context) => `These words entered ${context.language} through borrowing from a higher-status source`,
        playerAction: (_insight, context) => `You tracked how ${context.leadWord} and ${context.secondWord} traveled through the same import channel`,
        systemExplanation: (_insight, context) => `Borrowing does not land evenly: ${context.system || "the import channel"} ranks forms by register, schooling, and who is allowed to sound authoritative`,
        politicalClaim: (_insight, context) => `This is how prestige operates under class society: ruling-class language becomes correctness and everyone else is marked as informal`,
    },
    TOPONYM: {
        event: (_insight, context) => `A place-name was overwritten when one naming system displaced another`,
        playerAction: (_insight, context) => `You recovered the older layer hidden inside ${context.leadWord}`,
        systemExplanation: (_insight, context) => `Toponyms preserve contact history because conquest renames territory before it can fully rename memory`,
        politicalClaim: (_insight, context) => `Mapping is power: the group that standardizes names controls which claims to land sound official`,
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
    if (insight.type === "ROOT") {
        const hash = rootHashCode(context.root);
        const event = oneClause(insight.tension, "The root mechanism finally surfaced");
        const playerDidPool = rootPlayerDidPool(context.root, context.leadWord, context.secondWord);
        const systemPool = [
            `Root systems reproduce across domains through predictable morphological extension`,
            `A root is infrastructure: many later words keep routing through the same base form`,
            `This pattern is structural, not decorative, because the root constrains how new words are built`,
        ];
        const politicalPool = [
            `Power depends on controlling which root forms become standard, and you just made that control visible`,
            `Prestige institutions treat root knowledge as a class filter, and your solve breaks that filter open`,
            `Standard language is a governance system: whoever sets the root norms sets the terms of legitimacy`,
        ];
        const playerDid = pickByHash(playerDidPool, hash);
        const systemExplanation = pickByHash(systemPool, hash + 2);
        const politicalClaim = pickByHash(politicalPool, hash + 4);
        return `${event}. ${playerDid}. ${systemExplanation}. ${politicalClaim}.`;
    }
    const template = TEMPLATE_BY_TYPE[insight.type];
    const event = oneClause(template.event(insight, context), oneClause(insight.tension, "The reveal landed"));
    const playerAction = oneClause(template.playerAction(insight, context), `You connected ${context.leadWord} with ${context.secondWord} through ${context.root}`);
    const systemExplanation = oneClause(template.systemExplanation(insight, context), `The mechanism connecting ${context.leadWord} and ${context.secondWord} is now explicit`);
    const politicalClaim = oneClause(template.politicalClaim(insight, context), `The power structure behind ${context.language} standardization is now visible`);
    return `${event}. ${playerAction}. ${systemExplanation}. ${politicalClaim}.`;
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
