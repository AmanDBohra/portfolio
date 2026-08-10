import { Briefcase, Trophy } from "lucide-react";
import { experience } from "../data/portfolio";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Reveal } from "../components/ui/Reveal";

export function Experience() {
  return (
    <section id="experience" className="section bg-slate-50/70 dark:bg-slate-900/30">
      <div className="container-x">
        <SectionHeading
          eyebrow="Career"
          title="Work experience"
          description="Roles where I've shipped products and grown as an engineer."
        />

        <ol className="relative mx-auto max-w-3xl border-l border-slate-200 dark:border-slate-800">
          {experience.map((item, i) => (
            <Reveal key={`${item.company}-${i}`} delay={i * 0.05}>
              <li className="mb-10 ml-6 last:mb-0">
                <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 ring-4 ring-white dark:ring-slate-950">
                  <Briefcase className="h-3 w-3 text-white" />
                </span>
                <div className="card">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {item.role}
                    </h3>
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {item.start} — {item.end}
                    </span>
                  </div>
                  <p className="mt-1 font-semibold text-brand-600 dark:text-brand-400">
                    {item.company}{" "}
                    <span className="font-normal text-slate-500 dark:text-slate-400">
                      · {item.location}
                    </span>
                  </p>

                  <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-slate-600 dark:text-slate-400">
                    {item.responsibilities.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>

                  {item.achievements.length > 0 && (
                    <div className="mt-4 space-y-1.5">
                      {item.achievements.map((a) => (
                        <p
                          key={a}
                          className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300"
                        >
                          <Trophy className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
                          {a}
                        </p>
                      ))}
                    </div>
                  )}

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {item.tech.map((t) => (
                      <li key={t} className="chip">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
