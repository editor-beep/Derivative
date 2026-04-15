// TypeIcons.tsx — SVG icon components for each puzzle type and difficulty level.
// Imported by the game UI; not a source of puzzle content itself.

import type { ReactElement, ReactNode } from "react";
import type { PuzzleType } from "../types";
import type { DifficultyLevel } from "../difficulty";

const IconBase = ({
  children,
  color,
}: {
  children: ReactNode;
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

export const IconRoot = ({ color }: { color: string }) => (
  <IconBase color={color}>
    <circle cx="12" cy="12" r="7.5" fill="none" stroke={color} strokeWidth="1.4" />
    <circle cx="12" cy="12" r="1.7" fill={color} />
    <path d="M12 4.5v3.2M12 16.3v3.2M4.5 12h3.2M16.3 12h3.2" stroke={color} strokeWidth="1.2" />
    <path d="M7.4 7.4l2.1 2.1M14.5 14.5l2.1 2.1M16.6 7.4l-2.1 2.1M9.5 14.5l-2.1 2.1" stroke={color} strokeWidth="1.1" />
  </IconBase>
);

export const IconSuppletive = ({ color }: { color: string }) => (
  <IconBase color={color}>
    <path d="M5 8h7" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <path d="M12 8l-2.2-2.2M12 8l-2.2 2.2" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <path d="M19 16h-7" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <path d="M12 16l2.2-2.2M12 16l2.2 2.2" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="8" cy="8" r="1.6" fill={color} />
    <circle cx="16" cy="16" r="1.6" fill={color} />
  </IconBase>
);

export const IconGrimm = ({ color }: { color: string }) => (
  <IconBase color={color}>
    <path d="M4 16c2-7 4-9 8-9 4 0 6 2 8 9" fill="none" stroke={color} strokeWidth="1.4" />
    <path d="M5.5 17.5h13" stroke={color} strokeWidth="1.2" />
    <circle cx="8" cy="11" r="1.2" fill={color} />
    <circle cx="12" cy="9" r="1.2" fill={color} />
    <circle cx="16" cy="11" r="1.2" fill={color} />
  </IconBase>
);

export const IconSemantic = ({ color }: { color: string }) => (
  <IconBase color={color}>
    <path d="M12 4v16" stroke={color} strokeWidth="1.3" />
    <circle cx="12" cy="6" r="1.8" fill={color} />
    <circle cx="12" cy="12" r="1.8" fill="none" stroke={color} strokeWidth="1.2" />
    <circle cx="12" cy="18" r="1.8" fill={color} opacity="0.4" />
    <path d="M9 9.2h6M9 14.8h6" stroke={color} strokeWidth="1.1" />
  </IconBase>
);

export const IconCollision = ({ color }: { color: string }) => (
  <IconBase color={color}>
    <path d="M6 7l5.5 5.5M18 7l-5.5 5.5" stroke={color} strokeWidth="1.4" />
    <path d="M6 17l5.5-5.5M18 17l-5.5-5.5" stroke={color} strokeWidth="1.4" />
    <circle cx="6" cy="7" r="1.6" fill={color} />
    <circle cx="18" cy="7" r="1.6" fill={color} />
    <circle cx="6" cy="17" r="1.6" fill={color} opacity="0.5" />
    <circle cx="18" cy="17" r="1.6" fill={color} opacity="0.5" />
  </IconBase>
);

export const IconPIE = ({ color }: { color: string }) => (
  <IconBase color={color}>
    <circle cx="12" cy="12" r="8" fill="none" stroke={color} strokeWidth="1.4" />
    <circle cx="12" cy="12" r="4" fill="none" stroke={color} strokeWidth="1.2" />
    <circle cx="12" cy="12" r="1.4" fill={color} />
  </IconBase>
);

export const IconDeception = ({ color }: { color: string }) => (
  <IconBase color={color}>
    <path d="M12 4l7 4v8l-7 4-7-4V8l7-4z" fill="none" stroke={color} strokeWidth="1.3" />
    <path d="M8 12h8" stroke={color} strokeWidth="1.2" />
    <path d="M10 9.5l4 5" stroke={color} strokeWidth="1.2" />
  </IconBase>
);

export const IconFalseFamily = ({ color }: { color: string }) => (
  <IconBase color={color}>
    <circle cx="8" cy="8" r="3" fill="none" stroke={color} strokeWidth="1.2" />
    <circle cx="16" cy="8" r="3" fill="none" stroke={color} strokeWidth="1.2" />
    <circle cx="12" cy="16" r="3" fill="none" stroke={color} strokeWidth="1.2" />
    <path d="M6.2 18.8L17.8 5.2" stroke={color} strokeWidth="1.4" />
  </IconBase>
);

export const IconPhantomRoot = ({ color }: { color: string }) => (
  <IconBase color={color}>
    <path d="M12 4v6" stroke={color} strokeWidth="1.4" />
    <path d="M12 10l-3.2 3.2M12 10l3.2 3.2" stroke={color} strokeWidth="1.3" />
    <circle cx="8.8" cy="14.2" r="1.5" fill={color} />
    <circle cx="15.2" cy="14.2" r="1.5" fill={color} />
    <circle cx="12" cy="18.2" r="1.5" fill={color} opacity="0.65" />
  </IconBase>
);

export const IconIdiom = ({ color }: { color: string }) => (
  <IconBase color={color}>
    <path d="M4 8h16" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <path d="M4 12h10" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <path d="M4 16h13" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="18" cy="12" r="2.2" fill="none" stroke={color} strokeWidth="1.2" />
    <circle cx="18" cy="12" r="0.8" fill={color} />
  </IconBase>
);

export const IconBorrowed = ({ color }: { color: string }) => (
  <IconBase color={color}>
    <circle cx="6" cy="8" r="2.5" fill="none" stroke={color} strokeWidth="1.2" />
    <circle cx="18" cy="8" r="2.5" fill="none" stroke={color} strokeWidth="1.2" />
    <circle cx="12" cy="17" r="2.5" fill="none" stroke={color} strokeWidth="1.2" />
    <path d="M8.2 9.2L10.2 15.2" stroke={color} strokeWidth="1.1" strokeDasharray="1.5 1.5" />
    <path d="M15.8 9.2L13.8 15.2" stroke={color} strokeWidth="1.1" strokeDasharray="1.5 1.5" />
    <path d="M8.4 7.6L15.6 7.6" stroke={color} strokeWidth="1.1" strokeDasharray="1.5 1.5" />
  </IconBase>
);

export const IconToponym = ({ color }: { color: string }) => (
  <IconBase color={color}>
    <circle cx="12" cy="9" r="3.5" fill="none" stroke={color} strokeWidth="1.2" />
    <path d="M12 12.5 L12 19" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    <path d="M8.5 18.5 Q12 21.5 15.5 18.5" stroke={color} strokeWidth="1.0" fill="none" />
  </IconBase>
);

// ── Difficulty icons ──────────────────────────────────────────────────────────

export const IconDifficultyEasy = ({ color }: { color: string }) => (
  <IconBase color={color}>
    <circle cx="12" cy="12" r="2.5" fill={color} />
    <path d="M12 5.5v2.5M12 16v2.5M5.5 12h2.5M16 12h2.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <path d="M7.7 7.7l1.7 1.7M14.6 14.6l1.7 1.7M16.3 7.7l-1.7 1.7M9.4 14.6l-1.7 1.7" stroke={color} strokeWidth="1" strokeLinecap="round" opacity={0.5} />
  </IconBase>
);

export const IconDifficultyMedium = ({ color }: { color: string }) => (
  <IconBase color={color}>
    <circle cx="9" cy="12" r="4.5" fill="none" stroke={color} strokeWidth="1.3" />
    <circle cx="15" cy="12" r="4.5" fill="none" stroke={color} strokeWidth="1.3" />
    <circle cx="12" cy="12" r="1.2" fill={color} />
  </IconBase>
);

export const IconDifficultyHard = ({ color }: { color: string }) => (
  <IconBase color={color}>
    <circle cx="10.5" cy="10.5" r="5.5" fill="none" stroke={color} strokeWidth="1.3" />
    <path d="M14.7 14.7l4.2 4.2" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <path d="M8.5 10.5h4M10.5 8.5v4" stroke={color} strokeWidth="1" strokeLinecap="round" opacity={0.7} />
  </IconBase>
);

export const IconDifficultyVeryHard = ({ color }: { color: string }) => (
  <IconBase color={color}>
    <path d="M5 16V9l3.5 3.5L12 6l3.5 6.5L19 9v7H5z" fill="none" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M5 16h14" stroke={color} strokeWidth="1.2" />
    <circle cx="8.5" cy="12.5" r="1" fill={color} />
    <circle cx="12" cy="8" r="1" fill={color} />
    <circle cx="15.5" cy="12.5" r="1" fill={color} />
  </IconBase>
);

export const TYPE_ICONS: Record<PuzzleType, ({ color }: { color: string }) => ReactElement> = {
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

export const DIFFICULTY_ICONS: Record<DifficultyLevel, ({ color }: { color: string }) => ReactElement> = {
  EASY: IconDifficultyEasy,
  MEDIUM: IconDifficultyMedium,
  HARD: IconDifficultyHard,
  VERY_HARD: IconDifficultyVeryHard,
};
