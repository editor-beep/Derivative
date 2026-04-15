"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RevealSection = exports.RevealCard = void 0;
exports.default = Derivative;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const generator_1 = require("./generator");
const RootGraph_1 = __importDefault(require("./components/RootGraph"));
const difficulty_1 = require("./difficulty");
const constants_1 = require("./constants");
const dateUtils_1 = require("./src/dateUtils");
const progressSystems_1 = require("./progressSystems");
const timedMode_1 = require("./src/timedMode");
const load = () => {
    try {
        const parsed = JSON.parse(localStorage.getItem(constants_1.STORAGE_KEY) || "{}");
        return (0, progressSystems_1.hydrateProgressStore)(parsed);
    }
    catch {
        return (0, progressSystems_1.hydrateProgressStore)({});
    }
};
const save = (data) => {
    try {
        localStorage.setItem(constants_1.STORAGE_KEY, JSON.stringify(data));
    }
    catch { }
};
const puzzleCache = {};
const isPuzzleProgressEntry = (value) => typeof value === "object" && value !== null && !Array.isArray(value);
const getPuzzleForDate = (dateStr) => {
    try {
        if (!puzzleCache[dateStr]) {
            puzzleCache[dateStr] = (0, generator_1.generateDailyPuzzle)(dateStr);
        }
        return puzzleCache[dateStr] || null;
    }
    catch {
        return null;
    }
};
const getTodayStr = () => (0, dateUtils_1.getUtcDateKey)();
const getMonthDates = (anchorDateStr) => {
    const [yearRaw, monthRaw] = anchorDateStr.split("-").map(Number);
    const year = yearRaw ?? new Date().getFullYear();
    const month = monthRaw ?? new Date().getMonth() + 1;
    const daysInMonth = new Date(year, month, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    });
};
const getRoot = (puzzle) => puzzle.meta?.root || puzzle.root || "";
const getLang = (puzzle) => puzzle.meta?.lang || puzzle.lang || "";
const getMeaning = (puzzle) => puzzle.meta?.meaning || puzzle.meaning || "";
const useTimedInteraction = ({ timedMode, timeLimitSec, onTimeout, resetKey, }) => {
    const [remainingSec, setRemainingSec] = (0, react_1.useState)(null);
    const [startedAtMs, setStartedAtMs] = (0, react_1.useState)(null);
    const didTimeoutRef = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => {
        setRemainingSec(null);
        setStartedAtMs(null);
        didTimeoutRef.current = false;
    }, [resetKey, timedMode, timeLimitSec]);
    (0, react_1.useEffect)(() => {
        if (!timedMode || startedAtMs === null || didTimeoutRef.current)
            return;
        const update = () => {
            const elapsedMs = Date.now() - startedAtMs;
            const secondsLeft = Math.max(0, Math.ceil((timeLimitSec * 1000 - elapsedMs) / 1000));
            setRemainingSec(secondsLeft);
            if ((0, timedMode_1.hasTimedOut)({ timedMode, timeLimitSec, elapsedMs })) {
                didTimeoutRef.current = true;
                setRemainingSec(0);
                setStartedAtMs(null);
                onTimeout();
            }
        };
        update();
        const interval = window.setInterval(update, 200);
        return () => window.clearInterval(interval);
    }, [onTimeout, startedAtMs, timeLimitSec, timedMode]);
    const startInteraction = () => {
        if (!timedMode || startedAtMs !== null)
            return;
        didTimeoutRef.current = false;
        setStartedAtMs(Date.now());
        setRemainingSec(timeLimitSec);
    };
    const resetInteraction = () => {
        setStartedAtMs(null);
        setRemainingSec(null);
        didTimeoutRef.current = false;
    };
    return { remainingSec, startInteraction, resetInteraction };
};
const S = {
    mono: { fontFamily: "var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)" },
    btn: {
        background: "transparent",
        border: `1px solid ${constants_1.COLORS.goldDark}`,
        color: constants_1.COLORS.goldDim,
        padding: "0.45rem 1rem",
        fontFamily: "var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)",
        fontSize: "0.7rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        cursor: "pointer",
        borderRadius: "2px",
        transition: "all 0.18s ease",
    },
    btnSm: {
        background: "transparent",
        border: `1px solid ${constants_1.COLORS.blackLine}`,
        color: constants_1.COLORS.goldDark,
        padding: "0.3rem 0.6rem",
        fontFamily: "var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)",
        fontSize: "0.62rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        cursor: "pointer",
        borderRadius: "2px",
        transition: "all 0.18s ease",
    },
    btnPrimary: {
        background: `linear-gradient(180deg, ${constants_1.COLORS.gold}, ${constants_1.COLORS.goldDim})`,
        border: `1px solid ${constants_1.COLORS.gold}`,
        color: constants_1.COLORS.bg,
        padding: "0.45rem 1rem",
        fontFamily: "var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)",
        fontSize: "0.7rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        cursor: "pointer",
        borderRadius: "2px",
        boxShadow: `0 0 18px ${constants_1.COLORS.goldGlow}`,
        transition: "all 0.18s ease",
    },
    input: {
        background: constants_1.COLORS.surface,
        border: `1px solid ${constants_1.COLORS.blackLine}`,
        borderRadius: "2px",
        color: constants_1.COLORS.textPrimary,
        fontFamily: "var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)",
        fontSize: "0.85rem",
        padding: "0.45rem 0.65rem",
        outline: "none",
        letterSpacing: "0.04em",
        width: "100%",
        boxSizing: "border-box",
        transition: "border-color 0.18s ease, box-shadow 0.18s ease",
    },
};
const IconBase = ({ children, color, }) => ((0, jsx_runtime_1.jsx)("svg", { viewBox: "0 0 24 24", width: "15", height: "15", "aria-hidden": "true", style: { display: "block", filter: `drop-shadow(0 0 6px ${color}33)` }, children: children }));
const IconRoot = ({ color }) => ((0, jsx_runtime_1.jsxs)(IconBase, { color: color, children: [(0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "12", r: "7.5", fill: "none", stroke: color, strokeWidth: "1.4" }), (0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "12", r: "1.7", fill: color }), (0, jsx_runtime_1.jsx)("path", { d: "M12 4.5v3.2M12 16.3v3.2M4.5 12h3.2M16.3 12h3.2", stroke: color, strokeWidth: "1.2" }), (0, jsx_runtime_1.jsx)("path", { d: "M7.4 7.4l2.1 2.1M14.5 14.5l2.1 2.1M16.6 7.4l-2.1 2.1M9.5 14.5l-2.1 2.1", stroke: color, strokeWidth: "1.1" })] }));
const IconSuppletive = ({ color }) => ((0, jsx_runtime_1.jsxs)(IconBase, { color: color, children: [(0, jsx_runtime_1.jsx)("path", { d: "M5 8h7", stroke: color, strokeWidth: "1.4", strokeLinecap: "round" }), (0, jsx_runtime_1.jsx)("path", { d: "M12 8l-2.2-2.2M12 8l-2.2 2.2", stroke: color, strokeWidth: "1.4", strokeLinecap: "round" }), (0, jsx_runtime_1.jsx)("path", { d: "M19 16h-7", stroke: color, strokeWidth: "1.4", strokeLinecap: "round" }), (0, jsx_runtime_1.jsx)("path", { d: "M12 16l2.2-2.2M12 16l2.2 2.2", stroke: color, strokeWidth: "1.4", strokeLinecap: "round" }), (0, jsx_runtime_1.jsx)("circle", { cx: "8", cy: "8", r: "1.6", fill: color }), (0, jsx_runtime_1.jsx)("circle", { cx: "16", cy: "16", r: "1.6", fill: color })] }));
const IconGrimm = ({ color }) => ((0, jsx_runtime_1.jsxs)(IconBase, { color: color, children: [(0, jsx_runtime_1.jsx)("path", { d: "M4 16c2-7 4-9 8-9 4 0 6 2 8 9", fill: "none", stroke: color, strokeWidth: "1.4" }), (0, jsx_runtime_1.jsx)("path", { d: "M5.5 17.5h13", stroke: color, strokeWidth: "1.2" }), (0, jsx_runtime_1.jsx)("circle", { cx: "8", cy: "11", r: "1.2", fill: color }), (0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "9", r: "1.2", fill: color }), (0, jsx_runtime_1.jsx)("circle", { cx: "16", cy: "11", r: "1.2", fill: color })] }));
const IconSemantic = ({ color }) => ((0, jsx_runtime_1.jsxs)(IconBase, { color: color, children: [(0, jsx_runtime_1.jsx)("path", { d: "M12 4v16", stroke: color, strokeWidth: "1.3" }), (0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "6", r: "1.8", fill: color }), (0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "12", r: "1.8", fill: "none", stroke: color, strokeWidth: "1.2" }), (0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "18", r: "1.8", fill: color, opacity: "0.4" }), (0, jsx_runtime_1.jsx)("path", { d: "M9 9.2h6M9 14.8h6", stroke: color, strokeWidth: "1.1" })] }));
const IconCollision = ({ color }) => ((0, jsx_runtime_1.jsxs)(IconBase, { color: color, children: [(0, jsx_runtime_1.jsx)("path", { d: "M6 7l5.5 5.5M18 7l-5.5 5.5", stroke: color, strokeWidth: "1.4" }), (0, jsx_runtime_1.jsx)("path", { d: "M6 17l5.5-5.5M18 17l-5.5-5.5", stroke: color, strokeWidth: "1.4" }), (0, jsx_runtime_1.jsx)("circle", { cx: "6", cy: "7", r: "1.6", fill: color }), (0, jsx_runtime_1.jsx)("circle", { cx: "18", cy: "7", r: "1.6", fill: color }), (0, jsx_runtime_1.jsx)("circle", { cx: "6", cy: "17", r: "1.6", fill: color, opacity: "0.5" }), (0, jsx_runtime_1.jsx)("circle", { cx: "18", cy: "17", r: "1.6", fill: color, opacity: "0.5" })] }));
const IconPIE = ({ color }) => ((0, jsx_runtime_1.jsxs)(IconBase, { color: color, children: [(0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "12", r: "8", fill: "none", stroke: color, strokeWidth: "1.4" }), (0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "12", r: "4", fill: "none", stroke: color, strokeWidth: "1.2" }), (0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "12", r: "1.4", fill: color })] }));
const IconDeception = ({ color }) => ((0, jsx_runtime_1.jsxs)(IconBase, { color: color, children: [(0, jsx_runtime_1.jsx)("path", { d: "M12 4l7 4v8l-7 4-7-4V8l7-4z", fill: "none", stroke: color, strokeWidth: "1.3" }), (0, jsx_runtime_1.jsx)("path", { d: "M8 12h8", stroke: color, strokeWidth: "1.2" }), (0, jsx_runtime_1.jsx)("path", { d: "M10 9.5l4 5", stroke: color, strokeWidth: "1.2" })] }));
const IconFalseFamily = ({ color }) => ((0, jsx_runtime_1.jsxs)(IconBase, { color: color, children: [(0, jsx_runtime_1.jsx)("circle", { cx: "8", cy: "8", r: "3", fill: "none", stroke: color, strokeWidth: "1.2" }), (0, jsx_runtime_1.jsx)("circle", { cx: "16", cy: "8", r: "3", fill: "none", stroke: color, strokeWidth: "1.2" }), (0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "16", r: "3", fill: "none", stroke: color, strokeWidth: "1.2" }), (0, jsx_runtime_1.jsx)("path", { d: "M6.2 18.8L17.8 5.2", stroke: color, strokeWidth: "1.4" })] }));
const IconPhantomRoot = ({ color }) => ((0, jsx_runtime_1.jsxs)(IconBase, { color: color, children: [(0, jsx_runtime_1.jsx)("path", { d: "M12 4v6", stroke: color, strokeWidth: "1.4" }), (0, jsx_runtime_1.jsx)("path", { d: "M12 10l-3.2 3.2M12 10l3.2 3.2", stroke: color, strokeWidth: "1.3" }), (0, jsx_runtime_1.jsx)("circle", { cx: "8.8", cy: "14.2", r: "1.5", fill: color }), (0, jsx_runtime_1.jsx)("circle", { cx: "15.2", cy: "14.2", r: "1.5", fill: color }), (0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "18.2", r: "1.5", fill: color, opacity: "0.65" })] }));
const IconIdiom = ({ color }) => ((0, jsx_runtime_1.jsxs)(IconBase, { color: color, children: [(0, jsx_runtime_1.jsx)("path", { d: "M4 8h16", stroke: color, strokeWidth: "1.4", strokeLinecap: "round" }), (0, jsx_runtime_1.jsx)("path", { d: "M4 12h10", stroke: color, strokeWidth: "1.4", strokeLinecap: "round" }), (0, jsx_runtime_1.jsx)("path", { d: "M4 16h13", stroke: color, strokeWidth: "1.4", strokeLinecap: "round" }), (0, jsx_runtime_1.jsx)("circle", { cx: "18", cy: "12", r: "2.2", fill: "none", stroke: color, strokeWidth: "1.2" }), (0, jsx_runtime_1.jsx)("circle", { cx: "18", cy: "12", r: "0.8", fill: color })] }));
const IconBorrowed = ({ color }) => ((0, jsx_runtime_1.jsxs)(IconBase, { color: color, children: [(0, jsx_runtime_1.jsx)("circle", { cx: "6", cy: "8", r: "2.5", fill: "none", stroke: color, strokeWidth: "1.2" }), (0, jsx_runtime_1.jsx)("circle", { cx: "18", cy: "8", r: "2.5", fill: "none", stroke: color, strokeWidth: "1.2" }), (0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "17", r: "2.5", fill: "none", stroke: color, strokeWidth: "1.2" }), (0, jsx_runtime_1.jsx)("path", { d: "M8.2 9.2L10.2 15.2", stroke: color, strokeWidth: "1.1", strokeDasharray: "1.5 1.5" }), (0, jsx_runtime_1.jsx)("path", { d: "M15.8 9.2L13.8 15.2", stroke: color, strokeWidth: "1.1", strokeDasharray: "1.5 1.5" }), (0, jsx_runtime_1.jsx)("path", { d: "M8.4 7.6L15.6 7.6", stroke: color, strokeWidth: "1.1", strokeDasharray: "1.5 1.5" })] }));
const IconToponym = ({ color }) => ((0, jsx_runtime_1.jsxs)(IconBase, { color: color, children: [(0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "9", r: "3.5", fill: "none", stroke: color, strokeWidth: "1.2" }), (0, jsx_runtime_1.jsx)("path", { d: "M12 12.5 L12 19", stroke: color, strokeWidth: "1.2", strokeLinecap: "round" }), (0, jsx_runtime_1.jsx)("path", { d: "M8.5 18.5 Q12 21.5 15.5 18.5", stroke: color, strokeWidth: "1.0", fill: "none" })] }));
// ── Difficulty icons ──────────────────────────────────────────────────────────
const IconDifficultyEasy = ({ color }) => ((0, jsx_runtime_1.jsxs)(IconBase, { color: color, children: [(0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "12", r: "2.5", fill: color }), (0, jsx_runtime_1.jsx)("path", { d: "M12 5.5v2.5M12 16v2.5M5.5 12h2.5M16 12h2.5", stroke: color, strokeWidth: "1.4", strokeLinecap: "round" }), (0, jsx_runtime_1.jsx)("path", { d: "M7.7 7.7l1.7 1.7M14.6 14.6l1.7 1.7M16.3 7.7l-1.7 1.7M9.4 14.6l-1.7 1.7", stroke: color, strokeWidth: "1", strokeLinecap: "round", opacity: 0.5 })] }));
const IconDifficultyMedium = ({ color }) => ((0, jsx_runtime_1.jsxs)(IconBase, { color: color, children: [(0, jsx_runtime_1.jsx)("circle", { cx: "9", cy: "12", r: "4.5", fill: "none", stroke: color, strokeWidth: "1.3" }), (0, jsx_runtime_1.jsx)("circle", { cx: "15", cy: "12", r: "4.5", fill: "none", stroke: color, strokeWidth: "1.3" }), (0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "12", r: "1.2", fill: color })] }));
const IconDifficultyHard = ({ color }) => ((0, jsx_runtime_1.jsxs)(IconBase, { color: color, children: [(0, jsx_runtime_1.jsx)("circle", { cx: "10.5", cy: "10.5", r: "5.5", fill: "none", stroke: color, strokeWidth: "1.3" }), (0, jsx_runtime_1.jsx)("path", { d: "M14.7 14.7l4.2 4.2", stroke: color, strokeWidth: "1.6", strokeLinecap: "round" }), (0, jsx_runtime_1.jsx)("path", { d: "M8.5 10.5h4M10.5 8.5v4", stroke: color, strokeWidth: "1", strokeLinecap: "round", opacity: 0.7 })] }));
const IconDifficultyVeryHard = ({ color }) => ((0, jsx_runtime_1.jsxs)(IconBase, { color: color, children: [(0, jsx_runtime_1.jsx)("path", { d: "M5 16V9l3.5 3.5L12 6l3.5 6.5L19 9v7H5z", fill: "none", stroke: color, strokeWidth: "1.3", strokeLinejoin: "round" }), (0, jsx_runtime_1.jsx)("path", { d: "M5 16h14", stroke: color, strokeWidth: "1.2" }), (0, jsx_runtime_1.jsx)("circle", { cx: "8.5", cy: "12.5", r: "1", fill: color }), (0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "8", r: "1", fill: color }), (0, jsx_runtime_1.jsx)("circle", { cx: "15.5", cy: "12.5", r: "1", fill: color })] }));
const TYPE_ICONS = {
    ROOT: IconRoot,
    SUPPLETIVE: IconSuppletive,
    GRIMM: IconGrimm,
    SEMANTIC: IconSemantic,
    COLLISION: IconCollision,
    PIE: IconPIE,
    DECEPTION: IconDeception,
    FALSE_FAMILY: IconFalseFamily,
    PHANTOM_ROOT: IconPhantomRoot,
    IDIOM: IconIdiom,
    BORROWED: IconBorrowed,
    TOPONYM: IconToponym,
    MATCH: IconSemantic,
};
const TYPE_SHARE_ICONS = {
    ROOT: "Ψ",
    SUPPLETIVE: "≠",
    GRIMM: "∿",
    SEMANTIC: "→",
    COLLISION: "✕",
    PIE: "∴",
    IDIOM: "❝",
    BORROWED: "←",
    TOPONYM: "⊙",
    DECEPTION: "≢",
    FALSE_FAMILY: "≁",
    PHANTOM_ROOT: "∅",
    MATCH: "⇄",
};
const DIFFICULTY_SHARE_ICONS = {
    EASY: "○",
    MEDIUM: "◎",
    HARD: "◉",
    VERY_HARD: "●",
};
const GlobalFX = () => ((0, jsx_runtime_1.jsx)("style", { children: `
    @keyframes shake {
      0%,100% { transform: translateX(0); }
      20%,60% { transform: translateX(-5px); }
      40%,80% { transform: translateX(5px); }
    }

    @keyframes glitch1 {
      0%,100% { clip-path: inset(0 0 98% 0); transform: translate(-3px,0); }
      25% { clip-path: inset(30% 0 50% 0); transform: translate(3px,0); }
      50% { clip-path: inset(60% 0 20% 0); transform: translate(-2px,0); }
      75% { clip-path: inset(10% 0 80% 0); transform: translate(2px,0); }
    }

    @keyframes glitch2 {
      0%,100% { clip-path: inset(50% 0 30% 0); transform: translate(3px,0); }
      25% { clip-path: inset(80% 0 5% 0); transform: translate(-3px,0); }
      50% { clip-path: inset(20% 0 60% 0); transform: translate(2px,0); }
      75% { clip-path: inset(5% 0 90% 0); transform: translate(-2px,0); }
    }

    @keyframes goldPulse {
      0%,100% { box-shadow: 0 0 0 rgba(232,184,75,0); }
      50% { box-shadow: 0 0 24px rgba(232,184,75,0.14); }
    }

    @keyframes cyanPulse {
      0%,100% { box-shadow: 0 0 0 rgba(78,207,207,0); }
      50% { box-shadow: 0 0 24px rgba(78,207,207,0.14); }
    }

    @keyframes textGlow {
      0%,100% { text-shadow: 0 0 0 rgba(232,184,75,0); }
      50% { text-shadow: 0 0 12px rgba(232,184,75,0.22); }
    }

    @keyframes scanMove {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(100%); }
    }

    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    @keyframes borderTravel {
      0% { background-position: 0% 50%; }
      100% { background-position: 200% 50%; }
    }

    .deriv-title {
      position: relative;
      cursor: pointer;
      display: inline-block;
      animation: textGlow 3.2s ease-in-out infinite;
    }

    .deriv-title::before,
    .deriv-title::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      pointer-events: none;
    }

    .deriv-title::before {
      color: #f0d070;
      text-shadow: -2px 0 #c8922a;
    }

    .deriv-title::after {
      color: #4ecfcf;
      text-shadow: 2px 0 #e8b84b;
    }

    .deriv-title:hover::before {
      opacity: 0.8;
      animation: glitch1 0.35s steps(1) infinite;
    }

    .deriv-title:hover::after {
      opacity: 0.8;
      animation: glitch2 0.35s steps(1) infinite;
    }

    .arch-link {
      color: ${constants_1.COLORS.textFaint};
      font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
      font-size: 0.65rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      cursor: pointer;
      border: none;
      background: transparent;
      padding: 0;
      transition: color 0.2s ease, text-shadow 0.2s ease;
    }

    .arch-link:hover {
      color: ${constants_1.COLORS.gold};
      text-shadow: 0 0 10px rgba(232,184,75,0.2);
    }

    .deriv-btn:hover {
      border-color: ${constants_1.COLORS.goldDim} !important;
      color: ${constants_1.COLORS.gold} !important;
      box-shadow: 0 0 16px rgba(232,184,75,0.12);
    }

    .deriv-btn-primary:hover {
      filter: brightness(1.06);
      box-shadow: 0 0 22px rgba(232,184,75,0.2);
    }

    .reveal-shell {
      position: relative;
      overflow: hidden;
    }

    .reveal-shell::before {
      content: "";
      position: absolute;
      inset: 0;
      padding: 1px;
      background: linear-gradient(
        120deg,
        rgba(232,184,75,0.0),
        rgba(232,184,75,0.55),
        rgba(78,207,207,0.45),
        rgba(232,184,75,0.0)
      );
      background-size: 200% 100%;
      animation: borderTravel 8s linear infinite;
      -webkit-mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
    }

    .gold-shimmer {
      background: linear-gradient(
        90deg,
        rgba(232,184,75,0.03),
        rgba(232,184,75,0.12),
        rgba(232,184,75,0.03)
      );
      background-size: 200% 100%;
      animation: shimmer 6s linear infinite;
    }

    .cyan-shimmer {
      background: linear-gradient(
        90deg,
        rgba(78,207,207,0.02),
        rgba(78,207,207,0.10),
        rgba(78,207,207,0.02)
      );
      background-size: 200% 100%;
      animation: shimmer 7s linear infinite;
    }
  ` }));
