// src/data/verbRoots.ts
// 27 Latin verb entries not already covered in rootsExtended.ts, rootsExtended2.ts,
// or insightEngine.ts inline ROOT_POOL.
//
// Each entry carries principalParts (firstPres / infinitive / perfect / participle).
// Entries where the present stem and participial stem each spawned distinct English
// word-families carry entryPaths, enabling the ETYMOLOGY_FILTER lens to split them
// into a "present-stem vs. participial-stem" sort puzzle.

export const VERB_ROOTS_POOL = [

  // ── DUAL-STEM ENTRIES (entryPaths present) ────────────────────────────────────

  {
    root: "vis/vid",
    lang: "Latin",
    meaning: "see",
    targets: ["video", "evident", "evidence", "provide", "vision", "visual", "visible", "television", "invisible", "supervise"],
    required: ["video", "evident", "vision", "visual", "visible"],
    tension: "Latin 'videre' forked in two: vid- words entered English directly (video, evident), while vis- words came through French erosion of the participle visum (vision, visual) — the same act of seeing, wearing two disguises",
    principalParts: { firstPres: "video", infinitive: "videre", perfect: "vidi", participle: "visum" },
    entryPaths: {
      video: "present_stem", evident: "present_stem", evidence: "present_stem", provide: "present_stem",
      vision: "participial_stem", visual: "participial_stem", visible: "participial_stem",
      television: "participial_stem", invisible: "participial_stem", supervise: "participial_stem",
    },
  },

  {
    root: "ten/tain",
    lang: "Latin",
    meaning: "hold, keep",
    targets: ["tenant", "tenure", "tenacious", "tenet", "contain", "retain", "sustain", "obtain", "detention", "abstain"],
    required: ["tenant", "tenacious", "contain", "retain", "detention"],
    tension: "Latin 'tenere' (to hold) arrived via two routes: ten- in learned English (tenant, tenacious) and -tain- via French erosion of the stem (contain, retain, sustain) — the same grip, loosened by centuries of French",
    principalParts: { firstPres: "teneo", infinitive: "tenere", perfect: "tenui", participle: "tentum" },
    entryPaths: {
      tenant: "present_stem", tenure: "present_stem", tenacious: "present_stem", tenet: "present_stem",
      contain: "participial_stem", retain: "participial_stem", sustain: "participial_stem",
      obtain: "participial_stem", detention: "participial_stem", abstain: "participial_stem",
    },
  },

  {
    root: "pend/pens",
    lang: "Latin",
    meaning: "hang, weigh",
    targets: ["pendant", "depend", "pending", "impending", "pension", "expense", "compensate", "dispense", "suspend", "suspense"],
    required: ["pendant", "depend", "pension", "expense", "suspend"],
    tension: "Latin 'pendere' (to hang, to weigh) gave pend- words from the present stem (depend, pendant) and pens- words from the weighed-out participle (pension, expense, compensate) — physical hanging became financial accounting",
    principalParts: { firstPres: "pendeo", infinitive: "pendere", perfect: "pependi", participle: "pensum" },
    entryPaths: {
      pendant: "present_stem", depend: "present_stem", pending: "present_stem", impending: "present_stem",
      pension: "participial_stem", expense: "participial_stem", compensate: "participial_stem",
      dispense: "participial_stem", suspend: "participial_stem", suspense: "participial_stem",
    },
  },

  {
    root: "quer/quest",
    lang: "Latin",
    meaning: "seek, ask",
    targets: ["query", "inquire", "inquisition", "question", "quest", "acquisition", "exquisite", "requisite", "inquest", "inquiry"],
    required: ["query", "inquire", "question", "quest", "acquisition"],
    tension: "Latin 'quaerere' (to seek) produced quer- words directly (query, inquire) and quest- words through the participle quaesitum (question, quest, exquisite — literally 'sought out') — seeking as both process and prize",
    principalParts: { firstPres: "quaero", infinitive: "quaerere", perfect: "quaesivi", participle: "quaesitum" },
    entryPaths: {
      query: "present_stem", inquire: "present_stem", inquisition: "present_stem", inquiry: "present_stem",
      question: "participial_stem", quest: "participial_stem", acquisition: "participial_stem",
      exquisite: "participial_stem", requisite: "participial_stem", inquest: "participial_stem",
    },
  },

  {
    root: "sed/sess",
    lang: "Latin",
    meaning: "sit",
    targets: ["reside", "preside", "sediment", "sedentary", "session", "obsession", "possession", "succession", "assess", "siege"],
    required: ["reside", "preside", "sedentary", "session", "possession"],
    tension: "Latin 'sedere' (to sit) gave sid-/sed- words via the present stem (reside, preside, sediment) and sess- words via the participle sessum (session, obsession, possession) — sitting quietly generates both legal authority and legal claim",
    principalParts: { firstPres: "sedeo", infinitive: "sedere", perfect: "sedi", participle: "sessum" },
    entryPaths: {
      reside: "present_stem", preside: "present_stem", sediment: "present_stem", sedentary: "present_stem",
      session: "participial_stem", obsession: "participial_stem", possession: "participial_stem",
      succession: "participial_stem", assess: "participial_stem", siege: "participial_stem",
    },
  },

  {
    root: "mov/mot",
    lang: "Latin",
    meaning: "move",
    targets: ["move", "mobile", "remove", "mobilize", "motion", "motor", "promote", "emotion", "locomotive", "commotion"],
    required: ["move", "mobile", "motion", "motor", "emotion"],
    tension: "Latin 'movere' kept its present stem in mov-/mob- words (move, mobile, remove) and left mot- words through the participle motum (motion, motor, promote, emotion) — physical displacement became mechanical power and inner feeling",
    principalParts: { firstPres: "moveo", infinitive: "movere", perfect: "movi", participle: "motum" },
    entryPaths: {
      move: "present_stem", mobile: "present_stem", remove: "present_stem", mobilize: "present_stem",
      motion: "participial_stem", motor: "participial_stem", promote: "participial_stem",
      emotion: "participial_stem", locomotive: "participial_stem", commotion: "participial_stem",
    },
  },

  {
    root: "cid/cis",
    lang: "Latin",
    meaning: "cut, kill",
    targets: ["homicide", "suicide", "decide", "coincide", "incision", "concise", "precise", "excise", "scissors", "circumcise"],
    required: ["homicide", "decide", "incision", "concise", "precise"],
    tension: "Latin 'caedere' (to cut, to strike down) left cid- words via the present stem (homicide, decide — literally 'to cut away doubt') and cis- words from the participle caesum (incision, concise, scissors) — the cutting edge as both legal judgment and surgical knife",
    principalParts: { firstPres: "caedo", infinitive: "caedere", perfect: "cecidi", participle: "caesum" },
    entryPaths: {
      homicide: "present_stem", suicide: "present_stem", decide: "present_stem", coincide: "present_stem",
      incision: "participial_stem", concise: "participial_stem", precise: "participial_stem",
      excise: "participial_stem", scissors: "participial_stem", circumcise: "participial_stem",
    },
  },

  {
    root: "sequ/secut",
    lang: "Latin",
    meaning: "follow",
    targets: ["sequence", "sequel", "non-sequitur", "obsequious", "consecutive", "execute", "persecute", "prosecute", "second", "suit"],
    required: ["sequence", "sequel", "consecutive", "execute", "persecute"],
    tension: "Latin 'sequi' (to follow) gave sequ- words from the present (sequence, sequel) and secut-/ecut- words from the participle (consecutive, execute, persecute) — following through logical order and following through with force are the same root",
    principalParts: { firstPres: "sequor", infinitive: "sequi", perfect: "secutus sum", participle: "secutus" },
    entryPaths: {
      sequence: "present_stem", sequel: "present_stem", "non-sequitur": "present_stem", obsequious: "present_stem",
      consecutive: "participial_stem", execute: "participial_stem", persecute: "participial_stem",
      prosecute: "participial_stem", second: "participial_stem", suit: "participial_stem",
    },
  },

  {
    root: "sist/stat",
    lang: "Latin",
    meaning: "stand",
    targets: ["consist", "resist", "persist", "insist", "status", "station", "statute", "constant", "circumstance", "obstacle"],
    required: ["resist", "persist", "status", "station", "constant"],
    tension: "Latin 'stare' (to stand) produced sist- words via the present stem (resist, persist, consist — standing against or with) and stat- words via the participle statum (status, station, statute — a standing as social rank, place, and law)",
    principalParts: { firstPres: "sto", infinitive: "stare", perfect: "steti", participle: "statum" },
    entryPaths: {
      consist: "present_stem", resist: "present_stem", persist: "present_stem", insist: "present_stem",
      status: "participial_stem", station: "participial_stem", statute: "participial_stem",
      constant: "participial_stem", circumstance: "participial_stem", obstacle: "participial_stem",
    },
  },

  {
    root: "volv/volut",
    lang: "Latin",
    meaning: "roll, turn",
    targets: ["revolve", "involve", "evolve", "devolve", "revolution", "evolution", "solution", "dissolution", "volume", "vault"],
    required: ["revolve", "involve", "revolution", "evolution", "solution"],
    tension: "Latin 'volvere' (to roll) left volv- words from the present (revolve, involve, evolve) and volut- words from the participle (revolution, evolution, solution — a loosening or rolling out) — rolling became the metaphor for both political upheaval and chemical dissolving",
    principalParts: { firstPres: "volvo", infinitive: "volvere", perfect: "volvi", participle: "volutum" },
    entryPaths: {
      revolve: "present_stem", involve: "present_stem", evolve: "present_stem", devolve: "present_stem",
      revolution: "participial_stem", evolution: "participial_stem", solution: "participial_stem",
      dissolution: "participial_stem", volume: "participial_stem", vault: "participial_stem",
    },
  },

  {
    root: "us/ut",
    lang: "Latin",
    meaning: "use",
    targets: ["use", "useful", "usual", "abuse", "disuse", "utility", "utensil", "usurp", "usury", "usage"],
    required: ["use", "usual", "abuse", "utility", "utensil"],
    tension: "Latin 'uti' (to use) gave us- words from everyday use (use, useful, usual, abuse) and ut- words from the more formal participle usus (utility, utensil) — using something and the tool for using it share the same root",
    principalParts: { firstPres: "utor", infinitive: "uti", perfect: "usus sum", participle: "usus" },
    entryPaths: {
      use: "present_stem", useful: "present_stem", usual: "present_stem", abuse: "present_stem", disuse: "present_stem",
      utility: "participial_stem", utensil: "participial_stem", usurp: "participial_stem",
      usury: "participial_stem", usage: "participial_stem",
    },
  },

  {
    root: "plic/ply",
    lang: "Latin",
    meaning: "fold",
    targets: ["duplicate", "complicate", "explicit", "implicit", "replicate", "comply", "reply", "supply", "apply", "deploy"],
    required: ["duplicate", "complicate", "explicit", "comply", "apply"],
    tension: "Latin 'plicare' (to fold) gave plic- words in formal English (duplicate, complicate, explicit — folded in two, folded together, folded out) and -ply words through French erosion (comply, reply, supply — forms of folding to a demand or filling a fold)",
    principalParts: { firstPres: "plico", infinitive: "plicare", perfect: "plicavi", participle: "plicatum" },
    entryPaths: {
      duplicate: "present_stem", complicate: "present_stem", explicit: "present_stem",
      implicit: "present_stem", replicate: "present_stem",
      comply: "participial_stem", reply: "participial_stem", supply: "participial_stem",
      apply: "participial_stem", deploy: "participial_stem",
    },
  },

  {
    root: "clud/claus",
    lang: "Latin",
    meaning: "close, shut",
    targets: ["include", "exclude", "preclude", "conclude", "clause", "claustrophobia", "close", "enclose", "closet", "seclusion"],
    required: ["include", "exclude", "preclude", "clause", "claustrophobia"],
    tension: "Latin 'claudere' (to close) gave clud- words via the present (include, exclude, preclude — shutting in, shutting out, shutting before) and claus-/clos- words via the participle clausum (clause, claustrophobia, close) — all acts of closing, whether legal, spatial, or psychological",
    principalParts: { firstPres: "claudo", infinitive: "claudere", perfect: "clausi", participle: "clausum" },
    entryPaths: {
      include: "present_stem", exclude: "present_stem", preclude: "present_stem", conclude: "present_stem",
      clause: "participial_stem", claustrophobia: "participial_stem", close: "participial_stem",
      enclose: "participial_stem", closet: "participial_stem", seclusion: "participial_stem",
    },
  },

  {
    root: "loqu/locut",
    lang: "Latin",
    meaning: "speak",
    targets: ["eloquent", "loquacious", "ventriloquist", "obloquy", "elocution", "colloquial", "soliloquy", "locution", "interlocutor", "circumlocution"],
    required: ["eloquent", "loquacious", "ventriloquist", "elocution", "colloquial"],
    tension: "Latin 'loqui' (to speak) gave loqu- words from the present (eloquent, loquacious, ventriloquist) and locut- words from the participle (elocution, colloquial, soliloquy — the craft of speaking vs. the act of speaking)",
    principalParts: { firstPres: "loquor", infinitive: "loqui", perfect: "locutus sum", participle: "locutus" },
    entryPaths: {
      eloquent: "present_stem", loquacious: "present_stem", ventriloquist: "present_stem", obloquy: "present_stem",
      elocution: "participial_stem", colloquial: "participial_stem", soliloquy: "participial_stem",
      locution: "participial_stem", interlocutor: "participial_stem", circumlocution: "participial_stem",
    },
  },

  {
    root: "dat/don",
    lang: "Latin",
    meaning: "give",
    targets: ["data", "mandate", "tradition", "edition", "donate", "donation", "donor", "pardon", "anecdote", "render"],
    required: ["data", "mandate", "tradition", "donate", "pardon"],
    tension: "Latin 'dare' (to give) gave dat- words through the participle datum (data — 'things given,' mandate — 'given by hand') and don- words through the gift form donum (donate, donor, pardon — to give away completely)",
    principalParts: { firstPres: "do", infinitive: "dare", perfect: "dedi", participle: "datum" },
    entryPaths: {
      data: "participial_stem", mandate: "participial_stem", tradition: "participial_stem", edition: "participial_stem", anecdote: "participial_stem",
      donate: "present_stem", donation: "present_stem", donor: "present_stem", pardon: "present_stem", render: "present_stem",
    },
  },

  {
    root: "haer/hes",
    lang: "Latin",
    meaning: "stick, cling",
    targets: ["adhere", "adherent", "adherence", "cohere", "coherent", "inherent", "hesitate", "hesitation", "cohesive", "inhere"],
    required: ["adhere", "coherent", "inherent", "hesitate", "cohesive"],
    tension: "Latin 'haerere' (to stick, to cling) gave haer- words directly (adhere, cohere, inherent — clinging to, clinging together, sticking within) and hes- words via the participle haesum (hesitate — to stick, to get caught)",
    principalParts: { firstPres: "haereo", infinitive: "haerere", perfect: "haesi", participle: "haesum" },
    entryPaths: {
      adhere: "present_stem", adherent: "present_stem", adherence: "present_stem",
      cohere: "present_stem", coherent: "present_stem", inherent: "present_stem", inhere: "present_stem",
      hesitate: "participial_stem", hesitation: "participial_stem", cohesive: "participial_stem",
    },
  },

  // ── SINGLE-STEM ENTRIES ───────────────────────────────────────────────────────

  {
    root: "aud",
    lang: "Latin",
    meaning: "hear",
    targets: ["audible", "audience", "audio", "audit", "auditorium", "audition", "inaudible", "auditory", "audiovisual", "auditor"],
    required: ["audible", "audience", "audio", "audit", "auditorium"],
    tension: "Latin 'audire' (to hear) left one of the most compact and consistent root families in English — every aud- word is about hearing, with no French erosion to muddy the stem",
    principalParts: { firstPres: "audio", infinitive: "audire", perfect: "audivi", participle: "auditum" },
  },

  {
    root: "viv",
    lang: "Latin",
    meaning: "live",
    targets: ["vivid", "vivacious", "vivacity", "survive", "revive", "revival", "vivisection", "convivial", "bon vivant", "vivarium"],
    required: ["vivid", "vivacious", "survive", "revive", "convivial"],
    tension: "Latin 'vivere' (to live) connects the vivid (intensely alive) to the convivial (living together pleasurably) to the grim vivisection (cutting while still alive) — life as color, company, and vulnerability",
    principalParts: { firstPres: "vivo", infinitive: "vivere", perfect: "vixi", participle: "victum" },
  },

  {
    root: "tim",
    lang: "Latin",
    meaning: "fear",
    targets: ["timid", "timorous", "intimidate", "timidity", "timorously", "timidly", "intimidation", "intimidating"],
    required: ["timid", "timorous", "intimidate", "timidity", "intimidation"],
    tension: "Latin 'timere' (to fear) left one of the smallest root families in English — only a handful of words, all clustered around the same shrinking quality, making timid itself an apt representative of its root",
    principalParts: { firstPres: "timeo", infinitive: "timere", perfect: "timui", participle: "n/a" },
  },

  {
    root: "junct",
    lang: "Latin",
    meaning: "join",
    targets: ["junction", "conjunction", "adjunct", "injunction", "disjunction", "join", "joint", "juncture", "subjunctive", "enjoin"],
    required: ["junction", "conjunction", "adjunct", "injunction", "juncture"],
    tension: "Latin 'jungere' (to join, to yoke) connects the grammatical conjunction (joining clauses) to the legal injunction (ordering a joining halt) to the anatomical joint — joining as grammar, law, and anatomy",
    principalParts: { firstPres: "jungo", infinitive: "jungere", perfect: "junxi", participle: "junctum" },
  },

  {
    root: "lav",
    lang: "Latin",
    meaning: "wash",
    targets: ["lavatory", "lave", "laver", "lotion", "laundry", "lavish", "deluge", "ablution", "dilute", "alluvial"],
    required: ["lavatory", "lotion", "laundry", "ablution", "dilute"],
    tension: "Latin 'lavare' (to wash) runs a surprising channel through English: lavatory and lotion share the root, but so does alluvial (washed down by rivers) and dilute (washed out) — cleansing as domestic routine, medicine, geology, and metaphor",
    principalParts: { firstPres: "lavo", infinitive: "lavare", perfect: "lavi", participle: "lautum" },
  },

  {
    root: "sci",
    lang: "Latin",
    meaning: "know",
    targets: ["science", "scientific", "conscious", "conscience", "omniscient", "prescient", "unconscious", "omniscience", "prescience", "nescience"],
    required: ["science", "conscious", "conscience", "omniscient", "prescient"],
    tension: "Latin 'scire' (to know) gives science its name and hides inside 'conscious' (knowing together with oneself) and 'conscience' (knowing together, morally) — knowing as both empirical inquiry and moral awareness",
    principalParts: { firstPres: "scio", infinitive: "scire", perfect: "scivi", participle: "scitum" },
  },

  {
    root: "son",
    lang: "Latin",
    meaning: "sound",
    targets: ["sonic", "sonar", "resonance", "consonant", "dissonant", "unison", "sonata", "sonnet", "sonorous", "ultrasonic"],
    required: ["sonic", "sonar", "resonance", "consonant", "unison"],
    tension: "Latin 'sonare' (to sound) connects military sonar to the literary sonnet (a 'little sound') to the musical sonata — the same root rings through technology, poetry, and music",
    principalParts: { firstPres: "sono", infinitive: "sonare", perfect: "sonui", participle: "sonitum" },
  },

  {
    root: "spir",
    lang: "Latin",
    meaning: "breathe",
    targets: ["spirit", "inspire", "expire", "aspire", "conspire", "perspire", "transpire", "respiration", "spiracle", "respiratory"],
    required: ["spirit", "inspire", "expire", "aspire", "conspire"],
    tension: "Latin 'spirare' (to breathe) made 'spirit' literally 'a breath,' made 'inspire' literally 'to breathe into,' and made 'conspire' 'to breathe together' — breath became divinity, creativity, and conspiracy from the same root",
    principalParts: { firstPres: "spiro", infinitive: "spirare", perfect: "spiravi", participle: "spiratum" },
  },

  {
    root: "found/fund",
    lang: "Latin",
    meaning: "lay a base, establish",
    targets: ["foundation", "fundamental", "founder", "fund", "profound", "refund", "foundational", "fundamentalism", "groundwork"],
    required: ["foundation", "fundamental", "founder", "fund", "profound"],
    tension: "Latin 'fundare' (to lay a base) gives us foundation (the literal base), fundamental (belonging to the base), and profound (from pro+fundus, 'before the deep') — depth and establishment from the same root. Note: not to be confused with 'fundere' (to pour), which gives fusion and confusion",
    principalParts: { firstPres: "fundo", infinitive: "fundare", perfect: "fundavi", participle: "fundatum" },
  },

  {
    root: "judic",
    lang: "Latin",
    meaning: "judge",
    targets: ["judge", "judicial", "judgment", "prejudice", "adjudicate", "judiciary", "judicious", "injudicious", "adjudicator", "prejudicial"],
    required: ["judge", "judicial", "judgment", "prejudice", "adjudicate"],
    tension: "Latin 'judicare' (to judge, from jus + dicere: law + say) connects the courtroom judge to the prejudiced mind — prejudice is literally 'pre-judging,' a verdict before the evidence",
    principalParts: { firstPres: "judico", infinitive: "judicare", perfect: "judicavi", participle: "judicatum" },
  },

  {
    root: "jur",
    lang: "Latin",
    meaning: "swear, law",
    targets: ["jury", "juror", "perjury", "conjure", "adjure", "abjure", "jurisprudence", "jurisdiction", "injure", "just"],
    required: ["jury", "perjury", "conjure", "jurisprudence", "jurisdiction"],
    tension: "Latin 'jurare' (to swear) connects the jury (those who have sworn) to perjury (false swearing) to conjure (to swear together — originally a solemn oath, later a magic spell) — the legal oath became both the courtroom and the conjuring circle",
    principalParts: { firstPres: "juro", infinitive: "jurare", perfect: "juravi", participle: "juratum" },
  },

];
