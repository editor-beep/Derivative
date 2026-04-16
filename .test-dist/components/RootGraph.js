"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RootGraph;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const prefixMap_1 = require("../lib/prefixMap");
/* ── MORPHOLOGY PARSERS ──────────────────────────────────── */
function getPrefix(word, root) {
    const idx = word.indexOf(root);
    if (idx <= 0)
        return null;
    return word.slice(0, idx);
}
function getSuffix(word, root) {
    const idx = word.indexOf(root);
    if (idx < 0)
        return null;
    const after = word.slice(idx + root.length);
    return after || null;
}
/** Returns a hint label showing the morphological wrapper around the root,
 *  with the root itself masked as dots. Examples:
 *    "react"    (root "act") → "re-···"
 *    "action"   (root "act") → "···-ion"
 *    "reactive" (root "act") → "re-···-ive"
 *    "act"      (root "act") → "···"  (word is the root itself)
 *  Falls back to trying each alternate form in `forms` when the root doesn't
 *  appear literally (e.g. "decide" with root "caed" → found via form "cid").
 */
function buildHintLabel(word, root, forms) {
    // Try the primary root first
    const candidates = [root, ...(forms ?? [])];
    for (const candidate of candidates) {
        if (word.indexOf(candidate) < 0)
            continue;
        const prefix = getPrefix(word, candidate) ?? "";
        const suffix = getSuffix(word, candidate) ?? "";
        const rootMask = "·".repeat(candidate.length);
        if (prefix && suffix)
            return `${prefix}-${rootMask}-${suffix}`;
        if (prefix)
            return `${prefix}-${rootMask}`;
        if (suffix)
            return `${rootMask}-${suffix}`;
        return rootMask;
    }
    return "·".repeat(Math.min(word.length, 7));
}
/* ── ORBIT COLLISION DETECTION ───────────────────────────────── */
const CHAR_WIDTH_PX = 5;
const MIN_NODE_GAP = 6;
const MIN_ORBIT_RADIUS = 110;
const MAX_ORBIT_RADIUS = 145;
const NODE_RADIUS = 10;
/* ── VIEWBOX — fixed coordinate space, SVG scales to fit container ── */
const VB_W = 520;
const VB_H = 320;
const CX = VB_W / 2; // 260
const CY = VB_H / 2; // 160
function computeOrbitRadius(words) {
    if (words.length <= 1)
        return MIN_ORBIT_RADIUS;
    const n = words.length;
    let needed = MIN_ORBIT_RADIUS;
    for (let i = 0; i < n; i++) {
        const a = words[i] ?? "";
        const b = words[(i + 1) % n] ?? "";
        const halfA = Math.max(NODE_RADIUS, (a.length * CHAR_WIDTH_PX) / 2);
        const halfB = Math.max(NODE_RADIUS, (b.length * CHAR_WIDTH_PX) / 2);
        const r = (halfA + halfB + MIN_NODE_GAP) / (2 * Math.sin(Math.PI / n));
        if (r > needed)
            needed = r;
    }
    return Math.min(needed, MAX_ORBIT_RADIUS);
}
function RootGraph({ root, required, found, bonus, forms, }) {
    const [hintsVisible, setHintsVisible] = (0, react_1.useState)(false);
    const words = [...required, ...bonus];
    const radius = computeOrbitRadius(words);
    return ((0, jsx_runtime_1.jsxs)("div", { style: { position: "absolute", inset: 0, pointerEvents: "none" }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `
            linear-gradient(rgba(200,146,42,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,146,42,0.04) 1px, transparent 1px)
          `,
                    backgroundSize: "40px 40px",
                    zIndex: 0,
                } }), (0, jsx_runtime_1.jsxs)("div", { style: {
                    position: "absolute",
                    inset: 0,
                    zIndex: 2,
                    fontFamily: "monospace",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontSize: "9px",
                    color: "#5a4a38",
                    opacity: 0.85,
                }, children: [(0, jsx_runtime_1.jsx)("div", { style: { position: "absolute", top: 12, left: 14 }, children: "derivational system" }), (0, jsx_runtime_1.jsx)("div", { style: { position: "absolute", top: 12, right: 14 }, children: "syntactic layer" }), (0, jsx_runtime_1.jsx)("div", { style: { position: "absolute", bottom: 14, left: 14 }, children: "semantic transformation" }), (0, jsx_runtime_1.jsx)("div", { style: { position: "absolute", bottom: 14, right: 14 }, children: "lexical output" }), (0, jsx_runtime_1.jsxs)("div", { style: {
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, 48px)",
                            fontSize: "8px",
                            color: "#3a2e14",
                        }, children: ["root: ", root] })] }), (0, jsx_runtime_1.jsx)("div", { style: {
                    position: "absolute",
                    bottom: 10,
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 4,
                    pointerEvents: "auto",
                }, children: (0, jsx_runtime_1.jsx)("button", { onClick: () => setHintsVisible((v) => !v), style: {
                        fontFamily: "monospace",
                        fontSize: "8px",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: hintsVisible ? "#e8b84b" : "#c8922a",
                        background: hintsVisible ? "rgba(200,146,42,0.08)" : "rgba(10,8,4,0.6)",
                        border: `1px solid ${hintsVisible ? "#c8922a55" : "rgba(200,146,42,0.35)"}`,
                        borderRadius: "2px",
                        padding: "3px 10px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                    }, children: hintsVisible ? "hide hints" : "hint ›" }) }), (0, jsx_runtime_1.jsxs)("svg", { width: "100%", height: "100%", viewBox: `0 0 ${VB_W} ${VB_H}`, preserveAspectRatio: "xMidYMid meet", style: { position: "absolute", inset: 0, zIndex: 1 }, children: [(0, jsx_runtime_1.jsx)("circle", { cx: CX, cy: CY, r: 26, className: "root-core" }), (0, jsx_runtime_1.jsx)("text", { x: CX, y: forms && forms.length > 0 ? CY : CY + 4, textAnchor: "middle", fontSize: "11", fill: "#e8b84b", fontFamily: "monospace", children: root }), forms && forms.length > 0 && ((0, jsx_runtime_1.jsx)("text", { x: CX, y: CY + 13, textAnchor: "middle", fontSize: "7", fill: "#8a7050", fontFamily: "monospace", children: forms.map((f) => `-${f}-`).join(" · ") })), words.map((word, i) => {
                        const angle = (i / words.length) * Math.PI * 2;
                        const x = CX + Math.cos(angle) * radius;
                        const y = CY + Math.sin(angle) * radius;
                        const isFound = found.includes(word);
                        const prefix = getPrefix(word, root);
                        const meaning = prefix
                            ? prefixMap_1.PREFIX_DATA[prefix]?.meaning ?? null
                            : null;
                        return ((0, jsx_runtime_1.jsxs)("g", { children: [(0, jsx_runtime_1.jsx)("line", { x1: CX, y1: CY, x2: x, y2: y, stroke: isFound ? "#e8b84b" : "#2a2010", strokeWidth: "1", strokeDasharray: "4 6", className: isFound ? "flow-active" : "flow-idle" }), prefix && hintsVisible && ((0, jsx_runtime_1.jsx)("text", { x: (CX + x) / 2, y: (CY + y) / 2 - 6, fontSize: "8", fill: "#8a7868", textAnchor: "middle", fontFamily: "monospace", children: prefix })), meaning && hintsVisible && ((0, jsx_runtime_1.jsx)("text", { x: (CX + x) / 2, y: (CY + y) / 2 + 6, fontSize: "8", fill: "#4ecfcf", textAnchor: "middle", fontFamily: "monospace", children: meaning })), (0, jsx_runtime_1.jsx)("circle", { cx: x, cy: y, r: NODE_RADIUS, fill: isFound ? "rgba(200,146,42,0.2)" : "#0d0b08", stroke: isFound ? "#c8922a" : "#2a2010" }), (0, jsx_runtime_1.jsx)("text", { x: x, y: y + 3, textAnchor: "middle", fontSize: "8", fill: isFound ? "#e8b84b" : hintsVisible ? "#9a8870" : "#1e1808", fontFamily: "monospace", children: isFound
                                        ? word
                                        : hintsVisible
                                            ? buildHintLabel(word, root, forms)
                                            : "·".repeat(Math.min(word.length, 7)) })] }, word));
                    })] }), (0, jsx_runtime_1.jsx)("style", { children: `
        .flow-active {
          animation: flowMove 1.2s linear infinite;
        }
        .flow-idle {
          opacity: 0.25;
        }
        @keyframes flowMove {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -20; }
        }
        .root-core {
          fill: rgba(200,146,42,0.12);
          stroke: #c8922a;
          stroke-width: 1.5;
          animation: corePulse 2.4s ease-in-out infinite;
        }
        @keyframes corePulse {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(200,146,42,0.2)); }
          50%       { filter: drop-shadow(0 0 14px rgba(200,146,42,0.6)); }
        }
      ` })] }));
}
