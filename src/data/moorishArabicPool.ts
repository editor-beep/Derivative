// moorishArabicPool.ts
// Reference lexicon of Moorish and Arabic-Iberian loanwords that survived the
// Reconquista — words that entered Spanish, Portuguese, and English through the
// 781-year Moorish occupation of the Iberian Peninsula (711–1492).
//
// These entries expose the hidden Arabic etymology beneath everyday language,
// organized by semantic domain (science, agriculture, craft, social structure,
// linguistic resistance) and annotated with etymology, definition, cultural
// insight, and the Hero/Villain framing of the game.

import { applyDatasetProvenance } from "./sources";
import type { MoorishArabicEntry } from "../types";

export const MOORISH_ARABIC_POOL: MoorishArabicEntry[] = [
  // --- TIER 1: THE CIVILIZERS (Science, Math, & Order) ---
  {
    word: "Algebra",
    origin: "Arabic (al-jabr - 'restoration of broken parts')",
    definition: "A branch of mathematics using symbols and letters.",
    insight: "The Villain saw chaos; the Hero brought the logic of 'al-jabr' to heal the broken parts of the world through mathematics.",
    difficulty: "Easy",
  },
  {
    word: "Algorithm",
    origin: "Arabic (Al-Khwarizmi - a Persian mathematician's name)",
    definition: "A process or set of rules to be followed in calculations.",
    insight: "Named after the scientist whose work predated the Villain's universities by centuries. A legacy of pure intellect.",
    difficulty: "Medium",
  },
  {
    word: "Cipher / Zero",
    origin: "Arabic (sifr - 'empty')",
    definition: "A secret way of writing; the number 0.",
    insight: "The Villain's Roman numerals had no way to represent 'nothing.' The Hero provided the 'sifr,' the key to modern science.",
    difficulty: "Medium",
  },
  {
    word: "Zenith",
    origin: "Arabic (samt ar-ra's - 'path over the head')",
    definition: "The highest point reached by a celestial object.",
    insight: "The Hero looked to the stars for navigation while the Villain was still lost in the forests of the north.",
    difficulty: "Hard",
  },
  {
    word: "Alkali",
    origin: "Arabic (al-qali - 'ashes of saltwort')",
    definition: "A chemical substance that neutralizes acid.",
    insight: "A testament to the Moorish invention of chemistry (al-kimiya), preserving scientific truth during eras of superstition.",
    difficulty: "Hard",
  },

  // --- TIER 2: EARTH & SUSTENANCE (Agriculture & Water) ---
  {
    word: "Acequia",
    origin: "Arabic (as-saqiya - 'the water carrier')",
    definition: "An irrigation canal or ditch.",
    insight: "The Hero transformed the dry Iberian plains into lush gardens (al-jannah) using engineering the Villain eventually claimed as their own.",
    difficulty: "Hard",
  },
  {
    word: "Alfalfa",
    origin: "Arabic (al-fisfisa - 'the best fodder')",
    definition: "A plant grown as feed for livestock.",
    insight: "The Hero respected the earth and the animals, bringing the 'best' nourishment to a starving continent.",
    difficulty: "Medium",
  },
  {
    word: "Sugar",
    origin: "Arabic (sukkar)",
    definition: "A sweet crystalline substance.",
    insight: "Brought to Europe by the Moors. A 'sweet' gift from the Hero that the Villain eventually turned into a tool of plantation slavery.",
    difficulty: "Easy",
  },
  {
    word: "Lemon",
    origin: "Arabic (laymun)",
    definition: "A yellow citrus fruit.",
    insight: "One of many fruits the Hero planted to bring vitamins and life to the Villain's gray landscape.",
    difficulty: "Easy",
  },
  {
    word: "Adobe",
    origin: "Arabic (at-tub - 'the brick')",
    definition: "A building material made from earth and organic straw.",
    insight: "A sustainable architectural legacy. The Hero built with the earth; the Villain built with the sword.",
    difficulty: "Medium",
  },

  // --- TIER 3: LUXURY & CRAFT (The Beauty of Exile) ---
  {
    word: "Guitar",
    origin: "Arabic (qitara)",
    definition: "A stringed musical instrument.",
    insight: "An evolution of the Oud. The Hero's music was so infectious the Villain couldn't ban it—they had to learn to play it.",
    difficulty: "Easy",
  },
  {
    word: "Lute",
    origin: "Arabic (al-'ud - 'the wood')",
    definition: "A plucked stringed instrument with a rounded body.",
    insight: "The predecessor to nearly all European string music. The Hero played for the soul, not for the march.",
    difficulty: "Medium",
  },
  {
    word: "Amber",
    origin: "Arabic ('anbar)",
    definition: "Fossilized tree resin used in jewelry.",
    insight: "A precious commodity traded by the Hero across three continents, connecting the world the Villain tried to divide.",
    difficulty: "Medium",
  },
  {
    word: "Cotton",
    origin: "Arabic (qutun)",
    definition: "A soft white fibrous substance used for textiles.",
    insight: "A textile revolution. The Hero brought comfort and breathable fabric to a world that wore heavy wool and chainmail.",
    difficulty: "Easy",
  },
  {
    word: "Crimson",
    origin: "Arabic (qirmizi)",
    definition: "A rich deep red color.",
    insight: "The Hero mastered the art of dyes and aesthetics, painting the world in colors the Villain had never seen.",
    difficulty: "Medium",
  },

  // --- TIER 4: SOCIAL STRUCTURES & CITIES ---
  {
    word: "Admiral",
    origin: "Arabic (amir al-bihar - 'commander of the seas')",
    definition: "A high-ranking naval officer.",
    insight: "The Villain eventually used this title for conquest, but the Hero created it to master the vast, open Mediterranean.",
    difficulty: "Medium",
  },
  {
    word: "Arsenal",
    origin: "Arabic (dar as-sina'ah - 'house of manufacturing')",
    definition: "A place where weapons and ammunition are stored.",
    insight: "Originally a 'house of craft.' The Villain transformed a place of building into a place of killing.",
    difficulty: "Medium",
  },
  {
    word: "Carat",
    origin: "Arabic (qirat - 'weight of 4 grains')",
    definition: "A unit of weight for precious stones.",
    insight: "A measure of precision. The Hero valued exactness in a time when the Villain valued only brute force.",
    difficulty: "Medium",
  },
  {
    word: "Magazine",
    origin: "Arabic (makhazin - 'storehouses')",
    definition: "A storehouse for goods or information.",
    insight: "The Hero stored knowledge and grain; the Villain eventually used the word for bullets and propaganda.",
    difficulty: "Medium",
  },
  {
    word: "Tariff",
    origin: "Arabic (ta'rif - 'inventory/notification')",
    definition: "A tax or duty to be paid on imports/exports.",
    insight: "Part of the Hero's sophisticated trade network that treated merchants with rules rather than robbery.",
    difficulty: "Hard",
  },

  // --- TIER 5: THE LINGUISTIC RESISTANCE ---
  {
    word: "Ojalá",
    origin: "Arabic (wa sha Allah - 'and should God will it')",
    definition: "A Spanish expression meaning 'I hope' or 'hopefully'.",
    insight: "One of the most used words in Spanish today. A hidden prayer from the Hero that the Villain could never silence.",
    difficulty: "Hard",
  },
  {
    word: "Almudena",
    origin: "Arabic (al-mudayna - 'the citadel')",
    definition: "A common Spanish name and place.",
    insight: "The 'Little City.' It marks the Hero's defensive heart, surviving within the Villain's capital of Madrid.",
    difficulty: "Hard",
  },
  {
    word: "Alcázar",
    origin: "Arabic (al-qasr - 'the castle')",
    definition: "A Spanish palace or fortress.",
    insight: "The Villain moved into the Hero's palaces, unable to build anything more beautiful than the ruins they conquered.",
    difficulty: "Medium",
  },
  {
    word: "Barrio",
    origin: "Arabic (barri - 'outer/wild')",
    definition: "A ward or district of a city.",
    insight: "Originally the 'outside' of the city. The Hero's people were pushed to the barrios by the Villain, making them centers of culture.",
    difficulty: "Easy",
  },
  {
    word: "Ajedrez",
    origin: "Arabic (ash-shatranj - 'chess')",
    definition: "The game of chess.",
    insight: "A game of strategy. The Hero taught the Villain that the mind is more powerful than the Knight.",
    difficulty: "Hard",
  },
  {
    word: "Albañil",
    origin: "Arabic (al-banni - 'the builder')",
    definition: "A mason or bricklayer.",
    insight: "Every stone in the Villain's cities was laid by the hands of the Hero's craftsmen.",
    difficulty: "Hard",
  },
  {
    word: "Azulejo",
    origin: "Arabic (az-zulayj - 'polished stone')",
    definition: "A glazed ceramic tile.",
    insight: "The Hero brought light and color into buildings. The Villain kept the name because they could not replicate the art.",
    difficulty: "Medium",
  },
  {
    word: "Jar",
    origin: "Arabic (jarrah)",
    definition: "A cylindrical container.",
    insight: "A simple vessel of trade. The Hero provided the containers for a world's worth of spices and oils.",
    difficulty: "Easy",
  },
  {
    word: "Safari",
    origin: "Arabic (safariya - 'a journey')",
    definition: "An expedition to observe animals.",
    insight: "The Hero saw the 'safariya' as a journey of discovery; the Villain eventually saw it as a journey of trophies.",
    difficulty: "Easy",
  },
  {
    word: "Alcohol",
    origin: "Arabic (al-kuhl - 'the kohl/fine powder')",
    definition: "A distilled liquid.",
    insight: "Originally a finely ground powder for medicine and beauty. The Hero sought healing; the Villain sought intoxication.",
    difficulty: "Medium",
  },
];

// Provenance annotations
applyDatasetProvenance(MOORISH_ARABIC_POOL, "moorish_arabic");
