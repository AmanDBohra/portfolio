import { faqs } from "../data/portfolio";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Reveal } from "../components/ui/Reveal";

export function FAQ() {
  return (
    <section id="faq" className="section bg-white/[0.02]" aria-labelledby="faq-heading">
      <div className="container-x">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Quick, factual answers about my background, skills, and work."
        />

        <dl className="mx-auto max-w-3xl divide-y divide-white/10">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={(i % 4) * 0.04}>
              <div className="py-5 first:pt-0">
                <dt className="text-base font-semibold text-slate-900 dark:text-white">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {f.a}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
