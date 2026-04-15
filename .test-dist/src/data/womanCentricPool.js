"use strict";
// womanCentricPool.ts
// Reference lexicon of woman-centric words — terms reclaimed, redefined, or
// coined by women to name their own experience, expose oppressive structures,
// and build community.
//
// These entries expose the hidden power beneath language, organized by thematic
// tier (reclamation, sisterhood, labor, challenging the Villain, biological Hero)
// and annotated with etymology, definition, cultural insight, and the
// Hero/Villain framing of the game.
Object.defineProperty(exports, "__esModule", { value: true });
exports.WOMAN_CENTRIC_POOL = void 0;
const sources_1 = require("./sources");
exports.WOMAN_CENTRIC_POOL = [
    // --- TIER 1: RECLAMATION OF THE "DEVIL" ---
    {
        word: "Witch",
        origin: "Old English (wicce)",
        definition: "A woman thought to have magic powers.",
        insight: "The Villain used this word to execute independent or knowledgeable women. The Hero reclaimed it as a symbol of ancestral wisdom and untamable power.",
        difficulty: "Easy",
    },
    {
        word: "Crone",
        origin: "Old French (carogne - 'carrion/old ewe')",
        definition: "An old woman.",
        insight: "The Villain used this to mark a woman as 'useless' once she aged. The Hero reclaimed it to honor the 'Wise Woman' stage of life.",
        difficulty: "Medium",
    },
    {
        word: "Hussy",
        origin: "Contraction of 'housewife' (huswif).",
        definition: "An impudent or immoral girl/woman.",
        insight: "Originally just meant a female head of household. The Villain twisted it into a slur to punish women who stepped outside the home; the Hero wears it to signal defiance.",
        difficulty: "Medium",
    },
    {
        word: "Bitch",
        origin: "Old English (bicce)",
        definition: "A female dog; a reclaimed term for a strong woman.",
        insight: "Used by the Villain to punish women who speak up. The Hero flipped the script: 'Bitch' became 'Being In Total Control of Herself.'",
        difficulty: "Easy",
    },
    {
        word: "Spinster",
        origin: "Middle English (one who spins thread).",
        definition: "An unmarried woman.",
        insight: "Originally a title of economic independence (a woman who could support herself). The Villain made it an insult; the Hero reclaims it as 'self-partnered' autonomy.",
        difficulty: "Medium",
    },
    // --- TIER 2: SISTERHOOD & AUTONOMY ---
    {
        word: "Ms.",
        origin: "17th Century / 20th Century revival.",
        definition: "A title used before a woman's name regardless of marital status.",
        insight: "A linguistic strike. The Hero refused to be defined by her 'owner' (Master or Mr.), creating a title that signaled her existence as an individual.",
        difficulty: "Easy",
    },
    {
        word: "Sorority",
        origin: "Latin (soror - 'sister')",
        definition: "A society for women.",
        insight: "While the Villain's 'Fraternities' held the power, the Hero built 'Sororities' to ensure that sisterhood was a recognized social force.",
        difficulty: "Easy",
    },
    {
        word: "Midwife",
        origin: "Old English (mid-wif - 'with-woman')",
        definition: "A person trained to assist women in childbirth.",
        insight: "The Hero's original medical science. It centers the experience of being 'with woman' rather than the Villain's clinical intervention.",
        difficulty: "Medium",
    },
    {
        word: "Gossip",
        origin: "Old English (god-sib - 'godparent/relative')",
        definition: "Casual conversation or reports about other people.",
        insight: "Originally meant a woman's close female friend. The Villain demonized female bonding as 'idle talk' to isolate them; the Hero knows it is a vital information network.",
        difficulty: "Medium",
    },
    {
        word: "Matriarch",
        origin: "Greek (mētēr - 'mother')",
        definition: "A woman who is the head of a family or tribe.",
        insight: "A direct challenge to the Villain's 'Patriarch.' It centers the Hero as the architect of lineage and community survival.",
        difficulty: "Easy",
    },
    // --- TIER 3: THE LABOR OF THE HERO ---
    {
        word: "Housework",
        origin: "Compound term",
        definition: "The work of cleaning, cooking, and maintenance.",
        insight: "The Villain calls this 'chores.' The Hero names it 'Unpaid Labor,' revealing the invisible engine that keeps the Villain's world running.",
        difficulty: "Easy",
    },
    {
        word: "Emotional Labor",
        origin: "Modern Feminist Sociology",
        definition: "The effort of managing emotions and relationships.",
        insight: "The Hero gave a name to the invisible 'weight' women carry, making the Villain's psychological expectations visible and debatable.",
        difficulty: "Medium",
    },
    {
        word: "Glass Ceiling",
        origin: "20th Century metaphor",
        definition: "An invisible barrier preventing women from rising in ranks.",
        insight: "A map of the Villain's hidden fortress. By naming the barrier, the Hero makes it something that can be shattered.",
        difficulty: "Easy",
    },
    {
        word: "Red Tent",
        origin: "Biblical/Metaphorical",
        definition: "A space for women to gather during menstruation.",
        insight: "The Villain called it 'unclean.' The Hero called it 'sacred retreat,' turning a physical cycle into a moment of communal strength.",
        difficulty: "Hard",
    },
    // --- TIER 4: CHALLENGING THE VILLAIN'S LOGIC ---
    {
        word: "Mansplaining",
        origin: "21st Century Portmanteau",
        definition: "When a man explains something to a woman in a patronizing way.",
        insight: "The Hero weaponized humor to identify the Villain's habit of assuming intellectual superiority. It's a tool of instant disarmament.",
        difficulty: "Easy",
    },
    {
        word: "Gaslighting",
        origin: "1938 Play 'Gas Light'",
        definition: "Manipulating someone into doubting their own sanity.",
        insight: "By naming this specific type of psychological warfare, the Hero gave every woman a shield against the Villain's lies.",
        difficulty: "Easy",
    },
    {
        word: "Intersectional",
        origin: "Black Feminist Theory (Kimberlé Crenshaw)",
        definition: "The overlap of various social identities (race, gender, class).",
        insight: "The Hero recognized that the Villain attacks from many angles at once. This word allows the Hero to fight on all fronts simultaneously.",
        difficulty: "Hard",
    },
    {
        word: "Womanism",
        origin: "Alice Walker (1983)",
        definition: "A form of feminism focused on the experiences of Black women.",
        insight: "The Hero realized the Villain's 'Feminism' sometimes excluded women of color. Womanism reclaimed the center of the struggle.",
        difficulty: "Hard",
    },
    {
        word: "The Muse",
        origin: "Greek Mythology",
        definition: "A woman who is a source of artistic inspiration.",
        insight: "The Villain tried to make the Hero a passive object. The Hero reclaimed the Muse as the 'active creator' who simply uses her own image.",
        difficulty: "Medium",
    },
    // --- TIER 5: THE BIOLOGICAL HERO ---
    {
        word: "Menarche",
        origin: "Greek (mēn - 'month' + arkhē - 'beginning')",
        definition: "The first occurrence of menstruation.",
        insight: "A clinical term reclaimed by the Hero to celebrate the beginning of the 'Cycle of Power' rather than a 'curse' from the Villain.",
        difficulty: "Hard",
    },
    {
        word: "Goddess",
        origin: "Old English / Latin",
        definition: "A female deity.",
        insight: "In a world with a 'Father God,' the Hero asserts the existence of the 'Mother,' reclaiming the divine as a mirror of herself.",
        difficulty: "Easy",
    },
    {
        word: "Amazon",
        origin: "Greek Mythology",
        definition: "A member of a legendary race of female warriors.",
        insight: "The Villain told stories of Amazons as 'monsters' to be defeated. The Hero tells them as blueprints for a world without the Villain.",
        difficulty: "Medium",
    },
    {
        word: "Matrilineal",
        origin: "Latin (māter - 'mother' + linea - 'line')",
        definition: "Tracing descent through the female line.",
        insight: "The Villain's greatest fear. It erases the 'Last Name' of the master and returns the identity to the womb.",
        difficulty: "Medium",
    },
    {
        word: "Herstory",
        origin: "Portmanteau (1970s)",
        definition: "History viewed from a female perspective.",
        insight: "A linguistic pun used to reveal that 'History' was usually just 'His Story.' The Hero rewrites the books to include herself.",
        difficulty: "Easy",
    },
    {
        word: "Coven",
        origin: "Latin (convenire - 'to come together')",
        definition: "A gathering of witches.",
        insight: "The Villain sees a conspiracy. The Hero sees a support group. It is the ultimate 'Unit' for the disenfranchised.",
        difficulty: "Medium",
    },
    {
        word: "Womyn",
        origin: "Alternative spelling (1970s)",
        definition: "A spelling of 'women' that avoids the 'men' suffix.",
        insight: "A literal surgical removal of the Villain from the Hero's name. A declaration of total linguistic independence.",
        difficulty: "Hard",
    },
    {
        word: "Sister",
        origin: "Old English (sweostor)",
        definition: "A woman or girl in relation to other daughters.",
        insight: "Beyond biology, the Hero uses this to describe every woman in the struggle. It turns a group into an army of kin.",
        difficulty: "Easy",
    },
    {
        word: "Guerrilla",
        origin: "Spanish (guerra - 'war')",
        definition: "Independent fighting (e.g., 'Guerrilla Girls').",
        insight: "The Hero uses the Villain's tactics of surprise and mask-wearing to expose the corruption of the Art and Power worlds.",
        difficulty: "Medium",
    },
    {
        word: "Firebrand",
        origin: "English (a piece of burning wood).",
        definition: "A person who is passionate about a particular cause.",
        insight: "The Hero is the 'spark' that threatens to burn down the Villain's oppressive structures. She is heat and light personified.",
        difficulty: "Medium",
    },
    {
        word: "Oracle",
        origin: "Latin (orare - 'to speak')",
        definition: "A priestess acting as a medium for divine advice.",
        insight: "The Villain seeks the Oracle's advice but fears her truth. The Hero is the one who speaks the future that the Villain cannot stop.",
        difficulty: "Hard",
    },
];
// Provenance annotations
(0, sources_1.applyDatasetProvenance)(exports.WOMAN_CENTRIC_POOL, "woman_centric");
