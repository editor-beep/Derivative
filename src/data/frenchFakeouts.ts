import { applyDatasetProvenance } from "./sources";
// src/data/frenchFakeouts.ts
// French Fakeouts seed data — three pool types:
//   FRENCH_VISUAL_FRAUD_POOL  → DECEPTION_POOL entries
//   FRENCH_DOUBLETS_POOL      → COLLISION_POOL entries
//   FRENCH_FALSE_FRIENDS_POOL → BORROWED_POOL entries

// ── VISUAL FRAUD (DECEPTION shape) ───────────────────────────────────────────
// Silent/spurious letters inserted by Renaissance scholars to Latinize French words.
// Each entry groups the modern spelling against its French origin form.

export const FRENCH_VISUAL_FRAUD_POOL = [
  {
    root: "silent-b insertion",
    lang: "Old French → Middle English",
    meaning: "false Latinization",
    groups: [
      {
        id: "modern",
        label: "Modern spelling (silent b inserted)",
        accepts: ["debt", "doubt", "subtle"],
        related: ["plumb", "bomb"],
      },
      {
        id: "french",
        label: "French origin (no silent b)",
        accepts: ["dette", "doute", "sotil"],
        related: ["dette", "dubitum"],
      },
    ],
    pool: ["debt", "doubt", "subtle", "dette", "doute", "sotil"],
    tension:
      "The 'b' in debt, doubt, and subtle was never pronounced — it was grafted onto French words to make them look like their Latin grandparents.",
  },
  {
    root: "silent-c insertion",
    lang: "Old French → Middle English",
    meaning: "false Latinization",
    groups: [
      {
        id: "modern",
        label: "Modern spelling (silent c inserted)",
        accepts: ["indict", "verdict", "scissors", "victuals"],
        related: ["muscle"],
      },
      {
        id: "french",
        label: "French origin (no silent c)",
        accepts: ["enditer", "verdit", "cisoires", "vitaille"],
        related: ["musculus"],
      },
    ],
    pool: ["indict", "verdict", "scissors", "victuals", "enditer", "verdit", "cisoires", "vitaille"],
    tension:
      "We say 'vittles' but write 'victuals'; we say 'indite' but write 'indict' — Latin prestige dressed up French words.",
  },
  {
    root: "silent letter restoration",
    lang: "Old French → Early Modern English",
    meaning: "false Latinization",
    groups: [
      {
        id: "modern",
        label: "Restored Latin spelling",
        accepts: ["perfect", "adventure", "subject", "falcon", "salmon"],
        related: ["language", "baptism"],
      },
      {
        id: "french",
        label: "French form (before Latin repair)",
        accepts: ["parfit", "aventure", "sujet", "faucon", "saumon"],
        related: ["langage", "baptême"],
      },
    ],
    pool: ["perfect", "adventure", "subject", "falcon", "salmon", "parfit", "aventure", "sujet", "faucon", "saumon"],
    tension:
      "16th-century scribes restored Latin clusters that French had long since smoothed away — the spelling became a fossil museum.",
  },
  {
    root: "miscellaneous silent letters",
    lang: "Old French + Latin → English",
    meaning: "false Latinization",
    groups: [
      {
        id: "modern",
        label: "Modern form (hallucinated letter)",
        accepts: ["receipt", "aisle", "island", "scent", "author", "anchor"],
        related: ["scene", "muscle"],
      },
      {
        id: "origin",
        label: "Origin form (no hallucinated letter)",
        accepts: ["receite", "ele", "iland", "sent", "autor", "ancre"],
        related: ["sene", "muscle"],
      },
    ],
    pool: ["receipt", "aisle", "island", "scent", "author", "anchor", "receite", "ele", "iland", "sent", "autor", "ancre"],
    tension:
      "An 'h' added for Greek ancestry, an 's' from a misread island, a 'p' to dress up a bill — each silent letter is a scribal decision frozen in place.",
  },
];

// ── DOUBLETS (COLLISION shape) ────────────────────────────────────────────────
// Same Latin root entered English twice: once through French (eroded),
// once as a direct Latin/learned borrowing (intact).

