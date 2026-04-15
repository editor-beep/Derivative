const test = require("node:test");
const assert = require("node:assert/strict");
const { getDayOfWeekDifficulty, DIFFICULTY_SCHEDULE } = require("../.test-dist/difficulty.js");

// Reference calendar (2026-01-01 is a Thursday):
//   2026-01-01 Thu, 2026-01-02 Fri, 2026-01-03 Sat
//   2026-01-04 Sun, 2026-01-05 Mon, 2026-01-06 Tue
//   2026-01-07 Wed

test("Monday returns [EASY]", () => {
  assert.deepEqual(getDayOfWeekDifficulty("2026-01-05"), ["EASY"]);
});

test("Tuesday returns [EASY]", () => {
  assert.deepEqual(getDayOfWeekDifficulty("2026-01-06"), ["EASY"]);
});

test("Wednesday returns [EASY, MEDIUM]", () => {
  assert.deepEqual(getDayOfWeekDifficulty("2026-01-07"), ["EASY", "MEDIUM"]);
});

test("Thursday returns [MEDIUM]", () => {
  assert.deepEqual(getDayOfWeekDifficulty("2026-01-01"), ["MEDIUM"]);
});

test("Friday returns [MEDIUM, HARD]", () => {
  assert.deepEqual(getDayOfWeekDifficulty("2026-01-02"), ["MEDIUM", "HARD"]);
});

test("Saturday returns [MEDIUM, HARD]", () => {
  assert.deepEqual(getDayOfWeekDifficulty("2026-01-03"), ["MEDIUM", "HARD"]);
});

test("Sunday returns [VERY_HARD]", () => {
  assert.deepEqual(getDayOfWeekDifficulty("2026-01-04"), ["VERY_HARD"]);
});

test("DIFFICULTY_SCHEDULE covers all 7 days", () => {
  for (let d = 0; d <= 6; d++) {
    assert.ok(Array.isArray(DIFFICULTY_SCHEDULE[d]), `day ${d} must have an entry`);
    assert.ok(DIFFICULTY_SCHEDULE[d].length > 0, `day ${d} must have at least one level`);
  }
});
