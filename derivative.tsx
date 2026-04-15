import { useEffect, useMemo, useRef, useState, type ReactElement } from "react";
import { generateDailyPuzzle } from "./generator";
import RootGraph from "./components/RootGraph";
import type { Puzzle, PuzzleType, LensId, ProgressStore, PuzzleProgressEntry, PuzzleState, Step } from "./types";
import { getDifficulty, DIFFICULTY_META, type DifficultyLevel } from "./difficulty";
import { TYPE_LABELS, TYPE_SUBLABELS, COLORS, TYPE_COLORS, STORAGE_KEY, SPLASH_IMAGE } from "./constants";
import { getUtcDateKey } from "./src/dateUtils";
import { hydrateProgressStore, withDiscoveredSystem } from "./progressSystems";
import {
  DEFAULT_TIME_LIMIT_SEC,
  hasTimedOut,
  loadTimedModeSettings,
  saveTimedModeSettings,
  type TimedModeSettings,
} from "./src/timedMode";

const load = (): ProgressStore => {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") as ProgressStore;
    return hydrateProgressStore(parsed);
  } catch {
    return hydrateProgressStore({});
  }
};

const save = (data: ProgressStore): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
};

const puzzleCache: Record<string, Puzzle | undefined> = {};

const isPuzzleProgressEntry = (value: ProgressStore[string]): value is PuzzleProgressEntry =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const getPuzzleForDate = (dateStr: string): Puzzle | null => {
  try {
    if (!puzzleCache[dateStr]) {
      puzzleCache[dateStr] = generateDailyPuzzle(dateStr) as unknown as Puzzle;
    }
    return puzzleCache[dateStr] || null;
  } catch {
    return null;
  }
};

const getTodayStr = () => getUtcDateKey();

const getMonthDates = (anchorDateStr: string) => {
  const [yearRaw, monthRaw] = anchorDateStr.split("-").map(Number);
  const year = yearRaw ?? new Date().getFullYear();
  const month = monthRaw ?? new Date().getMonth() + 1;
  const daysInMonth = new Date(year, month, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  });
};

const getRoot = (puzzle: Puzzle) => puzzle.meta?.root || puzzle.root || "";
const getLang = (puzzle: Puzzle) => puzzle.meta?.lang || puzzle.lang || "";
const getMeaning = (puzzle: Puzzle) => puzzle.meta?.meaning || puzzle.meaning || "";

