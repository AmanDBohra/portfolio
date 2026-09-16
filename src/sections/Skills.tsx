import { skillCategories } from "../data/portfolio";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Reveal } from "../components/ui/Reveal";
import { Stagger, StaggerItem } from "../components/ui/Stagger";

export function Skills() {
  return (
    <section id="skills" className="section bg-slate-50/70 dark:bg-white/[0.02]">
      <div className="container-x">
        <SectionHeading
          eyebrow="Skills"
          title="Technologies I work with"
          description="A snapshot of the tools and languages I use to design and ship products."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, i) => (
            <Reveal key={cat.category} delay={i * 0.05}>
              <div className="card h-full">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {cat.category}
                </h3>
                <Stagger className="mt-4 flex flex-wrap gap-2" gap={0.03}>
                  {cat.skills.map((skill) => (
                    <StaggerItem key={skill} className="chip transition-transform hover:-translate-y-0.5 hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-300">
                      {skill}
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
