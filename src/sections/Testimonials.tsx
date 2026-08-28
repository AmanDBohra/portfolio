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
          description="Recommendations from colleagues, managers, mentors, and clients on LinkedIn."
        />

        <div className="grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 0.05}>
              <figure className="card flex h-full flex-col">
                <Quote className="h-8 w-8 text-brand-400" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
                  {t.linkedin ? (
                    <a
                      href={t.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-slate-900 hover:text-brand-600 hover:underline dark:text-white dark:hover:text-brand-300"
                    >
                      {t.name}
                    </a>
                  ) : (
                    <p className="font-semibold text-slate-900 dark:text-white">{t.name}</p>
                  )}
                  <p className="text-sm text-slate-500 dark:text-slate-400">{t.title}</p>
                  {t.relation && (
                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-brand-600/80 dark:text-brand-400/80">
                      {t.relation}
                    </p>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
