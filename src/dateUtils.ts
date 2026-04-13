const DATE_KEY_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

export const DAY_IN_MS = 86_400_000;

export function getUtcDateKey(now: Date = new Date()): string {
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseUtcDateKeyToMillis(dateKey: string): number | null {
  const match = DATE_KEY_RE.exec(dateKey);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const millis = Date.UTC(year, month - 1, day);
  const parsed = new Date(millis);

  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() + 1 !== month ||
    parsed.getUTCDate() !== day
  ) {
    return null;
  }

  return millis;
}
