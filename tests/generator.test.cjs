const test = require("node:test");
const assert = require("node:assert/strict");
const { generateDailyPuzzle } = require("../.test-dist/generator.js");
const { getPuzzleManifestEntry } = require("../.test-dist/src/data/puzzleManifest.js");

test("same date returns structurally stable puzzle output", () => {
  const date = "2026-04-09";
  const first = generateDailyPuzzle(date);
  const second = generateDailyPuzzle(date);

  assert.equal(first.type, second.type);
  assert.equal(first.lensId, second.lensId);
  assert.deepEqual(Object.keys(first).sort(), Object.keys(second).sort());
  assert.deepEqual(first, second);
});

test("out-of-range dates are handled via generator error", () => {
  assert.equal(getPuzzleManifestEntry("2025-12-31"), null);
  assert.equal(getPuzzleManifestEntry("2036-01-01"), null);
  assert.throws(() => generateDailyPuzzle("2025-12-31"), /No manifest puzzle scheduled/);
});
