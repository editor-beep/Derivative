// insightEngine.ts

import { LinguisticInsight } from "./types";
import { mulberry32 } from "./seed";

// ── ROOT DATA ─────────────────────────────────────────────────────────────────

const ROOT_POOL = [
  {
    root: "port", lang: "Latin", meaning: "carry",
    targets: ["portable", "import", "export", "transport", "report", "deport", "support", "portage", "porter", "deportment"],
    required: ["portable", "import", "export", "transport", "report"],
    tension: "One Latin root branches into a sprawling family across French and English"
  },
  {
    root: "spec", lang: "Latin", meaning: "look, see",
    targets: ["spectacle", "inspect", "expect", "aspect", "respect", "spectator", "perspective", "spectrum", "specimen", "special"],
    required: ["spectacle", "inspect", "expect", "aspect", "respect"],
    tension: "The Latin root for seeing secretly underlies dozens of English observation words"
  },
  {
    root: "duct", lang: "Latin", meaning: "lead",
    targets: ["conduct", "reduce", "produce", "introduce", "deduct", "abduct", "induct", "educate", "duct", "aqueduct"],
    required: ["conduct", "reduce", "produce", "introduce", "deduct"],
    tension: "Latin 'ducere' (to lead) marches through English disguised by French erosion"
  },
  {
    root: "scrib", lang: "Latin", meaning: "write",
    targets: ["describe", "prescribe", "inscribe", "manuscript", "script", "scripture", "subscribe", "transcript", "inscription", "circumscribe"],
    required: ["describe", "prescribe", "subscribe", "transcript", "inscription"],
    tension: "Latin 'scribere' enters English both directly and via Old French, creating doublets"
  },
  {
    root: "mit", lang: "Latin", meaning: "send",
    targets: ["submit", "transmit", "permit", "admit", "dismiss", "mission", "omit", "emit", "commit", "remit"],
    required: ["submit", "transmit", "permit", "admit", "omit"],
    tension: "The root 'mittere' (send) forks into -mit and -miss forms depending on tense"
  },
  {
    root: "vert", lang: "Latin", meaning: "turn",
    targets: ["convert", "revert", "divert", "invert", "versatile", "aversion", "subvert", "advertise", "controversy", "introvert"],
    required: ["convert", "revert", "divert", "invert", "subvert"],
    tension: "Latin 'vertere' hides in English words ranging from 'advertise' to 'versatile'"
  },
  {
    root: "graph", lang: "Greek", meaning: "write",
    targets: ["photograph", "biography", "diagram", "telegram", "autograph", "geography", "paragraph", "calligraphy", "typography", "monograph"],
    required: ["photograph", "biography", "diagram", "autograph", "geography"],
    tension: "Greek 'graphein' (to write) fused with -gram and -graph variants in English"
  },
  {
    root: "phon", lang: "Greek", meaning: "sound",
    targets: ["telephone", "microphone", "symphony", "phonetic", "euphony", "megaphone", "homophone", "cacophony", "xylophone", "saxophone"],
    required: ["telephone", "microphone", "phonetic", "symphony", "homophone"],
    tension: "Greek 'phone' (sound/voice) is often hidden under musical and technical terminology"
  },
];

// ── SUPPLETIVE DATA ───────────────────────────────────────────────────────────

