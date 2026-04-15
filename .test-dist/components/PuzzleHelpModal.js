"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PuzzleHelpModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const constants_1 = require("../constants");
const helpModalContent_1 = require("./helpModalContent");
function PuzzleHelpModal({ puzzleType, onClose, }) {
    const help = helpModalContent_1.HELP_MODAL_BY_TYPE[puzzleType];
    return ((0, jsx_runtime_1.jsx)("div", { role: "dialog", "aria-modal": "true", "aria-label": `${constants_1.TYPE_LABELS[puzzleType] || puzzleType} gameplay help`, style: {
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.62)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 20,
            padding: "1rem",
        }, onClick: onClose, children: (0, jsx_runtime_1.jsxs)("div", { onClick: (e) => e.stopPropagation(), style: {
                width: "min(560px, 100%)",
                background: `linear-gradient(180deg, ${constants_1.COLORS.surface2}, ${constants_1.COLORS.surface})`,
                border: `1px solid ${constants_1.TYPE_COLORS[puzzleType] || constants_1.COLORS.goldDark}`,
                borderRadius: "6px",
                boxShadow: `0 0 28px ${constants_1.COLORS.goldGlow}`,
                padding: "1rem 1rem 0.9rem",
            }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", marginBottom: "0.7rem" }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                                fontFamily: "var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)",
                                fontSize: "0.72rem",
                                color: constants_1.TYPE_COLORS[puzzleType] || constants_1.COLORS.gold,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                            }, children: help.title }), (0, jsx_runtime_1.jsx)("button", { className: "deriv-btn", style: {
                                background: "transparent",
                                border: `1px solid ${constants_1.COLORS.blackLine}`,
                                color: constants_1.COLORS.goldDark,
                                padding: "0.25rem 0.55rem",
                                fontFamily: "var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)",
                                fontSize: "0.62rem",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                cursor: "pointer",
                                borderRadius: "2px",
                                transition: "all 0.18s ease",
                            }, onClick: onClose, children: "close" })] }), (0, jsx_runtime_1.jsx)("ul", { style: { margin: 0, paddingLeft: "1rem", color: constants_1.COLORS.textSecondary, display: "grid", gap: "0.45rem" }, children: help.points.map((point) => ((0, jsx_runtime_1.jsx)("li", { style: { fontSize: "0.8rem", lineHeight: 1.6 }, children: point }, point))) })] }) }));
}
