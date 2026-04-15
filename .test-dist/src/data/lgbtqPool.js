"use strict";
// lgbtqPool.ts
// LGBTQ vocabulary structured as BORROWED puzzle entries —
// words reclaimed from slurs, built in ballrooms, wrested from clinical pathology,
// and coined in the streets to name love, identity, and community on their own terms.
//
// Covers approximately 35 words across four puzzle entries:
//   Puzzle 1 — slurs reclaimed as identity, and coded language that was never slurs
//   Puzzle 2 — ballroom culture vocabulary (Harlem / NYC underground, 1960s–1980s)
//   Puzzle 3 — from the clinic's pathology to the movement's liberation
//   Puzzle 4 — match: terms to the historical moments that made them
Object.defineProperty(exports, "__esModule", { value: true });
exports.LGBTQ_POOL = void 0;
const sources_1 = require("./sources");
exports.LGBTQ_POOL = [
    // --- PUZZLE 1: Reclaimed, coded, and coined ---
    {
        root: "LGBTQ word reclamation and coded vocabulary",
        lang: "Middle English / Old French / American vernacular → LGBTQ lexicon",
        meaning: "words reclaimed from slurs and terms that functioned as secret code before they became open identity",
        groups: [
            {
                id: "reclaimed_slurs",
                displayLabel: "slurs reclaimed as identity",
                solutionLabel: "Words that were weapons — turned back into identity markers",
                hint: "These words were designed to humiliate. They got picked up off the floor and turned into flags.",
                hintLevel2: "Think about a word meaning 'strange' used as an umbrella; a word for a female same-sex person; a fairy-tale creature used as a slur; excessive affectation turned into art form; and a word for a weak boy turned into a celebration.",
                accepts: ["queer", "dyke", "fairy", "camp", "sissy"],
                related: ["faggot", "pansy"],
            },
            {
                id: "coded_vocabulary",
                displayLabel: "coded before it was open",
                solutionLabel: "Words that functioned as secret signals before they functioned as open identity",
                hint: "These words didn't start as slurs — they were codes, colors, and metaphors that a community used before it was safe to be direct.",
                hintLevel2: "Think about a color linked to androgyny and Oscar Wilde, a spectrum of visible light as pride symbol, a spatial metaphor for concealment, a word meaning 'joyful' rerouted through desire, and a word for 'pride' itself.",
                accepts: ["lavender", "rainbow", "closet", "gay", "pride"],
                related: ["violet", "spectrum"],
            },
        ],
        pool: ["queer", "dyke", "fairy", "camp", "sissy", "lavender", "rainbow", "closet", "gay", "pride"],
        tension: "The mechanism of slur-reclamation is precise: take the word used as a weapon, strip the shame from it, wear it at full volume, and the weapon stops working. Queer (from Old German twerh: athwart, across, oblique) was used as an insult for over a century before LGBTQ activists — particularly ACT UP and Queer Nation in the late 1980s — reclaimed it as a broad umbrella term. The logic was political: 'queer' was capacious enough to include everyone the straight world wanted to exclude, and saying it first took the power from the people who were saying it as an attack. Dyke, fairy, camp, sissy — each followed the same path: word deployed as a punishment, community deciding the punishment would be a badge. On the other side: coded language that was never slurs but was never meant to be understood by outsiders. Gay traveled through a centuries-long detour — Old French gai (joyful), then 19th-century association with prostitution and loose living, then Polari (the British gay underground argot), arriving by mid-20th century as the dominant term for male same-sex attraction. Lavender was the color before the rainbow: linked to androgyny, to Oscar Wilde's green carnation circle, to the 'lavender menace' insult Betty Friedan leveled at lesbian feminists. Closet named the structure of concealment before it named the act of leaving it.",
        questionPrompt: "Sort these LGBTQ words by how they entered the community's vocabulary.",
        revealHeadline: "The slur, reclaimed. The code, decoded. The community named itself.",
        revealBody: "Reclamation works because meaning is not fixed — it is fought over. Queer's reclamation in the early 1990s was deliberately confrontational: organizations like Queer Nation printed 'QUEER' in block letters on t-shirts specifically because the word was still in active use as an insult, and wearing it forced the attacker's vocabulary back into their own face. Dyke traveled the same road: from a term of contempt to a badge of unapologetic lesbian visibility — Dykes on Bikes leading Pride parades worldwide. Camp (from French se camper: to pose or posture) was the aesthetic of exaggerated artifice, of knowingly performing gender as theater; the Villain called it effeminacy, the Hero called it art. Susan Sontag codified it in 1964 ('Notes on Camp'), but it had been LGBTQ cultural vocabulary since the 19th century. The coded words had a different history: they weren't slurs in origin — they were the private language of a community that needed to communicate before it was safe to communicate. Lavender linked to androgyny through Victorian flower symbolism; the rainbow flag (Gilbert Baker, San Francisco, 1978) was designed as a symbol of diversity and joy — the entire visible spectrum as belonging.",
    },
    // --- PUZZLE 2: Ballroom gave the language ---
    {
        root: "ballroom culture vocabulary",
        lang: "African American and Latinx LGBTQ vernacular (Harlem / NYC, 1960s–1980s) → mainstream English",
        meaning: "words born in the underground ballroom scene that became mainstream — often without attribution",
        groups: [
            {
                id: "performance_verbs",
                displayLabel: "the verbs of ballroom",
                solutionLabel: "Performance verbs from the ballroom scene — things you do on the floor",
                hint: "These are the action words of ballroom: what you do when you walk, perform, compete, and survive.",
                hintLevel2: "Think about a dance inspired by model poses, how you present your absolute best, how you destroy the competition, how you deliver withering verbal critique, and how you throw shade without saying a word.",
                accepts: ["vogue", "serve", "slay", "read", "shade"],
                related: ["walk", "snatch"],
            },
            {
                id: "house_and_family",
                displayLabel: "house and family",
                solutionLabel: "Ballroom kinship and performance structure — the social architecture",
                hint: "These words describe the community structures — the chosen family units that provided survival, belonging, and competition.",
                hintLevel2: "Think about the competing units in ballroom, the matriarchal leader of each unit, the newer members, the authenticity a judge evaluates, and the art of embodying a gender not assigned at birth.",
                accepts: ["house", "mother", "children", "realness", "drag"],
                related: ["father", "legend"],
            },
        ],
        pool: ["vogue", "serve", "slay", "read", "shade", "house", "mother", "children", "realness", "drag"],
        tension: "Ballroom culture — the underground competitive performance scene built by Black and Latinx LGBTQ people in New York from the 1960s onward — gave mainstream English more words than it has been given credit for. Vogue was a dance form named after the fashion magazine: competitors would strike poses from high-fashion editorial spreads, turning the imagery of a world that excluded them into the vocabulary of a competition. Madonna's 1990 song 'Vogue' introduced it to a mainstream audience; the 1990 documentary Paris Is Burning documented the culture it came from. The verb 'to vogue' was already several decades old by then. Serve, slay, read, and shade had been in ballroom use since at least the 1970s. 'Serve' meant to present something with maximum impact and intention. 'Read' meant to critique someone's flaws with brutal precision — from 'reading between the lines' of someone's presentation. 'Shade' was the subtler version: contempt communicated through tone, expression, or implication rather than direct statement. The kinship vocabulary was the scene's infrastructure: houses were chosen families that provided the community support — food, shelter, affirmation — that biological families had often withdrawn. A 'mother' was the matriarchal leader and caretaker. 'Realness' was the performance category that judged how convincingly someone could 'pass' — and also, in a deeper sense, the community's measure of authenticity.",
        questionPrompt: "Sort these ballroom culture words by what function they served in the scene.",
        revealHeadline: "The ballroom built a whole world — and then mainstream culture absorbed the vocabulary without the credit.",
        revealBody: "Paris Is Burning (1990) documented a culture that had been running for decades without mainstream acknowledgment: competing houses, category walks, the kinship structures of chosen family. By the time RuPaul's Drag Race made 'slay,' 'read,' and 'shade' household words in the 2010s, these terms had been in active use in Black and Latinx LGBTQ communities for thirty to forty years. The mechanism of cultural extraction without attribution is familiar — the same process that took AAVE vocabulary mainstream (cool, hip, dig, bad-as-superlative) repeated here. Drag (from theatrical tradition: actors in drag were actors playing the opposite gender, the word possibly derived from 'd.r.a.g.' = Dressed As Girl, though this etymology is disputed) describes the art of gender performance and presentation, elevated in ballroom to competitive form. The house system — house of Xtravaganza, house of LaBeija, house of Ninja — provided chosen family to people whose biological families had abandoned them. The mother (and sometimes father) of a house was responsible for the well-being of the children: younger members learning the craft, the community, and the survival skills the scene encoded. Realness was the ultimate ballroom category: could you walk into the straight world and not be clocked? The skill was survival. The competition was documentation.",
    },
    // --- PUZZLE 3: From pathology to liberation ---
    {
        root: "LGBTQ medical pathologization and movement reclamation",
        lang: "19th-century medical Latin / German → clinical English → activist reclamation",
        meaning: "words the medical and legal system used to define and control LGBTQ people — and words the movement used to define themselves instead",
        groups: [
            {
                id: "clinic_vocabulary",
                displayLabel: "the clinic's vocabulary of control",
                solutionLabel: "Words the medical and legal establishment used to diagnose, criminalize, and treat LGBTQ people",
                hint: "These were clinical or legal terms used to define LGBTQ identities as disorders, crimes, or deviations requiring correction.",
                hintLevel2: "Think about the first scientific term for same-sex attraction, a 19th-century type theory, a legal term for non-normative sexuality, and a word meaning turned inward or inverted.",
                accepts: ["homosexual", "invert", "deviant", "sodomy"],
                related: ["perversion", "uranian"],
            },
            {
                id: "movement_vocabulary",
                displayLabel: "the movement's vocabulary of freedom",
                solutionLabel: "Words the movement built to replace the clinic's framing with its own",
                hint: "These are the words the liberation movements coined or repurposed to assert identity, visibility, and political power.",
                hintLevel2: "Think about leaving concealment, setting free from oppression, the state of being seen and acknowledged, the affirmation of self, and the annual public celebration.",
                accepts: ["out", "liberation", "visibility", "affirmation", "pride"],
                related: ["coming out", "solidarity"],
            },
        ],
        pool: ["homosexual", "invert", "deviant", "sodomy", "out", "liberation", "visibility", "affirmation", "pride"],
        tension: "'Homosexual' was coined in 1869 by Karl-Maria Kertbeny (a Hungarian activist, notably) in a pamphlet arguing against the criminalization of same-sex sexuality in Prussia — it was originally a defensive term. Within two decades the medical establishment had turned it into a diagnostic category: Richard von Krafft-Ebing's Psychopathia Sexualis (1886) classified same-sex attraction as a pathological condition. 'Invert' (from 19th-century sexology: a person whose sexual instinct was 'inverted' toward the same sex) framed LGBTQ identity as a developmental reversal. 'Deviant' was the sociological term; 'sodomy' the legal one — a category derived from the biblical city of Sodom, used to criminalize same-sex acts in Anglo-American law until Lawrence v. Texas (2003) in the United States. Against this medical and legal infrastructure, the liberation movements built their own vocabulary. 'Out' (to come out of the closet) named the act of self-disclosure as a political act — Harvey Milk campaigned explicitly on the logic that visibility was the political precondition for rights. 'Liberation' borrowed from anti-colonial movements — the Gay Liberation Front was named with full awareness of the parallel. 'Visibility' named the strategic imperative. 'Affirmation' named the therapeutic and personal one. 'Pride' inverted the Villain's shame narrative in a single word.",
        questionPrompt: "Sort these words by who coined them and what purpose they served.",
        revealHeadline: "The clinic named the disease. The movement named the cure.",
        revealBody: "The American Psychiatric Association listed homosexuality as a mental disorder in the Diagnostic and Statistical Manual (DSM) from 1952 until 1973. The removal wasn't scientific — it was political: years of disruption at APA conferences by activists, combined with the argument that the pathologization itself caused psychological harm, led to a vote. Homosexuality was declassified. 'Gender identity disorder' replaced it in different form until the DSM-5 (2013) renamed it 'gender dysphoria,' shifting the diagnosis from identity to distress. 'Invert' — the 19th-century sexological term — is now primarily historical; its heir is 'trans' (from Latin trans: across, beyond), coined in the late 20th century by activists who wanted a term that described movement and crossing rather than disorder or inversion. The liberation movement's vocabulary did the opposite of the clinic's: instead of locating the problem in the person, it located the problem in the system. 'Out' was a spatial metaphor repurposed as a political act — coming out of the closet was a declaration, a demand for recognition, an act of solidarity with others still inside. Harvey Milk's 1977 plea — 'Come out to your parents. Come out to your relatives. Come out to your friends. Come out to your neighbors' — was the clearest articulation of why visibility was the political strategy: a society that realized how many people it loved were LGBTQ could not maintain the fiction that they were strangers.",
    },
    // --- PUZZLE 4: MATCH — terms to the moments that made them ---
    {
        root: "LGBTQ vocabulary to historical moment",
        lang: "American English / activist vocabulary / cultural history → LGBTQ lexicon",
        meaning: "match each term to the historical moment, person, or context that gave it its meaning",
        groups: [],
        pool: [
            "stonewall",
            "vogue",
            "pink triangle",
            "lavender menace",
            "marsha p. johnson",
            "1969 Greenwich Village uprising — the rebellion that launched the modern movement",
            "a dance style born in Harlem ballroom competitions, named for a fashion magazine",
            "Nazi symbol of persecution — reclaimed as a symbol of resistance and memory",
            "Betty Friedan's 1969 slur for lesbian feminists — reclaimed immediately by those it targeted",
            "trans activist and drag queen credited as the first to throw a shot glass at Stonewall",
        ],
        tension: "These five terms are not just vocabulary — they are compressed historical events. Stonewall is both a bar and a riot: on June 28, 1969, police raided the Stonewall Inn in Greenwich Village, and the community fought back over three nights. The modern LGBTQ rights movement dates to that weekend. Vogue is a dance and a documentary and a culture: the competitive ballroom scene that Black and Latinx LGBTQ people built in New York from the 1960s onward. Pink triangle is an act of reclamation: gay men in Nazi concentration camps were forced to wear downward-pointing pink triangles; the movement inverted it (pointing upward) and made it a symbol of never again. Lavender menace was Betty Friedan's contempt — she tried to purge lesbians from the National Organization for Women in 1969, calling them a 'lavender menace'; activists arrived at the next conference wearing lavender t-shirts with the slogan printed on them. Marsha P. Johnson — Black trans activist, drag queen, co-founder of STAR (Street Transvestite Action Revolutionaries) — is credited in multiple first-hand accounts as one of the first people to resist the Stonewall raid.",
        questionPrompt: "Match each LGBTQ term to the historical moment, movement, or figure that gave it meaning.",
        revealHeadline: "These words aren't definitions. They're compressed history.",
        revealBody: "The match puzzle exposes how much history is packed into a single word. Stonewall names an event that became a threshold — before it, LGBTQ people had no legal organization, no political representation, no public life; within five years, there were hundreds of LGBTQ organizations across the United States. Pink triangle is a double history: first, the Nazi use of the badge to mark gay men for persecution in the camps; second, the AIDS activist reclamation — ACT UP's 'Silence = Death' campaign used the inverted pink triangle in the early 1980s, linking the government's inaction on AIDS to the historical silence that enabled the Holocaust. Lavender menace contains its own reclamation in the story: the insult was weaponized by a feminist leader against her own movement's members, and the targeted group's response — show up in lavender, own the menace — became a template for every subsequent reclamation. Marsha P. Johnson's place in the Stonewall narrative has been contested and reclaimed: earlier accounts minimized her role; later scholarship, memoir evidence, and first-hand accounts have restored her. The history of LGBTQ vocabulary is also a history of who gets to be visible in the archive.",
        matchPairs: [
            { source: "stonewall", target: "1969 Greenwich Village uprising — the rebellion that launched the modern movement" },
            { source: "vogue", target: "a dance style born in Harlem ballroom competitions, named for a fashion magazine" },
            { source: "pink triangle", target: "Nazi symbol of persecution — reclaimed as a symbol of resistance and memory" },
            { source: "lavender menace", target: "Betty Friedan's 1969 slur for lesbian feminists — reclaimed immediately by those it targeted" },
            { source: "marsha p. johnson", target: "trans activist and drag queen credited as the first to throw a shot glass at Stonewall" },
        ],
    },
];
// Provenance annotations
(0, sources_1.applyDatasetProvenance)(exports.LGBTQ_POOL, "lgbtq");
