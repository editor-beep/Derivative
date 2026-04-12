// src/data/meaningDrift.ts
// Meaning Drift seed data — SEMANTIC_POOL entries (timeline format).
// Skips entries already in insightEngine.ts: nice, silly, awful, villain, bully.
// Each entry has 4–5 timeline steps with blank: true on 2 entries (the puzzle gaps).

export const MEANING_DRIFT_POOL = [
  // ── PEJORATION (good/neutral → bad) ─────────────────────────────────────────
  {
    root: "gossip",
    lang: "Old English → Modern English",
    meaning: "semantic drift — pejoration",
    timeline: [
      { era: "Old English (godsibb)", meaning: "godparent — a spiritual relative" },
      { era: "Middle English", meaning: "close friend, familiar companion", blank: true },
      { era: "15th–16th century", meaning: "person (especially a woman) who talks idly" },
      { era: "17th century", meaning: "light, familiar talk or writing", blank: true },
      { era: "Modern English", meaning: "idle rumor; one who spreads it" },
    ],
    tension:
      "Gossip began as a sacred bond — your child's godparent. The spiritual relationship decayed into social noise over four hundred years.",
  },
  {
    root: "crafty",
    lang: "Old English → Modern English",
    meaning: "semantic drift — pejoration",
    timeline: [
      { era: "Old English (craeftig)", meaning: "strong, powerful, skilled" },
      { era: "Middle English", meaning: "skillful, dexterous, clever", blank: true },
      { era: "Early Modern English", meaning: "ingenious, cunning (neutral)" },
      { era: "17th–18th century", meaning: "cunning in a bad sense — devious", blank: true },
      { era: "Modern English", meaning: "sly, artfully deceptive" },
    ],
    tension:
      "Skill became suspicious. Crafty once meant what 'skilled' means now — the shift tells us something about how expertise was viewed by those who didn't have it.",
  },
  {
    root: "lewd",
    lang: "Old English → Modern English",
    meaning: "semantic drift — pejoration",
    timeline: [
      { era: "Old English (laewede)", meaning: "belonging to the laity; not a clergyman" },
      { era: "Middle English", meaning: "not learned, uneducated", blank: true },
      { era: "14th–15th century", meaning: "low-class, vulgar, worthless" },
      { era: "16th century", meaning: "lascivious, unchaste", blank: true },
      { era: "Modern English", meaning: "obscene, sexually crude" },
    ],
    tension:
      "The Church decided that anyone outside the clergy was ignorant; ignorant became low; low became immoral. Lewd is the complete story of clerical contempt for the laity.",
  },
  {
    root: "hussy",
    lang: "Old English → Modern English",
    meaning: "semantic drift — pejoration",
    timeline: [
      { era: "Old English (huswif)", meaning: "housewife — mistress of the household" },
      { era: "Middle English (hussif)", meaning: "a respectable married woman", blank: true },
      { era: "16th century", meaning: "a woman of low economic status" },
      { era: "17th century", meaning: "a bold or disrespectful girl", blank: true },
      { era: "Modern English", meaning: "an immoral or brazen woman" },
    ],
    tension:
      "Hussy is housewife with the respectability stripped away — a word for domestic authority dragged through four centuries of class contempt.",
  },
  {
    root: "knave",
    lang: "Old English → Modern English",
    meaning: "semantic drift — pejoration",
    timeline: [
      { era: "Old English (cnafa)", meaning: "boy, male child" },
      { era: "Middle English", meaning: "male servant, attendant", blank: true },
      { era: "13th–14th century", meaning: "a low-born or menial person" },
      { era: "15th century", meaning: "a dishonest person, a rogue", blank: true },
      { era: "Modern English", meaning: "a deceitful, unscrupulous man" },
    ],
    tension:
      "Youth was made untrustworthy. Being a boy became being a servant; being a servant became being a scoundrel — a complete slide from innocence to villainy.",
  },
  // ── AMELIORATION (bad/neutral → good) ───────────────────────────────────────
  {
    root: "knight",
    lang: "Old English → Modern English",
    meaning: "semantic drift — amelioration",
    timeline: [
      { era: "Old English (cniht)", meaning: "boy, servant, attendant" },
      { era: "Early Middle English", meaning: "military servant, mounted soldier", blank: true },
      { era: "11th–12th century", meaning: "professional warrior of the feudal class" },
      { era: "13th–14th century", meaning: "member of a chivalric order", blank: true },
      { era: "Modern English", meaning: "noble warrior, one honored by the Crown" },
    ],
    tension:
      "The servant rose to hero status. Knight began as the word for a boy doing chores — the rise of feudalism turned the servant into the symbol of an entire moral code.",
  },
  {
    root: "lord",
    lang: "Old English → Modern English",
    meaning: "semantic drift — amelioration",
    timeline: [
      { era: "Old English (hlafweard)", meaning: "loaf-warden — guardian of the bread supply" },
      { era: "Early Middle English", meaning: "master of a household", blank: true },
      { era: "12th–13th century", meaning: "feudal superior, landholder" },
      { era: "14th century", meaning: "a man of high rank or nobility", blank: true },
      { era: "Modern English", meaning: "a noble; a title of honor; the divine" },
    ],
    tension:
      "Lord began as a bread-keeper. The man who controlled the grain controlled the people — and the word rose with him from kitchen steward to the highest title in the land.",
  },
  {
    root: "lady",
    lang: "Old English → Modern English",
    meaning: "semantic drift — amelioration",
    timeline: [
      { era: "Old English (hlaefdige)", meaning: "loaf-kneader — she who kneads the bread" },
      { era: "Early Middle English", meaning: "mistress of a household", blank: true },
      { era: "12th–13th century", meaning: "a woman of rank or authority" },
      { era: "14th century", meaning: "a noblewoman, the wife of a lord", blank: true },
      { era: "Modern English", meaning: "a woman of refinement or high social standing" },
    ],
    tension:
      "Lady and lord both rose from the bakehouse. She kneaded the bread; he guarded it. The entire feudal hierarchy of medieval England was baked into two words.",
  },
  {
    root: "prestigious",
    lang: "Latin → Modern English",
    meaning: "semantic drift — amelioration",
    timeline: [
      { era: "Latin (praestigium)", meaning: "juggler's tricks, illusions, deceptions" },
      { era: "French (prestige)", meaning: "illusion, conjuring trick", blank: true },
      { era: "17th century English", meaning: "dazzling or blinding effect; an illusion" },
      { era: "18th century", meaning: "influence arising from past success", blank: true },
      { era: "Modern English", meaning: "widely respected, high-status, esteemed" },
    ],
    tension:
      "Prestigious once meant 'full of tricks.' What was a juggler's deception became a social credential — we still call it prestige, but we mean the opposite of what the Romans did.",
  },
  // ── SEMANTIC BLEACHING ───────────────────────────────────────────────────────
  {
    root: "terrible",
    lang: "Latin → Modern English",
    meaning: "semantic drift — bleaching",
    timeline: [
      { era: "Latin (terribilis)", meaning: "causing terror; frightening" },
      { era: "Middle English", meaning: "inspiring great fear or dread", blank: true },
      { era: "16th–17th century", meaning: "formidably great; intensely powerful" },
      { era: "18th century", meaning: "very bad, of poor quality", blank: true },
      { era: "Modern English", meaning: "bad; also used as intensifier ('terribly nice')" },
    ],
    tension:
      "Terrible once meant what Tolkien's Balrog was. Two centuries of casual use turned a word for divine terror into a word for a disappointing meal.",
  },
  {
    root: "fantastic",
    lang: "Greek → Latin → Modern English",
    meaning: "semantic drift — bleaching",
    timeline: [
      { era: "Greek (phantastikos)", meaning: "able to present to the mind; imaginary" },
      { era: "Latin / Medieval", meaning: "produced by the imagination; unreal", blank: true },
      { era: "16th century English", meaning: "existing only in imagination; bizarre" },
      { era: "17th–18th century", meaning: "extravagant, capricious, strange", blank: true },
      { era: "Modern English", meaning: "excellent, wonderful (informal intensifier)" },
    ],
    tension:
      "Fantastic began as 'what the mind invents.' The imagination was suspect in classical thought — 'unreal' became 'eccentric' became 'excellent' as imagination was rehabilitated.",
  },
  {
    root: "incredible",
    lang: "Latin → Modern English",
    meaning: "semantic drift — bleaching",
    timeline: [
      { era: "Latin (incredibilis)", meaning: "not able to be believed; beyond belief" },
      { era: "Middle English", meaning: "too extraordinary to be believed", blank: true },
      { era: "16th–17th century", meaning: "surpassing belief; astonishing" },
      { era: "19th century", meaning: "very impressive, extraordinary", blank: true },
      { era: "Modern English", meaning: "great, excellent (informal intensifier)" },
    ],
    tension:
      "Incredible means the impossible has happened. We use it for pizza. The word now works as a compliment precisely because its original force — the shock of the unbelievable — has drained away.",
  },
  {
    root: "idiot",
    lang: "Greek → Latin → Modern English",
    meaning: "semantic drift — euphemism treadmill",
    timeline: [
      { era: "Greek (idiōtēs)", meaning: "a private person; one who takes no part in public life" },
      { era: "Latin (idiota)", meaning: "an uneducated, ignorant person", blank: true },
      { era: "Middle English", meaning: "a person of low intelligence; a simpleton" },
      { era: "19th–20th century", meaning: "a clinical term for severe intellectual disability", blank: true },
      { era: "Modern English", meaning: "a general insult for foolishness" },
    ],
    tension:
      "The Greeks considered anyone who didn't participate in democracy to be an 'idiot.' The word climbed down from political abstention through ignorance to clinical diagnosis to everyday insult.",
  },
  // ── TECH DRIFT ───────────────────────────────────────────────────────────────
  {
    root: "virus",
    lang: "Latin → Modern English",
    meaning: "semantic drift — metaphor extension",
    timeline: [
      { era: "Latin (virus)", meaning: "poison, venom, slimy liquid" },
      { era: "18th century", meaning: "a poisonous or noxious substance", blank: true },
      { era: "19th century", meaning: "a submicroscopic infectious agent (biology)" },
      { era: "1970s computing", meaning: "a self-replicating program that damages systems", blank: true },
      { era: "Modern English", meaning: "biological pathogen and/or malicious software" },
    ],
    tension:
      "Virus traveled from Roman poison to invisible biological agent to digital destroyer — the same metaphor of invisible contamination applied at three different scales of reality.",
  },
  {
    root: "cloud",
    lang: "Old English → Modern English",
    meaning: "semantic drift — metaphor extension",
    timeline: [
      { era: "Old English (clud)", meaning: "a mass of rock; a hill" },
      { era: "Middle English", meaning: "a mass of condensed water vapor in the sky", blank: true },
      { era: "17th–19th century", meaning: "anything resembling clouds (dust, smoke, gloom)" },
      { era: "Early 21st century", meaning: "networked remote storage and computing infrastructure", blank: true },
      { era: "Modern English", meaning: "sky vapor and/or internet storage" },
    ],
    tension:
      "Cloud started as a rock. Then it floated. Then it became a metaphor for anything that billows and conceals. Now it stores your photographs somewhere no one can clearly point to.",
  },
];
