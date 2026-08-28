import { Github, ExternalLink, CheckCircle2, Lock } from "lucide-react";
import { projects } from "../data/portfolio";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Reveal } from "../components/ui/Reveal";
import { Thumb } from "../components/ui/Thumb";

export function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container-x">
        <SectionHeading
          index="04"
          eyebrow="Selected Work"
          title="Work that mattered"
          description="Enterprise analytics engagements framed as problem → approach → outcome. Most are client-confidential, so they're described at a business level."
        />

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.name} delay={(i % 2) * 0.08}>
              <article className="card group flex h-full flex-col overflow-hidden p-0">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Thumb
                    src={project.image}
                    alt={`${project.name} preview`}
                    label="Project thumbnail"
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                  {project.featured && (
                    <span className="absolute left-3 top-3 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white shadow">
                      Featured
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  {project.context && (
                    <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
                      {project.context}
                    </p>
                  )}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {project.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {project.description}
                  </p>

                  <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Problem solved:{" "}
                    </span>
                    {project.problem}
                  </p>

                  <ul className="mt-4 space-y-1.5">
                    {project.features.slice(0, 4).map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <li key={t} className="chip">
                        {t}
                      </li>
                    ))}
                  </ul>

                  {project.github || project.demo ? (
                    <div className="mt-6 flex gap-3 pt-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary flex-1"
                        >
                          <Github className="h-4 w-4" /> Code
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary flex-1"
                        >
                          <ExternalLink className="h-4 w-4" /> Live Demo
                        </a>
                      )}
                    </div>
                  ) : (
                    <p className="mt-6 flex items-center gap-2 pt-2 text-xs font-medium text-slate-400 dark:text-slate-500">
                      <Lock className="h-3.5 w-3.5" /> Confidential client project
                    </p>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
