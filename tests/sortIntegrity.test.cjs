const test = require("node:test");
const assert = require("node:assert/strict");
const { validateSortIntegrity } = require("../.test-dist/src/data/validators/sortIntegrity.js");

const {
  SUPPLETIVE_POOL,
} = require("../.test-dist/src/data/suppletivePool.js");
const { SEMANTIC_POOL } = require("../.test-dist/src/data/semanticPool.js");
const { COLLISION_POOL } = require("../.test-dist/src/data/collisionPool.js");
const { DECEPTION_POOL } = require("../.test-dist/src/data/deceptionPool.js");
const { FALSE_FAMILY_POOL } = require("../.test-dist/src/data/falseFamilyPool.js");
const { BORROWED_POOL } = require("../.test-dist/src/data/borrowedPool.js");
const { TOPONYM_POOL } = require("../.test-dist/src/data/toponymPool.js");

test("sort datasets only accept tokens present in the draggable pool", () => {
  const entries = [
    ...SUPPLETIVE_POOL,
    ...SEMANTIC_POOL,
    ...COLLISION_POOL,
    ...DECEPTION_POOL,
    ...FALSE_FAMILY_POOL,
    ...BORROWED_POOL,
    ...TOPONYM_POOL,
  ];

  const sortEntries = entries.filter(
    (entry) => Array.isArray(entry?.groups) && Array.isArray(entry?.pool),
  );

  const issues = validateSortIntegrity(sortEntries);
  assert.deepEqual(
    issues,
    [],
    `sort integrity violations:\n${issues
      .map((issue) => `- ${issue.entryLabel}: ${issue.message}`)
      .join("\n")}`,
  );
});
