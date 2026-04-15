"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAY_IN_MS = void 0;
exports.getUtcDateKey = getUtcDateKey;
exports.parseUtcDateKeyToMillis = parseUtcDateKeyToMillis;
const DATE_KEY_RE = /^(\d{4})-(\d{2})-(\d{2})$/;
exports.DAY_IN_MS = 86400000;
function getUtcDateKey(now = new Date()) {
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, "0");
    const day = String(now.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}
function parseUtcDateKeyToMillis(dateKey) {
    const match = DATE_KEY_RE.exec(dateKey);
    if (!match)
        return null;
    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const millis = Date.UTC(year, month - 1, day);
    const parsed = new Date(millis);
    if (parsed.getUTCFullYear() !== year ||
        parsed.getUTCMonth() + 1 !== month ||
        parsed.getUTCDate() !== day) {
        return null;
    }
    return millis;
}
