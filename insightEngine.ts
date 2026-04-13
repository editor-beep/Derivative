// insightEngine.ts

import { LinguisticInsight, Lens } from "./types";
import { mulberry32 } from "./seed";
import { FRENCH_VISUAL_FRAUD_POOL, FRENCH_DOUBLETS_POOL, FRENCH_FALSE_FRIENDS_POOL } from "./src/data/frenchFakeouts";
import { NORSE_CONSONANT_POOL, NORSE_BORROWED_POOL } from "./src/data/norseCollisions";
import { LOANWORD_EXTRACTION_POOL } from "./src/data/loanwordExtraction";
import { EPONYM_POOL } from "./src/data/eponyms";
import { MEANING_DRIFT_POOL } from "./src/data/meaningDrift";
import { SUPPLETIVE_EXTENDED_POOL } from "./src/data/suppletiveParadigms";
import { FOLK_ETYMOLOGY_POOL } from "./src/data/folkEtymology";
import { ROOT_EXTENDED_POOL } from "./src/data/rootsExtended";
import { ROOT_EXTENDED_POOL_2 } from "./src/data/rootsExtended2";
import { MEANING_DRIFT_POOL_2 } from "./src/data/meaningDrift2";

// ── ROOT DATA ─────────────────────────────────────────────────────────────────

