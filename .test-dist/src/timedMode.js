"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasTimedOut = exports.saveTimedModeSettings = exports.loadTimedModeSettings = exports.normalizeTimedModeSettings = exports.DEFAULT_TIME_LIMIT_SEC = exports.TIMED_MODE_STORAGE_KEY = void 0;
exports.TIMED_MODE_STORAGE_KEY = "derivative:timed-mode-settings";
exports.DEFAULT_TIME_LIMIT_SEC = 20;
const clampTimeLimit = (value) => {
    if (!Number.isFinite(value))
        return exports.DEFAULT_TIME_LIMIT_SEC;
    return Math.max(5, Math.min(180, Math.floor(value)));
};
const normalizeTimedModeSettings = (value) => ({
    timedMode: Boolean(value?.timedMode),
    timeLimitSec: clampTimeLimit(value?.timeLimitSec ?? exports.DEFAULT_TIME_LIMIT_SEC),
});
exports.normalizeTimedModeSettings = normalizeTimedModeSettings;
const loadTimedModeSettings = () => {
    try {
        const parsed = JSON.parse(localStorage.getItem(exports.TIMED_MODE_STORAGE_KEY) || "{}");
        return (0, exports.normalizeTimedModeSettings)(parsed);
    }
    catch {
        return (0, exports.normalizeTimedModeSettings)(undefined);
    }
};
exports.loadTimedModeSettings = loadTimedModeSettings;
const saveTimedModeSettings = (settings) => {
    try {
        localStorage.setItem(exports.TIMED_MODE_STORAGE_KEY, JSON.stringify((0, exports.normalizeTimedModeSettings)(settings)));
    }
    catch { }
};
exports.saveTimedModeSettings = saveTimedModeSettings;
const hasTimedOut = ({ timedMode, timeLimitSec, elapsedMs, }) => {
    if (!timedMode)
        return false;
    if (elapsedMs < 0)
        return false;
    return elapsedMs >= clampTimeLimit(timeLimitSec) * 1000;
};
exports.hasTimedOut = hasTimedOut;
