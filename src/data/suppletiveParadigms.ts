import { applyDatasetProvenance } from "./sources";
// src/data/suppletiveParadigms.ts
// Suppletive Paradigms seed data — SUPPLETIVE_POOL entries.
// Skips entries already in insightEngine.ts: go/went, good/better/best, be/am/was.
// Each entry has groups[] (paradigm slot buckets) and pool[] (all forms flattened).

export const SUPPLETIVE_EXTENDED_POOL = [
  // ── ADJECTIVE IDENTITY THEFT ─────────────────────────────────────────────────
  {
    root: "little / less / least",
    lang: "Old English",
    meaning: "small quantity",
    groups: [
      {
        id: "positive",
        label: "positive (little)",
        accepts: ["little", "small", "tiny"],
        related: ["few", "slight"],
      },
      {
        id: "comparative",
        label: "comparative (less) — alien root",
        accepts: ["less", "lesser", "fewer"],
        related: ["minus", "smaller"],
      },
      {
        id: "superlative",
        label: "superlative (least) — alien root",
        accepts: ["least", "minimum", "fewest"],
        related: ["minimal", "slightest"],
      },
    ],
    pool: ["little", "less", "least", "small", "fewer", "minimum"],
    tension:
      "Less and least have no genetic connection to little — they come from a separate Old English root meaning 'to be small.' Little is an orphan in its own paradigm.",
  },
  {
    root: "much / many / more / most",
    lang: "Old English",
    meaning: "large quantity",
    groups: [
      {
        id: "positive_mass",
        label: "positive mass (much)",
        accepts: ["much", "great"],
        related: ["plentiful", "abundant"],
      },
      {
        id: "positive_count",
        label: "positive count (many)",
        accepts: ["many", "numerous"],
        related: ["several", "myriad"],
      },
      {
        id: "comparative",
        label: "comparative — shared alien root",
        accepts: ["more"],
        related: ["additional", "extra"],
      },
      {
        id: "superlative",
        label: "superlative — shared alien root",
        accepts: ["most"],
        related: ["maximum", "majority"],
      },
    ],
    pool: ["much", "many", "more", "most", "great", "numerous"],
    tension:
      "Much and many are entirely different words pressed into service as a single paradigm. They share 'more' and 'most' as a common comparative/superlative — two roots borrowing one ladder.",
  },
  {
    root: "near / nearer / next",
    lang: "Old English",
    meaning: "proximity",
    groups: [
      {
        id: "positive",
        label: "positive (near)",
        accepts: ["near", "close", "nigh"],
        related: ["nearby", "adjacent"],
      },
      {
        id: "comparative",
        label: "comparative (nearer)",
        accepts: ["nearer", "closer"],
        related: ["more proximate"],
      },
      {
        id: "superlative",
        label: "superlative (next) — disguised survivor",
        accepts: ["next", "nearest", "nighest"],
        related: ["closest", "immediately following"],
      },
    ],
    pool: ["near", "nearer", "next", "close", "closest", "nigh"],
    tension:
      "Next is the superlative of near — the nighest. We've forgotten the family tie so completely that 'next' now means 'following in sequence,' not 'closest in space.'",
  },
  {
    root: "old / elder / eldest",
    lang: "Old English",
    meaning: "age",
    groups: [
      {
        id: "regular",
        label: "regularized modern forms",
        accepts: ["old", "older", "oldest"],
        related: ["ancient", "senior"],
      },
      {
        id: "suppletive",
        label: "suppletive Germanic survivors (formal/family use)",
        accepts: ["elder", "eldest"],
        related: ["elders", "firstborn"],
      },
    ],
    pool: ["old", "older", "oldest", "elder", "eldest"],
    tension:
      "Elder and eldest are the authentic Old Germanic comparative forms — 'older' and 'oldest' are modern regularizations that invaded the paradigm. Elder survived only in family and religious contexts.",
  },
  {
    root: "far / farther / further",
    lang: "Old English",
    meaning: "distance",
    groups: [
      {
        id: "physical",
        label: "physical distance (farther)",
        accepts: ["far", "farther", "farthest"],
        related: ["remote", "distant"],
      },
      {
        id: "metaphorical",
        label: "metaphorical extension (further) — originally a separate adverb",
        accepts: ["further", "furthermore", "furthest"],
        related: ["additional", "moreover"],
      },
    ],
    pool: ["far", "farther", "farthest", "further", "furthermore", "furthest"],
    tension:
      "Further began its life as a separate adverb meaning 'more forward' — it invaded the 'far' paradigm and won the metaphorical register. We say 'farther along the road' but 'further discussion.'",
  },
  {
    root: "late / later / last",
    lang: "Old English",
    meaning: "time position",
    groups: [
      {
        id: "positive",
        label: "positive (late)",
        accepts: ["late", "tardy"],
        related: ["delayed", "behind"],
      },
      {
        id: "comparative",
        label: "comparative (later)",
        accepts: ["later", "afterward"],
        related: ["subsequently", "following"],
      },
      {
        id: "superlative",
        label: "superlative (last) — heavily contracted",
        accepts: ["last", "latest", "final"],
        related: ["ultimate", "terminal"],
      },
    ],
    pool: ["late", "later", "last", "latest", "final", "tardy"],
    tension:
      "Last is just 'latest' worn down to a single syllable — 'lat-est' contracted to 'last.' We've forgotten it's a superlative and now treat 'last' and 'latest' as separate, slightly different words.",
  },
  // ── PRONOUN FRANKENSTEINS ────────────────────────────────────────────────────
  {
    root: "she / her",
    lang: "Old English",
    meaning: "third person singular feminine",
    groups: [
      {
        id: "nominative",
        label: "nominative (she) — from demonstrative seo",
        accepts: ["she"],
        related: ["her", "hers"],
      },
      {
        id: "oblique",
        label: "oblique forms (her/hers) — original pronoun root",
        accepts: ["her", "hers", "herself"],
        related: ["she", "hire"],
      },
    ],
    pool: ["she", "her", "hers", "herself"],
    tension:
      "She is not related to her — it came from an Old English demonstrative 'seo' (that/the) that moved in to replace the original feminine pronoun 'heo,' which kept being confused with 'he.'",
  },
  {
    root: "I / me / my",
    lang: "Proto-Germanic",
    meaning: "first person singular",
    groups: [
      {
        id: "nominative",
        label: "nominative (I) — from PIE root for 'here'",
        accepts: ["I"],
        related: ["ego", "ich"],
      },
      {
        id: "oblique",
        label: "oblique (me) — from PIE root for 'self'",
        accepts: ["me", "myself"],
        related: ["moi", "mich"],
      },
      {
        id: "possessive",
        label: "possessive (my/mine)",
        accepts: ["my", "mine"],
        related: ["mein", "mon"],
      },
    ],
    pool: ["I", "me", "my", "mine", "myself"],
    tension:
      "I and me come from entirely different Proto-Indo-European roots. 'I' pointed to 'here (where I am)'; 'me' pointed to 'this self.' Every first-person pronoun in English is a philosophical composite.",
  },
  {
    root: "this / these",
    lang: "Old English",
    meaning: "proximal demonstrative",
    groups: [
      {
        id: "singular",
        label: "singular (this)",
        accepts: ["this"],
        related: ["that", "here"],
      },
      {
        id: "plural",
        label: "plural (these) — suffix from different demonstrative family",
        accepts: ["these"],
        related: ["those", "there"],
      },
    ],
    pool: ["this", "these", "that", "those"],
    tension:
      "These was built by adding a plural suffix from a different demonstrative family onto the singular 'this.' And 'those' is similarly alien to 'that.' The demonstrative system is a patchwork of borrowed plurals.",
  },
  {
    root: "who / whom / whose",
    lang: "Old English",
    meaning: "interrogative / relative pronoun",
    groups: [
      {
        id: "nominative",
        label: "nominative (who)",
        accepts: ["who", "whoever"],
        related: ["which", "what"],
      },
      {
        id: "accusative",
        label: "accusative (whom) — case fossil",
        accepts: ["whom", "whomever"],
        related: ["him", "her"],
      },
      {
        id: "genitive",
        label: "genitive (whose) — case fossil",
        accepts: ["whose"],
        related: ["his", "their"],
      },
    ],
    pool: ["who", "whom", "whose", "whoever", "whomever"],
    tension:
      "Who/whom/whose are the last surviving ruins of Old English grammatical case — a full case system that once governed every noun and pronoun, now reduced to this single set of fossils.",
  },
  // ── PLURAL GHOSTS ────────────────────────────────────────────────────────────
  {
    root: "person / people",
    lang: "Latin",
    meaning: "human individual and collective",
    groups: [
      {
        id: "singular",
        label: "singular (person) — from Latin persona",
        accepts: ["person", "individual", "human"],
        related: ["persona", "character"],
      },
      {
        id: "plural",
        label: "plural (people) — stolen from Latin populum",
        accepts: ["people", "persons", "folk"],
        related: ["populous", "population"],
      },
    ],
    pool: ["person", "people", "persons", "individual", "folk"],
    tension:
      "People is not the plural of person — it's a completely different Latin word (populus, 'the public') pressed into service as a plural because 'persons' felt too formal and 'peoples' took on a different meaning.",
  },
  {
    root: "child / children",
    lang: "Old English",
    meaning: "young human",
    groups: [
      {
        id: "singular",
        label: "singular (child)",
        accepts: ["child"],
        related: ["kid", "infant"],
      },
      {
        id: "plural",
        label: "plural (children) — double-pluralized",
        accepts: ["children", "kids"],
        related: ["youth", "offspring"],
      },
    ],
    pool: ["child", "children", "kids", "offspring"],
    tension:
      "Children carries two plural markers stacked on top of each other. Old English 'cildru' added '-ru' for plural; then Middle English added '-en' on top of that — apparently one plural wasn't enough.",
  },
  // ── VERB MERGERS & STRONG DISTORTIONS ────────────────────────────────────────
  {
    root: "see / saw / seen",
    lang: "Old English",
    meaning: "visual perception",
    groups: [
      {
        id: "present",
        label: "present (see)",
        accepts: ["see", "sees", "seeing"],
        related: ["observe", "look"],
      },
      {
        id: "past",
        label: "past (saw) — ablaut relic",
        accepts: ["saw"],
        related: ["witnessed", "observed"],
      },
      {
        id: "participle",
        label: "past participle (seen)",
        accepts: ["seen"],
        related: ["viewed", "perceived"],
      },
    ],
    pool: ["see", "saw", "seen", "look", "observe"],
    tension:
      "The 'aw' in saw is a relic of an ancient vowel grade that has no connection to the 'ee' in see — they are the same root in two different ancient vowel states, preserved in English like insects in amber.",
  },
  {
    root: "do / did / done",
    lang: "Old English",
    meaning: "action",
    groups: [
      {
        id: "present",
        label: "present (do)",
        accepts: ["do", "does", "doing"],
        related: ["perform", "execute"],
      },
      {
        id: "past",
        label: "past (did) — reduplication relic",
        accepts: ["did"],
        related: ["performed", "executed"],
      },
      {
        id: "participle",
        label: "past participle (done)",
        accepts: ["done"],
        related: ["finished", "completed"],
      },
    ],
    pool: ["do", "does", "did", "done", "perform"],
    tension:
      "Did is one of the last survivors of Indo-European reduplication — an ancient way of marking the past by doubling the root ('de-do'). It is a fossil of a grammatical system that English otherwise abandoned entirely.",
  },
  {
    root: "stand / stood",
    lang: "Old English",
    meaning: "upright position",
    groups: [
      {
        id: "present",
        label: "present (stand) — with nasal infix",
        accepts: ["stand", "stands", "standing"],
        related: ["upright", "erect"],
      },
      {
        id: "past",
        label: "past (stood) — nasal infix vanishes",
        accepts: ["stood"],
        related: ["remained", "halted"],
      },
    ],
    pool: ["stand", "stands", "standing", "stood"],
    tension:
      "The 'n' in stand is a nasal infix — a sound inserted into the root only in the present tense. The moment you step into the past, it disappears entirely. Stood has no 'n' because the root never needed one.",
  },
  {
    root: "tell / told",
    lang: "Old English",
    meaning: "communicate",
    groups: [
      {
        id: "present",
        label: "present (tell) — i-mutation vowel",
        accepts: ["tell", "tells", "telling"],
        related: ["narrate", "recount"],
      },
      {
        id: "past",
        label: "past (told) — original unmutated vowel",
        accepts: ["told"],
        related: ["narrated", "informed"],
      },
    ],
    pool: ["tell", "tells", "told", "narrate", "recount"],
    tension:
      "Tell and told contain the same root — the 'e' in tell was caused by i-mutation (a vowel shift triggered by a now-vanished suffix), while told preserves the original vowel. It's the same root in two different heat-treated states.",
  },
  {
    root: "seek / sought",
    lang: "Old English",
    meaning: "search for",
    groups: [
      {
        id: "present",
        label: "present (seek) — k-form",
        accepts: ["seek", "seeks", "seeking"],
        related: ["search", "look for", "beseech"],
      },
      {
        id: "past",
        label: "past (sought) — ch-form",
        accepts: ["sought"],
        related: ["searched", "pursued"],
      },
    ],
    pool: ["seek", "sought", "search", "beseech"],
    tension:
      "Seek and beseech are the same root — the 'k' and 'ch' sounds split the word into two. Sought is the past tense of both, hidden behind a vowel shift that makes the family resemblance almost invisible.",
  },
  // ── MODAL ARCHAISMS ──────────────────────────────────────────────────────────
  {
    root: "will / would",
    lang: "Old English",
    meaning: "volition / future",
    groups: [
      {
        id: "present",
        label: "present modal (will) — volition/future",
        accepts: ["will", "willing"],
        related: ["shall", "desire"],
      },
      {
        id: "past",
        label: "past modal (would) — conditional/past desire",
        accepts: ["would"],
        related: ["should", "could"],
      },
    ],
    pool: ["will", "would", "willing", "shall", "should"],
    tension:
      "Will originally meant 'to desire' or 'to wish' — a fully-felt wanting. Would is its past tense, preserving that ancient desire in the conditional. The 'l' and 'd' are the only things holding this old wish together.",
  },
  {
    root: "can / could",
    lang: "Old English",
    meaning: "ability / knowledge",
    groups: [
      {
        id: "present",
        label: "present modal (can) — ability",
        accepts: ["can"],
        related: ["able", "know how"],
      },
      {
        id: "past",
        label: "past modal (could) — the 'l' is a fake",
        accepts: ["could"],
        related: ["was able", "might"],
      },
    ],
    pool: ["can", "could", "able", "might", "know"],
    tension:
      "The 'l' in could was inserted by analogy with would and should — it was never pronounced and has no etymological basis. But the 'n' in can is genuine: it descends from the verb 'to know,' making 'can' literally mean 'to know how.'",
  },
];

for (const entry of SUPPLETIVE_EXTENDED_POOL) {
  if (!("questionPrompt" in entry)) {
    (entry as { questionPrompt?: string }).questionPrompt = `Sort forms in the "${entry.root}" paradigm without assuming regular inflection.`;
  }
  if (!("revealBody" in entry)) {
    (entry as { revealBody?: string; tension: string }).revealBody = entry.tension;
  }
}

// Provenance annotations
applyDatasetProvenance(SUPPLETIVE_EXTENDED_POOL, "suppletive_paradigms");
