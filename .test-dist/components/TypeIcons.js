"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DIFFICULTY_ICONS = exports.TYPE_ICONS = exports.IconDifficultyVeryHard = exports.IconDifficultyHard = exports.IconDifficultyMedium = exports.IconDifficultyEasy = exports.IconToponym = exports.IconBorrowed = exports.IconIdiom = exports.IconPhantomRoot = exports.IconFalseFamily = exports.IconDeception = exports.IconPIE = exports.IconCollision = exports.IconSemantic = exports.IconGrimm = exports.IconSuppletive = exports.IconRoot = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const IconBase = ({ children, color, }) => ((0, jsx_runtime_1.jsx)("svg", { viewBox: "0 0 24 24", width: "15", height: "15", "aria-hidden": "true", style: { display: "block", filter: `drop-shadow(0 0 6px ${color}33)` }, children: children }));
const IconRoot = ({ color }) => ((0, jsx_runtime_1.jsxs)(IconBase, { color: color, children: [(0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "12", r: "7.5", fill: "none", stroke: color, strokeWidth: "1.4" }), (0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "12", r: "1.7", fill: color }), (0, jsx_runtime_1.jsx)("path", { d: "M12 4.5v3.2M12 16.3v3.2M4.5 12h3.2M16.3 12h3.2", stroke: color, strokeWidth: "1.2" }), (0, jsx_runtime_1.jsx)("path", { d: "M7.4 7.4l2.1 2.1M14.5 14.5l2.1 2.1M16.6 7.4l-2.1 2.1M9.5 14.5l-2.1 2.1", stroke: color, strokeWidth: "1.1" })] }));
exports.IconRoot = IconRoot;
const IconSuppletive = ({ color }) => ((0, jsx_runtime_1.jsxs)(IconBase, { color: color, children: [(0, jsx_runtime_1.jsx)("path", { d: "M5 8h7", stroke: color, strokeWidth: "1.4", strokeLinecap: "round" }), (0, jsx_runtime_1.jsx)("path", { d: "M12 8l-2.2-2.2M12 8l-2.2 2.2", stroke: color, strokeWidth: "1.4", strokeLinecap: "round" }), (0, jsx_runtime_1.jsx)("path", { d: "M19 16h-7", stroke: color, strokeWidth: "1.4", strokeLinecap: "round" }), (0, jsx_runtime_1.jsx)("path", { d: "M12 16l2.2-2.2M12 16l2.2 2.2", stroke: color, strokeWidth: "1.4", strokeLinecap: "round" }), (0, jsx_runtime_1.jsx)("circle", { cx: "8", cy: "8", r: "1.6", fill: color }), (0, jsx_runtime_1.jsx)("circle", { cx: "16", cy: "16", r: "1.6", fill: color })] }));
exports.IconSuppletive = IconSuppletive;
const IconGrimm = ({ color }) => ((0, jsx_runtime_1.jsxs)(IconBase, { color: color, children: [(0, jsx_runtime_1.jsx)("path", { d: "M4 16c2-7 4-9 8-9 4 0 6 2 8 9", fill: "none", stroke: color, strokeWidth: "1.4" }), (0, jsx_runtime_1.jsx)("path", { d: "M5.5 17.5h13", stroke: color, strokeWidth: "1.2" }), (0, jsx_runtime_1.jsx)("circle", { cx: "8", cy: "11", r: "1.2", fill: color }), (0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "9", r: "1.2", fill: color }), (0, jsx_runtime_1.jsx)("circle", { cx: "16", cy: "11", r: "1.2", fill: color })] }));
exports.IconGrimm = IconGrimm;
const IconSemantic = ({ color }) => ((0, jsx_runtime_1.jsxs)(IconBase, { color: color, children: [(0, jsx_runtime_1.jsx)("path", { d: "M12 4v16", stroke: color, strokeWidth: "1.3" }), (0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "6", r: "1.8", fill: color }), (0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "12", r: "1.8", fill: "none", stroke: color, strokeWidth: "1.2" }), (0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "18", r: "1.8", fill: color, opacity: "0.4" }), (0, jsx_runtime_1.jsx)("path", { d: "M9 9.2h6M9 14.8h6", stroke: color, strokeWidth: "1.1" })] }));
exports.IconSemantic = IconSemantic;
const IconCollision = ({ color }) => ((0, jsx_runtime_1.jsxs)(IconBase, { color: color, children: [(0, jsx_runtime_1.jsx)("path", { d: "M6 7l5.5 5.5M18 7l-5.5 5.5", stroke: color, strokeWidth: "1.4" }), (0, jsx_runtime_1.jsx)("path", { d: "M6 17l5.5-5.5M18 17l-5.5-5.5", stroke: color, strokeWidth: "1.4" }), (0, jsx_runtime_1.jsx)("circle", { cx: "6", cy: "7", r: "1.6", fill: color }), (0, jsx_runtime_1.jsx)("circle", { cx: "18", cy: "7", r: "1.6", fill: color }), (0, jsx_runtime_1.jsx)("circle", { cx: "6", cy: "17", r: "1.6", fill: color, opacity: "0.5" }), (0, jsx_runtime_1.jsx)("circle", { cx: "18", cy: "17", r: "1.6", fill: color, opacity: "0.5" })] }));
exports.IconCollision = IconCollision;
const IconPIE = ({ color }) => ((0, jsx_runtime_1.jsxs)(IconBase, { color: color, children: [(0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "12", r: "8", fill: "none", stroke: color, strokeWidth: "1.4" }), (0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "12", r: "4", fill: "none", stroke: color, strokeWidth: "1.2" }), (0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "12", r: "1.4", fill: color })] }));
exports.IconPIE = IconPIE;
const IconDeception = ({ color }) => ((0, jsx_runtime_1.jsxs)(IconBase, { color: color, children: [(0, jsx_runtime_1.jsx)("path", { d: "M12 4l7 4v8l-7 4-7-4V8l7-4z", fill: "none", stroke: color, strokeWidth: "1.3" }), (0, jsx_runtime_1.jsx)("path", { d: "M8 12h8", stroke: color, strokeWidth: "1.2" }), (0, jsx_runtime_1.jsx)("path", { d: "M10 9.5l4 5", stroke: color, strokeWidth: "1.2" })] }));
exports.IconDeception = IconDeception;
const IconFalseFamily = ({ color }) => ((0, jsx_runtime_1.jsxs)(IconBase, { color: color, children: [(0, jsx_runtime_1.jsx)("circle", { cx: "8", cy: "8", r: "3", fill: "none", stroke: color, strokeWidth: "1.2" }), (0, jsx_runtime_1.jsx)("circle", { cx: "16", cy: "8", r: "3", fill: "none", stroke: color, strokeWidth: "1.2" }), (0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "16", r: "3", fill: "none", stroke: color, strokeWidth: "1.2" }), (0, jsx_runtime_1.jsx)("path", { d: "M6.2 18.8L17.8 5.2", stroke: color, strokeWidth: "1.4" })] }));
exports.IconFalseFamily = IconFalseFamily;
const IconPhantomRoot = ({ color }) => ((0, jsx_runtime_1.jsxs)(IconBase, { color: color, children: [(0, jsx_runtime_1.jsx)("path", { d: "M12 4v6", stroke: color, strokeWidth: "1.4" }), (0, jsx_runtime_1.jsx)("path", { d: "M12 10l-3.2 3.2M12 10l3.2 3.2", stroke: color, strokeWidth: "1.3" }), (0, jsx_runtime_1.jsx)("circle", { cx: "8.8", cy: "14.2", r: "1.5", fill: color }), (0, jsx_runtime_1.jsx)("circle", { cx: "15.2", cy: "14.2", r: "1.5", fill: color }), (0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "18.2", r: "1.5", fill: color, opacity: "0.65" })] }));
exports.IconPhantomRoot = IconPhantomRoot;
const IconIdiom = ({ color }) => ((0, jsx_runtime_1.jsxs)(IconBase, { color: color, children: [(0, jsx_runtime_1.jsx)("path", { d: "M4 8h16", stroke: color, strokeWidth: "1.4", strokeLinecap: "round" }), (0, jsx_runtime_1.jsx)("path", { d: "M4 12h10", stroke: color, strokeWidth: "1.4", strokeLinecap: "round" }), (0, jsx_runtime_1.jsx)("path", { d: "M4 16h13", stroke: color, strokeWidth: "1.4", strokeLinecap: "round" }), (0, jsx_runtime_1.jsx)("circle", { cx: "18", cy: "12", r: "2.2", fill: "none", stroke: color, strokeWidth: "1.2" }), (0, jsx_runtime_1.jsx)("circle", { cx: "18", cy: "12", r: "0.8", fill: color })] }));
exports.IconIdiom = IconIdiom;
const IconBorrowed = ({ color }) => ((0, jsx_runtime_1.jsxs)(IconBase, { color: color, children: [(0, jsx_runtime_1.jsx)("circle", { cx: "6", cy: "8", r: "2.5", fill: "none", stroke: color, strokeWidth: "1.2" }), (0, jsx_runtime_1.jsx)("circle", { cx: "18", cy: "8", r: "2.5", fill: "none", stroke: color, strokeWidth: "1.2" }), (0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "17", r: "2.5", fill: "none", stroke: color, strokeWidth: "1.2" }), (0, jsx_runtime_1.jsx)("path", { d: "M8.2 9.2L10.2 15.2", stroke: color, strokeWidth: "1.1", strokeDasharray: "1.5 1.5" }), (0, jsx_runtime_1.jsx)("path", { d: "M15.8 9.2L13.8 15.2", stroke: color, strokeWidth: "1.1", strokeDasharray: "1.5 1.5" }), (0, jsx_runtime_1.jsx)("path", { d: "M8.4 7.6L15.6 7.6", stroke: color, strokeWidth: "1.1", strokeDasharray: "1.5 1.5" })] }));
exports.IconBorrowed = IconBorrowed;
const IconToponym = ({ color }) => ((0, jsx_runtime_1.jsxs)(IconBase, { color: color, children: [(0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "9", r: "3.5", fill: "none", stroke: color, strokeWidth: "1.2" }), (0, jsx_runtime_1.jsx)("path", { d: "M12 12.5 L12 19", stroke: color, strokeWidth: "1.2", strokeLinecap: "round" }), (0, jsx_runtime_1.jsx)("path", { d: "M8.5 18.5 Q12 21.5 15.5 18.5", stroke: color, strokeWidth: "1.0", fill: "none" })] }));
exports.IconToponym = IconToponym;
// ── Difficulty icons ──────────────────────────────────────────────────────────
const IconDifficultyEasy = ({ color }) => ((0, jsx_runtime_1.jsxs)(IconBase, { color: color, children: [(0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "12", r: "2.5", fill: color }), (0, jsx_runtime_1.jsx)("path", { d: "M12 5.5v2.5M12 16v2.5M5.5 12h2.5M16 12h2.5", stroke: color, strokeWidth: "1.4", strokeLinecap: "round" }), (0, jsx_runtime_1.jsx)("path", { d: "M7.7 7.7l1.7 1.7M14.6 14.6l1.7 1.7M16.3 7.7l-1.7 1.7M9.4 14.6l-1.7 1.7", stroke: color, strokeWidth: "1", strokeLinecap: "round", opacity: 0.5 })] }));
exports.IconDifficultyEasy = IconDifficultyEasy;
const IconDifficultyMedium = ({ color }) => ((0, jsx_runtime_1.jsxs)(IconBase, { color: color, children: [(0, jsx_runtime_1.jsx)("circle", { cx: "9", cy: "12", r: "4.5", fill: "none", stroke: color, strokeWidth: "1.3" }), (0, jsx_runtime_1.jsx)("circle", { cx: "15", cy: "12", r: "4.5", fill: "none", stroke: color, strokeWidth: "1.3" }), (0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "12", r: "1.2", fill: color })] }));
exports.IconDifficultyMedium = IconDifficultyMedium;
const IconDifficultyHard = ({ color }) => ((0, jsx_runtime_1.jsxs)(IconBase, { color: color, children: [(0, jsx_runtime_1.jsx)("circle", { cx: "10.5", cy: "10.5", r: "5.5", fill: "none", stroke: color, strokeWidth: "1.3" }), (0, jsx_runtime_1.jsx)("path", { d: "M14.7 14.7l4.2 4.2", stroke: color, strokeWidth: "1.6", strokeLinecap: "round" }), (0, jsx_runtime_1.jsx)("path", { d: "M8.5 10.5h4M10.5 8.5v4", stroke: color, strokeWidth: "1", strokeLinecap: "round", opacity: 0.7 })] }));
exports.IconDifficultyHard = IconDifficultyHard;
const IconDifficultyVeryHard = ({ color }) => ((0, jsx_runtime_1.jsxs)(IconBase, { color: color, children: [(0, jsx_runtime_1.jsx)("path", { d: "M5 16V9l3.5 3.5L12 6l3.5 6.5L19 9v7H5z", fill: "none", stroke: color, strokeWidth: "1.3", strokeLinejoin: "round" }), (0, jsx_runtime_1.jsx)("path", { d: "M5 16h14", stroke: color, strokeWidth: "1.2" }), (0, jsx_runtime_1.jsx)("circle", { cx: "8.5", cy: "12.5", r: "1", fill: color }), (0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "8", r: "1", fill: color }), (0, jsx_runtime_1.jsx)("circle", { cx: "15.5", cy: "12.5", r: "1", fill: color })] }));
exports.IconDifficultyVeryHard = IconDifficultyVeryHard;
exports.TYPE_ICONS = {
    ROOT: exports.IconRoot,
    SUPPLETIVE: exports.IconSuppletive,
    GRIMM: exports.IconGrimm,
    SEMANTIC: exports.IconSemantic,
    COLLISION: exports.IconCollision,
    PIE: exports.IconPIE,
    DECEPTION: exports.IconDeception,
    FALSE_FAMILY: exports.IconFalseFamily,
    PHANTOM_ROOT: exports.IconPhantomRoot,
    IDIOM: exports.IconIdiom,
    BORROWED: exports.IconBorrowed,
    TOPONYM: exports.IconToponym,
    MATCH: exports.IconSemantic,
};
exports.DIFFICULTY_ICONS = {
    EASY: exports.IconDifficultyEasy,
    MEDIUM: exports.IconDifficultyMedium,
    HARD: exports.IconDifficultyHard,
    VERY_HARD: exports.IconDifficultyVeryHard,
};
