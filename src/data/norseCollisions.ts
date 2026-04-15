import { applyDatasetProvenance } from "./sources";
// src/data/norseCollisions.ts
// Norse/Saxon collision seed data — two pool types:
//   NORSE_CONSONANT_POOL → COLLISION_POOL entries (sk- vs sh- splits)
//   NORSE_BORROWED_POOL  → BORROWED_POOL entries (Norse winners by domain)

// ── CONSONANT SPLITS (COLLISION shape) ───────────────────────────────────────
// The same PIE root arrived in English twice: once via Old Norse (hard sk-)
// and once via Old English (softened sh-/ch-). Both survived as doublets.

export const NORSE_CONSONANT_POOL = [
  {
    root: "sk- / sh- body & surface",
    lang: "Old Norse + Old English",
    meaning: "body and surface doublets",
    groups: [
      {
        id: "norse",
        displayLabel: "norse sk-", solutionLabel: "Old Norse stream (hard sk-)",
        hint: "The Imperial Machine",
        accepts: ["skirt", "skull", "skin", "skill", "sky"],
        related: ["scrape", "scare"],
      },
      {
        id: "oe",
        displayLabel: "english sh-", solutionLabel: "Old English stream (soft sh-)",
        hint: "The Root Source",
        accepts: ["shirt", "shell", "shin", "share", "shore"],
        related: ["shape", "shed"],
      },
    ],
    pool: ["skirt", "skull", "skin", "skill", "sky", "shirt", "shell", "shin", "share", "shore"],
    tension:
      "Skirt and shirt are the same garment word — Norse kept the hard k while Old English softened it to sh. Skull and shell are the same casing, split by language.",
  },
  {
    root: "sk- / sh- motion & force",
    lang: "Old Norse + Old English",
    meaning: "motion and force doublets",
    groups: [
      {
        id: "norse",
        displayLabel: "norse sk-", solutionLabel: "Old Norse stream (hard sk-)",
        hint: "The Imperial Machine",
        accepts: ["scatter", "skid", "scrape", "score"],
        related: ["screech", "scowl"],
      },
      {
        id: "oe",
        displayLabel: "english sh-", solutionLabel: "Old English stream (soft sh-)",
        hint: "The Root Source",
        accepts: ["shatter", "slide", "shred", "shear"],
        related: ["shriek", "shy"],
      },
    ],
    pool: ["scatter", "skid", "scrape", "score", "shatter", "slide", "shred", "shear"],
    tension:
      "Scatter and shatter are twin destruction words — Norse disperses, Saxon breaks. Scrape and shear are twin removal words — one grinds, one cuts.",
  },
  {
    root: "Kirk / Church — k- / ch-",
    lang: "Old Norse + Old English",
    meaning: "place of worship",
    groups: [
      {
        id: "norse",
        displayLabel: "norse k-", solutionLabel: "Old Norse stream (hard k-)",
        hint: "The Imperial Machine",
        accepts: ["kirk", "dike", "egg"],
        related: ["garth", "beck"],
      },
      {
        id: "oe",
        displayLabel: "english ch-", solutionLabel: "Old English stream (soft ch-/dg-)",
        hint: "The Root Source",
        accepts: ["church", "ditch", "edge"],
        related: ["yard", "brook"],
      },
    ],
    pool: ["kirk", "dike", "egg", "church", "ditch", "edge"],
    tension:
      "Kirk is what Scots and Northerners still call a church — the hard Norse k never softened. Dike and ditch, egg and edge: each pair shows where the two dialects drew the border.",
  },
];

// ── NORSE BORROWED (BORROWED shape) ──────────────────────────────────────────
// Norse words that won out over Old English equivalents, or filled gaps.
// Grouped by semantic domain so each entry makes a coherent puzzle.

