const test = require("node:test");
const assert = require("node:assert/strict");
const {
  PUZZLE_MANIFEST,
  PUZZLE_MANIFEST_DAYS,
  PUZZLE_MANIFEST_START_DATE,
  getPuzzleManifestEntry,
} = require("../.test-dist/src/data/puzzleManifest.js");

test("manifest size metadata matches manifest array", () => {
  assert.equal(PUZZLE_MANIFEST.length, PUZZLE_MANIFEST_DAYS);
});

test("manifest date/index mapping integrity", () => {
  const startMillis = new Date(`${PUZZLE_MANIFEST_START_DATE}T00:00:00Z`).getTime();
  for (const [idx, entry] of PUZZLE_MANIFEST.entries()) {
    const mapped = getPuzzleManifestEntry(entry.date);
    assert.ok(mapped, `expected manifest entry for ${entry.date}`);
    assert.equal(mapped.id, entry.id);
    const entryMillis = new Date(`${entry.date}T00:00:00Z`).getTime();
    const expectedIdx = Math.floor((entryMillis - startMillis) / 86_400_000);
    assert.equal(expectedIdx, idx, `date/index drift at ${entry.date}`);
  }
});

test("manifest returns null for invalid or out-of-range dates", () => {
  assert.equal(getPuzzleManifestEntry("not-a-date"), null);
  assert.equal(getPuzzleManifestEntry("2025-12-31"), null);
  assert.equal(getPuzzleManifestEntry("2036-01-01"), null);
});
