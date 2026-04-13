// src/data/greekRoots.ts
// 35 Greek root entries not already covered in rootsExtended.ts, rootsExtended2.ts,
// or insightEngine.ts inline ROOT_POOL.
//
// Already covered elsewhere (skip): bios, chronos, graphein, logos, pathos, phone,
// photos, morphe, thermos (insightEngine inline); metron/meter, ge/geo, skopein/scope
// (rootsExtended); theos, nomos/nom, kephale/cephal (rootsExtended2).

export const GREEK_ROOTS_POOL = [

  {
    root: "anthrop",
    lang: "Greek",
    meaning: "human being",
    targets: ["anthropology", "philanthropy", "anthropomorphic", "misanthrope", "anthropocentric", "anthropologist", "anthropocene", "anthropoid", "philanthropist", "misanthropy"],
    required: ["anthropology", "philanthropy", "anthropomorphic", "misanthrope", "anthropocentric"],
    tension: "Greek 'anthrōpos' (human being) is studied by anthropology, loved by philanthropy, and hated by misanthropy — the human as object of science, charity, and contempt from the same root",
  },

  {
    root: "crat/cracy",
    lang: "Greek",
    meaning: "power, rule",
    targets: ["democracy", "autocracy", "aristocracy", "bureaucracy", "plutocracy", "theocracy", "technocracy", "meritocracy", "kleptocracy", "democrat"],
    required: ["democracy", "autocracy", "aristocracy", "bureaucracy", "plutocracy"],
    tension: "Greek 'kratos' (strength, power) gives every -cracy word its root — democracy (people-power), aristocracy (best-power), plutocracy (wealth-power) — always the same claim to legitimacy, always a different word for who holds it",
  },

  {
    root: "polis",
    lang: "Greek",
    meaning: "city, city-state",
    targets: ["politics", "politician", "metropolitan", "cosmopolitan", "police", "policy", "acropolis", "metropolis", "necropolis", "megalopolis"],
    required: ["politics", "metropolitan", "cosmopolitan", "police", "acropolis"],
    tension: "Greek 'polis' (city-state) underlies both 'politics' (the art of the city) and 'police' (the force that keeps city order) — the city as the origin of organized civilization and the reason it needs governing",
  },

  {
    root: "psych",
    lang: "Greek",
    meaning: "mind, soul, breath",
    targets: ["psychology", "psychic", "psychotic", "psychiatry", "psychoanalysis", "psychedelic", "psychosomatic", "psychodrama", "psyche", "psychologist"],
    required: ["psychology", "psychic", "psychotic", "psychiatry", "psychoanalysis"],
    tension: "Greek 'psychē' meant breath, soul, and the butterfly — the soul leaving the body like a breath, like a winged thing. In English it became the object of scientific study: the soul renamed 'the mind' and handed to empiricists",
  },

  {
    root: "astro/aster",
    lang: "Greek",
    meaning: "star",
    targets: ["astronomy", "astronaut", "asterisk", "asteroid", "astrophysics", "astrology", "disaster", "astral", "asterism", "astrolabe"],
    required: ["astronomy", "astronaut", "asterisk", "asteroid", "disaster"],
    tension: "Greek 'astron'/'aster' (star) hides in 'disaster' (ill-starred — misfortune from a bad star alignment) and 'asterisk' (a little star mark) — the same root in navigation charts, typographic symbols, and the language of catastrophe",
    impostors: ["astute"],
  },

  {
    root: "auto",
    lang: "Greek",
    meaning: "self",
    targets: ["automatic", "autobiography", "automobile", "autonomy", "autopsy", "autocracy", "autograph", "automation", "autocomplete", "autonomous"],
    required: ["automatic", "autobiography", "automobile", "autonomy", "autopsy"],
    tension: "Greek 'autos' (self) powers some of modernity's defining words: the automobile (self-moving), automation (self-acting machines), and autopsy (seeing for oneself) — the self as agent, as legislator, and as coroner",
  },

  {
    root: "biblio",
    lang: "Greek",
    meaning: "book",
    targets: ["bible", "bibliography", "bibliophile", "bibliotherapy", "bibliographer", "bibliomaniac", "bibliolatry", "bibliographic", "bibliopole", "bibliophilia"],
    required: ["bible", "bibliography", "bibliophile", "bibliotherapy", "bibliographer"],
    tension: "Greek 'biblion' (book, scroll) originally referred to papyrus strips imported from the Phoenician city Byblos. The Bible is literally 'the books' (ta biblia) — a Greek plural that became a Latin singular and then a singular sacred object",
  },

  {
    root: "hydr",
    lang: "Greek",
    meaning: "water",
    targets: ["hydrant", "dehydrate", "hydrogen", "hydraulic", "hydroelectric", "hydrophobia", "hydrology", "carbohydrate", "hydrated", "hydroplane"],
    required: ["hydrant", "dehydrate", "hydrogen", "hydraulic", "hydroelectric"],
    tension: "Greek 'hydōr' (water) named hydrogen ('water-producer' — it burns to produce water), runs through hydraulics (water-powered machines) and dehydration — the same root in chemistry, engineering, and the body's desperate need to drink",
  },

  {
    root: "micro",
    lang: "Greek",
    meaning: "small",
    targets: ["microscope", "microbe", "microchip", "micrometer", "microbiology", "microphone", "microcosm", "microwave", "microclimate", "microfiche"],
    required: ["microscope", "microbe", "microchip", "microcosm", "microwave"],
    tension: "Greek 'mikros' (small) became the prefix of the miniaturized world — the microbe (a small living thing invisible to the eye), the microchip (a small processor), and the microcosm (a small universe) — smallness as both the limit of human vision and its most powerful instrument",
  },

  {
    root: "mono",
    lang: "Greek",
    meaning: "one, single, alone",
    targets: ["monologue", "monarchy", "monotony", "monogamy", "monopoly", "monotheism", "monochrome", "monastery", "monk", "monolith"],
    required: ["monologue", "monarchy", "monotony", "monogamy", "monopoly"],
    tension: "Greek 'monos' (alone, single) gives us the monk (one who lives alone), the monopoly (one seller), the monologue (one speaker), and monotony (one unchanging tone) — aloneness as religious vocation, market dominance, dramatic form, and the quality of being insufferable",
  },

  {
    root: "onym",
    lang: "Greek",
    meaning: "name",
    targets: ["synonym", "antonym", "pseudonym", "acronym", "anonymous", "onomatopoeia", "homonym", "eponym", "pseudonymous", "patronym"],
    required: ["synonym", "antonym", "pseudonym", "acronym", "anonymous"],
    tension: "Greek 'onoma/onyma' (name) generates the vocabulary of naming itself — synonym (same name), antonym (opposite name), anonymous (without a name), pseudonym (false name), and onomatopoeia (name-making: words that sound like what they name)",
  },

  {
    root: "ortho",
    lang: "Greek",
    meaning: "straight, correct",
    targets: ["orthodontist", "orthodox", "orthography", "orthopedic", "orthogonal", "orthosis", "unorthodox", "orthodoxy", "orthorhombic", "orthostatic"],
    required: ["orthodontist", "orthodox", "orthography", "orthopedic", "unorthodox"],
    tension: "Greek 'orthos' (straight, correct) aligns the dentist's teeth (orthodontist — straight teeth), the church's doctrine (orthodox — correct opinion), and the writer's spelling (orthography — correct writing) — straightness as medical standard, religious claim, and linguistic rule",
  },

  {
    root: "pan",
    lang: "Greek",
    meaning: "all, every",
    targets: ["pandemic", "panorama", "panacea", "pantheon", "pandemonium", "pangaea", "panopticon", "pantomime", "pantheism", "panegyric"],
    required: ["pandemic", "panorama", "panacea", "pantheon", "pandemonium"],
    tension: "Greek 'pas/pan' (all) makes the most sweeping claims: the pandemic (affecting all people), the panacea (curing all things), the pantheon (all gods), and Pandemonium (all demons) — 'all' as the scale at which hope, disease, divinity, and chaos operate",
  },

  {
    root: "phil",
    lang: "Greek",
    meaning: "love, liking",
    targets: ["philosophy", "philanthropy", "philharmonic", "bibliophile", "philology", "Philadelphia", "audiophile", "anglophile", "necrophilia", "cinephile"],
    required: ["philosophy", "philanthropy", "philharmonic", "bibliophile", "philology"],
    tension: "Greek 'philos' (loving, dear) built philosophy (love of wisdom), Philadelphia (love of siblings), and philology (love of words) — love as intellectual vocation, civic aspiration, and the founding emotion of scholarship",
  },

  {
    root: "phob",
    lang: "Greek",
    meaning: "fear, aversion",
    targets: ["phobia", "claustrophobia", "arachnophobia", "xenophobia", "acrophobia", "hydrophobia", "technophobia", "homophobia", "agoraphobia", "phobic"],
    required: ["phobia", "claustrophobia", "arachnophobia", "xenophobia", "acrophobia"],
    tension: "Greek 'phobos' (fear, flight from fear) generates every -phobia word in medicine and popular culture — the fear of enclosed spaces, of spiders, of strangers, of open spaces. Naming a fear formalizes it and almost gives it more power",
  },

  {
    root: "physi",
    lang: "Greek",
    meaning: "nature, natural growth",
    targets: ["physics", "physician", "physiology", "physical", "physiotherapy", "physiognomy", "metaphysics", "physique", "astrophysics", "geophysics"],
    required: ["physics", "physician", "physiology", "physiotherapy", "metaphysics"],
    tension: "Greek 'physis' (nature, natural growth) gives us physics (the science of nature), the physician (one who studies natural processes), and physiology (the science of natural bodily function) — the body and the cosmos share the same root",
  },

  {
    root: "tele",
    lang: "Greek",
    meaning: "far, at a distance",
    targets: ["television", "telephone", "telescope", "telegram", "telepathy", "telekinesis", "telemetry", "teleconference", "telecommunications", "teleport"],
    required: ["television", "telephone", "telescope", "telegram", "telepathy"],
    tension: "Greek 'tēle' (far off) became the prefix of distance-erasing technology — telephone (far sound), television (far sight), telegram (far writing), telescope (far seeing) — each one extending a human sense across distances the Greeks never imagined crossing",
  },

  {
    root: "zoo",
    lang: "Greek",
    meaning: "animal, living being",
    targets: ["zoology", "zodiac", "protozoa", "zoonosis", "zoomorphic", "zoo", "zooplankton", "zoophyte", "protozoan", "zoetrope"],
    required: ["zoology", "zodiac", "protozoa", "zoonosis", "zoomorphic"],
    tension: "Greek 'zōon' (living being, animal) connects the zoo (a collection of living things) to the zodiac (a circle of animal figures) to the protozoa (first animals, microscopically small) — animal life as spectacle, celestial symbol, and evolutionary origin",
  },

  {
    root: "archae",
    lang: "Greek",
    meaning: "ancient, from the beginning",
    targets: ["archaeology", "archaic", "archive", "archaism", "archaeologist", "archaeopteryx", "archaeobotany", "archon", "archaeozoology", "archaeoastronomy"],
    required: ["archaeology", "archaic", "archive", "archaism", "archaeologist"],
    tension: "Greek 'arkhaios' (ancient, from the beginning) gives both archaeology (scientific excavation of the past) and the archive (bureaucratic storage of old records) — the ancient past as object of scholarly excitement and administrative filing",
  },

  {
    root: "arch",
    lang: "Greek",
    meaning: "chief, first, rule",
    targets: ["architect", "monarchy", "anarchy", "hierarchy", "archetype", "patriarch", "matriarch", "archbishop", "oligarchy", "anarchist"],
    required: ["architect", "monarchy", "anarchy", "hierarchy", "archetype"],
    tension: "Greek 'archein' (to rule, to begin) gives -archy to every system of governance and arch- to the beginning: the archetype (original model), the architect (chief builder), the archbishop (chief bishop) — ruling and originating are the same act in Greek",
  },

  {
    root: "caco",
    lang: "Greek",
    meaning: "bad, evil",
    targets: ["cacophony", "cacography", "cacoethes", "cacophonous", "cacodemon", "cacoepy", "cacology", "cacodyl", "cacomorphic", "cacosmia"],
    required: ["cacophony", "cacography", "cacoethes", "cacophonous", "cacodemon"],
    tension: "Greek 'kakos' (bad, evil) built one of English's smallest root families — mostly theoretical compounds like cacophony (bad sound) and cacography (bad writing). The vocabulary of badness in English prefers Anglo-Saxon and Latin words; Greek 'kakos' barely survived the competition",
  },

  {
    root: "calli",
    lang: "Greek",
    meaning: "beautiful",
    targets: ["calligraphy", "kaleidoscope", "calisthenics", "calliope", "callipygian", "calligrapher", "callipers", "calligram", "callirhoe", "calligraphic"],
    required: ["calligraphy", "kaleidoscope", "calisthenics", "calliope", "callipygian"],
    tension: "Greek 'kallos' (beauty) gave us calligraphy (beautiful writing), the kaleidoscope (beautiful form viewer), calisthenics (beautiful strength exercises), and the Muse Calliope (beautiful voice) — beauty as the standard for penmanship, optics, exercise, and poetry",
  },

  {
    root: "kinet/cine",
    lang: "Greek",
    meaning: "move",
    targets: ["kinetic", "cinema", "kinematics", "kinesthesia", "hyperkinetic", "telekinesis", "kinesiology", "cinematography", "kinescope", "cineaste"],
    required: ["kinetic", "cinema", "kinematics", "kinesthesia", "cinematography"],
    tension: "Greek 'kinein' (to move) gives us cinema (moving pictures), kinetic energy (energy of motion), and kinesiology (the science of body movement) — the root that animated both the first film projectors and the physics of Newton's laws",
  },

  {
    root: "helio",
    lang: "Greek",
    meaning: "sun",
    targets: ["helium", "heliocentric", "heliograph", "heliotrope", "aphelion", "perihelion", "heliosphere", "helioscope", "heliolatry", "heliodor"],
    required: ["helium", "heliocentric", "heliograph", "heliotrope", "aphelion"],
    tension: "Greek 'hēlios' (the sun as deity) named helium — the element first detected in the sun's spectrum before it was found on Earth — and gave us heliocentric (sun at center) and heliotrope (turning toward the sun). The sun named a gas before anyone could hold it",
  },

  {
    root: "homo",
    lang: "Greek",
    meaning: "same",
    targets: ["homonym", "homogenize", "homophone", "homogeneous", "homologous", "homograph", "homozygous", "homomorphic", "homoeopathy", "homogenize"],
    required: ["homonym", "homogenize", "homophone", "homogeneous", "homologous"],
    tension: "Greek 'homos' (same) underlies homophone (same sound), homogeneous (same kind throughout), and homologous (corresponding in structure) — sameness as the basis of linguistic equivalence, chemical mixing, and biological analogy",
  },

  {
    root: "hetero",
    lang: "Greek",
    meaning: "other, different",
    targets: ["heterogeneous", "heterodox", "heterosexual", "heterozygous", "heteronomy", "heterophone", "heteroclite", "heterodyne", "heterogeneous", "heteromorph"],
    required: ["heterogeneous", "heterodox", "heterosexual", "heterozygous", "heteronomy"],
    tension: "Greek 'heteros' (other, different) is the exact mirror of 'homos' (same) — heterogeneous vs. homogeneous, heterodox vs. orthodox. The same root structure of difference underlies genetics, theology, and social identity",
  },

  {
    root: "mega",
    lang: "Greek",
    meaning: "great, large",
    targets: ["megaphone", "megalomania", "megabyte", "megalopolis", "megalith", "megaton", "megastar", "megafauna", "megaplex", "megawatt"],
    required: ["megaphone", "megalomania", "megabyte", "megalopolis", "megalith"],
    tension: "Greek 'megas/megalos' (great, large) became the standard prefix for enormousness — from the megalith (a great stone monument) to the megabyte (a million bytes) to megalopolis (a great city) and megalomaniathe delusion of one's own greatness",
  },

  {
    root: "meso",
    lang: "Greek",
    meaning: "middle",
    targets: ["Mesopotamia", "Mesozoic", "mesosphere", "mesoderm", "mesolithic", "mesocarp", "mesolect", "mesocosm", "mesencephalon", "mesocyclone"],
    required: ["Mesopotamia", "Mesozoic", "mesosphere", "mesoderm", "mesolithic"],
    tension: "Greek 'mesos' (middle) placed Mesopotamia between its two rivers, named the Mesozoic (middle life era), and gives scientists the middle layers of the atmosphere, the embryo, and the fruit — the middle as geography, geology, and anatomy",
  },

  {
    root: "mer",
    lang: "Greek",
    meaning: "part, share",
    targets: ["polymer", "isomer", "monomer", "dimer", "oligomer", "copolymer", "telomere", "merism", "dimeric", "trimer"],
    required: ["polymer", "isomer", "monomer", "dimer", "oligomer"],
    tension: "Greek 'meros' (part, share) underlies the entire vocabulary of molecular chemistry — polymer (many parts), monomer (one part), isomer (same parts, different arrangement) — the structure of matter described by an ancient Greek word for a share of land",
  },

  {
    root: "neo",
    lang: "Greek",
    meaning: "new, young",
    targets: ["neolithic", "neologism", "neonatal", "neoclassical", "neon", "neophyte", "neoconservative", "neoplasm", "neocolonialism", "neo-noir"],
    required: ["neolithic", "neologism", "neonatal", "neon", "neophyte"],
    tension: "Greek 'neos' (new, young) named neon (the new element — the last noble gas isolated), the neophyte (new plant — then new believer), and neologism (a new word) — newness as chemical surprise, religious conversion, and linguistic invention",
  },

  {
    root: "oligo",
    lang: "Greek",
    meaning: "few, little",
    targets: ["oligarchy", "oligopoly", "oligocene", "oligomer", "oligotrophic", "oligarchic", "oligosaccharide", "oligonucleotide", "oligoclase", "oligophrenia"],
    required: ["oligarchy", "oligopoly", "oligocene", "oligomer", "oligotrophic"],
    tension: "Greek 'oligos' (few, little) concentrates power in the hands of the few (oligarchy), corners a market with few sellers (oligopoly), and describes a geologic era of cooler, sparser life (Oligocene) — scarcity as political structure, economic theory, and evolutionary period",
  },

  {
    root: "oxy",
    lang: "Greek",
    meaning: "sharp, sour, acidic",
    targets: ["oxygen", "oxymoron", "oxide", "peroxide", "oxidize", "oxytocin", "oxyacid", "paroxysm", "hydroxide", "anoxia"],
    required: ["oxygen", "oxymoron", "oxide", "peroxide", "oxytocin"],
    tension: "Greek 'oxys' (sharp, sour, acidic) named oxygen ('acid-producer' — early chemists wrongly believed it essential to all acids), the oxymoron (sharp-dull: a self-contradiction), and oxytocin (sharp-birth: the hormone that accelerates labor) — sharpness as chemistry, rhetoric, and biology",
  },

  {
    root: "ped/paed",
    lang: "Greek",
    meaning: "child",
    targets: ["pediatrics", "pedagogy", "encyclopedia", "pediatrician", "pedant", "paediatrics", "pedagogical", "orthopedic", "pedology", "paideia"],
    required: ["pediatrics", "pedagogy", "encyclopedia", "pediatrician", "pedant"],
    tension: "Greek 'pais/paidos' (child) gives us pediatrics (child medicine) and pedagogy (child-leading — the art of teaching). Warning: English 'ped-' from Greek 'pais' (child) and 'ped-' from Latin 'pes' (foot) are unrelated — a pedometer measures steps, not children",
    impostors: ["pedometer"],
  },

  {
    root: "pyro",
    lang: "Greek",
    meaning: "fire",
    targets: ["pyrotechnics", "pyre", "pyromania", "pyrite", "pyroclastic", "pyrometer", "antipyretic", "pyrography", "pyrolysis", "pyrex"],
    required: ["pyrotechnics", "pyre", "pyromania", "pyrite", "pyroclastic"],
    tension: "Greek 'pyr' (fire) gives us the funeral pyre (pure ceremonial fire), pyromania (fire madness), and pyrite (fire stone — fool's gold, which sparks when struck with steel) — fire as ceremony, obsession, and geological misdirection",
  },

  {
    root: "petr",
    lang: "Greek",
    meaning: "rock, stone",
    targets: ["petrify", "petroleum", "petroglyph", "petrology", "petrochemical", "petrified", "saltpeter", "Peter", "Petra", "petrification"],
    required: ["petrify", "petroleum", "petroglyph", "petrology", "petrochemical"],
    tension: "Greek 'petra' (rock, cliff) gave us petroleum (rock oil), petrify (to turn to stone — or to freeze with fear), and the name Peter: Jesus renamed Simon as 'Petros' (rock), saying the church would be built on that rock — geology as theology, terror, and given name",
  },

];
