import { about, site } from "../data/portfolio";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Reveal } from "../components/ui/Reveal";

export function About() {
  return (
    <section id="about" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="About"
          title="A bit about me"
          description="Background, interests, and where I'm headed."
        />

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="space-y-5 text-base leading-relaxed text-slate-600 dark:text-slate-400">
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Interests
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {about.interests.map((interest) => (
                  <li key={interest} className="chip">
                    {interest}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {about.highlights.map((h) => (
                <div key={h.label} className="card text-center">
                  <p className="text-3xl font-extrabold text-brand-600 dark:text-brand-400">
                    {h.value}
                  </p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{h.label}</p>
                </div>
              ))}
            </div>
            <div className="card mt-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">Based in</p>
              <p className="mt-1 font-semibold text-slate-900 dark:text-white">{site.location}</p>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Email</p>
              <a
                href={`mailto:${site.email}`}
                className="mt-1 block font-semibold text-brand-600 hover:underline dark:text-brand-400"
              >
                {site.email}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