const SUPPLETIVE_POOL = [
  {
    root: "go / went", lang: "Old English + Proto-Germanic", meaning: "motion",
    groups: [
      { id: "go", label: "go (present)", accepts: ["go", "goes", "going"], related: ["depart", "leave"] },
      { id: "went", label: "went (past)", accepts: ["went"], related: ["wended", "journeyed"] },
      { id: "gone", label: "gone (participle)", accepts: ["gone"], related: ["absent", "departed"] }
    ],
    pool: ["go", "goes", "going", "went", "gone", "depart", "leave"],
    tension: "English 'went' is borrowed from the verb 'wend' — a rare case of full stem suppletion"
  },
  {
    root: "good / better / best", lang: "Old English", meaning: "quality",
    groups: [
      { id: "pos", label: "positive", accepts: ["good", "well"], related: ["fine", "nice"] },
      { id: "comp", label: "comparative", accepts: ["better", "worse"], related: ["superior", "inferior"] },
      { id: "sup", label: "superlative", accepts: ["best", "worst"], related: ["optimal", "minimal"] }
    ],
    pool: ["good", "well", "better", "worse", "best", "worst", "fine", "nice"],
    tension: "'Better' and 'best' derive from a different root than 'good' — suppletive comparison"
  },
  {
    root: "be / am / was", lang: "Old English", meaning: "existence",
    groups: [
      { id: "pres", label: "present (be-root)", accepts: ["be", "being", "been"], related: ["exist", "remain"] },
      { id: "am_is", label: "present (es-root)", accepts: ["am", "is", "are"], related: ["seems"] },
      { id: "past", label: "past (wes-root)", accepts: ["was", "were"], related: ["existed"] }
    ],
    pool: ["be", "being", "been", "am", "is", "are", "was", "were", "exist", "remain"],
    tension: "English 'to be' fuses three distinct Proto-Germanic roots into one verb paradigm"
  },
];

// ── GRIMM DATA ────────────────────────────────────────────────────────────────

const GRIMM_POOL = [
  {
    root: "p→f shift", lang: "Proto-Indo-European → Germanic", meaning: "Grimm's Law",
    pairs: [
      { source: "Latin 'pater'", target: "father", note: "p→f" },
      { source: "Latin 'pisces'", target: "fish", note: "p→f" },
      { source: "Latin 'pes / pedis'", target: "foot", note: "p→f" },
      { source: "Latin 'plena'", target: "full", note: "p→f" },
    ],
    tension: "Germanic languages systematically shifted voiceless stops — Latin p became English f"
  },
  {
    root: "t→th shift", lang: "Proto-Indo-European → Germanic", meaning: "Grimm's Law",
    pairs: [
      { source: "Latin 'tres'", target: "three", note: "t→th" },
      { source: "Latin 'tu'", target: "thou", note: "t→th" },
      { source: "Latin 'tenuis'", target: "thin", note: "t→th" },
      { source: "Latin 'trans'", target: "through", note: "t→th" },
    ],
    tension: "Latin 't' became 'th' in all Germanic languages — a perfectly predictable sound law"
  },
  {
    root: "k→h shift", lang: "Proto-Indo-European → Germanic", meaning: "Grimm's Law",
    pairs: [
      { source: "Latin 'canis'", target: "hound", note: "k→h" },
      { source: "Latin 'cor / cordis'", target: "heart", note: "k→h" },
      { source: "Latin 'cornu'", target: "horn", note: "k→h" },
      { source: "Latin 'centum'", target: "hundred", note: "k→h" },
    ],
    tension: "Latin initial 'c' (k-sound) became 'h' in English — revealing deep shared ancestry"
  },
  {
    root: "d→t shift", lang: "Proto-Indo-European → Germanic", meaning: "Grimm's Law",
    pairs: [
      { source: "Latin 'duo'", target: "two", note: "d→t" },
      { source: "Latin 'decem'", target: "ten", note: "d→t" },
      { source: "Latin 'dens / dentis'", target: "tooth", note: "d→t" },
      { source: "Latin 'densus'", target: "thick", note: "d→t" },
    ],
    tension: "Proto-Indo-European voiced stops became voiceless in Germanic — d became t"
  },
];

// ── SEMANTIC DATA ─────────────────────────────────────────────────────────────

