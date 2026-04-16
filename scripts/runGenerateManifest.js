#!/usr/bin/env node
/**
 * runGenerateManifest.js
 *
 * Thin Node.js wrapper that runs the manifest generation logic against the
 * compiled .test-dist output.  Run after `npm run test:compile`:
 *
 *   npm run test:compile && node scripts/runGenerateManifest.js
 */

"use strict";

const fs   = require("fs");
const path = require("path");

const ie       = require("../.test-dist/insightEngine.js");
const lenses   = require("../.test-dist/src/lenses.js").LENSES;
const diffMod  = require("../.test-dist/difficulty.js");
const borrowed = require("../.test-dist/src/data/borrowedPool.js");

// ── Constants ─────────────────────────────────────────────────────────────────
const GENERATION_SEED         = 0xdeadbeef;
const MANIFEST_DAYS           = 3650;
const MANIFEST_START_DATE     = "2026-01-01";
const EXACT_REPEAT_GAP_DAYS   = 670;
const ROOT_WINDOW_DAYS        = 90;
const ROOT_MAX_REUSE          = 3;
const FAMILY_WINDOW_DAYS      = 30;
const FAMILY_MAX_REUSE        = 10;

const CONFIDENCE_BY_TYPE = {
  ROOT: 0.94, SUPPLETIVE: 0.84, SEMANTIC: 0.86, COLLISION: 0.82,
  DECEPTION: 0.78, FALSE_FAMILY: 0.79, IDIOM: 0.81, BORROWED: 0.77,
  MATCH: 0.77, TOPONYM: 0.84, GRIMM: 0.84, PIE: 0.82,
};
const LEVEL_TO_NUM = { EASY: 1, MEDIUM: 2, HARD: 3, VERY_HARD: 4 };

// ── Seeded RNG (mulberry32) ────────────────────────────────────────────────────
function mulberry32(seed) {
  return function () {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4_294_967_296;
  };
}

// ── Pre-compute MATCH entries ─────────────────────────────────────────────────
const borrowedMatchSet = new Set();
for (let i = 0; i < borrowed.BORROWED_POOL.length; i++) {
  const e = borrowed.BORROWED_POOL[i];
  if (Array.isArray(e?.matchPairs) && e.matchPairs.length > 0) borrowedMatchSet.add(i);
}

function getType(builderIdx, entryIdx) {
  const src = ie.PUZZLE_SOURCES[builderIdx];
  if (src.builderType === "BORROWED" && borrowedMatchSet.has(entryIdx)) return "MATCH";
  return src.builderType;
}

// ── Two-level spread pool ─────────────────────────────────────────────────────
function buildSpreadPool(pool) {
  const sz  = pool.length;
  const rng = mulberry32(GENERATION_SEED);

  const byFamily = new Map();
  for (const combo of pool) {
    const type = getType(combo.builderIdx, combo.entryIdx);
    const fk   = `${type}:${combo.entryIdx % 4}`;
    if (!byFamily.has(fk)) byFamily.set(fk, []);
    byFamily.get(fk).push(combo);
  }

  const familyKeys = [...byFamily.keys()].sort();
  for (let i = familyKeys.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [familyKeys[i], familyKeys[j]] = [familyKeys[j], familyKeys[i]];
  }

  const assignments = [];
  for (const fk of familyKeys) {
    const combos = byFamily.get(fk);
    const k    = combos.length;
    const step = sz / k;
    const off  = rng() * step;
    for (let i = combos.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [combos[i], combos[j]] = [combos[j], combos[i]];
    }
    for (let i = 0; i < k; i++) {
      assignments.push({ combo: combos[i], targetSlot: Math.floor(off + i * step) });
    }
  }

  assignments.sort((a, b) => a.targetSlot - b.targetSlot);
  return assignments.map(a => a.combo);
}

// ── Generate entries ──────────────────────────────────────────────────────────
const rawPool    = ie.POOL_FLAT_TABLE;
const spreadPool = buildSpreadPool(rawPool);
const poolSize   = spreadPool.length;
const startDate  = new Date(MANIFEST_START_DATE + "T00:00:00Z");

function addDays(base, days) {
  return new Date(base.getTime() + days * 86_400_000).toISOString().slice(0, 10);
}

const entries = [];
for (let day = 0; day < MANIFEST_DAYS; day++) {
  const combo      = spreadPool[day % poolSize];
  const src        = ie.PUZZLE_SOURCES[combo.builderIdx];
  const lens       = lenses[combo.lensIdx];
  const type       = getType(combo.builderIdx, combo.entryIdx);
  const lensId     = lens.id;
  const diffLevel  = diffMod.getDifficulty(type, lensId);
  const difficulty = LEVEL_TO_NUM[diffLevel] || 2;
  const confidence = CONFIDENCE_BY_TYPE[src.builderType] || 0.80;
  const id         = `pz-${String(combo.builderIdx).padStart(2, "0")}${String(combo.entryIdx).padStart(3, "0")}${combo.lensIdx}`;
  const rootKey    = `${combo.builderIdx}:${combo.entryIdx}`;
  const familyKey  = `${type}:${combo.entryIdx % 4}`;
  entries.push({ date: addDays(startDate, day), id, builderIdx: combo.builderIdx, entryIdx: combo.entryIdx, lensIdx: combo.lensIdx, type, lensId, difficulty, confidence, rootKey, familyKey });
}

