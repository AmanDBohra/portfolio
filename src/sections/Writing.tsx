import { useMemo, useState } from "react";
import { ArrowRight, Clock } from "lucide-react";
import { posts } from "../lib/posts";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Reveal } from "../components/ui/Reveal";

export function Writing() {
  const allTags = useMemo(
    () => Array.from(new Set(posts.flatMap((p) => p.tags))).sort(),
    []
  );
  const [tag, setTag] = useState<string | null>(null);
  const shown = tag ? posts.filter((p) => p.tags.includes(tag)) : posts;

  if (posts.length === 0) return null;
  return (
    <section id="writing" className="section bg-white/[0.02]">
      <div className="container-x">
        <SectionHeading
          eyebrow="Writing"
          title="Notes on analytics & BI"
          description="Short, practical pieces on delivery, performance, and turning data into decisions."
        />

        <Reveal className="mx-auto mb-8 flex max-w-3xl flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setTag(null)}
            aria-pressed={tag === null}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              tag === null
                ? "border-brand-400/50 bg-brand-500/10 text-brand-300"
                : "border-white/10 bg-white/[0.02] text-slate-400 hover:text-slate-200"
            }`}
          >
            All
          </button>
          {allTags.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTag(t)}
              aria-pressed={tag === t}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                tag === t
                  ? "border-brand-400/50 bg-brand-500/10 text-brand-300"
                  : "border-white/10 bg-white/[0.02] text-slate-400 hover:text-slate-200"
              }`}
            >
              {t}
            </button>
          ))}
        </Reveal>

        <div className="mx-auto max-w-3xl divide-y divide-white/10">
          {shown.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <a
                href={`#/read/${p.slug}`}
                className="group flex flex-col gap-2 py-6 transition-colors first:pt-0"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                  <span>{p.dateLabel}</span>
                  {p.readingTime && (
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {p.readingTime}
                    </span>
                  )}
                  {p.tags.slice(0, 3).map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-brand-500 dark:text-white dark:group-hover:text-brand-300">
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {p.excerpt}
                </p>
                <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-500 dark:text-brand-400">
                  Read article
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