export const FRENCH_DOUBLETS_POOL = [
  {
    root: "regalis / legalis",
    lang: "Latin → Old French + Latin",
    meaning: "authority",
    groups: [
      {
        id: "french",
        label: "French-eroded form (feeling/status)",
        accepts: ["royal", "loyal"],
        related: ["chivalry", "nobility"],
      },
      {
        id: "latin",
        label: "Latin-learned form (law/document)",
        accepts: ["regal", "legal"],
        related: ["regulate", "legislation"],
      },
    ],
    pool: ["royal", "loyal", "regal", "legal"],
    tension:
      "Royal and regal share the same Latin root — one drifted through French courts as a feeling, the other stayed in Latin as a statute.",
  },
  {
    root: "caput / capitaneus",
    lang: "Latin → Old French + English",
    meaning: "head / leader",
    groups: [
      {
        id: "french",
        label: "French stream (kitchen / clan)",
        accepts: ["chief", "chieftain"],
        related: ["chef", "achieve"],
      },
      {
        id: "latin",
        label: "Latin stream (military / formal)",
        accepts: ["captain", "capital"],
        related: ["decapitate", "chapter"],
      },
    ],
    pool: ["chief", "chieftain", "captain", "capital", "chef"],
    tension:
      "Chief leads the army in French; captain leads it in Latin. Chef commands the kitchen. All three heads share the same Latin skull.",
  },
  {
    root: "caballarius",
    lang: "Latin → Old French + Medieval Latin",
    meaning: "horse / mounted warrior",
    groups: [
      {
        id: "french",
        label: "French stream (the ideal / the code)",
        accepts: ["chivalry", "cavalier"],
        related: ["chevalier"],
      },
      {
        id: "latin",
        label: "Latin-military stream (the practice)",
        accepts: ["cavalry", "cavalcade"],
        related: ["horse", "caballus"],
      },
    ],
    pool: ["chivalry", "cavalier", "cavalry", "cavalcade"],
    tension:
      "Cavalry is what horses do in battle; chivalry is the moral code that justified doing it — same root, one pragmatic, one idealized.",
  },
  {
    root: "hospitale / canalis",
    lang: "Latin → Old French + Latin",
    meaning: "place / passage",
    groups: [
      {
        id: "french",
        label: "French stream (everyday use)",
        accepts: ["hotel", "channel"],
        related: ["hostel", "canal"],
      },
      {
        id: "latin",
        label: "Latin-learned stream (institutional)",
        accepts: ["hospital", "canal"],
        related: ["hospitality", "channel"],
      },
    ],
    pool: ["hotel", "channel", "hospital", "canal"],
    tension:
      "Hotel and hospital are the same building — one for the rich who travel, one for the sick who can't. Channel and canal are the same cut through earth.",
  },
  {
    root: "pauper / Germanic *warjan",
    lang: "Latin + Germanic → Old French + English",
    meaning: "poverty / protection",
    groups: [
      {
        id: "french",
        label: "French-eroded form",
        accepts: ["poor", "warranty", "ward"],
        related: ["pauper", "guard"],
      },
      {
        id: "latin_germanic",
        label: "Latin / Germanic-learned form",
        accepts: ["pauper", "guarantee", "guard"],
        related: ["poor", "warranty"],
      },
    ],
    pool: ["poor", "warranty", "ward", "pauper", "guarantee", "guard"],
    tension:
      "Poor wandered through French streets; pauper stayed in Latin books. Warranty and guarantee are the same Germanic pledge split by dialect — one Norman, one Central French.",
  },
  {
    root: "Norman table (animal vs. meat)",
    lang: "Old English + Old French",
    meaning: "class divide in vocabulary",
    groups: [
      {
        id: "oe",
        label: "Old English (farm — the living animal)",
        accepts: ["cow", "pig", "sheep", "deer", "calf"],
        related: ["ox", "fowl"],
      },
      {
        id: "french",
        label: "Old French (table — the prepared meat)",
        accepts: ["beef", "pork", "mutton", "venison", "veal"],
        related: ["poultry", "cuisine"],
      },
    ],
    pool: ["cow", "pig", "sheep", "deer", "calf", "beef", "pork", "mutton", "venison", "veal"],
    tension:
      "The Normans didn't raise the animals — they ate them. English serfs kept the Saxon names for living beasts; their lords imported French names for what arrived at the table.",
  },
];