// ── Validate ──────────────────────────────────────────────────────────────────
const idDays = {}, rootDays = {}, familyDays = {};
let   violations = 0;

function daysBetween(a, b) { return Math.floor((new Date(a) - new Date(b)) / 86_400_000); }

for (const e of entries) {
  if (e.confidence < 0.72) { violations++; console.error("low confidence:", e.id); }
  const d = daysBetween(e.date, MANIFEST_START_DATE);

  if (idDays[e.id] !== undefined && d - idDays[e.id] < EXACT_REPEAT_GAP_DAYS) {
    violations++; console.error("id repeat too soon:", e.id, idDays[e.id], d);
  }
  idDays[e.id] = d;

  if (!rootDays[e.rootKey]) rootDays[e.rootKey] = [];
  const recentR = rootDays[e.rootKey].filter(x => d - x <= ROOT_WINDOW_DAYS);
  if (recentR.length >= ROOT_MAX_REUSE) { violations++; console.error("root reuse:", e.rootKey, e.date); }
  rootDays[e.rootKey] = [...recentR, d];

  if (!familyDays[e.familyKey]) familyDays[e.familyKey] = [];
  const recentF = familyDays[e.familyKey].filter(x => d - x <= FAMILY_WINDOW_DAYS);
  if (recentF.length >= FAMILY_MAX_REUSE) { violations++; console.error("family reuse:", e.familyKey, e.date); }
  familyDays[e.familyKey] = [...recentF, d];
}

if (violations > 0) {
  console.error(`\n❌  ${violations} scheduling violation(s) — manifest NOT written.`);
  process.exit(1);
}
console.log(`✅  Validation passed (${entries.length} entries, 0 violations).`);

const typeCounts = {};
for (const e of entries) typeCounts[e.type] = (typeCounts[e.type] || 0) + 1;
console.log("Type distribution:", typeCounts);
const uniqueIds = new Set(entries.map(e => e.id));
console.log(`Unique puzzle combos: ${uniqueIds.size} / ${poolSize}`);

// ── Write manifest ────────────────────────────────────────────────────────────
const outLines = [
  "// AUTO-GENERATED by scripts/generatePuzzleManifest.ts",
  "// Do not edit by hand — run the generator script to regenerate.",
  "",
  'import { parseUtcDateKeyToMillis } from "../dateUtils";',
  "",
  "export type PuzzleManifestEntry = {",
  "  date: string;",
  "  id: string;",
  "  builderIdx: number;",
  "  entryIdx: number;",
  "  lensIdx: number;",
  "  type: string;",
  "  lensId: string;",
  "  difficulty: number;",
  "  confidence: number;",
  "  rootKey: string;",
  "  familyKey: string;",
  "};",
  "",
  'export const PUZZLE_MANIFEST_VERSION = "v2";',
  `export const PUZZLE_MANIFEST_START_DATE = "${MANIFEST_START_DATE}";`,
  `export const PUZZLE_MANIFEST_DAYS = ${MANIFEST_DAYS};`,
  "export const PUZZLE_MANIFEST: PuzzleManifestEntry[] = [",
];
for (const e of entries) {
  outLines.push(
    `  { date: "${e.date}", id: "${e.id}", builderIdx: ${e.builderIdx}, entryIdx: ${e.entryIdx}, lensIdx: ${e.lensIdx}, type: "${e.type}", lensId: "${e.lensId}", difficulty: ${e.difficulty}, confidence: ${e.confidence}, rootKey: "${e.rootKey}", familyKey: "${e.familyKey}" },`,
  );
}
outLines.push(
  "];",
  "",
  "const DAY_IN_MS = 86_400_000;",
  "const MANIFEST_START_MILLIS = parseUtcDateKeyToMillis(PUZZLE_MANIFEST_START_DATE);",
  "",
  "export function getPuzzleManifestEntry(date: string): PuzzleManifestEntry | null {",
  "  if (MANIFEST_START_MILLIS === null) return null;",
  "",
  "  const current = parseUtcDateKeyToMillis(date);",
  "  if (current === null) return null;",
  "",
  "  const idx = Math.floor((current - MANIFEST_START_MILLIS) / DAY_IN_MS);",
  "  if (idx < 0 || idx >= PUZZLE_MANIFEST.length) return null;",
  "",
  "  const entry = PUZZLE_MANIFEST[idx];",
  "  return entry?.date === date ? entry : null;",
  "}",
  "",
);

const outPath = path.resolve(__dirname, "../src/data/puzzleManifest.ts");
fs.writeFileSync(outPath, outLines.join("\n"), "utf8");
console.log(`\nWritten → ${outPath}`);
