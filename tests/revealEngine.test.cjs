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
  assert.match(reveal.body, /^.+\. You .+\. .+\.$/);
});

test("borrowed reveal body uses three-sentence explicit structure", () => {
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
  assert.match(reveal.body, /^.+\. You .+\. .+\.$/);
  assert.match(reveal.body, /Latin transit system/);
});

// ── ROOT reveal variety engine tests ─────────────────────────────────────────

const ROOT_HEADLINE_SUFFIXES = ["", " (stolen)", " (they never wanted you to see this)", " (the gatekeepers are furious)"];

function makeRootInsight(root, language) {
  return {
    id: `root-${root}`,
    type: "ROOT",
    root,
    language,
    meaning: "test meaning",
    words: ["word1", "word2", "word3", "word4"],
    tension: "The hidden machinery of power was baked into this root from the start",
    data: {
      targets: ["word1", "word2"],
      required: ["word1"],
    },
  };
}

test("ROOT reveal headline uses one of the 4 flavor suffixes", () => {
  const insight = makeRootInsight("act", "Latin");
  const reveal = generateReveal(insight);
  const validHeadlines = ROOT_HEADLINE_SUFFIXES.map(s => `ACT — Latin${s}`);
  assert.ok(validHeadlines.includes(reveal.headline), `Unexpected headline: ${reveal.headline}`);
});

test("ROOT reveal body emits exactly 3 sentences", () => {
  const insight = makeRootInsight("act", "Latin");
  const reveal = generateReveal(insight);
  assert.equal(sentenceCount(reveal.body), 3);
});

test("ROOT reveal body matches the rhetorical structure", () => {
  const insight = makeRootInsight("act", "Latin");
  const reveal = generateReveal(insight);
  assert.match(reveal.body, /^.+\. You .+\. .+\.$/);
});

test("ROOT reveal body first sentence comes from tension", () => {
  const insight = makeRootInsight("act", "Latin");
  const reveal = generateReveal(insight);
  assert.match(reveal.body, /The hidden machinery of power/);
});

test("ROOT reveal connections show deduplicated answer keys with required/related labels", () => {
  const insight = {
    ...makeRootInsight("junct", "Latin"),
    words: ["junction", "conjunction", "injunction", "adjunct", "subjugate", "conjugate"],
    data: {
      targets: ["junction", "conjunction", "injunction", "adjunct", "subjugate", "conjugate", "conjunction"],
      required: ["junction", "conjunction", "injunction", "adjunct", "subjugate"],
    },
  };
  const reveal = generateReveal(insight);
  assert.deepEqual(reveal.connections.slice(0, 6), [
    ["junction", "required"],
    ["conjunction", "required"],
    ["injunction", "required"],
    ["adjunct", "required"],
    ["subjugate", "required"],
    ["conjugate", "related"],
  ]);
});

test("ROOT reveal playerDid sentence uses spicy variety language", () => {
  const insight = makeRootInsight("act", "Latin");
  const reveal = generateReveal(insight);
  const spicyVerbs = ["weaponized", "ripped", "hijacked", "exposed", "forged", "detonated", "cracked", "ran"];
  const hasSpicy = spicyVerbs.some(v => reveal.body.includes(v));
  assert.ok(hasSpicy, `Expected a spicy playerDid verb in: ${reveal.body}`);
});

test("ROOT reveal final sentence states a power claim", () => {
  const insight = makeRootInsight("act", "Latin");
  const reveal = generateReveal(insight);
  const matterKeywords = ["That matters because", "buried", "machinery", "gatekeepers", "empire", "priesthood", "control grid", "obediently", "wall they built", "Conquest"];
  const hasClaim = matterKeywords.some(k => reveal.body.includes(k));
  assert.ok(hasClaim, `Expected a matters-power line in: ${reveal.body}`);
});

test("ROOT reveal is deterministic — same root always gives same result", () => {
  const insight = makeRootInsight("struct", "Latin");
  const first = generateReveal(insight);
  const second = generateReveal(insight);
  assert.equal(first.headline, second.headline);
  assert.equal(first.body, second.body);
});

test("ROOT reveals differ across different roots", () => {
  const roots = ["act", "bell", "cap", "dict", "fer", "gen", "ject", "lect"];
  const reveals = roots.map(r => generateReveal(makeRootInsight(r, "Latin")));
  const headlines = new Set(reveals.map(r => r.headline));
  assert.ok(headlines.size > 1, "Expected different roots to produce different headline variants");
});
