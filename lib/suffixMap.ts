export type SuffixCategory =
  | "AGENT"           // -er/-or/-ess/-ist/-eer: one who does or belongs to
  | "NOMINALIZER"     // -tion/-ness/-ity/-ment/-ism/-ance/-hood/-ship/-dom/-age/-ure
  | "CLASSIFIER"      // -ard: one excessively or unfavorably characterized by
  | "ADJECTIVIZER"    // -able/-ful/-less/-ous/-al/-ic/-ive/-ish/-ary
  | "VERBALIZER"      // -ize/-ify/-en/-ate
  | "ADVERBIALIZER"   // -ly
  | "DIMINUTIVE"      // -let/-ling/-ette/-y/-kin: small or affectionate version of
  | "DECEPTIVE";      // looks like a suffix but isn't, or is inflectional not derivational

export type SuffixEntry = {
  suffix: string;
  meaning: string;
  category: SuffixCategory;
  transformsTo?: "noun" | "verb" | "adjective" | "adverb";
  attachesTo?: ("noun" | "verb" | "adjective")[];
  origin?: string;
  examples: string[];
  notes?: string;
};

export const SUFFIX_MAP: SuffixEntry[] = [
  /* ── AGENT ─────────────────────────────────────────────────── */
  {
    suffix: "er",
    meaning: "one who performs the action",
    category: "AGENT",
    transformsTo: "noun",
    attachesTo: ["verb"],
    origin: "Old English -ere, Proto-Germanic *-ārijaz",
    examples: ["teacher", "writer", "baker", "runner", "driver"],
    notes:
      "Also forms comparatives (taller) — same form, different function; see DECEPTIVE",
  },
  {
    suffix: "or",
    meaning: "one who performs the action",
    category: "AGENT",
    transformsTo: "noun",
    attachesTo: ["verb"],
    origin: "Latin -or, -orem, frequently via Old French",
    examples: ["actor", "senator", "editor", "professor", "governor"],
    notes:
      "Latinate doublet of -er; tends to attach to Latinate verb stems (act→actor, not *acter)",
  },
  {
    suffix: "eer",
    meaning: "one occupied with or dealing in",
    category: "AGENT",
    transformsTo: "noun",
    attachesTo: ["noun"],
    origin: "Old French -ier, from Latin -arius",
    examples: ["engineer", "volunteer", "profiteer", "puppeteer", "musketeer"],
    notes: "Can carry a dismissive or satirical register (profiteer, racketeer)",
  },
  {
    suffix: "ist",
    meaning: "one who practices or adheres to a doctrine",
    category: "AGENT",
    transformsTo: "noun",
    attachesTo: ["noun"],
    origin: "Greek -istes via Latin -ista",
    examples: ["artist", "scientist", "journalist", "pianist", "racist"],
    notes:
      "Covers both professional identity and ideological adherence under one form",
  },
  {
    suffix: "ess",
    meaning: "female agent or occupant of a role",
    category: "AGENT",
    transformsTo: "noun",
    attachesTo: ["noun"],
    origin: "Old French -esse, from Late Latin -issa, from Greek -issa",
    examples: ["actress", "hostess", "lioness", "goddess", "princess"],
    notes:
      "Many -ess forms are now considered dated in occupational use; retained here as morphological record",
  },

  /* ── NOMINALIZER ────────────────────────────────────────────── */
  {
    suffix: "tion",
    meaning: "the act, process, or result of",
    category: "NOMINALIZER",
    transformsTo: "noun",
    attachesTo: ["verb"],
    origin: "Latin -tio, -tionis; -ation via French -ation",
    examples: ["action", "creation", "tension", "permission", "education"],
    notes:
      "-ation attaches to -ate verbs; -sion appears after d/s roots (decide→decision, permit→permission)",
  },
  {
    suffix: "ness",
    meaning: "the quality or state of being",
    category: "NOMINALIZER",
    transformsTo: "noun",
    attachesTo: ["adjective"],
    origin: "Old English -nes(s), Proto-Germanic *-nassus",
    examples: ["darkness", "happiness", "kindness", "awareness", "thickness"],
    notes:
      "Germanic counterpart of Latinate -ity; the near-doublets (darkness/obscurity) reveal register",
  },
  {
    suffix: "ity",
    meaning: "the quality, state, or condition of",
    category: "NOMINALIZER",
    transformsTo: "noun",
    attachesTo: ["adjective"],
    origin: "Latin -itas, -itatis; via Old French -ité",
    examples: ["ability", "clarity", "activity", "purity", "complexity"],
    notes:
      "Tends to attach to Latinate adjectives; -ness and -ity are often near-doublets",
  },
  {
    suffix: "ment",
    meaning: "the result, means, or instrument of an action",
    category: "NOMINALIZER",
    transformsTo: "noun",
    attachesTo: ["verb"],
    origin: "Old French -ment, from Latin -mentum",
    examples: ["movement", "government", "treatment", "judgment", "development"],
    notes:
      "Attaches more readily to French-origin verbs (*run-ment does not exist). See DECEPTIVE for fused forms",
  },
  {
    suffix: "ism",
    meaning: "a system, doctrine, practice, or pathological condition",
    category: "NOMINALIZER",
    transformsTo: "noun",
    attachesTo: ["noun", "adjective"],
    origin: "Greek -ismos via Latin -ismus",
    examples: ["capitalism", "racism", "criticism", "metabolism", "organism"],
    notes:
      "Same form covers ideologies, practices, medical conditions, and artistic styles",
  },
  {
    suffix: "ance",
    meaning: "the state, quality, or action of",
    category: "NOMINALIZER",
    transformsTo: "noun",
    attachesTo: ["verb"],
    origin: "Latin -antia / -entia via Old French -ance / -ence",
    examples: ["resistance", "confidence", "silence", "tolerance", "existence"],
    notes:
      "-ance vs. -ence spelling is etymological (L. -ant- vs. -ent-), not predictable from meaning",
  },
  {
    suffix: "hood",
    meaning: "the state, condition, or character of",
    category: "NOMINALIZER",
    transformsTo: "noun",
    attachesTo: ["noun"],
    origin: "Old English -hād, Proto-Germanic *-haidaz",
    examples: ["childhood", "neighborhood", "brotherhood", "falsehood", "manhood"],
    notes: "Primarily attaches to nouns denoting persons or life stages",
  },
  {
    suffix: "ship",
    meaning: "the status, skill, office, or domain of",
    category: "NOMINALIZER",
    transformsTo: "noun",
    attachesTo: ["noun"],
    origin: "Old English -scipe, Proto-Germanic *-skipiz",
    examples: ["friendship", "leadership", "scholarship", "hardship", "craftsmanship"],
    notes:
      "Encodes both relational roles (friendship) and mastery (swordsmanship); 'hardship' is a lexicalized compound",
  },
  {
    suffix: "dom",
    meaning: "the domain, realm, or condition of",
    category: "NOMINALIZER",
    transformsTo: "noun",
    attachesTo: ["noun", "adjective"],
    origin: "Old English -dōm (judgment, power), Proto-Germanic *-dōmaz",
    examples: ["freedom", "kingdom", "boredom", "wisdom", "stardom"],
    notes:
      "Related to free-standing 'doom' (judgment); encodes both political domains and abstract states",
  },
  {
    suffix: "age",
    meaning: "the action, result, or aggregate of",
    category: "NOMINALIZER",
    transformsTo: "noun",
    attachesTo: ["verb", "noun"],
    origin: "Old French -age, from Latin -aticum",
    examples: ["storage", "coverage", "breakage", "voyage", "marriage"],
    notes:
      "In 'language', 'image', 'courage' — base is not a productive English word; see DECEPTIVE",
  },
  {
    suffix: "ure",
    meaning: "the process, result, or instrument of",
    category: "NOMINALIZER",
    transformsTo: "noun",
    attachesTo: ["verb"],
    origin: "Latin -ura via Old French -ure",
    examples: ["failure", "pressure", "closure", "departure", "procedure"],
    notes:
      "'Culture', 'structure' are opaque borrowings — the morpheme boundary is now fused in these forms",
  },

  /* ── CLASSIFIER ─────────────────────────────────────────────── */
  {
    suffix: "ard",
    meaning: "one excessively or unfavorably characterized by",
    category: "CLASSIFIER",
    transformsTo: "noun",
    attachesTo: ["verb", "noun", "adjective"],
    origin: "Old French -ard, from Proto-Germanic *-hard (strong, hardy)",
    examples: ["drunkard", "braggart", "dullard", "coward", "wizard"],
    notes:
      "Ironic origin: literally means 'strong' (cf. Richard = 'strong king'), became pejorative in Old French. 'Wizard' is a rare positive survivor. See DECEPTIVE for fused -ard in 'standard', 'bastard'",
  },

  /* ── ADJECTIVIZER ───────────────────────────────────────────── */
  {
    suffix: "able",
    meaning: "capable of, worthy of, or liable to",
    category: "ADJECTIVIZER",
    transformsTo: "adjective",
    attachesTo: ["verb"],
    origin: "Latin -abilis / -ibilis via Old French -able",
    examples: ["readable", "breakable", "capable", "flexible", "credible"],
    notes:
      "-able attaches to living English verbs (readable, printable); -ible is frozen in Latinate forms (visible, possible)",
  },
  {
    suffix: "ful",
    meaning: "full of, characterized by, or causing",
    category: "ADJECTIVIZER",
    transformsTo: "adjective",
    attachesTo: ["noun"],
    origin: "Old English -full, from the adjective 'full'",
    examples: ["beautiful", "careful", "harmful", "hopeful", "powerful"],
    notes:
      "Historically transparent (beautiful = full of beauty); now also functions as a measure noun (a cupful)",
  },
  {
    suffix: "less",
    meaning: "without, lacking, or beyond the reach of",
    category: "ADJECTIVIZER",
    transformsTo: "adjective",
    attachesTo: ["noun"],
    origin: "Old English -lēas, from adjective 'lēas' (free from, devoid of)",
    examples: ["hopeless", "careless", "harmless", "endless", "speechless"],
    notes: "Systematic antonym-former with -ful (hopeful/hopeless, careful/careless)",
  },
  {
    suffix: "ous",
    meaning: "full of, having the qualities of, or relating to",
    category: "ADJECTIVIZER",
    transformsTo: "adjective",
    attachesTo: ["noun"],
    origin: "Latin -osus / -iosus via Old French -ous / -ieux",
    examples: ["dangerous", "glorious", "famous", "obvious", "nervous"],
    notes:
      "-ious appears when the base ends in certain consonant clusters (glory→glorious); functionally identical to -ous",
  },
  {
    suffix: "al",
    meaning: "of, relating to, or characterized by",
    category: "ADJECTIVIZER",
    transformsTo: "adjective",
    attachesTo: ["noun"],
    origin: "Latin -alis via Old French -al",
    examples: ["natural", "legal", "musical", "personal", "digital"],
    notes:
      "Also nominalizes (proposal, trial, referral) — same form changes class by syntax. See DECEPTIVE for fused -al words",
  },
  {
    suffix: "ic",
    meaning: "of, relating to, or having the character of",
    category: "ADJECTIVIZER",
    transformsTo: "adjective",
    attachesTo: ["noun"],
    origin: "Greek -ikos via Latin -icus",
    examples: ["electric", "historic", "atomic", "chronic", "organic"],
    notes:
      "More common in scientific and learned vocabulary; can also nominalize (classic, critic, topic)",
  },
  {
    suffix: "ive",
    meaning: "tending to, having the nature of, or performing",
    category: "ADJECTIVIZER",
    transformsTo: "adjective",
    attachesTo: ["verb"],
    origin: "Latin -ivus via Old French -if/-ive",
    examples: ["active", "creative", "massive", "sensitive", "effective"],
    notes:
      "Frequently substantivizes as well (the native, the executive, an alternative)",
  },
  {
    suffix: "ish",
    meaning: "somewhat, approximately like, or characteristic of",
    category: "ADJECTIVIZER",
    transformsTo: "adjective",
    attachesTo: ["noun", "adjective"],
    origin: "Old English -isc, Proto-Germanic *-iskaz",
    examples: ["childish", "reddish", "foolish", "Spanish", "smallish"],
    notes:
      "The only English suffix that productively attaches to time expressions (fiveish, nineish)",
  },
  {
    suffix: "ary",
    meaning: "of, relating to, belonging to, or connected with",
    category: "ADJECTIVIZER",
    transformsTo: "adjective",
    attachesTo: ["noun"],
    origin: "Latin -arius / -orius via Old French -aire / -oire",
    examples: ["military", "ordinary", "necessary", "honorary", "dietary"],
    notes:
      "-ory often implies a place or instrument (dormitory, laboratory) while -ary is more purely relational; both also nominalize freely",
  },

  /* ── VERBALIZER ─────────────────────────────────────────────── */
  {
    suffix: "ize",
    meaning: "to make, cause to become, or treat with",
    category: "VERBALIZER",
    transformsTo: "verb",
    attachesTo: ["noun", "adjective"],
    origin: "Greek -izein via Latin -izare via French -iser",
    examples: ["organize", "realize", "modernize", "criticize", "digitize"],
    notes:
      "Most productive verbalizer in contemporary English (weaponize, incentivize); -ise is the British spelling, not a different morpheme",
  },
  {
    suffix: "ify",
    meaning: "to make, cause to be, or become",
    category: "VERBALIZER",
    transformsTo: "verb",
    attachesTo: ["noun", "adjective"],
    origin: "Latin -ificare, from facere (to make)",
    examples: ["classify", "justify", "notify", "terrify", "simplify"],
    notes:
      "Less productive than -ize in new coinages; tends to attach to already-Latinate bases (classify, not *chairify)",
  },
  {
    suffix: "en",
    meaning: "to cause to become, or to become",
    category: "VERBALIZER",
    transformsTo: "verb",
    attachesTo: ["adjective", "noun"],
    origin: "Old English -nian, Proto-Germanic *-inōjan",
    examples: ["darken", "soften", "frighten", "strengthen", "widen"],
    notes:
      "Only productive on monosyllabic or disyllabic bases; *beautyen does not work — phonological constraint, not semantic",
  },
  {
    suffix: "ate",
    meaning: "to cause, make, or perform",
    category: "VERBALIZER",
    transformsTo: "verb",
    attachesTo: ["noun", "adjective"],
    origin: "Latin past participle -atus / -atum",
    examples: ["create", "educate", "separate", "regulate", "animate"],
    notes:
      "Triple class-shifter: create (verb), the graduate (noun), a desolate place (adjective) — same form in three syntactic roles",
  },

  /* ── ADVERBIALIZER ──────────────────────────────────────────── */
  {
    suffix: "ly",
    meaning: "in the manner of, having the quality of",
    category: "ADVERBIALIZER",
    transformsTo: "adverb",
    attachesTo: ["adjective"],
    origin: "Old English -lice, from -lic (having the form/body of); related to 'like'",
    examples: ["quickly", "carefully", "honestly", "deeply", "suddenly"],
    notes:
      "Also forms adjectives from nouns (friendly, kingly, manly) — polyfunctional suffix",
  },

  /* ── DIMINUTIVE ─────────────────────────────────────────────── */
  {
    suffix: "let",
    meaning: "small or lesser version of",
    category: "DIMINUTIVE",
    transformsTo: "noun",
    attachesTo: ["noun"],
    origin: "Old French -elet, a double diminutive from -el + -et",
    examples: ["booklet", "droplet", "piglet", "streamlet", "leaflet", "tablet"],
    notes:
      "One of the most transparent diminutives still productive in English; 'tablet' and 'hamlet' are older survivals where the source noun has shifted",
  },
  {
    suffix: "ling",
    meaning: "small, young, or inferior version of; one belonging to or characterized by",
    category: "DIMINUTIVE",
    transformsTo: "noun",
    attachesTo: ["noun", "adjective"],
    origin: "Old English -ling, Proto-Germanic *-lingaz",
    examples: ["duckling", "sapling", "seedling", "youngling", "weakling", "underling"],
    notes:
      "Can carry a derogatory nuance when applied to persons (weakling, hireling, underling). 'Darling' (dear + -ling) is now fully lexicalized",
  },
  {
    suffix: "ette",
    meaning: "small or diminutive version of; also used for imitation materials and feminine roles",
    category: "DIMINUTIVE",
    transformsTo: "noun",
    attachesTo: ["noun"],
    origin: "French -ette, feminine diminutive of -et",
    examples: ["kitchenette", "statuette", "novelette", "diskette", "cigarette", "serviette"],
    notes:
      "Borrowed from French; also forms imitation-material nouns (leatherette, flannelette) and feminine occupational nouns (usherette, majorette), making its semantics broader than pure size reduction",
  },
  {
    suffix: "y / ie",
    meaning: "affectionate or diminutive form of; hypocoristic",
    category: "DIMINUTIVE",
    transformsTo: "noun",
    attachesTo: ["noun"],
    origin: "Middle English, partly from Scottish -ie; exact origin disputed",
    examples: ["doggy", "birdie", "kitty", "daddy", "auntie", "tummy", "belly"],
    notes:
      "Primarily hypocoristic (pet-name forming) rather than size-reducing. Distinct from adjectivizer -y (rocky, sleepy). Dominant in baby-talk and intimate registers; highly productive",
  },
  {
    suffix: "kin",
    meaning: "small diminutive of",
    category: "DIMINUTIVE",
    transformsTo: "noun",
    attachesTo: ["noun"],
    origin: "Middle Dutch -kin / Low German -ken",
    examples: ["lambkin", "manikin", "catkin", "napkin", "firkin", "pumpkin"],
    notes:
      "Largely fossilized; in 'napkin' (nape + kin = tablecloth) and 'firkin' (quarter-barrel) the base is opaque or the size meaning is lost. 'Manikin' survives as a technical term",
  },

  /* ── DECEPTIVE ──────────────────────────────────────────────── */
  {
    suffix: "-ter (fused)",
    meaning: "[not a suffix]",
    category: "DECEPTIVE",
    examples: ["butter", "water", "winter", "otter", "plaster"],
    notes:
      "Not a suffix. 'Butter' from Latin butyrum via Old English butere. The -ter is part of the root, cannot be decomposed. Contrast agent -er: writer = write + -er",
  },
  {
    suffix: "-er (comparative)",
    meaning: "[not a derivational suffix]",
    category: "DECEPTIVE",
    examples: ["taller", "faster", "harder", "older", "smarter"],
    notes:
      "The comparative -er is inflectional, not derivational — it creates a word form, not a new word. 'Taller' does not mean 'one who talls'",
  },
  {
    suffix: "-al (fused)",
    meaning: "[not a suffix in these words]",
    category: "DECEPTIVE",
    examples: ["animal", "rival", "regal", "canal", "medal"],
    notes:
      "'Animal' from Latin animale — the -al is not the relational suffix; 'rival' from rivalis (sharing a river). These words look like base + -al but cannot be productively decomposed",
  },
  {
    suffix: "-ard (fused)",
    meaning: "[not a suffix in these words]",
    category: "DECEPTIVE",
    examples: ["standard", "bastard", "toward", "onward"],
    notes:
      "'Standard' from Old French estendart (battle flag) — no agent -ard involved. 'Toward' contains directional -ward (OE -weard), not the classifier suffix -ard",
  },
  {
    suffix: "-ment (fused)",
    meaning: "[not a suffix in these words]",
    category: "DECEPTIVE",
    examples: ["moment", "torment", "cement", "comment", "document"],
    notes:
      "Borrowed whole from Latin with -mentum fused into the stem. No productive English base (*ceme, *mome). Contrast transparent movement = move + -ment",
  },
  {
    suffix: "-ness (lexicalized)",
    meaning: "[suffix transparency lost]",
    category: "DECEPTIVE",
    examples: ["business", "wilderness"],
    notes:
      "'Business' from Old English bisignes — now completely fused; 'wilderness' base *wilder is not a standalone adjective in Modern English. Illustrates how suffix transparency degrades over time",
  },
  {
    suffix: "-age (opaque base)",
    meaning: "[base not recoverable]",
    category: "DECEPTIVE",
    examples: ["language", "image", "courage", "marriage"],
    notes:
      "'Language' base is Latin lingua (tongue), not *lang. 'Courage' from Old French corage, from Latin cor (heart). Borrowed as whole forms; -age is not the productive English suffix here",
  },
];

export const SUFFIX_INDEX: Record<string, SuffixEntry> = Object.fromEntries(
  SUFFIX_MAP.map(entry => [entry.suffix, entry])
);
