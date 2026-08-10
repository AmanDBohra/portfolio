import {
  BarChart3,
  Workflow,
  Database,
  Lightbulb,
  ShieldCheck,
  GraduationCap,
  Brain,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { services } from "../data/portfolio";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Reveal } from "../components/ui/Reveal";

const ICONS: Record<string, LucideIcon> = {
  BarChart3,
  Workflow,
  Database,
  Lightbulb,
  ShieldCheck,
  GraduationCap,
  Brain,
  Sparkles,
};

export function Services() {
  return (
    <section id="services" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Services"
          title="How I can help"
          description="Ways I work with teams, founders, and clients."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = ICONS[service.icon] ?? BarChart3;
            return (
              <Reveal key={service.title} delay={i * 0.05}>
                <div className="card h-full">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {service.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
