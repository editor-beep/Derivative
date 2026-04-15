import { applyDatasetProvenance } from "./sources";
// loanwordExtraction.ts
// BORROWED puzzle entries framed around extraction / deception:
// how English absorbed prestige, knowledge, and vocabulary from cultures
// it encountered through conquest, trade, and colonization — while the
// source communities were frequently marginalized or erased.

export const LOANWORD_EXTRACTION_POOL = [
  {
    root: "French prestige extraction",
    lang: "Norman French → English",
    meaning: "social stratification encoded in vocabulary",
    groups: [
      {
        id: "french_prestige",
        displayLabel: "french prestige", solutionLabel: "French prestige layer (upper-class register)",
        accepts: ["cuisine", "chauffeur", "bourgeois", "entrepreneur", "camouflage"],
        related: ["silhouette", "renaissance"],
      },
      {
        id: "english_base",
        displayLabel: "anglo-saxon base", solutionLabel: "Anglo-Saxon equivalent (working-class register)",
        accepts: ["cooking", "driver", "townsman", "undertaker", "disguise"],
        related: ["shadow", "rebirth"],
      },
    ],
    pool: ["cuisine", "chauffeur", "bourgeois", "entrepreneur", "camouflage", "cooking", "driver", "townsman", "undertaker", "disguise"],
    tension:
      "The Norman conquest created a two-tier vocabulary. Cuisine vs. cooking; chauffeur vs. driver; entrepreneur vs. undertaker. The French word carries prestige; the Anglo-Saxon word does the actual work. This split still functions as a class signal — fancy restaurants have cuisines, not kitchens.",
  },
  {
    root: "Arabic military and commercial contact",
    lang: "Arabic → English (via Crusades and Mediterranean trade)",
    meaning: "words extracted from Islamic civilization",
    groups: [
      {
        id: "military",
        displayLabel: "military words", solutionLabel: "Military and command vocabulary",
        accepts: ["admiral", "arsenal", "magazine", "cipher"],
        related: ["assassin", "caliber"],
      },
      {
        id: "commercial",
        displayLabel: "commercial words", solutionLabel: "Commercial and everyday vocabulary",
        accepts: ["coffee", "candy", "cotton", "safari"],
        related: ["sugar", "muslin"],
      },
    ],
    pool: ["admiral", "arsenal", "magazine", "cipher", "coffee", "candy", "cotton", "safari"],
    tension:
      "Admiral is Arabic 'amir al-bahr' — commander of the sea. Arsenal is 'dar as-sina'a' — house of craft. English built its naval empire using command vocabulary borrowed from the Islamic powers it was warring and trading with. Coffee, candy, and cotton represent the commercial pipeline through that same contact zone — goods and military terms flowing in the same direction as conquest.",
  },
  {
    root: "Spanish colonial expansion",
    lang: "Spanish → American English (via frontier expansion)",
    meaning: "vocabulary absorbed from conquered Spanish and Mexican territories",
    groups: [
      {
        id: "landscape",
        displayLabel: "landscape words", solutionLabel: "Landscape words from Spanish/Mexican territories",
        accepts: ["canyon", "mesa", "sierra", "patio", "plaza"],
        related: ["arroyo", "chaparral"],
      },
      {
        id: "resistance",
        displayLabel: "conflict words", solutionLabel: "Political and conflict words from the same contact zone",
        accepts: ["guerilla", "vigilante", "desperado", "embargo"],
        related: ["aficionado", "junta"],
      },
    ],
    pool: ["canyon", "mesa", "sierra", "patio", "plaza", "guerilla", "vigilante", "desperado", "embargo"],
    tension:
      "As the US expanded into former Spanish and Mexican territories, English absorbed two vocabularies: the beauty of stolen landscape (canyon, mesa, plaza) and the language of suppressing resistance to that theft (guerilla, vigilante, desperado). English kept the words while erasing the people who named and inhabited that land.",
  },
  {
    root: "Italian city-state exports",
    lang: "Italian → English (via Renaissance and trade)",
    meaning: "prestige and catastrophe from the same source",
    groups: [
      {
        id: "prestige",
        displayLabel: "prestige words", solutionLabel: "Italian artistic prestige vocabulary",
        accepts: ["virtuoso", "solo", "scenario", "stanza", "studio"],
        related: ["opera", "sonnet"],
      },
      {
        id: "catastrophe",
        displayLabel: "disaster words", solutionLabel: "Italian disaster and exclusion vocabulary",
        accepts: ["ghetto", "fiasco", "quarantine", "influenza"],
        related: ["malaria", "grotto"],
      },
    ],
    pool: ["virtuoso", "solo", "scenario", "stanza", "studio", "ghetto", "fiasco", "quarantine", "influenza"],
    tension:
      "Italian Renaissance city-states exported both artistic mastery and social catastrophe. Virtuoso, solo, scenario — the prestige vocabulary of European high culture. Ghetto (from Venice's restricted Jewish quarter), quarantine (Venice's 40-day plague isolation), fiasco (theatrical collapse) — the vocabulary of disaster and segregation. Prestige and exclusion from the same source.",
  },
  {
    root: "German psychological precision",
    lang: "German → English (via philosophy and psychology)",
    meaning: "compound emotions English could not name alone",
    groups: [
      {
        id: "emotional_states",
        displayLabel: "emotional states", solutionLabel: "Compound emotional states (no English equivalent)",
        accepts: ["schadenfreude", "wanderlust", "angst", "zeitgeist"],
        related: ["weltanschauung", "sturm und drang"],
      },
      {
        id: "cultural_concepts",
        displayLabel: "cultural concepts", solutionLabel: "Cultural and aesthetic categories",
        accepts: ["kitsch", "doppelgänger", "poltergeist", "kindergarten"],
        related: ["bildungsroman", "leitmotif"],
      },
    ],
    pool: ["schadenfreude", "wanderlust", "angst", "zeitgeist", "kitsch", "doppelgänger", "poltergeist", "kindergarten"],
    tension:
      "English borrowed German's compound precision: the exact pleasure of watching someone else fail (Schadenfreude), the specific ache of needing to travel (Wanderlust), existential dread without cause (Angst). These loans peaked in English use during and after periods when German culture was stigmatized. The words gained acceptance faster than their speakers did.",
  },
  {
    root: "British Raj lifestyle imports",
    lang: "Hindi/Urdu → English (via British colonialism in India)",
    meaning: "colonial comfort vocabulary hiding exploitation",
    groups: [
      {
        id: "comfort",
        displayLabel: "comfort words", solutionLabel: "Comfort and lifestyle words brought back by colonists",
        accepts: ["pajamas", "punch", "cushy", "khaki", "dungarees"],
        related: ["chintz", "bandana"],
      },
      {
        id: "control",
        displayLabel: "control words", solutionLabel: "Control and criminalization words from the same period",
        accepts: ["loot", "dacoit", "nabob", "juggernaut"],
        related: ["thuggee", "sepoy"],
      },
    ],
    pool: ["pajamas", "punch", "cushy", "khaki", "dungarees", "loot", "dacoit", "nabob", "juggernaut"],
    tension:
      "British India gave English two vocabularies: comfort and control. Pajamas (leg garments), punch (panch = five-ingredient drink), cushy (khushi = pleasure) — the colonial officer's comfortable life. Loot (lut = plunder), dacoit (dakait = armed bandit), juggernaut (a chariot that crushes) — the vocabulary for criminalizing resistance and justifying force. Both streams obscure the same system.",
  },
  {
    root: "Yiddish assimilation",
    lang: "Yiddish → American English (via Jewish immigration)",
    meaning: "immigrant vocabulary absorbed while communities faced exclusion",
    groups: [
      {
        id: "yiddish_absorbed",
        displayLabel: "yiddish absorbed", solutionLabel: "Yiddish words now fully mainstream",
        accepts: ["glitch", "schmooze", "chutzpah", "klutz", "schmaltz"],
        related: ["spiel", "kvetch"],
      },
      {
        id: "yiddish_origin",
        displayLabel: "original yiddish", solutionLabel: "What each word literally came from",
        accepts: ["glitshn", "shmusen", "khutspe", "klots", "shmalts"],
        related: ["to slip/slide", "to chat", "insolence/nerve", "wooden block", "rendered fat", "shpil (game/play)", "kvetsh (to squeeze)"],
      },
    ],
    pool: ["glitch", "schmooze", "chutzpah", "klutz", "schmaltz", "glitshn", "shmusen", "khutspe", "klots", "shmalts"],
    tension:
      "Glitch is now the universal word for a software hiccup — it started as Yiddish 'glitshn' (to slip). Chutzpah, schmooze, klutz entered American English through immigrant communities in New York, at the same time those communities faced housing discrimination, university quotas, and professional exclusion. The language absorbed the vocabulary faster than the society accepted the people.",
  },
];

// Provenance annotations
applyDatasetProvenance(LOANWORD_EXTRACTION_POOL, "loanword_extraction");
