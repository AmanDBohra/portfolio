import { capabilities } from "../data/portfolio";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Reveal } from "../components/ui/Reveal";

export function Capabilities() {
  return (
    <section id="capabilities" className="section bg-white/[0.02]">
      <div className="container-x">
        <SectionHeading
          index="03"
          eyebrow="Leadership & Capabilities"
          title="From delivery to leadership"
          description="The dimensions I bring to enterprise analytics engagements — connected capabilities rather than arbitrary skill percentages."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 0.05}>
              <div className="card group h-full">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-brand-400/40" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-brand-400" />
                  </span>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                    {c.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {c.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
