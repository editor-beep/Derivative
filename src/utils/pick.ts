import type { SortPoolEntry } from "../types";

export function pick<T>(arr: T[], r: () => number): T {
  const item = arr[Math.floor(r() * arr.length)];
  if (item === undefined) {
    throw new Error("Attempted to pick from an empty array.");
  }
  return item;
}

export function pickAt<T>(arr: T[], r: () => number, idx?: number): T {
  if (idx === undefined) return pick(arr, r);
  const item = arr[idx % arr.length];
  if (item === undefined) {
    throw new Error("Attempted to pickAt from an empty array.");
  }
  return item;
}

export function buildSortCopy(d: SortPoolEntry): {
  questionPrompt: string;
  revealBody: string;
  revealHeadline?: string;
} {
  const prompt =
    d.questionPrompt ?? `Sort the words by hidden lineage: ${d.root}.`;
  const revealBody = d.revealBody ?? d.tension;
  return {
    questionPrompt: prompt,
    revealBody,
    revealHeadline: d.revealHeadline,
  };
}
