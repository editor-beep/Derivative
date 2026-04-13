const test = require("node:test");
const assert = require("node:assert/strict");
const { synthesizePuzzle } = require("../.test-dist/puzzleSynthesizer.js");

function baseInsight(type) {
  return {
    id: `test-${type}`,
    type,
    root: "root",
    language: "Latin",
    meaning: "meaning",
    words: ["alpha", "beta", "gamma"],
    tension: `${type} tension`,
    data: {},
  };
}

test("schema assertions enforce required shape per puzzle type", () => {
  assert.equal(
    synthesizePuzzle({ ...baseInsight("ROOT"), data: { targets: ["a"], required: ["a"] } }, "2026-01-01").type,
    "ROOT",
  );
  assert.equal(
    synthesizePuzzle(
      { ...baseInsight("SEMANTIC"), data: { timeline: [{ era: "old", meaning: "x" }], word: "nice" } },
      "2026-01-02",
    ).type,
    "SEMANTIC",
  );
  assert.equal(
    synthesizePuzzle(
      { ...baseInsight("IDIOM"), data: { phrase: "time is money", origin: "Franklin" } },
      "2026-01-03",
    ).type,
    "IDIOM",
  );
  assert.equal(
    synthesizePuzzle(
      { ...baseInsight("DECEPTION"), data: { groups: [{ id: "g1", accepts: ["x"], related: [] }], pool: ["x"] } },
      "2026-01-04",
    ).type,
    "DECEPTION",
  );

  assert.throws(
    () => synthesizePuzzle({ ...baseInsight("SEMANTIC"), data: { timeline: [], word: "x" } }, "2026-01-05"),
    /Invalid SEMANTIC puzzle shape/,
  );
  assert.throws(
    () => synthesizePuzzle({ ...baseInsight("IDIOM"), data: { phrase: "", origin: "" } }, "2026-01-06"),
    /Invalid IDIOM puzzle shape/,
  );
  assert.throws(
    () => synthesizePuzzle({ ...baseInsight("DECEPTION"), data: { groups: [], pool: [] } }, "2026-01-07"),
    /Invalid DECEPTION puzzle shape/,
  );
});
