/**
 * generatePuzzleManifest.ts
 *
 * Generates src/data/puzzleManifest.ts from scratch using the full POOL_FLAT_TABLE
 * (all builder/entry/lens combinations defined in insightEngine.ts), so that every
 * valid puzzle generator path — including GRIMM and PIE — is schedulable.
 *
 * Algorithm:
 *  1. Read POOL_FLAT_TABLE (all valid builder+entry+lens combos).
 *  2. Group combos first by familyKey (type + entryIdx%4), then spread each family
 *     group evenly across the pool using a seeded offset.  Within each family group
 *     the combos are shuffled.  This two-level spread ensures no cluster of same-
 *     family entries falls within a 30-day window during tiling.
 *  3. Tile the resulting ordered pool across 3650 days.
 *  4. Validate all scheduling constraints (exact-repeat gap, root-reuse window,
 *     family-reuse window, minimum confidence).
 *  5. Write the manifest TypeScript file.
 *
 * Usage:
 *   npm run test:compile
 *   node - < scripts/generatePuzzleManifest.js   # or via ts-node if @types/node added
 *
 * The script is intentionally self-contained so it can also be run as plain Node.js
 * against the compiled .test-dist output (see scripts/runGenerateManifest.sh).
 */

import * as fs from "fs";
import * as path from "path";

import { PUZZLE_SOURCES, POOL_FLAT_TABLE } from "../insightEngine";
import { LENSES } from "../src/lenses";
import { BORROWED_POOL } from "../src/data/borrowedPool";
import { getDifficulty } from "../difficulty";
import type { PuzzleType, LensId } from "../types";

// ── Constants ────────────────────────────────────────────────────────────────

const MANIFEST_DAYS = 3650;
const MANIFEST_START_DATE = "2026-01-01";
const EXACT_REPEAT_GAP_DAYS = 45;
const ROOT_WINDOW_DAYS = 90;
const ROOT_MAX_REUSE = 3;
const FAMILY_WINDOW_DAYS = 30;
const FAMILY_MAX_REUSE = 10;
const GENERATION_SEED = 0xdead_beef;

const CONFIDENCE_BY_TYPE: Record<string, number> = {
  ROOT: 0.94,
  SUPPLETIVE: 0.84,
  SEMANTIC: 0.86,
  COLLISION: 0.82,
  DECEPTION: 0.78,
  FALSE_FAMILY: 0.79,
  IDIOM: 0.81,
  BORROWED: 0.77,
  MATCH: 0.77,
  TOPONYM: 0.84,
  GRIMM: 0.84,
  PIE: 0.82,
};

const LEVEL_TO_NUM: Record<string, number> = {
  EASY: 1,
  MEDIUM: 2,
  HARD: 3,
  VERY_HARD: 4,
};

// ── Seeded RNG (same mulberry32 as the rest of the codebase) ─────────────────

function mulberry32(seed: number): () => number {
  return function () {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4_294_967_296;
  };
}

// ── Pre-compute which BORROWED entryIdx values produce MATCH puzzles ──────────

const borrowedMatchSet = new Set<number>();
for (let i = 0; i < BORROWED_POOL.length; i++) {
  const entry = BORROWED_POOL[i];
  if (Array.isArray(entry?.matchPairs) && (entry.matchPairs as unknown[]).length > 0) {
    borrowedMatchSet.add(i);
  }
}

const BORROWED_BUILDER_IDX = PUZZLE_SOURCES.findIndex((s) => s.builderType === "BORROWED");

function getType(builderIdx: number, entryIdx: number): PuzzleType {
  const src = PUZZLE_SOURCES[builderIdx];
  if (!src) throw new Error(`Unknown builderIdx: ${builderIdx}`);
  if (src.builderType === "BORROWED" && borrowedMatchSet.has(entryIdx)) {
    return "MATCH" as PuzzleType;
  }
  return src.builderType as PuzzleType;
}

