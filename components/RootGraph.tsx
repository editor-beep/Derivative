import React from "react";
import { PREFIX_MAP } from "../lib/prefixMap";

/* ── PREFIX PARSER ───────────────────────────────────────── */
function getPrefix(word: string, root: string): string | null {
  const idx = word.indexOf(root);
  if (idx <= 0) return null;
  return word.slice(0, idx);
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
  const words = [...required, ...bonus];

  const centerX = 260;
  const centerY = 160;
  const radius = 110;

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
        <div style={{ position: "absolute", top: 12, left: 14 }}>
          derivational system
        </div>

        <div style={{ position: "absolute", top: 12, right: 14 }}>
          syntactic layer
        </div>

        <div style={{ position: "absolute", bottom: 14, left: 14 }}>
          semantic transformation
        </div>

        <div style={{ position: "absolute", bottom: 14, right: 14 }}>
          lexical output
        </div>

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

      {/* ── SVG SYSTEM ───────────────────────── */}
      <svg width="100%" height="320" style={{ position: "relative", zIndex: 1 }}>

        {/* ROOT CORE */}
        <circle
          cx={centerX}
          cy={centerY}
          r={26}
          className="root-core"
        />

        <text
          x={centerX}
          y={centerY + 4}
          textAnchor="middle"
          fontSize="11"
          fill="#e8b84b"
          fontFamily="monospace"
        >
          {root}
        </text>

        {words.map((word, i) => {
          const angle = (i / words.length) * Math.PI * 2;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;

          const isFound = found.includes(word);
          const prefix = getPrefix(word, root);
          const meaning = prefix ? PREFIX_MAP[prefix] : null;

          return (
            <g key={word}>

              {/* FLOW LINE */}
              <line
                x1={centerX}
                y1={centerY}
                x2={x}
                y2={y}
                stroke={isFound ? "#e8b84b" : "#2a2010"}
                strokeWidth="1"
                strokeDasharray="4 6"
                className={isFound ? "flow-active" : "flow-idle"}
              />

              {/* PREFIX */}
              {prefix && (
                <text
                  x={(centerX + x) / 2}
                  y={(centerY + y) / 2 - 6}
                  fontSize="8"
                  fill="#8a7868"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  {prefix}
                </text>
              )}

              {/* MEANING */}
              {meaning && (
                <text
                  x={(centerX + x) / 2}
                  y={(centerY + y) / 2 + 6}
                  fontSize="8"
                  fill="#4ecfcf"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  {meaning}
                </text>
              )}

              {/* NODE */}
              <circle
                cx={x}
                cy={y}
                r={10}
                fill={isFound ? "rgba(200,146,42,0.2)" : "#0d0b08"}
                stroke={isFound ? "#c8922a" : "#2a2010"}
              />

              <text
                x={x}
                y={y + 3}
                textAnchor="middle"
                fontSize="8"
                fill={isFound ? "#e8b84b" : "#3a2e14"}
                fontFamily="monospace"
              >
                {word}
              </text>
            </g>
          );
        })}
      </svg>

      {/* ── ANIMATIONS ───────────────────────── */}
      <style>
        {`
          .flow-active {
            animation: flowMove 1.2s linear infinite;
          }

          .flow-idle {
            opacity: 0.25;
          }

          @keyframes flowMove {
            from { stroke-dashoffset: 0; }
            to { stroke-dashoffset: -20; }
          }

          .root-core {
            fill: rgba(200,146,42,0.12);
            stroke: #c8922a;
            stroke-width: 1.5;
            animation: corePulse 2.4s ease-in-out infinite;
          }

          @keyframes corePulse {
            0%, 100% {
              filter: drop-shadow(0 0 4px rgba(200,146,42,0.2));
            }
            50% {
              filter: drop-shadow(0 0 14px rgba(200,146,42,0.6));
            }
          }
        `}
      </style>
    </div>
  );
}