const useTimedInteraction = ({
  timedMode,
  timeLimitSec,
  onTimeout,
  resetKey,
}: TimedModeSettings & { onTimeout: () => void; resetKey: string }) => {
  const [remainingSec, setRemainingSec] = useState<number | null>(null);
  const [startedAtMs, setStartedAtMs] = useState<number | null>(null);
  const didTimeoutRef = useRef(false);

  useEffect(() => {
    setRemainingSec(null);
    setStartedAtMs(null);
    didTimeoutRef.current = false;
  }, [resetKey, timedMode, timeLimitSec]);

  useEffect(() => {
    if (!timedMode || startedAtMs === null || didTimeoutRef.current) return;
    const update = () => {
      const elapsedMs = Date.now() - startedAtMs;
      const secondsLeft = Math.max(0, Math.ceil((timeLimitSec * 1000 - elapsedMs) / 1000));
      setRemainingSec(secondsLeft);
      if (hasTimedOut({ timedMode, timeLimitSec, elapsedMs })) {
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
    if (!timedMode || startedAtMs !== null) return;
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
    border: `1px solid ${COLORS.goldDark}`,
    color: COLORS.goldDim,
    padding: "0.45rem 1rem",
    fontFamily: "var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)",
    fontSize: "0.7rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    cursor: "pointer",
    borderRadius: "2px",
    transition: "all 0.18s ease",
  },
  btnSm: {
    background: "transparent",
    border: `1px solid ${COLORS.blackLine}`,
    color: COLORS.goldDark,
    padding: "0.3rem 0.6rem",
    fontFamily: "var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)",
    fontSize: "0.62rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    cursor: "pointer",
    borderRadius: "2px",
    transition: "all 0.18s ease",
  },
  btnPrimary: {
    background: `linear-gradient(180deg, ${COLORS.gold}, ${COLORS.goldDim})`,
    border: `1px solid ${COLORS.gold}`,
    color: COLORS.bg,
    padding: "0.45rem 1rem",
    fontFamily: "var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)",
    fontSize: "0.7rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    cursor: "pointer",
    borderRadius: "2px",
    boxShadow: `0 0 18px ${COLORS.goldGlow}`,
    transition: "all 0.18s ease",
  },
  input: {
    background: COLORS.surface,
    border: `1px solid ${COLORS.blackLine}`,
    borderRadius: "2px",
    color: COLORS.textPrimary,
    fontFamily: "var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)",
    fontSize: "0.85rem",
    padding: "0.45rem 0.65rem",
    outline: "none",
    letterSpacing: "0.04em",
    width: "100%",
    boxSizing: "border-box" as const,
    transition: "border-color 0.18s ease, box-shadow 0.18s ease",
  },
};

const IconBase = ({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    width="15"
    height="15"
    aria-hidden="true"
    style={{ display: "block", filter: `drop-shadow(0 0 6px ${color}33)` }}
  >
    {children}
  </svg>
);

const IconRoot = ({ color }: { color: string }) => (
  <IconBase color={color}>
    <circle cx="12" cy="12" r="7.5" fill="none" stroke={color} strokeWidth="1.4" />
    <circle cx="12" cy="12" r="1.7" fill={color} />
    <path d="M12 4.5v3.2M12 16.3v3.2M4.5 12h3.2M16.3 12h3.2" stroke={color} strokeWidth="1.2" />
    <path d="M7.4 7.4l2.1 2.1M14.5 14.5l2.1 2.1M16.6 7.4l-2.1 2.1M9.5 14.5l-2.1 2.1" stroke={color} strokeWidth="1.1" />
  </IconBase>
);

const IconSuppletive = ({ color }: { color: string }) => (
  <IconBase color={color}>
    <path d="M5 8h7" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <path d="M12 8l-2.2-2.2M12 8l-2.2 2.2" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <path d="M19 16h-7" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <path d="M12 16l2.2-2.2M12 16l2.2 2.2" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="8" cy="8" r="1.6" fill={color} />
    <circle cx="16" cy="16" r="1.6" fill={color} />
  </IconBase>
);

const IconGrimm = ({ color }: { color: string }) => (
  <IconBase color={color}>
    <path d="M4 16c2-7 4-9 8-9 4 0 6 2 8 9" fill="none" stroke={color} strokeWidth="1.4" />
    <path d="M5.5 17.5h13" stroke={color} strokeWidth="1.2" />
    <circle cx="8" cy="11" r="1.2" fill={color} />
    <circle cx="12" cy="9" r="1.2" fill={color} />
    <circle cx="16" cy="11" r="1.2" fill={color} />
  </IconBase>
);

const IconSemantic = ({ color }: { color: string }) => (
  <IconBase color={color}>
    <path d="M12 4v16" stroke={color} strokeWidth="1.3" />
    <circle cx="12" cy="6" r="1.8" fill={color} />
    <circle cx="12" cy="12" r="1.8" fill="none" stroke={color} strokeWidth="1.2" />
    <circle cx="12" cy="18" r="1.8" fill={color} opacity="0.4" />
    <path d="M9 9.2h6M9 14.8h6" stroke={color} strokeWidth="1.1" />
  </IconBase>
);

const IconCollision = ({ color }: { color: string }) => (
  <IconBase color={color}>
    <path d="M6 7l5.5 5.5M18 7l-5.5 5.5" stroke={color} strokeWidth="1.4" />
    <path d="M6 17l5.5-5.5M18 17l-5.5-5.5" stroke={color} strokeWidth="1.4" />
    <circle cx="6" cy="7" r="1.6" fill={color} />
    <circle cx="18" cy="7" r="1.6" fill={color} />
    <circle cx="6" cy="17" r="1.6" fill={color} opacity="0.5" />
    <circle cx="18" cy="17" r="1.6" fill={color} opacity="0.5" />
  </IconBase>
);

const IconPIE = ({ color }: { color: string }) => (
  <IconBase color={color}>
    <circle cx="12" cy="12" r="8" fill="none" stroke={color} strokeWidth="1.4" />
    <circle cx="12" cy="12" r="4" fill="none" stroke={color} strokeWidth="1.2" />
    <circle cx="12" cy="12" r="1.4" fill={color} />
  </IconBase>
);

const IconDeception = ({ color }: { color: string }) => (
  <IconBase color={color}>
    <path d="M12 4l7 4v8l-7 4-7-4V8l7-4z" fill="none" stroke={color} strokeWidth="1.3" />
    <path d="M8 12h8" stroke={color} strokeWidth="1.2" />
    <path d="M10 9.5l4 5" stroke={color} strokeWidth="1.2" />
  </IconBase>
);

const IconFalseFamily = ({ color }: { color: string }) => (
  <IconBase color={color}>
    <circle cx="8" cy="8" r="3" fill="none" stroke={color} strokeWidth="1.2" />
    <circle cx="16" cy="8" r="3" fill="none" stroke={color} strokeWidth="1.2" />
    <circle cx="12" cy="16" r="3" fill="none" stroke={color} strokeWidth="1.2" />
    <path d="M6.2 18.8L17.8 5.2" stroke={color} strokeWidth="1.4" />
  </IconBase>
);

const IconPhantomRoot = ({ color }: { color: string }) => (
  <IconBase color={color}>
    <path d="M12 4v6" stroke={color} strokeWidth="1.4" />
    <path d="M12 10l-3.2 3.2M12 10l3.2 3.2" stroke={color} strokeWidth="1.3" />
    <circle cx="8.8" cy="14.2" r="1.5" fill={color} />
    <circle cx="15.2" cy="14.2" r="1.5" fill={color} />
    <circle cx="12" cy="18.2" r="1.5" fill={color} opacity="0.65" />
  </IconBase>
);

const IconIdiom = ({ color }: { color: string }) => (
  <IconBase color={color}>
    <path d="M4 8h16" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <path d="M4 12h10" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <path d="M4 16h13" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="18" cy="12" r="2.2" fill="none" stroke={color} strokeWidth="1.2" />
    <circle cx="18" cy="12" r="0.8" fill={color} />
  </IconBase>
);

const IconBorrowed = ({ color }: { color: string }) => (
  <IconBase color={color}>
    <circle cx="6" cy="8" r="2.5" fill="none" stroke={color} strokeWidth="1.2" />
    <circle cx="18" cy="8" r="2.5" fill="none" stroke={color} strokeWidth="1.2" />
    <circle cx="12" cy="17" r="2.5" fill="none" stroke={color} strokeWidth="1.2" />
    <path d="M8.2 9.2L10.2 15.2" stroke={color} strokeWidth="1.1" strokeDasharray="1.5 1.5" />
    <path d="M15.8 9.2L13.8 15.2" stroke={color} strokeWidth="1.1" strokeDasharray="1.5 1.5" />
    <path d="M8.4 7.6L15.6 7.6" stroke={color} strokeWidth="1.1" strokeDasharray="1.5 1.5" />
  </IconBase>
);

const IconToponym = ({ color }: { color: string }) => (
  <IconBase color={color}>
    <circle cx="12" cy="9" r="3.5" fill="none" stroke={color} strokeWidth="1.2" />
    <path d="M12 12.5 L12 19" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    <path d="M8.5 18.5 Q12 21.5 15.5 18.5" stroke={color} strokeWidth="1.0" fill="none" />
  </IconBase>
);

// ── Difficulty icons ──────────────────────────────────────────────────────────

const IconDifficultyEasy = ({ color }: { color: string }) => (
  <IconBase color={color}>
    <circle cx="12" cy="12" r="2.5" fill={color} />
    <path d="M12 5.5v2.5M12 16v2.5M5.5 12h2.5M16 12h2.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <path d="M7.7 7.7l1.7 1.7M14.6 14.6l1.7 1.7M16.3 7.7l-1.7 1.7M9.4 14.6l-1.7 1.7" stroke={color} strokeWidth="1" strokeLinecap="round" opacity={0.5} />
  </IconBase>
);

const IconDifficultyMedium = ({ color }: { color: string }) => (
  <IconBase color={color}>
    <circle cx="9" cy="12" r="4.5" fill="none" stroke={color} strokeWidth="1.3" />
    <circle cx="15" cy="12" r="4.5" fill="none" stroke={color} strokeWidth="1.3" />
    <circle cx="12" cy="12" r="1.2" fill={color} />
  </IconBase>
);

const IconDifficultyHard = ({ color }: { color: string }) => (
  <IconBase color={color}>
    <circle cx="10.5" cy="10.5" r="5.5" fill="none" stroke={color} strokeWidth="1.3" />
    <path d="M14.7 14.7l4.2 4.2" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <path d="M8.5 10.5h4M10.5 8.5v4" stroke={color} strokeWidth="1" strokeLinecap="round" opacity={0.7} />
  </IconBase>
);

const IconDifficultyVeryHard = ({ color }: { color: string }) => (
  <IconBase color={color}>
    <path d="M5 16V9l3.5 3.5L12 6l3.5 6.5L19 9v7H5z" fill="none" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M5 16h14" stroke={color} strokeWidth="1.2" />
    <circle cx="8.5" cy="12.5" r="1" fill={color} />
    <circle cx="12" cy="8" r="1" fill={color} />
    <circle cx="15.5" cy="12.5" r="1" fill={color} />
  </IconBase>
);

const TYPE_ICONS: Record<PuzzleType, ({ color }: { color: string }) => ReactElement> = {
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

const TYPE_SHARE_ICONS: Record<PuzzleType, string> = {
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

const DIFFICULTY_SHARE_ICONS: Record<DifficultyLevel, string> = {
  EASY: "○",
  MEDIUM: "◎",
  HARD: "◉",
  VERY_HARD: "●",
};

type ShareSection = { text: string; color: string; isTracker?: boolean };
type ShareData = { plain: string; sections: ShareSection[] };

const GlobalFX = () => (
  <style>{`
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
      color: ${COLORS.textFaint};
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
      color: ${COLORS.gold};
      text-shadow: 0 0 10px rgba(232,184,75,0.2);
    }

    .deriv-btn:hover {
      border-color: ${COLORS.goldDim} !important;
      color: ${COLORS.gold} !important;
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
  `}</style>
);

const AmbientOverlays = () => (
  <>
    <div
      style={{
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
      }}
    />
    <div
      style={{
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
      }}
    />
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        background:
          "radial-gradient(circle at center, transparent 48%, rgba(0,0,0,0.28) 100%)",
        zIndex: 0,
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: "-25%",
        height: "30%",
        pointerEvents: "none",
        background:
          "linear-gradient(to bottom, rgba(255,255,255,0.025), rgba(255,255,255,0.0))",
        animation: "scanMove 9s linear infinite",
        zIndex: 0,
        opacity: 0.5,
      }}
    />
  </>
);

const Starfield = () => (
  <canvas
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 0,
      pointerEvents: "none",
    }}
    ref={(el: (HTMLCanvasElement & { _init?: boolean }) | null) => {
      if (!el || el._init) return;
      el._init = true;
      const ctx = el.getContext("2d");
      if (!ctx) return;

      const resize = () => {
        el.width = el.offsetWidth;
        el.height = el.offsetHeight;
      };

      resize();

      type StarParticle = {
        x: number;
        y: number;
        r: number;
        o: number;
        s: number;
        d: 1 | -1;
        cyan: boolean;
      };

      type StarLink = {
        a: number;
        b: number;
      };

      const stars: StarParticle[] = Array.from({ length: 180 }, () => ({
        x: Math.random() * el.width,
        y: Math.random() * el.height,
        r: Math.random() * 1.15 + 0.1,
        o: Math.random() * 0.5 + 0.1,
        s: Math.random() * 0.4 + 0.1,
        d: Math.random() > 0.5 ? 1 : -1,
        cyan: Math.random() > 0.6,
      }));

      const links: StarLink[] = Array.from({ length: 38 }, () => ({
        a: Math.floor(Math.random() * stars.length),
        b: Math.floor(Math.random() * stars.length),
      }));

      const draw = () => {
        ctx.clearRect(0, 0, el.width, el.height);

        links.forEach((l) => {
          const a = stars[l.a];
          const b = stars[l.b];
          if (!a || !b) return;
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
          if (s.o > 0.7 || s.o < 0.08) s.d *= -1;
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
    }}
  />
);

const SystemMesh = ({ intensity = 1 }: { intensity?: number }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      zIndex: 0,
      opacity: 0.75 * intensity,
      background: `
        radial-gradient(circle at 30% 38%, rgba(78,207,207,0.10), transparent 24%),
        radial-gradient(circle at 73% 62%, rgba(232,184,75,0.08), transparent 28%)
      `,
    }}
  >
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{
        width: "100%",
        height: "100%",
        opacity: 0.55,
      }}
    >
      <g stroke="rgba(78,207,207,0.18)" strokeWidth="0.35" fill="none">
        <path d="M12 72 L26 56 L41 61 L56 43 L73 52" />
        <path d="M22 28 L34 36 L52 22 L68 31 L81 20" />
        <path d="M17 82 L37 78 L49 86 L66 73 L84 78" />
      </g>
      <g fill="rgba(78,207,207,0.34)">
        <circle cx="12" cy="72" r="0.9" />
        <circle cx="26" cy="56" r="0.9" />
        <circle cx="41" cy="61" r="0.9" />
        <circle cx="56" cy="43" r="0.9" />
        <circle cx="73" cy="52" r="0.9" />
        <circle cx="22" cy="28" r="0.9" />
        <circle cx="34" cy="36" r="0.9" />
        <circle cx="52" cy="22" r="0.9" />
        <circle cx="68" cy="31" r="0.9" />
        <circle cx="81" cy="20" r="0.9" />
      </g>
    </svg>
  </div>
);

const DIFFICULTY_ICONS = {
  EASY: IconDifficultyEasy,
  MEDIUM: IconDifficultyMedium,
  HARD: IconDifficultyHard,
  VERY_HARD: IconDifficultyVeryHard,
};

const DifficultyBadge = ({ puzzleType, lensId }: { puzzleType: string; lensId: LensId }) => {
  const level = getDifficulty(puzzleType as PuzzleType, lensId);
  const meta = DIFFICULTY_META[level];
  const Icon = DIFFICULTY_ICONS[level];

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4rem",
        background: `${meta.color}12`,
        border: `1px solid ${meta.color}38`,
        borderRadius: "2px",
        padding: "0.22rem 0.55rem",
        marginTop: "0.3rem",
      }}
    >
      <Icon color={meta.color} />
      <div
        style={{
          ...S.mono,
          fontSize: "0.58rem",
          color: meta.color,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          lineHeight: 1.1,
        }}
      >
        {meta.label}
      </div>
      <div
        style={{
          ...S.mono,
          fontSize: "0.5rem",
          color: `${meta.color}99`,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        · {meta.sublabel}
      </div>
    </div>
  );
};

const TypeBadge = ({ type, lensId }: { type: PuzzleType; lensId?: LensId }) => {
  const tc = TYPE_COLORS[type] || COLORS.goldDim;
  const Icon = TYPE_ICONS[type] || IconRoot;

  return (
    <div style={{ display: "inline-flex", flexDirection: "column", marginBottom: "0.65rem" }}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.45rem",
          background: `${tc}16`,
          border: `1px solid ${tc}44`,
          borderRadius: "2px",
          padding: "0.22rem 0.55rem",
          boxShadow: `0 0 18px ${tc}11`,
          animation: type === "GRIMM" || type === "COLLISION" ? "cyanPulse 3.4s ease-in-out infinite" : "goldPulse 4.2s ease-in-out infinite",
        }}
      >
        <Icon color={tc} />
        <div
          style={{
            ...S.mono,
            fontSize: "0.58rem",
            color: tc,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            lineHeight: 1.1,
          }}
        >
          {TYPE_LABELS[type] || type}
        </div>
      </div>
      <div
        style={{
          ...S.mono,
          fontSize: "0.52rem",
          color: "rgba(78,207,207,0.62)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginTop: "0.24rem",
          paddingLeft: "0.08rem",
        }}
      >
        {TYPE_SUBLABELS[type] || "lexical system"}
      </div>
      {lensId && <DifficultyBadge puzzleType={type} lensId={lensId} />}
    </div>
  );
};

