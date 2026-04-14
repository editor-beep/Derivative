const test = require("node:test");
const assert = require("node:assert/strict");
const {
  getDiscoveredSystems,
  hydrateProgressStore,
  withDiscoveredSystem,
} = require("../.test-dist/progressSystems.js");

test("withDiscoveredSystem dedupes already discovered systems", () => {
  const initial = {
    discoveredSystems: ["Norse Intrusion Layer", "Norse Intrusion Layer"],
  };

  const once = withDiscoveredSystem(initial, "COLLISION");
  assert.equal(once.wasAdded, false);
  assert.deepEqual(getDiscoveredSystems(once.nextStore), ["Norse Intrusion Layer"]);

  const second = withDiscoveredSystem(once.nextStore, "COLLISION");
  assert.equal(second.wasAdded, false);
  assert.deepEqual(getDiscoveredSystems(second.nextStore), ["Norse Intrusion Layer"]);
});

test("discovered systems persist through JSON round-trip and hydrate", () => {
  const store = {
    "2026-04-14": { revealed: true, state: { found: ["word"] } },
  };

  const updated = withDiscoveredSystem(store, "SUPPLETIVE").nextStore;
  const serialized = JSON.stringify(updated);
  const parsed = JSON.parse(serialized);
  const hydrated = hydrateProgressStore(parsed);

  assert.deepEqual(getDiscoveredSystems(hydrated), ["Grammar Override Layer"]);
  assert.equal(hydrated["2026-04-14"].revealed, true);
  assert.deepEqual(hydrated["2026-04-14"].state.found, ["word"]);
});
