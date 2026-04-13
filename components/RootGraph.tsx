import React, { useState } from "react";
import { PREFIX_DATA } from "../lib/prefixMap";
import { SUFFIX_INDEX } from "../lib/suffixMap";

/* ── PREFIX PARSER ───────────────────────────────────────── */
function getPrefix(word: string, root: string): string | null {
  const idx = word.indexOf(root);
  if (idx <= 0) return null;
  return word.slice(0, idx);
}

function getSuffix(word: string, root: string): string | null {
  const idx = word.indexOf(root);
  if (idx < 0) return null;
  const suffix = word.slice(idx + root.length);
  if (!suffix) return null;
  return SUFFIX_INDEX[suffix] ? suffix : null;
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

function computeOrbitRadius(words: string[]): number {
  if (words.length <= 1) return MIN_ORBIT_RADIUS;
  const n = words.length;
  let needed = MIN_ORBIT_RADIUS;
  for (let i = 0; i < n; i++) {
    const a = words[i];
    const b = words[(i + 1) % n];
    const halfA = Math.max(NODE_RADIUS, (a.length * CHAR_WIDTH_PX) / 2);
    const halfB = Math.max(NODE_RADIUS, (b.length * CHAR_WIDTH_PX) / 2);
    const r = (halfA + halfB + MIN_NODE_GAP) / (2 * Math.sin(Math.PI / n));
    if (r > needed) needed = r;
  }
  return Math.min(needed, MAX_ORBIT_RADIUS);
}

export default function RootGraph({
  root,
  required,
  found,
  bonus,
}: {
  root: string;
  required: string[];
  found: string[];
  bonus: string[];
}) {
  const [hintsVisible, setHintsVisible] = useState(false);
  const words = [...required, ...bonus];
  const radius = computeOrbitRadius(words);

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>

      {/* ── GRID ───────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(200,146,42,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,146,42,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          zIndex: 0,
        }}
      />

      {/* ── IMPERIAL OVERLAY ───────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          fontFamily: "monospace",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontSize: "9px",
          color: "#5a4a38",
          opacity: 0.65,
        }}
      >
        <div style={{ position: "absolute", top: 12, left: 14 }}>derivational system</div>
        <div style={{ position: "absolute", top: 12, right: 14 }}>syntactic layer</div>
        <div style={{ position: "absolute", bottom: 14, left: 14 }}>semantic transformation</div>
        <div style={{ position: "absolute", bottom: 14, right: 14 }}>lexical output</div>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, 48px)",
            fontSize: "8px",
            color: "#3a2e14",
          }}
        >
          root: {root}
        </div>
      </div>

      {/* ── HINT TOGGLE ─────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 4,
          pointerEvents: "auto",
        }}
      >
        <button
          onClick={() => setHintsVisible((v) => !v)}
          style={{
            fontFamily: "monospace",
            fontSize: "8px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: hintsVisible ? "#e8b84b" : "#4a3a28",
            background: hintsVisible ? "rgba(200,146,42,0.08)" : "rgba(10,8,4,0.6)",
            border: `1px solid ${hintsVisible ? "#c8922a55" : "#2a201055"}`,
            borderRadius: "2px",
            padding: "3px 10px",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          {hintsVisible ? "hide hints" : "hint ›"}
        </button>
      </div>

      {/* ── SVG — viewBox makes all coordinates scale to fit ── */}
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ position: "absolute", inset: 0, zIndex: 1 }}
      >
        {/* ROOT CORE */}
        <circle cx={CX} cy={CY} r={26} className="root-core" />
        <text
          x={CX}
          y={CY + 4}
          textAnchor="middle"
          fontSize="11"
          fill="#e8b84b"
          fontFamily="monospace"
        >
          {root}
        </text>

        {words.map((word, i) => {
          const angle = (i / words.length) * Math.PI * 2;
          const x = CX + Math.cos(angle) * radius;
          const y = CY + Math.sin(angle) * radius;

          const isFound = found.includes(word);
          const showLabel = isFound || hintsVisible;
          const prefix = getPrefix(word, root);
          const suffix = getSuffix(word, root);
          const meaning =
            prefix
              ? (PREFIX_DATA as Record<string, { meaning: string }>)[prefix]?.meaning ?? null
              : null;
          const suffixMeaning =
            suffix ? (SUFFIX_INDEX[suffix]?.meaning ?? null) : null;

          return (
            <g key={word}>

              {/* FLOW LINE */}
              <line
                x1={CX} y1={CY}
                x2={x}  y2={y}
                stroke={isFound ? "#e8b84b" : "#2a2010"}
                strokeWidth="1"
                strokeDasharray="4 6"
                className={isFound ? "flow-active" : "flow-idle"}
              />

              {/* PREFIX — only when hints visible */}
              {prefix && hintsVisible && (
                <text
                  x={(CX + x) / 2}
                  y={(CY + y) / 2 - 6}
                  fontSize="8"
                  fill="#8a7868"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  {prefix}
                </text>
              )}

              {/* MEANING — only when hints visible */}
              {meaning && hintsVisible && (
                <text
                  x={(CX + x) / 2}
                  y={(CY + y) / 2 + 6}
                  fontSize="8"
                  fill="#4ecfcf"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  {meaning}
                </text>
              )}

              {suffix && hintsVisible && (
                <text
                  x={(CX + x) / 2}
                  y={(CY + y) / 2 + 18}
                  fontSize="8"
                  fill="#8a7868"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  -{suffix}
                </text>
              )}

              {suffixMeaning && hintsVisible && (
                <text
                  x={(CX + x) / 2}
                  y={(CY + y) / 2 + 30}
                  fontSize="8"
                  fill="#7dbf6a"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  {suffixMeaning}
                </text>
              )}

              {/* NODE CIRCLE */}
              <circle
                cx={x} cy={y}
                r={NODE_RADIUS}
                fill={isFound ? "rgba(200,146,42,0.2)" : "#0d0b08"}
                stroke={isFound ? "#c8922a" : "#2a2010"}
              />

              {/* NODE LABEL — show word if found or hints on, else dots */}
              <text
                x={x}
                y={y + 3}
                textAnchor="middle"
                fontSize="8"
                fill={isFound ? "#e8b84b" : hintsVisible ? "#5a4a38" : "#1e1808"}
                fontFamily="monospace"
              >
                {showLabel ? word : "·".repeat(Math.min(word.length, 7))}
              </text>
            </g>
          );
        })}
      </svg>

      {/* ── ANIMATIONS ───────────────────────── */}
      <style>{`
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
      `}</style>
    </div>
  );
}
