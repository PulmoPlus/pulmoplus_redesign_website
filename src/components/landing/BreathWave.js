// Pressure-over-time drawing: BiPAP switches between a higher pressure on the breath in (IPAP)
// and a lower one on the breath out (EPAP); CPAP stays flat. Pure SVG, animated with CSS only.
const W = 600;
const HIGH = 62;
const LOW = 150;
const CYCLE = 150;

function bipapPath(cycles) {
  let d = `M0 ${LOW}`;
  for (let i = 0; i < cycles; i++) {
    const x = i * CYCLE;
    d += ` L${x + 12} ${LOW} C${x + 26} ${LOW} ${x + 24} ${HIGH} ${x + 40} ${HIGH}`;
    d += ` L${x + 78} ${HIGH} C${x + 94} ${HIGH} ${x + 92} ${LOW} ${x + 108} ${LOW} L${x + CYCLE} ${LOW}`;
  }
  return d;
}

export default function BreathWave({ variant = "bipap", labels = true, className = "" }) {
  const cpap = variant === "cpap";
  const d = cpap ? `M0 ${(HIGH + LOW) / 2 - 12} L${W} ${(HIGH + LOW) / 2 - 12}` : bipapPath(W / CYCLE);
  return (
    <svg
      className={`lp-wave ${cpap ? "is-cpap" : ""} ${className}`}
      viewBox={labels ? `0 0 ${W} 200` : `0 40 ${W} 135`}
      role="img"
      aria-label={
        cpap
          ? "CPAP keeps one fixed pressure for breathing in and out"
          : "BiPAP gives a higher pressure when you breathe in and a lower one when you breathe out"
      }
    >
      <defs>
        <linearGradient id={`lpw-fill-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity=".28" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      {labels && !cpap && (
        <g className="lp-wave-guides">
          <line x1="0" x2={W} y1={HIGH} y2={HIGH} />
          <line x1="0" x2={W} y1={LOW} y2={LOW} />
        </g>
      )}
      <path className="lp-wave-area" d={`${d} L${W} 200 L0 200 Z`} fill={`url(#lpw-fill-${variant})`} />
      <path className="lp-wave-line" d={d} pathLength="1000" />
      <path className="lp-wave-pulse" d={d} pathLength="1000" />
      {labels && !cpap && (
        <g className="lp-wave-labels">
          <text x={W - 6} y={HIGH - 12} textAnchor="end">
            IPAP · breathe in
          </text>
          <text x={W - 6} y={LOW + 26} textAnchor="end">
            EPAP · breathe out
          </text>
        </g>
      )}
    </svg>
  );
}
