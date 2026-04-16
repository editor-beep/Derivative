// imperialExtractionPool.ts
// BORROWED puzzle entries focused on the imperial and extractive history of English.
// These highlight how global empires turned conquest, forced labor, monopoly violence,
// and land/resource seizure into everyday vocabulary.

import { applyDatasetProvenance } from "./sources";
import type { SortPoolEntry } from "../types";

export const IMPERIAL_EXTRACTION_POOL: SortPoolEntry[] = [
  // ── 1. Spice Islands Monopoly ──
  {
    root: "Spice Islands extraction",
    lang: "Malay / Indonesian languages → Portuguese → Dutch → English",
    meaning: "The violent 17th-century monopoly on cloves, nutmeg, and mace",
    groups: [
      {
        id: "monopoly_spices",
        displayLabel: "VOC monopoly spices",
        solutionLabel: "Spices controlled by Dutch VOC through massacre and forced cultivation",
        hint: "These ultra-luxury commodities drove European empires to commit atrocities in the East Indies.",
        hintLevel2: "Think cloves from Maluku, nutmeg from Banda, and the outer coat of nutmeg.",
        accepts: ["clove", "nutmeg", "mace"],
        related: ["pepper", "cinnamon"],
      },
      {
        id: "everyday_trade_goods",
        displayLabel: "everyday trade goods",
        solutionLabel: "Commodities whose imperial supply chains became invisible over time",
        hint: "These goods moved through the same trade routes but became so commonplace their violent origins disappeared from memory.",
        hintLevel2: "Think of a hot beverage from Ethiopia, the word for a type of candy coating, and a flavoring from an orchid pod.",
        accepts: ["coffee", "sugar", "vanilla"],
        related: ["tea", "chocolate"],
      },
    ],
    pool: ["clove", "nutmeg", "mace", "coffee", "sugar", "vanilla"],
    tension:
      "In the early 1600s the Dutch East India Company (VOC) wanted total control of the world's nutmeg and mace. They massacred or enslaved most of the population of the Banda Islands, destroyed local groves, and forced survivors into monoculture plantations. Clove, nutmeg, and mace — words that now sit innocently in pumpkin spice lattes — are linguistic fossils of one of the most brutal monopolies in history. Coffee, sugar, and vanilla followed the same logic: each word records the moment an entire supply chain of extraction and coerced labor became so routine it was called 'trade'.",
    revealHeadline: "Your kitchen spice rack still smells of colonial violence.",
    revealBody:
      "The Banda Massacre of 1621 was carried out so the Dutch could maintain artificially high prices for nutmeg and mace. Entire islands were depopulated. The words survived. The empires that followed — British, French, American — simply scaled up the same logic: from spices to rubber, sugar, cotton, and oil. Coffee (from Arabic qahwa, via Ottoman Turkish) reached Europe through a chain of forced labor and monopoly trade. Sugar, from Sanskrit śarkarā via Arabic, masked a Caribbean plantation system that consumed millions of lives.",
  },

  // ── 2. Transatlantic Commodity Crops ──
  {
    root: "Colonial cash crops",
    lang: "Indigenous American + African languages → Portuguese/Spanish → English",
    meaning: "Plants and words that powered plantation slavery",
    groups: [
      {
        id: "new_world_crops",
        displayLabel: "New World crops",
        solutionLabel: "Crops originating in the Americas, absorbed into the Atlantic plantation system",
        hint: "These plants were native to the Americas and became foundations of colonial wealth — grown by enslaved and coerced labor.",
        hintLevel2: "Think of a Nahuatl drink, a Tupi nut, an Arawak smoking leaf, and a Nahuatl orchid flavoring.",
        accepts: ["cocoa", "cashew", "tobacco", "vanilla"],
        related: ["maize", "chili"],
      },
      {
        id: "survival_foods",
        displayLabel: "survival foods",
        solutionLabel: "Crops that fed the enslaved while cash crops generated profit for Europe",
        hint: "These starchy staples kept plantation workers alive — their words traveled across the Atlantic with displaced peoples.",
        hintLevel2: "Think of a West African word for a yellow fruit carried on slave ships, and a Tupi-Guaraní word for a starchy root.",
        accepts: ["banana", "cassava"],
        related: ["yam", "plantain"],
      },
    ],
    pool: ["cocoa", "cashew", "tobacco", "vanilla", "banana", "cassava"],
    tension:
      "Cocoa (Nahuatl cacahuatl), cashew (Tupi acajú), tobacco (Arawak tabaco), and vanilla (Nahuatl tlilxochitl) were New World crops that became luxury exports funding European industrialization. Banana (West African via Portuguese slave ships) and cassava (Tupi-Guaraní) were the survival foods — calorie-dense staples that plantation owners fed to the enslaved so they could survive to produce the cash crops. The English language absorbed the words while erasing most of the Indigenous and African cultivators who made them possible.",
    revealHeadline: "The grocery store is a museum of extractive empire.",
    revealBody:
      "Every chocolate bar carries the echo of the Middle Passage and plantation system. These words are not neutral — they mark the moment entire ecosystems and peoples were re-engineered for European profit. Cassava (manioc) was carried across the Atlantic as a cheap, high-calorie crop to sustain the enslaved population — its word came with it from Tupi-Guaraní. Banana arrived in the Caribbean on Portuguese slave ships from West Africa, where it had been cultivated for centuries. The 'cash crop' vocabulary (cocoa, tobacco, vanilla) was seized alongside the land and the people who had cultivated it.",
  },

  // ── 3. Settler-Colonial Appropriations ──
  {
    root: "Settler-colonial borrowings",
    lang: "Indigenous languages → English (via invasion & displacement)",
    meaning: "Words taken during land seizure and resource extraction",
    groups: [
      {
        id: "australian_appropriation",
        displayLabel: "Australian Aboriginal",
        solutionLabel: "Words from languages displaced by British settlement (1788 onward)",
        hint: "Taken during the invasion and colonization of Australia.",
        hintLevel2: "Think of a hopping marsupial, a curved throwing weapon, a tree-climbing marsupial, and a wild dog.",
        accepts: ["kangaroo", "boomerang", "koala", "dingo"],
        related: ["wombat", "wallaby"],
      },
      {
        id: "americas_indigenous",
        displayLabel: "Americas Indigenous",
        solutionLabel: "Words from languages impacted by European settlement and resource extraction",
        hint: "North & South American languages altered by colonization, silver mining, fur trade, and plantations.",
        hintLevel2: "Think of an Andean tuber, a Nahuatl red fruit, a Nahuatl green fruit, an Arawak boat, a Taíno sleeping net, and an Arawak smoking leaf.",
        accepts: ["potato", "tomato", "avocado", "canoe", "hammock", "tobacco"],
        related: ["moose", "raccoon", "squash"],
      },
    ],
    pool: ["kangaroo", "boomerang", "koala", "dingo", "potato", "tomato", "avocado", "canoe", "hammock", "tobacco"],
    tension:
      "As British, Spanish, Portuguese, and French settlers seized land, they also seized vocabulary. Kangaroo, boomerang, koala, and dingo come from languages whose speakers faced dispossession and violence in Australia. Potato, tomato, avocado, canoe, hammock, and tobacco come from Indigenous languages of the Americas whose speakers endured genocide, forced labor in silver mines, and plantation slavery. The English language expanded by extracting both land and words.",
    revealHeadline: "Every borrowed word marks stolen land.",
    revealBody:
      "These terms are living evidence of how empire worked: remove the people, keep the useful words. Kangaroo (Guugu Yimithirr gangurru) entered English in 1770 when Cook's crew annotated a people's homeland as 'undiscovered.' Boomerang (Dharug) and koala (Dharug gula) came from language groups nearly destroyed by the subsequent settler-colonial wave. Potato (Quechua papa via Spanish patata) and tomato (Nahuatl tomatl) were seized as agricultural prizes from civilizations that had cultivated them for millennia. Canoe (Arawak canoa) and hammock (Taíno hamaka) entered English through the Caribbean — from peoples who were nearly extinct within a century of European contact.",
  },
];

applyDatasetProvenance(IMPERIAL_EXTRACTION_POOL, "imperial_extraction");
