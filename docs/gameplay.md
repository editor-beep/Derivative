# GAMEPLAY SYSTEM — DERIVATIVE

## CORE IDENTITY

This is NOT a quiz game.

This is a **pattern-detection engine about language evolution**.

The player is not recalling knowledge.
The player is **detecting hidden systems**.

---

## PRIMARY DESIGN PRINCIPLE

Replace static sorting with:

> DISCOVERY → RISK → FEEDBACK → REVELATION

Every interaction must support this loop.

---

## CORE GAME LOOP

1. Present 1–2 words at a time
2. Player makes a classification decision (binary or small set)
3. Immediate feedback is shown
4. System tracks streak + combo
5. After several interactions, player is prompted to infer the system
6. Final reveal explains the underlying linguistic mechanism

---

## INTERACTION MODEL

### REQUIRED
- Tap-to-assign (no drag-and-drop)
- Fast input (≤ 1 second per decision)
- Immediate feedback after each action

### FORBIDDEN
- Bulk sorting of entire word pools
- Delayed validation at end of puzzle
- Passive reading before interaction

---

## FEEDBACK SYSTEM

### On correct:
- Visual confirmation (flash, glow, or pulse)
- Increment streak
- Optional combo multiplier (speed-based)

### On incorrect:
- Immediate correction
- Reset streak
- Brief explanation (1 line max)

---

## STREAK SYSTEM

- Streak increases on consecutive correct answers
- Streak resets on incorrect answer
- Milestones at: 3, 5, 10

Optional:
- Visual escalation (intensity, color, sound)

---

## COMBO SYSTEM (OPTIONAL BUT RECOMMENDED)

- Reward fast correct answers
- Combo multiplier increases score/reward
- Combo decays if player hesitates

---

## PROGRESSIVE REVELATION

Do NOT show full dataset at once.

Instead:
- Reveal words sequentially
- Increase ambiguity gradually
- Allow player to build hypothesis

---

## HIDDEN SYSTEM MECHANIC

Each puzzle contains a hidden rule.

DO NOT reveal it upfront.

After 3–5 interactions, prompt:

> "What system are you detecting?"

Provide 2–4 options.

Player guesses:
- Correct → bonus reward
- Incorrect → continue play

---

## NARRATIVE FRAMING

Buckets must NOT be neutral.

They must express conflict, transformation, or hierarchy.

### Example:

Instead of:
- Norse forms
- Old English forms

Use:
- The Invaders (Norse)
- The Displaced (Old English)

---

## REVEAL PHASE

At puzzle completion:

1. Display a high-impact summary:
   Example:
   "You just watched English get colonized."

2. Show transformation:
   - sound shift
   - borrowing
   - semantic drift

3. Provide concise explanation:
   - max 2–3 sentences

---

## DIFFICULTY DESIGN

### EASY (Word Curious)
- Clear pattern
- Minimal ambiguity
- Strong feedback

### MEDIUM
- Introduce decoys
- Require 2–3 correct inferences

### HARD
- Include near-misses
- Require system-level reasoning

---

## DECOY SYSTEM

To prevent trivial solutions:

- Include visually similar but unrelated words
- Include partial matches
- Include misleading patterns

---

## POWER-UPS (OPTIONAL)

- Reveal origin (limited uses)
- Auto-place one word
- Hint system (directional, not explicit)

---

## PROGRESSION SYSTEM

Player builds a "linguistic map"

Track:
- Systems discovered
- Language families unlocked
- Puzzle types mastered

Unlocks:
- New puzzle categories
- Deeper linguistic layers

---

## PUZZLE TYPES (SUPPORTED)

- Borrowed Layer
- Collision (language contact)
- Suppletive systems
- PIE root systems
- False cognates
- Semantic drift
- Sound shifts

Each must follow the core loop.

---

## INPUT PERFORMANCE REQUIREMENT

- Interaction must feel instantaneous
- No delays between input and feedback
- Animations must not block input

---

## CONSTRAINTS (CRITICAL)

- DO NOT refactor unrelated systems
- DO NOT change data model unless required
- IMPLEMENT cheapest possible working version first
- Preserve existing visual style unless specified

---

## DEFINITION OF DONE

A puzzle is complete when:

- Words are presented progressively (not all at once)
- Player can assign via tap interaction
- Feedback is immediate per action
- Streak system is visible and functional
- Player is prompted to infer the system
- Final reveal explains the pattern clearly

---

## FAILURE CONDITION

If a player can solve a puzzle instantly without interaction,
the puzzle is invalid.

If a player is only sorting without forming a hypothesis,
the system has failed.

---

## SUCCESS CONDITION

The player should feel:

"I figured something out."

Not:

"I sorted things correctly."

---