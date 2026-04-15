"use strict";
// hebrewYiddishPool.ts
// Yiddish and Hebrew loanwords structured as BORROWED puzzle entries —
// the same format used by the puzzle generator to build playable sort puzzles.
// Each entry groups words by semantic function or linguistic origin,
// so the player classifies vocabulary that carries centuries of diaspora history.
Object.defineProperty(exports, "__esModule", { value: true });
exports.HEBREW_YIDDISH_POOL = void 0;
exports.HEBREW_YIDDISH_POOL = [
    // --- PUZZLE 1: Yiddish survival vocabulary by semantic domain ---
    {
        root: "Yiddish survival vocabulary",
        lang: "Yiddish → English",
        meaning: "words carried by Ashkenazi immigrants into American English",
        groups: [
            {
                id: "defiance",
                displayLabel: "nerve & defiance",
                solutionLabel: "Audacity, critique, and naming the absurd",
                hint: "These words give you the nerve to push back — against authority, bad luck, and empty promises.",
                hintLevel2: "Think about words for courage, calling someone out, or rejecting the system's lies.",
                accepts: ["chutzpah", "gonif", "bupkis", "putz", "schlemiel", "mishegas"],
                related: ["shtum"],
            },
            {
                id: "labor",
                displayLabel: "labor & survival",
                solutionLabel: "Work, struggle, and the weight of daily life",
                hint: "These words carry the texture of immigrant working life — the physical effort, the complaints, the small pleasures.",
                hintLevel2: "Think about words for dragging something heavy, complaining, sweating, cheap goods, and money.",
                accepts: ["schlep", "kvetch", "shvitz", "schlock", "gelt"],
                related: ["nosh", "tchotchke"],
            },
            {
                id: "community",
                displayLabel: "community & warmth",
                solutionLabel: "Social connection, virtue, and collective survival",
                hint: "These words describe the social infrastructure — how you navigate a world not built for you, who you become in it, and what you pass on.",
                hintLevel2: "Think about a word for a person of integrity, social networking, a sales pitch, communal commenting, and sentimental feeling.",
                accepts: ["mensch", "schmooze", "spiel", "kibbitz", "schmaltzy"],
                related: ["nachas", "klutz"],
            },
        ],
        pool: [
            "chutzpah", "gonif", "bupkis", "putz", "schlemiel", "mishegas",
            "schlep", "kvetch", "shvitz", "schlock", "gelt",
            "mensch", "schmooze", "spiel", "kibbitz", "schmaltzy",
        ],
        tension: "Yiddish flooded American English through the labor and entertainment industries — a language the immigrant working class carried across borders and into common speech",
        questionPrompt: "These Yiddish words all entered English through the immigrant experience. Classify each by what it was used to do.",
        revealHeadline: "Yiddish didn't enter English through scholarship. It came through street commerce, comedy, and survival.",
        revealBody: "The words cluster by function: some arm you with nerve (chutzpah, bupkis, gonif) — the right to name the absurdity of the system you're trapped in. Others carry the weight of the working day (schlep, kvetch, shvitz). The third group holds the social glue of a community rebuilding itself in every city it was pushed to. Yiddish gave English not just vocabulary but a philosophical stance — that you call the thing what it is, even if it gets you in trouble.",
    },
    // --- PUZZLE 2: Hebrew sacred vocabulary by domain ---
    {
        root: "Hebrew sacred vocabulary",
        lang: "Hebrew → English (via liturgy and diaspora)",
        meaning: "words that entered English carrying Hebrew sacred meaning",
        groups: [
            {
                id: "liturgy",
                displayLabel: "prayer & liturgy",
                solutionLabel: "Words from Jewish liturgical tradition",
                hint: "These entered English through shared biblical culture — absorbed by Christianity without always acknowledging their Hebrew origin.",
                hintLevel2: "Think about words you hear in religious services that came directly from Hebrew prayer practice.",
                accepts: ["amen", "hallelujah", "sabbath", "shekhinah"],
                related: ["hosanna"],
            },
            {
                id: "folk",
                displayLabel: "folk belief & protection",
                solutionLabel: "Words from Jewish folk belief and community self-defense",
                hint: "These words served practical and protective functions — luck, recognition, and physical defense in a hostile world.",
                hintLevel2: "Think about a word for luck, a protective creature made of clay, and a secret password used at a border crossing.",
                accepts: ["mazel", "golem", "shibboleth"],
                related: ["kabbalah"],
            },
        ],
        pool: ["amen", "hallelujah", "sabbath", "shekhinah", "mazel", "golem", "shibboleth"],
        tension: "Hebrew entered English in two streams: the liturgical (through shared biblical culture) and the folk (through diaspora survival under persecution)",
        questionPrompt: "These Hebrew-origin words all entered English, but through very different channels. What was each one used to do?",
        revealHeadline: "Hebrew split into two streams as it entered English.",
        revealBody: "The liturgical stream — amen, hallelujah, sabbath, shekhinah — entered through the shared biblical inheritance of Christianity and Judaism. The dominant culture absorbed them willingly, sometimes without knowing their source. The folk stream — mazel, golem, shibboleth — came through a different channel: community practice, self-protection, and cultural survival under persecution. Shibboleth was literally used as a border-crossing test to identify enemies. Golem was the defense myth of a people without an army. Mazel was how you narrated luck in a world where luck was often the difference between survival and catastrophe.",
    },
];