const AmbientOverlays = () => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { style: {
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background: `
          radial-gradient(circle at 18% 22%, rgba(78,207,207,0.12), transparent 28%),
          radial-gradient(circle at 79% 18%, rgba(232,184,75,0.12), transparent 28%),
          radial-gradient(circle at 52% 72%, rgba(232,184,75,0.06), transparent 36%),
          linear-gradient(to bottom, rgba(255,255,255,0.02), transparent 24%, transparent 76%, rgba(255,255,255,0.02))
        `,
                zIndex: 0,
            } }), (0, jsx_runtime_1.jsx)("div", { style: {
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                backgroundImage: `
          linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.014) 1px, transparent 1px)
        `,
                backgroundSize: "100% 3px, 3px 100%",
                opacity: 0.05,
                mixBlendMode: "screen",
                zIndex: 0,
            } }), (0, jsx_runtime_1.jsx)("div", { style: {
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background: "radial-gradient(circle at center, transparent 48%, rgba(0,0,0,0.28) 100%)",
                zIndex: 0,
            } }), (0, jsx_runtime_1.jsx)("div", { style: {
                position: "absolute",
                left: 0,
                right: 0,
                top: "-25%",
                height: "30%",
                pointerEvents: "none",
                background: "linear-gradient(to bottom, rgba(255,255,255,0.025), rgba(255,255,255,0.0))",
                animation: "scanMove 9s linear infinite",
                zIndex: 0,
                opacity: 0.5,
            } })] }));
const Starfield = () => ((0, jsx_runtime_1.jsx)("canvas", { style: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
    }, ref: (el) => {
        if (!el || el._init)
            return;
        el._init = true;
        const ctx = el.getContext("2d");
        if (!ctx)
            return;
        const resize = () => {
            el.width = el.offsetWidth;
            el.height = el.offsetHeight;
        };
        resize();
        const stars = Array.from({ length: 180 }, () => ({
            x: Math.random() * el.width,
            y: Math.random() * el.height,
            r: Math.random() * 1.15 + 0.1,
            o: Math.random() * 0.5 + 0.1,
            s: Math.random() * 0.4 + 0.1,
            d: Math.random() > 0.5 ? 1 : -1,
            cyan: Math.random() > 0.6,
        }));
        const links = Array.from({ length: 38 }, () => ({
            a: Math.floor(Math.random() * stars.length),
            b: Math.floor(Math.random() * stars.length),
        }));
        const draw = () => {
            ctx.clearRect(0, 0, el.width, el.height);
            links.forEach((l) => {
                const a = stars[l.a];
                const b = stars[l.b];
                if (!a || !b)
                    return;
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 160) {
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = a.cyan || b.cyan ? "rgba(78,207,207,0.08)" : "rgba(232,184,75,0.06)";
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            });
            stars.forEach((s) => {
                s.o += 0.003 * s.s * s.d;
                if (s.o > 0.7 || s.o < 0.08)
                    s.d *= -1;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = s.cyan
                    ? `rgba(78,207,207,${s.o})`
                    : `rgba(232,184,75,${s.o})`;
                ctx.fill();
            });
            requestAnimationFrame(draw);
        };
        draw();
        window.addEventListener("resize", resize);
    } }));
