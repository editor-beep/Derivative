"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BORROWED_SORT_POOL = exports.BORROWED_MATCH_POOL = exports.BORROWED_POOL = void 0;
const frenchFakeouts_1 = require("./frenchFakeouts");
const norseCollisions_1 = require("./norseCollisions");
const loanwordExtraction_1 = require("./loanwordExtraction");
const eponyms_1 = require("./eponyms");
const africanDiasporaPool_1 = require("./africanDiasporaPool");
const hebrewYiddishPool_1 = require("./hebrewYiddishPool");
const moorishArabicPool_1 = require("./moorishArabicPool");
const womanCentricPool_1 = require("./womanCentricPool");
const lgbtqPool_1 = require("./lgbtqPool");
const contronymPool_1 = require("./contronymPool");
exports.BORROWED_POOL = [
    ...frenchFakeouts_1.FRENCH_FALSE_FRIENDS_POOL,
    ...norseCollisions_1.NORSE_BORROWED_POOL,
    ...loanwordExtraction_1.LOANWORD_EXTRACTION_POOL,
    ...eponyms_1.EPONYM_POOL,
    ...africanDiasporaPool_1.AFRICAN_DIASPORA_POOL,
    ...hebrewYiddishPool_1.HEBREW_YIDDISH_POOL,
    ...moorishArabicPool_1.MOORISH_ARABIC_POOL,
    ...womanCentricPool_1.WOMAN_CENTRIC_POOL,
    ...lgbtqPool_1.LGBTQ_POOL,
    ...contronymPool_1.CONTRONYM_POOL,
    {
        root: "Arabic extraction",
        lang: "Arabic → English",
        meaning: "Arabic loan words",
        groups: [
            {
                id: "arabic",
                displayLabel: "arabic stream", solutionLabel: "Arabic stream (al- prefix pattern)",
                accepts: ["algebra", "algorithm", "alcohol", "cipher"],
                related: ["zero", "coffee"],
            },
            {
                id: "hindi",
                displayLabel: "hindi / sanskrit", solutionLabel: "Hindi / Sanskrit stream",
                accepts: ["bungalow", "shampoo", "jungle", "thug"],
                related: ["avatar", "pundit"],
            },
            {
                id: "nahuatl",
                displayLabel: "nahuatl", solutionLabel: "Nahuatl stream (Aztec)",
                accepts: ["chocolate", "tomato", "avocado"],
                related: ["coyote", "chili"],
            },
        ],
        pool: [
            "algebra",
            "algorithm",
            "alcohol",
            "cipher",
            "bungalow",
            "shampoo",
            "jungle",
            "thug",
            "chocolate",
            "tomato",
            "avocado",
        ],
        tension: "Every word here is an extraction — English absorbing vocabulary from cultures it encountered through trade, conquest, and colonization",
    },
    {
        root: "colonized language flows",
        lang: "Global → English",
        meaning: "post-colonial borrowing",
        groups: [
            {
                id: "french",
                displayLabel: "norman french", solutionLabel: "Norman French conquest layer",
                hint: "The Imperial Machine",
                accepts: ["beef", "pork", "mutton", "venison"],
                related: ["veal", "poultry"],
            },
            {
                id: "old_english",
                displayLabel: "old english", solutionLabel: "Old English farming layer",
                hint: "The Root Source",
                accepts: ["cow", "pig", "sheep", "deer"],
                related: ["ox", "fowl"],
            },
            {
                id: "latin",
                displayLabel: "church latin", solutionLabel: "Latin ecclesiastical layer",
                hint: "The Sacred Register",
                accepts: ["scripture", "angel", "altar", "martyr"],
                related: ["saint", "bishop"],
            },
        ],
        pool: [
            "beef",
            "pork",
            "mutton",
            "venison",
            "cow",
            "pig",
            "sheep",
            "deer",
            "scripture",
            "angel",
            "altar",
            "martyr",
        ],
        tension: "The Norman conquest split English vocabulary in two: Old English named the living animals, French named the meat — the language of the farmer vs. the language of the lord",
    },
    {
        root: "sinister / gauche / left",
        lang: "Latin + French + English",
        meaning: "left-handedness as stigma",
        groups: [
            {
                id: "stigma",
                displayLabel: "marks wrong", solutionLabel: "Words that encode left = wrong",
                accepts: ["sinister", "gauche", "awkward"],
                related: ["clumsy", "left-handed"],
            },
            {
                id: "origin",
                displayLabel: "neutral direction", solutionLabel: "Neutral / directional origin words",
                accepts: ["left", "port", "larboard"],
                related: ["leeward", "starboard"],
            },
            {
                id: "right",
                displayLabel: "marks correct", solutionLabel: "Words that encode right = correct",
                accepts: ["right", "dexterous", "adroit"],
                related: ["correct", "proper"],
            },
        ],
        pool: [
            "sinister",
            "gauche",
            "awkward",
            "left",
            "port",
            "larboard",
            "right",
            "dexterous",
            "adroit",
        ],
        tension: "Latin 'sinister' meant simply 'left' — the ideological drift to 'evil' happened as left-handedness was stigmatized across European cultures. The language records the prejudice.",
    },
    {
        root: "body-as-machine metaphors",
        lang: "Industrial English",
        meaning: "mechanical body language",
        groups: [
            {
                id: "body_to_machine",
                displayLabel: "body → machine", solutionLabel: "Body words applied to machines",
                accepts: ["arm", "leg", "neck", "shoulder"],
                related: ["foot", "rib"],
            },
            {
                id: "machine_to_body",
                displayLabel: "machine → body", solutionLabel: "Machine words applied to bodies",
                accepts: ["running", "firing", "pumping", "drive"],
                related: ["pressure", "tension"],
            },
            {
                id: "shared",
                displayLabel: "both ways", solutionLabel: "Words that moved both directions",
                accepts: ["joint", "valve", "channel", "system"],
                related: ["network", "trunk"],
            },
        ],
        pool: [
            "arm",
            "leg",
            "neck",
            "shoulder",
            "running",
            "firing",
            "pumping",
            "drive",
            "joint",
            "valve",
            "channel",
            "system",
        ],
        tension: "The Industrial Revolution didn't just use machine metaphors for bodies — it worked both ways. We now speak of the body's 'systems' and 'drive' as if it were built, not born.",
    },
];
exports.BORROWED_MATCH_POOL = exports.BORROWED_POOL.filter((entry) => Array.isArray(entry.matchPairs) && entry.matchPairs.length > 0);
exports.BORROWED_SORT_POOL = exports.BORROWED_POOL.filter((entry) => !entry.matchPairs?.length);
