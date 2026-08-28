import { Globe2, CheckCircle2 } from "lucide-react";
import { engagement } from "../data/portfolio";
import { Reveal } from "../components/ui/Reveal";

/** Abstract global-network graphic (not a travel map). */
function GlobeGraphic() {
  const cx = 150, cy = 150, R = 120;
  const lats = [-2, -1, 0, 1, 2];
  const lons = [0.35, 0.7, 1];
  return (
    <svg aria-hidden="true" viewBox="0 0 300 300" className="h-full w-full">
      <defs>
        <radialGradient id="gg-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#46c7e8" stopOpacity="0.25" />
          <stop offset="1" stopColor="#46c7e8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={R + 24} fill="url(#gg-glow)" />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#2386c8" strokeWidth="1.2" opacity="0.5" />
      {lats.map((k) => (
        <ellipse key={`la${k}`} cx={cx} cy={cy + (k * R) / 3} rx={R} ry={Math.abs(R * Math.cos((k * Math.PI) / 6)) * 0.32}
          fill="none" stroke="#1769aa" strokeWidth="1" opacity="0.4" />
      ))}
      {lons.map((f) => (
        <ellipse key={`lo${f}`} cx={cx} cy={cy} rx={R * f} ry={R} fill="none" stroke="#1769aa" strokeWidth="1" opacity="0.4" />
      ))}
      {/* connection routes */}
      <g stroke="#46c7e8" strokeWidth="1" opacity="0.75" fill="none">
        <path d="M 70 120 Q 150 60 235 140" />
        <path d="M 90 210 Q 160 150 230 100" />
        <path d="M 60 160 Q 150 200 245 175" />
      </g>
      {[[70,120],[235,140],[90,210],[230,100],[60,160],[245,175],[150,150]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r={i===6?3:2.6} fill="#46c7e8" />
      ))}
    </svg>
  );
}

export function CurrentEngagement() {
  return (
    <section id="engagement" className="section">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand-800/60 to-brand-900/60 p-8 sm:p-12">
            <div aria-hidden="true" className="pointer-events-none absolute -right-10 top-1/2 hidden h-[420px] w-[420px] -translate-y-1/2 opacity-70 lg:block">
              <GlobeGraphic />
            </div>

            <div className="relative max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-300">
                <Globe2 className="h-4 w-4" /> International Analytics & BI
              </p>
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {engagement.title}
              </h2>
              <p className="mt-2 text-lg font-semibold text-brand-300">{engagement.client}</p>
              <p className="text-sm text-slate-300">{engagement.role}</p>

              <ul className="mt-6 space-y-3">
                {engagement.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm leading-relaxed text-slate-200">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-400" />
                    {p}
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-xs text-slate-400">
                Client details are kept confidential; described at a business level only.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
