const test = require("node:test");
const assert = require("node:assert/strict");
const { generateDailyPuzzle } = require("../.test-dist/generator.js");
const { getPuzzleManifestEntry } = require("../.test-dist/src/data/puzzleManifest.js");

function assertShapeContract(puzzle, date) {
  assert.equal(puzzle.date, date);
  assert.equal(typeof puzzle.prompt, "string");
  assert.ok(puzzle.prompt.length > 0, "prompt must be non-empty");
  assert.ok(puzzle.reveal, "reveal payload is required");

  switch (puzzle.type) {
    case "ROOT":
      assert.ok(Array.isArray(puzzle.targets) && puzzle.targets.length > 0, "ROOT needs targets");
      assert.ok(Array.isArray(puzzle.required) && puzzle.required.length > 0, "ROOT needs required");
      assert.ok(Array.isArray(puzzle.pool) && puzzle.pool.length > 0, "ROOT needs pool");
      break;
    case "SEMANTIC":
      assert.ok(Array.isArray(puzzle.timeline) && puzzle.timeline.length > 0, "SEMANTIC needs timeline");
      break;
    case "IDIOM":
      assert.ok(puzzle.answer, "IDIOM needs answer");
      assert.ok(puzzle.word, "IDIOM needs origin word");
      break;
    default:
      assert.ok(Array.isArray(puzzle.groups) && puzzle.groups.length > 0, `${puzzle.type} needs groups`);
      assert.ok(Array.isArray(puzzle.pool) && puzzle.pool.length > 0, `${puzzle.type} needs pool`);
      break;
  }
}

test("same date returns deterministic puzzle output", () => {
  const date = "2026-04-09";
  const first = generateDailyPuzzle(date);
  const second = generateDailyPuzzle(date);

  assert.deepEqual(first, second);
});

test("generator output honors manifest metadata and shape contracts", () => {
  const dates = ["2026-01-01", "2026-01-02", "2026-01-03", "2026-01-09", "2026-01-15"];

  for (const date of dates) {
    const manifest = getPuzzleManifestEntry(date);
    assert.ok(manifest, `missing manifest entry for ${date}`);

    const puzzle = generateDailyPuzzle(date);
    assert.equal(puzzle.type, manifest.type, `type drift for ${date}`);
    assert.equal(puzzle.lensId, manifest.lensId, `lens drift for ${date}`);
    assertShapeContract(puzzle, date);
  }
});

test("out-of-range dates are rejected", () => {
  assert.equal(getPuzzleManifestEntry("2025-12-31"), null);
  assert.equal(getPuzzleManifestEntry("2036-01-01"), null);
  assert.throws(() => generateDailyPuzzle("2025-12-31"), /No manifest puzzle scheduled/);
});
