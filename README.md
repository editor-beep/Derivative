# Derivative — Etymology English Game

## Overview
Derivative is a daily etymology puzzle built with React + TypeScript + Vite. The app renders one scheduled puzzle per day from a static manifest and synthesizes the final puzzle/reveal at runtime.

## Project Structure
- `App.tsx` — thin wrapper that renders the main game shell.
- `derivative.tsx` — main game shell (UI, archive navigation, local progress state, puzzle loading).
- `generator.ts` — daily puzzle orchestrator.
- `puzzleSynthesizer.ts` — converts an insight into a concrete puzzle payload.
- `revealEngine.ts` — builds the post-solve reveal panel from insight data.
- `src/data/puzzleManifest.ts` — static dated manifest used to select each day's puzzle indexes.
- `src/data/*` — content pools/build inputs (for example: `roots.ts`, `suppletiveParadigms.ts`, `meaningDrift.ts`, `norseCollisions.ts`, `folkEtymology.ts`, `loanwordExtraction.ts`, `toponyms.ts`).
- `src/main.tsx` — React entry point.
- `index.html` — HTML shell.

## How daily puzzle is generated
1. `getPuzzleManifestEntry(date)` (from `src/data/puzzleManifest.ts`) returns the scheduled manifest row for the date.
2. `generateInsight(seed, indexes)` (inside `generator.ts`) uses a seed plus `builderIdx`/`entryIdx`/`lensIdx` from the manifest row to produce a `LinguisticInsight`.
3. `synthesizePuzzle(insight, date)` turns the insight into the actual puzzle shape shown in-game.
4. `generateReveal(insight)` creates the explanatory reveal content attached to that puzzle.

In code, this flow is wired by `generateDailyPuzzle(date)` in `generator.ts`.

## Known constraints
- **Static manifest range:** puzzle lookup is bounded by `src/data/puzzleManifest.ts`; dates outside the generated manifest return `null` and cannot be played.
- **Local progress storage:** player progress is stored in browser `localStorage` (`STORAGE_KEY`), so progress is device/browser-local and can be cleared by the user.

## Commands
```bash
npm run dev
npm run build
npm run preview
```

These scripts are defined in `package.json`.
