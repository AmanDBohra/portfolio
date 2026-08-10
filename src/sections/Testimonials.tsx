import { Quote } from "lucide-react";
import { testimonials } from "../data/portfolio";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Reveal } from "../components/ui/Reveal";

export function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Testimonials"
          title="What people say"
          description="Placeholder testimonials — replace with real quotes once you have them."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.05}>
              <figure className="card flex h-full flex-col">
                <Quote className="h-8 w-8 text-brand-400" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
                  <p className="font-semibold text-slate-900 dark:text-white">{t.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{t.title}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
