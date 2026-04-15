"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pick = pick;
exports.pickAt = pickAt;
exports.buildSortCopy = buildSortCopy;
function pick(arr, r) {
    const item = arr[Math.floor(r() * arr.length)];
    if (item === undefined) {
        throw new Error("Attempted to pick from an empty array.");
    }
    return item;
}
function pickAt(arr, r, idx) {
    if (idx === undefined)
        return pick(arr, r);
    const item = arr[idx % arr.length];
    if (item === undefined) {
        throw new Error("Attempted to pickAt from an empty array.");
    }
    return item;
}
function buildSortCopy(d) {
    const prompt = d.questionPrompt ?? `Sort the words by hidden lineage: ${d.root}.`;
    const revealBody = d.revealBody ?? d.tension;
    return {
        questionPrompt: prompt,
        revealBody,
        revealHeadline: d.revealHeadline,
    };
}