// ── Build an ordered pool via two-level spread interleaving ──────────────────
//
// Level 1: group by familyKey (type + entryIdx%4).  Spread each family group's
// K combos evenly across the pool using a random phase offset, ensuring same-
// family entries are maximally separated.
//
// Level 2: within each family group, shuffle combos so root-level clustering
// is broken too.
//
// This guarantees:
//   - No ≥10 same-familyKey entries within any 30-day window during tiling.
//   - No ≥3 same-rootKey entries within any 90-day window.
//   - Min gap between identical (builderIdx, entryIdx, lensIdx) combos = poolSize days >> 45.

function buildSpreadPool(pool: typeof POOL_FLAT_TABLE): typeof POOL_FLAT_TABLE {
  const poolSize = pool.length;
  const rng = mulberry32(GENERATION_SEED);

  // Group by familyKey
  const byFamily = new Map<string, (typeof pool)[number][]>();
  for (const combo of pool) {
    const type = getType(combo.builderIdx, combo.entryIdx);
    const fk = `${type}:${combo.entryIdx % 4}`;
    let group = byFamily.get(fk);
    if (!group) {
      group = [];
      byFamily.set(fk, group);
    }
    group.push(combo);
  }

  // Shuffle the familyKey list so offset phases are randomised
  const familyKeys = [...byFamily.keys()].sort();
  for (let i = familyKeys.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = familyKeys[i];
    familyKeys[i] = familyKeys[j]!;
    familyKeys[j] = tmp!;
  }

  // Assign each combo a target slot
  const assignments: Array<{ combo: (typeof pool)[number]; targetSlot: number }> = [];
  for (const fk of familyKeys) {
    const combos = byFamily.get(fk)!;
    const k = combos.length;
    const step = poolSize / k;
    const offset = rng() * step; // random phase in [0, step)
    // Shuffle within the group to break root-level sub-patterns
    for (let i = combos.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      const tmp = combos[i]!;
      combos[i] = combos[j]!;
      combos[j] = tmp;
    }
    for (let i = 0; i < k; i++) {
      assignments.push({
        combo: combos[i]!,
        targetSlot: Math.floor(offset + i * step),
      });
    }
  }

  // Sort by targetSlot (ties are resolved by insertion order)
  assignments.sort((a, b) => a.targetSlot - b.targetSlot);
  return assignments.map((a) => a.combo);
}

// ── Date utilities ────────────────────────────────────────────────────────────

function addDays(base: Date, days: number): string {
  const d = new Date(base.getTime() + days * 86_400_000);
  return d.toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string): number {
  return Math.floor((new Date(a).getTime() - new Date(b).getTime()) / 86_400_000);
}

// ── Validation ────────────────────────────────────────────────────────────────

interface ManifestEntry {
  date: string;
  id: string;
  builderIdx: number;
  entryIdx: number;
  lensIdx: number;
  type: string;
  lensId: string;
  difficulty: number;
  confidence: number;
  rootKey: string;
  familyKey: string;
}

function validate(entries: ManifestEntry[]): void {
  if (entries.length !== MANIFEST_DAYS) {
    throw new Error(`Expected ${MANIFEST_DAYS} entries, got ${entries.length}`);
  }

  const idDays = new Map<string, string>();
  const rootDays = new Map<string, string[]>();
  const familyDays = new Map<string, string[]>();

  for (const entry of entries) {
    if (entry.confidence < 0.72) {
      throw new Error(`confidence below minimum for ${entry.date} (${entry.id})`);
    }

    const lastId = idDays.get(entry.id);
    if (lastId && daysBetween(entry.date, lastId) < EXACT_REPEAT_GAP_DAYS) {
      throw new Error(
        `exact repeat policy violated by ${entry.id} between ${lastId} and ${entry.date}`,
      );
    }
    idDays.set(entry.id, entry.date);

    const roots = rootDays.get(entry.rootKey) ?? [];
    const recentRoots = roots.filter((d) => daysBetween(entry.date, d) <= ROOT_WINDOW_DAYS);
    if (recentRoots.length >= ROOT_MAX_REUSE) {
      throw new Error(
        `root reuse window exceeded for ${entry.rootKey} on ${entry.date}`,
      );
    }
    recentRoots.push(entry.date);
    rootDays.set(entry.rootKey, recentRoots);

    const families = familyDays.get(entry.familyKey) ?? [];
    const recentFamilies = families.filter((d) =>
      daysBetween(entry.date, d) <= FAMILY_WINDOW_DAYS,
    );
    if (recentFamilies.length >= FAMILY_MAX_REUSE) {
      throw new Error(
        `family reuse window exceeded for ${entry.familyKey} on ${entry.date}`,
      );
    }
    recentFamilies.push(entry.date);
    familyDays.set(entry.familyKey, recentFamilies);
  }

  console.log(`Validation OK: ${entries.length} entries, all constraints satisfied.`);
}

