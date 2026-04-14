# Category Puzzle Prompt Style Rules

Use these rules when writing or revising category-puzzle prompts (`tension` text and category labels):

1. **Avoid direct etymon giveaways.**
   - Do not name the exact etymon/root in the prompt when it would collapse the puzzle to a single obvious answer.
   - Prefer framing with usage, context, or historical pressure instead of the root token itself.

2. **Do not leak the sort criterion in category names shown during play.**
   - Player-facing labels should stay neutral and non-diagnostic (e.g., `Group A`, `Group B`).
   - Every sort group should define `displayLabel` (in-play) and `solutionLabel` (post-reveal); do not rely on `label` for gameplay text.
   - Keep explicit classification language for reveal mode (`solutionLabel`) only.

3. **Avoid target-term echoing.**
   - Prompt wording should not repeat solution words verbatim.
   - Use paraphrase, context, or consequences rather than lifting target vocabulary directly.
