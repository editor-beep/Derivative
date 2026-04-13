# Derivative — Etymology English Game

## Overview
A daily etymology puzzle game built with React + TypeScript + Vite. The runtime puzzle pipeline selects a manifest entry for a date, synthesizes the puzzle, and generates reveal content.

## Project Structure
- `App.tsx` — wrapper component that mounts the game shell.
- `derivative.tsx` — main game shell and interaction flow.
- `generator.ts` — daily puzzle generation pipeline coordinator.
- `puzzleSynthesizer.ts` — insight → puzzle conversion.
- `revealEngine.ts` — insight → reveal conversion.
- `src/data/puzzleManifest.ts` — static manifest schedule.
- `src/data/*` pools — source datasets (e.g. `roots.ts`, `meaningDrift.ts`, `suppletiveParadigms.ts`, `norseCollisions.ts`, `folkEtymology.ts`, `loanwordExtraction.ts`, `toponyms.ts`).
  - **`src/data/roots.ts`** is the single source of truth for ROOT puzzle entries (182 entries after merge). It exports `ROOT_POOL` through a dedup-by-(root+lang) and sort-by-(lang, root) pipeline. The now-deleted `rootsExtended.ts` and `rootsExtended2.ts` have been fully merged in; do not recreate them.
  - **`src/data/academicRootTable.ts`** exports `ACADEMIC_ROOT_TABLE` — a separate reference table with schema (`lemma`, `language`, `coreMeaning`, `morphologyOrigin`, `eraInEnglish`, `usageNote`). This is NOT puzzle data and must NOT be merged into `ROOT_POOL`.
- `src/main.tsx` — React entry point.

## How daily puzzle is generated
`getPuzzleManifestEntry(date)` → `generateInsight(seed, indexes)` → `synthesizePuzzle` → `generateReveal`

Detailed flow:
1. Lookup date row in `src/data/puzzleManifest.ts`.
2. Hash a deterministic seed and call `generateInsight` with manifest indexes.
3. Call `synthesizePuzzle` to create the playable puzzle object.
4. Call `generateReveal` to attach reveal text/connections.

## Known constraints
- **Static manifest range:** playable dates are limited to the dates compiled into `src/data/puzzleManifest.ts`.
- **Local-only progress:** progress is saved to browser `localStorage` via `STORAGE_KEY`, not synced to a backend.

## Run commands
```bash
npm run dev
npm run build
npm run preview
```