// ── Main ──────────────────────────────────────────────────────────────────────

function generate(): ManifestEntry[] {
  const spreadPool = buildSpreadPool(POOL_FLAT_TABLE);
  const poolSize = spreadPool.length;
  const startDate = new Date(MANIFEST_START_DATE + "T00:00:00Z");

  const entries: ManifestEntry[] = [];

  for (let day = 0; day < MANIFEST_DAYS; day++) {
    const combo = spreadPool[day % poolSize]!;
    const src = PUZZLE_SOURCES[combo.builderIdx]!;
    const lens = LENSES[combo.lensIdx]!;
    const type = getType(combo.builderIdx, combo.entryIdx);
    const lensId = lens.id as LensId;
    const diffLevel = getDifficulty(type, lensId);
    const difficulty = LEVEL_TO_NUM[diffLevel] ?? 2;
    const confidence = CONFIDENCE_BY_TYPE[src.builderType] ?? 0.80;

    const id =
      `pz-${String(combo.builderIdx).padStart(2, "0")}` +
      `${String(combo.entryIdx).padStart(3, "0")}` +
      `${combo.lensIdx}`;

    const rootKey = `${combo.builderIdx}:${combo.entryIdx}`;
    const familyKey = `${type}:${combo.entryIdx % 4}`;

    entries.push({
      date: addDays(startDate, day),
      id,
      builderIdx: combo.builderIdx,
      entryIdx: combo.entryIdx,
      lensIdx: combo.lensIdx,
      type,
      lensId,
      difficulty,
      confidence,
      rootKey,
      familyKey,
    });
  }

  return entries;
}

function writeManifest(entries: ManifestEntry[]): void {
  const lines: string[] = [
    "// AUTO-GENERATED by scripts/generatePuzzleManifest.ts",
    "// Do not edit by hand — run the generator script to regenerate.",
    "",
    `import { parseUtcDateKeyToMillis } from "../dateUtils";`,
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
    `export const PUZZLE_MANIFEST_VERSION = "v2";`,
    `export const PUZZLE_MANIFEST_START_DATE = "${MANIFEST_START_DATE}";`,
    `export const PUZZLE_MANIFEST_DAYS = ${MANIFEST_DAYS};`,
    "export const PUZZLE_MANIFEST: PuzzleManifestEntry[] = [",
  ];

  for (const e of entries) {
    lines.push(
      `  { date: "${e.date}", id: "${e.id}", builderIdx: ${e.builderIdx}, entryIdx: ${e.entryIdx}, lensIdx: ${e.lensIdx}, type: "${e.type}", lensId: "${e.lensId}", difficulty: ${e.difficulty}, confidence: ${e.confidence}, rootKey: "${e.rootKey}", familyKey: "${e.familyKey}" },`,
    );
  }

  lines.push("];", "");

  lines.push(
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
  fs.writeFileSync(outPath, lines.join("\n"), "utf8");
  console.log(`Wrote ${outPath} (${entries.length} entries)`);
}

// ── Entry point ───────────────────────────────────────────────────────────────

const entries = generate();
validate(entries);

// Print type distribution summary
const typeCounts: Record<string, number> = {};
for (const e of entries) {
  typeCounts[e.type] = (typeCounts[e.type] ?? 0) + 1;
}
console.log("Type distribution:", typeCounts);

// Print unique combos used
const uniqueCombos = new Set(entries.map((e) => e.id));
console.log(`Unique puzzle combinations: ${uniqueCombos.size} / ${POOL_FLAT_TABLE.length}`);

writeManifest(entries);
