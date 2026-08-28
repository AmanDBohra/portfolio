import { Trophy } from "lucide-react";
import { honors } from "../data/portfolio";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Reveal } from "../components/ui/Reveal";

export function Honors() {
  return (
    <section id="honors" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Recognition"
          title="Honors & community leadership"
          description="Recognition for delivery and analytical rigor — and for giving back through AI education and mentorship."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {honors.map((h, i) => (
            <Reveal key={h.title} delay={(i % 2) * 0.06}>
              <div className="card flex h-full gap-4">
                <span className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">
                  <Trophy className="h-5 w-5" />
                </span>
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                      {h.title}
                    </h3>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {h.date}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm font-medium text-brand-400">{h.org}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {h.note}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
