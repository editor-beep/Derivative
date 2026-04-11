import { useEffect, useMemo, useRef, useState } from "react";
import { generateDailyPuzzle } from "./generator";
import RootGraph from "./components/RootGraph";
import type { PuzzleType, Reveal } from "./types";

type PuzzleGroup = {
  id: string;
  label: string;
  accepts: string[];
  related: string[];
};

type PuzzlePair = {
  source: string;
  target: string;
  note?: string;
};

type PuzzleTimelineItem = {
  era: string;
  meaning: string;
  blank?: boolean;
};

type Puzzle = {
  date: string;
  type: PuzzleType;
  root?: string;
  lang?: string;
  meaning?: string;
  prompt?: string;
  targets?: string[];
  required?: string[];
  pool?: string[];
  groups?: PuzzleGroup[];
  pairs?: PuzzlePair[];
  timeline?: PuzzleTimelineItem[];
  word?: string;
  fragments?: string[];
  answer?: string;
  reveal: Reveal;
  meta?: {
    root?: string;
    lang?: string;
    meaning?: string;
  };
};

type RootState = {
  found?: string[];
};

type SortState = {
  assigned?: Record<string, string>;
};

type AnswerState = {
  answers?: Record<number, string>;
};

type IdiomState = {
  sequence?: string[];
};

type PuzzleState = RootState & SortState & AnswerState & IdiomState;

const TYPE_LABELS: Record<string, string> = {
  ROOT: "ROOT",
  SUPPLETIVE: "SUPPLETIVE PAIR",
  GRIMM: "SOUND SHIFT",
  SEMANTIC: "SEMANTIC DRIFT",
  COLLISION: "COLLISION",
  PIE: "DEEP ROOT",
  DECEPTION: "HIDDEN STRUCTURE",
  FALSE_FAMILY: "FALSE FAMILY",
  PHANTOM_ROOT: "INFERRED ROOT",
  IDIOM: "IDIOM SYSTEM",
  BORROWED: "BORROWED LAYER",
};

const TYPE_SUBLABELS: Record<string, string> = {
  ROOT: "morphological family",
  SUPPLETIVE: "broken paradigm",
  GRIMM: "phonetic machinery",
  SEMANTIC: "meaning drift",
  COLLISION: "language contact",
  PIE: "proto-layer",
  DECEPTION: "hidden structure",
  FALSE_FAMILY: "etymological imposture",
  PHANTOM_ROOT: "reverse inference",
  IDIOM: "fossilized ideology",
  BORROWED: "colonial lexicon",
};

const COLORS = {
  bg: "#070605",
  bg2: "#0a0907",
  surface: "#0d0b08",
  surface2: "#141208",
  surface3: "#1a160f",

  gold: "#e8b84b",
  goldDim: "#c8922a",
  goldDark: "#7a5618",
  goldLine: "rgba(232,184,75,0.28)",
  goldGlow: "rgba(232,184,75,0.18)",

  cyan: "#4ecfcf",
  cyanDim: "#2a8f8f",
  cyanGlow: "rgba(78,207,207,0.16)",
  cyanLine: "rgba(78,207,207,0.32)",

  red: "#8b3a3a",
  redGlow: "rgba(139,58,58,0.22)",

  textPrimary: "#e8d8b0",
  textSecondary: "#9a8868",
  textMuted: "#5a4a38",
  textFaint: "#3a2e1c",

  blackLine: "#1e1808",
};

const TYPE_COLORS: Record<string, string> = {
  ROOT: COLORS.goldDim,
  SUPPLETIVE: "#b87820",
  GRIMM: COLORS.cyan,
  SEMANTIC: "#d4732a",
  COLLISION: "#8ab8b8",
  PIE: COLORS.gold,
  DECEPTION: "#d66a37",
  FALSE_FAMILY: "#8f73db",
  PHANTOM_ROOT: "#5bcf94",
  IDIOM: "#c46eb0",
  BORROWED: "#7ab87a",
};

