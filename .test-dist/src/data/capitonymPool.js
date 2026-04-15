"use strict";
// capitonymPool.ts
// Capitonym ("Identity Shifter") puzzles structured as BORROWED puzzle entries.
// A capitonym is a word that changes meaning based on capitalisation alone.
// In the "English Oppression" frame: the capital is the Bureau's branding iron —
// Empires, Churches, Months, and Gods stamped their mark on ordinary words.
// Strip the capital and you get the common person's version: the action, the
// substance, the quality, the mundane reality underneath the official name.
//
//   Puzzle 1 — Sort: "Nations in Disguise"            (12 words, 4 groups)
//   Puzzle 2 — Sort: "The Colonised Calendar & the Church's Grammar"
//                                                       (9 words, 3 groups)
//   Puzzle 3 — Match: "Strip the Capital"              (8 pairs)
Object.defineProperty(exports, "__esModule", { value: true });
exports.CAPITONYM_POOL = void 0;
const sources_1 = require("./sources");
exports.CAPITONYM_POOL = [
    // --- PUZZLE 1: Nations in Disguise ---
    {
        root: "capitonyms — nations in disguise",
        lang: "Proper noun → common noun (English orthographic drift, 15th–20th c.)",
        meaning: "words whose capital form names an empire, a god, a church, or a month — and whose lowercase form names the ordinary thing underneath",
        groups: [
            {
                id: "nations_as_objects",
                displayLabel: "nations reduced to objects",
                solutionLabel: "Country names absorbed into the commodity or craft they gave the world",
                hint: "Each of these words is a nation, lowercased. The nation's most famous export or craft became the common noun.",
                hintLevel2: "Poland gave its name to a shine. Turkey gave its name to a bird — or the bird gave it to the country; historians argue. China gave its name to ceramic ware. Morocco gave its name to fine goatskin leather.",
                accepts: ["polish", "turkey", "china", "morocco"],
                related: ["denim", "champagne"],
            },
            {
                id: "calendar_seized",
                displayLabel: "time commandeered by the calendar",
                solutionLabel: "Month names whose lowercase forms are active verbs or dignified adjectives — the calendar seized ordinary language",
                hint: "Each of these is a month of the year. Lowercase, it becomes something you do or something you are.",
                hintLevel2: "One means to walk in military step. One means to be permitted or to be possible. One means majestic, dignified — the quality an emperor wanted named after himself.",
                accepts: ["march", "may", "august"],
                related: ["lent", "april"],
            },
            {
                id: "church_and_state",
                displayLabel: "institutions that own an adjective",
                solutionLabel: "Political and religious proper nouns whose lowercase forms became general qualities — the institution colonised the adjective",
                hint: "Each of these is a political party or a church, capitalised. Lowercase, it becomes a general description of a personality or approach.",
                hintLevel2: "One means generous and open-minded. One means cautious and preserving. One means universal and wide-ranging — the Church wanted the whole world in that word.",
                accepts: ["liberal", "conservative", "catholic"],
                related: ["orthodox", "quaker"],
            },
            {
                id: "myth_and_person",
                displayLabel: "persons and places become concepts",
                solutionLabel: "Names of gods, poets, and people whose lowercase forms became common objects or achievements",
                hint: "Each of these is a named individual — a Roman god, an ancient Greek poet, or a person's given name. Lowercase, it names a substance, a sporting achievement, or a mundane document.",
                hintLevel2: "One names the winged messenger god — and a liquid metal. One names the first great Western poet — and a baseball home run. One is someone's first name — and an invoice, or a bird's beak.",
                accepts: ["mercury", "homer", "bill"],
                related: ["titan", "mosaic"],
            },
        ],
        pool: [
            "polish",
            "turkey",
            "china",
            "morocco",
            "march",
            "may",
            "august",
            "liberal",
            "conservative",
            "catholic",
            "mercury",
            "homer",
            "bill",
        ],
        tension: "Capitalisation is the Bureau's branding iron. Every word in this puzzle has been claimed: a nation stamped its name on leather and ceramics and birds; an emperor named a month after himself; a Church declared its reach was synonymous with 'universal'; gods lent their names to metals. Lowercase, those same letters name the polished floor, the cold dinner bird, the Sunday crockery, the month of marching soldiers, the freedom to say 'may I.' The Empire wrote itself into the alphabet. The common version persisted underneath.",
        questionPrompt: "Sort these lowercased words by the kind of authority their capital form names.",
        revealHeadline: "The Empire named everything. The lowercase stayed anyway.",
        revealBody: "Poland did not give its name to shoe polish — the Polish word for 'to polish' is not cognate — but the coincidence of sound was enough for English speakers to collapse the nation into the action, and the action into the nation. China (the nation, named from the Qin dynasty) and china (the porcelain) fused because Europe imported its finest ceramic ware from there; the product absorbed the place-name so thoroughly that we still set the Sunday table with 'china.' Morocco leather — the finest bookbinding and gloving leather in 18th-century Europe — came directly from Moroccan tanneries. Turkey the bird arrived in Europe through Ottoman trade routes, and English speakers called it the 'Turkey cock' and shortened it. When Julius Caesar's heir Augustus renamed the eighth month after himself — displacing the earlier name 'Sextilis' — he stamped imperial identity into the calendar at a molecular level. March comes from Mars, the Roman god of war, whose month opened the military season. May is more ambiguous: possibly the goddess Maia, possibly a month name older than Rome. Liberal and Conservative both started as adjectives describing temperaments, were adopted as party labels, and then the party labels partially colonised the adjective back — so that 'a liberal person' now carries the political party in its shadow. Catholic (Greek katholikos: universal, according to the whole) was the Church's territorial claim disguised as a description.",
    },
    // --- PUZZLE 2: The Colonised Calendar & the Church's Grammar ---
    {
        root: "capitonyms — time, place, and faith",
        lang: "Proper noun → common noun (Latin / Old French / Arabic → English orthographic drift)",
        meaning: "capitonyms sorted by the kind of authority that colonised them: a period of time, a place that became its own export, or a religious term that leaked into secular language",
        groups: [
            {
                id: "time_as_authority",
                displayLabel: "periods of time the powerful named and owned",
                solutionLabel: "Words whose capital form names an institutionally controlled period of time",
                hint: "Each of these names a span of time — a month, a Christian season, a formal assembly — that was named and regulated by an institution with authority over the calendar.",
                hintLevel2: "One is the month that names both a Roman emperor and the quality of majesty. One is the 40-day Christian fast before Easter — whose name overlaps with the past tense of 'to lend.' One is a legislative assembly whose most famous session was convened at a German city famous for worms.",
                accepts: ["august", "lent", "diet"],
                related: ["march", "may"],
            },
            {
                id: "place_becomes_craft",
                displayLabel: "places absorbed into their own exports",
                solutionLabel: "Country or region names that became the common noun for the craft or commodity they exported",
                hint: "These four words are all place names whose most famous export became the common word — the commodity outlasted the trade route.",
                hintLevel2: "One is a lacquering technique named for the island nation that perfected it. One is a fine North African leather. One is a West African coastal region that gave its name to a gold coin worth 21 shillings. One is a French wine region whose sparkling wine became the Empire's celebration drink.",
                accepts: ["japan", "morocco", "guinea", "champagne"],
                related: ["denim", "muslin"],
            },
            {
                id: "faith_becomes_quality",
                displayLabel: "religious proper nouns that leaked into secular adjectives",
                solutionLabel: "Names of religious institutions or figures whose lowercase form became a general secular quality",
                hint: "Each of these began as a religious proper noun — a church branch, a biblical figure, or a religious sect — whose lowercase form now describes a texture, an artistic style, or a personality.",
                hintLevel2: "One relates to Moses and Jewish law — and names an art form made of coloured tiles. One names the Religious Society of Friends — and the person who trembles. One was the Church's claim to universality — and the secular word for 'all-encompassing.'",
                accepts: ["mosaic", "quaker", "catholic"],
                related: ["orthodox", "christian"],
            },
        ],
        pool: [
            "august",
            "lent",
            "diet",
            "japan",
            "morocco",
            "guinea",
            "champagne",
            "mosaic",
            "quaker",
            "catholic",
        ],
        tension: "The capitonym encodes the colonial encounter. When a place name becomes a common noun — japan, morocco, champagne, guinea — it records the moment when a culture's product became so dominant in European commerce that English stopped treating the origin as a foreign proper noun and absorbed it as a native common one. Japan became japan (black enamel lacquer) because Japanese lacquerware was the finest available; European craftspeople imitated the technique and called it 'japanning.' Guinea became guinea (the gold coin) because the Royal African Company's coin was stamped with a small elephant to indicate its gold came from West Africa. The value of an enslaved person's life was priced in guineas. Lent (Old English lencten: spring, the lengthening days) collided in English spelling with the past tense of 'to lend,' and the religious season — 40 days of fasting regulated by the Church — borrowed the verb's ghost. Diet (Greek diaita: way of life, then Latin dieta: assembly) names a legislative body — the Diet of the Holy Roman Empire — and also your daily food intake. The word was wide enough to hold both.",
        questionPrompt: "Sort these lowercased words by the kind of authority that gave them their capital form.",
        revealHeadline: "The commodity outlasts the trade route's justice.",
        revealBody: "Champagne is the sharpest example of a place-name commodity: the Champagne region of northeastern France gave its name to sparkling wine, which became the mandatory beverage of European imperial celebration. The 'Champagne method' (méthode champenoise) was the technique; champagne was the product; 'Champagne' was the territory whose identity was permanently reduced, in the English imagination, to a fizzing glass. Guinea's trajectory is darker: the West African coast called Guinea (from the Soninke word 'ghana' or Berber 'aguinaw': land of the Black people) funded British colonial expansion through the Royal African Company, which minted guinea coins from 1663 to finance operations that included the slave trade. The coin is named for the territory; the territory was a site of extraction. Mosaic (from Moses, via Late Latin Mosaicus) names the art form of small tile-work because Byzantine church floors decorated with scenes from the Mosaic Law fused the technique with the name of the lawgiver. Quaker (Religious Society of Friends, c. 1650) was originally a taunt — opponents mocked founder George Fox's instruction to 'tremble at the word of the Lord' — and the Friends adopted it. The breakfast company appropriated it in 1877, turning a persecuted religious sect's identity into a branding asset.",
    },
    // --- PUZZLE 3: Match — "Strip the Capital" ---
    {
        root: "capitonyms — strip the capital",
        lang: "Proper noun → common noun (English orthographic drift, multiple centuries)",
        meaning: "match each lowercased capitonym to the hidden Imperial identity its capital form names",
        groups: [],
        pool: [
            "polish",
            "guinea",
            "morocco",
            "champagne",
            "lent",
            "mosaic",
            "titanic",
            "quaker",
            "the Central European nation — its workers polished the Empire's floors",
            "the West African coast — its gold funded the British coin worth 21 shillings",
            "the North African kingdom — its leather named the finest bookbinding craft",
            "the French wine region — its sparkling wine became the Empire's celebration liquid",
            "the 40-day Christian fast before Easter — the season that owns the verb 'to lend'",
            "relating to Moses and the Law — the tiles took his name when artisans copied Byzantine church floors",
            "the Greek Titans, and the famous shipwreck — both collapse the adjective into catastrophe",
            "the Religious Society of Friends — nicknamed for trembling before God, turned into a breakfast brand",
        ],
        tension: "The High Censor has stripped all capital letters. Eight words sit in front of you, lowercase, ordinary. Each one hides an empire, a nation, a church, a season, or a myth. Match the common word to the authority it once named — and ask why the authority needed to colonise the alphabet in the first place. Poland's nation-hood is buried inside a verb for polishing floors. Guinea's sovereignty is buried inside a coin whose minting financed the slave trade. The Ship of Dreams and the Children of the Titans share a single adjective: titanic.",
        questionPrompt: "The High Censor has stripped all capital letters. Match each lowercased word to its hidden Imperial identity.",
        revealHeadline: "Every lowercase word is a hidden empire. Name it.",
        revealBody: "Polish / Poland: the word 'to polish' (Old French poliss-, from Latin polire) is entirely unrelated to Poland etymologically — but English speakers heard the resemblance and the two meanings became entangled in popular usage, to the point where 'Polish' (relating to Poland) and 'polish' (to shine) are a standard example of the capitonym. The entanglement records England's view of Eastern European labour. Guinea / Guinea: the Royal African Company founded in 1660 minted coins from West African gold, and the coin — worth 21 shillings — took the name of the region. The guinea persisted as a unit of account in Britain until decimalisation in 1971; auctions, horse-racing, and medical fees were quoted in guineas as a mark of prestige. The prestige was built on extraction. Morocco / Morocco: Moroccan goatskin, processed with sumac tannin, was the finest bookbinding and gloving leather in Europe from the 17th century onward. 'Morocco' entered English as a noun meaning the leather. Titanic / Titanic: the Greek Titans were overthrown primordial gods — pre-Olympian, enormous, catastrophically powerful. The adjective 'titanic' (of titanic force) predates the ship by centuries; the ship took the name as a boast. When it sank on its maiden voyage in April 1912, it retrospectively validated every myth the name contained. Quaker / Quakers: George Fox's movement (founded c. 1647) was called 'Quakers' in mockery; the Friends adopted it with pride. In 1877 the American Quaker Oats Company used a Quaker man as its logo — selecting the religious identity for its connotations of honesty and simplicity — without any connection to the actual Religious Society of Friends.",
        matchPairs: [
            {
                source: "polish",
                target: "the Central European nation — its workers polished the Empire's floors",
            },
            {
                source: "guinea",
                target: "the West African coast — its gold funded the British coin worth 21 shillings",
            },
            {
                source: "morocco",
                target: "the North African kingdom — its leather named the finest bookbinding craft",
            },
            {
                source: "champagne",
                target: "the French wine region — its sparkling wine became the Empire's celebration liquid",
            },
            {
                source: "lent",
                target: "the 40-day Christian fast before Easter — the season that owns the verb 'to lend'",
            },
            {
                source: "mosaic",
                target: "relating to Moses and the Law — the tiles took his name when artisans copied Byzantine church floors",
            },
            {
                source: "titanic",
                target: "the Greek Titans, and the famous shipwreck — both collapse the adjective into catastrophe",
            },
            {
                source: "quaker",
                target: "the Religious Society of Friends — nicknamed for trembling before God, turned into a breakfast brand",
            },
        ],
    },
];
// Provenance annotations
(0, sources_1.applyDatasetProvenance)(exports.CAPITONYM_POOL, "capitonym");
