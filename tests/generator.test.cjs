const test = require("node:test");
const assert = require("node:assert/strict");
const { generateDailyPuzzle } = require("../.test-dist/generator.js");
const { getPuzzleManifestEntry } = require("../.test-dist/src/data/puzzleManifest.js");

function assertPlayableShape(playable, manifest) {
  assert.ok(playable, "playable puzzle must exist");
  assert.ok(Array.isArray(playable.steps), "playable.steps must be an array");
  assert.ok(playable.reveal, "reveal payload is required");

  if (["SUPPLETIVE", "COLLISION", "PIE", "GRIMM", "BORROWED", "FALSE_FAMILY", "DECEPTION", "PHANTOM_ROOT", "TOPONYM"].includes(manifest.type)) {
    assert.ok(playable.steps.length > 0, `${manifest.type} should generate progressive steps`);
    const classifySteps = playable.steps.filter((step) => step.type === "CLASSIFY");
    assert.ok(classifySteps.length > 0, `${manifest.type} should include CLASSIFY steps`);

    const guessSteps = playable.steps.filter((step) => step.type === "GUESS_SYSTEM");
    assert.ok(guessSteps.length > 0, `${manifest.type} should include GUESS_SYSTEM steps`);

    for (const step of classifySteps) {
      assert.equal(typeof step.word, "string");
      assert.ok(step.word.length > 0);
      assert.ok(Array.isArray(step.options) && step.options.length > 0, "CLASSIFY options must be present");
      assert.equal(typeof step.correct, "string");
      assert.ok(step.options.includes(step.correct), "CLASSIFY correct must be one of options");
    }

    for (const step of guessSteps) {
      assert.ok(Array.isArray(step.options) && step.options.length > 0, "GUESS_SYSTEM options must be present");
      assert.equal(typeof step.correct, "string");
      assert.ok(step.options.includes(step.correct), "GUESS_SYSTEM correct must be one of options");
    }
  } else {
    assert.ok(playable.steps.length > 0, `${manifest.type} should still produce playable steps`);
  }
}

test("same date returns deterministic puzzle output", () => {
  const date = "2026-04-09";
  const first = generateDailyPuzzle(date);
  const second = generateDailyPuzzle(date);

  assert.deepEqual(first, second);
});

test("generator returns playable puzzles with reveal and step contracts", () => {
  const dates = ["2026-01-01", "2026-01-02", "2026-01-03", "2026-01-09", "2026-01-15"];

  for (const date of dates) {
    const manifest = getPuzzleManifestEntry(date);
    assert.ok(manifest, `missing manifest entry for ${date}`);

    const playable = generateDailyPuzzle(date);
    assertPlayableShape(playable, manifest);
  }
});

test("out-of-range dates are rejected", () => {
  assert.equal(getPuzzleManifestEntry("2025-12-31"), null);
  assert.equal(getPuzzleManifestEntry("2036-01-01"), null);
  assert.throws(() => generateDailyPuzzle("2025-12-31"), /No manifest puzzle scheduled/);
});
