const test = require('node:test');
const assert = require('node:assert/strict');
const { isCounterpartAnswerMatch } = require('../.test-dist/src/counterpartValidation.js');

test('counterpart validation accepts canonical and variant answers', () => {
  assert.equal(isCounterpartAnswerMatch('secure', ['secure', 'securely']), true);
  assert.equal(isCounterpartAnswerMatch('Secure', ['secure']), true);
  assert.equal(isCounterpartAnswerMatch('sure', ['secure', 'securely']), false);
});

test('counterpart validation normalizes punctuation and spacing', () => {
  assert.equal(isCounterpartAnswerMatch('cap-tain', ['captain']), true);
  assert.equal(isCounterpartAnswerMatch('  captain  ', ['captain']), true);
});
