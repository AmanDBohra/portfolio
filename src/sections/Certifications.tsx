import { Award, ExternalLink, Star } from "lucide-react";
import { certifications, achievements } from "../data/portfolio";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Reveal } from "../components/ui/Reveal";
import { Stagger, StaggerItem } from "../components/ui/Stagger";

export function Certifications() {
  return (
    <section id="certifications" className="section bg-slate-50/70 dark:bg-white/[0.02]">
      <div className="container-x">
        <SectionHeading
          eyebrow="Credentials"
          title="Certifications & achievements"
          description="Industry certifications across Qlik, Microsoft, and Databricks, plus recognition and community work."
        />

        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" gap={0.04} as="div">
          {certifications.map((cert) => {
            const inner = (
              <>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                  <Award className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">
                  {cert.title}
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{cert.issuer}</p>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {cert.date ?? "Certified"}
                  </span>
                  {cert.credentialUrl && <ExternalLink className="h-4 w-4 text-brand-500" />}
                </div>
              </>
            );
            return (
              <StaggerItem key={cert.title} as="div" className="h-full">
                {cert.credentialUrl ? (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card flex h-full flex-col"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="card flex h-full flex-col">{inner}</div>
                )}
              </StaggerItem>
            );
          })}
        </Stagger>

        {achievements.length > 0 && (
          <Reveal delay={0.1}>
            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/60">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Recognition & community
              </h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {achievements.map((a) => (
                  <li
                    key={a}
                    className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
                  >
                    <Star className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}

        <Reveal delay={0.15}>
          <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            <a
              href={`${import.meta.env.BASE_URL}certifications.html`}
              className="font-semibold text-brand-500 hover:underline dark:text-brand-400"
            >
              View all 12 certifications + 40&plus; courses, with verify links →
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
