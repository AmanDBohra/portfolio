import { GraduationCap } from "lucide-react";
import { education } from "../data/portfolio";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Reveal } from "../components/ui/Reveal";

export function Education() {
  return (
    <section id="education" className="section">
      <div className="container-x">
        <SectionHeading eyebrow="Education" title="Where I studied" />

        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          {education.map((item, i) => (
            <Reveal key={item.institution} delay={i * 0.05}>
              <div className="card h-full">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                    <GraduationCap className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {item.start} — {item.end}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                  {item.degree}
                </h3>
                <p className="font-semibold text-brand-600 dark:text-brand-400">
                  {item.institution}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {item.details}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
