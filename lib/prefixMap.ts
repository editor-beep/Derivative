/**
 * PREFIX_DATA for your word game: "exposes the deceptive and extractive history of English"
 *
 * English is a "layer-cake" language built on centuries of conquest, invasion, and elite imposition.
 * Everyday words hide this history: plain Germanic roots for the conquered masses,
 * fancy Latin/French/Greek prefixes for the ruling classes, Church, science, and empire.
 * This map gives your game rich, truthful data to reveal the power dynamics behind the words we use daily.
 */

export const PREFIX_DATA = {
  // === LATIN (Roman Empire, Church, Law, Renaissance) ===
  ab: {
    meaning: "away / from",
    origin: "Latin",
    entryPoint: "Roman occupation + Church Latin",
    historyNote: "Roman legions extracted territory and resources across Europe; their language still extracts meaning from English today.",
    examples: ["absent", "abnormal", "abduct"],
  },
  ad: {
    meaning: "toward / to",
    origin: "Latin",
    entryPoint: "Roman + legal Latin",
    historyNote: "The empire that marched 'toward' every horizon left its directional stamp on English conquest vocabulary.",
    examples: ["admit", "advance", "adventure"],
  },
  com: {
    meaning: "together / with",
    origin: "Latin",
    entryPoint: "Norman French (post-1066) + Latin",
    historyNote: "Norman conquerors forced 'togetherness' under French rule — the elite language of power that still dominates English governance words.",
    examples: ["commit", "combine", "community"],
  },
  con: {
    meaning: "together / with",
    origin: "Latin",
    entryPoint: "Norman French + Latin",
    historyNote: "Same extractive elite layer as 'com-'. The French-speaking ruling class imposed these prefixes while the English-speaking peasants kept the simpler words.",
    examples: ["connect", "contract", "conquer"],
  },
  de: {
    meaning: "down / away / off",
    origin: "Latin",
    entryPoint: "Norman French + Latin",
    historyNote: "Used by conquerors to signal removal or reversal — fitting for a language shaped by repeated downfalls of the native population.",
    examples: ["descend", "defeat", "destroy"],
  },
  dis: {
    meaning: "apart / away / not",
    origin: "Latin",
    entryPoint: "Latin via French & Church",
    historyNote: "Division and separation were tools of empire; this prefix still 'pulls apart' words while hiding its imperial roots.",
    examples: ["disrupt", "distance", "disagree"],
  },
  ex: {
    meaning: "out / out of",
    origin: "Latin",
    entryPoint: "Roman + Norman French",
    historyNote: "The Romans extracted resources outward; the Normans extracted power. English still exports their prefixes.",
    examples: ["exit", "extract", "exclude"],
  },
  e: {
    meaning: "out / out of",
    origin: "Latin",
    entryPoint: "Roman + Norman French",
    historyNote: "Variant of 'ex-' before consonants — same Roman extraction, quieter disguise. The empire's reach, reduced to a single letter.",
    examples: ["emit", "eject", "erupt"],
  },
  in: {
    meaning: "into / in / not",
    origin: "Latin",
    entryPoint: "Latin + Norman French",
    historyNote: "One of the most common — quietly carrying the language of invasion and negation imposed by conquerors.",
    examples: ["include", "invade", "incorrect"],
  },
  im: {
    meaning: "into / in / not",
    origin: "Latin",
    entryPoint: "Latin + Norman French",
    historyNote: "Variant of 'in-' before b, m, p — the same conquering prefix in a softer phonetic mask.",
    examples: ["import", "implicit", "immerse"],
  },
  inter: {
    meaning: "between / among",
    origin: "Latin",
    entryPoint: "Roman Empire + Church",
    historyNote: "Romans built roads and borders 'between' conquered peoples. English inherited the divider while pretending the words are neutral.",
    examples: ["international", "interrupt", "intervene"],
  },
  pre: {
    meaning: "before",
    origin: "Latin",
    entryPoint: "Latin via Norman French",
    historyNote: "The elite prefix of foresight and priority — used by those who wrote history after conquest.",
    examples: ["predict", "prefix", "prepare"],
  },
  pro: {
    meaning: "forward / for / in favor of",
    origin: "Latin",
    entryPoint: "Latin + Renaissance",
    historyNote: "The language of empire and 'progress' — often used to justify extraction and colonialism.",
    examples: ["progress", "promote", "protect"],
  },
  re: {
    meaning: "back / again",
    origin: "Latin",
    entryPoint: "Norman French + Latin",
    historyNote: "Repeated conquests (Romans, Vikings, Normans) made 'again' a core theme in the language of the conquered.",
    examples: ["return", "repeat", "rebuild"],
  },
  sub: {
    meaning: "under / below",
    origin: "Latin",
    entryPoint: "Latin via Norman French",
    historyNote: "Perfect for a language where the native population was literally placed 'under' French-speaking rulers for centuries.",
    examples: ["submit", "subordinate", "subject"],
  },
  trans: {
    meaning: "across / through / beyond",
    origin: "Latin",
    entryPoint: "Roman Empire + Latin scholarship",
    historyNote: "Roman roads and legions crossed and extracted across continents; English still uses their crossing words while ignoring the empire behind them.",
    examples: ["transport", "transform", "transatlantic"],
  },

  // === GREEK (Scholarship, Science, Philosophy — often via Latin/French) ===
  anti: {
    meaning: "against / opposite",
    origin: "Greek",
    entryPoint: "Renaissance & scientific Latin",
    historyNote: "Ancient Greek city-states fought each other; later scholars extracted their philosophical terms to sound superior in English.",
    examples: ["antidote", "antibiotic", "antithesis"],
  },
  auto: {
    meaning: "self",
    origin: "Greek",
    entryPoint: "Scientific & philosophical borrowing",
    historyNote: "Greek thinkers celebrated the individual self — later extracted into modern English tech and psychology to mask collective power structures.",
    examples: ["automatic", "autonomy", "autobiography"],
  },
  hyper: {
    meaning: "over / excessive / above",
    origin: "Greek",
    entryPoint: "Scientific Latin/Greek",
    historyNote: "The language of excess — fitting for an empire (and later capitalism) that always wanted 'more'.",
    examples: ["hyperactive", "hyperspeed", "hyperbole"],
  },
  hypo: {
    meaning: "under / below / less than",
    origin: "Greek",
    entryPoint: "Scientific & medical Latin",
    historyNote: "The flip side of 'hyper' — the underclass position imposed by those who controlled knowledge.",
    examples: ["hypothesis", "hypodermic", "hypocrisy"],
  },
  syn: {
    meaning: "together / with / same",
    origin: "Greek",
    entryPoint: "Scholarly & scientific",
    historyNote: "Greek philosophers sought unity; English extracted it while its own history was one of division and conquest.",
    examples: ["synthesis", "synonym", "synchronize"],
  },

  // === GERMANIC / OLD ENGLISH / NORSE (The 'native' conquered layer) ===
  un: {
    meaning: "not / opposite",
    origin: "Old English (Germanic)",
    entryPoint: "Anglo-Saxon settlement (5th century)",
    historyNote: "The original, honest Germanic negation — used by the common people before French and Latin elites layered their fancier versions on top.",
    examples: ["unhappy", "undo", "unknown"],
  },
  mis: {
    meaning: "wrong / badly",
    origin: "Old English / Norse",
    entryPoint: "Anglo-Saxon + Viking invasions",
    historyNote: "The raw, everyday language of the invaded and the Vikings who raided them — no deception, just blunt truth.",
    examples: ["mistake", "misunderstand", "mislead"],
  },
  over: {
    meaning: "above / too much",
    origin: "Old English (Germanic)",
    entryPoint: "Anglo-Saxon core",
    historyNote: "Pure Germanic — the language of the people who were literally 'over'run by Normans, Romans, and others.",
    examples: ["overcome", "overlord", "overflow"],
  },

  // === FRENCH (Norman Conquest — the ultimate elite extraction layer) ===
  mal: {
    meaning: "bad / badly",
    origin: "French (Norman)",
    entryPoint: "Norman Conquest 1066",
    historyNote: "The French-speaking aristocracy imposed their language of judgment and power after conquering England. 'Bad' became fancy and French.",
    examples: ["malfunction", "malicious", "malnutrition"],
  },
  sur: {
    meaning: "over / above",
    origin: "French (Norman)",
    entryPoint: "Norman Conquest 1066",
    historyNote: "The conquerors placed themselves 'over' the English. This prefix still signals superiority in English words.",
    examples: ["surprise", "surpass", "surface"],
  },
} as const;

export type Prefix = keyof typeof PREFIX_DATA;
export type PrefixInfo = (typeof PREFIX_DATA)[Prefix];