const SystemMesh = ({ intensity = 1 }) => ((0, jsx_runtime_1.jsx)("div", { style: {
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.75 * intensity,
        background: `
        radial-gradient(circle at 30% 38%, rgba(78,207,207,0.10), transparent 24%),
        radial-gradient(circle at 73% 62%, rgba(232,184,75,0.08), transparent 28%)
      `,
    }, children: (0, jsx_runtime_1.jsxs)("svg", { viewBox: "0 0 100 100", preserveAspectRatio: "none", style: {
            width: "100%",
            height: "100%",
            opacity: 0.55,
        }, children: [(0, jsx_runtime_1.jsxs)("g", { stroke: "rgba(78,207,207,0.18)", strokeWidth: "0.35", fill: "none", children: [(0, jsx_runtime_1.jsx)("path", { d: "M12 72 L26 56 L41 61 L56 43 L73 52" }), (0, jsx_runtime_1.jsx)("path", { d: "M22 28 L34 36 L52 22 L68 31 L81 20" }), (0, jsx_runtime_1.jsx)("path", { d: "M17 82 L37 78 L49 86 L66 73 L84 78" })] }), (0, jsx_runtime_1.jsxs)("g", { fill: "rgba(78,207,207,0.34)", children: [(0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "72", r: "0.9" }), (0, jsx_runtime_1.jsx)("circle", { cx: "26", cy: "56", r: "0.9" }), (0, jsx_runtime_1.jsx)("circle", { cx: "41", cy: "61", r: "0.9" }), (0, jsx_runtime_1.jsx)("circle", { cx: "56", cy: "43", r: "0.9" }), (0, jsx_runtime_1.jsx)("circle", { cx: "73", cy: "52", r: "0.9" }), (0, jsx_runtime_1.jsx)("circle", { cx: "22", cy: "28", r: "0.9" }), (0, jsx_runtime_1.jsx)("circle", { cx: "34", cy: "36", r: "0.9" }), (0, jsx_runtime_1.jsx)("circle", { cx: "52", cy: "22", r: "0.9" }), (0, jsx_runtime_1.jsx)("circle", { cx: "68", cy: "31", r: "0.9" }), (0, jsx_runtime_1.jsx)("circle", { cx: "81", cy: "20", r: "0.9" })] })] }) }));
