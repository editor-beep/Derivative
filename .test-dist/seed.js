"use strict";
// seed.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashString = hashString;
exports.mulberry32 = mulberry32;
function hashString(str) {
    let h = 1779033703;
    for (let i = 0; i < str.length; i++) {
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    }
    return h >>> 0;
}
function mulberry32(a) {
    return function () {
        let t = (a += 0x6D2B79F5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}
