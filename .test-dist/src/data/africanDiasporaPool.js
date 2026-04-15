"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AFRICAN_DIASPORA_POOL = void 0;
const sources_1 = require("./sources");
// africanDiasporaPool.ts
// BORROWED puzzle entries built around the African Diaspora loanword pool —
// words that entered American English through the labor, culture, spirituality,
// and linguistic resistance of enslaved Africans and their descendants.
//
// These entries expose the hidden African etymology beneath everyday English,
// organized by semantic domain (survival, resistance, spirit, syntax) and
// by origin-language family.
exports.AFRICAN_DIASPORA_POOL = [
    // --- SORT: Survival food --- //
    {
        root: "African diaspora survival foods",
        lang: "West & Central African languages → American English",
        meaning: "food vocabulary carried through the Middle Passage",
        groups: [
            {
                id: "provision_ground_crops",
                displayLabel: "provision ground crops",
                solutionLabel: "African crops carried through the Middle Passage",
                hint: "These were grown or brought by enslaved people to supplement their own survival.",
                accepts: ["goober", "yam", "okra", "benne"],
                related: ["tote", "cooter"],
            },
            {
                id: "refuse_to_cuisine",
                displayLabel: "from refuse to cuisine",
                solutionLabel: "Ingredients denied to the enslaved — reclaimed into celebrated dishes",
                hint: "These words describe food made from scraps or thickeners the 'master' discarded.",
                accepts: ["gumbo", "chitterlings", "cush", "filé"],
                related: ["praline", "ashy"],
            },
        ],
        pool: ["goober", "yam", "okra", "benne", "gumbo", "chitterlings", "cush", "filé"],
        tension: "English cuisine erased its sources. Goober (Kikongo nguba), yam (West African nyami), okra (Igbo ókùrù), and benne (Wolof bĕne) are direct African retentions — crops grown in 'provision grounds' by the enslaved as an act of biological and cultural self-preservation. The other group is a different story: gumbo, chitterlings, cush, and filé are words from the refuse economy — the choice cuts were taken, the scraps were left, and those scraps became the foundation of Southern cuisine. The language maps both acts of survival.",
        revealHeadline: "The plantation pantry hid its origins in plain sight.",
        revealBody: "Every word in this set carries a hidden history. The 'provision ground' crops — goober, yam, okra, benne — were African words for African plants that the enslaved brought through the Middle Passage and grew for their own sustenance. The 'refuse' words — gumbo, chitterlings, cush, filé — mark a different act: transforming what the slaveholder discarded into a culinary tradition so powerful it now defines Southern American cooking. The vocabulary of survival outlasted the system that tried to erase it.",
    },
    // --- SORT: Music, movement & spirit --- //
    {
        root: "African diaspora sound and spirit",
        lang: "West & Central African languages → American English",
        meaning: "music, movement, and spiritual practice as resistance",
        groups: [
            {
                id: "sound_and_movement",
                displayLabel: "sound & movement",
                solutionLabel: "Music and dance words rooted in African expression",
                hint: "These words describe the creative and physical forms of joy that the system could not fully suppress.",
                accepts: ["banjo", "jazz", "juke", "shimmy", "dap"],
                related: ["praline", "dig"],
            },
            {
                id: "spirit_and_power",
                displayLabel: "spirit & power",
                solutionLabel: "Spiritual and ritual words from African religious traditions",
                hint: "These were dismissed as superstition by enslavers — they were actually community protection systems.",
                accepts: ["mojo", "hoodoo", "voodoo", "zombie"],
                related: ["buckra", "nan"],
            },
        ],
        pool: ["banjo", "jazz", "juke", "shimmy", "dap", "mojo", "hoodoo", "voodoo", "zombie"],
        tension: "The plantation system could regulate labor, restrict movement, and deny literacy — but it could not fully silence sound or thought. Banjo (Kimbundu mbanza), jazz (Mandinka jasi), juke (Wolof dzug), shimmy, and dap are the sonic and kinetic signatures of a culture that refused to disappear. Juke joints were surveillance-free zones where workers recovered their humanity. On the other side: mojo (Kongo moyo — soul force), hoodoo (Ewe/Fon hudu), voodoo (Fon vodun), and zombie (Kikongo nzambi) were the spiritual infrastructure demonized as 'witchcraft' by the ruling class precisely because they provided community healing, coded communication, and — in Haiti — revolutionary organizing.",
        revealHeadline: "Joy and spirit were acts of political defiance.",
        revealBody: "Banjo was reconstructed from memory — enslaved people who remembered the Kimbundu mbanza built it from available materials, ensuring ancestral sound survived. Jazz was born in New Orleans from the same convergence of suppressed cultures. Meanwhile, 'mojo,' 'hoodoo,' and 'voodoo' were not superstitions — they were decentralized spiritual systems that operated outside the slaveholder's church, provided psychic protection, and in the case of Vodun, directly organized the Haitian Revolution. 'Zombie' — from Kikongo nzambi — was the ultimate horror metaphor: the enslavers' creation of a being without a soul. The word itself was a critique.",
    },
    // --- SORT: Origin-language families --- //
    {
        root: "African diaspora language families",
        lang: "Multiple African language families → American English",
        meaning: "tracing which African language each word comes from",
        groups: [
            {
                id: "kongo_kimbundu",
                displayLabel: "Kongo / Kimbundu family",
                solutionLabel: "Central African (Kikongo / Kimbundu) origin",
                hint: "These come from the Kongo basin — modern-day Angola and Congo — brought by people from those regions.",
                accepts: ["tote", "mojo", "zombie", "banjo"],
                related: ["nan", "goober"],
            },
            {
                id: "wolof_mandinka",
                displayLabel: "Wolof / Mandinka family",
                solutionLabel: "Senegambian (Wolof / Mandinka) origin",
                hint: "These come from West Africa's Senegambia region — modern-day Senegal, Gambia, and Mali.",
                accepts: ["dig", "hip", "juke", "cat"],
                related: ["benne", "jazz"],
            },
            {
                id: "igbo_ewe_coastal",
                displayLabel: "Igbo / Ewe / coastal West African",
                solutionLabel: "West African coastal (Igbo / Ewe / Efik) origin",
                hint: "These come from the Niger Delta and Gulf of Guinea coast — modern-day Nigeria, Ghana, and Benin.",
                accepts: ["okra", "oonuh", "hoodoo", "buckra"],
                related: ["nyam", "buck"],
            },
        ],
        pool: ["tote", "mojo", "zombie", "banjo", "dig", "hip", "juke", "cat", "okra", "oonuh", "hoodoo", "buckra"],
        tension: "These twelve words were not borrowed from a single African language — they arrived with specific people from specific regions, each carrying the linguistic fingerprint of their homeland. Tote, mojo, zombie, and banjo come from the Kongo-Angolan region (Kikongo and Kimbundu). Dig, hip, juke, and cat trace back to Senegambian Wolof and Mandinka — languages of the upper West African coast. Okra, oonuh, hoodoo, and buckra come from the Igbo, Ewe, and Efik language zones of the Niger Delta and Gulf of Guinea. The diversity is the point: the transatlantic slave trade did not take people from one place. It fractured dozens of distinct civilizations — and enough survived to leave these marks on English.",
        revealHeadline: "Three language families. One suppressed history.",
        revealBody: "Sorting these words by origin exposes the geographic breadth of the transatlantic slave trade. Kikongo gave English mojo and zombie — and tote, through the Kimbundu variant tuta. Wolof gave dig (degg: to understand), hip (hepi: eyes open), and cat (the -kat suffix for a person who does). Igbo gave okra (ókùrù) and oonuh (unu: the plural 'you') — a grammatical feature that survives in Gullah. Buckra (Efik mbakára: white man/master) was the enslaved community's word for the oppressor. Each of these words survived because the people who brought them found ways to keep their language alive under conditions designed to erase it.",
    },
    // --- SORT: Codes of resistance --- //
    {
        root: "African diaspora linguistic resistance",
        lang: "AAVE / Gullah / West African calques → American English",
        meaning: "language as a tool for naming oppression and building solidarity",
        groups: [
            {
                id: "naming_the_system",
                displayLabel: "naming & exposing",
                solutionLabel: "Words that named, exposed, or challenged the oppressor",
                hint: "These words describe the system, the oppressor, or the tools of deception — from the outside.",
                accepts: ["buckra", "bad-mouth", "phony", "bogus", "bad"],
                related: ["palaver", "buck"],
            },
            {
                id: "in_group_tongue",
                displayLabel: "in-group tongue",
                solutionLabel: "Words that created a private linguistic space the oppressor could not enter",
                hint: "These were signals of shared awareness — knowing the code meant belonging to the community.",
                accepts: ["dig", "hip", "cat", "cap", "finna"],
                related: ["kitchen", "day-clean"],
            },
        ],
        pool: ["buckra", "bad-mouth", "phony", "bogus", "bad", "dig", "hip", "cat", "cap", "finna"],
        tension: "Language was one of the few domains where the enslaved and later-marginalized held asymmetric power. Buckra (Efik mbakára) was a secret name for the oppressor — spoken openly but opaque to the target. Bad-mouth (calque of Mandingo da-niye) weaponized speech. Phony (possibly Mandinka fani: to fake) and bogus (Hausa boko: deceit) named the system's dishonesty in the system's own phonetic register. 'Bad' as a superlative inverted the oppressor's vocabulary entirely. Meanwhile, dig (to truly understand), hip (eyes open), cat (a knowing person), cap (to lie) and finna (immediate future marker from African syntax) were in-group signals — a linguistic commons inaccessible to those who dismissed the speakers as uneducated.",
        revealHeadline: "The oppressor's vocabulary was turned against them.",
        revealBody: "These ten words represent two strategies. The first: direct naming — buckra, bad-mouth, phony, bogus, and 'bad' (as superlative) called out the system, its practitioners, and its dishonesty using words the affected community controlled. The second: coded fluency — dig, hip, cat, cap, and finna created a signaling system invisible to those without the key. 'Hip' from Wolof hepi (to open one's eyes) became the mark of someone truly awake to their reality. Finna (a contracted 'fixing to') carries an African immediate-future grammatical structure dismissed as 'broken English' — it is, in fact, a grammatical retention from West African aspectual systems.",
    },
    // --- MATCH: Food words to definitions --- //
    {
        root: "African diaspora food vocabulary",
        lang: "West & Central African languages → American English",
        meaning: "match the survival food word to its definition",
        groups: [],
        pool: [
            "tote",
            "gumbo",
            "goober",
            "yam",
            "okra",
            "to carry a heavy load or burden",
            "a thick stew thickened with its own African name",
            "a peanut",
            "a starchy tuber applied to the sweet potato",
            "a green pod vegetable used in stews and soups",
        ],
        tension: "Every food word in this set traveled through the Middle Passage. Tote (Kikongo tota) built the labor economy; gumbo (Bantu ki-ngombo — originally meaning the okra plant itself) named the dish and its thickener in the same word; goober (Kikongo nguba) survived because peanuts were a self-sustenance crop; yam (West African nyami) mapped an African word onto a New World plant as an act of linguistic homemaking; okra (Igbo ókùrù) named itself and seeded a continent's cuisine. These definitions carry histories that supermarket shelves do not.",
        revealHeadline: "Five words. Five languages. One suppressed food history.",
        revealBody: "Gumbo is the most telling: the Bantu word ki-ngombo means the okra plant — so the stew was named after its African thickening agent in the original language, and the name survived the crossing intact. Okra made the same journey under its own Igbo name. Goober arrived in the provision grounds — small plots the enslaved were permitted to farm for themselves — as a crop that predated the plantation. Yam was an act of memory: a people forced into an alien landscape renamed its plants in their own tongue to make it survivable. Tote built everything the system profited from, and kept only the word.",
        questionPrompt: "Match each African diaspora food word to its definition.",
        matchPairs: [
            { source: "tote", target: "to carry a heavy load or burden" },
            { source: "gumbo", target: "a thick stew thickened with its own African name" },
            { source: "goober", target: "a peanut" },
            { source: "yam", target: "a starchy tuber applied to the sweet potato" },
            { source: "okra", target: "a green pod vegetable used in stews and soups" },
        ],
    },
    // --- MATCH: Spirit words to African origins --- //
    {
        root: "African diaspora spirit vocabulary",
        lang: "West & Central African languages → American English",
        meaning: "match the spirit or music word to its African root",
        groups: [],
        pool: [
            "mojo",
            "banjo",
            "hoodoo",
            "zombie",
            "jazz",
            "Kongo: moyo — soul force",
            "Kimbundu: mbanza — plucked instrument",
            "Ewe/Fon: hudu — protective spirit ritual",
            "Kikongo: nzambi — spirit without a soul",
            "Mandinka: jasi — to act outside convention",
        ],
        tension: "These five words were demonized, mocked, or appropriated — but their African roots survived. Mojo (Kongo moyo: soul/life force) represented an internal power that no external system could fully extinguish. Banjo (Kimbundu mbanza) was reconstructed from memory after the instrument itself was destroyed. Hoodoo (Ewe/Fon hudu) was called witchcraft to delegitimize a healing and justice system. Zombie (Kikongo nzambi) gave name to the philosophical horror of enslavement — a being stripped of its soul. Jazz (Mandinka jasi) became the defining American music precisely because it encoded the rhythm of a culture that survived everything designed to silence it.",
        revealHeadline: "These words were called dangerous. That was accurate.",
        revealBody: "Vodun and Hoodoo were banned, outlawed, and mocked as primitive — because they worked. Hoodoo provided community healing and, through coded ritual, organized resistance. In 1791, Vodun ceremonies at Bois Caïman directly preceded the outbreak of the Haitian Revolution, the only successful enslaved-people's uprising in history. Mojo — from moyo, the Kongo word for soul and life-force — was the private name for what the system could not confiscate. Zombie was the community's word for what the system did to people: turned them into bodies without agency. Banjo was rebuilt from nothing. Jazz could not be owned. These words survived because the ideas they carried were too necessary to die.",
        questionPrompt: "Match each spirit or music word to its African linguistic origin.",
        matchPairs: [
            { source: "mojo", target: "Kongo: moyo — soul force" },
            { source: "banjo", target: "Kimbundu: mbanza — plucked instrument" },
            { source: "hoodoo", target: "Ewe/Fon: hudu — protective spirit ritual" },
            { source: "zombie", target: "Kikongo: nzambi — spirit without a soul" },
            { source: "jazz", target: "Mandinka: jasi — to act outside convention" },
        ],
    },
];
// Provenance annotations
(0, sources_1.applyDatasetProvenance)(exports.AFRICAN_DIASPORA_POOL, "african_diaspora");
