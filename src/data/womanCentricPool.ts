// womanCentricPool.ts
// Woman-centric words structured as BORROWED puzzle entries —
// terms reclaimed, redefined, or coined by women to name their own experience,
// expose oppressive structures, and build community.
//
// Covers all 30 words across three sort puzzles:
//   Puzzle 1 — slurs turned weapons, and new self-naming
//   Puzzle 2 — naming invisible labor and collective networks
//   Puzzle 3 — language as sacred power

import { applyDatasetProvenance } from "./sources";
import type { SortPoolEntry } from "../types";

export const WOMAN_CENTRIC_POOL: SortPoolEntry[] = [
  // --- PUZZLE 1: Words weaponized — and reclaimed ---
  {
    root: "feminist word reclamation",
    lang: "Old English / Middle English / 20th-century coinage → feminist lexicon",
    meaning: "words used as weapons against women — and turned back into armor",
    groups: [
      {
        id: "slurs_reclaimed",
        displayLabel: "slurs turned armor",
        solutionLabel: "Words the Villain turned into slurs — the Hero wears as armor",
        hint: "These words were designed to shame or silence. They got reclaimed instead.",
        hintLevel2: "Think about words for an old woman, an unmarried woman, a dog, a sorceress, and a housewife — all turned into insults, then reclaimed.",
        accepts: ["witch", "crone", "hussy", "bitch", "spinster"],
        related: ["shrew", "harridan"],
      },
      {
        id: "self_naming",
        displayLabel: "built for self-definition",
        solutionLabel: "Words the Hero built to name herself on her own terms",
        hint: "These weren't twisted from something else — they were invented or revived to assert independence.",
        hintLevel2: "Think about a neutral title, an alternative spelling, a history rewritten, a female society, and a bond of struggle.",
        accepts: ["ms.", "womyn", "herstory", "sorority", "sister"],
        related: ["sibling", "comrade"],
      },
    ],
    pool: ["witch", "crone", "hussy", "bitch", "spinster", "ms.", "womyn", "herstory", "sorority", "sister"],
    tension:
      "The Villain's strategy was semantic: call a woman a witch, a hussy, a crone, and you mark her for punishment. The Hero's counter-strategy was also semantic: reclaim every slur, coin new titles, and rename the record. Witch reclaimed ancestral knowledge from its execution warrant. Hussy was once just 'housewife' — the Villain narrowed it to insult, the Hero widened it to defiance. Bitch, spinster, crone — all repatriated. Meanwhile, ms. surgically removed the Villain from her title. Womyn removed 'men' from her name. Herstory replaced his with hers in the archive. Each move was a land grab in language.",
    questionPrompt: "Sort these words by what kind of linguistic move they represent.",
    revealHeadline: "The dictionary was a weapon. Then the Hero picked it up.",
    revealBody:
      "Two strategies, side by side. The first: reclamation — taking back words designed to wound. Witch (Old English wicce) was a neutral knowledge-keeper before it became an execution charge; the Villain turned it into law, the Hero turned it back into identity. Bitch (Old English bicce, female dog) was an insult precisely because it suggested autonomy and aggression; reclaiming it names exactly the quality the Hero was being punished for having. The second strategy: coinage — building new vocabulary the Villain couldn't corrupt. Ms. appeared in the 17th century, languished, and was revived in 1972 to sever the grammatical link between a woman's name and her marital ownership. Womyn removed 'men' from the center of her language. Herstory rewrote the archive. These aren't just word games — they are territorial disputes.",
  },

  // --- PUZZLE 2: Naming the invisible ---
  {
    root: "naming invisible structures and networks",
    lang: "Old English / feminist sociology / 20th-century coinage → political vocabulary",
    meaning: "words that made the invisible visible — the labor, the network, the weapon",
    groups: [
      {
        id: "invisible_labor",
        displayLabel: "naming the unpaid work",
        solutionLabel: "Words that named labor the Villain refused to count",
        hint: "These words made invisible work visible — giving it a name meant giving it a value.",
        hintLevel2: "Think about domestic maintenance, the weight of emotional management, a barrier you can see through but can't pass, a sacred bleeding space, and the original birth attendant.",
        accepts: ["housework", "emotional labor", "glass ceiling", "red tent", "midwife"],
        related: ["care work", "second shift"],
      },
      {
        id: "female_network",
        displayLabel: "naming the network",
        solutionLabel: "Words the Villain demonized — but that named real female power",
        hint: "These words were dismissed as trivial or dangerous. They named the infrastructure of female survival.",
        hintLevel2: "Think about a word for a female friend turned into 'idle talk,' a female head of lineage, a gathering of witches, a masked activist collective, and someone who lights the spark.",
        accepts: ["gossip", "matriarch", "coven", "guerrilla", "firebrand"],
        related: ["circle", "collective"],
      },
    ],
    pool: ["housework", "emotional labor", "glass ceiling", "red tent", "midwife", "gossip", "matriarch", "coven", "guerrilla", "firebrand"],
    tension:
      "The Villain's second tool was erasure: make the labor invisible, demonize the network, pretend the infrastructure didn't exist. Housework wasn't 'real work' — until feminism named it as exactly that, unpaid and foundational. Emotional labor (Arlie Hochschild, 1983) named the psychic management that women performed for free in every domestic and professional relationship. Glass ceiling (Marilyn Loden, 1978) named the barrier you could see through but couldn't pass — the name made it real enough to litigate. Gossip's origin (Old English godsib — 'godparent') reveals what the Villain erased: it was a word for a woman's closest confidant, her community anchor, her information network. The Villain demonized it as 'idle chatter' precisely because the network was powerful. Coven (Latin convenire — to come together) was called a conspiracy. The Hero called it a support group.",
    questionPrompt: "Sort these words by what kind of invisible structure they made visible.",
    revealHeadline: "If you can name it, you can fight it.",
    revealBody:
      "The Hero's most powerful move was not the slogan — it was the noun. Housework could not be argued once it was named. Emotional labor (coined by sociologist Arlie Hochschild to describe flight attendants trained to manage passengers' feelings) became the framework for every unpaid psychic service women provided: the calendar management, the social smoothing, the maintenance of other people's self-esteem. Glass ceiling became the target. Red tent reclaimed the menstrual cycle from 'unclean' to 'sacred retreat' — the tent in the biblical narrative was a place of female gathering, not exile. Midwife (Old English mid-wif: 'with-woman') names the original birth attendant, whose knowledge the Villain systematically criminalized to install male physicians. Gossip named the network. Matriarch named the alternative hierarchy. Coven named the assembly. Guerrilla named the tactic. Firebrand named the role. Each word was a brick in a structure the Villain couldn't quite knock down.",
  },

  // --- PUZZLE 3: Language as sacred power ---
  {
    root: "language as sacred and intellectual power",
    lang: "Greek / Latin / Black feminist theory → feminist lexicon",
    meaning: "words that claimed divinity, named oppression's tactics, and rewrote the body",
    groups: [
      {
        id: "exposing_tactics",
        displayLabel: "exposing the oppressor's tactics",
        solutionLabel: "Words that named the Villain's specific psychological and structural tools",
        hint: "These words gave a clinical name to things women already knew were happening to them.",
        hintLevel2: "Think about a patronizing explanation, a psychological manipulation technique, a theory of overlapping oppressions, and a feminism centered on Black women's experience.",
        accepts: ["mansplaining", "gaslighting", "intersectional", "womanism"],
        related: ["tone policing", "respectability politics"],
      },
      {
        id: "claiming_the_sacred",
        displayLabel: "claiming the divine and the body",
        solutionLabel: "Words that claimed divinity, mythology, and the body as female territory",
        hint: "These words assert that the sacred, the mythological, and the biological all belong to the Hero.",
        hintLevel2: "Think about the Greek war-women, a female deity, the voice of the divine, the beginning of the cycle, the primordial creative force, and descent through the mother's line.",
        accepts: ["amazon", "goddess", "oracle", "menarche", "muse", "matrilineal"],
        related: ["artemis", "hera"],
      },
    ],
    pool: ["mansplaining", "gaslighting", "intersectional", "womanism", "amazon", "goddess", "oracle", "menarche", "muse", "matrilineal"],
    tension:
      "The Villain's third front was intellectual: claim expertise, monopolize the divine, and turn the body into a medical problem. Mansplaining (Rebecca Solnit, 2008, popularized from her essay 'Men Explain Things to Me') named the specific act of a man explaining a woman's own expertise back to her — not as arrogance but as structural assumption of male knowledge authority. Gaslighting (from the 1938 play Gaslight) named a tactic the Hero already knew but couldn't convict: systematic reality-distortion designed to make a woman doubt her own perceptions. Intersectional (Kimberlé Crenshaw, 1989) named what Black women already experienced — that the Villain attacks from multiple axes at once, and a feminism that addresses only gender while ignoring race leaves the most targeted women undefended. Meanwhile: goddess, oracle, amazon, muse — the Hero reclaimed every supernatural and mythological figure the Villain had cordoned off as decorative or dangerous. Menarche renamed the body's opening act from 'curse' to 'beginning of power.'",
    questionPrompt: "Sort these words by what kind of power they represent or expose.",
    revealHeadline: "The Hero took back the divine. Then she took back the diagnosis.",
    revealBody:
      "Two simultaneous reclamations. The first: naming the tactic. Gaslighting was named for a specific play — a husband systematically dims the gas lights in their home while denying the lights are changing, until his wife doubts her own perception. The word gave a clinical label to a pattern so common in domestic and political life that once named, it became immediately litigatable. Mansplaining did the same for intellectual authority — naming the assumption, not just the incident. Intersectional and womanism arrived from Black feminist theory to correct the default: mainstream feminism's implicit framing of 'woman' as a white, middle-class subject. The second reclamation: the sacred. Amazon (Greek mythology's all-female warrior nation) was told as a cautionary tale by the Villain — in the Hero's retelling, it is a blueprint. Goddess asserts the divine feminine in a world with only a Father God. Oracle claims speech-as-prophecy. Menarche (Greek mēn + arkhē: month + beginning) frames first menstruation as a threshold of power, not a medical inconvenience. Muse recasts the creative source as active, not decorative. Matrilineal erases the master's name from the genealogy.",
  },
];

// Provenance annotations
applyDatasetProvenance(WOMAN_CENTRIC_POOL, "woman_centric");
