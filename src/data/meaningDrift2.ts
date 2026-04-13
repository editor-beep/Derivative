import { applyDatasetProvenance } from "./sources";
// src/data/meaningDrift2.ts
// Second batch of meaning drift entries — SEMANTIC_POOL (timeline format).
// Covers the entries from the original seed data not included in meaningDrift.ts:
//   md-05, md-10–md-15, md-17–md-18, md-21–md-23, md-25,
//   md-27, md-31–md-35, md-37, md-39–md-40, md-42–md-45.
// Skips entries already in insightEngine.ts (nice, silly, awful, villain, bully)
// and entries already in meaningDrift.ts.

export const MEANING_DRIFT_POOL_2 = [
  // ── PEJORATION (continued) ───────────────────────────────────────────────────
  {
    root: "naughty",
    lang: "Middle English → Modern English",
    meaning: "semantic drift — pejoration",
    timeline: [
      { era: "Old English (nawiht)", meaning: "having nothing; a person of no means" },
      { era: "Middle English", meaning: "of little worth; morally bad", blank: true },
      { era: "15th–16th century", meaning: "wicked, immoral (adult behavior)" },
      { era: "17th–18th century", meaning: "mildly improper; racy", blank: true },
      { era: "Modern English", meaning: "disobedient (children); mildly risqué (adults)" },
    ],
    tension:
      "Naughty began as poverty — 'naught' meant nothing. The wealthy decided that having nothing was a moral condition, and the word slid from destitution through wickedness to a child's misbehavior.",
  },
  {
    root: "cunning",
    lang: "Old English → Modern English",
    meaning: "semantic drift — pejoration",
    timeline: [
      { era: "Old English (cunning)", meaning: "knowledgeable, learned, skilled" },
      { era: "Middle English", meaning: "clever, ingenious", blank: true },
      { era: "14th–15th century", meaning: "skillfully deceptive; artful" },
      { era: "16th–17th century", meaning: "crafty, sly, scheming", blank: true },
      { era: "Modern English", meaning: "artfully deceptive; clever in an underhanded way" },
    ],
    tension:
      "Cunning once meant what 'knowledgeable' means now. The verb 'can' shares this root — to know how. The slide from 'knowing' to 'scheming' reveals a cultural suspicion of expertise.",
  },
  {
    root: "artificial",
    lang: "Latin → Modern English",
    meaning: "semantic drift — pejoration",
    timeline: [
      { era: "Latin (artificialis)", meaning: "full of art or skill; belonging to craft" },
      { era: "Middle English", meaning: "made by human art or skill", blank: true },
      { era: "16th century", meaning: "not produced by nature; man-made" },
      { era: "17th–18th century", meaning: "simulated, not genuine", blank: true },
      { era: "Modern English", meaning: "fake, insincere, affectedly unnatural" },
    ],
    tension:
      "Artificial once meant 'full of art' — a compliment. The word turned as 'natural' became the standard of value. What humans made became suspect; what they felt artificially became the index of their inauthenticity.",
  },
  {
    root: "vulgar",
    lang: "Latin → Modern English",
    meaning: "semantic drift — pejoration",
    timeline: [
      { era: "Latin (vulgaris)", meaning: "of the common people; ordinary, everyday" },
      { era: "Late Latin", meaning: "in common use; the Vulgate Bible (common Latin)", blank: true },
      { era: "Middle English", meaning: "in the vernacular language; of ordinary people" },
      { era: "17th century", meaning: "lacking cultivation; unrefined", blank: true },
      { era: "Modern English", meaning: "crude, offensive, sexually coarse" },
    ],
    tension:
      "Vulgar simply meant 'of the people' — the Vulgate Bible was named for being in the people's language. Elite contempt for the masses rebranded the word for 'common' into the word for 'crude.'",
  },
  {
    root: "boor",
    lang: "Dutch/German → English",
    meaning: "semantic drift — pejoration",
    timeline: [
      { era: "Old Dutch (boer)", meaning: "farmer, peasant, cultivator of the land" },
      { era: "Early Modern English", meaning: "a rustic; a rough country person", blank: true },
      { era: "16th–17th century", meaning: "an unmannerly, clumsy person" },
      { era: "Modern English", meaning: "a rude, unrefined, insensitive person", blank: true },
    ],
    tension:
      "Boor is farmer turned insult — another case of urban culture deciding that working the land was morally and socially inferior. The Boers of South Africa kept the neutral meaning; English kept only the contempt.",
  },
  {
    root: "quean",
    lang: "Old English → Modern English",
    meaning: "semantic drift — pejoration",
    timeline: [
      { era: "Old English (cwene)", meaning: "woman; a female person" },
      { era: "Middle English", meaning: "a woman of low status; a bold woman", blank: true },
      { era: "14th–16th century", meaning: "an impudent, disreputable woman" },
      { era: "17th century onward", meaning: "a prostitute; a disreputable woman", blank: true },
    ],
    tension:
      "Quean began as a neutral word for woman — it was the same root as 'queen' (which took the prestige path). Quean took the contempt path: the same syllable, the same root, split by class into majesty and disgrace.",
  },
  // ── AMELIORATION (continued) ─────────────────────────────────────────────────
  {
    root: "marshal",
    lang: "Frankish → Old French → English",
    meaning: "semantic drift — amelioration",
    timeline: [
      { era: "Frankish (marah-scalc)", meaning: "horse-servant; one who tends horses" },
      { era: "Old French (maréchal)", meaning: "stable-keeper, groom", blank: true },
      { era: "12th–13th century", meaning: "officer in charge of the cavalry" },
      { era: "14th–15th century", meaning: "high military official, field commander", blank: true },
      { era: "Modern English", meaning: "highest military rank; a law enforcement officer" },
    ],
    tension:
      "Marshal began as a stable hand. The horses were the most powerful military asset, so the person who managed them rose with the technology they controlled — from mucking stalls to commanding armies.",
  },
  {
    root: "minister",
    lang: "Latin → Modern English",
    meaning: "semantic drift — amelioration",
    timeline: [
      { era: "Latin (minister)", meaning: "servant, attendant (from minus = less)" },
      { era: "Early Christian", meaning: "servant of God; an ecclesiastical official", blank: true },
      { era: "Middle English", meaning: "a clergyman; one who performs religious rites" },
      { era: "16th–17th century", meaning: "a government official; royal adviser", blank: true },
      { era: "Modern English", meaning: "a cabinet secretary; a head of department; Prime Minister" },
    ],
    tension:
      "Minister literally means 'the lesser one' — the word for servant became the word for head of government. The Christian rebranding of servitude as honor did the work; politics completed the reversal.",
  },
  {
    root: "brave",
    lang: "Italian/Spanish → English",
    meaning: "semantic drift — amelioration",
    timeline: [
      { era: "Italian/Spanish (bravo)", meaning: "wild, savage, untamed" },
      { era: "15th century English", meaning: "fierce, barbarous, cruel", blank: true },
      { era: "16th century", meaning: "bold in the face of danger; showy, fine" },
      { era: "17th century", meaning: "possessing moral courage", blank: true },
      { era: "Modern English", meaning: "courageous, admirable under pressure" },
    ],
    tension:
      "Brave entered English meaning savage. European culture slowly reframed wildness as virtue — the untamed energy of the barbarian became the moral courage of the hero. The word was civilized before the concept was.",
  },
  {
    root: "bold",
    lang: "Old English → Modern English",
    meaning: "semantic drift — amelioration",
    timeline: [
      { era: "Old English (bald/beald)", meaning: "reckless, audacious, overconfident" },
      { era: "Middle English", meaning: "presumptuous, impudent, forward", blank: true },
      { era: "14th–15th century", meaning: "courageous, daring (neutral to positive)" },
      { era: "Modern English", meaning: "confident, striking, admirable", blank: true },
    ],
    tension:
      "Bold began as an insult for overstepping. As individualism rose in value, the reckless presumptuous person became the admirable self-starter. The same behavior, rebranded by a cultural shift.",
  },
  {
    root: "fame",
    lang: "Latin → Modern English",
    meaning: "semantic drift — amelioration",
    timeline: [
      { era: "Latin (fama)", meaning: "report, rumor; what people say (good or bad)" },
      { era: "Old French (fame)", meaning: "reputation, renown — still neutral", blank: true },
      { era: "Middle English", meaning: "reputation, either good or ill" },
      { era: "Early Modern English", meaning: "good reputation; celebrity", blank: true },
      { era: "Modern English", meaning: "widespread celebrity; renown (almost always positive)" },
    ],
    tension:
      "Fame once meant any report — scandal and glory alike. The word narrowed exclusively to positive public attention, while 'infamy' (in-fame) was left to carry the negative. Fame won the prestige; infamy kept the dirt.",
  },
  {
    root: "fond",
    lang: "Middle English → Modern English",
    meaning: "semantic drift — amelioration",
    timeline: [
      { era: "Middle English (fonned)", meaning: "infatuated, foolish, simple-minded" },
      { era: "15th century", meaning: "doting, foolishly affectionate", blank: true },
      { era: "16th century", meaning: "affectionate in an excessive way" },
      { era: "17th–18th century", meaning: "having a liking or affection for", blank: true },
      { era: "Modern English", meaning: "tender, affectionate, lovingly attached" },
    ],
    tension:
      "Fond was once an insult — the 'fonned' person was a fool. The word's journey shows how societies came to value affection over reason: the fool who loves became the person most fully alive.",
  },
  // ── SEMANTIC BLEACHING (continued) ───────────────────────────────────────────
  {
    root: "awesome",
    lang: "Old English → Modern English",
    meaning: "semantic drift — bleaching",
    timeline: [
      { era: "17th century English", meaning: "inspiring awe; profoundly reverential" },
      { era: "18th century", meaning: "dreadful, terrifying — the awe of fear", blank: true },
      { era: "19th century", meaning: "overwhelming in scale or majesty" },
      { era: "1970s–80s American slang", meaning: "excellent, impressive, wonderful", blank: true },
      { era: "Modern English", meaning: "great, cool (casual intensifier)" },
    ],
    tension:
      "Awesome once described God and natural catastrophe. By the 1980s it described a good sandwich. The entire weight of divine terror drained in under a century of casual use.",
  },
  {
    root: "literal",
    lang: "Latin → Modern English",
    meaning: "semantic drift — bleaching",
    timeline: [
      { era: "Latin (litteralis)", meaning: "of or belonging to letters; concerning written text" },
      { era: "Middle English", meaning: "according to the exact letter of the text", blank: true },
      { era: "16th–17th century", meaning: "actual, not figurative; word-for-word true" },
      { era: "20th century", meaning: "used as an intensifier even in figurative contexts", blank: true },
      { era: "Modern English", meaning: "factually precise AND emphatic filler ('I literally died')" },
    ],
    tension:
      "Literal was the most precise word in the language — it meant exactly and only what it said. It is now used to mean the opposite: hyperbolic emphasis. The word for precision became a tool for exaggeration.",
  },
  {
    root: "actually",
    lang: "Medieval Latin → Modern English",
    meaning: "semantic drift — bleaching",
    timeline: [
      { era: "Medieval Latin (actualis)", meaning: "active, in act; pertaining to real deeds" },
      { era: "Early English", meaning: "in fact, in reality; as a matter of actual truth", blank: true },
      { era: "18th–19th century", meaning: "used to introduce a correction or real state of affairs" },
      { era: "Late 20th century", meaning: "discourse filler; softener or contrast marker", blank: true },
      { era: "Modern English", meaning: "truth-marker AND social hedge ('actually, that's fine')" },
    ],
    tension:
      "Actually once staked a claim to reality — it meant 'in actual fact.' Now it introduces mild disagreement or softens a correction. The word for certainty became a politeness tool.",
  },
  {
    root: "really",
    lang: "Latin → Modern English",
    meaning: "semantic drift — bleaching",
    timeline: [
      { era: "15th century English", meaning: "in reality; in fact; genuinely" },
      { era: "17th century", meaning: "truly, actually (reinforcing a claim)", blank: true },
      { era: "19th century", meaning: "very, extremely (intensifier)" },
      { era: "20th century", meaning: "tag question ('really?'); surprise marker", blank: true },
      { era: "Modern English", meaning: "genuinely AND general intensifier AND skeptical tag" },
    ],
    tension:
      "Really compressed reality itself into a filler syllable. It now does so much conversational work — intensifying, questioning, expressing surprise — that its original claim on truth has nearly vanished.",
  },
  {
    root: "dreadful",
    lang: "Old English → Modern English",
    meaning: "semantic drift — bleaching",
    timeline: [
      { era: "Old English root (draedan)", meaning: "causing dread; inspiring terror or great fear" },
      { era: "Middle English (dredful)", meaning: "awe-inspiring; solemnly terrible", blank: true },
      { era: "16th–17th century", meaning: "very great in extent; formidably bad" },
      { era: "18th–19th century", meaning: "very bad; extremely disagreeable", blank: true },
      { era: "Modern English", meaning: "bad; also used as intensifier ('dreadfully sorry')" },
    ],
    tension:
      "Dreadful once described the wrath of God. It now describes a dull lecture or a bad haircut. Terror became a synonym for inconvenience as the emotion of dread lost its catastrophic scale.",
  },
  {
    root: "tremendous",
    lang: "Latin → Modern English",
    meaning: "semantic drift — bleaching",
    timeline: [
      { era: "Latin (tremendus)", meaning: "causing trembling; to be feared; terrifying" },
      { era: "17th century English", meaning: "overwhelming, formidable in power or size", blank: true },
      { era: "18th century", meaning: "exceedingly great; extraordinary in degree" },
      { era: "19th–20th century", meaning: "wonderful, excellent, impressive", blank: true },
      { era: "Modern English", meaning: "very large or great; also a positive intensifier" },
    ],
    tension:
      "Tremendous meant 'to be trembled at.' The same path as terrible, awful, dreadful — a word for shaking fear turned into a synonym for 'very good.' English has systematically recycled its terror vocabulary into praise.",
  },
  // ── METAPHOR & TECH DRIFT (continued) ────────────────────────────────────────
  {
    root: "mouse",
    lang: "Old English → Modern English",
    meaning: "semantic drift — metaphor extension",
    timeline: [
      { era: "Old English (mus)", meaning: "the small rodent" },
      { era: "Middle English", meaning: "used as a term of endearment (tiny creature)", blank: true },
      { era: "19th–early 20th century", meaning: "a black eye; a quiet, timid person" },
      { era: "1965 (Engelbart)", meaning: "a handheld input device for computing", blank: true },
      { era: "Modern English", meaning: "the animal and the input device equally" },
    ],
    tension:
      "Douglas Engelbart named his 1965 invention a 'mouse' because the cord looked like a tail. A word that had meant the same small mammal for a thousand years split into two simultaneous meanings in a single engineering report.",
  },
  {
    root: "spam",
    lang: "American English → Internet English",
    meaning: "semantic drift — metaphor extension",
    timeline: [
      { era: "1937 (Hormel)", meaning: "SPAM: a brand of canned spiced ham" },
      { era: "1970 (Monty Python)", meaning: "the menu sketch — everything is SPAM, inescapable and repetitive", blank: true },
      { era: "1988–93 (early internet)", meaning: "mass unsolicited posts flooding newsgroups" },
      { era: "1990s onward", meaning: "unsolicited bulk email", blank: true },
      { era: "Modern English", meaning: "unwanted digital messages; the act of sending them" },
    ],
    tension:
      "The Monty Python sketch — where every dish is unavoidably SPAM — became the metaphor for unavoidable digital noise. A canned meat brand traveled through a comedy sketch to become the universal word for internet pollution.",
  },
  {
    root: "troll",
    lang: "Old Norse → Internet English",
    meaning: "semantic drift — metaphor extension",
    timeline: [
      { era: "Old Norse (troll)", meaning: "a supernatural creature: cave-dweller, giant, or monster" },
      { era: "Scandinavian folklore", meaning: "a malevolent creature lurking under bridges", blank: true },
      { era: "Fishing term (trolling)", meaning: "to drag a baited line slowly through water" },
      { era: "1990s internet slang", meaning: "to post inflammatory content to provoke reactions", blank: true },
      { era: "Modern English", meaning: "an online provocateur; the act of deliberate harassment" },
    ],
    tension:
      "The internet troll may come from 'trolling' (fishing by dragging a lure) rather than the Norse monster — but the monster has since infected the metaphor. The digital troll now lives under the bridge of every comment section.",
  },
  // ── EUPHEMISM TREADMILL (continued) ──────────────────────────────────────────
  {
    root: "moron",
    lang: "Greek → American English",
    meaning: "semantic drift — euphemism treadmill",
    timeline: [
      { era: "Greek (moros)", meaning: "dull, sluggish, foolish" },
      { era: "1910 (Goddard)", meaning: "a clinical term: IQ 51–70 (proposed by psychologist Henry Goddard)", blank: true },
      { era: "1920s–30s", meaning: "used in psychology and education as a formal classification" },
      { era: "Mid 20th century", meaning: "entered general use as a casual insult", blank: true },
      { era: "Modern English", meaning: "a general insult for stupidity; no longer clinical" },
    ],
    tension:
      "Moron was invented as a precise scientific term in 1910. Within a generation it had leaked into the general vocabulary as an insult. The euphemism treadmill: yesterday's clinical precision is tomorrow's slur.",
  },
  {
    root: "sanitation",
    lang: "Latin → Modern English",
    meaning: "semantic drift — euphemism treadmill",
    timeline: [
      { era: "Latin (sanitas)", meaning: "health, soundness, wholeness of body" },
      { era: "19th century reform movement", meaning: "public health improvements — sewers, clean water", blank: true },
      { era: "Late 19th–early 20th century", meaning: "waste disposal and sewage management" },
      { era: "20th century", meaning: "garbage collection and refuse management", blank: true },
      { era: "Modern English", meaning: "primarily associated with waste disposal rather than health" },
    ],
    tension:
      "Sanitation began as the language of health — the sanitary reform movement. We borrowed a word for wholeness to describe our waste because health-language made the unpleasant seem respectable. The health word now primarily means 'garbage.'",
  },
  {
    root: "special",
    lang: "Latin → Modern English",
    meaning: "semantic drift — euphemism treadmill",
    timeline: [
      { era: "Latin (specialis)", meaning: "individual, particular, belonging to a specific kind" },
      { era: "Middle English", meaning: "exceptional, remarkable, distinct from the ordinary", blank: true },
      { era: "19th–early 20th century", meaning: "especially important; set apart for a purpose" },
      { era: "Mid 20th century", meaning: "a euphemism for disability ('special needs')", blank: true },
      { era: "Modern English", meaning: "positive (exceptional) and coded (euphemistic for disability)" },
    ],
    tension:
      "Special was borrowed to soften. By making difference sound like distinction, the word entered the euphemism treadmill: as its coded meaning became widely understood, 'special' acquired a second layer of irony that the original positive meaning now must fight against.",
  },
];

// Provenance annotations
applyDatasetProvenance(MEANING_DRIFT_POOL_2 as any[], "meaning_drift_2");
