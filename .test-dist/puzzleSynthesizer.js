"use strict";
// puzzleSynthesizer.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.synthesizePuzzle = synthesizePuzzle;
const seed_1 = require("./seed");
const classificationDecoyPools_1 = require("./src/data/classificationDecoyPools");
function lensId(insight) {
    return insight.lens?.id ?? "DEFAULT";
}
function lensLabel(insight) {
    return insight.lens?.label;
}
const CLASSIFICATION_DECOY_TYPES = new Set([
    "COLLISION",
    "SUPPLETIVE",
    "BORROWED",
    "FALSE_FAMILY",
]);
function seededShuffle(values, seed) {
    const r = (0, seed_1.mulberry32)((0, seed_1.hashString)(seed));
    return [...values]
        .map((value, index) => ({ value, score: r() + index / 10000 }))
        .sort((a, b) => a.score - b.score)
        .map(({ value }) => value);
}
function injectClassificationDecoys(insight, date) {
    const sourcePool = insight.data.pool ?? [];
    const baseFalseSystem = insight.data.falseSystem;
    if (!CLASSIFICATION_DECOY_TYPES.has(insight.type)) {
        return {
            pool: sourcePool,
            falseSystem: baseFalseSystem,
        };
    }
    const acceptedTerms = new Set(insight.data.groups.flatMap((group) => group.accepts));
    const availableDecoys = classificationDecoyPools_1.CLASSIFICATION_DECOY_POOLS[insight.type].filter((token) => !acceptedTerms.has(token) && !sourcePool.includes(token));
    if (!availableDecoys.length) {
        return {
            pool: sourcePool,
            falseSystem: baseFalseSystem,
        };
    }
    const shuffled = seededShuffle(availableDecoys, `${date}:${insight.id}:${insight.type}:decoys`);
    const countSeed = (0, seed_1.hashString)(`${date}:${insight.id}:decoy-count`);
    const targetCount = 1 + (countSeed % 2);
    const injected = shuffled.slice(0, Math.min(targetCount, shuffled.length));
    if (!injected.length) {
        return {
            pool: sourcePool,
            falseSystem: baseFalseSystem,
        };
    }
    const authoredDecoys = baseFalseSystem?.decoys ?? [];
    const mergedDecoys = Array.from(new Set([...authoredDecoys, ...injected]));
    return {
        pool: [...sourcePool, ...injected],
        falseSystem: {
            decoys: mergedDecoys,
            breakMessage: baseFalseSystem?.breakMessage ??
                "SYSTEM FRACTURE: one or more tokens are bait and do not belong to any true bucket.",
            revealTruth: baseFalseSystem?.revealTruth ??
                "Some pool items are deliberate decoys: near-matches that mimic the visible pattern without fitting the historical system.",
        },
    };
}
const claimByType = {
    BORROWED: "Prestige reshapes language.",
    COLLISION: "Language is conquest.",
    SUPPLETIVE: "Power rewrites grammar.",
    FALSE_FAMILY: "Similarity is not truth.",
    SEMANTIC: "Meaning shifts over time.",
};
function claimForInsight(insight) {
    return claimByType[insight.type] ?? "Words carry layered histories.";
}
function normalizeCopy(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}
function diceCoefficient(a, b) {
    if (!a || !b)
        return 0;
    if (a === b)
        return 1;
    const grams = (s) => {
        const out = new Set();
        for (let i = 0; i < s.length - 1; i += 1)
            out.add(s.slice(i, i + 2));
        return out;
    };
    const aGrams = grams(a);
    const bGrams = grams(b);
    let overlap = 0;
    aGrams.forEach((g) => {
        if (bGrams.has(g))
            overlap += 1;
    });
    return (2 * overlap) / (aGrams.size + bGrams.size);
}
function guardPrompt({ type, id, prompt, revealBody, fallback, }) {
    const safePrompt = prompt?.trim() || fallback;
    const promptNorm = normalizeCopy(safePrompt);
    const revealNorm = normalizeCopy(revealBody ?? "");
    const isTooSimilar = !!revealNorm && (promptNorm === revealNorm || diceCoefficient(promptNorm, revealNorm) >= 0.9);
    if (!isTooSimilar)
        return safePrompt;
    console.warn(`[content-guard] Prompt matched reveal copy for ${type}:${id}. Replaced with generic non-spoiler prompt.`);
    return fallback;
}
function buildRootPuzzle(insight, date) {
    const { targets, required, forms } = insight.data;
    return {
        date,
        type: "ROOT",
        lensId: lensId(insight),
        prompt: `Find words derived from the ${insight.language} root "${insight.root}" (${insight.meaning})`,
        targets,
        required,
        pool: targets,
        forms,
        meta: {
            claim: claimForInsight(insight),
            root: insight.root,
            lang: insight.language,
            meaning: insight.meaning,
            lensLabel: lensLabel(insight),
        },
        reveal: { headline: "", body: "", connections: [] },
    };
}
function buildSortPuzzle(insight, date) {
    const { groups, questionPrompt, revealBody } = insight.data;
    const { pool, falseSystem } = injectClassificationDecoys(insight, date);
    const normalizedGroups = groups.map((group, index) => {
        const fallbackLabel = `Group ${String.fromCharCode(65 + index)}`;
        const displayLabel = group.displayLabel ?? fallbackLabel;
        const solutionLabel = group.solutionLabel ?? group.label ?? displayLabel;
        return {
            ...group,
            label: displayLabel,
            displayLabel,
            solutionLabel,
        };
    });
    return {
        date,
        type: insight.type,
        lensId: lensId(insight),
        prompt: guardPrompt({
            type: insight.type,
            id: insight.id,
            prompt: questionPrompt,
            revealBody,
            fallback: "There is a hidden system here. Find it.",
        }),
        groups: normalizedGroups,
        pool,
        falseSystem,
        meta: {
            claim: claimForInsight(insight),
            root: insight.root,
            lang: insight.language,
            meaning: insight.meaning,
            lensLabel: lensLabel(insight),
        },
        reveal: { headline: "", body: "", connections: [] },
    };
}
function buildDeceptionPuzzle(insight, date) {
    return buildSortPuzzle(insight, date);
}
function buildFalseFamilyPuzzle(insight, date) {
    return buildSortPuzzle(insight, date);
}
function buildTimelinePuzzle(insight, date) {
    const { timeline, word } = insight.data;
    return {
        date,
        type: "SEMANTIC",
        lensId: lensId(insight),
        prompt: `Trace the semantic drift of "${word}"`,
        timeline,
        meta: {
            claim: claimForInsight(insight),
            root: insight.root,
            lang: insight.language,
            meaning: insight.meaning,
            lensLabel: lensLabel(insight),
        },
        reveal: { headline: "", body: "", connections: [] },
    };
}
function buildIdiomPuzzle(insight, date) {
    const { phrase, origin, questionPrompt, revealBody } = insight.data;
    return {
        date,
        type: "IDIOM",
        lensId: lensId(insight),
        prompt: guardPrompt({
            type: insight.type,
            id: insight.id,
            prompt: questionPrompt,
            revealBody,
            fallback: "Reassemble the idiom from the fragments.",
        }),
        answer: phrase,
        word: origin,
        meta: {
            claim: claimForInsight(insight),
            root: origin,
            lang: insight.language,
            meaning: insight.meaning,
            lensLabel: lensLabel(insight),
        },
        reveal: { headline: "", body: "", connections: [] },
    };
}
function buildGrimmPuzzle(insight, date) {
    const { pairs } = insight.data;
    return {
        date,
        type: "GRIMM",
        lensId: lensId(insight),
        prompt: insight.tension,
        pairs,
        meta: {
            claim: "Sound shifts are law.",
            root: insight.root,
            lang: insight.language,
            meaning: insight.meaning,
            lensLabel: lensLabel(insight),
        },
        reveal: { headline: "", body: "", connections: [] },
    };
}
function buildBorrowedPuzzle(insight, date) {
    return buildSortPuzzle(insight, date);
}
function buildMatchPuzzle(insight, date) {
    const { pairs, pool, questionPrompt, revealBody } = insight.data;
    return {
        date,
        type: "MATCH",
        lensId: lensId(insight),
        prompt: guardPrompt({
            type: insight.type,
            id: insight.id,
            prompt: questionPrompt,
            revealBody,
            fallback: "Match each word to its historical gloss.",
        }),
        pairs,
        pool,
        meta: {
            claim: claimForInsight(insight),
            root: insight.root,
            lang: insight.language,
            meaning: insight.meaning,
            lensLabel: lensLabel(insight),
        },
        reveal: { headline: "", body: "", connections: [] },
    };
}
function assertPuzzleShape(puzzle) {
    if (!puzzle.prompt || !puzzle.type) {
        throw new Error(`Invalid puzzle core shape for ${puzzle.date}`);
    }
    switch (puzzle.type) {
        case "ROOT":
            if (!puzzle.targets?.length || !puzzle.required?.length || !puzzle.pool?.length) {
                throw new Error(`Invalid ROOT puzzle shape for ${puzzle.date}`);
            }
            break;
        case "SEMANTIC":
            if (!puzzle.timeline?.length) {
                throw new Error(`Invalid SEMANTIC puzzle shape for ${puzzle.date}`);
            }
            break;
        case "IDIOM":
            if (!puzzle.answer || !puzzle.word) {
                throw new Error(`Invalid IDIOM puzzle shape for ${puzzle.date}`);
            }
            break;
        case "MATCH":
            if (!puzzle.pairs?.length || !puzzle.pool?.length) {
                throw new Error(`Invalid MATCH puzzle shape for ${puzzle.date}`);
            }
            break;
        case "GRIMM":
            if (!puzzle.pairs?.length) {
                throw new Error(`Invalid GRIMM puzzle shape for ${puzzle.date}`);
            }
            break;
        default:
            if (!puzzle.groups?.length || !puzzle.pool?.length) {
                throw new Error(`Invalid ${puzzle.type} puzzle shape for ${puzzle.date}`);
            }
            break;
    }
    return puzzle;
}
function synthesizePuzzle(insight, date) {
    switch (insight.type) {
        case "ROOT":
            return assertPuzzleShape(buildRootPuzzle(insight, date));
        case "DECEPTION":
            return assertPuzzleShape(buildDeceptionPuzzle(insight, date));
        case "FALSE_FAMILY":
            return assertPuzzleShape(buildFalseFamilyPuzzle(insight, date));
        case "SEMANTIC":
            return assertPuzzleShape(buildTimelinePuzzle(insight, date));
        case "IDIOM":
            return assertPuzzleShape(buildIdiomPuzzle(insight, date));
        case "BORROWED":
            return assertPuzzleShape(buildBorrowedPuzzle(insight, date));
        case "MATCH":
            return assertPuzzleShape(buildMatchPuzzle(insight, date));
        case "TOPONYM":
            return assertPuzzleShape(buildSortPuzzle(insight, date));
        case "SUPPLETIVE":
        case "COLLISION":
        case "PIE":
        case "PHANTOM_ROOT":
            return assertPuzzleShape(buildSortPuzzle(insight, date));
        case "GRIMM":
            return assertPuzzleShape(buildGrimmPuzzle(insight, date));
        default: {
            const neverType = insight;
            throw new Error(`Unsupported puzzle type: ${JSON.stringify(neverType)}`);
        }
    }
}