// ── FALSE FRIENDS (BORROWED shape) ───────────────────────────────────────────
// Words that look the same in English and French but mean different things.
// Each entry presents the English-sense group vs. the French-sense group.

export const FRENCH_FALSE_FRIENDS_POOL = [
  {
    root: "false friends — time & action",
    lang: "French → English",
    meaning: "semantic divergence after borrowing",
    groups: [
      {
        id: "english",
        label: "English meaning",
        accepts: ["actual (true/real)", "eventually (later, certainly)", "attend (to be present)"],
        related: ["factual", "finally", "show up"],
      },
      {
        id: "french",
        label: "French meaning (false cognate)",
        accepts: ["actuel (current)", "éventuellement (possibly)", "attendre (to wait)"],
        related: ["current", "maybe", "stay behind"],
      },
    ],
    pool: ["actual", "eventually", "attend", "actuel", "éventuellement", "attendre"],
    tension:
      "Actual means 'true' in English but 'current' in French; eventually means 'certainly later' in English but 'possibly' in French — certainty vs. chance, hiding in the same word.",
  },
  {
    root: "false friends — mind & feeling",
    lang: "French → English",
    meaning: "semantic divergence after borrowing",
    groups: [
      {
        id: "english",
        label: "English meaning",
        accepts: ["sensible (rational)", "sympathetic (kind, empathetic)", "deception (a lie)"],
        related: ["reasonable", "caring", "fraud"],
      },
      {
        id: "french",
        label: "French meaning (false cognate)",
        accepts: ["sensible (sensitive)", "sympathique (likeable)", "déception (disappointment)"],
        related: ["emotional", "pleasant", "letdown"],
      },
    ],
    pool: ["sensible", "sympathetic", "deception"],
    tension:
      "English sensible went to the head; French sensible stayed in the heart. Deception in English is a lie you tell; in French it's the feeling when the lie is discovered.",
  },
  {
    root: "false friends — place & thing",
    lang: "French → English",
    meaning: "semantic divergence after borrowing",
    groups: [
      {
        id: "english",
        label: "English meaning",
        accepts: ["library (building with books)", "fabric (woven cloth)", "coin (money)"],
        related: ["bookshelf", "textile", "currency"],
      },
      {
        id: "french",
        label: "French meaning (false cognate)",
        accepts: ["librairie (bookshop)", "fabrique (factory)", "coin (corner)"],
        related: ["bookstore", "plant", "corner of a room"],
      },
    ],
    pool: ["library", "fabric", "coin", "librairie", "fabrique"],
    tension:
      "We stole the library building but left the French their bookshop. Fabric became the product, not the factory. Coin came from the corner of the mint where stamps were cut.",
  },
  {
    root: "false friends — hazard & pain",
    lang: "French → English",
    meaning: "semantic divergence after borrowing",
    groups: [
      {
        id: "english",
        label: "English meaning",
        accepts: ["hazard (danger)", "pain (agony)"],
        related: ["peril", "suffering"],
      },
      {
        id: "french",
        label: "French / Arabic origin meaning",
        accepts: ["hasard (chance, luck)", "pain (bread)"],
        related: ["dice game", "daily bread"],
      },
    ],
    pool: ["hazard", "pain", "hasard"],
    tension:
      "Hazard came from Arabic dice — pure chance — and English turned luck into danger. Pain is the most basic collision: the French staff of life became the English word for suffering.",
  },
];

// Provenance annotations
applyDatasetProvenance(FRENCH_VISUAL_FRAUD_POOL, "french_visual_fraud");
applyDatasetProvenance(FRENCH_DOUBLETS_POOL, "french_doublets");
applyDatasetProvenance(FRENCH_FALSE_FRIENDS_POOL, "french_false_friends");
