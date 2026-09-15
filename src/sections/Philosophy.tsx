import {
  GraduationCap,
  Layers,
  Target,
  ShieldCheck,
  Lightbulb,
  Share2,
  HeartHandshake,
  Users,
  CheckCircle2,
} from "lucide-react";
import { philosophy } from "../data/portfolio";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Reveal } from "../components/ui/Reveal";

const ICONS = [GraduationCap, Layers, Target, ShieldCheck, Lightbulb, Share2, HeartHandshake, Users];

export function Philosophy() {
  return (
    <section id="philosophy" className="section bg-white/[0.02]">
      <div className="container-x">
        <SectionHeading eyebrow="Philosophy" title={philosophy.title} description={philosophy.intro} />

        {philosophy.lead && (
          <Reveal>
            <p className="mx-auto mb-12 max-w-3xl border-l-2 border-brand-400 pl-5 text-lg font-medium leading-relaxed text-slate-800 dark:text-white">
              {philosophy.lead}
            </p>
          </Reveal>
        )}

        <div className="grid gap-5 md:grid-cols-2">
          {philosophy.principles.map((p, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={p.title} delay={(i % 2) * 0.05}>
                <div className="card h-full">
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        {p.text}
                      </p>
                      {p.evidence && (
                        <p className="mt-3 flex items-start gap-2 text-xs font-medium text-brand-500 dark:text-brand-400">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                          {p.evidence}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
