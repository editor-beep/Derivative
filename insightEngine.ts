// insightEngine.ts

import { FalseSystemConfig, LinguisticInsight, Lens } from "./types";
import { mulberry32 } from "./seed";
import { PREFIX_DATA } from "./lib/prefixMap";
import { SUFFIX_INDEX } from "./lib/suffixMap";
import {
  ROOT_POOL,
  MEANING_DRIFT_POOL, MEANING_DRIFT_POOL_2,
  FRENCH_VISUAL_FRAUD_POOL, FRENCH_DOUBLETS_POOL, FRENCH_FALSE_FRIENDS_POOL,
  NORSE_CONSONANT_POOL, NORSE_BORROWED_POOL,
  LOANWORD_EXTRACTION_POOL, EPONYM_POOL,
  SUPPLETIVE_EXTENDED_POOL, FOLK_ETYMOLOGY_POOL,
  TOPONYM_POOL,
} from "./src/data";

// ── SUPPLETIVE DATA ───────────────────────────────────────────────────────────

type SuppletiveEntry = {
  root: string;
  lang: string;
  meaning: string;
  groups: Array<{ id: string; label: string; accepts: string[]; related: string[] }>;
  pool: string[];
  tension: string;
  falseSystem?: FalseSystemConfig;
};

const SUPPLETIVE_POOL: SuppletiveEntry[] = [...SUPPLETIVE_EXTENDED_POOL,
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
  {
    root: "little / less / least", lang: "Old English + mixed comparatives", meaning: "false comparative system",
    groups: [
      { id: "size", label: "size", accepts: ["small", "little"], related: [] },
      { id: "quantity", label: "quantity", accepts: ["fewer", "less"], related: [] },
      { id: "intensity", label: "intensity", accepts: [], related: [] }
    ],
    pool: ["little", "less", "least", "small", "fewer", "minimum"],
    tension: "This puzzle offers clean categories, but the pattern fractures: English comparatives are stitched from multiple historical systems.",
    falseSystem: {
      decoys: ["least", "minimum"],
      breakMessage: "SYSTEM FRACTURE: the category model stops explaining the data.",
      revealTruth: "These words are not one semantic grid. They are overlapping leftovers from different historical strata."
    }
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

const SEMANTIC_POOL = [...MEANING_DRIFT_POOL, ...MEANING_DRIFT_POOL_2,
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

const COLLISION_POOL = [...FRENCH_DOUBLETS_POOL, ...NORSE_CONSONANT_POOL,
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

const DECEPTION_POOL = [...FRENCH_VISUAL_FRAUD_POOL, ...FOLK_ETYMOLOGY_POOL,
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

// ── IDIOM DATA ────────────────────────────────────────────────────────────────

const IDIOM_POOL = [
  {
    phrase: "nothing new under the sun",
    origin: "Hebrew Bible",
    lang: "Ecclesiastes → Latin Vulgate → English",
    fragments: ["nothing", "new", "under", "the", "sun"],
    tension: "An ancient theological claim about cyclical time — not progress — dressed as modern resignation",
    revealHeadline: "biblical repetition disguised as inevitability",
    revealBody: "From Ecclesiastes 1:9. What reads as world-weariness is a cosmological argument: time is circular, not linear. Progress is an illusion. The phrase carries a complete model of history inside six words."
  },
  {
    phrase: "time is money",
    origin: "Benjamin Franklin",
    lang: "18th-century capitalist metaphor → cliché",
    fragments: ["time", "is", "money"],
    tension: "A conceptual metaphor that hardwired capitalist value into the English language itself",
    revealHeadline: "capitalism embedded in the grammar of time",
    revealBody: "Franklin's 1748 'Advice to a Young Tradesman' didn't invent the idea — it crystallized it. Once time IS money, it can be spent, saved, wasted, or stolen. The metaphor restructures how English speakers experience duration."
  },
  {
    phrase: "bite the bullet",
    origin: "battlefield surgery",
    lang: "19th-century military → general English",
    fragments: ["bite", "the", "bullet"],
    tension: "A phrase born from pre-anesthetic surgery — endurance through literal agony — now used for minor inconveniences",
    revealHeadline: "surgical agony compressed into casual advice",
    revealBody: "Soldiers bit a bullet or leather strap during field surgery to endure pain without anesthetic. The idiom carries an entire pre-modern medical world. When we say it about filling out forms, we are invoking that world."
  },
  {
    phrase: "burning the midnight oil",
    origin: "pre-electric lamp work",
    lang: "17th-century English → common idiom",
    fragments: ["burning", "the", "midnight", "oil"],
    tension: "An idiom that makes no literal sense in the electric age — it preserves the memory of candle and lamp work",
    revealHeadline: "fossil of pre-electric labor",
    revealBody: "Oil lamps were the only light source for night work before electricity. The phrase dates to Francis Quarles (1635). Every time it is used, it conjures a vanished economy of light, scarcity, and physical effort."
  },
  {
    phrase: "break a leg",
    origin: "theater superstition",
    lang: "early 20th-century stage slang",
    fragments: ["break", "a", "leg"],
    tension: "Theater's inverted blessing — say the opposite of what you mean to fool the jealous spirits",
    revealHeadline: "apotropaic magic disguised as encouragement",
    revealBody: "Wishing good luck was considered dangerous — it could attract bad luck. So actors said the opposite. The phrase reveals a surviving layer of folk magic inside modern secular speech, operating below conscious awareness."
  },
  {
    phrase: "the whole nine yards",
    origin: "disputed — WWII ammunition belts",
    lang: "mid-20th-century American English",
    fragments: ["the", "whole", "nine", "yards"],
    tension: "One of the most hotly contested idioms in English — nobody knows where the nine yards came from",
    revealHeadline: "completeness encoded in an unknown unit",
    revealBody: "The most cited origin: WWII fighter pilots received 27 feet (nine yards) of ammunition belt — firing it all meant total commitment. Other theories cite coal, concrete, kilts, burial shrouds. The phrase survives despite — or because of — its opacity."
  },
  {
    phrase: "let the cat out of the bag",
    origin: "medieval market fraud",
    lang: "18th-century English",
    fragments: ["let", "the", "cat", "out", "of", "the", "bag"],
    tension: "A market scam where a cat was substituted for a piglet — revealing the trick became the idiom for revelation",
    revealHeadline: "a medieval con trick frozen into language",
    revealBody: "Unscrupulous traders would substitute a cat for a piglet in a sealed bag. If the buyer opened the bag — let the cat out — the deception was exposed. The phrase preserves a specific pre-industrial fraud."
  },
];

// ── BORROWED DATA ─────────────────────────────────────────────────────────────

const BORROWED_POOL = [...FRENCH_FALSE_FRIENDS_POOL, ...NORSE_BORROWED_POOL, ...LOANWORD_EXTRACTION_POOL, ...EPONYM_POOL,
  {
    root: "Arabic extraction",
    lang: "Arabic → English",
    meaning: "Arabic loan words",
    groups: [
      {
        id: "arabic", label: "Arabic stream (al- prefix pattern)",
        accepts: ["algebra", "algorithm", "alcohol", "cipher"],
        related: ["zero", "coffee"]
      },
      {
        id: "hindi", label: "Hindi / Sanskrit stream",
        accepts: ["bungalow", "shampoo", "jungle", "thug"],
        related: ["avatar", "pundit"]
      },
      {
        id: "nahuatl", label: "Nahuatl stream (Aztec)",
        accepts: ["chocolate", "tomato", "avocado"],
        related: ["coyote", "chili"]
      }
    ],
    pool: ["algebra", "algorithm", "alcohol", "cipher", "bungalow", "shampoo", "jungle", "thug", "chocolate", "tomato", "avocado"],
    tension: "Every word here is an extraction — English absorbing vocabulary from cultures it encountered through trade, conquest, and colonization"
  },
  {
    root: "colonized language flows",
    lang: "Global → English",
    meaning: "post-colonial borrowing",
    groups: [
      {
        id: "french", label: "Norman French conquest layer",
        accepts: ["beef", "pork", "mutton", "venison"],
        related: ["veal", "poultry"]
      },
      {
        id: "old_english", label: "Old English farming layer",
        accepts: ["cow", "pig", "sheep", "deer"],
        related: ["ox", "fowl"]
      },
      {
        id: "latin", label: "Latin ecclesiastical layer",
        accepts: ["scripture", "angel", "altar", "martyr"],
        related: ["saint", "bishop"]
      }
    ],
    pool: ["beef", "pork", "mutton", "venison", "cow", "pig", "sheep", "deer", "scripture", "angel", "altar", "martyr"],
    tension: "The Norman conquest split English vocabulary in two: Old English named the living animals, French named the meat — the language of the farmer vs. the language of the lord"
  },
  {
    root: "sinister / gauche / left",
    lang: "Latin + French + English",
    meaning: "left-handedness as stigma",
    groups: [
      {
        id: "stigma", label: "Words that encode left = wrong",
        accepts: ["sinister", "gauche", "awkward"],
        related: ["clumsy", "left-handed"]
      },
      {
        id: "origin", label: "Neutral / directional origin words",
        accepts: ["left", "port", "larboard"],
        related: ["leeward", "starboard"]
      },
      {
        id: "right", label: "Words that encode right = correct",
        accepts: ["right", "dexterous", "adroit"],
        related: ["correct", "proper"]
      }
    ],
    pool: ["sinister", "gauche", "awkward", "left", "port", "larboard", "right", "dexterous", "adroit"],
    tension: "Latin 'sinister' meant simply 'left' — the ideological drift to 'evil' happened as left-handedness was stigmatized across European cultures. The language records the prejudice."
  },
  {
    root: "body-as-machine metaphors",
    lang: "Industrial English",
    meaning: "mechanical body language",
    groups: [
      {
        id: "body_to_machine", label: "Body words applied to machines",
        accepts: ["arm", "leg", "neck", "shoulder"],
        related: ["foot", "rib"]
      },
      {
        id: "machine_to_body", label: "Machine words applied to bodies",
        accepts: ["running", "firing", "pumping", "drive"],
        related: ["pressure", "tension"]
      },
      {
        id: "shared", label: "Words that moved both directions",
        accepts: ["joint", "valve", "channel", "system"],
        related: ["network", "trunk"]
      }
    ],
    pool: ["arm", "leg", "neck", "shoulder", "running", "firing", "pumping", "drive", "joint", "valve", "channel", "system"],
    tension: "The Industrial Revolution didn't just use machine metaphors for bodies — it worked both ways. We now speak of the body's 'systems' and 'drive' as if it were built, not born."
  },
];

// ── HELPERS ───────────────────────────────────────────────────────────────────

function pick<T>(arr: T[], r: () => number): T {
  return arr[Math.floor(r() * arr.length)];
}

// When idx is provided (override mode) select that exact entry; otherwise use RNG.
function pickAt<T>(arr: T[], r: () => number, idx?: number): T {
  return idx !== undefined ? arr[idx % arr.length] : pick(arr, r);
}

const PRODUCTIVE_SUFFIX_KEYS = Object.keys(SUFFIX_INDEX).filter((k) => /^[a-z]+$/.test(k));

type MorphHit = {
  word: string;
  prefix?: string;
  prefixMeaning?: string;
  suffix?: string;
  suffixMeaning?: string;
};

function analyzeAffixes(word: string, root?: string): MorphHit {
  const lowerWord = word.toLowerCase();
  const lowerRoot = (root || "").toLowerCase().trim();
  const idx = lowerRoot ? lowerWord.indexOf(lowerRoot) : -1;

  let prefix: string | undefined;
  let prefixMeaning: string | undefined;
  let suffix: string | undefined;
  let suffixMeaning: string | undefined;

  if (idx > 0) {
    const candidatePrefix = lowerWord.slice(0, idx);
    const prefixInfo = (PREFIX_DATA as Record<string, { meaning: string }>)[candidatePrefix];
    if (prefixInfo) {
      prefix = candidatePrefix;
      prefixMeaning = prefixInfo.meaning;
    }
  }

  if (idx >= 0 && lowerRoot) {
    const candidateSuffix = lowerWord.slice(idx + lowerRoot.length);
    const suffixInfo = SUFFIX_INDEX[candidateSuffix];
    if (candidateSuffix && suffixInfo) {
      suffix = candidateSuffix;
      suffixMeaning = suffixInfo.meaning;
    }
  } else {
    const matchedSuffix = PRODUCTIVE_SUFFIX_KEYS.find((s) => lowerWord.endsWith(s));
    if (matchedSuffix) {
      suffix = matchedSuffix;
      suffixMeaning = SUFFIX_INDEX[matchedSuffix].meaning;
    }
  }

  return { word, prefix, prefixMeaning, suffix, suffixMeaning };
}

// ── BUILDERS ──────────────────────────────────────────────────────────────────

function buildRootInsight(r: () => number, idx?: number): LinguisticInsight {
  const d = pickAt(ROOT_POOL, r, idx);
  return {
    id: `root-${d.root}`,
    type: "ROOT",
    root: d.root,
    language: d.lang,
    words: d.targets,
    meaning: d.meaning,
    tension: d.tension,
    data: {
      targets: d.targets,
      required: d.required,
      metaphorSplit: (d as any).metaphorSplit,
      entryPaths: (d as any).entryPaths,
      impostors: (d as any).impostors,
      eras: (d as any).eras,
      decompositions: (d as any).decompositions,
    }
  };
}

function buildSuppletiveInsight(r: () => number, idx?: number): LinguisticInsight {
  const d = pickAt(SUPPLETIVE_POOL, r, idx);
  return {
    id: `suppletive-${d.root}`,
    type: "SUPPLETIVE",
    root: d.root,
    language: d.lang,
    words: d.pool,
    meaning: d.meaning,
    tension: d.tension,
    data: { groups: d.groups, pool: d.pool, falseSystem: d.falseSystem }
  };
}

function buildSemanticShiftInsight(r: () => number, idx?: number): LinguisticInsight {
  const d = pickAt(SEMANTIC_POOL, r, idx);
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

function buildCollisionInsight(r: () => number, idx?: number): LinguisticInsight {
  const d = pickAt(COLLISION_POOL, r, idx);
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

function buildDeceptionInsight(r: () => number, idx?: number): LinguisticInsight {
  const d = pickAt(DECEPTION_POOL, r, idx);
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

function buildFalseFamilyInsight(r: () => number, idx?: number): LinguisticInsight {
  const d = pickAt(FALSE_FAMILY_POOL, r, idx);
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

function buildIdiomInsight(r: () => number, idx?: number): LinguisticInsight {
  const d = pickAt(IDIOM_POOL, r, idx);
  // Shuffle fragments deterministically using the rng
  const shuffled = [...d.fragments].sort(() => r() - 0.5);
  return {
    id: `idiom-${d.phrase.slice(0, 12).replace(/\s/g, "-")}`,
    type: "IDIOM",
    root: d.phrase,
    language: d.lang,
    words: d.fragments,
    meaning: d.origin,
    tension: d.tension,
    data: {
      phrase: d.phrase,
      fragments: shuffled,
      origin: d.origin,
      revealHeadline: d.revealHeadline,
      revealBody: d.revealBody
    }
  };
}

function buildBorrowedInsight(r: () => number, idx?: number): LinguisticInsight {
  const d = pickAt(BORROWED_POOL, r, idx);
  return {
    id: `borrowed-${d.root.slice(0, 14).replace(/\s/g, "-")}`,
    type: "BORROWED",
    root: d.root,
    language: d.lang,
    words: d.pool,
    meaning: d.meaning,
    tension: d.tension,
    data: { groups: d.groups, pool: d.pool }
  };
}

function buildToponymInsight(r: () => number, idx?: number): LinguisticInsight {
  const d = pickAt(TOPONYM_POOL, r, idx);
  return {
    id: `toponym-${d.root.slice(0, 14).replace(/\s/g, "-")}`,
    type: "TOPONYM",
    root: d.root,
    language: d.lang,
    words: d.pool,
    meaning: d.meaning,
    tension: d.tension,
    data: { groups: d.groups, pool: d.pool }
  };
}

// ── LENSES ────────────────────────────────────────────────────────────────────

export const LENSES: Lens[] = [
  {
    id: "DEFAULT",
    label: "The Root",
    sublabel: "direct etymology",
    applicableTo: ["ROOT","SEMANTIC","SUPPLETIVE","GRIMM","COLLISION","PIE","DECEPTION","FALSE_FAMILY","PHANTOM_ROOT","IDIOM","BORROWED","TOPONYM"],
  },
  {
    id: "METAPHOR_DRIFT",
    label: "The Abstraction",
    sublabel: "when roots lose their body",
    applicableTo: ["ROOT", "BORROWED", "SEMANTIC", "TOPONYM"],
  },
  {
    id: "ETYMOLOGY_FILTER",
    label: "The Path",
    sublabel: "French vs. Latin vs. direct",
    applicableTo: ["ROOT", "COLLISION", "BORROWED", "TOPONYM"],
  },
  {
    id: "FALSE_TWIN",
    label: "The Impostor",
    sublabel: "looks related, isn't",
    applicableTo: ["ROOT", "PIE", "GRIMM"],
  },
  {
    id: "TEMPORAL_DEPTH",
    label: "The Strata",
    sublabel: "sorting by century of entry",
    applicableTo: ["ROOT", "PIE", "SEMANTIC"],
  },
  {
    id: "COMPOUND_HUNT",
    label: "The Buried Root",
    sublabel: "find it hiding inside the word",
    applicableTo: ["ROOT"],
  },
  {
    id: "REGISTER_SORT",
    label: "The Class Marker",
    sublabel: "formal vs. everyday vs. technical",
    applicableTo: ["BORROWED", "COLLISION", "FALSE_FAMILY", "TOPONYM"],
  },
  {
    id: "SOUND_TRACE",
    label: "The Sound Law",
    sublabel: "apply the shift rule",
    applicableTo: ["GRIMM", "PIE", "SUPPLETIVE"],
  },
];

// ── LENS APPLICATION ──────────────────────────────────────────────────────────

export function applyLens(
  insight: LinguisticInsight,
  lens: Lens,
  r: () => number
): LinguisticInsight {
  if (!lens.applicableTo.includes(insight.type)) {
    return { ...insight, lens: LENSES[0] };
  }

  const out: LinguisticInsight = { ...insight, lens, data: { ...insight.data } };

  switch (lens.id) {
    case "DEFAULT":
      return out;

    case "METAPHOR_DRIFT": {
      if (insight.type === "ROOT" && insight.data.metaphorSplit) {
        out.tension =
          `The root "${insight.root}" originally meant something physical. ` +
          insight.tension +
          ` — but meaning doesn't stay literal.`;
      } else if (insight.type === "SEMANTIC") {
        out.tension = `Meaning can drift toward the abstract. ` + insight.tension;
      }
      return out;
    }

    case "ETYMOLOGY_FILTER": {
      if (insight.type === "ROOT" && insight.data.entryPaths) {
        const paths = insight.data.entryPaths as Record<string, string>;
        const via_french = insight.words.filter(w => paths[w] === "via_french");
        const direct = insight.words.filter(w => paths[w] === "direct_latin");
        if (via_french.length > 0 && direct.length > 0) {
          out.data = {
            ...out.data,
            groups: [
              { id: "french", label: "Via Old French", accepts: via_french, related: [] },
              { id: "direct", label: "Direct Latin/Greek", accepts: direct, related: [] },
            ],
            pool: insight.words,
          };
          out.tension = insight.tension + ` — but not all of them took the same route into English.`;
        }
      }
      return out;
    }

    case "FALSE_TWIN": {
      if (insight.type === "ROOT" && insight.data.impostors?.length) {
        const impostors = insight.data.impostors as string[];
        const impostor = impostors[Math.floor(r() * impostors.length)];
        const pool = [...insight.words.slice(0, 5), impostor];
        out.data = { ...out.data, pool, impostor, targets: pool, required: [impostor] };
        out.tension =
          `Not every word that looks like it belongs to this family does. ` +
          `One is a false cousin — it only resembles "${insight.root}".`;
      }
      return out;
    }

    case "TEMPORAL_DEPTH": {
      if (insight.type === "ROOT" && insight.data.eras) {
        const eras = insight.data.eras as Record<string, string>;
        const eraOrder = ["Old English", "Middle English", "Early Modern English", "Modern English"];
        const timeline = Object.entries(eras)
          .sort((a, b) => eraOrder.indexOf(a[1]) - eraOrder.indexOf(b[1]))
          .map(([word, era]) => ({ era, meaning: word, blank: true }));
        out.data = { ...out.data, timeline };
        out.tension = insight.tension + ` — and these words arrived across a thousand years.`;
      }
      return out;
    }

    case "COMPOUND_HUNT": {
      if (insight.type === "ROOT") {
        const hits = insight.words
          .map((word) => analyzeAffixes(word, insight.root))
          .filter((hit) => Boolean(hit.prefix || hit.suffix));

        if (hits.length > 0) {
          const morphology = Object.fromEntries(
            hits.map((hit) => [
              hit.word,
              {
                prefix: hit.prefix,
                prefixMeaning: hit.prefixMeaning,
                suffix: hit.suffix,
                suffixMeaning: hit.suffixMeaning,
              },
            ])
          );

          out.data = {
            ...out.data,
            morphology,
            required: hits.map((hit) => hit.word).slice(0, 6),
            targets: insight.words,
          };
        }

        out.tension =
          `The root "${insight.root}" (${insight.meaning}) is hiding inside each of these words. ` +
          `Find it, and name what the prefix or suffix adds.`;
      }
      return out;
    }

    case "REGISTER_SORT": {
      if (insight.data.registers) {
        const regs = insight.data.registers as Record<string, string>;
        const formal = insight.words.filter(w => regs[w] === "formal");
        const everyday = insight.words.filter(w => regs[w] === "informal");
        const technical = insight.words.filter(w => regs[w] === "technical");
        if (formal.length > 0 || everyday.length > 0 || technical.length > 0) {
          out.data = {
            ...out.data,
            groups: [
              { id: "formal", label: "Formal / Literary", accepts: formal, related: [] },
              { id: "everyday", label: "Everyday Speech", accepts: everyday, related: [] },
              { id: "technical", label: "Technical / Specialist", accepts: technical, related: [] },
            ],
            pool: insight.words,
          };
          out.tension =
            insight.tension + ` — social history is encoded in which register each word landed in.`;
        }
      }
      return out;
    }

    case "SOUND_TRACE": {
      if (insight.type === "GRIMM") {
        out.tension = `A sound law connects these words. Apply the rule: ` + insight.tension;
      }
      return out;
    }

    default:
      return out;
  }
}

type Builder = (r: () => number, idx?: number) => LinguisticInsight;
type PuzzleBuilderType = Extract<
  LinguisticInsight["type"],
  | "ROOT"
  | "SUPPLETIVE"
  | "SEMANTIC"
  | "COLLISION"
  | "DECEPTION"
  | "FALSE_FAMILY"
  | "IDIOM"
  | "BORROWED"
  | "TOPONYM"
>;

type PuzzleSource = {
  builderType: PuzzleBuilderType;
  builder: Builder;
  entryCount: number;
  lensRule: (lens: Lens) => boolean;
};

export const PUZZLE_SOURCES: readonly PuzzleSource[] = [
  { builderType: "ROOT", builder: buildRootInsight, entryCount: ROOT_POOL.length, lensRule: (lens) => lens.applicableTo.includes("ROOT") },
  { builderType: "SUPPLETIVE", builder: buildSuppletiveInsight, entryCount: SUPPLETIVE_POOL.length, lensRule: (lens) => lens.applicableTo.includes("SUPPLETIVE") },
  { builderType: "SEMANTIC", builder: buildSemanticShiftInsight, entryCount: SEMANTIC_POOL.length, lensRule: (lens) => lens.applicableTo.includes("SEMANTIC") },
  { builderType: "COLLISION", builder: buildCollisionInsight, entryCount: COLLISION_POOL.length, lensRule: (lens) => lens.applicableTo.includes("COLLISION") },
  { builderType: "DECEPTION", builder: buildDeceptionInsight, entryCount: DECEPTION_POOL.length, lensRule: (lens) => lens.applicableTo.includes("DECEPTION") },
  { builderType: "FALSE_FAMILY", builder: buildFalseFamilyInsight, entryCount: FALSE_FAMILY_POOL.length, lensRule: (lens) => lens.applicableTo.includes("FALSE_FAMILY") },
  { builderType: "IDIOM", builder: buildIdiomInsight, entryCount: IDIOM_POOL.length, lensRule: (lens) => lens.applicableTo.includes("IDIOM") },
  { builderType: "BORROWED", builder: buildBorrowedInsight, entryCount: BORROWED_POOL.length, lensRule: (lens) => lens.applicableTo.includes("BORROWED") },
  { builderType: "TOPONYM", builder: buildToponymInsight, entryCount: TOPONYM_POOL.length, lensRule: (lens) => lens.applicableTo.includes("TOPONYM") },
];

for (const source of PUZZLE_SOURCES) {
  if (source.entryCount === 0) {
    throw new Error(`Puzzle source "${source.builderType}" has zero entries.`);
  }
}

// ── FLAT COMBO TABLE ──────────────────────────────────────────────────────────

export const POOL_FLAT_TABLE: Array<{ builderIdx: number; entryIdx: number; lensIdx: number }> =
  (() => {
    const result: Array<{ builderIdx: number; entryIdx: number; lensIdx: number }> = [];
    for (let b = 0; b < PUZZLE_SOURCES.length; b++) {
      const source = PUZZLE_SOURCES[b];
      for (let e = 0; e < source.entryCount; e++) {
        for (let l = 0; l < LENSES.length; l++) {
          if (source.lensRule(LENSES[l])) {
            result.push({ builderIdx: b, entryIdx: e, lensIdx: l });
          }
        }
      }
    }
    return result;
  })();

// ── EXPORT ────────────────────────────────────────────────────────────────────

export function generateInsight(
  seed: number,
  override?: { builderIdx: number; entryIdx: number; lensIdx: number }
): LinguisticInsight {
  if (override) {
    // Use a stable sub-seed for the RNG (needed for IDIOM fragment shuffle etc.)
    // Entry selection is handled by passing entryIdx directly to the builder.
    const r = mulberry32((seed ^ 0xFACEFEED) >>> 0);
    const insight = PUZZLE_SOURCES[override.builderIdx].builder(r, override.entryIdx);
    return applyLens(insight, LENSES[override.lensIdx], r);
  }

  // Legacy fallback: 1-D random selection (used when generator.ts has no override)
  const r = mulberry32(seed);
  const chosen = PUZZLE_SOURCES[Math.floor(r() * PUZZLE_SOURCES.length)];
  const insight = chosen.builder(r);
  const rLens = mulberry32((seed ^ 0xD1CE5EED) >>> 0);
  const lens = LENSES[Math.floor(rLens() * LENSES.length)];
  return applyLens(insight, lens, r);
}
