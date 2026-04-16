"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StreakToast;
const jsx_runtime_1 = require("react/jsx-runtime");
// components/StreakToast.tsx — slide-up toast for streak events.
// Milestone toasts glow gold and linger slightly longer.
const react_1 = require("react");
const constants_1 = require("../constants");
function StreakToast({ message, isMilestone = false, onDismiss, }) {
    const timerRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (!message)
            return;
        if (timerRef.current)
            clearTimeout(timerRef.current);
        timerRef.current = setTimeout(onDismiss, isMilestone ? 5200 : 3600);
        return () => {
            if (timerRef.current)
                clearTimeout(timerRef.current);
        };
    }, [message, onDismiss, isMilestone]);
    if (!message)
        return null;
    return ((0, jsx_runtime_1.jsx)("div", { className: "streak-toast", role: "status", "aria-live": "polite", onClick: onDismiss, style: {
            position: "fixed",
            bottom: "2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            background: isMilestone
                ? `linear-gradient(135deg, rgba(20,16,6,0.98), rgba(30,22,8,0.98))`
                : `linear-gradient(135deg, rgba(13,11,8,0.97), rgba(20,18,8,0.97))`,
            border: `1px solid ${isMilestone ? constants_1.COLORS.gold : constants_1.COLORS.goldDark}`,
            borderRadius: "4px",
            padding: isMilestone ? "0.85rem 1.6rem" : "0.65rem 1.3rem",
            color: isMilestone ? constants_1.COLORS.gold : constants_1.COLORS.textPrimary,
            fontFamily: "var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)",
            fontSize: isMilestone ? "0.8rem" : "0.73rem",
            letterSpacing: "0.04em",
            lineHeight: 1.5,
            zIndex: 9999,
            cursor: "pointer",
            boxShadow: isMilestone
                ? `0 0 48px rgba(232,184,75,0.32), 0 4px 24px rgba(0,0,0,0.6)`
                : `0 0 20px rgba(232,184,75,0.14), 0 4px 16px rgba(0,0,0,0.5)`,
            whiteSpace: "nowrap",
            maxWidth: "92vw",
            overflow: "hidden",
            textOverflow: "ellipsis",
            animation: "toastSlideIn 0.34s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
            userSelect: "none",
        }, children: message }));
}
