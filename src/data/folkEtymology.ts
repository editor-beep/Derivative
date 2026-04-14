import { applyDatasetProvenance } from "./sources";
// src/data/folkEtymology.ts
// Folk Etymology seed data — DECEPTION_POOL entries.
// Three subtypes:
//   1. Rebracketing (the 'n' migrates between article and noun)
//   2. Learned spelling myths (letters added to look classical)
//   3. True folk reshaping (source word mangled to sound native)

export const FOLK_ETYMOLOGY_POOL = [
  // ── REBRACKETING (The Slider) ─────────────────────────────────────────────
  // A word was misheard at the article boundary: "an ekename" → "a nickname."

  {
    root: "rebracketing — n-migration",
    lang: "Middle English",
    meaning: "misdivision at the article boundary",
    groups: [
      {
        id: "modern",
        displayLabel: "Group A", solutionLabel: "Modern form (article absorbed the 'n')",
        accepts: ["apron", "nickname", "umpire", "newt", "auger"],
        related: ["adder", "orange"],
      },
      {
        id: "original",
        displayLabel: "Group B", solutionLabel: "Original form (before misdivision)",
        accepts: ["a napron", "an ekename", "a noumpere", "an ewt", "a nauger"],
        related: ["a nadder", "a norange"],
      },
    ],
    pool: ["apron", "nickname", "umpire", "newt", "auger", "napron", "ekename", "noumpere", "ewt", "nauger"],
    tension:
      "The 'n' in 'an' kept jumping ship. 'An ewt' became 'a newt'; 'a napron' became 'an apron.' The article and the noun played tug-of-war with a single consonant for centuries.",
  },
  {
    root: "rebracketing — n-migration (animals)",
    lang: "Middle English",
    meaning: "misdivision at the article boundary",
    groups: [
      {
        id: "modern",
        displayLabel: "Group A", solutionLabel: "Modern form (after n-migration)",
        accepts: ["adder", "orange"],
        related: ["newt", "apron"],
      },
      {
        id: "original",
        displayLabel: "Group B", solutionLabel: "Original form (before n-migration)",
        accepts: ["nadder", "norange"],
        related: ["Arabic naranj", "Old English naeddre"],
      },
    ],
    pool: ["adder", "orange", "nadder", "norange"],
    tension:
      "The snake was a 'nadder' until 'an nadder' became 'an adder.' The orange was 'norange' in Old French (from Arabic 'naranj') until speakers heard 'an orange.' The article took the initial consonant as its own.",
  },

  // ── LEARNED SPELLING MYTHS (The Eraser) ──────────────────────────────────
  // Scholars added letters to make vernacular words look more Latin or Greek.

  {
    root: "hallucinated classical letters",
    lang: "Middle English → Early Modern English",
    meaning: "false Latinization or Hellenization of spelling",
    groups: [
      {
        id: "modern",
        displayLabel: "Group A", solutionLabel: "Modern spelling (with inserted phantom letter)",
        accepts: ["island", "rhyme", "could", "scent", "ache"],
        related: ["debt", "doubt"],
      },
      {
        id: "original",
        displayLabel: "Group B", solutionLabel: "Original spelling (before the insertion)",
        accepts: ["iland", "rime", "coud", "sent", "ake"],
        related: ["dette", "doute"],
      },
    ],
    pool: ["island", "rhyme", "could", "scent", "ache", "iland", "rime", "coud", "sent", "ake"],
    tension:
      "Island gained an 's' to honor Latin 'insula' — but the word is Germanic and has nothing to do with insula. Rhyme gained an 'h' to look like Greek 'rhythmos.' Could gained an 'l' just because would and should had one.",
  },
  {
    root: "false Latin repairs — legal and learned",
    lang: "Early Modern English",
    meaning: "false Latinization of spelling",
    groups: [
      {
        id: "modern",
        displayLabel: "Group A", solutionLabel: "Latinized modern form",
        accepts: ["comptroller", "fault", "assault", "vault", "admiral"],
        related: ["advance", "advantage"],
      },
      {
        id: "original",
        displayLabel: "Group B", solutionLabel: "Original French form (before the Latin repair)",
        accepts: ["controller", "faute", "assaut", "voute", "amir-al"],
        related: ["avancer", "avantage"],
      },
    ],
    pool: ["comptroller", "fault", "assault", "vault", "admiral", "controller", "faute", "assaut", "voute"],
    tension:
      "Comptroller is 'controller' wearing a false Latin degree — the 'comp' was inserted to suggest a link to French 'compte' (account) that was never there. Fault gained an 'l' to resemble Latin 'fallere'; the French had already dropped it.",
  },
  {
    root: "Gaelic and exotic words dressed up as Greek",
    lang: "Early Modern English",
    meaning: "false Hellenization",
    groups: [
      {
        id: "modern",
        displayLabel: "Group A", solutionLabel: "Hellenized modern form",
        accepts: ["ptarmigan", "abominable"],
        related: ["rhyme", "island"],
      },
      {
        id: "original",
        displayLabel: "Group B", solutionLabel: "Original form (before the Greek cosplay)",
        accepts: ["tarmachan (Gaelic)", "abominabilis (no h in Latin)"],
        related: ["tarmac", "abominate"],
      },
    ],
    pool: ["ptarmigan", "abominable", "tarmachan"],
    tension:
      "Ptarmigan is a Gaelic word given a Greek-style silent 'pt' to make it look scholarly. Abominable was spelled 'abhominable' for centuries because scholars thought it meant 'away from man' (ab-homine) — it doesn't.",
  },

  // ── TRUE FOLK RESHAPING ───────────────────────────────────────────────────
  // A foreign word was so unfamiliar that speakers reshaped it to match known words.

  {
    root: "folk reshaping — animals and plants",
    lang: "Various → English",
    meaning: "foreign word mangled into familiar components",
    groups: [
      {
        id: "modern",
        displayLabel: "Group A", solutionLabel: "Folk-reshaped English form",
        accepts: ["cockroach", "crayfish", "bridegroom", "woodchuck", "wormwood"],
        related: ["sparrowgrass", "Jerusalem artichoke"],
      },
      {
        id: "source",
        displayLabel: "Group B", solutionLabel: "Actual source word",
        accepts: ["cucaracha (Spanish)", "écrevisse (French)", "brydguma (OE — guma = man)", "otcheck (Algonquian)", "wermōd (OE — mind-preserver)"],
        related: ["asparagos", "girasole"],
      },
    ],
    pool: ["cockroach", "crayfish", "bridegroom", "woodchuck", "wormwood", "cucaracha", "écrevisse"],
    tension:
      "Cockroach has nothing to do with cocks or roaches — it's Spanish 'cucaracha' forced into familiar English shapes. Bridegroom's 'groom' replaced 'guma' (man) because 'guma' died out. Woodchuck is pure phonetic mimicry of an Algonquian word.",
  },
  {
    root: "folk reshaping — household and architecture",
    lang: "Various → English",
    meaning: "foreign word component-swapped for familiarity",
    groups: [
      {
        id: "modern",
        displayLabel: "Group A", solutionLabel: "Folk-reshaped English form",
        accepts: ["penthouse", "shamefaced", "belfry", "hangnail", "curfew"],
        related: ["chaise lounge", "saltcellar"],
      },
      {
        id: "source",
        displayLabel: "Group B", solutionLabel: "Actual source and original meaning",
        accepts: ["apentis (Anglo-Norman hang-on building)", "shamefast (fixed in shame)", "berfrey (siege tower)", "agnail (OE ang-naegl, painful spike)", "couvre-feu (cover the fire)"],
        related: ["chaise longue (long chair)", "saler (French salt-box)"],
      },
    ],
    pool: ["penthouse", "shamefaced", "belfry", "hangnail", "curfew", "apentis", "berfrey", "agnail"],
    tension:
      "Penthouse was never a top-floor luxury apartment — it was a lean-to shed that 'hangs' against a wall. Curfew meant 'cover the fire' at bedtime; we forgot the fire and only remembered the time. Belfry only got its bells because we started putting bells in siege towers.",
  },
  {
    root: "folk reshaping — ranching and frontier",
    lang: "Spanish / Nahuatl / Quechua → American English",
    meaning: "Spanish and indigenous words mangled for English ears",
    groups: [
      {
        id: "english",
        displayLabel: "Group A", solutionLabel: "American English form",
        accepts: ["lariat", "buckaroo", "stampede", "vamoose", "ten-gallon hat"],
        related: ["mustang", "lasso", "cinch"],
      },
      {
        id: "source",
        displayLabel: "Group B", solutionLabel: "Actual source word and meaning",
        accepts: ["la reata (the rope)", "vaquero (cow-man)", "estampida (crash/uproar)", "vamos (let's go)", "tan galán (so gallant/handsome)"],
        related: ["mesteño (stray)", "lazo (knot)", "cincha (girdle)"],
      },
    ],
    pool: ["lariat", "buckaroo", "stampede", "vamoose", "mustang", "lasso", "cinch", "la reata", "vaquero", "estampida"],
    tension:
      "The ten-gallon hat holds no gallons — 'tan galán' meant 'so gallant' in Spanish. Buckaroo is 'vaquero' chewed up and re-spat in a Texas accent. Lariat is 'la reata' with the article welded onto the noun.",
  },
  {
    root: "folk reshaping — food and plants",
    lang: "Various → English",
    meaning: "foreign food words domesticated by false component analysis",
    groups: [
      {
        id: "english",
        displayLabel: "Group A", solutionLabel: "English folk-reshaped form",
        accepts: ["sparrowgrass", "Jerusalem artichoke", "humble pie", "coldslaw", "chestnut"],
        related: ["rosemary", "dandelion"],
      },
      {
        id: "source",
        displayLabel: "Group B", solutionLabel: "Actual source and real meaning",
        accepts: ["asparagos (Greek)", "girasole (Italian sunflower)", "umbles (deer innards)", "kool-sla (Dutch: cabbage salad)", "chesten-nut (nut of the chesten tree)"],
        related: ["ros marinus (dew of the sea)", "dent-de-lion (tooth of the lion)"],
      },
    ],
    pool: ["sparrowgrass", "Jerusalem artichoke", "humble pie", "coldslaw", "chestnut", "asparagos", "girasole", "kool-sla"],
    tension:
      "Jerusalem artichoke has nothing to do with Jerusalem — 'girasole' (sunflower in Italian) sounded like 'Jerusalem' to English ears. Humble pie was 'umble' pie (made from deer innards); the humiliation was added by folk etymology. Coleslaw was always cabbage.",
  },
  {
    root: "back-formation — false plurals corrected",
    lang: "Middle English",
    meaning: "singular invented by removing a perceived plural marker",
    groups: [
      {
        id: "backformed",
        displayLabel: "Group A", solutionLabel: "Back-formed singular (invented)",
        accepts: ["pea", "cherry", "sherry"],
        related: ["asset", "statistic"],
      },
      {
        id: "original",
        displayLabel: "Group B", solutionLabel: "Original form (which was already singular)",
        accepts: ["pease", "cherise", "sherris"],
        related: ["assets", "statistics"],
      },
    ],
    pool: ["pea", "cherry", "sherry", "pease", "cherise", "sherris"],
    tension:
      "Pea, cherry, and sherry all ended in a sound that resembled a plural '-s,' so speakers assumed they were plural and invented new singulars. Pease porridge is still correct — a pea is a grammatical accident.",
  },
];

// Provenance annotations
applyDatasetProvenance(FOLK_ETYMOLOGY_POOL, "folk_etymology");
