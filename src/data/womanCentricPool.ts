// womanCentricPool.ts
// Woman-centric words structured as BORROWED puzzle entries — one puzzle per
// original source tier.
//
//   Puzzle 1 — Tier 1: Reclaiming the Villain's labels (5 words)
//   Puzzle 2 — Tier 2: Sisterhood and autonomy (5 words)
//   Puzzle 3 — Tier 3: The labor of the Hero (4 words)
//   Puzzle 4 — Tier 4: Challenging the Villain's logic (5 words)
//   Puzzle 5 — Tier 5a: Divine and biological power (5 words)
//   Puzzle 6 — Tier 5b: Movement, language, and community (6 words)

import { applyDatasetProvenance } from "./sources";
import type { SortPoolEntry } from "../types";

export const WOMAN_CENTRIC_POOL: SortPoolEntry[] = [
  // --- PUZZLE 1 (Tier 1): Reclaiming the Villain's labels ---
  {
    root: "reclaiming the Villain's labels",
    lang: "Old English / Old French / Middle English → feminist reclamation",
    meaning: "slurs used to punish independent women — and turned back into identity",
    groups: [
      {
        id: "power_and_age",
        displayLabel: "punished for power or age",
        solutionLabel: "Punished for having power or surviving long enough to have wisdom",
        hint: "The Villain feared the woman who knew things and the woman who had outlived his control.",
        hintLevel2: "One of these words meant a magic-user; the other meant an old woman — both were used to declare a woman dangerous.",
        accepts: ["witch", "crone"],
        related: ["hag", "harpy"],
      },
      {
        id: "role_and_status",
        displayLabel: "punished for domestic defiance",
        solutionLabel: "Punished for stepping outside the Villain's domestic script",
        hint: "These three words punished women for being too assertive, too 'free,' or too unmarried — each started as a neutral description.",
        hintLevel2: "Housewife. Female dog. The woman who spins her own thread. All three became insults for the same crime: not needing the Villain.",
        accepts: ["hussy", "bitch", "spinster"],
        related: ["shrew", "harridan"],
      },
    ],
    pool: ["witch", "crone", "hussy", "bitch", "spinster"],
    tension:
      "Every word in this puzzle was a neutral description before it became a weapon. Witch (Old English wicce) named a practitioner of magic — the execution warrant was added later. Crone (Old French carogne) meant 'old ewe'; the Villain turned aging into a crime. Hussy was simply 'huswif' — housewife — before it was narrowed to mean a woman of loose morals, specifically because the Villain wanted domesticity to be an obligation, not a description. Bitch (Old English bicce) was a female dog; the insult applied the animal contempt to any woman who showed teeth. Spinster named a woman who spun thread for income — economic independence made into a social shame. The Hero's move: wear all five as badges.",
    questionPrompt: "Sort these reclaimed words by what kind of defiance they originally punished.",
    revealHeadline: "The Villain's dictionary was a warrant. The Hero tore it up and wore the pages.",
    revealBody:
      "Both groups represent the same fear in different registers. The first group punished women who operated outside the Villain's epistemology — who knew things he didn't sanction, who aged into authority he couldn't override. The second group punished women who operated outside his domestic contract — who earned their own keep, who refused to be polite about it, who didn't marry. Spinster is the sharpest example: it literally described a woman's skilled trade (spinning thread was one of the few incomes available to unmarried women in medieval England) and was turned into a taunt for self-sufficiency. The reclamation of all five words follows the same logic: if the Villain's vocabulary targets a quality, that quality is probably worth having.",
  },

  // --- PUZZLE 2 (Tier 2): Sisterhood and autonomy ---
  {
    root: "sisterhood and autonomy",
    lang: "Latin / Old English / 17th–20th century revival → feminist lexicon",
    meaning: "words that built the infrastructure of female authority — formal and informal",
    groups: [
      {
        id: "formal_structures",
        displayLabel: "formal structures of female power",
        solutionLabel: "Words that built or named formal systems of female authority",
        hint: "These words created or claimed institutional structures — a title, an organization, a role of governance.",
        hintLevel2: "Think about a title that severs a woman's name from her husband, a society named for 'sister,' and the female head of a family lineage.",
        accepts: ["ms.", "sorority", "matriarch"],
        related: ["chairwoman", "abbess"],
      },
      {
        id: "informal_networks",
        displayLabel: "informal networks of female survival",
        solutionLabel: "Words the Villain demonized as trivial — but that named women's actual survival infrastructure",
        hint: "These two words were dismissed as minor or unimportant. Their etymologies reveal they named serious, organized female networks.",
        hintLevel2: "One meant 'with-woman' — the person who stays beside you when you give birth. The other meant 'godparent' — a woman's closest companion, turned into 'idle talk.'",
        accepts: ["midwife", "gossip"],
        related: ["doula", "confidante"],
      },
    ],
    pool: ["ms.", "sorority", "matriarch", "midwife", "gossip"],
    tension:
      "Ms. arrived in the 17th century, was ignored, and was revived in 1972 by the feminist movement to sever the grammatical link between a woman's title and her marital status — Mrs. and Miss both encoded 'owned' or 'available'; Ms. encoded 'a person.' Sorority (Latin soror: sister) built the female version of the fraternities that held social and economic power on university campuses. Matriarch (Greek mētēr: mother) named the female governance structure the Villain tried to make invisible. Midwife (Old English mid-wif: with-woman) named the practitioner the Villain systematically criminalized and replaced with male physicians. Gossip (Old English godsib: godparent) named a woman's closest female confidante — the Villain demonized the network as 'idle chatter' because a well-connected woman was dangerous.",
    questionPrompt: "Sort these words by the kind of female structure they named.",
    revealHeadline: "Formal power and informal power — the Hero built both.",
    revealBody:
      "Ms. did something precise: it removed the question. Before it, every woman's title announced her relationship status to every person she met — Mrs. told you she belonged to someone; Miss told you she was available. Ms. removed that information from the public record of a woman's name, and in doing so asserted that the information was irrelevant. Gossip did the opposite of what the Villain claimed: rather than being trivial, it was the communication technology of communities that had no access to formal information channels. Old English godsib named a ritual relationship — the godparent, the spiritual kin — which became the term for close female friendship, which became demonized as 'women talking,' which became the word for rumor. Midwife's criminalization — achieved in 16th and 17th century Europe through both legal prosecution and the rise of 'man-midwifery' — erased centuries of female medical practice in a single institutional move.",
  },

  // --- PUZZLE 3 (Tier 3): The labor of the Hero ---
  {
    root: "naming the labor of the Hero",
    lang: "Compound English / feminist sociology / 20th-century metaphor → political vocabulary",
    meaning: "words that named work the Villain refused to count — and spaces the Villain called shameful",
    groups: [
      {
        id: "structural_labor",
        displayLabel: "naming the structural barriers and work",
        solutionLabel: "Words that named economic labor and structural barriers the Villain rendered invisible",
        hint: "These words made invisible economic realities legible — one named the unpaid work that keeps civilization running, the other named the barrier preventing advancement.",
        hintLevel2: "One is the work done inside the home that no paycheck acknowledges. The other is the transparent ceiling that women could see but not break through — until it had a name.",
        accepts: ["housework", "glass ceiling"],
        related: ["second shift", "pink collar"],
      },
      {
        id: "bodily_psychic_labor",
        displayLabel: "naming the bodily and psychic labor",
        solutionLabel: "Words that named psychic and bodily realities the Villain dismissed as weakness or shame",
        hint: "These words named things the Villain said were nothing — the invisible weight of managing other people's emotions, and the physical cycle the Villain called 'unclean.'",
        hintLevel2: "One named the management of feelings that women perform unpaid in every relationship. The other reclaimed a menstrual retreat from biblical curse to sacred space.",
        accepts: ["emotional labor", "red tent"],
        related: ["care work", "menstrual leave"],
      },
    ],
    pool: ["housework", "glass ceiling", "emotional labor", "red tent"],
    tension:
      "The Villain's strategy was to make the work invisible. Housework was 'just chores' — not a contribution to the economy, not countable labor, not worthy of wages or retirement. Emotional labor (Arlie Hochschild, 1983) named the psychic management work — calming a customer, managing a partner's moods, performing warmth for strangers — that women performed for free in every sphere. Glass ceiling (Marilyn Loden, 1978) named the invisible barrier: women could see the executive positions above them but could not reach them — the metaphor made the barrier real enough to name in a lawsuit. Red tent reclaimed menstruation from the Villain's 'unclean' designation to a space of female gathering, rest, and communal strength.",
    questionPrompt: "Sort these words by what kind of invisible reality they made nameable.",
    revealHeadline: "The Villain called it nothing. The Hero gave it a name. The name changed everything.",
    revealBody:
      "Naming is not just linguistic — it is legal and economic. Once housework had a name as 'labor,' economists could calculate its contribution to GDP (studies estimate unpaid domestic work represents 10–39% of national GDP depending on country). Once the glass ceiling had a name, it could be cited in discrimination cases. Emotional labor became the basis for arguments about differential workplace expectations: studies showed women were evaluated partly on 'warmth' and 'likeability' in ways men were not, and emotional labor gave a name to the unpaid tax. Red tent drew on the tradition documented in Anita Diamant's 1997 novel — the red tent in the biblical narrative as the women's space — and was reclaimed by feminist spirituality movements as a retreat and celebration rather than a quarantine. Four words. Four invisible realities made legal, debatable, and therefore fightable.",
  },

  // --- PUZZLE 4 (Tier 4): Challenging the Villain's logic ---
  {
    root: "challenging the Villain's logic",
    lang: "21st-century portmanteau / 1938 play / Black feminist theory / Greek mythology → political vocabulary",
    meaning: "words that named the Villain's specific tactics — and the frameworks that counter them",
    groups: [
      {
        id: "naming_tactics",
        displayLabel: "naming the tactics",
        solutionLabel: "Words that gave clinical names to the Villain's specific psychological weapons",
        hint: "These two words turned behaviors the Villain had always been able to deny into nameable, recognizable patterns.",
        hintLevel2: "One named the act of explaining someone's own expertise back to them. The other named the act of systematically making someone doubt their own perception of reality.",
        accepts: ["mansplaining", "gaslighting"],
        related: ["tone policing", "negging"],
      },
      {
        id: "naming_frameworks",
        displayLabel: "naming the frameworks",
        solutionLabel: "Words that built theoretical and creative frameworks to replace the Villain's narrative",
        hint: "These three words constructed alternative worldviews — a theory of overlapping oppressions, a feminism centered on Black women, and a reclaimed creative role.",
        hintLevel2: "One came from Black feminist legal theory. One came from Alice Walker. One came from Greek mythology — and reclaimed a passive role as an active one.",
        accepts: ["intersectional", "womanism", "the muse"],
        related: ["standpoint theory", "matrix of domination"],
      },
    ],
    pool: ["mansplaining", "gaslighting", "intersectional", "womanism", "the muse"],
    tension:
      "Mansplaining (from Rebecca Solnit's 2008 essay 'Men Explain Things to Me,' popularized as a portmanteau by others) named a behavior so common it had become invisible: a man assuming he knows more about a subject than the woman he is addressing, including her own subject of expertise. The name made the pattern undeniable. Gaslighting (from the 1938 play Gas Light) named systematic reality-distortion — a husband dims the lights and denies it until his wife doubts her own senses. Intersectional (Kimberlé Crenshaw, 1989) named what Black women already knew: that the axes of race and gender and class compound each other, and a feminism that addresses only gender misses the most targeted women. Womanism (Alice Walker, 1983) built a separate framework to center Black women's experience in the feminist movement. The Muse — Greek mythology's passive female inspiration — was reclaimed as the active creator who simply uses her own image.",
    questionPrompt: "Sort these words by whether they name a tactic being used against you or a framework for fighting back.",
    revealHeadline: "Name the weapon. Then build the counter.",
    revealBody:
      "Gaslighting became one of the most impactful vocabulary expansions of the 2010s: Merriam-Webster named it Word of the Year for 2022, and its adoption gave people in abusive relationships — domestic, political, institutional — a term that made their experience legible and arguable. Mansplaining did the same for intellectual authority, naming the assumption (not just the incident) so that it could be documented and challenged. Intersectional was coined in a specific legal context — a case where Black women were discriminated against by a policy that neither harmed Black men nor white women individually, making existing discrimination law inapplicable; Crenshaw's term named the gap in the law. Womanism (the w is deliberate — not 'feminism' with a modifier, but a new word for a new centering) established that the default subject of feminism could not be taken as white. The Muse's reclamation was simpler and older: the Greek Muses were divine, active, creative — the 19th-century Romantic tradition reduced the muse to a silent, passive woman inspiring a male artist. The Hero took the original back.",
  },

  // --- PUZZLE 5 (Tier 5a): Divine and biological power ---
  {
    root: "claiming the divine and the body",
    lang: "Greek mythology / Latin / Greek etymology → feminist reclamation",
    meaning: "words that claimed the supernatural, the prophetic, and the biological as female territory",
    groups: [
      {
        id: "myth_and_prophecy",
        displayLabel: "myth and prophetic power",
        solutionLabel: "Words that claimed mythological warfare and divine speech as female",
        hint: "These three words are from ancient sources — a warrior nation, a female deity, and the voice through which the divine speaks.",
        hintLevel2: "One is a legendary race of female warriors. One is a female version of God. One is the priestess who speaks the future.",
        accepts: ["goddess", "amazon", "oracle"],
        related: ["artemis", "pythia"],
      },
      {
        id: "body_and_lineage",
        displayLabel: "body and lineage",
        solutionLabel: "Words that reclaimed the biological and genealogical as female power",
        hint: "These two words reclaim the body's first threshold and the structure of descent — both of which the Villain had reframed as shame or irrelevance.",
        hintLevel2: "One names the first occurrence of menstruation as a beginning of power, not a curse. The other erases the Villain's surname from the genealogy entirely.",
        accepts: ["menarche", "matrilineal"],
        related: ["menstrual cycle", "matronymic"],
      },
    ],
    pool: ["goddess", "amazon", "oracle", "menarche", "matrilineal"],
    tension:
      "Goddess asserts the divine feminine in a world whose dominant theology offers only a Father — the Hero places herself in the mirror of divinity. Amazon (Greek mythological nation of all-female warriors, killed, wounded, or defeated in every male-authored source) was used by the Villain as a warning against female autonomy; the Hero uses the same word as a blueprint. Oracle names the woman through whom the divine speaks — the Pythia at Delphi was one of the most powerful figures in the ancient world, consulted before every major Greek military and political decision; the Villain's historians made her a curiosity. Menarche (Greek mēn: month + arkhē: beginning) reclaims the first occurrence of menstruation from the Villain's 'curse' to the Hero's threshold of power. Matrilineal (Latin māter: mother + linea: line) traces descent through the mother — which means the Villain's surname, the genealogical mark of ownership, is structurally irrelevant.",
    questionPrompt: "Sort these words by what kind of female power they claim.",
    revealHeadline: "The Villain told the myths. The Hero took them back.",
    revealBody:
      "The Amazon reclamation is instructive: in every Greek myth, Amazons are defeated. Heracles defeats Hippolyta. Achilles kills Penthesilea. Theseus abducts their queen. The stories are structured as proofs that female military power cannot be sustained against male heroism. The Hero reads the same texts and sees a civilization that had to be destroyed in every retelling because it kept suggesting something dangerous was possible. Goddess theology (the feminist spirituality movements of the 1970s–1980s, rooted partly in Marija Gimbutas's archaeology of pre-patriarchal cultures) asserted that the divine could be feminine — not a goddess-consort, but a primary deity. Oracle is still active: the Pythia at Delphi sat above a geologic fissure, inhaled vapors, and spoke the future that city-states used to make decisions about war, colonization, and succession. Menarche's clinical reclamation in feminist and adolescent health contexts repositions the physiological event from medical inconvenience to a recognized threshold — in some traditions, the subject of ceremony.",
  },

  // --- PUZZLE 6 (Tier 5b): Movement, language, and community ---
  {
    root: "movement, language, and community",
    lang: "1970s portmanteau / Latin / Old English / Spanish / Old English (compound) → feminist/activist lexicon",
    meaning: "words that renamed history, removed the Villain from the language, and built the fighting unit",
    groups: [
      {
        id: "linguistic_acts",
        displayLabel: "renaming and rewriting",
        solutionLabel: "Words that performed linguistic surgery on the Villain's version of the record",
        hint: "These three words are acts of renaming: the archive, the woman herself, and the bond of struggle.",
        hintLevel2: "One rewrites 'history' with a different pronoun. One removes 'men' from 'women' at the spelling level. One extends kinship beyond blood to every woman in the struggle.",
        accepts: ["herstory", "womyn", "sister"],
        related: ["sibling", "comrade"],
      },
      {
        id: "collective_power",
        displayLabel: "assembling the fighting unit",
        solutionLabel: "Words that named the collective forms of female resistance",
        hint: "These three words name the assembly, the tactic, and the role of the person who starts the fire.",
        hintLevel2: "One is the Villain's word for a conspiracy of witches — the Hero's word for a support group. One is guerrilla warfare applied to art and public space. One is the piece of burning wood that threatens to light everything.",
        accepts: ["coven", "guerrilla", "firebrand"],
        related: ["collective", "cadre"],
      },
    ],
    pool: ["herstory", "womyn", "sister", "coven", "guerrilla", "firebrand"],
    tension:
      "Herstory (a 1970s portmanteau that notes the coincidental presence of 'his' in 'history') rewrites the archive by changing the implied subject. The etymology of 'history' is actually Greek historía — no gendered pronoun — but the pun was politically effective: it named the absence, made the male default visible, and asserted a correction. Womyn removes 'men' from the center of 'women' at the orthographic level — a surgical strike. Sister extends biological kinship to every woman in the struggle: the Hero turns a group into an army of kin. Coven (Latin convenire: to come together, to assemble) was the Villain's word for a dangerous gathering; the Hero's word for a mutual-aid network. Guerrilla (Spanish guerra: war) was adopted by the Guerrilla Girls, the masked feminist art-activist collective formed in 1985 to expose sexism and racism in the art world. Firebrand names the role: the piece of burning wood, the person whose energy threatens to burn down the structures that trap everyone else.",
    questionPrompt: "Sort these words by what kind of feminist move they represent.",
    revealHeadline: "She renamed the archive. Then she assembled the coven. Then she lit the fire.",
    revealBody:
      "Herstory was dismissed by linguists (correctly — history has no gendered etymology) and embraced by activists (correctly — the point was the pattern, not the etymology). The pun worked as a consciousness-raising tool: it made visible the fact that most recorded history was, in practice, accounts of men's actions and decisions. Womyn's orthographic intervention is the most radical word in this puzzle: it does not argue or explain, it simply removes. The spelling appeared in women's liberation literature in the early 1970s and survives in festival and academic contexts as a marker of separatist or radical feminist orientation. Sister's transformation from biological to political kinship is one of the movement's most powerful rhetorical moves: it invokes obligation, protection, and loyalty without requiring any shared history. Coven's reclamation runs parallel to 'witch' — the Villain named the assembly as conspiracy, the Hero named it as community. The Guerrilla Girls' use of 'guerrilla' was precise: they wore gorilla masks, remained anonymous, and conducted hit-and-run critiques of museum acquisition policies and award nominations — tactics of asymmetric warfare applied to culture. Firebrand names both the weapon and the warrior: the person who carries the fire and is willing to be consumed by it.",
  },
];

// Provenance annotations
applyDatasetProvenance(WOMAN_CENTRIC_POOL, "woman_centric");