export const NORSE_BORROWED_POOL = [
  {
    root: "pronoun revolution",
    lang: "Old Norse → Middle English",
    meaning: "Norse th- pronouns replacing Saxon h- pronouns",
    groups: [
      {
        id: "norse_winner",
        displayLabel: "norse th-", solutionLabel: "Norse th- forms (the winners)",
        hint: "The Imperial Machine",
        accepts: ["they", "them", "their", "both", "same"],
        related: ["their", "theirs"],
      },
      {
        id: "oe_loser",
        displayLabel: "english h-", solutionLabel: "Old English h- forms (displaced)",
        hint: "The Root Source",
        accepts: ["hie", "hem", "here", "ba", "ilk"],
        related: ["he", "him"],
      },
    ],
    pool: ["they", "them", "their", "both", "same", "hie", "hem", "here", "ba", "ilk"],
    tension:
      "The entire English plural pronoun system was replaced by Norse. 'They/them/their' are Scandinavian invaders — Old English said 'hie/hem/here' and Norse made them vanish.",
  },
  {
    root: "landscape vocabulary",
    lang: "Old Norse → Northern English dialects",
    meaning: "Norse topographic terms",
    groups: [
      {
        id: "norse",
        displayLabel: "norse landscape", solutionLabel: "Norse landscape words (still in place names)",
        hint: "The Imperial Machine",
        accepts: ["fell", "beck", "tarn", "dale", "gill", "ness", "wick", "holm", "thorp", "by"],
        related: ["scar", "force"],
      },
      {
        id: "english",
        displayLabel: "english words", solutionLabel: "English equivalents",
        hint: "The Root Source",
        accepts: ["hill", "stream", "lake", "valley", "ravine"],
        related: ["headland", "bay", "island", "village", "town", "moor", "cliff"],
      },
    ],
    pool: ["fell", "beck", "tarn", "dale", "gill", "ness", "wick", "holm", "thorp", "by", "hill", "stream", "lake", "valley", "ravine"],
    tension:
      "Every '-by' town (Derby, Whitby) and '-dale' valley (Airedale, Teesdale) is a Viking settlement marker. The landscape of Northern England is written in Old Norse.",
  },
  {
    root: "Norse social vocabulary",
    lang: "Old Norse → Middle English",
    meaning: "core social and legal terms",
    groups: [
      {
        id: "norse",
        displayLabel: "norse layer", solutionLabel: "Norse social words",
        accepts: ["law", "husband", "fellow", "skill", "trust", "loan", "anger", "wrong", "happy", "guest"],
        related: ["ransack", "outlaw"],
      },
      {
        id: "concept",
        displayLabel: "original meanings", solutionLabel: "What each word originally meant",
        accepts: [],
        related: ["things laid down", "house-bound one", "fee-layer (partner)", "to distinguish", "stronghold of mind", "formal debt", "grief-sorrow", "crooked", "having luck", "recognized stranger", "judgment", "serf"],
      },
    ],
    matchPairs: [
      { source: "law", target: "things laid down" },
      { source: "husband", target: "house-bound one" },
      { source: "fellow", target: "fee-layer (partner)" },
      { source: "skill", target: "to distinguish" },
      { source: "trust", target: "stronghold of mind" },
      { source: "loan", target: "formal debt" },
      { source: "anger", target: "grief-sorrow" },
      { source: "wrong", target: "crooked" },
      { source: "happy", target: "having luck" },
      { source: "guest", target: "recognized stranger" },
    ],
    pool: ["law", "husband", "fellow", "skill", "trust", "loan", "anger", "wrong", "happy", "guest"],
    tension:
      "Law, husband, fellow, trust — the Viking contribution to English social life is enormous. 'Husband' means the one bound to the house; 'fellow' means the one who lays down money.",
  },
  {
    root: "Norse daily replacements",
    lang: "Old Norse → Middle English",
    meaning: "Norse words that displaced Old English",
    groups: [
      {
        id: "norse_winner",
        displayLabel: "norse layer", solutionLabel: "Norse winner (what we say now)",
        hint: "The Imperial Machine",
        accepts: ["take", "die", "sky", "leg", "skin", "call", "hit", "ill", "ugly", "want"],
        related: ["get", "give", "raise"],
      },
      {
        id: "oe_loser",
        displayLabel: "english layer", solutionLabel: "Old English loser (what we no longer say)",
        hint: "The Root Source",
        accepts: ["nim", "clepe", "smite"],
        related: ["starve (any death)", "heaven (physical)", "limb (specific)", "hide (human)", "sick (mental)", "unfair", "wish (lack)", "yclept", "slay"],
      },
    ],
    pool: ["take", "die", "sky", "leg", "skin", "call", "hit", "ill", "ugly", "want", "nim", "clepe", "smite"],
    tension:
      "Norse 'taka' killed Old English 'niman' (to take). 'Die' is Norse — Old English 'starfan' meant any kind of death, not just famine. 'Sky' is physical Norse air; 'heaven' was the spiritual Old English dome.",
  },
  {
    root: "Norse daily objects",
    lang: "Old Norse → Middle English",
    meaning: "common household and bodily words from Norse",
    groups: [
      {
        id: "norse",
        displayLabel: "norse layer", solutionLabel: "Norse everyday words",
        accepts: ["egg", "knife", "cake", "bag", "seat", "gap", "loose", "flat", "get", "window"],
        related: ["steak", "root"],
      },
      {
        id: "origin",
        displayLabel: "english layer", solutionLabel: "What displaced or what the Norse word replaced",
        accepts: [],
        related: ["ey (Saxon form)", "seax (Saxon blade)", "bread type", "sack", "stool", "opening", "tied", "level", "catch/seize", "vind-auga (wind-eye)", "hlaef", "dwellan"],
      },
    ],
    matchPairs: [
      { source: "egg", target: "ey (Saxon form)" },
      { source: "knife", target: "seax (Saxon blade)" },
      { source: "cake", target: "bread type" },
      { source: "bag", target: "sack" },
      { source: "seat", target: "stool" },
      { source: "gap", target: "opening" },
      { source: "loose", target: "tied" },
      { source: "flat", target: "level" },
      { source: "get", target: "catch/seize" },
      { source: "window", target: "vind-auga (wind-eye)" },
    ],
    pool: ["egg", "knife", "cake", "bag", "seat", "gap", "loose", "flat", "get", "window"],
    tension:
      "Window is 'wind-eye' in Norse — it replaced the Old English 'eye-hole.' Egg replaced 'ey.' Knife replaced 'seax' (which survives only in 'Essex'). The Norse reformed the kitchen and the house.",
  },
];

// Provenance annotations
applyDatasetProvenance(NORSE_CONSONANT_POOL, "norse_consonant");
applyDatasetProvenance(NORSE_BORROWED_POOL, "norse_borrowed");
