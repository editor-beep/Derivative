const test = require("node:test");
const assert = require("node:assert/strict");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { RevealSection } = require("../.test-dist/derivative.js");

const makePuzzle = () => ({
  type: "ROOT",
  meta: { claim: "*bher- 'to carry'" },
  reveal: {
    headline: "Sample reveal",
    body: "Sample body.",
    connections: [["bear", "from PIE root"]],
  },
});

test("claim stays hidden before reveal and appears after reveal", () => {
  const hiddenHtml = renderToStaticMarkup(
    React.createElement(RevealSection, {
      puzzle: makePuzzle(),
      visible: false,
      onShare: () => {},
    }),
  );
  assert.equal(hiddenHtml, "");
  assert.equal(hiddenHtml.includes("*bher- 'to carry'"), false);

  const visibleHtml = renderToStaticMarkup(
    React.createElement(RevealSection, {
      puzzle: makePuzzle(),
      visible: true,
      onShare: () => {},
    }),
  );
  assert.equal(visibleHtml.includes("bher-"), true);
});
