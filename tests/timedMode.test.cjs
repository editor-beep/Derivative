const test = require("node:test");
const assert = require("node:assert/strict");
const { hasTimedOut } = require("../.test-dist/src/timedMode.js");

test("hasTimedOut stays false when timed mode is disabled", () => {
  assert.equal(
    hasTimedOut({ timedMode: false, timeLimitSec: 10, elapsedMs: 30_000 }),
    false
  );
});

test("hasTimedOut becomes true once elapsed reaches configured limit", () => {
  assert.equal(
    hasTimedOut({ timedMode: true, timeLimitSec: 12, elapsedMs: 11_999 }),
    false
  );
  assert.equal(
    hasTimedOut({ timedMode: true, timeLimitSec: 12, elapsedMs: 12_000 }),
    true
  );
});
