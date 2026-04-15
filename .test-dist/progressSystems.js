"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hydrateProgressStore = exports.withDiscoveredSystem = exports.getDiscoveredSystems = exports.getSystemForPuzzleType = exports.DISCOVERED_SYSTEMS_KEY = void 0;
exports.DISCOVERED_SYSTEMS_KEY = "discoveredSystems";
const TYPE_TO_SYSTEM = {
    COLLISION: "Norse Intrusion Layer",
    BORROWED: "Latinate Prestige Layer",
    SUPPLETIVE: "Grammar Override Layer",
    SEMANTIC: "Semantic Drift Layer",
    FALSE_FAMILY: "False Cognate Traps",
};
const getSystemForPuzzleType = (type) => TYPE_TO_SYSTEM[type] ?? null;
exports.getSystemForPuzzleType = getSystemForPuzzleType;
const toStringList = (value) => {
    if (!Array.isArray(value))
        return [];
    const deduped = new Set();
    for (const item of value) {
        if (typeof item === "string" && item.trim())
            deduped.add(item);
    }
    return [...deduped];
};
const getDiscoveredSystems = (store) => toStringList(store[exports.DISCOVERED_SYSTEMS_KEY]);
exports.getDiscoveredSystems = getDiscoveredSystems;
const withDiscoveredSystem = (store, puzzleType) => {
    const system = (0, exports.getSystemForPuzzleType)(puzzleType);
    if (!system)
        return { nextStore: store, uncoveredSystem: null, wasAdded: false };
    const current = (0, exports.getDiscoveredSystems)(store);
    if (current.includes(system)) {
        return { nextStore: store, uncoveredSystem: system, wasAdded: false };
    }
    return {
        nextStore: { ...store, [exports.DISCOVERED_SYSTEMS_KEY]: [...current, system] },
        uncoveredSystem: system,
        wasAdded: true,
    };
};
exports.withDiscoveredSystem = withDiscoveredSystem;
const hydrateProgressStore = (store) => ({
    ...store,
    [exports.DISCOVERED_SYSTEMS_KEY]: (0, exports.getDiscoveredSystems)(store),
});
exports.hydrateProgressStore = hydrateProgressStore;
