import { creativeWork } from "../data/portfolio";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Reveal } from "../components/ui/Reveal";
import { Thumb } from "../components/ui/Thumb";

export function Creative() {
  return (
    <section id="creative" className="section bg-slate-50/70 dark:bg-slate-900/30">
      <div className="container-x">
        <SectionHeading
          eyebrow="Gallery"
          title="Dashboard showcase"
          description="A gallery of executive-ready dashboards across Qlik Sense, QlikView, Power BI, and Databricks. Replace the placeholders with real screenshots (redact sensitive data first)."
        />

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {creativeWork.map((work, i) => (
            <Reveal key={work.title} delay={(i % 3) * 0.05}>
              <figure className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
                <Thumb
                  src={work.image}
                  alt={work.title}
                  label={work.category}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 flex flex-col bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-xs font-medium uppercase tracking-widest text-brand-200">
                    {work.category}
                  </span>
                  <span className="text-sm font-semibold text-white">{work.title}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