const SEMANTIC_POOL = [
  {
    root: "nice", lang: "Latin → Old French → English", meaning: "semantic drift",
    timeline: [
      { era: "Latin (nescius)", meaning: "ignorant, not knowing" },
      { era: "Old French (nice)", meaning: "foolish, simple", blank: true },
      { era: "Middle English", meaning: "wanton, lascivious" },
      { era: "Late Middle English", meaning: "precise, fastidious", blank: true },
      { era: "Modern English", meaning: "pleasant, agreeable" }
    ],
    tension: "The word 'nice' drifted from 'foolish' to 'pleasant' over 700 years"
  },
  {
    root: "silly", lang: "Old English → Middle English", meaning: "semantic drift",
    timeline: [
      { era: "Old English (sælig)", meaning: "blessed, happy" },
      { era: "Early Middle English", meaning: "innocent, harmless", blank: true },
      { era: "Late Middle English", meaning: "deserving of pity" },
      { era: "Early Modern English", meaning: "weak, feeble", blank: true },
      { era: "Modern English", meaning: "foolish, absurd" }
    ],
    tension: "'Silly' reversed from 'blessed' to 'foolish' through a chain of pity associations"
  },
  {
    root: "awful", lang: "Old English", meaning: "semantic drift",
    timeline: [
      { era: "Old English (egefull)", meaning: "inspiring awe or dread" },
      { era: "Middle English", meaning: "worthy of deep respect", blank: true },
      { era: "Early Modern English", meaning: "solemnly impressive" },
      { era: "Modern English", meaning: "extremely bad, terrible", blank: true },
    ],
    tension: "'Awful' shifted from 'awe-inspiring' to 'terrible' — a textbook pejoration"
  },
  {
    root: "villain", lang: "Latin → Old French → English", meaning: "semantic drift",
    timeline: [
      { era: "Latin (villanus)", meaning: "farm worker, serf" },
      { era: "Old French (vilain)", meaning: "peasant, commoner", blank: true },
      { era: "Middle English", meaning: "person of low social class" },
      { era: "Late Middle English", meaning: "wicked, depraved person", blank: true },
      { era: "Modern English", meaning: "deliberate scoundrel, antagonist" }
    ],
    tension: "Class prejudice transformed 'farm worker' into 'evil person' over 400 years"
  },
  {
    root: "bully", lang: "Dutch → English", meaning: "semantic drift",
    timeline: [
      { era: "Dutch (boel)", meaning: "lover, sweetheart" },
      { era: "Early English", meaning: "fine fellow, darling", blank: true },
      { era: "17th century", meaning: "blusterer, swaggerer" },
      { era: "18th century", meaning: "hired ruffian", blank: true },
      { era: "Modern English", meaning: "one who harms the weaker" }
    ],
    tension: "'Bully' inverted from a term of endearment into a term of menace"
  },
];

// ── COLLISION DATA ────────────────────────────────────────────────────────────

const COLLISION_POOL = [
  {
    root: "skirt / shirt", lang: "Old Norse + Old English", meaning: "cut",
    groups: [
      { id: "norse", label: "Old Norse stream (sk-)", accepts: ["skirt", "sky", "skill", "skin", "skull"], related: ["scrape", "scare"] },
      { id: "oe", label: "Old English stream (sh-)", accepts: ["shirt", "shore", "share", "shear", "shed"], related: ["shape", "shell"] }
    ],
    pool: ["skirt", "sky", "skill", "skin", "skull", "shirt", "shore", "share", "shear", "shed"],
    tension: "Norse and Old English forms of the same PIE root survived as doublets in English"
  },
  {
    root: "fragile / frail", lang: "Latin + Old French", meaning: "breakable",
    groups: [
      { id: "latin", label: "Learned Latin form", accepts: ["fragile", "fracture", "fragment", "fraction"], related: ["infraction"] },
      { id: "french", label: "Eroded French form", accepts: ["frail", "frailty", "afraid"], related: ["fraught"] }
    ],
    pool: ["fragile", "fracture", "fragment", "fraction", "frail", "frailty", "afraid", "fraught"],
    tension: "Latin 'fragilis' entered English twice: once via learned borrowing, once via French erosion"
  },
  {
    root: "guarantee / warranty", lang: "Spanish/Germanic + Old French", meaning: "pledge",
    groups: [
      { id: "span", label: "Spanish-Germanic stream", accepts: ["guarantee", "guarantor", "guard"], related: ["ward"] },
      { id: "french", label: "Old French stream", accepts: ["warranty", "warrant", "garrison"], related: ["warden"] }
    ],
    pool: ["guarantee", "guarantor", "guard", "warranty", "warrant", "garrison", "ward", "warden"],
    tension: "Both 'guarantee' and 'warranty' trace to Proto-Germanic *warian (protect) via different Romance paths"
  },
];

// ── PIE DATA ──────────────────────────────────────────────────────────────────

