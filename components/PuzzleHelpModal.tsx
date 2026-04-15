import { COLORS, TYPE_COLORS, TYPE_LABELS } from "../constants";
import type { PuzzleType } from "../types";
import { HELP_MODAL_BY_TYPE } from "./helpModalContent";

export default function PuzzleHelpModal({
  puzzleType,
  onClose,
}: {
  puzzleType: PuzzleType;
  onClose: () => void;
}) {
  const help = HELP_MODAL_BY_TYPE[puzzleType];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${TYPE_LABELS[puzzleType] || puzzleType} gameplay help`}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.62)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 20,
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(560px, 100%)",
          background: `linear-gradient(180deg, ${COLORS.surface2}, ${COLORS.surface})`,
          border: `1px solid ${TYPE_COLORS[puzzleType] || COLORS.goldDark}`,
          borderRadius: "6px",
          boxShadow: `0 0 28px ${COLORS.goldGlow}`,
          padding: "1rem 1rem 0.9rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", marginBottom: "0.7rem" }}>
          <div
            style={{
              fontFamily: "var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)",
              fontSize: "0.72rem",
              color: TYPE_COLORS[puzzleType] || COLORS.gold,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {help.title}
          </div>
          <button
            className="deriv-btn"
            style={{
              background: "transparent",
              border: `1px solid ${COLORS.blackLine}`,
              color: COLORS.goldDark,
              padding: "0.25rem 0.55rem",
              fontFamily: "var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)",
              fontSize: "0.62rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
              borderRadius: "2px",
              transition: "all 0.18s ease",
            }}
            onClick={onClose}
          >
            close
          </button>
        </div>
        <ul style={{ margin: 0, paddingLeft: "1rem", color: COLORS.textSecondary, display: "grid", gap: "0.45rem" }}>
          {help.points.map((point) => (
            <li key={point} style={{ fontSize: "0.8rem", lineHeight: 1.6 }}>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
