export const TIMED_MODE_STORAGE_KEY = "derivative:timed-mode-settings";
export const DEFAULT_TIME_LIMIT_SEC = 20;

export interface TimedModeSettings {
  timedMode: boolean;
  timeLimitSec: number;
}

const clampTimeLimit = (value: number): number => {
  if (!Number.isFinite(value)) return DEFAULT_TIME_LIMIT_SEC;
  return Math.max(5, Math.min(180, Math.floor(value)));
};

export const normalizeTimedModeSettings = (
  value: Partial<TimedModeSettings> | null | undefined
): TimedModeSettings => ({
  timedMode: Boolean(value?.timedMode),
  timeLimitSec: clampTimeLimit(value?.timeLimitSec ?? DEFAULT_TIME_LIMIT_SEC),
});

export const loadTimedModeSettings = (): TimedModeSettings => {
  try {
    const parsed = JSON.parse(localStorage.getItem(TIMED_MODE_STORAGE_KEY) || "{}") as Partial<TimedModeSettings>;
    return normalizeTimedModeSettings(parsed);
  } catch {
    return normalizeTimedModeSettings(undefined);
  }
};

export const saveTimedModeSettings = (settings: TimedModeSettings): void => {
  try {
    localStorage.setItem(TIMED_MODE_STORAGE_KEY, JSON.stringify(normalizeTimedModeSettings(settings)));
  } catch {}
};

export const hasTimedOut = ({
  timedMode,
  timeLimitSec,
  elapsedMs,
}: {
  timedMode: boolean;
  timeLimitSec: number;
  elapsedMs: number;
}): boolean => {
  if (!timedMode) return false;
  if (elapsedMs < 0) return false;
  return elapsedMs >= clampTimeLimit(timeLimitSec) * 1000;
};