const PIE_POOL = [
  {
    root: "*pṓds", lang: "Proto-Indo-European", meaning: "foot",
    groups: [
      { id: "en", label: "English / Germanic", accepts: ["foot", "feet", "fetter", "fetch"], related: ["footprint"] },
      { id: "romance", label: "Latin / Romance", accepts: ["pedal", "pedestrian", "impede", "pedigree"], related: ["tripod"] },
      { id: "greek", label: "Greek", accepts: ["podium", "antipode", "octopus"], related: ["arthropod"] }
    ],
    pool: ["foot", "feet", "fetter", "fetch", "pedal", "pedestrian", "impede", "pedigree", "podium", "antipode", "octopus"],
    tension: "One PIE root for 'foot' spawned cognates from Sanskrit 'pāda' to English 'foot'"
  },
  {
    root: "*mātēr", lang: "Proto-Indo-European", meaning: "mother",
    groups: [
      { id: "en", label: "English / Germanic", accepts: ["mother", "material", "matrix"], related: ["maternal"] },
      { id: "latin", label: "Latin derivatives", accepts: ["matron", "matrimony", "matter"], related: ["materiel"] },
      { id: "other", label: "Other IE branches", accepts: ["mater", "madre", "mere"], related: ["meter"] }
    ],
    pool: ["mother", "material", "matrix", "matron", "matrimony", "matter", "mater", "madre", "mere"],
    tension: "The PIE word for mother is one of the most stable roots across all Indo-European languages"
  },
  {
    root: "*weid-", lang: "Proto-Indo-European", meaning: "see, know",
    groups: [
      { id: "en", label: "Germanic / English", accepts: ["wit", "wise", "wisdom", "witness"], related: ["wizard"] },
      { id: "latin", label: "Latin", accepts: ["vision", "video", "visit", "evident"], related: ["idea"] },
      { id: "greek", label: "Greek", accepts: ["idea", "history", "idol"], related: ["kaleidoscope"] }
    ],
    pool: ["wit", "wise", "wisdom", "witness", "vision", "video", "visit", "evident", "idea", "history", "idol"],
    tension: "PIE *weid- (to see/know) underlies both 'wise' and 'video' — sight and knowledge as one"
  },
];

// ── DECEPTION DATA ────────────────────────────────────────────────────────────

const DECEPTION_POOL = [
  {
    root: "island", lang: "Old English", meaning: "false etymology insertion",
    groups: [
      { id: "real", label: "True OE etymology (iegland)", accepts: ["island", "eyot", "ait"], related: ["isle"] },
      { id: "false", label: "Spurious Latin insertion (16th c.)", accepts: ["aisle", "isle", "islet"], related: ["island"] }
    ],
    pool: ["island", "eyot", "ait", "aisle", "isle", "islet"],
    tension: "'Island' had no 's' until scholars falsely connected it to Latin 'insula' in the 1500s"
  },
  {
    root: "pea", lang: "Middle English", meaning: "false back-formation",
    groups: [
      { id: "real", label: "Correct back-formations", accepts: ["pea", "cherry", "sherry", "statistic"], related: ["asset"] },
      { id: "false", label: "Original non-plural forms", accepts: ["pease", "cherise", "sherris", "statistics"], related: ["assets"] }
    ],
    pool: ["pea", "cherry", "sherry", "statistic", "pease", "cherise", "sherris", "statistics"],
    tension: "'Pea', 'cherry', and 'sherry' were all created by mistaking a final -s as a plural marker"
  },
];

// ── FALSE FAMILY DATA ─────────────────────────────────────────────────────────

