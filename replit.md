# Derivative — Etymology English Game

## Overview
A daily etymology-based word puzzle game built with React + TypeScript + Vite. Players explore the history of English words, their roots (Latin, Proto-Indo-European, etc.), and linguistic shifts like Grimm's Law.

## Project Structure
- `src/App.tsx` — Main application component (the entire game logic and UI)
- `src/main.tsx` — React entry point
- `index.html` — HTML shell
- `vite.config.ts` — Vite configuration (port 5000, host 0.0.0.0)
- `public/` — Static assets (splash screen background image)

## Tech Stack
- **Framework:** React 19
- **Language:** TypeScript
- **Build Tool:** Vite 8
- **Package Manager:** npm

## Running the App
```bash
npm run dev
```
Runs the dev server at http://0.0.0.0:5000

## Building for Production
```bash
npm run build
```
Outputs static files to `dist/`

## Game Features
- **ROOT puzzles** — Find all words sharing a Latin/Greek root
- **SUPPLETIVE puzzles** — Sort words by their true etymological origin (e.g., "go" vs "went")
- **GRIMM puzzles** — Type the English equivalent of Latin words shifted by Grimm's Law
- **SEMANTIC puzzles** — Fill in the meaning of a word at different historical eras
- **COLLISION puzzles** — Sort Old Norse vs Old English words
- **PIE puzzles** — Sort words by their Proto-Indo-European root

## Puzzle Data
All puzzle data is inlined in `src/App.tsx` as a `PUZZLES` array (January 2026 archive). Each puzzle is identified by date.

## Deployment
Configured as a static site deployment:
- Build command: `npm run build`
- Public directory: `dist`
