import type { ProgressStore, PuzzleType } from "./types";

export const DISCOVERED_SYSTEMS_KEY = "discoveredSystems" as const;

const TYPE_TO_SYSTEM: Partial<Record<PuzzleType, string>> = {
  COLLISION: "Norse Intrusion Layer",
  BORROWED: "Latinate Prestige Layer",
  SUPPLETIVE: "Grammar Override Layer",
  SEMANTIC: "Semantic Drift Layer",
  FALSE_FAMILY: "False Cognate Traps",
};

export const getSystemForPuzzleType = (type: PuzzleType): string | null => TYPE_TO_SYSTEM[type] ?? null;

const toStringList = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  const deduped = new Set<string>();
  for (const item of value) {
    if (typeof item === "string" && item.trim()) deduped.add(item);
  }
  return [...deduped];
};

export const getDiscoveredSystems = (store: ProgressStore): string[] => toStringList(store[DISCOVERED_SYSTEMS_KEY]);

export const withDiscoveredSystem = (
  store: ProgressStore,
  puzzleType: PuzzleType
): { nextStore: ProgressStore; uncoveredSystem: string | null; wasAdded: boolean } => {
  const system = getSystemForPuzzleType(puzzleType);
  if (!system) return { nextStore: store, uncoveredSystem: null, wasAdded: false };

  const current = getDiscoveredSystems(store);
  if (current.includes(system)) {
    return { nextStore: store, uncoveredSystem: system, wasAdded: false };
  }

  return {
    nextStore: { ...store, [DISCOVERED_SYSTEMS_KEY]: [...current, system] },
    uncoveredSystem: system,
    wasAdded: true,
  };
};

export const hydrateProgressStore = (store: ProgressStore): ProgressStore => ({
  ...store,
  [DISCOVERED_SYSTEMS_KEY]: getDiscoveredSystems(store),
});
