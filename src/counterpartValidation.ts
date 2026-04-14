export function normalizeCounterpartAnswer(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[\p{P}\p{S}]+/gu, "")
    .replace(/\s+/g, " ");
}

export function isCounterpartAnswerMatch(input: string, expectedAnswers: string[]): boolean {
  const normalizedInput = normalizeCounterpartAnswer(input);
  if (!normalizedInput) return false;
  return expectedAnswers.some((expected) => normalizeCounterpartAnswer(expected) === normalizedInput);
}
