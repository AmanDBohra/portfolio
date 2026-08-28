import { ArrowRight, BarChart3, NotebookPen, ExternalLink } from "lucide-react";
import { dsFlow, site } from "../data/portfolio";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Reveal } from "../components/ui/Reveal";

export function DataScience() {
  return (
    <section id="datascience" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Data Science & Advanced Analytics"
          title="From Business Problem to Decision"
          description="I identify analytics use cases, coordinate Data Science and Advanced Analytics initiatives, and translate model outputs into business-facing decisions — bridging business and data science teams."
        />

        <Reveal>
          <div className="card overflow-x-auto">
            <ol className="flex min-w-max items-center gap-3">
              {dsFlow.map((step, i) => (
                <li key={step} className="flex items-center gap-3">
                  <div className="flex flex-col items-center">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-400/40 bg-brand-500/10 text-sm font-bold text-brand-300">
                      {i + 1}
                    </span>
                    <span className="mt-2 w-24 text-center text-xs font-medium leading-snug text-slate-700 dark:text-slate-300">
                      {step}
                    </span>
                  </div>
                  {i < dsFlow.length - 1 && (
                    <ArrowRight className="mb-6 h-4 w-4 flex-shrink-0 text-brand-500/70" />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {[
            { t: "Predictive & Advanced Analytics", d: "Forecasting and predictive initiatives translated into business value." },
            { t: "AI / ML Coordination", d: "Use-case identification and coordination between business and data science teams." },
            { t: "Model-to-Decision", d: "Interpreting and validating outcomes, then operationalizing them in dashboards." },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 0.05}>
              <div className="card h-full">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Explore — hands-on demos (clearly synthetic) */}
        <Reveal delay={0.1}>
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  See it in action
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Hands-on demos & runnable notebooks on synthetic data — no confidential information.
                </p>
              </div>
              <a
                href={`${site.dashboardDemoUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary shrink-0"
              >
                <BarChart3 className="h-4 w-4" /> Live dashboard demo <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {site.notebooks.map((nb) => (
                <a
                  key={nb.url}
                  href={nb.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-brand-400/40 hover:bg-white/[0.04]"
                >
                  <NotebookPen className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-400" />
                  <span>
                    <span className="flex items-center gap-1 text-sm font-semibold text-slate-900 dark:text-white">
                      {nb.title}
                      <ExternalLink className="h-3 w-3 text-slate-400 opacity-0 transition-opacity group-hover:opacity-100" />
                    </span>
                    <span className="mt-0.5 block text-xs leading-snug text-slate-500 dark:text-slate-400">
                      {nb.desc}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