export const RevealCard = ({
  puzzle,
  onShare,
}: {
  puzzle: Puzzle;
  onShare: () => void;
}) => {
  const color = TYPE_COLORS[puzzle.type] || COLORS.goldDim;
  const Icon = TYPE_ICONS[puzzle.type] || IconRoot;
  const claim = puzzle.meta?.claim?.trim();

  return (
    <div
      className="reveal-shell"
      style={{
        borderTop: `1px solid ${COLORS.blackLine}`,
        paddingTop: "1.25rem",
        marginTop: "0.95rem",
        background: `linear-gradient(180deg, rgba(232,184,75,0.03), rgba(78,207,207,0.015))`,
        borderRadius: "4px",
        position: "relative",
      }}
    >
      <SystemMesh intensity={0.7} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.45rem",
            marginBottom: "0.65rem",
          }}
        >
          <Icon color={color} />
          <div
            style={{
              ...S.mono,
              fontSize: "0.58rem",
              color,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            revealed machinery
          </div>
        </div>

        <div
          style={{
            fontSize: "1rem",
            color: COLORS.textPrimary,
            fontWeight: 500,
            lineHeight: 1.55,
            marginBottom: "0.7rem",
          }}
        >
          {puzzle.reveal.headline}
        </div>

        <div
          style={{
            fontSize: "0.83rem",
            color: COLORS.textSecondary,
            lineHeight: 1.88,
            marginBottom: "1rem",
            maxWidth: "62ch",
          }}
        >
          {puzzle.reveal.body}
        </div>

        {claim && (
          <div
            style={{
              ...S.mono,
              fontSize: "0.62rem",
              color: COLORS.textMuted,
              letterSpacing: "0.08em",
              marginBottom: "0.9rem",
              opacity: 0.82,
            }}
          >
            {claim}
          </div>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            marginBottom: "1rem",
          }}
        >
          {puzzle.reveal.connections.map(([w, d], i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "1rem",
                fontSize: "0.74rem",
                ...S.mono,
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  color: COLORS.gold,
                  minWidth: "130px",
                  flexShrink: 0,
                }}
              >
                {w}
              </span>
              <span style={{ color: COLORS.textMuted }}>{d}</span>
            </div>
          ))}
        </div>

        <button className="deriv-btn" style={S.btnSm} onClick={onShare}>
          share →
        </button>
      </div>
    </div>
  );
};

export const RevealSection = ({
  puzzle,
  visible,
  onShare,
}: {
  puzzle: Puzzle;
  visible: boolean;
  onShare: () => void;
}) => {
  if (!visible) return null;
  return <RevealCard puzzle={puzzle} onShare={onShare} />;
};

const ShareCard = ({ data }: { data: ShareData }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(data.plain);
    } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        marginTop: "1rem",
        background: COLORS.surface,
        border: `1px solid ${COLORS.goldDark}`,
        borderRadius: "3px",
        padding: "1rem 1.1rem",
        boxShadow: `0 0 22px ${COLORS.goldGlow}`,
      }}
    >
      <div
        style={{
          ...S.mono,
          fontSize: "0.74rem",
          margin: 0,
          lineHeight: 2,
        }}
      >
        {data.sections.map((section, i) => (
          <div key={i} style={{ marginBottom: i < data.sections.length - 1 ? "0.65rem" : 0 }}>
            {section.isTracker ? (
              section.text.split("").map((ch, j) => (
                <span
                  key={j}
                  style={{
                    color: ch === "◈" ? COLORS.gold : COLORS.goldDark,
                    fontSize: ch === "◈" ? "0.82rem" : "0.74rem",
                  }}
                >
                  {ch}
                </span>
              ))
            ) : (
              <span style={{ color: section.color, whiteSpace: "pre-wrap" }}>{section.text}</span>
            )}
          </div>
        ))}
      </div>
      <button className="deriv-btn" style={{ ...S.btnSm, marginTop: "0.75rem" }} onClick={copy}>
        {copied ? "copied ✓" : "copy to clipboard"}
      </button>
    </div>
  );
};

const TutorialModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: "rgba(0,0,0,0.72)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          width: "min(760px, 100%)",
          maxHeight: "88vh",
          overflowY: "auto",
          background: COLORS.bg2,
          border: `1px solid ${COLORS.goldDark}`,
          borderRadius: "4px",
          padding: "1.1rem 1.15rem",
          boxShadow: `0 0 28px ${COLORS.goldGlow}`,
        }}
      >
        <div style={{ ...S.mono, fontSize: "0.76rem", color: COLORS.gold, letterSpacing: "0.12em", marginBottom: "0.75rem", textTransform: "uppercase" }}>
          derivative // initiation protocol
        </div>

        <div style={{ color: COLORS.textSecondary, lineHeight: 1.8, fontSize: "0.82rem" }}>
          <p style={{ margin: "0 0 0.7rem" }}>
            I want to play a game. Each date in this archive contains one scheduled puzzle. Your task is not recall. Your task is detection.
          </p>

          <p style={{ margin: "0 0 0.55rem" }}>
            <strong style={{ color: COLORS.textPrimary }}>Puzzle systems:</strong>{" "}
            Root (reconstruct root-linked words), Semantic (trace meaning drift), Suppletive (forms that do not match but belong),
            Grimm (sound-shift laws), Collision (language contact), PIE (proto-language inheritance), Deception (false pattern traps),
            False Family (look-alikes, not relatives), Phantom Root (fake roots), Idiom (reconstruct expression), Borrowed (loan paths),
            Toponym (hidden place-name origin), Match (pair source and target).
          </p>

          <p style={{ margin: "0 0 0.55rem" }}>
            <strong style={{ color: COLORS.textPrimary }}>Difficulty tiers:</strong>{" "}
            Word Curious, Vocabulary Vanguard, Etymologist, Doctor of English History.
          </p>

          <p style={{ margin: 0 }}>
            <strong style={{ color: COLORS.textPrimary }}>After reveal:</strong>{" "}
            Generate the share card to copy a spoiler-safe artifact with date, puzzle/difficulty icons, and your ◈/◇ performance tracker.
          </p>
        </div>

        <button className="deriv-btn" style={{ ...S.btnPrimary, marginTop: "1rem" }} onClick={onClose}>
          begin →
        </button>
      </div>
    </div>
  );
};

