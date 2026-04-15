"use strict";
// moorishArabicPool.ts
// Moorish and Arabic-Iberian loanwords structured as BORROWED puzzle entries —
// words that entered Spanish, Portuguese, and English through the 781-year
// Moorish occupation of the Iberian Peninsula (711–1492).
//
// Covers all 30 words across three sort puzzles:
//   Puzzle 1 — sciences, mathematics, and the land (Tiers 1 + 2)
//   Puzzle 2 — luxury, craft, trade, and governance (Tiers 3 + 4)
//   Puzzle 3 — the linguistic residue the Reconquista could not erase (Tier 5)
Object.defineProperty(exports, "__esModule", { value: true });
exports.MOORISH_ARABIC_POOL = void 0;
const sources_1 = require("./sources");
exports.MOORISH_ARABIC_POOL = [
    // --- PUZZLE 1: Sciences and the land ---
    {
        root: "Moorish science and agriculture",
        lang: "Arabic → Spanish / English (via 781-year Iberian occupation)",
        meaning: "words the Moors brought that built European intellectual and agricultural civilization",
        groups: [
            {
                id: "mathematics_and_sky",
                displayLabel: "mathematics and the sky",
                solutionLabel: "Arabic sciences — mathematics, astronomy, and chemistry",
                hint: "These words carry the fingerprint of Moorish intellectual civilization — the science that kept European universities running for centuries.",
                hintLevel2: "Think about the restoration of broken parts, a mathematician's name, an empty vessel, the highest celestial point, and the alkaline residue.",
                accepts: ["algebra", "algorithm", "cipher / zero", "zenith", "alkali"],
                related: ["alchemy", "azimuth"],
            },
            {
                id: "land_and_sustenance",
                displayLabel: "land and sustenance",
                solutionLabel: "Moorish agricultural inheritance — water, crops, and building",
                hint: "These words are the physical legacy — the crops, the irrigation systems, and the building materials the Moors planted across Iberia.",
                hintLevel2: "Think about an irrigation canal, the best fodder, a crystallized sweetener, a citrus fruit, and a sun-dried brick.",
                accepts: ["acequia", "alfalfa", "sugar", "lemon", "adobe"],
                related: ["orange", "saffron"],
            },
        ],
        pool: ["algebra", "algorithm", "cipher / zero", "zenith", "alkali", "acequia", "alfalfa", "sugar", "lemon", "adobe"],
        tension: "The Reconquista rewrote the history books but couldn't rewrite the vocabulary. Algebra (al-jabr: restoration of broken parts) was named by Muhammad ibn Musa al-Khwarizmi — whose name also gave us 'algorithm' — in the 9th century, three hundred years before Oxford University was founded. Cipher and zero (both from sifr: empty) gave European mathematics the tool it had been missing: a way to represent nothing, and thus build positional notation. Zenith (samt ar-ra's: path over the head) came from the astronomical tradition that navigated the Mediterranean while northern Europe navigated by landmark. Meanwhile, acequia (as-saqiya: the water carrier) transformed the dry Iberian plateau into a food system. Alfalfa, sugar, lemon — the Moors brought the ingredients; the Villain used them, renamed some, and forgot to give credit.",
        questionPrompt: "Sort these Arabic-origin words by what domain of civilization they represent.",
        revealHeadline: "The Villain used Moorish science for centuries — and then pretended it wasn't Moorish.",
        revealBody: "Al-Khwarizmi's treatise on algebra was translated into Latin in the 12th century and became the standard mathematical textbook across European universities for three hundred years. The translator left the author's name in as the title: Algoritmi de numero Indorum — giving the world 'algorithm' from a name. Alkali (al-qali: ashes of saltwort) launched European chemistry — the Moors had been distilling, refining, and experimenting centuries before the Renaissance claimed science as a European invention. The agricultural vocabulary is equally stark: acequia irrigation networks turned the Guadalquivir valley into the breadbasket of Europe. Sugar was introduced to Iberia by the Moors, then carried to the Americas — where it became the engine of plantation slavery. The lemon was one of dozens of citrus trees the Moors planted. The adobe brick, still used across the American Southwest, traveled from Arabic at-tub (the brick) to Moorish Spain to the Americas in a single continuous line.",
    },
    // --- PUZZLE 2: Luxury, craft, trade, and governance ---
    {
        root: "Moorish luxury, trade, and governance",
        lang: "Arabic → Spanish / English (via Iberian trade and court culture)",
        meaning: "words of beauty, commerce, and power that the Villain absorbed from Moorish civilization",
        groups: [
            {
                id: "beauty_and_music",
                displayLabel: "beauty, craft, and music",
                solutionLabel: "Moorish luxury goods and aesthetics — the culture the Villain could not replicate",
                hint: "These words carry the texture of Moorish artistic civilization — the music, the materials, and the colors the Villain coveted.",
                hintLevel2: "Think about a plucked string instrument, its ancestor, a prehistoric resin, a breathable textile, and a deep red dye.",
                accepts: ["guitar", "lute", "amber", "cotton", "crimson"],
                related: ["oud", "lacquer"],
            },
            {
                id: "governance_and_commerce",
                displayLabel: "governance and commerce",
                solutionLabel: "Arabic governance and trade vocabulary absorbed into European power structures",
                hint: "These words came from the Moorish administrative and military world — the Villain borrowed the vocabulary when they took the offices.",
                hintLevel2: "Think about a sea commander's title, a weapons storehouse, a unit of gem weight, a storehouse of information, and a customs notification.",
                accepts: ["admiral", "arsenal", "carat", "magazine", "tariff"],
                related: ["vizier", "sultan"],
            },
        ],
        pool: ["guitar", "lute", "amber", "cotton", "crimson", "admiral", "arsenal", "carat", "magazine", "tariff"],
        tension: "The Villain moved into the Moors' palaces, wore their clothes, played their instruments, and used their titles — while spending centuries erasing the provenance. Guitar traces from Arabic qitara through the Moorish oud (al-'ud: the wood), whose round-bodied descendant became Europe's defining instrument. Lute is al-'ud directly, the name surviving the crossing. Crimson (qirmizi) arrived via Moorish dyers who had mastered the art of saturated color long before European textile trade. Cotton (qutun) clothed an entire continent in a material the Moors had been weaving for centuries. Admiral (amir al-bihar: commander of the seas) was adopted wholesale when the Aragonese and Castilian navies needed a word for their new sea commanders — the ones who sailed in ships whose design also owed something to Moorish shipbuilding. Arsenal (dar as-sina'ah: house of manufacturing) was first a craftsman's workshop; the Villain turned it into a weapons depot. Magazine (makhazin: storehouses) stored knowledge first, then gunpowder. Tariff was a trade document; the Villain made it a weapon.",
        questionPrompt: "Sort these Moorish-origin words by what domain of cultural power they came from.",
        revealHeadline: "The Villain took the palaces. Then they took the vocabulary. Then they forgot both were Moorish.",
        revealBody: "Every word in the second group is a governance term — a piece of the administrative machinery the Moors built and the Villain inherited. Admiral: the Aragonese crown adopted the title amir al-bihar directly in the 13th century; the word then spread across every European navy. Arsenal: the Venetians transliterated darsina'a into arsenale, and the Venetian Arsenal became the largest industrial complex in the pre-modern world — but its name was still Arabic. Carat (qirat: weight of four grains) was the Moorish jeweler's standard of precision, now used from Antwerp to Mumbai. Magazine began as a storage word — a storehouse of goods — then a storehouse of information (hence the periodical) and finally a storehouse of ammunition: three different histories in one word. The first group is a reminder that European music is not European: the guitar descends from the Arabic qitara descends from the oud, the instrument the Moors played in every palace from Córdoba to Seville. Lute is just al-'ud with the article stripped and transliterated. Cotton and crimson clothed and colored a continent. The Moors left — but the vocabulary stayed.",
    },
    // --- PUZZLE 3: The linguistic residue the Reconquista couldn't erase ---
    {
        root: "Moorish linguistic residue in Spanish",
        lang: "Arabic → Spanish (surviving from 711–1492 Moorish occupation)",
        meaning: "words in everyday Spanish that carry 781 years of Moorish presence the Reconquista tried to erase",
        groups: [
            {
                id: "alive_in_spanish",
                displayLabel: "alive in everyday Spanish",
                solutionLabel: "Arabic words living inside the Spanish language the Reconquista couldn't purge",
                hint: "These are words a Spanish speaker uses every day without knowing they are speaking Arabic — a prayer, a neighborhood, a palace, a game, and a city name.",
                hintLevel2: "Think about a wish to God, an outer district, a royal fortress, chess, and the name of Madrid's patron saint.",
                accepts: ["ojalá", "barrio", "alcázar", "ajedrez", "almudena"],
                related: ["alcalde", "alberca"],
            },
            {
                id: "alive_in_craft",
                displayLabel: "alive in craft and daily life",
                solutionLabel: "Arabic words surviving in Spanish craft, trade, and daily objects",
                hint: "These words are embedded in the objects and skills of daily life — the builder, the tile, the container, the journey, and the drink.",
                hintLevel2: "Think about a mason or bricklayer, a glazed tile, a storage vessel, an expedition to observe wildlife, and a distilled spirit.",
                accepts: ["albañil", "azulejo", "jar", "safari", "alcohol"],
                related: ["almacén", "alquiler"],
            },
        ],
        pool: ["ojalá", "barrio", "alcázar", "ajedrez", "almudena", "albañil", "azulejo", "jar", "safari", "alcohol"],
        tension: "The Reconquista was a military project that succeeded in 1492. The linguistic project failed completely. Ojalá (wa sha Allah: and should God will it) is one of the most-used expressions in Spanish — a hidden daily prayer from the Moors, still in every mouth in Madrid. Alcázar (al-qasr: the castle) names the palace the Reconquista rulers moved into: they used the Moorish word because they were living in the Moorish building. Ajedrez (ash-shatranj) brought chess to Europe; the game arrived through Moorish Iberia and spread to every European court. Barrio (barri: outer/wild) named the periphery — which became, under displacement, the cultural center. Almudena names a church and a patron saint of Madrid: the Catedral de la Almudena sits on the site of a Moorish mosque, named from al-mudayna (the citadel), unable to erase the geography even in the naming of a Christian cathedral. Albañil (al-banni: the builder) — every brick in the Villain's cities was laid by a hand with a name from this word.",
        questionPrompt: "Sort these Arabic-origin words by the type of daily presence they still hold in Spanish.",
        revealHeadline: "The Reconquista ended in 1492. The Arabic vocabulary did not.",
        revealBody: "Eight centuries of coexistence cannot be erased by a single military campaign, and the Spanish lexicon is the evidence. Ojalá is heard in every Spanish-speaking country on earth — an Arabic prayer hidden inside the most common expression of hope. Azulejo (az-zulayj: polished stone) tiles the walls of churches, train stations, and homes across Portugal and Spain; the technique, the word, and the aesthetic are all Moorish. Alcohol (al-kuhl: kohl, a fine powder used in cosmetics and medicine) began as a refined substance — a Moorish chemist's term for the purest distillate of any substance — before 'spirits' became its dominant meaning in European use. Safari (safariya: a journey) traveled from Arabic through Swahili into the colonial vocabulary of East Africa, arriving in English as a word for the leisure hunting expeditions that replaced the Moorish concept of purposeful journey. Albañil names the trade that built every wall in Spain: the builder. Jar (jarrah: a pottery vessel) is so basic, so universal, that most speakers of English and Spanish have no idea it is Arabic. These words did not survive through conscious effort — they survived because they named things too fundamental to be renamed.",
    },
];
// Provenance annotations
(0, sources_1.applyDatasetProvenance)(exports.MOORISH_ARABIC_POOL, "moorish_arabic");
