const test = require("node:test");
const assert = require("node:assert/strict");
const {
  getUtcDateKey,
  parseUtcDateKeyToMillis,
} = require("../.test-dist/src/dateUtils.js");

test("getUtcDateKey rolls over exactly at UTC midnight", () => {
  assert.equal(getUtcDateKey(new Date("2026-04-13T23:59:59.999Z")), "2026-04-13");
  assert.equal(getUtcDateKey(new Date("2026-04-14T00:00:00.000Z")), "2026-04-14");
});

test("getUtcDateKey uses UTC policy regardless of local offset", () => {
  assert.equal(getUtcDateKey(new Date("2026-04-13T23:30:00-05:00")), "2026-04-14");
  assert.equal(getUtcDateKey(new Date("2026-04-14T00:30:00+05:00")), "2026-04-13");
});

test("parseUtcDateKeyToMillis rejects invalid calendar dates", () => {
  assert.equal(parseUtcDateKeyToMillis("2026-02-30"), null);
  assert.equal(parseUtcDateKeyToMillis("2026-2-03"), null);
});