const PuzzleHeader = ({
  puzzle,
  selDate,
}: {
  puzzle: Puzzle;
  selDate: string;
}) => {
  const dateLabel = new Date(selDate + "T12:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
  const root = getRoot(puzzle);
  const lang = getLang(puzzle);
  const meaning = getMeaning(puzzle);

  return (
    <div style={{ marginBottom: "1.25rem", position: "relative" }}>
      <TypeBadge type={puzzle.type} lensId={puzzle.lensId} />

      <div
        style={{
          ...S.mono,
          fontSize: "1.42rem",
          color: COLORS.textPrimary,
          letterSpacing: "0.07em",
          marginBottom: "0.26rem",
          textShadow: "0 0 12px rgba(232,184,75,0.09)",
        }}
      >
        {root}
      </div>

      <div
        style={{
          fontSize: "0.82rem",
          color: COLORS.textSecondary,
          fontStyle: "italic",
          marginBottom: "0.3rem",
        }}
      >
        {lang} · {meaning}
      </div>

      <div
        style={{
          ...S.mono,
          fontSize: "0.56rem",
          color: COLORS.textFaint,
          letterSpacing: "0.11em",
          textTransform: "uppercase",
          marginBottom: puzzle.prompt ? "0.45rem" : "0",
        }}
      >
        {dateLabel}
      </div>

      {puzzle.prompt && (
        <div
          style={{
            fontSize: "0.78rem",
            color: COLORS.textMuted,
            borderLeft: `2px solid ${COLORS.goldDark}`,
            paddingLeft: "0.8rem",
            marginTop: "0.55rem",
            lineHeight: 1.72,
            maxWidth: "62ch",
            background:
              "linear-gradient(90deg, rgba(232,184,75,0.03), rgba(232,184,75,0.0))",
          }}
        >
          {puzzle.prompt}
        </div>
      )}
    </div>
  );
};

const RootPuzzle = ({
  puzzle,
  found,
  onWord,
  revealed,
  timedSettings,
}: {
  puzzle: Puzzle;
  found: string[];
  onWord: (word: string, isRequired: boolean) => void;
  revealed: boolean;
  timedSettings: TimedModeSettings;
}) => {
  const [input, setInput] = useState("");
  const [flash, setFlash] = useState<null | { msg: string; ok: boolean; bonus?: boolean }>(null);
  const [shake, setShake] = useState(false);
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
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
    if (!w || !puzzle.targets || !puzzle.required) return;
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
    } else {
      setShake(true);
      setFlash({ msg: "not in this puzzle", ok: false });
      setTimeout(() => setShake(false), 500);
    }

    setTimeout(() => setFlash(null), 1300);
  };

  const required = puzzle.required || [];
  const reqFound = found.filter((w) => required.includes(w));
  const bonusFound = found.filter(
    (w) => !required.includes(w) && (puzzle.targets || []).includes(w)
  );

  const root = getRoot(puzzle); // ✅ FIXED

  return (
    <div
      style={{
        position: "relative",
        border: `1px solid ${COLORS.blackLine}`,
        borderRadius: "4px",
        padding: "1rem",
        background: `linear-gradient(180deg, ${COLORS.surface2}, ${COLORS.surface})`,
      }}
    >
      <SystemMesh intensity={1} />

      {/* UI LAYER */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {!revealed && (
          <div style={{ marginBottom: "1.1rem" }}>
            <div style={{ display: "flex", gap: "8px", marginBottom: "0.45rem" }}>
              <input
                ref={ref}
                value={input}
                onChange={(e) => {
                  startInteraction();
                  setInput(e.target.value.toLowerCase());
                }}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder={`build a word using "${root}"…`}
                style={{
                  ...S.input,
                  border: `1px solid ${shake ? COLORS.red : COLORS.blackLine}`,
                  animation: shake ? "shake 0.4s ease" : "none",
                  flex: 1,
                  boxShadow: shake
                    ? `0 0 0 3px ${COLORS.redGlow}`
                    : "0 0 0 rgba(0,0,0,0)",
                }}
              />
              <button className="deriv-btn-primary" style={S.btnPrimary} onClick={submit}>
                enter
              </button>
            </div>

            {flash && (
              <div
                style={{
                  ...S.mono,
                  fontSize: "0.65rem",
                  color: flash.ok
                    ? flash.bonus
                      ? COLORS.cyan
                      : COLORS.gold
                    : COLORS.red,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {flash.msg}
              </div>
            )}
            {timedSettings.timedMode && !revealed && (
              <div style={{ ...S.mono, fontSize: "0.55rem", color: COLORS.textMuted, letterSpacing: "0.1em" }}>
                time left: {remainingSec ?? timedSettings.timeLimitSec}s
              </div>
            )}
          </div>
        )}

        <div
          style={{
            ...S.mono,
            fontSize: "0.58rem",
            color: COLORS.textFaint,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: "0.55rem",
          }}
        >
          {reqFound.length}/{required.length} found
          {bonusFound.length > 0 ? ` · +${bonusFound.length} related` : ""}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "0.55rem" }}>
          {required.map((w) => {
            const f = found.includes(w);
            return (
              <div
                key={w}
                className={f ? "gold-shimmer" : undefined}
                style={{
                  ...S.mono,
                  fontSize: "0.78rem",
                  padding: "0.3rem 0.62rem",
                  borderRadius: "2px",
                  background: f
                    ? "linear-gradient(180deg, rgba(232,184,75,0.15), rgba(232,184,75,0.05))"
                    : COLORS.surface,
                  border: f
                    ? `1px solid ${COLORS.goldDim}`
                    : `1px solid ${COLORS.blackLine}`,
                  color: f ? COLORS.gold : "#1e1808",
                  transition: "all 0.25s ease",
                  boxShadow: f ? `0 0 16px ${COLORS.goldGlow}` : "none",
                }}
              >
                {f ? w : "·".repeat(Math.max(3, w.length))}
              </div>
            );
          })}
        </div>

        {bonusFound.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {bonusFound.map((w) => (
              <div
                key={w}
                className="cyan-shimmer"
                style={{
                  ...S.mono,
                  fontSize: "0.7rem",
                  padding: "0.24rem 0.52rem",
                  borderRadius: "2px",
                  background: "rgba(78,207,207,0.08)",
                  border: `1px solid rgba(78,207,207,0.4)`,
                  color: COLORS.cyan,
                  boxShadow: `0 0 16px ${COLORS.cyanGlow}`,
                }}
              >
                {w}
                <span style={{ color: COLORS.cyanDim, fontSize: "0.58rem" }}>
                  related
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ROOT GRAPH — sits below the puzzle UI in its own block */}
      <div style={{ position: "relative", height: "320px", marginTop: "0.75rem" }}>
        <RootGraph
          root={root}
          required={required}
          found={found}
          bonus={bonusFound}
        />
      </div>
    </div>
  );
};

type ClassifyStep = Extract<Step, { type: "CLASSIFY" }>;

const StepPuzzle = ({
  puzzle,
  state,
  onState,
  revealed,
}: {
  puzzle: Puzzle;
  state: PuzzleState;
  onState: (s: PuzzleState) => void;
  revealed: boolean;
}) => {
  const steps: Step[] = puzzle.steps || [];
  const stepAnswers: Record<number, string> = state.stepAnswers || {};
  const [flash, setFlash] = useState<{ correct: boolean; text: string } | null>(null);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    setFlash(null);
    setLocked(false);
  }, [puzzle.date, puzzle.type]);

  const currentIdx = steps.findIndex((_, i) => stepAnswers[i] === undefined);
  const allDone = steps.length > 0 && currentIdx === -1;
  const currentStep: Step | null = allDone ? null : (steps[currentIdx] ?? null);

  const classifyEntries = steps.reduce<Array<{ s: ClassifyStep; i: number }>>(
    (acc, s, i) => { if (s.type === "CLASSIFY") acc.push({ s, i }); return acc; },
    []
  );
  const totalClassify = classifyEntries.length;
  const correctClassify = classifyEntries.filter(({ s, i }) => stepAnswers[i] === s.correct).length;
  const answeredCount = Object.keys(stepAnswers).length;
  const progressPct = steps.length > 0 ? (answeredCount / steps.length) * 100 : 0;

  const submitAnswer = (answer: string): void => {
    if (locked || currentIdx === -1 || !currentStep) return;
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

  const cardStyle: React.CSSProperties = {
    position: "relative",
    border: `1px solid ${COLORS.blackLine}`,
    borderRadius: "4px",
    padding: "1rem",
    background: `linear-gradient(180deg, ${COLORS.surface2}, ${COLORS.surface})`,
    overflow: "hidden",
  };

  const renderOptions = (options: string[]) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
      {options.map((opt: string) => (
        <button
          key={opt}
          disabled={locked}
          onClick={() => submitAnswer(opt)}
          className="deriv-btn"
          style={{ ...S.btnSm, width: "100%", textAlign: "left", padding: "0.6rem 0.9rem", fontSize: "0.72rem", opacity: locked ? 0.55 : 1, cursor: locked ? "default" : "pointer", letterSpacing: "0.04em" }}
        >
          {opt}
        </button>
      ))}
    </div>
  );

  if (allDone || revealed) {
    return (
      <div style={cardStyle}>
        <SystemMesh intensity={0.85} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ ...S.mono, fontSize: "0.56rem", letterSpacing: "0.14em", textTransform: "uppercase", color: COLORS.textFaint, marginBottom: "0.85rem" }}>
            {correctClassify} / {totalClassify} classified correctly
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {classifyEntries.map(({ s: step, i }) => {
              const answer = stepAnswers[i];
              const isCorrect = answer === step.correct;
              return (
                <div
                  key={step.word + i}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "0.65rem",
                    padding: "0.35rem 0.6rem",
                    borderRadius: "3px",
                    background: isCorrect ? "rgba(232,184,75,0.07)" : "rgba(139,58,58,0.07)",
                    border: `1px solid ${isCorrect ? "rgba(232,184,75,0.18)" : "rgba(139,58,58,0.18)"}`,
                  }}
                >
                  <span style={{ ...S.mono, fontSize: "0.82rem", color: COLORS.textPrimary, minWidth: "80px" }}>{step.word}</span>
                  <span style={{ ...S.mono, fontSize: "0.55rem", color: COLORS.textFaint }}>→</span>
                  <span style={{ ...S.mono, fontSize: "0.65rem", color: isCorrect ? COLORS.gold : COLORS.red, flex: 1 }}>
                    {answer || "—"}
                    {revealed && !isCorrect && (
                      <span style={{ color: COLORS.textFaint, marginLeft: "0.5rem" }}>(was: {step.correct})</span>
                    )}
                  </span>
                  <span style={{ fontSize: "0.7rem", color: isCorrect ? COLORS.gold : COLORS.red }}>{isCorrect ? "✓" : "✗"}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (!currentStep) return null;

  return (
    <div style={cardStyle}>
      <SystemMesh intensity={0.92} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "1.1rem" }}>
          <div style={{ ...S.mono, fontSize: "0.54rem", color: COLORS.textFaint, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "0.3rem" }}>
            step {answeredCount + 1} of {steps.length}
          </div>
          <div style={{ height: "2px", background: "rgba(232,184,75,0.12)", borderRadius: "1px" }}>
            <div style={{ height: "100%", width: `${progressPct}%`, background: COLORS.goldDim, borderRadius: "1px", transition: "width 0.35s ease" }} />
          </div>
        </div>

        {currentStep.type === "CLASSIFY" && (
          <>
            <div style={{ ...S.mono, fontSize: "0.54rem", color: COLORS.textFaint, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              classify this word
            </div>
            <div style={{ fontSize: "2rem", fontWeight: 600, color: COLORS.textPrimary, letterSpacing: "0.03em", marginBottom: "1.4rem", textShadow: "0 0 20px rgba(232,184,75,0.12)" }}>
              {currentStep.word}
            </div>
            {renderOptions(currentStep.options)}
          </>
        )}

        {currentStep.type === "GUESS_SYSTEM" && (
          <>
            <div style={{ ...S.mono, fontSize: "0.54rem", color: COLORS.textFaint, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              what system underlies these words?
            </div>
            {renderOptions(currentStep.options)}
          </>
        )}

        {currentStep.type === "INFO" && (
          <>
            <div style={{ ...S.mono, fontSize: "0.72rem", color: COLORS.textSecondary, lineHeight: 1.6, padding: "0.75rem 0 1rem" }}>
              {currentStep.text}
            </div>
            <button
              onClick={() => submitAnswer("__info__")}
              className="deriv-btn"
              style={{ ...S.btnSm, padding: "0.5rem 1.1rem", fontSize: "0.68rem", letterSpacing: "0.06em" }}
            >
              continue
            </button>
          </>
        )}

        {flash !== null && (
          <div style={{ ...S.mono, fontSize: "0.63rem", letterSpacing: "0.1em", textTransform: "uppercase", color: flash.correct ? COLORS.gold : COLORS.red, marginTop: "0.9rem" }}>
            {flash.text}
          </div>
        )}
      </div>
    </div>
  );
};

const MatchPuzzle = ({
  puzzle,
  state,
  onState,
  revealed,
  timedSettings,
}: {
  puzzle: Puzzle;
  state: PuzzleState;
  onState: (s: PuzzleState) => void;
  revealed: boolean;
  timedSettings: TimedModeSettings;
}) => {
  const pairs = puzzle.pairs || [];
  const choices = Array.from(new Set(pairs.map((pair) => pair.target)));
  const selected = state?.assigned || {};
  const correctCount = pairs.filter((pair) => selected[pair.source] === pair.target).length;
  const [timeoutFlash, setTimeoutFlash] = useState(false);

  const { remainingSec, startInteraction, resetInteraction } = useTimedInteraction({
    ...timedSettings,
    onTimeout: () => {
      setTimeoutFlash(true);
      setTimeout(() => setTimeoutFlash(false), 1200);
    },
    resetKey: `${puzzle.date}-${puzzle.type}-match`,
  });

  const onChange = (source: string, target: string) => {
    startInteraction();
    onState({ ...state, assigned: { ...selected, [source]: target } });
    resetInteraction();
  };

  return (
    <div
      style={{
        border: `1px solid ${COLORS.blackLine}`,
        borderRadius: "4px",
        padding: "1rem",
        background: `linear-gradient(180deg, ${COLORS.surface2}, ${COLORS.surface})`,
      }}
    >
      <div style={{ ...S.mono, fontSize: "0.58rem", color: COLORS.textFaint, marginBottom: "0.75rem" }}>
        {correctCount}/{pairs.length} matched correctly
      </div>
      {timedSettings.timedMode && (
        <div style={{ ...S.mono, fontSize: "0.55rem", color: timeoutFlash ? COLORS.red : COLORS.textMuted, marginBottom: "0.6rem", letterSpacing: "0.1em" }}>
          {timeoutFlash ? "time expired" : `time left: ${remainingSec ?? timedSettings.timeLimitSec}s`}
        </div>
      )}
      <div style={{ display: "grid", gap: "0.6rem" }}>
        {pairs.map((pair) => {
          const chosen = selected[pair.source] || "";
          const isCorrect = chosen === pair.target;
          return (
            <div
              key={pair.source}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(120px, 1fr) 1.4fr",
                gap: "0.5rem",
                alignItems: "center",
              }}
            >
              <div style={{ ...S.mono, color: COLORS.cyan, fontSize: "0.8rem" }}>{pair.source}</div>
              <select
                value={chosen}
                disabled={revealed}
                onChange={(e) => onChange(pair.source, e.target.value)}
                style={{
                  ...S.input,
                  fontSize: "0.74rem",
                  color: revealed && isCorrect ? COLORS.gold : COLORS.textPrimary,
                  borderColor: revealed ? (isCorrect ? COLORS.goldDim : COLORS.red) : COLORS.blackLine,
                }}
              >
                <option value="">select gloss…</option>
                {choices.map((choice) => (
                  <option key={choice} value={choice}>
                    {choice}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const GrimmPuzzle = ({
  puzzle,
  state,
  onState,
  revealed,
  timedSettings,
}: {
  puzzle: Puzzle;
  state: PuzzleState;
  onState: (s: PuzzleState) => void;
  revealed: boolean;
  timedSettings: TimedModeSettings;
}) => {
  const answers = state?.answers || {};
  const [inputs, setInputs] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<Record<number, string | null>>({});
  const [timerExpired, setTimerExpired] = useState(false);

  const pairs = puzzle.pairs || [];
  const { remainingSec, startInteraction, resetInteraction } = useTimedInteraction({
    ...timedSettings,
    onTimeout: () => {
      setTimerExpired(true);
      setTimeout(() => setTimerExpired(false), 1200);
    },
    resetKey: `${puzzle.date}-${puzzle.type}-grimm`,
  });

  const submit = (idx: number) => {
    const val = (inputs[idx] || "").trim().toLowerCase();
    if (!val) return;
    resetInteraction();
    const pair = pairs[idx];
    if (!pair) return;
    const correct = val === pair.target.toLowerCase();
    const newAnswers = { ...answers };
    if (correct) newAnswers[idx] = val;
    onState({ ...state, answers: newAnswers });
    setFeedback((f) => ({ ...f, [idx]: correct ? "correct" : "wrong" }));
    if (correct) setInputs((i) => ({ ...i, [idx]: "" }));
    setTimeout(() => setFeedback((f) => ({ ...f, [idx]: null })), 1200);
  };

  const correctCount = Object.keys(answers).length;
  const total = pairs.length;

  return (
    <div
      style={{
        position: "relative",
        border: `1px solid ${COLORS.blackLine}`,
        borderRadius: "4px",
        padding: "1rem",
        background: `linear-gradient(180deg, ${COLORS.surface2}, ${COLORS.surface})`,
        overflow: "hidden",
      }}
    >
      <SystemMesh intensity={0.88} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            ...S.mono,
            fontSize: "0.58rem",
            color: COLORS.textFaint,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}
        >
          {correctCount}/{total} found
        </div>
        {timedSettings.timedMode && (
          <div style={{ ...S.mono, fontSize: "0.55rem", color: timerExpired ? COLORS.red : COLORS.textMuted, marginBottom: "0.6rem", letterSpacing: "0.1em" }}>
            {timerExpired ? "time expired" : `time left: ${remainingSec ?? timedSettings.timeLimitSec}s`}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {pairs.map((pair, idx) => {
            const solved = !!answers[idx] || revealed;
            const fb = feedback[idx];

            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  background: `linear-gradient(180deg, ${COLORS.surface2}, ${COLORS.surface})`,
                  border: `1px solid ${COLORS.blackLine}`,
                  borderRadius: "3px",
                  padding: "0.6rem 0.75rem",
                }}
              >
                <div
                  style={{
                    flex: "0 0 220px",
                    ...S.mono,
                    fontSize: "0.78rem",
                    color: COLORS.textSecondary,
                    lineHeight: 1.4,
                  }}
                >
                  {pair.source}
                </div>

                <div style={{ ...S.mono, fontSize: "0.65rem", color: COLORS.textFaint, flexShrink: 0 }}>
                  →
                </div>

                {solved ? (
                  <div style={{ ...S.mono, fontSize: "0.85rem", color: COLORS.gold, flex: 1 }}>
                    {pair.target}
                    {pair.note && (
                      <span style={{ color: COLORS.textMuted, fontSize: "0.62rem", marginLeft: "0.5rem" }}>
                        {pair.note}
                      </span>
                    )}
                  </div>
                ) : (
                  <div style={{ display: "flex", gap: "6px", flex: 1 }}>
                    <input
                      value={inputs[idx] || ""}
                      onChange={(e) => {
                        startInteraction();
                        setInputs((i) => ({ ...i, [idx]: e.target.value.toLowerCase() }));
                      }}
                      onKeyDown={(e) => e.key === "Enter" && submit(idx)}
                      placeholder="english word…"
                      style={{
                        ...S.input,
                        flex: 1,
                        padding: "0.3rem 0.55rem",
                        fontSize: "0.78rem",
                        border: `1px solid ${fb === "wrong" ? COLORS.red : COLORS.blackLine}`,
                      }}
                    />
                    <button
                      className="deriv-btn-primary"
                      style={{ ...S.btnPrimary, padding: "0.3rem 0.55rem", fontSize: "0.62rem" }}
                      onClick={() => submit(idx)}
                    >
                      →
                    </button>
                  </div>
                )}

                {fb && !solved && (
                  <div
                    style={{
                      ...S.mono,
                      fontSize: "0.6rem",
                      color: fb === "correct" ? COLORS.gold : COLORS.red,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      flexShrink: 0,
                    }}
                  >
                    {fb}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const SemanticPuzzle = ({
  puzzle,
  state,
  onState,
  revealed,
  timedSettings,
}: {
  puzzle: Puzzle;
  state: PuzzleState;
  onState: (s: PuzzleState) => void;
  revealed: boolean;
  timedSettings: TimedModeSettings;
}) => {
  const answers = state?.answers || {};
  const [inputs, setInputs] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<Record<number, string | null>>({});
  const [timerExpired, setTimerExpired] = useState(false);

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

  const submit = (blankIdx: number, correctMeaning: string) => {
    const val = (inputs[blankIdx] || "").trim().toLowerCase();
    if (!val) return;
    resetInteraction();

    const keywords = correctMeaning
      .toLowerCase()
      .split(/[\s,;:—–-]+/)
      .filter((w) => w.length > 3);

    const isClose = keywords.some((k) => val.includes(k) || k.includes(val));

    if (isClose) {
      onState({ ...state, answers: { ...answers, [blankIdx]: val } });
      setFeedback((f) => ({ ...f, [blankIdx]: "correct" }));
    } else {
      setFeedback((f) => ({ ...f, [blankIdx]: "wrong" }));
    }

    setTimeout(() => setFeedback((f) => ({ ...f, [blankIdx]: null })), 1200);
  };

  let blankIdx = 0;

  return (
    <div
      style={{
        position: "relative",
        border: `1px solid ${COLORS.blackLine}`,
        borderRadius: "4px",
        padding: "1rem",
        background: `linear-gradient(180deg, ${COLORS.surface2}, ${COLORS.surface})`,
        overflow: "hidden",
      }}
    >
      <SystemMesh intensity={0.82} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            ...S.mono,
            fontSize: "0.72rem",
            color: COLORS.gold,
            letterSpacing: "0.08em",
            marginBottom: "0.9rem",
            fontStyle: "italic",
          }}
        >
          "{puzzle.word}"
        </div>

        <div
          style={{
            ...S.mono,
            fontSize: "0.58rem",
            color: COLORS.textFaint,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}
        >
          {correctCount}/{blanks.length} filled
        </div>
        {timedSettings.timedMode && (
          <div style={{ ...S.mono, fontSize: "0.55rem", color: timerExpired ? COLORS.red : COLORS.textMuted, marginBottom: "0.6rem", letterSpacing: "0.1em" }}>
            {timerExpired ? "time expired" : `time left: ${remainingSec ?? timedSettings.timeLimitSec}s`}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {timeline.map((item, idx) => {
            const isBlank = item.blank;
            const myBlankIdx = isBlank ? blankIdx++ : -1;
            const solved = isBlank && (!!answers[myBlankIdx] || revealed);
            const fb = isBlank ? feedback[myBlankIdx] : null;
            const isLast = idx === timeline.length - 1;

            return (
              <div key={idx} style={{ display: "flex", gap: 0, alignItems: "stretch" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flexShrink: 0,
                    width: "20px",
                  }}
                >
                  <div style={{ width: "2px", flex: 1, background: idx === 0 ? "transparent" : COLORS.blackLine }} />
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: solved || !isBlank ? COLORS.gold : COLORS.blackLine,
                      flexShrink: 0,
                      border: `1px solid ${COLORS.goldDim}`,
                      boxShadow: solved ? `0 0 12px ${COLORS.goldGlow}` : "none",
                    }}
                  />
                  <div
                    style={{
                      width: "2px",
                      flex: 1,
                      background: isLast ? "transparent" : COLORS.blackLine,
                    }}
                  />
                </div>

                <div
                  style={{
                    paddingLeft: "0.75rem",
                    paddingTop: "0.15rem",
                    paddingBottom: "0.75rem",
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      ...S.mono,
                      fontSize: "0.62rem",
                      color: COLORS.textMuted,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: "0.2rem",
                    }}
                  >
                    {item.era}
                  </div>

                  {isBlank && !solved ? (
                    <div>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <input
                          value={inputs[myBlankIdx] || ""}
                          onChange={(e) => {
                            startInteraction();
                            setInputs((i) => ({ ...i, [myBlankIdx]: e.target.value }));
                          }}
                          onKeyDown={(e) =>
                            e.key === "Enter" && submit(myBlankIdx, item.meaning)
                          }
                          placeholder="what did it mean here?"
                          style={{
                            ...S.input,
                            flex: 1,
                            padding: "0.3rem 0.55rem",
                            fontSize: "0.78rem",
                            border: `1px solid ${fb === "wrong" ? COLORS.red : COLORS.blackLine}`,
                          }}
                        />
                        <button
                          className="deriv-btn-primary"
                          style={{ ...S.btnPrimary, padding: "0.3rem 0.6rem", fontSize: "0.62rem" }}
                          onClick={() => submit(myBlankIdx, item.meaning)}
                        >
                          →
                        </button>
                      </div>

                      {fb && (
                        <div
                          style={{
                            ...S.mono,
                            fontSize: "0.6rem",
                            color: fb === "correct" ? COLORS.gold : COLORS.red,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            marginTop: "0.25rem",
                          }}
                        >
                          {fb}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      style={{
                        fontSize: "0.82rem",
                        color: isBlank ? COLORS.gold : COLORS.textSecondary,
                        lineHeight: 1.5,
                      }}
                    >
                      {item.meaning}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const IdiomPuzzle = ({
  puzzle,
  state,
  onState,
  revealed,
  timedSettings,
}: {
  puzzle: Puzzle;
  state: PuzzleState;
  onState: (s: PuzzleState) => void;
  revealed: boolean;
  timedSettings: TimedModeSettings;
}) => {
  const [input, setInput] = useState("");
  const [flash, setFlash] = useState<null | { msg: string; ok: boolean }>(null);
  const [shake, setShake] = useState(false);
  const ref = useRef<HTMLInputElement | null>(null);

  const answer = puzzle.answer || "";
  const answerWords = answer.split(" ");
  const idiomFound: number[] = state?.idiomFound || [];

  useEffect(() => {
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
  const color = TYPE_COLORS["IDIOM"];

  const submit = () => {
    const raw = input.trim().toLowerCase();
    setInput("");
    if (!raw) return;
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
    } else if (allPositions.length > 0) {
      setFlash({ msg: "already found", ok: false });
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } else {
      setFlash({ msg: "not in this phrase", ok: false });
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
    setTimeout(() => setFlash(null), 1400);
  };

  return (
    <div
      style={{
        position: "relative",
        border: `1px solid ${COLORS.blackLine}`,
        borderRadius: "4px",
        padding: "1rem",
        background: `linear-gradient(180deg, ${COLORS.surface2}, ${COLORS.surface})`,
      }}
    >
      <SystemMesh intensity={0.85} />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* Blank word slots */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "1.1rem",
            padding: "0.85rem 0.75rem",
            background: isAllFound ? `${color}09` : "rgba(255,255,255,0.02)",
            border: `1px solid ${isAllFound ? color + "44" : COLORS.blackLine}`,
            borderRadius: "3px",
            boxShadow: isAllFound ? `0 0 24px ${color}18` : "none",
            transition: "all 0.35s ease",
          }}
        >
          {answerWords.map((word, i) => {
            const found = idiomFound.includes(i) || revealed;
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "3px",
                }}
              >
                <div
                  style={{
                    ...S.mono,
                    fontSize: "0.9rem",
                    letterSpacing: "0.06em",
                    color: found
                      ? isAllFound
                        ? color
                        : COLORS.textPrimary
                      : "transparent",
                    borderBottom: found
                      ? `1px solid ${isAllFound ? color + "88" : COLORS.goldDark}`
                      : `1px solid ${COLORS.textFaint}`,
                    minWidth: `${word.length * 0.62}rem`,
                    textAlign: "center",
                    paddingBottom: "1px",
                    transition: "color 0.25s ease, border-color 0.25s ease",
                  }}
                >
                  {found ? word : "\u00a0".repeat(word.length)}
                </div>
                {!found && (
                  <span
                    style={{
                      ...S.mono,
                      fontSize: "0.5rem",
                      color: COLORS.textFaint,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {word.length}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Input row */}
        {!isComplete && (
          <div style={{ marginBottom: "0.65rem" }}>
            <div style={{ display: "flex", gap: "8px", marginBottom: "0.45rem" }}>
              <input
                ref={ref}
                value={input}
                onChange={(e) => {
                  startInteraction();
                  setInput(e.target.value.toLowerCase());
                }}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder="guess a word…"
                style={{
                  ...S.input,
                  border: `1px solid ${shake ? COLORS.red : COLORS.blackLine}`,
                  animation: shake ? "shake 0.4s ease" : "none",
                  flex: 1,
                  boxShadow: shake ? `0 0 0 3px ${COLORS.redGlow}` : "none",
                }}
              />
              <button className="deriv-btn-primary" style={S.btnPrimary} onClick={submit}>
                enter
              </button>
            </div>
            {flash && (
              <div
                style={{
                  ...S.mono,
                  fontSize: "0.65rem",
                  color: flash.ok ? color : COLORS.red,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {flash.msg}
              </div>
            )}
            {timedSettings.timedMode && (
              <div style={{ ...S.mono, fontSize: "0.55rem", color: COLORS.textMuted, letterSpacing: "0.1em" }}>
                time left: {remainingSec ?? timedSettings.timeLimitSec}s
              </div>
            )}
          </div>
        )}

        {/* All-found celebration */}
        {isAllFound && !revealed && (
          <div
            style={{
              ...S.mono,
              fontSize: "0.6rem",
              color,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: "0.65rem",
              animation: "textGlow 2s ease-in-out infinite",
            }}
          >
            expression reconstructed ◈
          </div>
        )}

        {/* Progress counter */}
        <div
          style={{
            ...S.mono,
            fontSize: "0.56rem",
            color: COLORS.textFaint,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginTop: "0.25rem",
          }}
        >
          {idiomFound.length}/{answerWords.length} words found
        </div>
      </div>
    </div>
  );
};

export default function Derivative() {
  const [view, setView] = useState<"splash" | "ready" | "archive" | "game">("splash");
  const [selDate, setSelDate] = useState<string | null>(null);
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [progress, setProgress] = useState<ProgressStore>(load());
  const [timedSettings, setTimedSettings] = useState<TimedModeSettings>(loadTimedModeSettings());
  const [revealed, setRevealed] = useState(false);
  const [puzzleState, setPuzzleState] = useState<PuzzleState>({});
  const [shareMsg, setShareMsg] = useState<ShareData | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);

  const today = getTodayStr();
  const archiveDates = useMemo(() => getMonthDates(today), [today]);

  useEffect(() => {
    saveTimedModeSettings(timedSettings);
  }, [timedSettings]);

  const getProgress = (dateStr: string): PuzzleProgressEntry => {
    const entry = progress[dateStr];
    return isPuzzleProgressEntry(entry) ? entry : {};
  };

  const openPuzzle = (dateStr: string) => {
    const p = getPuzzleForDate(dateStr);
    if (!p) return;
    const saved = getProgress(dateStr);
    setSelDate(dateStr);
    setPuzzle(p);
    setRevealed(saved.revealed || false);
    setPuzzleState(saved.state || {});
    setShareMsg(null);
    const data = load();
    const isFirstEntry = !data._hasSeenTutorial;
    if (!data._hasPlayed || isFirstEntry) {
      save({ ...data, _hasPlayed: true, _hasSeenTutorial: true });
    }
    if (isFirstEntry) setShowTutorial(true);
    setView("game");
  };

  const updProgress = (dateStr: string, newState: PuzzleState, newRevealed: boolean, discoveredType?: PuzzleType) => {
    const baseNext = { ...progress, [dateStr]: { state: newState, revealed: newRevealed } };
    let next = baseNext;
    if (discoveredType) {
      const discovery = withDiscoveredSystem(baseNext, discoveredType);
      next = discovery.nextStore;
      if (discovery.wasAdded && discovery.uncoveredSystem) {
        console.log(`You uncovered: ${discovery.uncoveredSystem}`);
      }
    }
    setProgress(next);
    save(next);
  };

  const handlePuzzleState = (newState: PuzzleState) => {
    if (!selDate) return;
    setPuzzleState(newState);
    const unlockedByCompletion = puzzle && isComplete(newState);
    updProgress(selDate, newState, revealed, unlockedByCompletion ? puzzle.type : undefined);
  };

  const handleWordFound = (word: string, _isRequired: boolean) => {
    if (!selDate) return;
    const current = puzzleState.found || [];
    const newFound = current.includes(word) ? current : [...current, word];
    const nextState = { ...puzzleState, found: newFound };
    setPuzzleState(nextState);
    const unlockedByCompletion = puzzle && isComplete(nextState);
    updProgress(selDate, nextState, revealed, unlockedByCompletion ? puzzle.type : undefined);
  };

  const handleReveal = () => {
    if (!selDate || !puzzle) return;
    setRevealed(true);
    updProgress(selDate, puzzleState, true, puzzle.type);
  };

  const isComplete = (state: PuzzleState = puzzleState) => {
    if (!puzzle) return false;

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
      const idiomFound: number[] = state.idiomFound || [];
      return idiomFound.length === (puzzle.answer || "").split(" ").length;
    }

    return false;
  };

  const buildShare = () => {
    if (!puzzle || !selDate) return;

    const toRoman = (n: number) => {
      const v: [number, string][] = [
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

    const diffLevel = getDifficulty(puzzle.type, puzzle.lensId ?? "DEFAULT");
    const diffIcon = DIFFICULTY_SHARE_ICONS[diffLevel] || "○";
    const typeIcon = TYPE_SHARE_ICONS[puzzle.type] || "◇";
    const iconRow = `◈  ${diffIcon}  ${typeIcon}`;

    let tracker = "";
    if (puzzle.type === "ROOT") {
      const found = puzzleState.found || [];
      tracker = (puzzle.required || []).map((w) => (found.includes(w) ? "◈" : "◇")).join("");
    } else if (["SUPPLETIVE", "PIE", "COLLISION", "DECEPTION", "FALSE_FAMILY", "PHANTOM_ROOT", "BORROWED", "TOPONYM"].includes(puzzle.type)) {
      const sa = puzzleState.stepAnswers || {};
      type _CS = Extract<Step, { type: "CLASSIFY" }>;
      const sortSteps = (puzzle.steps || []).reduce<Array<{ s: _CS; i: number }>>(
        (acc, s, i) => { if (s.type === "CLASSIFY") acc.push({ s, i }); return acc; },
        []
      );
      tracker = sortSteps.map(({ s, i }) => (sa[i] === s.correct ? "◈" : "◇")).join("");
    } else if (puzzle.type === "MATCH") {
      const assigned = puzzleState.assigned || {};
      tracker = (puzzle.pairs || []).map((pair) => (assigned[pair.source] === pair.target ? "◈" : "◇")).join("");
    } else if (puzzle.type === "GRIMM") {
      const answers = puzzleState.answers || {};
      tracker = (puzzle.pairs || []).map((_, i) => (answers[i] ? "◈" : "◇")).join("");
    } else if (puzzle.type === "SEMANTIC") {
      const answers = puzzleState.answers || {};
      const blanks = (puzzle.timeline || []).filter((t) => t.blank);
      tracker = blanks.map((_, i) => (answers[i] ? "◈" : "◇")).join("");
    } else if (puzzle.type === "IDIOM") {
      const idiomFound: number[] = puzzleState.idiomFound || [];
      const answerWords = (puzzle.answer || "").split(" ");
      tracker = answerWords.map((_, i) => (idiomFound.includes(i) ? "◈" : "◇")).join("");
    }

    const url = "www.themeansofproduction.press/derivative";

    const sections: ShareSection[] = [
      { text: "◈ DERIVATIVE ◈\nThe Game of the Lingua Imperii", color: COLORS.gold },
      { text: dateRoman, color: "#4ecfcf" },
      { text: iconRow, color: COLORS.gold },
      { text: tracker, color: COLORS.gold, isTracker: true },
      { text: url, color: COLORS.goldDim },
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

  const statusFor = (dateStr: string) => {
    const p = getProgress(dateStr);
    if (!p || !p.state) return "unplayed";
    const puz = getPuzzleForDate(dateStr);
    if (!puz) return "unplayed";
    if (p.revealed) return "complete";
    const s = p.state;
    if (puz.type === "ROOT" && (s.found || []).length > 0) return "partial";
    if (
      ["SUPPLETIVE", "PIE", "COLLISION", "DECEPTION", "FALSE_FAMILY", "PHANTOM_ROOT", "BORROWED", "TOPONYM"].includes(puz.type) &&
      Object.keys(s.stepAnswers || {}).length > 0
    )
      return "partial";
    if (puz.type === "GRIMM" && Object.keys(s.answers || {}).length > 0) return "partial";
    if (puz.type === "SEMANTIC" && Object.keys(s.answers || {}).length > 0) return "partial";
    if (puz.type === "IDIOM" && (s.idiomFound || []).length > 0) return "partial";
    return "unplayed";
  };

  const bgStyle: React.CSSProperties = {
    minHeight: "520px",
    background: `linear-gradient(180deg, ${COLORS.bg}, ${COLORS.bg2})`,
    position: "relative",
    overflow: "hidden",
  };

  if (view === "splash") {
    return (
      <div
        style={{
          ...bgStyle,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100dvh",
          padding: "4rem 2rem 3rem",
          textAlign: "center",
        }}
      >
        <GlobalFX />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${SPLASH_IMAGE})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.35,
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to bottom, rgba(7,6,5,0.55) 0%, rgba(7,6,5,0.88) 60%, rgba(7,6,5,0.98) 100%)",
            zIndex: 0,
          }}
        />
        <Starfield />
        <AmbientOverlays />

        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "500px", width: "100%" }}>
          {/* Wordmark as masthead */}
          <div
            className="deriv-title"
            data-text="DERIVATIVE"
            style={{
              ...S.mono,
              fontSize: "2.2rem",
              fontWeight: 400,
              color: COLORS.gold,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: "2.2rem",
              userSelect: "none",
            }}
          >
            DERIVATIVE
            <br />
            The Game of the Lingua Imperii
          </div>

          {/* Separator */}
          <div
            style={{
              width: "40px",
              height: "1px",
              background: COLORS.goldLine,
              marginBottom: "2.2rem",
            }}
          />

          {/* Narrative */}
          <div
            style={{
              lineHeight: 2,
              color: COLORS.textSecondary,
              fontSize: "0.88rem",
              marginBottom: "0",
              textShadow: "0 0 12px rgba(0,0,0,0.32)",
            }}
          >
            <p style={{ margin: "0 0 0.6rem" }}>I want to play a game.</p>
            <p style={{ margin: "0 0 0.6rem" }}>The game is called English.</p>
            <p style={{ margin: "0 0 1.4rem" }}>
              You have been playing it since before you could walk.
              <br />
              You did not know you were playing.
              <br />
              You did not know there were rules.
              <br />
              You did not know the rules were made of older, broken rules.
            </p>
            <p style={{ margin: "0 0 1.4rem" }}>
              You did not know that <em>went</em> is a corpse wearing the wrong name.
              That <em>nice</em> meant ignorant. That <em>person</em> is a mask. That{" "}
              <em>be</em> and <em>am</em> and <em>was</em> have never, in any language, belonged together.
            </p>
            <p style={{ margin: "0 0 2rem" }}>
              You have been fluent your whole life in a language you have never truly known.
            </p>
          </div>

          {/* Final beat */}
          <p
            style={{
              ...S.mono,
              color: COLORS.gold,
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
              margin: "0 0 2.4rem",
              textTransform: "uppercase",
            }}
          >
            Do you want to play a game?
          </p>

          {/* CTA */}
          <button
            className="deriv-btn"
            style={{ ...S.btnPrimary, marginBottom: "1.6rem", padding: "0.6rem 2.2rem" }}
            onClick={() => openPuzzle(today)}
          >
            enter →
          </button>

          <button className="arch-link" onClick={() => setView("archive")}>
            archive
          </button>
        </div>
      </div>
    );
  }

  if (view === "ready") {
    const todayPuzzle = getPuzzleForDate(today);
    const todayStatus = statusFor(today);
    const typeLabel = todayPuzzle ? (TYPE_LABELS[todayPuzzle.type] || todayPuzzle.type) : "";
    const subLabel = todayPuzzle ? (TYPE_SUBLABELS[todayPuzzle.type] || "") : "";
    const typeColor = todayPuzzle ? (TYPE_COLORS[todayPuzzle.type] || COLORS.gold) : COLORS.gold;
    const TypeIcon = todayPuzzle ? TYPE_ICONS[todayPuzzle.type] : null;

    const statusDot = todayStatus === "complete"
      ? { symbol: "◈", color: COLORS.gold, label: "complete" }
      : todayStatus === "partial"
      ? { symbol: "◑", color: COLORS.goldDim, label: "in progress" }
      : { symbol: "◇", color: COLORS.textMuted, label: "not yet played" };

    return (
      <div
        style={{
          ...bgStyle,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100dvh",
          padding: "3rem 2rem",
          textAlign: "center",
        }}
      >
        <GlobalFX />
        <Starfield />
        <AmbientOverlays />

        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0" }}>
          {/* Wordmark */}
          <div
            className="deriv-title"
            data-text="DERIVATIVE"
            onClick={() => openPuzzle(today)}
            style={{
              ...S.mono,
              fontSize: "2.2rem",
              fontWeight: 400,
              color: COLORS.gold,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: "2.8rem",
              userSelect: "none",
              cursor: "pointer",
            }}
          >
            DERIVATIVE
          </div>

          {/* Today's puzzle type card */}
          {todayPuzzle && (
            <div
              onClick={() => openPuzzle(today)}
              style={{
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
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
                {TypeIcon && <TypeIcon color={typeColor} />}
                <span
                  style={{
                    ...S.mono,
                    fontSize: "0.7rem",
                    letterSpacing: "0.14em",
                    color: typeColor,
                    textTransform: "uppercase",
                  }}
                >
                  {typeLabel}
                </span>
              </div>
              <span
                style={{
                  ...S.mono,
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  color: COLORS.textMuted,
                  textTransform: "uppercase",
                }}
              >
                {subLabel}
              </span>
            </div>
          )}

          {/* Status + date row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.7rem",
              marginBottom: "2.2rem",
            }}
          >
            <span
              style={{
                ...S.mono,
                fontSize: "0.78rem",
                color: statusDot.color,
              }}
            >
              {statusDot.symbol}
            </span>
            <span
              style={{
                ...S.mono,
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
                color: COLORS.textMuted,
                textTransform: "uppercase",
              }}
            >
              {statusDot.label}
            </span>
          </div>

          {/* Play CTA */}
          <button
            className="deriv-btn"
            style={{ ...S.btnPrimary, marginBottom: "1.4rem", padding: "0.55rem 1.8rem" }}
            onClick={() => openPuzzle(today)}
          >
            play today →
          </button>

          <button className="arch-link" onClick={() => setView("archive")}>
            archive
          </button>
        </div>
      </div>
    );
  }

  if (view === "archive") {
    const monthLabel = new Date(today + "T12:00:00").toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    return (
      <div style={{ ...bgStyle, padding: "2rem" }}>
        <GlobalFX />
        <Starfield />
        <AmbientOverlays />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <button className="deriv-btn" style={S.btnSm} onClick={() => setView("ready")}>
              ← back
            </button>
            <span
              style={{
                ...S.mono,
                color: COLORS.gold,
                fontSize: "0.75rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              Archive — {monthLabel}
            </span>
            <button
              className="deriv-btn"
              style={{ ...S.btnSm, padding: "0.18rem 0.5rem", minWidth: "1.9rem" }}
              onClick={() => window.location.reload()}
              aria-label="Reload archive"
              title="Reload"
            >
              ?
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7,1fr)",
              gap: "6px",
              maxWidth: "420px",
            }}
          >
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <div
                key={i}
                style={{
                  textAlign: "center",
                  ...S.mono,
                  fontSize: "0.6rem",
                  color: COLORS.textSecondary,
                  letterSpacing: "0.1em",
                  paddingBottom: "4px",
                }}
              >
                {d}
              </div>
            ))}

            {(() => {
              const [yearRaw, monthRaw] = today.split("-").map(Number);
              const year = yearRaw ?? new Date().getFullYear();
              const month = monthRaw ?? new Date().getMonth() + 1;
              return [...Array(new Date(year, month - 1, 1).getDay())].map((_, i) => (
              <div key={"p" + i} />
              ));
            })()}

            {archiveDates.map((dateStr) => {
              const day = parseInt(dateStr.split("-")[2] ?? "1", 10);
              const st = statusFor(dateStr);
              const isToday = dateStr === today;
              const archivePuzzle = getPuzzleForDate(dateStr);
              const diffColor = archivePuzzle
                ? DIFFICULTY_META[getDifficulty(archivePuzzle.type, archivePuzzle.lensId)].color
                : COLORS.textFaint;
              return (
                <button
                  key={dateStr}
                  onClick={() => openPuzzle(dateStr)}
                  style={{
                    background:
                      st === "complete"
                        ? "linear-gradient(180deg, rgba(232,184,75,0.15), rgba(232,184,75,0.06))"
                        : st === "partial"
                        ? "linear-gradient(180deg, rgba(232,184,75,0.10), rgba(20,18,8,1))"
                        : COLORS.surface2,
                    border: isToday
                      ? `1px solid ${COLORS.gold}`
                      : st === "complete"
                      ? `1px solid ${COLORS.goldDim}`
                      : st === "partial"
                      ? `1px solid ${COLORS.goldDark}`
                      : `1px solid ${COLORS.blackLine}`,
                    borderBottom: `2px solid ${diffColor}`,
                    color:
                      st === "complete"
                        ? COLORS.textPrimary
                        : st === "partial"
                        ? COLORS.goldDim
                        : isToday
                        ? COLORS.gold
                        : COLORS.textSecondary,
                    borderRadius: "3px",
                    padding: "0.45rem 0",
                    ...S.mono,
                    fontSize: "0.78rem",
                    cursor: "pointer",
                    textAlign: "center",
                    fontWeight: isToday ? 500 : 400,
                    boxShadow: isToday ? `0 0 18px ${COLORS.goldGlow}` : "none",
                  }}
                >
                  {day}
                  {st === "complete" && (
                    <span style={{ display: "block", fontSize: "0.35rem", color: COLORS.gold }}>
                      ●
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: "1.25rem", display: "flex", gap: "1.25rem" }}>
            {[
              ["unplayed", COLORS.textSecondary],
              ["partial", COLORS.goldDim],
              ["complete", COLORS.textPrimary],
            ].map(([l, c]) => (
              <span
                key={l}
                style={{
                  ...S.mono,
                  fontSize: "0.6rem",
                  color: c,
                  letterSpacing: "0.08em",
                }}
              >
                {l}
              </span>
            ))}
          </div>

          <div style={{ marginTop: "0.85rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {(["EASY", "MEDIUM", "HARD", "VERY_HARD"] as const).map((level) => {
              const m = DIFFICULTY_META[level];
              return (
                <span
                  key={level}
                  style={{
                    ...S.mono,
                    fontSize: "0.55rem",
                    color: m.color,
                    letterSpacing: "0.08em",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  <span style={{ display: "inline-block", width: "12px", height: "2px", background: m.color, borderRadius: "1px" }} />
                  {m.label}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    );
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
    const updateTimedMode = (checked: boolean) =>
      setTimedSettings((current) => ({ ...current, timedMode: checked }));
    const updateTimeLimit = (value: string) => {
      const parsed = Number(value);
      if (!Number.isFinite(parsed)) return;
      setTimedSettings((current) => ({
        ...current,
        timeLimitSec: Math.max(5, Math.min(180, Math.floor(parsed))),
      }));
    };

    return (
      <div
        style={{
          ...bgStyle,
          padding: "1.5rem 1.5rem 2.5rem",
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        <GlobalFX />
        <Starfield />
        <AmbientOverlays />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.25rem",
            }}
          >
            <button className="deriv-btn" style={S.btnSm} onClick={() => setView("ready")}>
              ← back
            </button>
            <span
              style={{
                ...S.mono,
                fontSize: "0.6rem",
                color: COLORS.textMuted,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              derivative system
            </span>
            <button className="deriv-btn" style={S.btnSm} onClick={() => setView("archive")}>
              archive
            </button>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "0.55rem", marginBottom: "0.85rem" }}>
            <label style={{ ...S.mono, fontSize: "0.57rem", color: COLORS.textMuted, letterSpacing: "0.1em", display: "inline-flex", alignItems: "center", gap: "0.35rem", textTransform: "uppercase" }}>
              <input type="checkbox" checked={timedSettings.timedMode} onChange={(e) => updateTimedMode(e.target.checked)} />
              timed mode
            </label>
            <input
              type="number"
              min={5}
              max={180}
              disabled={!timedSettings.timedMode}
              value={timedSettings.timeLimitSec}
              onChange={(e) => updateTimeLimit(e.target.value)}
              style={{ ...S.input, width: "88px", padding: "0.2rem 0.45rem", fontSize: "0.68rem", opacity: timedSettings.timedMode ? 1 : 0.5 }}
            />
          </div>

          <PuzzleHeader puzzle={puzzle} selDate={selDate} />

          {puzzle.type === "ROOT" && (
            <RootPuzzle
              puzzle={puzzle}
              found={puzzleState.found || []}
              onWord={handleWordFound}
              revealed={revealed}
              timedSettings={timedSettings}
            />
          )}

          {isSortType && (
            <StepPuzzle
              puzzle={puzzle}
              state={puzzleState}
              onState={handlePuzzleState}
              revealed={revealed}
            />
          )}

          {puzzle.type === "MATCH" && (
            <MatchPuzzle
              puzzle={puzzle}
              state={puzzleState}
              onState={handlePuzzleState}
              revealed={revealed}
              timedSettings={timedSettings}
            />
          )}

          {puzzle.type === "GRIMM" && (
            <GrimmPuzzle
              puzzle={puzzle}
              state={puzzleState}
              onState={handlePuzzleState}
              revealed={revealed}
              timedSettings={timedSettings}
            />
          )}

          {puzzle.type === "SEMANTIC" && (
            <SemanticPuzzle
              puzzle={puzzle}
              state={puzzleState}
              onState={handlePuzzleState}
              revealed={revealed}
              timedSettings={timedSettings}
            />
          )}

          {puzzle.type === "IDIOM" && (
            <IdiomPuzzle
              puzzle={puzzle}
              state={puzzleState}
              onState={handlePuzzleState}
              revealed={revealed}
              timedSettings={timedSettings}
            />
          )}

          {!revealed && (
            <button
              className="deriv-btn"
              style={{ ...S.btnSm, marginTop: "1rem" }}
              onClick={handleReveal}
            >
              reveal machinery →
            </button>
          )}

          <RevealSection puzzle={puzzle} visible={revealed || complete} onShare={buildShare} />
          {shareMsg && <ShareCard data={shareMsg} />}
          <TutorialModal visible={showTutorial} onClose={() => setShowTutorial(false)} />
        </div>
      </div>
    );
  }

  return null;
}
