// hebrewYiddishPool.ts
// Reference lexicon of Hebrew and Yiddish loanwords in English —
// organized by semantic domain (social dynamics, spirit, community, wit)
// and annotated with etymology, definition, and cultural insight.

import type { HebrewYiddishEntry } from "../types";

export const HEBREW_YIDDISH_POOL: HebrewYiddishEntry[] = [
  // --- TIER 1: SOCIAL DYNAMICS & RESISTANCE ---
  {
    word: "Chutzpah",
    origin: "Yiddish (khutspe) / Hebrew (ḥuṣpāh)",
    definition: "Extreme self-confidence or audacity; 'nerve'.",
    insight: "A survival trait. In a world designed to keep the disenfranchised small, 'chutzpah' was the necessary audacity to demand space and rights.",
    difficulty: "Easy",
  },
  {
    word: "Mensch",
    origin: "Yiddish (mentsh - 'person')",
    definition: "A person of integrity and honor.",
    insight: "The ultimate 'Hero' label. It defines humanity not by status or wealth (the Villain's metrics), but by how one treats others.",
    difficulty: "Easy",
  },
  {
    word: "Schlep",
    origin: "Yiddish (shlepen - 'to drag')",
    definition: "To carry something heavy; a tedious journey.",
    insight: "Captures the physical exhaustion of a migratory people carrying their entire lives on their backs across borders.",
    difficulty: "Easy",
  },
  {
    word: "Kibbitz",
    origin: "Yiddish (kibitsen)",
    definition: "To offer unwanted advice or comment on the sidelines.",
    insight: "A form of communal observation. It represents the collective voice of a community that may not have power, but certainly has an opinion.",
    difficulty: "Medium",
  },
  {
    word: "Shibboleth",
    origin: "Hebrew (shibbōleth - 'ear of corn/stream')",
    definition: "A custom or word that distinguishes a particular group of people.",
    insight: "Historically used as a password to identify 'us' from 'them.' It is the literal definition of using language as a protective border.",
    difficulty: "Hard",
  },
  {
    word: "Schlemiel",
    origin: "Yiddish (shlemiel)",
    definition: "An unlucky person; a habitual bungler.",
    insight: "The 'Hero' as an underdog. In Jewish folklore, the Schlemiel survives the Villain's traps not through strength, but through a kind of holy simplicity.",
    difficulty: "Medium",
  },
  {
    word: "Gonif",
    origin: "Yiddish (ganev) / Hebrew (gannāḇ)",
    definition: "A thief, rascal, or dishonest person.",
    insight: "Often used to describe the predatory middlemen or corrupt officials (the Villains) who exploited the community.",
    difficulty: "Medium",
  },
  {
    word: "Shtum",
    origin: "Yiddish (shtum - 'mute/silent')",
    definition: "To keep quiet; silent.",
    insight: "Silence as a survival tactic. Knowing when to keep 'shtum' was the only way to avoid the gaze of the authorities.",
    difficulty: "Hard",
  },

  // --- TIER 2: SPIRIT & RECLAMATION ---
  {
    word: "Amen",
    origin: "Hebrew (āmēn - 'so be it')",
    definition: "An utterance of agreement or affirmation.",
    insight: "A foundational word of faith that the 'Villain' (Western empires) adopted, yet its roots remain an ancient Hebrew declaration of truth.",
    difficulty: "Easy",
  },
  {
    word: "Golem",
    origin: "Hebrew (gōlem - 'shapeless mass')",
    definition: "An artificial being brought to life by magic.",
    insight: "In folklore, the Golem was created to protect the community from violent pogroms. It is the ultimate protector-myth.",
    difficulty: "Medium",
  },
  {
    word: "Sabbath / Shabbat",
    origin: "Hebrew (shabbāth - 'to rest')",
    definition: "A day of religious observance and rest.",
    insight: "A radical act of resistance against the labor machine. It asserts that the Hero's time belongs to them, not the master.",
    difficulty: "Easy",
  },
  {
    word: "Shekhinah",
    origin: "Hebrew (shǝkhīnāh - 'dwelling')",
    definition: "The divine presence of God, often seen as feminine.",
    insight: "Represents the idea that the 'sacred' is not in a distant temple (which the Villain destroyed), but dwells with the people in exile.",
    difficulty: "Hard",
  },
  {
    word: "Mazel",
    origin: "Hebrew (mazzāl - 'constellation')",
    definition: "Luck or fortune.",
    insight: "Used in 'Mazel Tov.' It acknowledges that survival often depends on a spark of luck beyond the Villain's control.",
    difficulty: "Easy",
  },
  {
    word: "Hallelujah",
    origin: "Hebrew (halləlū-yāh - 'praise Yah')",
    definition: "An expression of worship or rejoicing.",
    insight: "A victory cry that survived centuries of persecution, eventually becoming a global standard for joy.",
    difficulty: "Easy",
  },

  // --- TIER 3: COMMUNITY & THE CRAFT OF SURVIVAL ---
  {
    word: "Kvetch",
    origin: "Yiddish (kvetshn - 'to squeeze')",
    definition: "To complain habitually; to gripe.",
    insight: "A psychological release valve. Complaining was a way to acknowledge the absurdity of an oppressive system.",
    difficulty: "Medium",
  },
  {
    word: "Schlock",
    origin: "Yiddish (shlak - 'a blow')",
    definition: "Cheap, low-quality, or 'trashy' goods.",
    insight: "A refusal to accept the mass-produced junk of the Villain's economy as high-quality.",
    difficulty: "Medium",
  },
  {
    word: "Schmaltzy",
    origin: "Yiddish (shmalts - 'rendered fat')",
    definition: "Excessively sentimental.",
    insight: "Derived from using fat to make meager poverty-meals flavorful. It's about making life 'rich' when you have nothing.",
    difficulty: "Medium",
  },
  {
    word: "Tchotchke",
    origin: "Yiddish (tshatshke)",
    definition: "A small trinket or knick-knack.",
    insight: "Small items that make a house feel like a home, held onto despite frequent forced displacements.",
    difficulty: "Hard",
  },
  {
    word: "Mishegas",
    origin: "Yiddish (mishugas - 'insanity')",
    definition: "Craziness, absurdity, or nonsense.",
    insight: "A word for the chaotic world the Villain creates. Calling it 'mishegas' is how the Hero stays sane.",
    difficulty: "Hard",
  },
  {
    word: "Nosh",
    origin: "Yiddish (nashn - 'to nibble')",
    definition: "To eat a light snack.",
    insight: "Finding small moments of pleasure and sustenance in the middle of a hard workday.",
    difficulty: "Easy",
  },
  {
    word: "Gelt",
    origin: "Yiddish (gelt - 'money')",
    definition: "Money or coins.",
    insight: "Refers to meager resources managed by families, turned into a sweet tradition (chocolate coins) to defy scarcity.",
    difficulty: "Medium",
  },
  {
    word: "Bupkis",
    origin: "Yiddish (bubkes - 'goat droppings')",
    definition: "Nothing at all; zero.",
    insight: "The Hero's honest assessment of what the Villain's promises are actually worth.",
    difficulty: "Medium",
  },

  // --- TIER 4: THE WIT OF THE DISENFRANCHISED ---
  {
    word: "Klutz",
    origin: "Yiddish (klots - 'wooden beam')",
    definition: "A clumsy, awkward person.",
    insight: "Self-deprecating humor used to humanize oneself in a rigid, 'orderly' society that has no room for mistakes.",
    difficulty: "Easy",
  },
  {
    word: "Schmooze",
    origin: "Yiddish (shmuesn) / Hebrew (šĕmūʿōt - 'rumors')",
    definition: "To talk idly or flatteringly to gain favor.",
    insight: "The art of social navigation. For the disenfranchised, 'schmoozing' was a vital skill for bypassing the Villain's red tape.",
    difficulty: "Easy",
  },
  {
    word: "Shlep-vessel",
    origin: "Yiddish/English Hybrid",
    definition: "An old, slow vehicle or person.",
    insight: "A modern evolution of 'schlep,' describing the broken-down tools the poor are often forced to work with.",
    difficulty: "Medium",
  },
  {
    word: "Shvitz",
    origin: "Yiddish (shvitsn - 'to sweat')",
    definition: "To sweat; a steam bath.",
    insight: "Relates to the hard, physical labor of the immigrant and the worker. To 'shvitz' is to endure the heat of the system.",
    difficulty: "Medium",
  },
  {
    word: "Putz",
    origin: "Yiddish (putts - 'ornament/slang for penis')",
    definition: "A stupid or worthless person.",
    insight: "A sharp, linguistic jab at those in power who act with unearned arrogance.",
    difficulty: "Medium",
  },
  {
    word: "Spiel",
    origin: "Yiddish (shpil - 'play/game')",
    definition: "A long or fast story or speech, typically a sales pitch.",
    insight: "Originally meaning a play or performance, it became a word for the 'performance' one must give to survive in the Villain's marketplace.",
    difficulty: "Easy",
  },
  {
    word: "Yiddisher Kop",
    origin: "Yiddish ('Jewish head')",
    definition: "A person who is clever or uses common sense.",
    insight: "The belief that the Hero's greatest weapon against the Villain isn't a sword, but their brain.",
    difficulty: "Hard",
  },
  {
    word: "Nachas",
    origin: "Yiddish (nakhas) / Hebrew (naḥat - 'contentment')",
    definition: "Proud pleasure or special joy, especially from one's children.",
    insight: "The ultimate goal of the Hero: to see the next generation thrive and find joy in spite of the Villain's history.",
    difficulty: "Hard",
  },
];