const FALSE_FAMILY_POOL = [
  {
    root: "ear (two homonyms)", lang: "Old English", meaning: "accidental collision",
    groups: [
      { id: "hear", label: "ear (hearing organ) — OE ēare", accepts: ["ear", "eardrum", "earlap", "aural"], related: ["listen", "hearing"] },
      { id: "grain", label: "ear (of grain) — OE ēar", accepts: ["earworm", "spike", "kernel"], related: ["grain", "corn"] }
    ],
    pool: ["ear", "eardrum", "earlap", "aural", "earworm", "spike", "kernel", "listen", "hearing", "grain", "corn"],
    tension: "Two different Old English words — 'ēare' and 'ēar' — became identical in Modern English"
  },
  {
    root: "sound (three homonyms)", lang: "Latin + Old Norse + Old English", meaning: "triple collision",
    groups: [
      { id: "noise", label: "sound (noise) — Latin sonus", accepts: ["sonic", "resound", "resonance", "ultrasound"], related: ["noise"] },
      { id: "water", label: "sound (water channel) — Old Norse sund", accepts: ["fathom", "strait", "inlet"], related: ["swim"] },
      { id: "healthy", label: "sound (healthy) — Old English gesund", accepts: ["unsound", "soundly", "soundness"], related: ["healthy"] }
    ],
    pool: ["sonic", "resound", "resonance", "ultrasound", "fathom", "strait", "inlet", "unsound", "soundly", "soundness", "noise", "swim", "healthy"],
    tension: "Three unrelated words — from Latin, Old Norse, and Old English — collapsed into 'sound'"
  },
];

// ── HELPERS ───────────────────────────────────────────────────────────────────

function pick<T>(arr: T[], r: () => number): T {
  return arr[Math.floor(r() * arr.length)];
}

// ── BUILDERS ──────────────────────────────────────────────────────────────────

function buildRootInsight(r: () => number): LinguisticInsight {
  const d = pick(ROOT_POOL, r);
  return {
    id: `root-${d.root}`,
    type: "ROOT",
    root: d.root,
    language: d.lang,
    words: d.targets,
    meaning: d.meaning,
    tension: d.tension,
    data: { targets: d.targets, required: d.required }
  };
}

function buildSuppletiveInsight(r: () => number): LinguisticInsight {
  const d = pick(SUPPLETIVE_POOL, r);
  return {
    id: `suppletive-${d.root}`,
    type: "SUPPLETIVE",
    root: d.root,
    language: d.lang,
    words: d.pool,
    meaning: d.meaning,
    tension: d.tension,
    data: { groups: d.groups, pool: d.pool }
  };
}

function buildSemanticShiftInsight(r: () => number): LinguisticInsight {
  const d = pick(SEMANTIC_POOL, r);
  return {
    id: `semantic-${d.root}`,
    type: "SEMANTIC",
    root: d.root,
    language: d.lang,
    words: [d.root],
    meaning: d.meaning,
    tension: d.tension,
    data: { timeline: d.timeline, word: d.root }
  };
}

function buildCollisionInsight(r: () => number): LinguisticInsight {
  const d = pick(COLLISION_POOL, r);
  return {
    id: `collision-${d.root}`,
    type: "COLLISION",
    root: d.root,
    language: d.lang,
    words: d.pool,
    meaning: d.meaning,
    tension: d.tension,
    data: { groups: d.groups, pool: d.pool }
  };
}

function buildDeceptionInsight(r: () => number): LinguisticInsight {
  const d = pick(DECEPTION_POOL, r);
  return {
    id: `deception-${d.root}`,
    type: "DECEPTION",
    root: d.root,
    language: d.lang,
    words: d.pool,
    meaning: d.meaning,
    tension: d.tension,
    data: { groups: d.groups, pool: d.pool }
  };
}

function buildFalseFamilyInsight(r: () => number): LinguisticInsight {
  const d = pick(FALSE_FAMILY_POOL, r);
  return {
    id: `false-family-${d.root}`,
    type: "FALSE_FAMILY",
    root: d.root,
    language: d.lang,
    words: d.pool,
    meaning: d.meaning,
    tension: d.tension,
    data: { groups: d.groups, pool: d.pool }
  };
}

// ── EXPORT ────────────────────────────────────────────────────────────────────

export function generateInsight(seed: number): LinguisticInsight {
  const r = mulberry32(seed);

  const builders = [
    buildRootInsight,
    buildSuppletiveInsight,
    buildSemanticShiftInsight,
    buildCollisionInsight,
    buildDeceptionInsight,
    buildFalseFamilyInsight
  ];

  const chosen = builders[Math.floor(r() * builders.length)];
  return chosen(r);
}
