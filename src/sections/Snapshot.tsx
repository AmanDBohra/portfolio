import { snapshot } from "../data/portfolio";
import { Reveal } from "../components/ui/Reveal";

export function Snapshot() {
  return (
    <section aria-label="Professional snapshot" className="border-y border-white/10 bg-white/[0.02]">
      <div className="container-x grid grid-cols-2 gap-px overflow-hidden sm:grid-cols-3 lg:grid-cols-6">
        {snapshot.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.04}>
            <div className="px-4 py-7 text-center">
              <p className="text-xl font-extrabold tracking-tight text-brand-400 sm:text-2xl">
                {s.top}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                {s.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