const ROOT_POOL = [...ROOT_EXTENDED_POOL, ...ROOT_EXTENDED_POOL_2,
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
  {
    root: "tract", lang: "Latin", meaning: "draw, pull",
    targets: ["attract", "contract", "distract", "extract", "retract", "tractor", "abstract", "subtract", "tractable", "intractable"],
    required: ["attract", "contract", "distract", "extract", "retract"],
    tension: "Latin 'trahere' (pull) hides in abstract words — 'abstract' literally means pulled away",
    impostors: ["track"],
    metaphorSplit: { literal: ["tractor", "extract"], abstract: ["abstract", "distract", "contract", "attract", "retract"] }
  },
  {
    root: "rupt", lang: "Latin", meaning: "break",
    targets: ["rupture", "interrupt", "corrupt", "erupt", "disrupt", "bankrupt", "abrupt", "irrupt"],
    required: ["rupture", "interrupt", "corrupt", "erupt", "disrupt"],
    tension: "Latin 'rumpere' (break) surfaces across English in both physical and social breakage",
    impostors: ["rip"]
  },
  {
    root: "press", lang: "Latin", meaning: "push, press",
    targets: ["express", "impress", "depress", "compress", "suppress", "oppress", "repress", "pressure", "impression", "depression"],
    required: ["express", "impress", "depress", "compress", "suppress"],
    tension: "Latin 'premere/pressare' (press down) generates both physical and emotional vocabulary",
    metaphorSplit: { literal: ["press", "pressure", "compress"], abstract: ["express", "impress", "depress", "suppress", "repress", "depression", "impression"] }
  },
  {
    root: "cept", lang: "Latin", meaning: "take, seize",
    targets: ["accept", "except", "intercept", "concept", "perceive", "receive", "deceive", "capable", "capture", "captive"],
    required: ["accept", "except", "intercept", "concept", "perceive"],
    tension: "Latin 'capere' bifurcates into -cept and -ceive forms — the same root in Latin and French dress",
    entryPaths: { accept: "direct_latin", except: "direct_latin", intercept: "direct_latin", concept: "direct_latin", perceive: "via_french", receive: "via_french", deceive: "via_french", capable: "direct_latin", capture: "direct_latin", captive: "direct_latin" }
  },
  {
    root: "lect", lang: "Latin", meaning: "choose, read",
    targets: ["collect", "select", "elect", "neglect", "lecture", "legible", "legend", "eligible", "intellectual", "diligent"],
    required: ["collect", "select", "elect", "lecture", "legible"],
    tension: "Latin 'legere' (choose, read) produces both selection vocabulary and reading vocabulary"
  },
  {
    root: "pos", lang: "Latin", meaning: "put, place",
    targets: ["compose", "impose", "expose", "propose", "deposit", "postpone", "position", "positive", "component", "opponent"],
    required: ["compose", "impose", "expose", "propose", "deposit"],
    tension: "Latin 'ponere' (place) splits into -pose and -pon- forms — the same root in two tense stems"
  },
  {
    root: "grad", lang: "Latin", meaning: "step, go",
    targets: ["graduate", "grade", "progress", "congress", "regress", "digress", "aggressive", "transgress", "gradual", "ingredient"],
    required: ["graduate", "progress", "congress", "regress", "aggressive"],
    tension: "Latin 'gradi' (to step) generates both academic progression and political assembly"
  },
  {
    root: "voc", lang: "Latin", meaning: "call, voice",
    targets: ["invoke", "provoke", "revoke", "evoke", "vocal", "vocation", "vocabulary", "advocate", "convoke", "equivocate"],
    required: ["invoke", "provoke", "revoke", "vocal", "vocation"],
    tension: "Latin 'vocare' (to call) generates both speech vocabulary and professional identity words"
  },
  {
    root: "terr", lang: "Latin", meaning: "earth, land",
    targets: ["territory", "terrain", "terrestrial", "terrarium", "inter", "subterranean", "Mediterranean"],
    required: ["territory", "terrain", "terrestrial", "inter", "subterranean"],
    tension: "Latin 'terra' (earth) connects burial, geography, and place — a root that literally grounds everything",
    impostors: ["terror"]
  },
  {
    root: "mal", lang: "Latin", meaning: "bad, ill",
    targets: ["malice", "malfunction", "malnutrition", "malevolent", "malign", "malformed", "malpractice", "malady", "malcontent"],
    required: ["malice", "malfunction", "malevolent", "malign", "malady"],
    tension: "Latin 'malus' (bad) is a prolific prefix — 'mal-' still forms new English compounds today"
  },
  {
    root: "bene", lang: "Latin", meaning: "good, well",
    targets: ["benefit", "benevolent", "benediction", "benefactor", "bonus", "bounty", "debonair", "boon"],
    required: ["benefit", "benevolent", "benediction", "benefactor", "bonus"],
    tension: "Latin 'bonus/bene' enters English twice: learned 'bene-' compounds and eroded French 'bon-' forms",
    entryPaths: { benefit: "direct_latin", benevolent: "direct_latin", benediction: "direct_latin", benefactor: "direct_latin", bonus: "direct_latin", bounty: "via_french", debonair: "via_french", boon: "via_french" }
  },
  {
    root: "cred", lang: "Latin", meaning: "believe, trust",
    targets: ["credit", "credible", "incredible", "creed", "credential", "discredit", "accredit", "credulous", "miscreant"],
    required: ["credit", "credible", "creed", "credential", "credulous"],
    tension: "Latin 'credere' (believe, trust) underlies both financial and theological vocabulary"
  },
  {
    root: "flu", lang: "Latin", meaning: "flow",
    targets: ["fluid", "fluent", "influence", "influx", "affluent", "fluctuate", "superfluous", "flux"],
    required: ["fluid", "fluent", "influence", "influx", "affluent"],
    tension: "Latin 'fluere' (flow) generates both literal flow words and metaphorical influence vocabulary",
    metaphorSplit: { literal: ["fluid", "flux", "fluctuate"], abstract: ["fluent", "influence", "affluent", "superfluous"] }
  },
  {
    root: "log", lang: "Greek", meaning: "word, reason",
    targets: ["logic", "dialogue", "prologue", "epilogue", "monologue", "catalogue", "analogy", "apology", "neologism", "eulogy"],
    required: ["logic", "dialogue", "prologue", "epilogue", "analogy"],
    tension: "Greek 'logos' (word, reason) enters English via learned borrowing and French -logue erosion"
  },
  {
    root: "path", lang: "Greek", meaning: "feeling, suffering",
    targets: ["sympathy", "empathy", "apathy", "antipathy", "pathology", "telepathy", "sociopath", "pathos"],
    required: ["sympathy", "empathy", "apathy", "pathology", "pathos"],
    tension: "Greek 'pathos' (feeling) generates both emotional and medical vocabulary — suffering and sensation from one root",
    metaphorSplit: { literal: ["pathology", "sociopath"], abstract: ["sympathy", "empathy", "apathy", "antipathy", "pathos", "telepathy"] }
  },
  {
    root: "chron", lang: "Greek", meaning: "time",
    targets: ["chronic", "chronicle", "chronology", "anachronism", "synchronize", "synchronous", "chronometer"],
    required: ["chronic", "chronicle", "chronology", "anachronism", "synchronize"],
    tension: "Greek 'khronos' (time) — the god literalized into academic and medical vocabulary"
  },
  {
    root: "morph", lang: "Greek", meaning: "form, shape",
    targets: ["morphology", "metamorphosis", "amorphous", "polymorphic", "morpheme", "anthropomorphic"],
    required: ["morphology", "metamorphosis", "amorphous", "polymorphic", "morpheme"],
    tension: "Greek 'morphe' (form) entered scientific English via German morphology in the 19th century"
  },
  {
    root: "therm", lang: "Greek", meaning: "heat",
    targets: ["thermometer", "thermal", "thermostat", "hypothermia", "thermodynamics", "geothermal"],
    required: ["thermometer", "thermal", "thermostat", "hypothermia", "thermodynamics"],
    tension: "Greek 'therme' (heat) produces only scientific compounds — it never naturalized into everyday English"
  },
  {
    root: "bio", lang: "Greek", meaning: "life",
    targets: ["biology", "biography", "antibiotic", "symbiosis", "biome", "biodiversity", "biopsy", "amphibian"],
    required: ["biology", "biography", "antibiotic", "symbiosis", "biome"],
    tension: "Greek 'bios' (life) compounds freely — every new life science adds new bio- words to English"
  },
  {
    root: "photo", lang: "Greek", meaning: "light",
    targets: ["photograph", "photosynthesis", "photon", "photogenic", "photography", "photoelectric", "photovoltaic"],
    required: ["photograph", "photosynthesis", "photon", "photogenic", "photography"],
    tension: "Greek 'phos/photos' (light) was already ancient when scientists borrowed it to name the photograph in 1839"
  },
  {
    root: "spect", lang: "Latin", meaning: "look at, behold",
    targets: ["inspect", "respect", "suspect", "aspect", "prospect", "retrospect", "introspect", "spectacular", "spectator", "speculate"],
    required: ["inspect", "respect", "suspect", "aspect", "prospect"],
    tension: "Latin 'spectare' (to watch) spawns a surveillance vocabulary — looking at, looking back, looking inward"
  },
  {
    root: "fract", lang: "Latin", meaning: "break",
    targets: ["fracture", "fragment", "fraction", "infraction", "refract", "fragile", "frail", "afraid"],
    required: ["fracture", "fragment", "fraction", "infraction", "refract"],
    tension: "Latin 'frangere' reaches English as 'fract-' (learned) and 'frail/afraid' (via French erosion)",
    entryPaths: { fracture: "direct_latin", fragment: "direct_latin", fraction: "direct_latin", infraction: "direct_latin", refract: "direct_latin", fragile: "direct_latin", frail: "via_french", afraid: "via_french" }
  },
];

