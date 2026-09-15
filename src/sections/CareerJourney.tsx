import { careerStages } from "../data/portfolio";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Reveal } from "../components/ui/Reveal";

export function CareerJourney() {
  return (
    <section id="journey" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Career Evolution"
          title="Analytics Beyond the Tools"
          description="My experience extends beyond any single BI platform. Over 9+ years I've moved from hands-on BI into analytics leadership, delivery, and Data Science initiatives — tools like QlikView and Qlik Sense are part of the journey, not the whole story."
        />

        <div className="relative">
          {/* connecting rising line (desktop) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-brand-700/0 via-brand-500/50 to-brand-400/0 lg:block"
          />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-7 lg:gap-3">
            {careerStages.map((s, i) => (
              <Reveal key={s.stage} delay={i * 0.05}>
                <li className="relative">
                  <div
                    className="card h-full p-4 text-center"
                    style={{ transform: `translateY(${(i % 2 === 0 ? -1 : 1) * (i % 3) * 2}px)` }}
                  >
                    <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full border border-brand-400/40 bg-brand-500/10 text-xs font-bold text-brand-300">
                      {s.stage}
                    </span>
                    <p className="mt-3 text-sm font-semibold leading-snug text-slate-800 dark:text-white">
                      {s.label}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
