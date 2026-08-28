import { impact } from "../data/portfolio";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Reveal } from "../components/ui/Reveal";

export function Impact() {
  return (
    <section id="impact" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Impact"
          title="Outcomes, not just outputs"
          description="A few measurable results from analytics I've delivered across enterprise engagements."
        />

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] md:grid-cols-3">
          {impact.map((m, i) => (
            <Reveal key={m.label} delay={(i % 3) * 0.06}>
              <div className="group h-full px-6 py-9 text-center transition-colors hover:bg-white/[0.03]">
                <p className="bg-gradient-to-r from-brand-400 to-brand-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
                  {m.value}
                </p>
                <p className="mx-auto mt-2 max-w-[22ch] text-sm leading-snug text-slate-500 dark:text-slate-400">
                  {m.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