const DIFFICULTY_ICONS = {
    EASY: IconDifficultyEasy,
    MEDIUM: IconDifficultyMedium,
    HARD: IconDifficultyHard,
    VERY_HARD: IconDifficultyVeryHard,
};
const DifficultyBadge = ({ puzzleType, lensId }) => {
    const level = (0, difficulty_1.getDifficulty)(puzzleType, lensId);
    const meta = difficulty_1.DIFFICULTY_META[level];
    const Icon = DIFFICULTY_ICONS[level];
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            background: `${meta.color}12`,
            border: `1px solid ${meta.color}38`,
            borderRadius: "2px",
            padding: "0.22rem 0.55rem",
            marginTop: "0.3rem",
        }, children: [(0, jsx_runtime_1.jsx)(Icon, { color: meta.color }), (0, jsx_runtime_1.jsx)("div", { style: {
                    ...S.mono,
                    fontSize: "0.58rem",
                    color: meta.color,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    lineHeight: 1.1,
                }, children: meta.label }), (0, jsx_runtime_1.jsxs)("div", { style: {
                    ...S.mono,
                    fontSize: "0.5rem",
                    color: `${meta.color}99`,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                }, children: ["\u00B7 ", meta.sublabel] })] }));
};
const TypeBadge = ({ type, lensId }) => {
    const tc = constants_1.TYPE_COLORS[type] || constants_1.COLORS.goldDim;
    const Icon = TYPE_ICONS[type] || IconRoot;
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: "inline-flex", flexDirection: "column", marginBottom: "0.65rem" }, children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.45rem",
                    background: `${tc}16`,
                    border: `1px solid ${tc}44`,
                    borderRadius: "2px",
                    padding: "0.22rem 0.55rem",
                    boxShadow: `0 0 18px ${tc}11`,
                    animation: type === "GRIMM" || type === "COLLISION" ? "cyanPulse 3.4s ease-in-out infinite" : "goldPulse 4.2s ease-in-out infinite",
                }, children: [(0, jsx_runtime_1.jsx)(Icon, { color: tc }), (0, jsx_runtime_1.jsx)("div", { style: {
                            ...S.mono,
                            fontSize: "0.58rem",
                            color: tc,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            lineHeight: 1.1,
                        }, children: constants_1.TYPE_LABELS[type] || type })] }), (0, jsx_runtime_1.jsx)("div", { style: {
                    ...S.mono,
                    fontSize: "0.52rem",
                    color: "rgba(78,207,207,0.62)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginTop: "0.24rem",
                    paddingLeft: "0.08rem",
                }, children: constants_1.TYPE_SUBLABELS[type] || "lexical system" }), lensId && (0, jsx_runtime_1.jsx)(DifficultyBadge, { puzzleType: type, lensId: lensId })] }));
};
const RevealCard = ({ puzzle, onShare, }) => {
    const color = constants_1.TYPE_COLORS[puzzle.type] || constants_1.COLORS.goldDim;
    const Icon = TYPE_ICONS[puzzle.type] || IconRoot;
    const claim = puzzle.meta?.claim?.trim();
    return ((0, jsx_runtime_1.jsxs)("div", { className: "reveal-shell", style: {
            borderTop: `1px solid ${constants_1.COLORS.blackLine}`,
            paddingTop: "1.25rem",
            marginTop: "0.95rem",
            background: `linear-gradient(180deg, rgba(232,184,75,0.03), rgba(78,207,207,0.015))`,
            borderRadius: "4px",
            position: "relative",
        }, children: [(0, jsx_runtime_1.jsx)(SystemMesh, { intensity: 0.7 }), (0, jsx_runtime_1.jsxs)("div", { style: { position: "relative", zIndex: 1 }, children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "0.45rem",
                            marginBottom: "0.65rem",
                        }, children: [(0, jsx_runtime_1.jsx)(Icon, { color: color }), (0, jsx_runtime_1.jsx)("div", { style: {
                                    ...S.mono,
                                    fontSize: "0.58rem",
                                    color,
                                    letterSpacing: "0.15em",
                                    textTransform: "uppercase",
                                }, children: "revealed machinery" })] }), (0, jsx_runtime_1.jsx)("div", { style: {
                            fontSize: "1rem",
                            color: constants_1.COLORS.textPrimary,
                            fontWeight: 500,
                            lineHeight: 1.55,
                            marginBottom: "0.7rem",
                        }, children: puzzle.reveal.headline }), (0, jsx_runtime_1.jsx)("div", { style: {
                            fontSize: "0.83rem",
                            color: constants_1.COLORS.textSecondary,
                            lineHeight: 1.88,
                            marginBottom: "1rem",
                            maxWidth: "62ch",
                        }, children: puzzle.reveal.body }), claim && ((0, jsx_runtime_1.jsx)("div", { style: {
                            ...S.mono,
                            fontSize: "0.62rem",
                            color: constants_1.COLORS.textMuted,
                            letterSpacing: "0.08em",
                            marginBottom: "0.9rem",
                            opacity: 0.82,
                        }, children: claim })), (0, jsx_runtime_1.jsx)("div", { style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: "6px",
                            marginBottom: "1rem",
                        }, children: puzzle.reveal.connections.map(([w, d], i) => ((0, jsx_runtime_1.jsxs)("div", { style: {
                                display: "flex",
                                gap: "1rem",
                                fontSize: "0.74rem",
                                ...S.mono,
                                alignItems: "flex-start",
                            }, children: [(0, jsx_runtime_1.jsx)("span", { style: {
                                        color: constants_1.COLORS.gold,
                                        minWidth: "130px",
                                        flexShrink: 0,
                                    }, children: w }), (0, jsx_runtime_1.jsx)("span", { style: { color: constants_1.COLORS.textMuted }, children: d })] }, i))) }), (0, jsx_runtime_1.jsx)("button", { className: "deriv-btn", style: S.btnSm, onClick: onShare, children: "share \u2192" })] })] }));
};
exports.RevealCard = RevealCard;
const RevealSection = ({ puzzle, visible, onShare, }) => {
    if (!visible)
        return null;
    return (0, jsx_runtime_1.jsx)(exports.RevealCard, { puzzle: puzzle, onShare: onShare });
};
exports.RevealSection = RevealSection;
const ShareCard = ({ data }) => {
    const [copied, setCopied] = (0, react_1.useState)(false);
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(data.plain);
        }
        catch { }
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            marginTop: "1rem",
            background: constants_1.COLORS.surface,
            border: `1px solid ${constants_1.COLORS.goldDark}`,
            borderRadius: "3px",
            padding: "1rem 1.1rem",
            boxShadow: `0 0 22px ${constants_1.COLORS.goldGlow}`,
        }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                    ...S.mono,
                    fontSize: "0.74rem",
                    margin: 0,
                    lineHeight: 2,
                }, children: data.sections.map((section, i) => ((0, jsx_runtime_1.jsx)("div", { style: { marginBottom: i < data.sections.length - 1 ? "0.65rem" : 0 }, children: section.isTracker ? (section.text.split("").map((ch, j) => ((0, jsx_runtime_1.jsx)("span", { style: {
                            color: ch === "◈" ? constants_1.COLORS.gold : constants_1.COLORS.goldDark,
                            fontSize: ch === "◈" ? "0.82rem" : "0.74rem",
                        }, children: ch }, j)))) : ((0, jsx_runtime_1.jsx)("span", { style: { color: section.color, whiteSpace: "pre-wrap" }, children: section.text })) }, i))) }), (0, jsx_runtime_1.jsx)("button", { className: "deriv-btn", style: { ...S.btnSm, marginTop: "0.75rem" }, onClick: copy, children: copied ? "copied ✓" : "copy to clipboard" })] }));
};
const PuzzleHeader = ({ puzzle, selDate, }) => {
    const dateLabel = new Date(selDate + "T12:00:00").toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
    });
    const root = getRoot(puzzle);
    const lang = getLang(puzzle);
    const meaning = getMeaning(puzzle);
    return ((0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: "1.25rem", position: "relative" }, children: [(0, jsx_runtime_1.jsx)(TypeBadge, { type: puzzle.type, lensId: puzzle.lensId }), (0, jsx_runtime_1.jsx)("div", { style: {
                    ...S.mono,
                    fontSize: "1.42rem",
                    color: constants_1.COLORS.textPrimary,
                    letterSpacing: "0.07em",
                    marginBottom: "0.26rem",
                    textShadow: "0 0 12px rgba(232,184,75,0.09)",
                }, children: root }), (0, jsx_runtime_1.jsxs)("div", { style: {
                    fontSize: "0.82rem",
                    color: constants_1.COLORS.textSecondary,
                    fontStyle: "italic",
                    marginBottom: "0.3rem",
                }, children: [lang, " \u00B7 ", meaning] }), (0, jsx_runtime_1.jsx)("div", { style: {
                    ...S.mono,
                    fontSize: "0.56rem",
                    color: constants_1.COLORS.textFaint,
                    letterSpacing: "0.11em",
                    textTransform: "uppercase",
                    marginBottom: puzzle.prompt ? "0.45rem" : "0",
                }, children: dateLabel }), puzzle.prompt && ((0, jsx_runtime_1.jsx)("div", { style: {
                    fontSize: "0.78rem",
                    color: constants_1.COLORS.textMuted,
                    borderLeft: `2px solid ${constants_1.COLORS.goldDark}`,
                    paddingLeft: "0.8rem",
                    marginTop: "0.55rem",
                    lineHeight: 1.72,
                    maxWidth: "62ch",
                    background: "linear-gradient(90deg, rgba(232,184,75,0.03), rgba(232,184,75,0.0))",
                }, children: puzzle.prompt }))] }));
};
const RootPuzzle = ({ puzzle, found, onWord, revealed, timedSettings, }) => {
    const [input, setInput] = (0, react_1.useState)("");
    const [flash, setFlash] = (0, react_1.useState)(null);
    const [shake, setShake] = (0, react_1.useState)(false);
    const ref = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        setTimeout(() => ref.current?.focus(), 100);
    }, []);
    const handleTimedFailure = () => {
        setShake(true);
        setFlash({ msg: "time expired", ok: false });
        setTimeout(() => setShake(false), 500);
        setTimeout(() => setFlash(null), 1300);
    };
    const { remainingSec, startInteraction, resetInteraction } = useTimedInteraction({
        ...timedSettings,
        onTimeout: handleTimedFailure,
        resetKey: `${puzzle.date}-${puzzle.type}-root`,
    });
    const submit = () => {
        const w = input.trim().toLowerCase();
        if (!w || !puzzle.targets || !puzzle.required)
            return;
        resetInteraction();
        setInput("");
        if (found.includes(w)) {
            setFlash({ msg: "already found", ok: false });
            setTimeout(() => setFlash(null), 1300);
            return;
        }
        if (puzzle.targets.includes(w)) {
            const required = puzzle.required.includes(w);
            onWord(w, required);
            setFlash({ msg: required ? "accepted" : "related", ok: true, bonus: !required });
        }
        else {
            setShake(true);
            setFlash({ msg: "not in this puzzle", ok: false });
            setTimeout(() => setShake(false), 500);
        }
        setTimeout(() => setFlash(null), 1300);
    };
    const required = puzzle.required || [];
    const reqFound = found.filter((w) => required.includes(w));
    const bonusFound = found.filter((w) => !required.includes(w) && (puzzle.targets || []).includes(w));
    const root = getRoot(puzzle); // ✅ FIXED
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            position: "relative",
            border: `1px solid ${constants_1.COLORS.blackLine}`,
            borderRadius: "4px",
            padding: "1rem",
            background: `linear-gradient(180deg, ${constants_1.COLORS.surface2}, ${constants_1.COLORS.surface})`,
        }, children: [(0, jsx_runtime_1.jsx)(SystemMesh, { intensity: 1 }), (0, jsx_runtime_1.jsxs)("div", { style: { position: "relative", zIndex: 1 }, children: [!revealed && ((0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: "1.1rem" }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: "8px", marginBottom: "0.45rem" }, children: [(0, jsx_runtime_1.jsx)("input", { ref: ref, value: input, onChange: (e) => {
                                            startInteraction();
                                            setInput(e.target.value.toLowerCase());
                                        }, onKeyDown: (e) => e.key === "Enter" && submit(), placeholder: `build a word using "${root}"…`, style: {
                                            ...S.input,
                                            border: `1px solid ${shake ? constants_1.COLORS.red : constants_1.COLORS.blackLine}`,
                                            animation: shake ? "shake 0.4s ease" : "none",
                                            flex: 1,
                                            boxShadow: shake
                                                ? `0 0 0 3px ${constants_1.COLORS.redGlow}`
                                                : "0 0 0 rgba(0,0,0,0)",
                                        } }), (0, jsx_runtime_1.jsx)("button", { className: "deriv-btn-primary", style: S.btnPrimary, onClick: submit, children: "enter" })] }), flash && ((0, jsx_runtime_1.jsx)("div", { style: {
                                    ...S.mono,
                                    fontSize: "0.65rem",
                                    color: flash.ok
                                        ? flash.bonus
                                            ? constants_1.COLORS.cyan
                                            : constants_1.COLORS.gold
                                        : constants_1.COLORS.red,
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                }, children: flash.msg })), timedSettings.timedMode && !revealed && ((0, jsx_runtime_1.jsxs)("div", { style: { ...S.mono, fontSize: "0.55rem", color: constants_1.COLORS.textMuted, letterSpacing: "0.1em" }, children: ["time left: ", remainingSec ?? timedSettings.timeLimitSec, "s"] }))] })), (0, jsx_runtime_1.jsxs)("div", { style: {
                            ...S.mono,
                            fontSize: "0.58rem",
                            color: constants_1.COLORS.textFaint,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            marginBottom: "0.55rem",
                        }, children: [reqFound.length, "/", required.length, " found", bonusFound.length > 0 ? ` · +${bonusFound.length} related` : ""] }), (0, jsx_runtime_1.jsx)("div", { style: { display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "0.55rem" }, children: required.map((w) => {
                            const f = found.includes(w);
                            return ((0, jsx_runtime_1.jsx)("div", { className: f ? "gold-shimmer" : undefined, style: {
                                    ...S.mono,
                                    fontSize: "0.78rem",
                                    padding: "0.3rem 0.62rem",
                                    borderRadius: "2px",
                                    background: f
                                        ? "linear-gradient(180deg, rgba(232,184,75,0.15), rgba(232,184,75,0.05))"
                                        : constants_1.COLORS.surface,
                                    border: f
                                        ? `1px solid ${constants_1.COLORS.goldDim}`
                                        : `1px solid ${constants_1.COLORS.blackLine}`,
                                    color: f ? constants_1.COLORS.gold : "#1e1808",
                                    transition: "all 0.25s ease",
                                    boxShadow: f ? `0 0 16px ${constants_1.COLORS.goldGlow}` : "none",
                                }, children: f ? w : "·".repeat(Math.max(3, w.length)) }, w));
                        }) }), bonusFound.length > 0 && ((0, jsx_runtime_1.jsx)("div", { style: { display: "flex", flexWrap: "wrap", gap: "5px" }, children: bonusFound.map((w) => ((0, jsx_runtime_1.jsxs)("div", { className: "cyan-shimmer", style: {
                                ...S.mono,
                                fontSize: "0.7rem",
                                padding: "0.24rem 0.52rem",
                                borderRadius: "2px",
                                background: "rgba(78,207,207,0.08)",
                                border: `1px solid rgba(78,207,207,0.4)`,
                                color: constants_1.COLORS.cyan,
                                boxShadow: `0 0 16px ${constants_1.COLORS.cyanGlow}`,
                            }, children: [w, (0, jsx_runtime_1.jsx)("span", { style: { color: constants_1.COLORS.cyanDim, fontSize: "0.58rem" }, children: "related" })] }, w))) }))] }), (0, jsx_runtime_1.jsx)("div", { style: { position: "relative", height: "320px", marginTop: "0.75rem" }, children: (0, jsx_runtime_1.jsx)(RootGraph_1.default, { root: root, required: required, found: found, bonus: bonusFound }) })] }));
};
const StepPuzzle = ({ puzzle, state, onState, revealed, }) => {
    const steps = puzzle.steps || [];
    const stepAnswers = state.stepAnswers || {};
    const [flash, setFlash] = (0, react_1.useState)(null);
    const [locked, setLocked] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        setFlash(null);
        setLocked(false);
    }, [puzzle.date, puzzle.type]);
    const currentIdx = steps.findIndex((_, i) => stepAnswers[i] === undefined);
    const allDone = steps.length > 0 && currentIdx === -1;
    const currentStep = allDone ? null : (steps[currentIdx] ?? null);
    const classifyEntries = steps.reduce((acc, s, i) => { if (s.type === "CLASSIFY")
        acc.push({ s, i }); return acc; }, []);
    const totalClassify = classifyEntries.length;
    const correctClassify = classifyEntries.filter(({ s, i }) => stepAnswers[i] === s.correct).length;
    const answeredCount = Object.keys(stepAnswers).length;
    const progressPct = steps.length > 0 ? (answeredCount / steps.length) * 100 : 0;
    const submitAnswer = (answer) => {
        if (locked || currentIdx === -1 || !currentStep)
            return;
        if (currentStep.type === "INFO") {
            onState({ ...state, stepAnswers: { ...stepAnswers, [currentIdx]: "__info__" } });
            return;
        }
        const correct = currentStep.correct;
        const isCorrect = answer === correct;
        setFlash({ correct: isCorrect, text: isCorrect ? "correct" : `wrong — ${correct}` });
        setLocked(true);
        setTimeout(() => {
            setFlash(null);
            setLocked(false);
            onState({ ...state, stepAnswers: { ...stepAnswers, [currentIdx]: answer } });
        }, 900);
    };
    const cardStyle = {
        position: "relative",
        border: `1px solid ${constants_1.COLORS.blackLine}`,
        borderRadius: "4px",
        padding: "1rem",
        background: `linear-gradient(180deg, ${constants_1.COLORS.surface2}, ${constants_1.COLORS.surface})`,
        overflow: "hidden",
    };
    const renderOptions = (options) => ((0, jsx_runtime_1.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: "7px" }, children: options.map((opt) => ((0, jsx_runtime_1.jsx)("button", { disabled: locked, onClick: () => submitAnswer(opt), className: "deriv-btn", style: { ...S.btnSm, width: "100%", textAlign: "left", padding: "0.6rem 0.9rem", fontSize: "0.72rem", opacity: locked ? 0.55 : 1, cursor: locked ? "default" : "pointer", letterSpacing: "0.04em" }, children: opt }, opt))) }));
    if (allDone || revealed) {
        return ((0, jsx_runtime_1.jsxs)("div", { style: cardStyle, children: [(0, jsx_runtime_1.jsx)(SystemMesh, { intensity: 0.85 }), (0, jsx_runtime_1.jsxs)("div", { style: { position: "relative", zIndex: 1 }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { ...S.mono, fontSize: "0.56rem", letterSpacing: "0.14em", textTransform: "uppercase", color: constants_1.COLORS.textFaint, marginBottom: "0.85rem" }, children: [correctClassify, " / ", totalClassify, " classified correctly"] }), (0, jsx_runtime_1.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: "5px" }, children: classifyEntries.map(({ s: step, i }) => {
                                const answer = stepAnswers[i];
                                const isCorrect = answer === step.correct;
                                return ((0, jsx_runtime_1.jsxs)("div", { style: {
                                        display: "flex",
                                        alignItems: "baseline",
                                        gap: "0.65rem",
                                        padding: "0.35rem 0.6rem",
                                        borderRadius: "3px",
                                        background: isCorrect ? "rgba(232,184,75,0.07)" : "rgba(139,58,58,0.07)",
                                        border: `1px solid ${isCorrect ? "rgba(232,184,75,0.18)" : "rgba(139,58,58,0.18)"}`,
                                    }, children: [(0, jsx_runtime_1.jsx)("span", { style: { ...S.mono, fontSize: "0.82rem", color: constants_1.COLORS.textPrimary, minWidth: "80px" }, children: step.word }), (0, jsx_runtime_1.jsx)("span", { style: { ...S.mono, fontSize: "0.55rem", color: constants_1.COLORS.textFaint }, children: "\u2192" }), (0, jsx_runtime_1.jsxs)("span", { style: { ...S.mono, fontSize: "0.65rem", color: isCorrect ? constants_1.COLORS.gold : constants_1.COLORS.red, flex: 1 }, children: [answer || "—", revealed && !isCorrect && ((0, jsx_runtime_1.jsxs)("span", { style: { color: constants_1.COLORS.textFaint, marginLeft: "0.5rem" }, children: ["(was: ", step.correct, ")"] }))] }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: "0.7rem", color: isCorrect ? constants_1.COLORS.gold : constants_1.COLORS.red }, children: isCorrect ? "✓" : "✗" })] }, step.word + i));
                            }) })] })] }));
    }
    if (!currentStep)
        return null;
    return ((0, jsx_runtime_1.jsxs)("div", { style: cardStyle, children: [(0, jsx_runtime_1.jsx)(SystemMesh, { intensity: 0.92 }), (0, jsx_runtime_1.jsxs)("div", { style: { position: "relative", zIndex: 1 }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: "1.1rem" }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { ...S.mono, fontSize: "0.54rem", color: constants_1.COLORS.textFaint, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "0.3rem" }, children: ["step ", answeredCount + 1, " of ", steps.length] }), (0, jsx_runtime_1.jsx)("div", { style: { height: "2px", background: "rgba(232,184,75,0.12)", borderRadius: "1px" }, children: (0, jsx_runtime_1.jsx)("div", { style: { height: "100%", width: `${progressPct}%`, background: constants_1.COLORS.goldDim, borderRadius: "1px", transition: "width 0.35s ease" } }) })] }), currentStep.type === "CLASSIFY" && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { style: { ...S.mono, fontSize: "0.54rem", color: constants_1.COLORS.textFaint, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "0.75rem" }, children: "classify this word" }), (0, jsx_runtime_1.jsx)("div", { style: { fontSize: "2rem", fontWeight: 600, color: constants_1.COLORS.textPrimary, letterSpacing: "0.03em", marginBottom: "1.4rem", textShadow: "0 0 20px rgba(232,184,75,0.12)" }, children: currentStep.word }), renderOptions(currentStep.options)] })), currentStep.type === "GUESS_SYSTEM" && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { style: { ...S.mono, fontSize: "0.54rem", color: constants_1.COLORS.textFaint, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "0.75rem" }, children: "what system underlies these words?" }), renderOptions(currentStep.options)] })), currentStep.type === "INFO" && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { style: { ...S.mono, fontSize: "0.72rem", color: constants_1.COLORS.textSecondary, lineHeight: 1.6, padding: "0.75rem 0 1rem" }, children: currentStep.text }), (0, jsx_runtime_1.jsx)("button", { onClick: () => submitAnswer("__info__"), className: "deriv-btn", style: { ...S.btnSm, padding: "0.5rem 1.1rem", fontSize: "0.68rem", letterSpacing: "0.06em" }, children: "continue" })] })), flash !== null && ((0, jsx_runtime_1.jsx)("div", { style: { ...S.mono, fontSize: "0.63rem", letterSpacing: "0.1em", textTransform: "uppercase", color: flash.correct ? constants_1.COLORS.gold : constants_1.COLORS.red, marginTop: "0.9rem" }, children: flash.text }))] })] }));
};
const MatchPuzzle = ({ puzzle, state, onState, revealed, timedSettings, }) => {
    const pairs = puzzle.pairs || [];
    const choices = Array.from(new Set(pairs.map((pair) => pair.target)));
    const selected = state?.assigned || {};
    const correctCount = pairs.filter((pair) => selected[pair.source] === pair.target).length;
    const [timeoutFlash, setTimeoutFlash] = (0, react_1.useState)(false);
    const { remainingSec, startInteraction, resetInteraction } = useTimedInteraction({
        ...timedSettings,
        onTimeout: () => {
            setTimeoutFlash(true);
            setTimeout(() => setTimeoutFlash(false), 1200);
        },
        resetKey: `${puzzle.date}-${puzzle.type}-match`,
    });
    const onChange = (source, target) => {
        startInteraction();
        onState({ ...state, assigned: { ...selected, [source]: target } });
        resetInteraction();
    };
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            border: `1px solid ${constants_1.COLORS.blackLine}`,
            borderRadius: "4px",
            padding: "1rem",
            background: `linear-gradient(180deg, ${constants_1.COLORS.surface2}, ${constants_1.COLORS.surface})`,
        }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { ...S.mono, fontSize: "0.58rem", color: constants_1.COLORS.textFaint, marginBottom: "0.75rem" }, children: [correctCount, "/", pairs.length, " matched correctly"] }), timedSettings.timedMode && ((0, jsx_runtime_1.jsx)("div", { style: { ...S.mono, fontSize: "0.55rem", color: timeoutFlash ? constants_1.COLORS.red : constants_1.COLORS.textMuted, marginBottom: "0.6rem", letterSpacing: "0.1em" }, children: timeoutFlash ? "time expired" : `time left: ${remainingSec ?? timedSettings.timeLimitSec}s` })), (0, jsx_runtime_1.jsx)("div", { style: { display: "grid", gap: "0.6rem" }, children: pairs.map((pair) => {
                    const chosen = selected[pair.source] || "";
                    const isCorrect = chosen === pair.target;
                    return ((0, jsx_runtime_1.jsxs)("div", { style: {
                            display: "grid",
                            gridTemplateColumns: "minmax(120px, 1fr) 1.4fr",
                            gap: "0.5rem",
                            alignItems: "center",
                        }, children: [(0, jsx_runtime_1.jsx)("div", { style: { ...S.mono, color: constants_1.COLORS.cyan, fontSize: "0.8rem" }, children: pair.source }), (0, jsx_runtime_1.jsxs)("select", { value: chosen, disabled: revealed, onChange: (e) => onChange(pair.source, e.target.value), style: {
                                    ...S.input,
                                    fontSize: "0.74rem",
                                    color: revealed && isCorrect ? constants_1.COLORS.gold : constants_1.COLORS.textPrimary,
                                    borderColor: revealed ? (isCorrect ? constants_1.COLORS.goldDim : constants_1.COLORS.red) : constants_1.COLORS.blackLine,
                                }, children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "select gloss\u2026" }), choices.map((choice) => ((0, jsx_runtime_1.jsx)("option", { value: choice, children: choice }, choice)))] })] }, pair.source));
                }) })] }));
};
const GrimmPuzzle = ({ puzzle, state, onState, revealed, timedSettings, }) => {
    const answers = state?.answers || {};
    const [inputs, setInputs] = (0, react_1.useState)({});
    const [feedback, setFeedback] = (0, react_1.useState)({});
    const [timerExpired, setTimerExpired] = (0, react_1.useState)(false);
    const pairs = puzzle.pairs || [];
    const { remainingSec, startInteraction, resetInteraction } = useTimedInteraction({
        ...timedSettings,
        onTimeout: () => {
            setTimerExpired(true);
            setTimeout(() => setTimerExpired(false), 1200);
        },
        resetKey: `${puzzle.date}-${puzzle.type}-grimm`,
    });
    const submit = (idx) => {
        const val = (inputs[idx] || "").trim().toLowerCase();
        if (!val)
            return;
        resetInteraction();
        const pair = pairs[idx];
        if (!pair)
            return;
        const correct = val === pair.target.toLowerCase();
        const newAnswers = { ...answers };
        if (correct)
            newAnswers[idx] = val;
        onState({ ...state, answers: newAnswers });
        setFeedback((f) => ({ ...f, [idx]: correct ? "correct" : "wrong" }));
        if (correct)
            setInputs((i) => ({ ...i, [idx]: "" }));
        setTimeout(() => setFeedback((f) => ({ ...f, [idx]: null })), 1200);
    };
    const correctCount = Object.keys(answers).length;
    const total = pairs.length;
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            position: "relative",
            border: `1px solid ${constants_1.COLORS.blackLine}`,
            borderRadius: "4px",
            padding: "1rem",
            background: `linear-gradient(180deg, ${constants_1.COLORS.surface2}, ${constants_1.COLORS.surface})`,
            overflow: "hidden",
        }, children: [(0, jsx_runtime_1.jsx)(SystemMesh, { intensity: 0.88 }), (0, jsx_runtime_1.jsxs)("div", { style: { position: "relative", zIndex: 1 }, children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                            ...S.mono,
                            fontSize: "0.58rem",
                            color: constants_1.COLORS.textFaint,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            marginBottom: "0.75rem",
                        }, children: [correctCount, "/", total, " found"] }), timedSettings.timedMode && ((0, jsx_runtime_1.jsx)("div", { style: { ...S.mono, fontSize: "0.55rem", color: timerExpired ? constants_1.COLORS.red : constants_1.COLORS.textMuted, marginBottom: "0.6rem", letterSpacing: "0.1em" }, children: timerExpired ? "time expired" : `time left: ${remainingSec ?? timedSettings.timeLimitSec}s` })), (0, jsx_runtime_1.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: "10px" }, children: pairs.map((pair, idx) => {
                            const solved = !!answers[idx] || revealed;
                            const fb = feedback[idx];
                            return ((0, jsx_runtime_1.jsxs)("div", { style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    background: `linear-gradient(180deg, ${constants_1.COLORS.surface2}, ${constants_1.COLORS.surface})`,
                                    border: `1px solid ${constants_1.COLORS.blackLine}`,
                                    borderRadius: "3px",
                                    padding: "0.6rem 0.75rem",
                                }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                                            flex: "0 0 220px",
                                            ...S.mono,
                                            fontSize: "0.78rem",
                                            color: constants_1.COLORS.textSecondary,
                                            lineHeight: 1.4,
                                        }, children: pair.source }), (0, jsx_runtime_1.jsx)("div", { style: { ...S.mono, fontSize: "0.65rem", color: constants_1.COLORS.textFaint, flexShrink: 0 }, children: "\u2192" }), solved ? ((0, jsx_runtime_1.jsxs)("div", { style: { ...S.mono, fontSize: "0.85rem", color: constants_1.COLORS.gold, flex: 1 }, children: [pair.target, pair.note && ((0, jsx_runtime_1.jsx)("span", { style: { color: constants_1.COLORS.textMuted, fontSize: "0.62rem", marginLeft: "0.5rem" }, children: pair.note }))] })) : ((0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: "6px", flex: 1 }, children: [(0, jsx_runtime_1.jsx)("input", { value: inputs[idx] || "", onChange: (e) => {
                                                    startInteraction();
                                                    setInputs((i) => ({ ...i, [idx]: e.target.value.toLowerCase() }));
                                                }, onKeyDown: (e) => e.key === "Enter" && submit(idx), placeholder: "english word\u2026", style: {
                                                    ...S.input,
                                                    flex: 1,
                                                    padding: "0.3rem 0.55rem",
                                                    fontSize: "0.78rem",
                                                    border: `1px solid ${fb === "wrong" ? constants_1.COLORS.red : constants_1.COLORS.blackLine}`,
                                                } }), (0, jsx_runtime_1.jsx)("button", { className: "deriv-btn-primary", style: { ...S.btnPrimary, padding: "0.3rem 0.55rem", fontSize: "0.62rem" }, onClick: () => submit(idx), children: "\u2192" })] })), fb && !solved && ((0, jsx_runtime_1.jsx)("div", { style: {
                                            ...S.mono,
                                            fontSize: "0.6rem",
                                            color: fb === "correct" ? constants_1.COLORS.gold : constants_1.COLORS.red,
                                            letterSpacing: "0.1em",
                                            textTransform: "uppercase",
                                            flexShrink: 0,
                                        }, children: fb }))] }, idx));
                        }) })] })] }));
};
const SemanticPuzzle = ({ puzzle, state, onState, revealed, timedSettings, }) => {
    const answers = state?.answers || {};
    const [inputs, setInputs] = (0, react_1.useState)({});
    const [feedback, setFeedback] = (0, react_1.useState)({});
    const [timerExpired, setTimerExpired] = (0, react_1.useState)(false);
    const timeline = puzzle.timeline || [];
    const blanks = timeline.filter((t) => t.blank);
    const correctCount = blanks.filter((_, i) => answers[i]).length;
    const { remainingSec, startInteraction, resetInteraction } = useTimedInteraction({
        ...timedSettings,
        onTimeout: () => {
            setTimerExpired(true);
            setTimeout(() => setTimerExpired(false), 1200);
        },
        resetKey: `${puzzle.date}-${puzzle.type}-semantic`,
    });
    const submit = (blankIdx, correctMeaning) => {
        const val = (inputs[blankIdx] || "").trim().toLowerCase();
        if (!val)
            return;
        resetInteraction();
        const keywords = correctMeaning
            .toLowerCase()
            .split(/[\s,;:—–-]+/)
            .filter((w) => w.length > 3);
        const isClose = keywords.some((k) => val.includes(k) || k.includes(val));
        if (isClose) {
            onState({ ...state, answers: { ...answers, [blankIdx]: val } });
            setFeedback((f) => ({ ...f, [blankIdx]: "correct" }));
        }
        else {
            setFeedback((f) => ({ ...f, [blankIdx]: "wrong" }));
        }
        setTimeout(() => setFeedback((f) => ({ ...f, [blankIdx]: null })), 1200);
    };
    let blankIdx = 0;
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            position: "relative",
            border: `1px solid ${constants_1.COLORS.blackLine}`,
            borderRadius: "4px",
            padding: "1rem",
            background: `linear-gradient(180deg, ${constants_1.COLORS.surface2}, ${constants_1.COLORS.surface})`,
            overflow: "hidden",
        }, children: [(0, jsx_runtime_1.jsx)(SystemMesh, { intensity: 0.82 }), (0, jsx_runtime_1.jsxs)("div", { style: { position: "relative", zIndex: 1 }, children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                            ...S.mono,
                            fontSize: "0.72rem",
                            color: constants_1.COLORS.gold,
                            letterSpacing: "0.08em",
                            marginBottom: "0.9rem",
                            fontStyle: "italic",
                        }, children: ["\"", puzzle.word, "\""] }), (0, jsx_runtime_1.jsxs)("div", { style: {
                            ...S.mono,
                            fontSize: "0.58rem",
                            color: constants_1.COLORS.textFaint,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            marginBottom: "0.75rem",
                        }, children: [correctCount, "/", blanks.length, " filled"] }), timedSettings.timedMode && ((0, jsx_runtime_1.jsx)("div", { style: { ...S.mono, fontSize: "0.55rem", color: timerExpired ? constants_1.COLORS.red : constants_1.COLORS.textMuted, marginBottom: "0.6rem", letterSpacing: "0.1em" }, children: timerExpired ? "time expired" : `time left: ${remainingSec ?? timedSettings.timeLimitSec}s` })), (0, jsx_runtime_1.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: 0 }, children: timeline.map((item, idx) => {
                            const isBlank = item.blank;
                            const myBlankIdx = isBlank ? blankIdx++ : -1;
                            const solved = isBlank && (!!answers[myBlankIdx] || revealed);
                            const fb = isBlank ? feedback[myBlankIdx] : null;
                            const isLast = idx === timeline.length - 1;
                            return ((0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: 0, alignItems: "stretch" }, children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            flexShrink: 0,
                                            width: "20px",
                                        }, children: [(0, jsx_runtime_1.jsx)("div", { style: { width: "2px", flex: 1, background: idx === 0 ? "transparent" : constants_1.COLORS.blackLine } }), (0, jsx_runtime_1.jsx)("div", { style: {
                                                    width: "8px",
                                                    height: "8px",
                                                    borderRadius: "50%",
                                                    background: solved || !isBlank ? constants_1.COLORS.gold : constants_1.COLORS.blackLine,
                                                    flexShrink: 0,
                                                    border: `1px solid ${constants_1.COLORS.goldDim}`,
                                                    boxShadow: solved ? `0 0 12px ${constants_1.COLORS.goldGlow}` : "none",
                                                } }), (0, jsx_runtime_1.jsx)("div", { style: {
                                                    width: "2px",
                                                    flex: 1,
                                                    background: isLast ? "transparent" : constants_1.COLORS.blackLine,
                                                } })] }), (0, jsx_runtime_1.jsxs)("div", { style: {
                                            paddingLeft: "0.75rem",
                                            paddingTop: "0.15rem",
                                            paddingBottom: "0.75rem",
                                            flex: 1,
                                        }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                                                    ...S.mono,
                                                    fontSize: "0.62rem",
                                                    color: constants_1.COLORS.textMuted,
                                                    letterSpacing: "0.1em",
                                                    textTransform: "uppercase",
                                                    marginBottom: "0.2rem",
                                                }, children: item.era }), isBlank && !solved ? ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: "6px" }, children: [(0, jsx_runtime_1.jsx)("input", { value: inputs[myBlankIdx] || "", onChange: (e) => {
                                                                    startInteraction();
                                                                    setInputs((i) => ({ ...i, [myBlankIdx]: e.target.value }));
                                                                }, onKeyDown: (e) => e.key === "Enter" && submit(myBlankIdx, item.meaning), placeholder: "what did it mean here?", style: {
                                                                    ...S.input,
                                                                    flex: 1,
                                                                    padding: "0.3rem 0.55rem",
                                                                    fontSize: "0.78rem",
                                                                    border: `1px solid ${fb === "wrong" ? constants_1.COLORS.red : constants_1.COLORS.blackLine}`,
                                                                } }), (0, jsx_runtime_1.jsx)("button", { className: "deriv-btn-primary", style: { ...S.btnPrimary, padding: "0.3rem 0.6rem", fontSize: "0.62rem" }, onClick: () => submit(myBlankIdx, item.meaning), children: "\u2192" })] }), fb && ((0, jsx_runtime_1.jsx)("div", { style: {
                                                            ...S.mono,
                                                            fontSize: "0.6rem",
                                                            color: fb === "correct" ? constants_1.COLORS.gold : constants_1.COLORS.red,
                                                            letterSpacing: "0.08em",
                                                            textTransform: "uppercase",
                                                            marginTop: "0.25rem",
                                                        }, children: fb }))] })) : ((0, jsx_runtime_1.jsx)("div", { style: {
                                                    fontSize: "0.82rem",
                                                    color: isBlank ? constants_1.COLORS.gold : constants_1.COLORS.textSecondary,
                                                    lineHeight: 1.5,
                                                }, children: item.meaning }))] })] }, idx));
                        }) })] })] }));
};
const IdiomPuzzle = ({ puzzle, state, onState, revealed, timedSettings, }) => {
    const [input, setInput] = (0, react_1.useState)("");
    const [flash, setFlash] = (0, react_1.useState)(null);
    const [shake, setShake] = (0, react_1.useState)(false);
    const ref = (0, react_1.useRef)(null);
    const answer = puzzle.answer || "";
    const answerWords = answer.split(" ");
    const idiomFound = state?.idiomFound || [];
    (0, react_1.useEffect)(() => {
        setTimeout(() => ref.current?.focus(), 100);
    }, []);
    const { remainingSec, startInteraction, resetInteraction } = useTimedInteraction({
        ...timedSettings,
        onTimeout: () => {
            setShake(true);
            setFlash({ msg: "time expired", ok: false });
            setTimeout(() => setShake(false), 500);
            setTimeout(() => setFlash(null), 1400);
        },
        resetKey: `${puzzle.date}-${puzzle.type}-idiom`,
    });
    const isAllFound = idiomFound.length === answerWords.length;
    const isComplete = isAllFound || revealed;
    const color = constants_1.TYPE_COLORS["IDIOM"];
    const submit = () => {
        const raw = input.trim().toLowerCase();
        setInput("");
        if (!raw)
            return;
        resetInteraction();
        // Full-phrase entry: reveal all positions at once
        if (raw === answer.toLowerCase()) {
            const allIndices = answerWords.map((_, i) => i);
            onState({ ...state, idiomFound: allIndices });
            setFlash({ msg: "expression reconstructed", ok: true });
            setTimeout(() => setFlash(null), 1400);
            return;
        }
        // Single-word entry: match against individual words in the phrase
        const w = raw;
        // All positions in the phrase that match this word
        const allPositions = answerWords
            .map((aw, i) => ({ lower: aw.toLowerCase(), i }))
            .filter(({ lower }) => lower === w);
        // Positions that haven't been found yet
        const newPositions = allPositions
            .filter(({ i }) => !idiomFound.includes(i))
            .map(({ i }) => i);
        if (newPositions.length > 0) {
            onState({ ...state, idiomFound: [...idiomFound, ...newPositions] });
            setFlash({ msg: newPositions.length > 1 ? `×${newPositions.length} found` : "correct", ok: true });
        }
        else if (allPositions.length > 0) {
            setFlash({ msg: "already found", ok: false });
            setShake(true);
            setTimeout(() => setShake(false), 500);
        }
        else {
            setFlash({ msg: "not in this phrase", ok: false });
            setShake(true);
            setTimeout(() => setShake(false), 500);
        }
        setTimeout(() => setFlash(null), 1400);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            position: "relative",
            border: `1px solid ${constants_1.COLORS.blackLine}`,
            borderRadius: "4px",
            padding: "1rem",
            background: `linear-gradient(180deg, ${constants_1.COLORS.surface2}, ${constants_1.COLORS.surface})`,
        }, children: [(0, jsx_runtime_1.jsx)(SystemMesh, { intensity: 0.85 }), (0, jsx_runtime_1.jsxs)("div", { style: { position: "relative", zIndex: 1 }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "10px",
                            marginBottom: "1.1rem",
                            padding: "0.85rem 0.75rem",
                            background: isAllFound ? `${color}09` : "rgba(255,255,255,0.02)",
                            border: `1px solid ${isAllFound ? color + "44" : constants_1.COLORS.blackLine}`,
                            borderRadius: "3px",
                            boxShadow: isAllFound ? `0 0 24px ${color}18` : "none",
                            transition: "all 0.35s ease",
                        }, children: answerWords.map((word, i) => {
                            const found = idiomFound.includes(i) || revealed;
                            return ((0, jsx_runtime_1.jsxs)("div", { style: {
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "3px",
                                }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                                            ...S.mono,
                                            fontSize: "0.9rem",
                                            letterSpacing: "0.06em",
                                            color: found
                                                ? isAllFound
                                                    ? color
                                                    : constants_1.COLORS.textPrimary
                                                : "transparent",
                                            borderBottom: found
                                                ? `1px solid ${isAllFound ? color + "88" : constants_1.COLORS.goldDark}`
                                                : `1px solid ${constants_1.COLORS.textFaint}`,
                                            minWidth: `${word.length * 0.62}rem`,
                                            textAlign: "center",
                                            paddingBottom: "1px",
                                            transition: "color 0.25s ease, border-color 0.25s ease",
                                        }, children: found ? word : "\u00a0".repeat(word.length) }), !found && ((0, jsx_runtime_1.jsx)("span", { style: {
                                            ...S.mono,
                                            fontSize: "0.5rem",
                                            color: constants_1.COLORS.textFaint,
                                            letterSpacing: "0.08em",
                                        }, children: word.length }))] }, i));
                        }) }), !isComplete && ((0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: "0.65rem" }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: "8px", marginBottom: "0.45rem" }, children: [(0, jsx_runtime_1.jsx)("input", { ref: ref, value: input, onChange: (e) => {
                                            startInteraction();
                                            setInput(e.target.value.toLowerCase());
                                        }, onKeyDown: (e) => e.key === "Enter" && submit(), placeholder: "guess a word\u2026", style: {
                                            ...S.input,
                                            border: `1px solid ${shake ? constants_1.COLORS.red : constants_1.COLORS.blackLine}`,
                                            animation: shake ? "shake 0.4s ease" : "none",
                                            flex: 1,
                                            boxShadow: shake ? `0 0 0 3px ${constants_1.COLORS.redGlow}` : "none",
                                        } }), (0, jsx_runtime_1.jsx)("button", { className: "deriv-btn-primary", style: S.btnPrimary, onClick: submit, children: "enter" })] }), flash && ((0, jsx_runtime_1.jsx)("div", { style: {
                                    ...S.mono,
                                    fontSize: "0.65rem",
                                    color: flash.ok ? color : constants_1.COLORS.red,
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                }, children: flash.msg })), timedSettings.timedMode && ((0, jsx_runtime_1.jsxs)("div", { style: { ...S.mono, fontSize: "0.55rem", color: constants_1.COLORS.textMuted, letterSpacing: "0.1em" }, children: ["time left: ", remainingSec ?? timedSettings.timeLimitSec, "s"] }))] })), isAllFound && !revealed && ((0, jsx_runtime_1.jsx)("div", { style: {
                            ...S.mono,
                            fontSize: "0.6rem",
                            color,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            marginBottom: "0.65rem",
                            animation: "textGlow 2s ease-in-out infinite",
                        }, children: "expression reconstructed \u25C8" })), (0, jsx_runtime_1.jsxs)("div", { style: {
                            ...S.mono,
                            fontSize: "0.56rem",
                            color: constants_1.COLORS.textFaint,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            marginTop: "0.25rem",
                        }, children: [idiomFound.length, "/", answerWords.length, " words found"] })] })] }));
};
function Derivative() {
    const isFirstTime = !load()._hasPlayed;
    const [view, setView] = (0, react_1.useState)(isFirstTime ? "splash" : "ready");
    const [selDate, setSelDate] = (0, react_1.useState)(null);
    const [puzzle, setPuzzle] = (0, react_1.useState)(null);
    const [progress, setProgress] = (0, react_1.useState)(load());
    const [timedSettings, setTimedSettings] = (0, react_1.useState)((0, timedMode_1.loadTimedModeSettings)());
    const [revealed, setRevealed] = (0, react_1.useState)(false);
    const [puzzleState, setPuzzleState] = (0, react_1.useState)({});
    const [shareMsg, setShareMsg] = (0, react_1.useState)(null);
    const today = getTodayStr();
    const archiveDates = (0, react_1.useMemo)(() => getMonthDates(today), [today]);
    (0, react_1.useEffect)(() => {
        (0, timedMode_1.saveTimedModeSettings)(timedSettings);
    }, [timedSettings]);
    const getProgress = (dateStr) => {
        const entry = progress[dateStr];
        return isPuzzleProgressEntry(entry) ? entry : {};
    };
    const openPuzzle = (dateStr) => {
        const p = getPuzzleForDate(dateStr);
        if (!p)
            return;
        const saved = getProgress(dateStr);
        setSelDate(dateStr);
        setPuzzle(p);
        setRevealed(saved.revealed || false);
        setPuzzleState(saved.state || {});
        setShareMsg(null);
        const data = load();
        if (!data._hasPlayed)
            save({ ...data, _hasPlayed: true });
        setView("game");
    };
    const updProgress = (dateStr, newState, newRevealed, discoveredType) => {
        const baseNext = { ...progress, [dateStr]: { state: newState, revealed: newRevealed } };
        let next = baseNext;
        if (discoveredType) {
            const discovery = (0, progressSystems_1.withDiscoveredSystem)(baseNext, discoveredType);
            next = discovery.nextStore;
            if (discovery.wasAdded && discovery.uncoveredSystem) {
                console.log(`You uncovered: ${discovery.uncoveredSystem}`);
            }
        }
        setProgress(next);
        save(next);
    };
    const handlePuzzleState = (newState) => {
        if (!selDate)
            return;
        setPuzzleState(newState);
        const unlockedByCompletion = puzzle && isComplete(newState);
        updProgress(selDate, newState, revealed, unlockedByCompletion ? puzzle.type : undefined);
    };
    const handleWordFound = (word, _isRequired) => {
        if (!selDate)
            return;
        const current = puzzleState.found || [];
        const newFound = current.includes(word) ? current : [...current, word];
        const nextState = { ...puzzleState, found: newFound };
        setPuzzleState(nextState);
        const unlockedByCompletion = puzzle && isComplete(nextState);
        updProgress(selDate, nextState, revealed, unlockedByCompletion ? puzzle.type : undefined);
    };
    const handleReveal = () => {
        if (!selDate || !puzzle)
            return;
        setRevealed(true);
        updProgress(selDate, puzzleState, true, puzzle.type);
    };
    const isComplete = (state = puzzleState) => {
        if (!puzzle)
            return false;
        if (puzzle.type === "ROOT") {
            return (puzzle.required || []).every((w) => (state.found || []).includes(w));
        }
        if (puzzle.type === "GRIMM") {
            return (puzzle.pairs || []).every((_, i) => state.answers?.[i]);
        }
        if (puzzle.type === "SEMANTIC") {
            const blanks = (puzzle.timeline || []).filter((t) => t.blank);
            return blanks.every((_, i) => state.answers?.[i]);
        }
        if (["SUPPLETIVE", "PIE", "COLLISION", "DECEPTION", "FALSE_FAMILY", "PHANTOM_ROOT", "BORROWED", "TOPONYM"].includes(puzzle.type)) {
            const steps = puzzle.steps || [];
            const sa = state.stepAnswers || {};
            const classifyIdxs = steps.map((s, i) => ({ s, i })).filter(({ s }) => s.type === "CLASSIFY").map(({ i }) => i);
            return classifyIdxs.length > 0 && classifyIdxs.every((i) => sa[i] !== undefined);
        }
        if (puzzle.type === "MATCH") {
            const assigned = state.assigned || {};
            return (puzzle.pairs || []).every((pair) => assigned[pair.source] === pair.target);
        }
        if (puzzle.type === "IDIOM") {
            const idiomFound = state.idiomFound || [];
            return idiomFound.length === (puzzle.answer || "").split(" ").length;
        }
        return false;
    };
    const buildShare = () => {
        if (!puzzle || !selDate)
            return;
        const toRoman = (n) => {
            const v = [
                [1000, "M"],
                [900, "CM"],
                [500, "D"],
                [400, "CD"],
                [100, "C"],
                [90, "XC"],
                [50, "L"],
                [40, "XL"],
                [10, "X"],
                [9, "IX"],
                [5, "V"],
                [4, "IV"],
                [1, "I"],
            ];
            let r = "";
            for (const [val, s] of v) {
                while (n >= val) {
                    r += s;
                    n -= val;
                }
            }
            return r;
        };
        const [yearRaw, monthRaw, dayRaw] = selDate.split("-").map(Number);
        const year = yearRaw ?? new Date().getFullYear();
        const month = monthRaw ?? new Date().getMonth() + 1;
        const day = dayRaw ?? new Date().getDate();
        const dateRoman = `${toRoman(day)} · ${toRoman(month)} · ${toRoman(year)}`;
        const diffLevel = (0, difficulty_1.getDifficulty)(puzzle.type, puzzle.lensId ?? "DEFAULT");
        const diffIcon = DIFFICULTY_SHARE_ICONS[diffLevel] || "○";
        const typeIcon = TYPE_SHARE_ICONS[puzzle.type] || "◇";
        const iconRow = `◈  ${diffIcon}  ${typeIcon}`;
        let tracker = "";
        if (puzzle.type === "ROOT") {
            const found = puzzleState.found || [];
            tracker = (puzzle.required || []).map((w) => (found.includes(w) ? "◈" : "◇")).join("");
        }
        else if (["SUPPLETIVE", "PIE", "COLLISION", "DECEPTION", "FALSE_FAMILY", "PHANTOM_ROOT", "BORROWED", "TOPONYM"].includes(puzzle.type)) {
            const sa = puzzleState.stepAnswers || {};
            const sortSteps = (puzzle.steps || []).reduce((acc, s, i) => { if (s.type === "CLASSIFY")
                acc.push({ s, i }); return acc; }, []);
            tracker = sortSteps.map(({ s, i }) => (sa[i] === s.correct ? "◈" : "◇")).join("");
        }
        else if (puzzle.type === "MATCH") {
            const assigned = puzzleState.assigned || {};
            tracker = (puzzle.pairs || []).map((pair) => (assigned[pair.source] === pair.target ? "◈" : "◇")).join("");
        }
        else if (puzzle.type === "GRIMM") {
            const answers = puzzleState.answers || {};
            tracker = (puzzle.pairs || []).map((_, i) => (answers[i] ? "◈" : "◇")).join("");
        }
        else if (puzzle.type === "SEMANTIC") {
            const answers = puzzleState.answers || {};
            const blanks = (puzzle.timeline || []).filter((t) => t.blank);
            tracker = blanks.map((_, i) => (answers[i] ? "◈" : "◇")).join("");
        }
        else if (puzzle.type === "IDIOM") {
            const idiomFound = puzzleState.idiomFound || [];
            const answerWords = (puzzle.answer || "").split(" ");
            tracker = answerWords.map((_, i) => (idiomFound.includes(i) ? "◈" : "◇")).join("");
        }
        const url = "www.themeansofproduction.press/derivative";
        const sections = [
            { text: "◈ DERIVATIVE ◈\nThe Game of the Lingua Imperii", color: constants_1.COLORS.gold },
            { text: dateRoman, color: "#4ecfcf" },
            { text: iconRow, color: constants_1.COLORS.gold },
            { text: tracker, color: constants_1.COLORS.gold, isTracker: true },
            { text: url, color: constants_1.COLORS.goldDim },
        ];
        const plain = [
            "◈ DERIVATIVE ◈",
            "The Game of the Lingua Imperii",
            "",
            dateRoman,
            "",
            iconRow,
            "",
            tracker,
            "",
            url,
        ].join("\n");
        setShareMsg({ plain, sections });
    };
    const statusFor = (dateStr) => {
        const p = getProgress(dateStr);
        if (!p || !p.state)
            return "unplayed";
        const puz = getPuzzleForDate(dateStr);
        if (!puz)
            return "unplayed";
        if (p.revealed)
            return "complete";
        const s = p.state;
        if (puz.type === "ROOT" && (s.found || []).length > 0)
            return "partial";
        if (["SUPPLETIVE", "PIE", "COLLISION", "DECEPTION", "FALSE_FAMILY", "PHANTOM_ROOT", "BORROWED", "TOPONYM"].includes(puz.type) &&
            Object.keys(s.stepAnswers || {}).length > 0)
            return "partial";
        if (puz.type === "GRIMM" && Object.keys(s.answers || {}).length > 0)
            return "partial";
        if (puz.type === "SEMANTIC" && Object.keys(s.answers || {}).length > 0)
            return "partial";
        if (puz.type === "IDIOM" && (s.idiomFound || []).length > 0)
            return "partial";
        return "unplayed";
    };
    const bgStyle = {
        minHeight: "520px",
        background: `linear-gradient(180deg, ${constants_1.COLORS.bg}, ${constants_1.COLORS.bg2})`,
        position: "relative",
        overflow: "hidden",
    };
    if (view === "splash") {
        return ((0, jsx_runtime_1.jsxs)("div", { style: {
                ...bgStyle,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100dvh",
                padding: "4rem 2rem 3rem",
                textAlign: "center",
            }, children: [(0, jsx_runtime_1.jsx)(GlobalFX, {}), (0, jsx_runtime_1.jsx)("div", { style: {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundImage: `url(${constants_1.SPLASH_IMAGE})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        opacity: 0.15,
                        zIndex: 0,
                    } }), (0, jsx_runtime_1.jsx)("div", { style: {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(to bottom, rgba(7,6,5,0.55) 0%, rgba(7,6,5,0.88) 60%, rgba(7,6,5,0.98) 100%)",
                        zIndex: 0,
                    } }), (0, jsx_runtime_1.jsx)(Starfield, {}), (0, jsx_runtime_1.jsx)(AmbientOverlays, {}), (0, jsx_runtime_1.jsxs)("div", { style: { position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "500px", width: "100%" }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "deriv-title", "data-text": "DERIVATIVE", style: {
                                ...S.mono,
                                fontSize: "2.2rem",
                                fontWeight: 400,
                                color: constants_1.COLORS.gold,
                                letterSpacing: "0.22em",
                                textTransform: "uppercase",
                                marginBottom: "2.2rem",
                                userSelect: "none",
                            }, children: ["DERIVATIVE", (0, jsx_runtime_1.jsx)("br", {}), "The Game of the Lingua Imperii"] }), (0, jsx_runtime_1.jsx)("div", { style: {
                                width: "40px",
                                height: "1px",
                                background: constants_1.COLORS.goldLine,
                                marginBottom: "2.2rem",
                            } }), (0, jsx_runtime_1.jsxs)("div", { style: {
                                lineHeight: 2,
                                color: constants_1.COLORS.textSecondary,
                                fontSize: "0.88rem",
                                marginBottom: "0",
                                textShadow: "0 0 12px rgba(0,0,0,0.32)",
                            }, children: [(0, jsx_runtime_1.jsx)("p", { style: { margin: "0 0 0.6rem" }, children: "I want to play a game." }), (0, jsx_runtime_1.jsx)("p", { style: { margin: "0 0 0.6rem" }, children: "The game is called English." }), (0, jsx_runtime_1.jsxs)("p", { style: { margin: "0 0 1.4rem" }, children: ["You have been playing it since before you could walk.", (0, jsx_runtime_1.jsx)("br", {}), "You did not know you were playing.", (0, jsx_runtime_1.jsx)("br", {}), "You did not know there were rules.", (0, jsx_runtime_1.jsx)("br", {}), "You did not know the rules were made of older, broken rules."] }), (0, jsx_runtime_1.jsxs)("p", { style: { margin: "0 0 1.4rem" }, children: ["You did not know that ", (0, jsx_runtime_1.jsx)("em", { children: "went" }), " is a corpse wearing the wrong name. That ", (0, jsx_runtime_1.jsx)("em", { children: "nice" }), " meant ignorant. That ", (0, jsx_runtime_1.jsx)("em", { children: "person" }), " is a mask. That", " ", (0, jsx_runtime_1.jsx)("em", { children: "be" }), " and ", (0, jsx_runtime_1.jsx)("em", { children: "am" }), " and ", (0, jsx_runtime_1.jsx)("em", { children: "was" }), " have never, in any language, belonged together."] }), (0, jsx_runtime_1.jsx)("p", { style: { margin: "0 0 2rem" }, children: "You have been fluent your whole life in a language you have never truly known." })] }), (0, jsx_runtime_1.jsx)("p", { style: {
                                ...S.mono,
                                color: constants_1.COLORS.gold,
                                fontSize: "0.8rem",
                                letterSpacing: "0.1em",
                                margin: "0 0 2.4rem",
                                textTransform: "uppercase",
                            }, children: "Do you want to play a game?" }), (0, jsx_runtime_1.jsx)("button", { className: "deriv-btn", style: { ...S.btnPrimary, marginBottom: "1.6rem", padding: "0.6rem 2.2rem" }, onClick: () => openPuzzle(today), children: "enter \u2192" }), (0, jsx_runtime_1.jsx)("button", { className: "arch-link", onClick: () => setView("archive"), children: "archive" })] })] }));
    }
    if (view === "ready") {
        const todayPuzzle = getPuzzleForDate(today);
        const todayStatus = statusFor(today);
        const typeLabel = todayPuzzle ? (constants_1.TYPE_LABELS[todayPuzzle.type] || todayPuzzle.type) : "";
        const subLabel = todayPuzzle ? (constants_1.TYPE_SUBLABELS[todayPuzzle.type] || "") : "";
        const typeColor = todayPuzzle ? (constants_1.TYPE_COLORS[todayPuzzle.type] || constants_1.COLORS.gold) : constants_1.COLORS.gold;
        const TypeIcon = todayPuzzle ? TYPE_ICONS[todayPuzzle.type] : null;
        const statusDot = todayStatus === "complete"
            ? { symbol: "◈", color: constants_1.COLORS.gold, label: "complete" }
            : todayStatus === "partial"
                ? { symbol: "◑", color: constants_1.COLORS.goldDim, label: "in progress" }
                : { symbol: "◇", color: constants_1.COLORS.textMuted, label: "not yet played" };
        return ((0, jsx_runtime_1.jsxs)("div", { style: {
                ...bgStyle,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100dvh",
                padding: "3rem 2rem",
                textAlign: "center",
            }, children: [(0, jsx_runtime_1.jsx)(GlobalFX, {}), (0, jsx_runtime_1.jsx)(Starfield, {}), (0, jsx_runtime_1.jsx)(AmbientOverlays, {}), (0, jsx_runtime_1.jsxs)("div", { style: { position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0" }, children: [(0, jsx_runtime_1.jsx)("div", { className: "deriv-title", "data-text": "DERIVATIVE", onClick: () => openPuzzle(today), style: {
                                ...S.mono,
                                fontSize: "2.2rem",
                                fontWeight: 400,
                                color: constants_1.COLORS.gold,
                                letterSpacing: "0.22em",
                                textTransform: "uppercase",
                                marginBottom: "2.8rem",
                                userSelect: "none",
                                cursor: "pointer",
                            }, children: "DERIVATIVE" }), todayPuzzle && ((0, jsx_runtime_1.jsxs)("div", { onClick: () => openPuzzle(today), style: {
                                border: `1px solid ${typeColor}28`,
                                background: `${typeColor}08`,
                                borderRadius: "3px",
                                padding: "1.4rem 2rem",
                                marginBottom: "1.2rem",
                                cursor: "pointer",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "0.65rem",
                                minWidth: "240px",
                                maxWidth: "340px",
                                transition: "background 0.18s ease, border-color 0.18s ease",
                            }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "0.55rem" }, children: [TypeIcon && (0, jsx_runtime_1.jsx)(TypeIcon, { color: typeColor }), (0, jsx_runtime_1.jsx)("span", { style: {
                                                ...S.mono,
                                                fontSize: "0.7rem",
                                                letterSpacing: "0.14em",
                                                color: typeColor,
                                                textTransform: "uppercase",
                                            }, children: typeLabel })] }), (0, jsx_runtime_1.jsx)("span", { style: {
                                        ...S.mono,
                                        fontSize: "0.6rem",
                                        letterSpacing: "0.1em",
                                        color: constants_1.COLORS.textMuted,
                                        textTransform: "uppercase",
                                    }, children: subLabel })] })), (0, jsx_runtime_1.jsxs)("div", { style: {
                                display: "flex",
                                alignItems: "center",
                                gap: "0.7rem",
                                marginBottom: "2.2rem",
                            }, children: [(0, jsx_runtime_1.jsx)("span", { style: {
                                        ...S.mono,
                                        fontSize: "0.78rem",
                                        color: statusDot.color,
                                    }, children: statusDot.symbol }), (0, jsx_runtime_1.jsx)("span", { style: {
                                        ...S.mono,
                                        fontSize: "0.6rem",
                                        letterSpacing: "0.1em",
                                        color: constants_1.COLORS.textMuted,
                                        textTransform: "uppercase",
                                    }, children: statusDot.label })] }), (0, jsx_runtime_1.jsx)("button", { className: "deriv-btn", style: { ...S.btnPrimary, marginBottom: "1.4rem", padding: "0.55rem 1.8rem" }, onClick: () => openPuzzle(today), children: "play today \u2192" }), (0, jsx_runtime_1.jsx)("button", { className: "arch-link", onClick: () => setView("archive"), children: "archive" })] })] }));
    }
    if (view === "archive") {
        const monthLabel = new Date(today + "T12:00:00").toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
        });
        return ((0, jsx_runtime_1.jsxs)("div", { style: { ...bgStyle, padding: "2rem" }, children: [(0, jsx_runtime_1.jsx)(GlobalFX, {}), (0, jsx_runtime_1.jsx)(Starfield, {}), (0, jsx_runtime_1.jsx)(AmbientOverlays, {}), (0, jsx_runtime_1.jsxs)("div", { style: { position: "relative", zIndex: 1 }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }, children: [(0, jsx_runtime_1.jsx)("button", { className: "deriv-btn", style: S.btnSm, onClick: () => setView(isFirstTime ? "splash" : "ready"), children: "\u2190 back" }), (0, jsx_runtime_1.jsxs)("span", { style: {
                                        ...S.mono,
                                        color: constants_1.COLORS.gold,
                                        fontSize: "0.75rem",
                                        letterSpacing: "0.14em",
                                        textTransform: "uppercase",
                                    }, children: ["Archive \u2014 ", monthLabel] })] }), (0, jsx_runtime_1.jsxs)("div", { style: {
                                display: "grid",
                                gridTemplateColumns: "repeat(7,1fr)",
                                gap: "6px",
                                maxWidth: "420px",
                            }, children: [["S", "M", "T", "W", "T", "F", "S"].map((d, i) => ((0, jsx_runtime_1.jsx)("div", { style: {
                                        textAlign: "center",
                                        ...S.mono,
                                        fontSize: "0.6rem",
                                        color: constants_1.COLORS.textSecondary,
                                        letterSpacing: "0.1em",
                                        paddingBottom: "4px",
                                    }, children: d }, i))), (() => {
                                    const [yearRaw, monthRaw] = today.split("-").map(Number);
                                    const year = yearRaw ?? new Date().getFullYear();
                                    const month = monthRaw ?? new Date().getMonth() + 1;
                                    return [...Array(new Date(year, month - 1, 1).getDay())].map((_, i) => ((0, jsx_runtime_1.jsx)("div", {}, "p" + i)));
                                })(), archiveDates.map((dateStr) => {
                                    const day = parseInt(dateStr.split("-")[2] ?? "1", 10);
                                    const st = statusFor(dateStr);
                                    const isToday = dateStr === today;
                                    const archivePuzzle = getPuzzleForDate(dateStr);
                                    const diffColor = archivePuzzle
                                        ? difficulty_1.DIFFICULTY_META[(0, difficulty_1.getDifficulty)(archivePuzzle.type, archivePuzzle.lensId)].color
                                        : constants_1.COLORS.textFaint;
                                    return ((0, jsx_runtime_1.jsxs)("button", { onClick: () => openPuzzle(dateStr), style: {
                                            background: st === "complete"
                                                ? "linear-gradient(180deg, rgba(232,184,75,0.15), rgba(232,184,75,0.06))"
                                                : st === "partial"
                                                    ? "linear-gradient(180deg, rgba(232,184,75,0.10), rgba(20,18,8,1))"
                                                    : constants_1.COLORS.surface2,
                                            border: isToday
                                                ? `1px solid ${constants_1.COLORS.gold}`
                                                : st === "complete"
                                                    ? `1px solid ${constants_1.COLORS.goldDim}`
                                                    : st === "partial"
                                                        ? `1px solid ${constants_1.COLORS.goldDark}`
                                                        : `1px solid ${constants_1.COLORS.blackLine}`,
                                            borderBottom: `2px solid ${diffColor}`,
                                            color: st === "complete"
                                                ? constants_1.COLORS.textPrimary
                                                : st === "partial"
                                                    ? constants_1.COLORS.goldDim
                                                    : isToday
                                                        ? constants_1.COLORS.gold
                                                        : constants_1.COLORS.textSecondary,
                                            borderRadius: "3px",
                                            padding: "0.45rem 0",
                                            ...S.mono,
                                            fontSize: "0.78rem",
                                            cursor: "pointer",
                                            textAlign: "center",
                                            fontWeight: isToday ? 500 : 400,
                                            boxShadow: isToday ? `0 0 18px ${constants_1.COLORS.goldGlow}` : "none",
                                        }, children: [day, st === "complete" && ((0, jsx_runtime_1.jsx)("span", { style: { display: "block", fontSize: "0.35rem", color: constants_1.COLORS.gold }, children: "\u25CF" }))] }, dateStr));
                                })] }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: "1.25rem", display: "flex", gap: "1.25rem" }, children: [
                                ["unplayed", constants_1.COLORS.textSecondary],
                                ["partial", constants_1.COLORS.goldDim],
                                ["complete", constants_1.COLORS.textPrimary],
                            ].map(([l, c]) => ((0, jsx_runtime_1.jsx)("span", { style: {
                                    ...S.mono,
                                    fontSize: "0.6rem",
                                    color: c,
                                    letterSpacing: "0.08em",
                                }, children: l }, l))) }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: "0.85rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }, children: ["EASY", "MEDIUM", "HARD", "VERY_HARD"].map((level) => {
                                const m = difficulty_1.DIFFICULTY_META[level];
                                return ((0, jsx_runtime_1.jsxs)("span", { style: {
                                        ...S.mono,
                                        fontSize: "0.55rem",
                                        color: m.color,
                                        letterSpacing: "0.08em",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "0.3rem",
                                    }, children: [(0, jsx_runtime_1.jsx)("span", { style: { display: "inline-block", width: "12px", height: "2px", background: m.color, borderRadius: "1px" } }), m.label] }, level));
                            }) })] })] }));
    }
    if (view === "game" && puzzle && selDate) {
        const complete = isComplete();
        const isSortType = [
            "SUPPLETIVE",
            "PIE",
            "COLLISION",
            "DECEPTION",
            "FALSE_FAMILY",
            "PHANTOM_ROOT",
            "BORROWED",
            "TOPONYM",
        ].includes(puzzle.type);
        const updateTimedMode = (checked) => setTimedSettings((current) => ({ ...current, timedMode: checked }));
        const updateTimeLimit = (value) => {
            const parsed = Number(value);
            if (!Number.isFinite(parsed))
                return;
            setTimedSettings((current) => ({
                ...current,
                timeLimitSec: Math.max(5, Math.min(180, Math.floor(parsed))),
            }));
        };
        return ((0, jsx_runtime_1.jsxs)("div", { style: {
                ...bgStyle,
                padding: "1.5rem 1.5rem 2.5rem",
                maxWidth: "700px",
                margin: "0 auto",
            }, children: [(0, jsx_runtime_1.jsx)(GlobalFX, {}), (0, jsx_runtime_1.jsx)(Starfield, {}), (0, jsx_runtime_1.jsx)(AmbientOverlays, {}), (0, jsx_runtime_1.jsxs)("div", { style: { position: "relative", zIndex: 1 }, children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginBottom: "1.25rem",
                            }, children: [(0, jsx_runtime_1.jsx)("button", { className: "deriv-btn", style: S.btnSm, onClick: () => setView(isFirstTime ? "splash" : "ready"), children: "\u2190 back" }), (0, jsx_runtime_1.jsx)("span", { style: {
                                        ...S.mono,
                                        fontSize: "0.6rem",
                                        color: constants_1.COLORS.textMuted,
                                        letterSpacing: "0.12em",
                                        textTransform: "uppercase",
                                    }, children: "derivative system" }), (0, jsx_runtime_1.jsx)("button", { className: "deriv-btn", style: S.btnSm, onClick: () => setView("archive"), children: "archive" })] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "0.55rem", marginBottom: "0.85rem" }, children: [(0, jsx_runtime_1.jsxs)("label", { style: { ...S.mono, fontSize: "0.57rem", color: constants_1.COLORS.textMuted, letterSpacing: "0.1em", display: "inline-flex", alignItems: "center", gap: "0.35rem", textTransform: "uppercase" }, children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: timedSettings.timedMode, onChange: (e) => updateTimedMode(e.target.checked) }), "timed mode"] }), (0, jsx_runtime_1.jsx)("input", { type: "number", min: 5, max: 180, disabled: !timedSettings.timedMode, value: timedSettings.timeLimitSec, onChange: (e) => updateTimeLimit(e.target.value), style: { ...S.input, width: "88px", padding: "0.2rem 0.45rem", fontSize: "0.68rem", opacity: timedSettings.timedMode ? 1 : 0.5 } })] }), (0, jsx_runtime_1.jsx)(PuzzleHeader, { puzzle: puzzle, selDate: selDate }), puzzle.type === "ROOT" && ((0, jsx_runtime_1.jsx)(RootPuzzle, { puzzle: puzzle, found: puzzleState.found || [], onWord: handleWordFound, revealed: revealed, timedSettings: timedSettings })), isSortType && ((0, jsx_runtime_1.jsx)(StepPuzzle, { puzzle: puzzle, state: puzzleState, onState: handlePuzzleState, revealed: revealed })), puzzle.type === "MATCH" && ((0, jsx_runtime_1.jsx)(MatchPuzzle, { puzzle: puzzle, state: puzzleState, onState: handlePuzzleState, revealed: revealed, timedSettings: timedSettings })), puzzle.type === "GRIMM" && ((0, jsx_runtime_1.jsx)(GrimmPuzzle, { puzzle: puzzle, state: puzzleState, onState: handlePuzzleState, revealed: revealed, timedSettings: timedSettings })), puzzle.type === "SEMANTIC" && ((0, jsx_runtime_1.jsx)(SemanticPuzzle, { puzzle: puzzle, state: puzzleState, onState: handlePuzzleState, revealed: revealed, timedSettings: timedSettings })), puzzle.type === "IDIOM" && ((0, jsx_runtime_1.jsx)(IdiomPuzzle, { puzzle: puzzle, state: puzzleState, onState: handlePuzzleState, revealed: revealed, timedSettings: timedSettings })), !revealed && ((0, jsx_runtime_1.jsx)("button", { className: "deriv-btn", style: { ...S.btnSm, marginTop: "1rem" }, onClick: handleReveal, children: "reveal machinery \u2192" })), (0, jsx_runtime_1.jsx)(exports.RevealSection, { puzzle: puzzle, visible: revealed || complete, onShare: buildShare }), shareMsg && (0, jsx_runtime_1.jsx)(ShareCard, { data: shareMsg })] })] }));
    }
    return null;
}