const STORAGE_KEY = "derivative_v4";
const SPLASH_IMAGE =
  "https://github.com/user-attachments/assets/e6f5403b-5958-4d0e-8be4-439beb2b7a79";

const load = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
};

const save = (data: Record<string, any>) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
};

const puzzleCache: Record<string, Puzzle> = {};

const getPuzzleForDate = (dateStr: string): Puzzle | null => {
  try {
    if (!puzzleCache[dateStr]) {
      puzzleCache[dateStr] = generateDailyPuzzle(dateStr) as Puzzle;
    }
    return puzzleCache[dateStr] || null;
  } catch {
    return null;
  }
};

const getTodayStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
};

const getMonthDates = (anchorDateStr: string) => {
  const [year, month] = anchorDateStr.split("-").map(Number);
  const daysInMonth = new Date(year, month, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  });
};

const getRoot = (puzzle: Puzzle) => puzzle.meta?.root || puzzle.root || "";
const getLang = (puzzle: Puzzle) => puzzle.meta?.lang || puzzle.lang || "";
const getMeaning = (puzzle: Puzzle) => puzzle.meta?.meaning || puzzle.meaning || "";

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

const TYPE_ICONS: Record<string, ({ color }: { color: string }) => JSX.Element> = {
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
};

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
    ref={(el: any) => {
      if (!el || el._init) return;
      el._init = true;
      const ctx = el.getContext("2d");

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

        links.forEach((l: any) => {
          const a = stars[l.a];
          const b = stars[l.b];
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

        stars.forEach((s: any) => {
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

const TypeBadge = ({ type }: { type: string }) => {
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
    </div>
  );
};

const RevealCard = ({
  puzzle,
  onShare,
}: {
  puzzle: Puzzle;
  onShare: () => void;
}) => {
  const color = TYPE_COLORS[puzzle.type] || COLORS.goldDim;
  const Icon = TYPE_ICONS[puzzle.type] || IconRoot;

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

const ShareCard = ({ msg }: { msg: string }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(msg);
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
      <pre
        style={{
          ...S.mono,
          fontSize: "0.74rem",
          color: COLORS.gold,
          margin: 0,
          whiteSpace: "pre-wrap",
          lineHeight: 1.9,
        }}
      >
        {msg}
      </pre>
      <button className="deriv-btn" style={{ ...S.btnSm, marginTop: "0.75rem" }} onClick={copy}>
        {copied ? "copied ✓" : "copy to clipboard"}
      </button>
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
      <TypeBadge type={puzzle.type} />

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
}: {
  puzzle: Puzzle;
  found: string[];
  onWord: (word: string, isRequired: boolean) => void;
  revealed: boolean;
}) => {
  const [input, setInput] = useState("");
  const [flash, setFlash] = useState<null | { msg: string; ok: boolean; bonus?: boolean }>(null);
  const [shake, setShake] = useState(false);
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setTimeout(() => ref.current?.focus(), 100);
  }, []);

  const submit = () => {
    const w = input.trim().toLowerCase();
    if (!w || !puzzle.targets || !puzzle.required) return;

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
      setFlash({ msg: "not in this family", ok: false });
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
        overflow: "hidden",
      }}
    >
      <SystemMesh intensity={1} />

      {/* 🔥 ROOT GRAPH (NOW VISIBLE + CORRECT ROOT) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0.5,
          opacity: 0.9, // 🔥 boost visibility
        }}
      >
        <RootGraph
          root={root}
          required={required}
          found={found}
          bonus={bonusFound}
        />
      </div>

      {/* UI LAYER */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {!revealed && (
          <div style={{ marginBottom: "1.1rem" }}>
            <div style={{ display: "flex", gap: "8px", marginBottom: "0.45rem" }}>
              <input
                ref={ref}
                value={input}
                onChange={(e) => setInput(e.target.value.toLowerCase())}
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
    </div>
  );
};

const SortPuzzle = ({
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
  const assigned = state?.assigned || {};
  const [dragWord, setDragWord] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [flash, setFlash] = useState<null | { word: string; correct: boolean; bonus?: boolean; notInPool?: boolean }>(null);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const groups = puzzle.groups || [];
  const pool = puzzle.pool || [];

  const unassigned = pool.filter((w) => !assigned[w]);
  const totalRequired = groups.flatMap((g) => g.accepts).length;
  const correctCount = Object.entries(assigned).filter(([w, g]) => {
    const grp = groups.find((gr) => gr.id === g);
    return grp && (grp.accepts.includes(w) || grp.related.includes(w));
  }).length;

  const assign = (word: string, groupId: string) => {
    if (!word || !groupId) return;
    const grp = groups.find((g) => g.id === groupId);
    if (!grp) return;
    const correct = grp.accepts.includes(word) || grp.related.includes(word);
    const newAssigned = { ...assigned, [word]: groupId };
    onState({ ...state, assigned: newAssigned });
    setFlash({ word, correct, bonus: grp.related.includes(word) });
    setTimeout(() => setFlash(null), 1200);
  };

  const unassign = (word: string) => {
    const next = { ...assigned };
    delete next[word];
    onState({ ...state, assigned: next });
  };

  const handleTextSubmit = () => {
    if (!activeGroup || !input.trim()) return;
    const w = input.trim().toLowerCase();
    if (pool.includes(w) && !assigned[w]) {
      assign(w, activeGroup);
      setInput("");
    } else {
      setFlash({ word: w, correct: false, notInPool: true });
      setInput("");
      setTimeout(() => setFlash(null), 1200);
    }
  };

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
      <SystemMesh intensity={0.92} />

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
          {correctCount}/{totalRequired} assigned correctly
        </div>

        {!revealed && unassigned.length > 0 && (
          <div style={{ marginBottom: "1rem" }}>
            <div
              style={{
                ...S.mono,
                fontSize: "0.58rem",
                color: COLORS.textFaint,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "0.4rem",
              }}
            >
              word pool
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {unassigned.map((w) => (
                <div
                  key={w}
                  draggable
                  onDragStart={() => setDragWord(w)}
                  className="cyan-shimmer"
                  style={{
                    ...S.mono,
                    fontSize: "0.8rem",
                    padding: "0.3rem 0.65rem",
                    borderRadius: "2px",
                    background: "rgba(78,207,207,0.06)",
                    border: `1px solid rgba(78,207,207,0.22)`,
                    color: COLORS.cyan,
                    cursor: "grab",
                    userSelect: "none",
                  }}
                >
                  {w}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "0.75rem" }}>
          {groups.map((grp) => {
            const grpWords = Object.entries(assigned)
              .filter(([, g]) => g === grp.id)
              .map(([w]) => w);
            const isActive = activeGroup === grp.id;

            return (
              <div
                key={grp.id}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (dragWord) {
                    assign(dragWord, grp.id);
                    setDragWord(null);
                  }
                }}
                onClick={() => setActiveGroup(isActive ? null : grp.id)}
                style={{
                  background: isActive
                    ? `linear-gradient(180deg, ${COLORS.surface3}, ${COLORS.surface})`
                    : `linear-gradient(180deg, ${COLORS.surface2}, ${COLORS.surface})`,
                  border: `1px solid ${isActive ? COLORS.goldDim : "rgba(232,184,75,0.15)"}`,
                  borderRadius: "3px",
                  padding: "0.65rem 0.75rem",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  boxShadow: isActive
                    ? `0 0 20px ${COLORS.goldGlow}`
                    : "0 0 0 rgba(0,0,0,0)",
                }}
              >
                <div
                  style={{
                    ...S.mono,
                    fontSize: "0.65rem",
                    color: isActive ? COLORS.gold : COLORS.textMuted,
                    letterSpacing: "0.1em",
                    marginBottom: grpWords.length > 0 ? "0.5rem" : "0",
                  }}
                >
                  {grp.label}
                </div>

                {grpWords.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                    {grpWords.map((w) => {
                      const correct = grp.accepts.includes(w);
                      const related = grp.related.includes(w);
                      const wrong = !correct && !related;
                      const color = revealed
                        ? correct
                          ? COLORS.gold
                          : related
                          ? COLORS.cyan
                          : COLORS.red
                        : COLORS.textSecondary;

                      return (
                        <div
                          key={w}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!revealed) unassign(w);
                          }}
                          style={{
                            ...S.mono,
                            fontSize: "0.75rem",
                            padding: "0.22rem 0.55rem",
                            borderRadius: "2px",
                            background: revealed
                              ? correct
                                ? "rgba(232,184,75,0.10)"
                                : related
                                ? "rgba(78,207,207,0.10)"
                                : "rgba(139,58,58,0.14)"
                              : COLORS.blackLine,
                            border: revealed
                              ? correct
                                ? `1px solid ${COLORS.goldDim}`
                                : related
                                ? `1px solid ${COLORS.cyan}`
                                : `1px solid ${COLORS.red}`
                              : `1px solid ${COLORS.goldDark}`,
                            color,
                            cursor: revealed ? "default" : "pointer",
                          }}
                        >
                          {w}
                        </div>
                      );
                    })}
                  </div>
                )}

                {isActive && !revealed && (
                  <div
                    style={{ display: "flex", gap: "6px", marginTop: "0.5rem" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value.toLowerCase())}
                      onKeyDown={(e) => e.key === "Enter" && handleTextSubmit()}
                      placeholder="type a word…"
                      style={{
                        ...S.input,
                        fontSize: "0.78rem",
                        flex: 1,
                        padding: "0.3rem 0.55rem",
                      }}
                    />
                    <button
                      className="deriv-btn-primary"
                      style={{ ...S.btnPrimary, padding: "0.3rem 0.65rem", fontSize: "0.65rem" }}
                      onClick={handleTextSubmit}
                    >
                      add
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {flash && (
          <div
            style={{
              ...S.mono,
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: flash.notInPool
                ? COLORS.red
                : flash.correct
                ? flash.bonus
                  ? COLORS.cyan
                  : COLORS.gold
                : COLORS.red,
              marginBottom: "0.5rem",
            }}
          >
            {flash.notInPool ? "not in the pool" : flash.correct ? (flash.bonus ? "related" : "correct") : "wrong group"}
          </div>
        )}

        {!revealed && (
          <div style={{ ...S.mono, fontSize: "0.6rem", color: COLORS.textFaint, marginTop: "0.25rem" }}>
            drag words into a group, or click a group then type
          </div>
        )}
      </div>
    </div>
  );
};

const GrimmPuzzle = ({
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
  const answers = state?.answers || {};
  const [inputs, setInputs] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<Record<number, string | null>>({});

  const pairs = puzzle.pairs || [];

  const submit = (idx: number) => {
    const val = (inputs[idx] || "").trim().toLowerCase();
    if (!val) return;
    const correct = val === pairs[idx].target.toLowerCase();
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
                      onChange={(e) =>
                        setInputs((i) => ({ ...i, [idx]: e.target.value.toLowerCase() }))
                      }
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
}: {
  puzzle: Puzzle;
  state: PuzzleState;
  onState: (s: PuzzleState) => void;
  revealed: boolean;
}) => {
  const answers = state?.answers || {};
  const [inputs, setInputs] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<Record<number, string | null>>({});

  const timeline = puzzle.timeline || [];
  const blanks = timeline.filter((t) => t.blank);
  const correctCount = blanks.filter((_, i) => answers[i]).length;

  const submit = (blankIdx: number, correctMeaning: string) => {
    const val = (inputs[blankIdx] || "").trim().toLowerCase();
    if (!val) return;

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
                          onChange={(e) =>
                            setInputs((i) => ({ ...i, [myBlankIdx]: e.target.value }))
                          }
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
}: {
  puzzle: Puzzle;
  state: PuzzleState;
  onState: (s: PuzzleState) => void;
  revealed: boolean;
}) => {
  const sequence = state?.sequence || [];
  const fragments = puzzle.fragments || [];
  const answer = puzzle.answer || "";
  const answerWords = answer.split(" ");

  const available = fragments.filter((f) => !sequence.includes(f) || sequence.filter((s) => s === f).length < fragments.filter((x) => x === f).length);

  // deduplicate available: count occurrences
  const fragCounts = fragments.reduce<Record<string, number>>((acc, f) => {
    acc[f] = (acc[f] || 0) + 1;
    return acc;
  }, {});
  const seqCounts = sequence.reduce<Record<string, number>>((acc, f) => {
    acc[f] = (acc[f] || 0) + 1;
    return acc;
  }, {});
  const availableFrags = Object.entries(fragCounts).flatMap(([word, count]) => {
    const used = seqCounts[word] || 0;
    return Array(Math.max(0, count - used)).fill(word);
  });

  const isCorrect = sequence.join(" ") === answer;
  const isComplete = isCorrect || revealed;

  const addFragment = (word: string) => {
    if (isComplete) return;
    onState({ ...state, sequence: [...sequence, word] });
  };

  const removeLastOrWord = (word: string) => {
    if (isComplete) return;
    const idx = [...sequence].lastIndexOf(word);
    if (idx === -1) return;
    const next = [...sequence];
    next.splice(idx, 1);
    onState({ ...state, sequence: next });
  };

  const clearAll = () => {
    onState({ ...state, sequence: [] });
  };

  const color = TYPE_COLORS["IDIOM"];

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
      <SystemMesh intensity={0.85} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Origin label */}
        {puzzle.word && (
          <div
            style={{
              ...S.mono,
              fontSize: "0.62rem",
              color: COLORS.textMuted,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            origin — {puzzle.word}
          </div>
        )}

        {/* Assembled phrase display */}
        <div
          style={{
            minHeight: "3rem",
            marginBottom: "1rem",
            padding: "0.65rem 0.75rem",
            background: isCorrect
              ? `rgba(196,110,176,0.08)`
              : "rgba(78,207,207,0.04)",
            border: `1px solid ${isCorrect ? color + "55" : COLORS.blackLine}`,
            borderRadius: "3px",
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
            alignItems: "center",
            boxShadow: isCorrect ? `0 0 24px ${color}22` : "none",
            transition: "all 0.3s ease",
          }}
        >
          {sequence.length === 0 && !revealed ? (
            <span
              style={{
                ...S.mono,
                fontSize: "0.72rem",
                color: COLORS.textFaint,
                letterSpacing: "0.08em",
                fontStyle: "italic",
              }}
            >
              tap fragments to reconstruct…
            </span>
          ) : (
            (revealed && sequence.length === 0 ? answerWords : sequence).map((word, i) => (
              <span
                key={i}
                onClick={() => !revealed && removeLastOrWord(word)}
                style={{
                  ...S.mono,
                  fontSize: "0.88rem",
                  color: revealed
                    ? isCorrect || sequence.join(" ") === answer
                      ? color
                      : COLORS.textSecondary
                    : COLORS.textPrimary,
                  cursor: revealed ? "default" : "pointer",
                  padding: "0.1rem 0.05rem",
                  borderBottom: revealed ? "none" : `1px solid ${COLORS.goldDark}`,
                  transition: "color 0.2s ease",
                }}
              >
                {word}
                {i < sequence.length - 1 || (revealed && i < answerWords.length - 1) ? "\u00a0" : ""}
              </span>
            ))
          )}
        </div>

        {/* Correct flash */}
        {isCorrect && !revealed && (
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

        {/* Revealed answer */}
        {revealed && (
          <div
            style={{
              ...S.mono,
              fontSize: "0.7rem",
              color: COLORS.textSecondary,
              letterSpacing: "0.06em",
              marginBottom: "0.75rem",
              fontStyle: "italic",
            }}
          >
            "{answer}"
          </div>
        )}

        {/* Fragment tiles */}
        {!isComplete && availableFrags.length > 0 && (
          <div>
            <div
              style={{
                ...S.mono,
                fontSize: "0.56rem",
                color: COLORS.textFaint,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "0.45rem",
              }}
            >
              fragments
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginBottom: "0.75rem" }}>
              {availableFrags.map((word, i) => (
                <div
                  key={`${word}-${i}`}
                  onClick={() => addFragment(word)}
                  style={{
                    ...S.mono,
                    fontSize: "0.82rem",
                    padding: "0.32rem 0.72rem",
                    borderRadius: "2px",
                    background: `${color}12`,
                    border: `1px solid ${color}44`,
                    color,
                    cursor: "pointer",
                    userSelect: "none",
                    transition: "all 0.12s ease",
                    boxShadow: `0 0 10px ${color}10`,
                  }}
                >
                  {word}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Controls */}
        {!revealed && sequence.length > 0 && !isCorrect && (
          <button
            className="deriv-btn"
            style={{ ...S.btnSm, fontSize: "0.58rem" }}
            onClick={clearAll}
          >
            clear →
          </button>
        )}

        {/* Progress counter */}
        <div
          style={{
            ...S.mono,
            fontSize: "0.56rem",
            color: COLORS.textFaint,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginTop: "0.5rem",
          }}
        >
          {sequence.length}/{answerWords.length} placed
        </div>
      </div>
    </div>
  );
};

export default function Derivative() {
  const [view, setView] = useState<"splash" | "archive" | "game">("splash");
  const [selDate, setSelDate] = useState<string | null>(null);
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [progress, setProgress] = useState<Record<string, any>>(load());
  const [revealed, setRevealed] = useState(false);
  const [puzzleState, setPuzzleState] = useState<PuzzleState>({});
  const [shareMsg, setShareMsg] = useState<string | null>(null);

  const today = getTodayStr();
  const archiveDates = useMemo(() => getMonthDates(today), [today]);

  const getProgress = (dateStr: string) => progress[dateStr] || {};

  const openPuzzle = (dateStr: string) => {
    const p = getPuzzleForDate(dateStr);
    if (!p) return;
    const saved = getProgress(dateStr);
    setSelDate(dateStr);
    setPuzzle(p);
    setRevealed(saved.revealed || false);
    setPuzzleState(saved.state || {});
    setShareMsg(null);
    setView("game");
  };

  const updProgress = (dateStr: string, newState: PuzzleState, newRevealed: boolean) => {
    const next = { ...progress, [dateStr]: { state: newState, revealed: newRevealed } };
    setProgress(next);
    save(next);
  };

  const handlePuzzleState = (newState: PuzzleState) => {
    if (!selDate) return;
    setPuzzleState(newState);
    updProgress(selDate, newState, revealed);
  };

  const handleWordFound = (word: string, _isRequired: boolean) => {
    if (!selDate) return;
    const current = puzzleState.found || [];
    const newFound = current.includes(word) ? current : [...current, word];
    const nextState = { ...puzzleState, found: newFound };
    setPuzzleState(nextState);
    updProgress(selDate, nextState, revealed);
  };

  const handleReveal = () => {
    if (!selDate) return;
    setRevealed(true);
    updProgress(selDate, puzzleState, true);
  };

  const isComplete = () => {
    if (!puzzle) return false;

    if (puzzle.type === "ROOT") {
      return (puzzle.required || []).every((w) => (puzzleState.found || []).includes(w));
    }

    if (puzzle.type === "GRIMM") {
      return (puzzle.pairs || []).every((_, i) => puzzleState.answers?.[i]);
    }

    if (puzzle.type === "SEMANTIC") {
      const blanks = (puzzle.timeline || []).filter((t) => t.blank);
      return blanks.every((_, i) => puzzleState.answers?.[i]);
    }

    if (["SUPPLETIVE", "PIE", "COLLISION", "DECEPTION", "FALSE_FAMILY", "PHANTOM_ROOT", "BORROWED"].includes(puzzle.type)) {
      const assigned = puzzleState.assigned || {};
      return (puzzle.groups || []).every((g) =>
        g.accepts.every((w) => assigned[w] === g.id)
      );
    }

    if (puzzle.type === "IDIOM") {
      const sequence = puzzleState.sequence || [];
      return sequence.join(" ") === (puzzle.answer || "");
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

    const wrap = (text: string, w: number) => {
      const words = text.split(" ");
      const lines: string[] = [];
      let cur = "";
      for (const word of words) {
        if ((cur + " " + word).trim().length > w) {
          if (cur) lines.push(cur);
          cur = word;
        } else {
          cur = (cur + " " + word).trim();
        }
      }
      if (cur) lines.push(cur);
      return lines.join("\n");
    };

    const [year, month, day] = selDate.split("-").map(Number);
    const dateRoman = `${toRoman(day)} · ${toRoman(month)} · ${toRoman(year)}`;
    const sep = "────────────────────";
    const complete = isComplete();
    const typeLabel = TYPE_LABELS[puzzle.type] || puzzle.type;
    const root = getRoot(puzzle);
    const lang = getLang(puzzle);

    let chain = "";
    let scoreStr = "";

    if (puzzle.type === "ROOT") {
      const found = puzzleState.found || [];
      chain = (puzzle.required || []).map((w) => (found.includes(w) ? "◈" : "◇")).join("─");
      const n = found.filter((w) => (puzzle.required || []).includes(w)).length;
      scoreStr = `${n} of ${(puzzle.required || []).length} found`;
    } else if (["SUPPLETIVE", "PIE", "COLLISION", "DECEPTION", "FALSE_FAMILY", "PHANTOM_ROOT", "BORROWED"].includes(puzzle.type)) {
      const assigned = puzzleState.assigned || {};
      chain = (puzzle.groups || [])
        .map((g) => {
          const tag = g.label.replace(/[()]/g, "").split(" ")[0].slice(0, 8).padEnd(8);
          const nodes = g.accepts.map((w) => (assigned[w] === g.id ? "◈" : "◇")).join("");
          return `${tag} ${nodes}`;
        })
        .join("\n");

      const total = (puzzle.groups || []).flatMap((g) => g.accepts).length;
      const correct = (puzzle.groups || [])
        .flatMap((g) => g.accepts)
        .filter((w) => (puzzle.groups || []).find((gr) => gr.id === assigned[w])?.accepts.includes(w))
        .length;

      scoreStr = `${correct} of ${total} · ${(puzzle.groups || []).length} branches`;
    } else if (puzzle.type === "GRIMM") {
      const answers = puzzleState.answers || {};
      chain = (puzzle.pairs || []).map((_, i) => (answers[i] ? "◈" : "◇")).join(" ─ ");
      scoreStr = `${Object.keys(answers).length} of ${(puzzle.pairs || []).length} found`;
    } else if (puzzle.type === "SEMANTIC") {
      const answers = puzzleState.answers || {};
      const blanks = (puzzle.timeline || []).filter((t) => t.blank);
      chain = blanks.map((_, i) => (answers[i] ? "◈" : "◇")).join(" ─ ");
      scoreStr = `${blanks.filter((_, i) => answers[i]).length} of ${blanks.length} filled`;
    } else if (puzzle.type === "IDIOM") {
      const sequence = puzzleState.sequence || [];
      const answerWords = (puzzle.answer || "").split(" ");
      chain = answerWords.map((_, i) => (sequence[i] === answerWords[i] ? "◈" : "◇")).join(" ─ ");
      scoreStr = `${sequence.length} of ${answerWords.length} placed`;
    }

    const status = complete ? "complete" : revealed ? "revealed" : "in progress";
    const headline = wrap(puzzle.reveal.headline.replace(/[""]/g, '"'), 42);

    setShareMsg(
      [
        "◈ DERIVATIVE ◈",
        dateRoman,
        sep,
        `${typeLabel} · ${root}`,
        `${lang}`,
        sep,
        chain,
        `${scoreStr} · ${status}`,
        sep,
        headline,
        sep,
        "derivative.game",
      ].join("\n")
    );
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
      ["SUPPLETIVE", "PIE", "COLLISION", "DECEPTION", "FALSE_FAMILY", "PHANTOM_ROOT", "BORROWED"].includes(puz.type) &&
      Object.keys(s.assigned || {}).length > 0
    )
      return "partial";
    if (puz.type === "GRIMM" && Object.keys(s.answers || {}).length > 0) return "partial";
    if (puz.type === "SEMANTIC" && Object.keys(s.answers || {}).length > 0) return "partial";
    if (puz.type === "IDIOM" && (s.sequence || []).length > 0) return "partial";
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
          padding: "3rem 2rem",
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
            opacity: 0.22,
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
              "linear-gradient(to bottom, rgba(7,6,5,0.48) 0%, rgba(7,6,5,0.82) 100%)",
            zIndex: 0,
          }}
        />
        <Starfield />
        <AmbientOverlays />

        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              maxWidth: "470px",
              lineHeight: 1.9,
              color: COLORS.textSecondary,
              fontSize: "0.9rem",
              marginBottom: "2rem",
              textShadow: "0 0 12px rgba(0,0,0,0.32)",
            }}
          >
            <p>I want to play a game.</p>
            <p>The game is called English.</p>
            <p>
              You have been playing it since before you could walk.
              <br />
              You did not know you were playing.
              <br />
              You did not know there were rules.
              <br />
              You did not know the rules were made of older, broken rules.
            </p>
            <p>
              You did not know that <em>went</em> is a corpse wearing the wrong name.
              That <em>nice</em> meant ignorant. That <em>person</em> is a mask. That <em>be</em> and <em>am</em> and <em>was</em> have never, in any language, belonged together.
            </p>
            <p>You have been fluent your whole life in a language you have never truly known.</p>
            <p style={{ color: COLORS.gold, fontSize: "0.82rem", letterSpacing: "0.07em" }}>
              Do you want to play a game?
            </p>
          </div>

          <div
            className="deriv-title"
            data-text="DERIVATIVE"
            onClick={() => openPuzzle(today)}
            style={{
              ...S.mono,
              fontSize: "2.55rem",
              fontWeight: 400,
              color: COLORS.gold,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: "1.55rem",
              userSelect: "none",
            }}
          >
            DERIVATIVE
          </div>

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
            <button className="deriv-btn" style={S.btnSm} onClick={() => setView("splash")}>
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

            {[...Array(new Date(today.split("-").map(Number)[0], today.split("-").map(Number)[1] - 1, 1).getDay())].map((_, i) => (
              <div key={"p" + i} />
            ))}

            {archiveDates.map((dateStr) => {
              const day = parseInt(dateStr.split("-")[2], 10);
              const st = statusFor(dateStr);
              const isToday = dateStr === today;
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
    ].includes(puzzle.type);

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
            <button className="deriv-btn" style={S.btnSm} onClick={() => setView("splash")}>
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

          <PuzzleHeader puzzle={puzzle} selDate={selDate} />

          {puzzle.type === "ROOT" && (
            <RootPuzzle
              puzzle={puzzle}
              found={puzzleState.found || []}
              onWord={handleWordFound}
              revealed={revealed}
            />
          )}

          {isSortType && (
            <SortPuzzle
              puzzle={puzzle}
              state={puzzleState}
              onState={handlePuzzleState}
              revealed={revealed}
            />
          )}

          {puzzle.type === "GRIMM" && (
            <GrimmPuzzle
              puzzle={puzzle}
              state={puzzleState}
              onState={handlePuzzleState}
              revealed={revealed}
            />
          )}

          {puzzle.type === "SEMANTIC" && (
            <SemanticPuzzle
              puzzle={puzzle}
              state={puzzleState}
              onState={handlePuzzleState}
              revealed={revealed}
            />
          )}

          {puzzle.type === "IDIOM" && (
            <IdiomPuzzle
              puzzle={puzzle}
              state={puzzleState}
              onState={handlePuzzleState}
              revealed={revealed}
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

          {(revealed || complete) && <RevealCard puzzle={puzzle} onShare={buildShare} />}
          {shareMsg && <ShareCard msg={shareMsg} />}
        </div>
      </div>
    );
  }

  return null;
}