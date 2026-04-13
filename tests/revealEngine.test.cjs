const test = require("node:test");
const assert = require("node:assert/strict");
const { generateReveal } = require("../.test-dist/revealEngine.js");

test("idiom reveal contract remains stable", () => {
  const insight = {
    id: "idiom-1",
    type: "IDIOM",
    root: "sun",
    language: "Ecclesiastical Latin",
    meaning: "cyclical time",
    words: ["nothing", "new", "under", "sun"],
    tension: "A long-standing frame about repeating history.",
    data: {
      phrase: "nothing new under the sun",
      origin: "Hebrew Bible",
      revealHeadline: "headline",
      revealBody: "body",
    },
  };

  assert.deepEqual(generateReveal(insight), {
    headline: "headline",
    body: "body",
    connections: [
      ["nothing new under the sun", "Hebrew Bible"],
      ["nothing", "Ecclesiastical Latin"],
      ["A long-standing frame about repeating hi…", "fossilized ideology"],
    ],
    lensNote: undefined,
  });
});
