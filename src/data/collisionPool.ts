import { FRENCH_DOUBLETS_POOL } from "./frenchFakeouts";
import { NORSE_CONSONANT_POOL } from "./norseCollisions";

export const COLLISION_POOL = [
  ...FRENCH_DOUBLETS_POOL,
  ...NORSE_CONSONANT_POOL,
  {
    root: "skirt / shirt",
    lang: "Old Norse + Old English",
    meaning: "cut",
    groups: [
      {
        id: "norse",
        label: "Old Norse stream (sk-)",
        displayLabel: "norse sk-",
        hint: "The Imperial Machine",
        accepts: ["skirt", "sky", "skill", "skin", "skull"],
        related: ["scrape", "scare"],
      },
      {
        id: "oe",
        label: "Old English stream (sh-)",
        displayLabel: "english sh-",
        hint: "The Root Source",
        accepts: ["shirt", "shore", "share", "shear", "shed"],
        related: ["shape", "shell"],
      },
    ],
    pool: [
      "skirt",
      "sky",
      "skill",
      "skin",
      "skull",
      "shirt",
      "shore",
      "share",
      "shear",
      "shed",
    ],
    tension:
      "Norse and Old English forms of the same PIE root survived as doublets in English",
  },
  {
    root: "fragile / frail",
    lang: "Latin + Old French",
    meaning: "breakable",
    groups: [
      {
        id: "latin",
        label: "Learned Latin form",
        displayLabel: "learned latin",
        hint: "The Scholar's Archive",
        accepts: ["fragile", "fracture", "fragment", "fraction"],
        related: ["infraction"],
      },
      {
        id: "french",
        label: "Eroded French form",
        displayLabel: "eroded french",
        hint: "The People's Thread",
        accepts: ["frail", "frailty", "afraid"],
        related: ["fraught"],
      },
    ],
    pool: [
      "fragile",
      "fracture",
      "fragment",
      "fraction",
      "frail",
      "frailty",
      "afraid",
      "fraught",
    ],
    tension:
      "Latin 'fragilis' entered English twice: once via learned borrowing, once via French erosion",
  },
  {
    root: "guarantee / warranty",
    lang: "Spanish/Germanic + Old French",
    meaning: "pledge",
    groups: [
      {
        id: "span",
        label: "Spanish-Germanic stream",
        displayLabel: "germanic stream",
        hint: "The Root Source",
        accepts: ["guarantee", "guarantor", "guard"],
        related: ["ward"],
      },
      {
        id: "french",
        label: "Old French stream",
        displayLabel: "french stream",
        hint: "The Imperial Machine",
        accepts: ["warranty", "warrant", "garrison"],
        related: ["warden"],
      },
    ],
    pool: [
      "guarantee",
      "guarantor",
      "guard",
      "warranty",
      "warrant",
      "garrison",
      "ward",
      "warden",
    ],
    tension:
      "Both 'guarantee' and 'warranty' trace to Proto-Germanic *warian (protect) via different Romance paths",
  },
];
