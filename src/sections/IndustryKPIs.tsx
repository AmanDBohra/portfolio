import { useState } from "react";
import {
  ShieldCheck,
  Landmark,
  ShoppingBag,
  Boxes,
  Car,
  Pill,
  CheckCircle2,
  Users,
  BarChart3,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";
import { industries, site } from "../data/portfolio";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Reveal } from "../components/ui/Reveal";

const ICONS: Record<string, LucideIcon> = {
  ShieldCheck,
  Landmark,
  ShoppingBag,
  Boxes,
  Car,
  Pill,
};

export function IndustryKPIs() {
  const [active, setActive] = useState(0);
  const ind = industries[active];

  return (
    <section id="industries" className="section bg-white/[0.02]">
      <div className="container-x">
        <SectionHeading
          eyebrow="Industry Expertise"
          title="KPIs & business value by industry"
          description="Seven+ industries, one approach: translate domain data into the KPIs leaders actually decide on. Select an industry to see what I track and what it delivered."
        />

        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          {/* Industry selector */}
          <Reveal>
            <div
              role="tablist"
              aria-label="Industries"
              className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
            >
              {industries.map((it, i) => {
                const Icon = ICONS[it.icon] ?? ShieldCheck;
                const selected = i === active;
                return (
                  <button
                    key={it.id}
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActive(i)}
                    className={`flex flex-shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors lg:w-full ${
                      selected
                        ? "border-brand-400/50 bg-brand-500/10 text-brand-200"
                        : "border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20 hover:text-slate-200"
                    }`}
                  >
                    <Icon className={`h-4 w-4 flex-shrink-0 ${selected ? "text-brand-400" : ""}`} />
                    <span className="whitespace-nowrap lg:whitespace-normal">{it.name}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Detail panel */}
          <div role="tabpanel" className="card">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{ind.name}</h3>
              <span className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {ind.period}
              </span>
            </div>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-brand-400">
              <Users className="h-3.5 w-3.5" /> {ind.clients}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {ind.summary}
            </p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {/* KPIs */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  KPIs I build & track
                </h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {ind.kpis.map((k) => (
                    <li key={k} className="chip">
                      {k}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Impact */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Business value delivered
                </h4>
                <ul className="mt-3 space-y-2.5">
                  {ind.impact.map((m) => (
                    <li key={m.label} className="flex items-start gap-2.5 text-sm">
                      {m.value ? (
                        <span className="mt-0.5 min-w-[3.2rem] flex-shrink-0 font-bold text-brand-400">
                          {m.value}
                        </span>
                      ) : (
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500" />
                      )}
                      <span className="text-slate-600 dark:text-slate-300">{m.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Interactive sample dashboard for {ind.name} — synthetic data.
              </p>
              <a
                href={`${site.dashboardDemoUrl}?industry=${ind.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <BarChart3 className="h-4 w-4" /> Open live dashboard{" "}
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
