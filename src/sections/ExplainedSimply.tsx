import { Plus } from "lucide-react";
import { conceptGroups, conceptsIntro } from "../data/portfolio";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Reveal } from "../components/ui/Reveal";

export function ExplainedSimply() {
  return (
    <section id="learn" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Explained Simply"
          title="Complex data & AI, in plain language"
          description={conceptsIntro}
        />

        <div className="mx-auto max-w-3xl space-y-10">
          {conceptGroups.map((group, gi) => (
            <Reveal key={group.category} delay={gi * 0.04}>
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-400">
                  {group.category}
                </h3>
                <div className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                  {group.items.map((c) => (
                    <details key={c.term} className="group">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-sm font-semibold text-slate-900 marker:content-none dark:text-white">
                        <span>{c.term}</span>
                        <Plus className="h-4 w-4 flex-shrink-0 text-brand-400 transition-transform duration-200 group-open:rotate-45" />
                      </summary>
                      <div className="px-5 pb-5 pt-0">
                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                          {c.plain}
                        </p>
                        <p className="mt-2 text-sm italic leading-relaxed text-brand-500/90 dark:text-brand-300/90">
                          {c.analogy}
                        </p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
