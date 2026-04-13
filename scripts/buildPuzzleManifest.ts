import { PUZZLE_MANIFEST } from "../src/data/puzzleManifest";

const EXPECTED_DAYS = 3650;
const EXACT_REPEAT_GAP_DAYS = 45;
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

validate();
