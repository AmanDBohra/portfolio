/**
 * Decorative "analytics environment" — faint grid, connected data nodes, and a
 * rising motif curve. Purely visual; hidden from assistive tech.
 */
interface Props {
  className?: string;
  variant?: "hero" | "band";
}

export function AnalyticsEnv({ className = "", variant = "band" }: Props) {
  const nodes = [
    [40, 180], [120, 90], [210, 150], [300, 70], [380, 130], [70, 260],
    [180, 240], [280, 210], [360, 250], [150, 320], [250, 300], [340, 330],
  ];
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 360"
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <defs>
        <linearGradient id="ae-curve" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1769aa" />
          <stop offset="0.6" stopColor="#2386c8" />
          <stop offset="1" stopColor="#46c7e8" />
        </linearGradient>
        <radialGradient id="ae-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#46c7e8" stopOpacity="0.35" />
          <stop offset="1" stopColor="#46c7e8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* faint grid */}
      <g stroke="#1769aa" strokeWidth="0.5" opacity="0.10">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="360" />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} />
        ))}
      </g>

      {/* connection lines */}
      <g stroke="#2386c8" strokeWidth="0.7" opacity="0.35">
        {nodes.map(([ax, ay], i) =>
          nodes.slice(i + 1).map(([bx, by], j) => {
            const d = Math.hypot(ax - bx, ay - by);
            return d < 120 ? (
              <line key={`${i}-${j}`} x1={ax} y1={ay} x2={bx} y2={by} />
            ) : null;
          })
        )}
      </g>

      {/* nodes */}
      <g>
        {nodes.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 2.6 : 1.6} fill={i % 3 === 0 ? "#46c7e8" : "#8fb6d6"} opacity="0.8" />
        ))}
      </g>

      {/* rising motif curve */}
      {variant === "hero" && (
        <>
          <circle cx="360" cy="70" r="26" fill="url(#ae-glow)" />
          <path
            d="M 30 300 C 110 300 110 250 190 250 C 260 250 250 170 330 150 C 350 145 350 100 380 80"
            fill="none"
            stroke="url(#ae-curve)"
            strokeWidth="2.4"
            strokeLinecap="round"
            opacity="0.9"
          />
        </>
      )}
    </svg>
  );
}
