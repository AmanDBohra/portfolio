import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Moon,
  Sun,
  BookOpen,
  Map,
  CheckCircle2,
  XCircle,
  RotateCcw,
  GraduationCap,
  Info,
  Briefcase,
  Lightbulb,
  Zap,
} from "lucide-react";
import { studyModules, type StudyQuestion } from "../data/study";
import { site } from "../data/portfolio";

interface Props {
  slug: string | null;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

/* A single quiz question with reveal-answer behavior. */
function QuestionCard({ q, index }: { q: StudyQuestion; index: number }) {
  const [picked, setPicked] = useState<number | null>(null);
  const revealed = picked !== null;

  return (
    <li className="card">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
          {index + 1}
        </span>
        <div className="flex-1">
          <p className="font-semibold text-slate-900 dark:text-white">{q.q}</p>
          <span className="mt-1 inline-block text-xs font-medium uppercase tracking-wide text-brand-600/80 dark:text-brand-400/80">
            {q.t}
          </span>

          <ul className="mt-4 space-y-2">
            {q.o.map((opt, i) => {
              const isCorrect = i === q.a;
              const isPicked = i === picked;
              let cls =
                "flex w-full items-start gap-2 rounded-xl border px-4 py-3 text-left text-sm transition-colors ";
              if (!revealed) {
                cls +=
                  "border-slate-200 hover:border-brand-400 hover:bg-brand-50/50 dark:border-white/10 dark:hover:border-brand-400/50 dark:hover:bg-white/[0.04]";
              } else if (isCorrect) {
                cls +=
                  "border-emerald-400 bg-emerald-50 dark:border-emerald-500/50 dark:bg-emerald-500/10";
              } else if (isPicked) {
                cls += "border-rose-400 bg-rose-50 dark:border-rose-500/50 dark:bg-rose-500/10";
              } else {
                cls += "border-slate-200 opacity-60 dark:border-white/10";
              }
              return (
                <li key={i}>
                  <button
                    type="button"
                    disabled={revealed}
                    onClick={() => setPicked(i)}
                    className={cls}
                  >
                    <span className="mt-0.5 flex-shrink-0 font-semibold text-slate-500 dark:text-slate-400">
                      {String.fromCharCode(65 + i)}.
                    </span>
                    <span className="flex-1 text-slate-700 dark:text-slate-200">{opt}</span>
                    {revealed && isCorrect && (
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-500" />
                    )}
                    {revealed && isPicked && !isCorrect && (
                      <XCircle className="h-5 w-5 flex-shrink-0 text-rose-500" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {revealed && (
            <div className="mt-4 rounded-xl border border-brand-200 bg-brand-50/60 p-4 text-sm leading-relaxed text-slate-700 dark:border-brand-500/20 dark:bg-brand-500/[0.06] dark:text-slate-300">
              <p className="mb-1 font-semibold text-brand-700 dark:text-brand-300">
                {picked === q.a ? "Correct" : "Explanation"}
              </p>
              {q.e}
              <button
                type="button"
                onClick={() => setPicked(null)}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:underline dark:text-brand-400"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Try again
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export function StudyHub({ slug, theme, onToggleTheme }: Props) {
  const active = useMemo(
    () => (slug ? studyModules.find((m) => m.slug === slug) : undefined),
    [slug]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-navy-900/70">
        <div className="container-x flex h-16 items-center justify-between">
          <a
            href={active ? "#/study" : "#/"}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-brand-500 dark:text-slate-200"
          >
            <ArrowLeft className="h-4 w-4" />
            {active ? "All certifications" : "Back to portfolio"}
          </a>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 dark:border-white/15 dark:text-slate-300"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <main id="main" className="container-x py-12 sm:py-16">
        {!active ? (
          <>
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="flex items-center justify-center gap-2 eyebrow">
                <GraduationCap className="h-4 w-4" /> Study Hub
              </p>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                Certification study material
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                Roadmaps, study notes, and interactive practice questions with detailed
                explanations for each certification. Pick a certification to begin.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {studyModules.map((m) => (
                <a key={m.slug} href={`#/study/${m.slug}`} className="card group flex h-full flex-col overflow-hidden p-0">
                  {m.image && (
                    <div className="overflow-hidden border-b border-slate-200/60 dark:border-white/10">
                      <img
                        src={m.image}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="aspect-[1000/420] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                      <BookOpen className="h-5 w-5" />
                    </span>
                    <span className="chip">{m.issuer}</span>
                  </div>
                  <h2 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
                    {m.name}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {m.blurb}
                  </p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-400">
                    {m.questions.length} practice questions · {m.level}
                  </p>
                  </div>
                </a>
              ))}
            </div>
          </>
        ) : (
          <article className="mx-auto max-w-3xl">
            <p className="eyebrow">{active.issuer} · {active.level}</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              {active.name}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
              {active.blurb}
            </p>
            <p className="mt-3 text-sm font-medium text-brand-600 dark:text-brand-400">
              {active.examFormat}
            </p>

            {/* Concept diagram */}
            {active.image && (
              <figure className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white/60 dark:border-white/10 dark:bg-white/[0.02]">
                <img
                  src={active.image}
                  alt={`${active.name} — concept diagram`}
                  className="w-full"
                  loading="lazy"
                />
              </figure>
            )}

            {/* What it is */}
            {active.about && active.about.length > 0 && (
              <section className="mt-12">
                <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
                  <Info className="h-5 w-5 text-brand-500" /> What it is
                </h2>
                <div className="mt-4 space-y-4 text-[0.97rem] leading-relaxed text-slate-600 dark:text-slate-300">
                  {active.about.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            )}

            {/* Where it's used */}
            {active.usage && active.usage.length > 0 && (
              <section className="mt-12">
                <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
                  <Briefcase className="h-5 w-5 text-brand-500" /> Where it's used
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {active.usage.map((u, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-[0.97rem] leading-relaxed text-slate-600 dark:text-slate-300"
                    >
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-400" />
                      {u}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* In plain English */}
            {active.layman && active.layman.length > 0 && (
              <section className="mt-12">
                <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
                  <Lightbulb className="h-5 w-5 text-brand-500" /> In plain English
                </h2>
                {active.images && active.images[1] && (
                  <figure className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white/60 dark:border-white/10 dark:bg-white/[0.02]">
                    <img
                      src={active.images[1]}
                      alt={`${active.name} — everyday analogy`}
                      className="w-full"
                      loading="lazy"
                    />
                  </figure>
                )}
                <ul className="mt-5 space-y-3">
                  {active.layman.map((p, i) => (
                    <li
                      key={i}
                      className="rounded-xl border border-slate-200 bg-white/60 p-4 text-[0.97rem] leading-relaxed text-slate-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Exam shortcut tricks */}
            {active.tips && active.tips.length > 0 && (
              <section className="mt-12">
                <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
                  <Zap className="h-5 w-5 text-brand-500" /> Exam shortcut tricks
                </h2>
                <ul className="mt-5 space-y-2.5">
                  {active.tips.map((t, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-[0.97rem] leading-relaxed text-slate-700 dark:text-slate-300"
                    >
                      <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
                        {i + 1}
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Roadmap */}
            <section className="mt-12">
              <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
                <Map className="h-5 w-5 text-brand-500" /> Study roadmap
              </h2>
              <ol className="mt-5 space-y-3">
                {active.roadmap.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{step}</p>
                  </li>
                ))}
              </ol>
            </section>

            {/* Study notes */}
            <section className="mt-12">
              <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
                <BookOpen className="h-5 w-5 text-brand-500" /> Study notes
              </h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {active.notes.map((n) => (
                  <div key={n.h} className="card">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">{n.h}</h3>
                    <ul className="mt-3 space-y-2">
                      {n.points.map((p, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400"
                        >
                          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-400" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Quiz */}
            <section className="mt-12">
              <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
                <GraduationCap className="h-5 w-5 text-brand-500" /> Practice questions
                <span className="ml-1 text-sm font-normal text-slate-500 dark:text-slate-400">
                  ({active.questions.length})
                </span>
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Choose an answer to reveal the correct option and a detailed explanation.
              </p>
              <ul className="mt-6 space-y-5">
                {active.questions.map((q, i) => (
                  <QuestionCard key={i} q={q} index={i} />
                ))}
              </ul>
            </section>

            <div className="mt-14 border-t border-slate-200 pt-6 dark:border-white/10">
              <a
                href="#/study"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-500 dark:text-brand-400"
              >
                <ArrowLeft className="h-4 w-4" /> All certifications
              </a>
            </div>
          </article>
        )}

        <p className="mt-16 text-center text-xs text-slate-400 dark:text-slate-500">
          Study Hub · {site.name}
        </p>
      </main>
    </>
  );
}
