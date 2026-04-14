const test = require("node:test");
const assert = require("node:assert/strict");
const { generateReveal } = require("../.test-dist/revealEngine.js");

function sentenceCount(text) {
  const matches = text.match(/[^.!?]+[.!?]/g) || [];
  return matches.length;
}

test("idiom reveal keeps existing connections and emits 3 rhetorical roles", () => {
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

  const reveal = generateReveal(insight);

  assert.equal(reveal.headline, "headline");
  assert.deepEqual(reveal.connections, [
    ["nothing new under the sun", "Hebrew Bible"],
    ["nothing", "Ecclesiastical Latin"],
    ["A long-standing frame about repeating hi…", "fossilized ideology"],
  ]);
  assert.equal(sentenceCount(reveal.body), 3);
  assert.match(reveal.body, /^.+\. You .+\. That matters because .+\.$/);
});

test("borrowed reveal body stays to three sentences", () => {
  const insight = {
    id: "borrowed-1",
    type: "BORROWED",
    root: "port",
    language: "English",
    words: ["port", "import", "transport", "passport"],
    tension: "Related words arrived through different waves of borrowing.",
    data: {
      groups: [],
      pool: [],
      revealHeadline: "BORROWED — port",
      revealBody: "Related words arrived through different waves of borrowing.",
      falseSystem: {
        decoys: ["airport"],
        breakMessage: "Pattern break",
        revealTruth: "Latin transit system",
      },
    },
  };

  const reveal = generateReveal(insight);
  assert.equal(sentenceCount(reveal.body), 3);
  assert.match(reveal.body, /^.+\. You .+\. That matters because .+\.$/);
  assert.match(reveal.body, /Latin transit system/);
});
