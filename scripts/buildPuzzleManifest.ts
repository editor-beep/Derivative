import { PUZZLE_MANIFEST } from "../src/data/puzzleManifest";
import { NORSE_BORROWED_POOL, NORSE_CONSONANT_POOL } from "../src/data/norseCollisions";
import { FOLK_ETYMOLOGY_POOL } from "../src/data/folkEtymology";
import { LOANWORD_EXTRACTION_POOL } from "../src/data/loanwordExtraction";
import { BORROWED_POOL } from "../src/data/borrowedPool";
import { FALSE_FAMILY_POOL } from "../src/data/falseFamilyPool";
import { SUPPLETIVE_POOL } from "../src/data/suppletivePool";
import { GRIMM_POOL } from "../src/data/grimmPool";
import { PIE_POOL } from "../src/data/piePool";
import { POOL_FLAT_TABLE } from "../insightEngine";

const EXPECTED_DAYS = 3650;
const EXACT_REPEAT_GAP_DAYS = 670;
const ROOT_WINDOW_DAYS = 90;
const ROOT_MAX_REUSE = 3;
const FAMILY_WINDOW_DAYS = 30;
const FAMILY_MAX_REUSE = 10;
const MIN_CONFIDENCE = 0.72;

function fail(msg: string): never {
  throw new Error(`[manifest-rule] ${msg}`);
}

function dayDiff(a: string, b: string): number {
  return Math.floor((new Date(a).getTime() - new Date(b).getTime()) / 86_400_000);
}

function validate(): void {
  if (PUZZLE_MANIFEST.length !== EXPECTED_DAYS) {
    fail(`expected ${EXPECTED_DAYS} entries, got ${PUZZLE_MANIFEST.length}`);
  }

  const idDays = new Map<string, string>();
  const rootDays = new Map<string, string[]>();
  const familyDays = new Map<string, string[]>();

  for (const entry of PUZZLE_MANIFEST) {
    if (entry.confidence < MIN_CONFIDENCE) {
      fail(`confidence below minimum for ${entry.date} (${entry.id})`);
    }

    const last = idDays.get(entry.id);
    if (last && dayDiff(entry.date, last) < EXACT_REPEAT_GAP_DAYS) {
      fail(`exact repeat policy violated by ${entry.id} between ${last} and ${entry.date}`);
    }
    idDays.set(entry.id, entry.date);

    const roots = rootDays.get(entry.rootKey) || [];
    const recentRoots = roots.filter((d) => dayDiff(entry.date, d) <= ROOT_WINDOW_DAYS);
    if (recentRoots.length >= ROOT_MAX_REUSE) {
      fail(`root reuse window exceeded for ${entry.rootKey} on ${entry.date}`);
    }
    recentRoots.push(entry.date);
    rootDays.set(entry.rootKey, recentRoots);

    const families = familyDays.get(entry.familyKey) || [];
    const recentFamilies = families.filter((d) => dayDiff(entry.date, d) <= FAMILY_WINDOW_DAYS);
    if (recentFamilies.length >= FAMILY_MAX_REUSE) {
      fail(`family reuse window exceeded for ${entry.familyKey} on ${entry.date}`);
    }
    recentFamilies.push(entry.date);
    familyDays.set(entry.familyKey, recentFamilies);
  }

  console.log(`Manifest OK: ${PUZZLE_MANIFEST.length} entries validated.`);
}

function validateSortLabels(): void {
  const pools = [
    { name: "NORSE_CONSONANT_POOL", entries: NORSE_CONSONANT_POOL },
    { name: "NORSE_BORROWED_POOL", entries: NORSE_BORROWED_POOL },
    { name: "FOLK_ETYMOLOGY_POOL", entries: FOLK_ETYMOLOGY_POOL },
    { name: "LOANWORD_EXTRACTION_POOL", entries: LOANWORD_EXTRACTION_POOL },
    { name: "BORROWED_POOL", entries: BORROWED_POOL },
    { name: "FALSE_FAMILY_POOL", entries: FALSE_FAMILY_POOL },
    { name: "SUPPLETIVE_POOL", entries: SUPPLETIVE_POOL },
    { name: "PIE_POOL", entries: PIE_POOL },
  ];

  for (const pool of pools) {
    pool.entries.forEach((entry, entryIndex) => {
      entry.groups.forEach((group, groupIndex) => {
        if (!group.displayLabel?.trim() || !group.solutionLabel?.trim()) {
          fail(
            `sort-label contract violated in ${pool.name}[${entryIndex}] (${entry.root}) group "${group.id}" at index ${groupIndex}`,
          );
        }
      });
    });
  }

  console.log("Sort label contract OK.");
}

function validateCoverage(): void {
  // Every builder/entry/lens combo in POOL_FLAT_TABLE must appear in the manifest.
  const usedCombos = new Set(
    PUZZLE_MANIFEST.map((e) => `${e.builderIdx}:${e.entryIdx}:${e.lensIdx}`),
  );
  const missing: string[] = [];
  for (const combo of POOL_FLAT_TABLE) {
    const key = `${combo.builderIdx}:${combo.entryIdx}:${combo.lensIdx}`;
    if (!usedCombos.has(key)) {
      missing.push(key);
    }
  }
  if (missing.length > 0) {
    fail(
      `${missing.length} puzzle combo(s) in POOL_FLAT_TABLE are never scheduled in the manifest. ` +
        `Run scripts/runGenerateManifest.js to regenerate. First missing: ${missing[0]}`,
    );
  }
  console.log(
    `Coverage OK: all ${POOL_FLAT_TABLE.length} valid builder/entry/lens combos are scheduled.`,
  );
}

validate();
validateSortLabels();
validateCoverage();