// ── SUPPLETIVE DATA ───────────────────────────────────────────────────────────

const SUPPLETIVE_POOL = [...SUPPLETIVE_EXTENDED_POOL,
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
    data: { groups: d.groups, pool: d.pool }
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

// ── LENSES ────────────────────────────────────────────────────────────────────

export const LENSES: Lens[] = [
  {
    id: "DEFAULT",
    label: "The Root",
    sublabel: "direct etymology",
    applicableTo: ["ROOT","SEMANTIC","SUPPLETIVE","GRIMM","COLLISION","PIE","DECEPTION","FALSE_FAMILY","PHANTOM_ROOT","IDIOM","BORROWED"],
  },
  {
    id: "METAPHOR_DRIFT",
    label: "The Abstraction",
    sublabel: "when roots lose their body",
    applicableTo: ["ROOT", "BORROWED", "SEMANTIC"],
  },
  {
    id: "ETYMOLOGY_FILTER",
    label: "The Path",
    sublabel: "French vs. Latin vs. direct",
    applicableTo: ["ROOT", "COLLISION", "BORROWED"],
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
    applicableTo: ["BORROWED", "COLLISION", "FALSE_FAMILY"],
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
      if (insight.type === "ROOT" && insight.data.decompositions) {
        out.tension =
          `The root "${insight.root}" (${insight.meaning}) is hiding inside each of these words. ` +
          `Find it, and name what the prefix adds.`;
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

// ── FLAT COMBO TABLE ──────────────────────────────────────────────────────────

// Sizes must stay in sync with BUILDERS order: ROOT, SUPPLETIVE, SEMANTIC, COLLISION, DECEPTION, FALSE_FAMILY, IDIOM, BORROWED
const POOL_SIZES = [30, 3, 5, 3, 2, 2, 7, 23];

export const POOL_FLAT_TABLE: Array<{ builderIdx: number; entryIdx: number; lensIdx: number }> =
  (() => {
    const result: Array<{ builderIdx: number; entryIdx: number; lensIdx: number }> = [];
    for (let b = 0; b < POOL_SIZES.length; b++) {
      for (let e = 0; e < POOL_SIZES[b]; e++) {
        for (let l = 0; l < LENSES.length; l++) {
          result.push({ builderIdx: b, entryIdx: e, lensIdx: l });
        }
      }
    }
    return result;
  })();

// ── EXPORT ────────────────────────────────────────────────────────────────────

type Builder = (r: () => number, idx?: number) => LinguisticInsight;

const BUILDERS: Builder[] = [
  buildRootInsight,
  buildSuppletiveInsight,
  buildSemanticShiftInsight,
  buildCollisionInsight,
  buildDeceptionInsight,
  buildFalseFamilyInsight,
  buildIdiomInsight,
  buildBorrowedInsight,
];

export function generateInsight(
  seed: number,
  override?: { builderIdx: number; entryIdx: number; lensIdx: number }
): LinguisticInsight {
  if (override) {
    // Use a stable sub-seed for the RNG (needed for IDIOM fragment shuffle etc.)
    // Entry selection is handled by passing entryIdx directly to the builder.
    const r = mulberry32((seed ^ 0xFACEFEED) >>> 0);
    const insight = BUILDERS[override.builderIdx](r, override.entryIdx);
    return applyLens(insight, LENSES[override.lensIdx], r);
  }

  // Legacy fallback: 1-D random selection (used when generator.ts has no override)
  const r = mulberry32(seed);
  const chosen = BUILDERS[Math.floor(r() * BUILDERS.length)];
  const insight = chosen(r);
  const rLens = mulberry32((seed ^ 0xD1CE5EED) >>> 0);
  const lens = LENSES[Math.floor(rLens() * LENSES.length)];
  return applyLens(insight, lens, r);
}
