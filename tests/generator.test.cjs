const test = require("node:test");
const assert = require("node:assert/strict");
const { generateDailyPuzzle } = require("../.test-dist/generator.js");
const { getPuzzleManifestEntry } = require("../.test-dist/src/data/puzzleManifest.js");

function normalizeComparisonText(text) {
  return (text ?? "")
    .toLowerCase()
    .trim()
    .replace(/[\p{P}\p{S}]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text) {
  return normalizeComparisonText(text).split(" ").filter(Boolean);
}

function jaccardSimilarity(aText, bText) {
  const a = new Set(tokenize(aText));
  const b = new Set(tokenize(bText));
  if (a.size === 0 || b.size === 0) return 0;
  let intersection = 0;
  for (const token of a) {
    if (b.has(token)) intersection += 1;
  }
  const union = new Set([...a, ...b]).size;
  return union === 0 ? 0 : intersection / union;
}

function assertPromptAndRevealDiverge(puzzle, manifest, threshold = 0.72) {
  const promptNorm = normalizeComparisonText(puzzle.prompt);
  const revealText = `${puzzle.reveal?.headline ?? ""} ${puzzle.reveal?.body ?? ""}`;
  const revealNorm = normalizeComparisonText(revealText);
  const promptContainsReveal = revealNorm.length > 0 && promptNorm.includes(revealNorm);
  const revealContainsPrompt = promptNorm.length > 0 && revealNorm.includes(promptNorm);
  const similarity = jaccardSimilarity(promptNorm, revealNorm);
  const duplicateLike =
    promptNorm === revealNorm ||
    promptContainsReveal ||
    revealContainsPrompt ||
    similarity >= threshold;

  assert.equal(
    duplicateLike,
    false,
    [
      `prompt/reveal are too similar for id=${manifest.id} type=${puzzle.type} date=${puzzle.date}`,
      `prompt="${puzzle.prompt}"`,
      `reveal="${revealText.trim()}"`,
      `normalizedPrompt="${promptNorm}"`,
      `normalizedReveal="${revealNorm}"`,
      `jaccard=${similarity.toFixed(3)} threshold=${threshold.toFixed(2)}`,
      `contains(prompt->reveal)=${promptContainsReveal} contains(reveal->prompt)=${revealContainsPrompt}`,
    ].join("\n")
  );
}

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

test("prompt text is meaningfully different from reveal copy for representative types", () => {
  const representativeCases = [
    { date: "2026-01-01", type: "ROOT" },
    { date: "2026-01-03", type: "SEMANTIC" },
    { date: "2026-01-07", type: "SUPPLETIVE" }, // sort-family
    { date: "2026-01-04", type: "COLLISION" }, // sort-family
    { date: "2026-01-15", type: "DECEPTION" }, // sort-family
    { date: "2026-01-11", type: "FALSE_FAMILY" }, // sort-family
    { date: "2026-01-02", type: "BORROWED" }, // sort-family
    { date: "2026-01-05", type: "TOPONYM" }, // sort-family
    { date: "2026-01-09", type: "IDIOM" }, // explicitly covered
  ];

  for (const sample of representativeCases) {
    const manifest = getPuzzleManifestEntry(sample.date);
    assert.ok(manifest, `missing manifest entry for ${sample.date}`);
    assert.equal(manifest.type, sample.type, `unexpected type for ${sample.date}`);

    const puzzle = generateDailyPuzzle(sample.date);
    assert.equal(puzzle.type, sample.type, `generated type drift for ${sample.date}`);
    assertPromptAndRevealDiverge(puzzle, manifest);
  }
});

test("eligible French collision rounds can emit deterministic counterpart prompts", () => {
  const date = "2026-01-04"; // COLLISION entryIdx 0 in manifest
  const first = generateDailyPuzzle(date);
  const second = generateDailyPuzzle(date);

  assert.equal(first.type, "COLLISION");
  assert.deepEqual(first, second, "same day output must remain deterministic");
  assert.ok(Array.isArray(first.counterpartPairs), "counterpartPairs payload should exist for eligible french doublets");
  assert.ok(first.counterpartPairs.length > 0, "counterpartPairs should be non-empty");
  assert.equal(first.prompt, "Given the French-descended form, provide the Latin-descended counterpart.");
  assert.equal(first.counterpartPairs[0].sourceLabel, "French-descended");
  assert.equal(first.counterpartPairs[0].targetLabel, "Latin-descended counterpart");

  for (const pair of first.counterpartPairs) {
    assert.equal(typeof pair.promptWord, "string");
    assert.ok(pair.promptWord.length > 0);
    assert.ok(Array.isArray(pair.expectedAnswers) && pair.expectedAnswers.length > 0);
    assert.equal(typeof pair.sourceLabel, "string");
    assert.equal(typeof pair.targetLabel, "string");
  }
});
