"use strict";
// moorishArabicPool.ts
// Moorish and Arabic-Iberian loanwords structured as BORROWED puzzle entries —
// one puzzle per original source tier.
//
//   Puzzle 1 — Tier 1: Science, math, and the sky (5 words)
//   Puzzle 2 — Tier 2: Earth and sustenance (5 words)
//   Puzzle 3 — Tier 3: Luxury and craft (5 words)
//   Puzzle 4 — Tier 4: Governance and commerce (5 words)
//   Puzzle 5 — Tier 5: The linguistic residue (10 words)
Object.defineProperty(exports, "__esModule", { value: true });
exports.MOORISH_ARABIC_POOL = void 0;
const sources_1 = require("./sources");
exports.MOORISH_ARABIC_POOL = [
    // --- PUZZLE 1 (Tier 1): Science, math, and the sky ---
    {
        root: "Moorish science and mathematics",
        lang: "Arabic → Medieval Latin → English (via Moorish Iberian scholarship, 9th–13th c.)",
        meaning: "the Arabic scientific vocabulary that built European intellectual civilization",
        groups: [
            {
                id: "pure_mathematics",
                displayLabel: "pure mathematics",
                solutionLabel: "Arabic contributions to abstract mathematics — the tools of calculation and logic",
                hint: "These three words are the foundation of modern mathematics — named by the scholars who invented the techniques.",
                hintLevel2: "The restoration of broken parts. The name of the mathematician who systematized it. The symbol for nothing — which made everything else possible.",
                accepts: ["algebra", "algorithm", "cipher / zero"],
                related: ["alchemy", "sine"],
            },
            {
                id: "observation_sciences",
                displayLabel: "sky and substance",
                solutionLabel: "Arabic contributions to astronomy and chemistry",
                hint: "These two words come from Moorish observational science — one describes the apex of the celestial sphere, one describes an alkaline substance.",
                hintLevel2: "One is the highest point a star can reach in the sky, from 'path over the head.' The other is the alkaline ash that launched European chemistry.",
                accepts: ["zenith", "alkali"],
                related: ["azimuth", "alembic"],
            },
        ],
        pool: ["algebra", "algorithm", "cipher / zero", "zenith", "alkali"],
        tension: "Al-Khwarizmi wrote his treatise on algebra in Baghdad around 820 CE — three centuries before Oxford University existed. His name, Latinized as 'Algoritmi,' became 'algorithm' when his work was translated into Latin in the 12th century and became the standard mathematics textbook across European universities for 300 years. Algebra (al-jabr: restoration of broken parts) named the technique of solving equations by maintaining balance. Cipher and zero both derive from sifr (empty): the concept of representing nothing — which Roman numerals could not do — enabled positional notation and made modern arithmetic possible. Zenith (from samt ar-ra's: path above the head) and alkali (al-qali: ashes of saltwort) came from the Moorish traditions of astronomy and proto-chemistry that the Villain inherited, renamed, and called European.",
        questionPrompt: "Sort these Arabic-origin science words by what they contributed to: mathematics, or observational science.",
        revealHeadline: "Three centuries before Oxford. The math was already Arabic.",
        revealBody: "The 12th-century translation movement — when European scholars traveled to Toledo, Córdoba, and Salerno to translate Arabic scientific texts into Latin — transferred the entire intellectual infrastructure of Islamic scholarship into European universities. Al-Khwarizmi's algebra and his number system. Ibn al-Haytham's optics. Al-Battani's astronomy. The words survived the translation intact, which is why the language of European mathematics is still Arabic. Alkali launched the European tradition of alchemy (itself from Arabic al-kimiya) and eventually chemistry: the Moors had been distilling, refining, and experimenting with substances centuries before Paracelsus claimed the field as European. Zenith is still the technical astronomical term for the point directly overhead — because the Moorish astronomers who defined it named it first, and their nomenclature was adopted wholesale.",
    },
    // --- PUZZLE 2 (Tier 2): Earth and sustenance ---
    {
        root: "Moorish agriculture and land management",
        lang: "Arabic → Spanish / English (via Moorish Iberian farming, 711–1492)",
        meaning: "the agricultural vocabulary the Moors left in the land they farmed",
        groups: [
            {
                id: "crops",
                displayLabel: "crops and foods",
                solutionLabel: "Crops and foods the Moors introduced to the Iberian Peninsula",
                hint: "These three words are things the Moors planted — a fodder crop, a crystallized sweetener, and a citrus fruit.",
                hintLevel2: "The best fodder. The sweetener that became a commodity of empire. The yellow citrus tree that transformed European cooking.",
                accepts: ["alfalfa", "sugar", "lemon"],
                related: ["orange", "saffron"],
            },
            {
                id: "infrastructure",
                displayLabel: "water and walls",
                solutionLabel: "Agricultural infrastructure the Moors engineered — irrigation and building",
                hint: "These two words name the physical systems the Moors used to sustain their agriculture: how they moved water across dry land, and what they built with.",
                hintLevel2: "One is an irrigation canal that still runs in the American Southwest. The other is a sun-dried earth brick, also still used across the world.",
                accepts: ["acequia", "adobe"],
                related: ["alberca", "mortar"],
            },
        ],
        pool: ["alfalfa", "sugar", "lemon", "acequia", "adobe"],
        tension: "The Iberian Peninsula that the Moors occupied in 711 was largely dry, impoverished, and under-farmed. By the time of the Reconquista in 1492, it had been transformed: the Guadalquivir valley was productive farmland, citrus orchards covered hillsides that had been bare, and an irrigation infrastructure connected fields to rivers across the south. Alfalfa (al-fisfisa: the best fodder) came from Moorish animal husbandry. Sugar (sukkar) was brought from the East and planted in Iberia; from Iberia it spread to the Canaries and then to the Americas, where it became the engine of plantation slavery — the sweet gift that the Villain turned into a wound. Lemon (laymun) was one of dozens of citrus trees the Moors planted. Acequia (as-saqiya: the water carrier) is still the technical term for gravity-fed irrigation ditches in New Mexico, Colorado, and California — the same infrastructure, the same word, nine centuries later. Adobe (at-tub: the brick) is still the construction material of the American Southwest, brought in the same continuous line.",
        questionPrompt: "Sort these Moorish agricultural words by what they represent: crops and food, or infrastructure.",
        revealHeadline: "The Moors planted a continent. The Villain moved in and forgot to say thank you.",
        revealBody: "Sugar's journey is the starkest story in this puzzle: the Moors brought sugarcane cultivation from the Middle East to Iberia as a crop for local consumption. The Portuguese took it to Madeira in the 15th century and then to Brazil in the 16th; the Spanish took it to the Caribbean. The plantation system that developed to cultivate it at industrial scale drove the transatlantic slave trade — an estimated 12 million people enslaved, with sugarcane cultivation as the leading economic driver. The word is Moorish. The crop is Moorish. The catastrophe that followed was the Villain's invention. Acequia irrigation networks in the American Southwest were brought by Spanish colonizers who learned them from the Moors; the communities that maintain them today often still use Arabic-origin vocabulary for the roles and rules of water management. The word, the system, and the community governance structure crossed three continents without breaking.",
    },
    // --- PUZZLE 3 (Tier 3): Luxury and craft ---
    {
        root: "Moorish luxury and craft",
        lang: "Arabic → Spanish / English (via Moorish Iberian court culture and trade)",
        meaning: "the aesthetic vocabulary the Moors left in music, textiles, and color",
        groups: [
            {
                id: "music",
                displayLabel: "music",
                solutionLabel: "The string instruments the Moors brought — and that became the foundation of European music",
                hint: "These two words name string instruments that trace directly back to a single Moorish ancestor.",
                hintLevel2: "One is 'the wood' — al-'ud, the rounded-body plucked instrument that crossed the Mediterranean. The other is what it became in European hands.",
                accepts: ["guitar", "lute"],
                related: ["oud", "mandolin"],
            },
            {
                id: "materials",
                displayLabel: "materials and aesthetics",
                solutionLabel: "Moorish trade goods and aesthetic vocabulary — the materials that dressed and decorated a continent",
                hint: "These three words are things the Moors brought in trade: a fossilized resin used in jewelry, a breathable textile that replaced wool, and the name for a deep red dye.",
                hintLevel2: "Think about prehistoric tree resin traded across three continents, the fiber that made breathable fabric possible in a world that wore chainmail, and the color of crushed kermes dye.",
                accepts: ["amber", "cotton", "crimson"],
                related: ["silk", "indigo"],
            },
        ],
        pool: ["guitar", "lute", "amber", "cotton", "crimson"],
        tension: "Guitar traces from Arabic qitara → Moorish Spain → Spanish guitarra → the six-string form that now defines popular music worldwide. Lute is al-'ud stripped of its article and transliterated — the rounded-body plucked instrument the Moors played in every palace from Córdoba to Seville, and the ancestor of nearly every European string instrument. The Villain couldn't ban the music; they had to learn to play it. Amber ('anbar) was a Moorish trade commodity carried from the Baltic coasts through Arab trading networks — a material so strange (fossilized tree resin that produces a static charge) that it was prized everywhere. Cotton (qutun) clothed a continent: the Moors had been weaving it for centuries; Europe had been wearing heavy wool and linen; cotton's arrival through Moorish trade changed domestic life at scale. Crimson (qirmizi, from the kermes insect dye) gave European textile trade its most coveted color — mastered by Moorish dyers and carried across the Mediterranean.",
        questionPrompt: "Sort these Moorish craft words by what domain they come from: music, or materials and aesthetics.",
        revealHeadline: "The Villain moved into the Moors' palaces, wore their clothes, and played their instruments. Then forgot.",
        revealBody: "The oud → lute transmission is one of the clearest lines of cultural inheritance in music history. The oud (al-'ud: the wood) was the defining instrument of Moorish court culture — a pear-shaped, fretless, eleven-string plucked instrument. When European musicians encountered it in al-Andalus, they transliterated the name (dropping the article al-) and adapted the form: the lute became fretted, the body slightly flattened, and the instrument spread through European courts. The guitar is a further evolution — qitara → gittern → guitarra → guitar — arriving at the six-string form in 18th-century Spain. Cotton's story has a dark parallel to sugar's: the Moors introduced the crop in a domestic cultivation context; European colonial powers industrialized it with enslaved labor in the American South. The word is Arabic. The atrocity was the Villain's construction. Crimson is still the name of the color, still the name of Harvard University's athletic color, still the color of ecclesiastical robes and military dress uniforms — none of which acknowledge the Moorish dyers who named it.",
    },
    // --- PUZZLE 4 (Tier 4): Governance and commerce ---
    {
        root: "Moorish governance and trade vocabulary",
        lang: "Arabic → Spanish / English (via Moorish administrative and naval systems)",
        meaning: "the administrative, military, and commercial vocabulary the Villain absorbed when they took power",
        groups: [
            {
                id: "command",
                displayLabel: "command and weapons",
                solutionLabel: "Moorish military vocabulary absorbed by European power structures",
                hint: "These two words come from the military and naval systems the Moors built — and the Villain borrowed the vocabulary when they took command.",
                hintLevel2: "One is the title 'commander of the seas,' adopted wholesale by the Aragonese navy. The other was originally a 'house of craft' before it became a weapons depot.",
                accepts: ["admiral", "arsenal"],
                related: ["vizier", "dragoon"],
            },
            {
                id: "commerce",
                displayLabel: "commerce and standards",
                solutionLabel: "Moorish commercial vocabulary — the rules, measures, and storehouses of trade",
                hint: "These three words come from the Moorish trade infrastructure — a unit of gem weight, a storehouse of goods, and a tax notice.",
                hintLevel2: "The weight of four grains, used to measure precious stones. The Arabic word for storehouses, which became both the periodical and the weapons chamber. The customs notification that became a trade weapon.",
                accepts: ["carat", "magazine", "tariff"],
                related: ["bazaar", "caravan"],
            },
        ],
        pool: ["admiral", "arsenal", "carat", "magazine", "tariff"],
        tension: "Admiral (amir al-bihar: commander of the seas) was adopted by the Aragonese crown in the 13th century when it needed a title for its new Mediterranean naval commanders — it used the Moorish word because the Moors had been commanding those seas for centuries. The title spread to every European navy. Arsenal (dar as-sina'ah: house of manufacturing) was first a craftsman's workshop in the Moorish administrative vocabulary; the Venetians transliterated it into arsenale and built the largest industrial complex in the pre-modern world around it — but the name was still Arabic. Carat (qirat: weight of four grains) was the Moorish jeweler's standard of precision, now used from Antwerp to Mumbai. Magazine (makhazin: storehouses) has three lives: storehouse of goods, storehouse of information (hence the periodical), and storehouse of ammunition — three different histories compressed into a word the Villain borrowed and used without attribution. Tariff (ta'rif: inventory/notification) was a trade document before it became a political weapon.",
        questionPrompt: "Sort these Moorish governance words by what system they came from: military command, or commerce.",
        revealHeadline: "The Villain took the offices. The Moorish vocabulary came with the furniture.",
        revealBody: "The admiral story is emblematic: the Aragonese crown didn't invent the title, they adopted it — because the Moors had already created the role, the rank, and the vocabulary for it. The same happened with tariff: the Moorish ta'rif was a trade notification document — a list of goods and their levies. When European port cities adopted the system, they kept the Arabic word. Magazine's triple life encodes three different moments of adoption: the commercial storehouse entered European trade vocabulary through Arabic; the printed periodical took the 'storehouse of information' metaphor in the 17th century; the ammunition storage sense developed in the 16th century when 'storehouse' was applied to gunpowder. Arsenal's transmission through Venice is documented precisely: the Venetian Arsenal (founded 1104) employed up to 16,000 workers at its peak and used assembly-line techniques to build warships — the name from Arabic, the institution from Moorish precedent, the claim from Venetian pride.",
    },
    // --- PUZZLE 5 (Tier 5): The linguistic residue ---
    {
        root: "Moorish linguistic residue in Spanish",
        lang: "Arabic → Spanish (surviving from 711–1492 Moorish occupation, still in daily use)",
        meaning: "Arabic words that live inside everyday Spanish — the residue the Reconquista could not erase",
        groups: [
            {
                id: "sacred_and_space",
                displayLabel: "prayer, place, and public life",
                solutionLabel: "Arabic words surviving in Spanish prayer, place names, and public life",
                hint: "These five words are embedded in the sacred, spatial, and civic vocabulary — a daily prayer, a capital city's patron saint, a royal palace, a neighborhood, and a board game.",
                hintLevel2: "A hidden Arabic prayer in every Spanish mouth. A cathedral named after the Moorish citadel it replaced. The palace the Reconquista moved into. The outer district that became the cultural center. The game of kings, still called by its Arabic name.",
                accepts: ["ojalá", "almudena", "alcázar", "barrio", "ajedrez"],
                related: ["alcalde", "alberca"],
            },
            {
                id: "craft_and_objects",
                displayLabel: "craft, objects, and journeys",
                solutionLabel: "Arabic words surviving in Spanish craft, material culture, and daily life",
                hint: "These five words are embedded in the objects, trades, and acts of daily life — the builder, the tile, the vessel, the journey, and the distilled spirit.",
                hintLevel2: "The mason who laid every brick in the Villain's cities. The glazed ceramic tile that decorates every wall from Lisbon to Seville. The cylindrical container. The Arabic word for 'journey' that became a colonial hunting expedition. The kohl powder that became alcohol.",
                accepts: ["albañil", "azulejo", "jar", "safari", "alcohol"],
                related: ["alguacil", "alquiler"],
            },
        ],
        pool: ["ojalá", "almudena", "alcázar", "barrio", "ajedrez", "albañil", "azulejo", "jar", "safari", "alcohol"],
        tension: "The Reconquista ended in 1492. The Arabic vocabulary did not end. Ojalá (wa sha Allah: and should God will it) is one of the most common expressions in Spanish and Latin American Spanish — a hidden Arabic prayer in every daily conversation, in every 'hopefully' and 'I wish.' Almudena names the patron saint and cathedral of Madrid: the Catedral de la Almudena was built on the site of a Moorish mosque, and it keeps the Arabic name al-mudayna (the citadel) even as it houses the most Roman Catholic of institutions. Alcázar (al-qasr: the castle) named the palaces the Reconquista rulers moved into, because the palaces were Moorish and more beautiful than anything they could build. Barrio (barri: outer/wild) originally named the peripheral, unwalled zone outside the city — pushed to the barrios by displacement, the Moors made the margins into cultural centers. Ajedrez is chess: ash-shatranj, which the Moors brought to Europe and every European court adopted as the game of strategy and intellect.",
        questionPrompt: "Sort these Arabic-origin Spanish words by where they appear in daily life.",
        revealHeadline: "Eight centuries of coexistence. Three centuries of erasure. The vocabulary didn't move.",
        revealBody: "Ojalá's survival is the most intimate: it is not a technical term or a product name — it is an expression of longing and hope that every Spanish speaker uses multiple times a day, that has crossed the Atlantic into every Spanish-speaking country, that has crossed language barriers into everyday English ('ojala' is used in some US border communities). It is a prayer from the Moors, still spoken daily in Madrid. Azulejo (az-zulayj: polished stone) tiles the walls of the Alhambra, the Alcázar of Seville, the train stations of Lisbon, the churches of colonial Brazil, the kitchens of contemporary homes — the technique, the word, and the aesthetic are all Moorish, and they are so deeply embedded in Iberian and Latin American visual culture that they are now considered definitively 'Spanish' or 'Portuguese.' Safari (safariya: a journey) traveled from Arabic through Swahili into the colonial vocabulary of East Africa — where British colonizers used it for hunting expeditions — and arrived in English as a word for leisure wildlife observation. The Moorish word for purposeful travel became the colonial word for trophy hunting. Alcohol's journey is similar: al-kuhl was a refined powder (kohl, used as eye makeup and medicine), the term extended to any refined distillate; European alchemists adopted it for spirits, removing all the healing and beauty associations in favor of intoxication.",
    },
];
// Provenance annotations
(0, sources_1.applyDatasetProvenance)(exports.MOORISH_ARABIC_POOL, "moorish_arabic");
