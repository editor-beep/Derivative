# `derivative.tsx` Refactor Plan (Behavior-Preserving)

## Goals

- Split `derivative.tsx` into focused modules while preserving runtime behavior and puzzle outcomes.
- Keep `derivative.tsx` as a composition root only (target: under 300 lines).
- Separate stateful logic from presentational rendering.
- Establish clear ownership boundaries for future changes.

## Non-goals

- No gameplay rule changes.
- No style refresh/redesign.
- No schema changes to persisted user progress.
- No feature additions.

## Proposed Target Structure

```txt
src/
  features/
    game/
      useDailyPuzzle.ts
      usePuzzleProgress.ts
      usePuzzleActions.ts
  components/
    game/
      ArchiveCalendarPanel.tsx
      PuzzleBody.tsx
      RevealPanel.tsx
      DifficultyBadge.tsx
      styles.ts
      icons.tsx
```

## Module Boundaries

### 1) `useDailyPuzzle.ts` (date + puzzle selection)
**Responsibilities**
- Resolve current/selected date (`today`, archive day selection, month navigation helpers).
- Fetch/generate puzzle by date (including cache + manifest lookup/fallback).
- Expose `puzzle`, `date`, `setDate`, `monthDates`, and loading/error flags.

**Inputs**
- Manifest source and cache strategy.
- Puzzle generator/fetch function.

**Outputs**
- Current puzzle for selected date and date control actions.

**Must preserve**
- Existing date string format (`YYYY-MM-DD`).
- Existing cache semantics and fallback behavior for missing/invalid dates.

### 2) `usePuzzleProgress.ts` (persistent state)
**Responsibilities**
- Load/save puzzle progress from local storage.
- Provide per-date progress record and update helpers.
- Track completion metadata (completed, revealed, timestamps, etc. as currently stored).

**Inputs**
- `STORAGE_KEY` and selected `date`.

**Outputs**
- `progress`, `setProgressPatch`, `isCompleted`, completion metadata.

**Must preserve**
- Existing local-storage payload shape.
- Existing read/write error tolerance (silent recover-on-parse-failure behavior).

### 3) `usePuzzleActions.ts` (state transitions)
**Responsibilities**
- Handle answer submission and validation outcomes.
- Apply reveal transitions and lock/unlock behavior.
- Centralize puzzle-type action handlers currently in `derivative.tsx`.

**Inputs**
- `puzzle`, `progress`, and progress write helpers.

**Outputs**
- `actions` API used by UI components (`submitAnswer`, `revealHint`, `revealAll`, etc.).

**Must preserve**
- Current correctness checks and reveal progression order.
- Existing side effects for completion tracking.

## Presentational Component Extraction

### `ArchiveCalendarPanel.tsx`
- Renders archive month/day controls and date selection UI only.
- Receives all state through props; no storage or puzzle mutation logic.

### `PuzzleBody.tsx`
- Delegates rendering by puzzle type.
- Receives puzzle data + callbacks (`onSubmit`, `onSelect`, etc.).
- Contains no persistence concerns.

### `RevealPanel.tsx`
- Displays reveal controls and reveal state.
- Calls action callbacks supplied by hooks.

### `DifficultyBadge.tsx`
- Renders difficulty metadata presentation only.
- Inputs: difficulty level + label/color metadata.

### `styles.ts`
- Move inline style object `S` here as exported constants.
- Keep token references (`COLORS`, etc.) unchanged.

### `icons.tsx`
- Move icon components out of root file.
- Export icon map/components used by puzzle-type headers/cards.

## `derivative.tsx` End State (thin composition root)

`derivative.tsx` should only:
1. Initialize top-level selected date + route-level concerns.
2. Call hooks:
   - `useDailyPuzzle`
   - `usePuzzleProgress`
   - `usePuzzleActions`
3. Compose presentational sections:
   - archive/calendar
   - puzzle body
   - reveal + difficulty UI
4. Pass data/actions via explicit props.

No puzzle-type branching logic should remain here beyond simple composition decisions.

## Execution Plan (Incremental, Low-Risk)

### Phase 1 — Safety Net
- Snapshot current behavior with manual verification checklist per puzzle type.
- Record local-storage examples before refactor.

### Phase 2 — Pure Extractions First
1. Move `S` to `src/components/game/styles.ts`.
2. Move icon components to `src/components/game/icons.tsx`.
3. Update imports in `derivative.tsx` only.

### Phase 3 — Extract Presentational Components
1. Extract `DifficultyBadge`.
2. Extract `RevealPanel`.
3. Extract archive/calendar section.
4. Extract puzzle body renderer by type.

Keep existing state/actions in `derivative.tsx` during this phase to avoid logic drift.

### Phase 4 — Hook Extraction
1. Extract date/puzzle retrieval into `useDailyPuzzle`.
2. Extract persistence and completion tracking into `usePuzzleProgress`.
3. Extract action transitions into `usePuzzleActions`.

After each extraction, run parity checks.

### Phase 5 — Slim Root + Cleanup
- Remove dead helpers from `derivative.tsx`.
- Enforce root-size target (<300 lines).
- Normalize prop types and colocate shared interfaces if needed.

## Verification Checklist (Behavior Parity)

- Same puzzle shown for same date.
- Archive date navigation unchanged.
- Same answer correctness outcomes for each puzzle type.
- Reveal progression unchanged.
- Completion state persists across reloads exactly as before.
- No regressions in difficulty badge and reveal UI visibility logic.

## Ownership Guide

- `src/features/game/*`: gameplay state logic and transitions (stateful/domain ownership).
- `src/components/game/*`: rendering and UI presentation (stateless/display ownership).
- `derivative.tsx`: composition/orchestration only (integration ownership).

## Risks & Mitigations

- **Risk:** subtle local-storage schema drift.
  - **Mitigation:** keep serialization helpers in `usePuzzleProgress` and add temporary shape assertions while migrating.
- **Risk:** puzzle-type renderer prop mismatch.
  - **Mitigation:** introduce explicit prop interfaces and convert one puzzle type at a time.
- **Risk:** accidental behavior changes during action extraction.
  - **Mitigation:** move existing logic with minimal edits first, then cleanup in follow-up pass.
