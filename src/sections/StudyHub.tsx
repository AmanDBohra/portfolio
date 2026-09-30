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
  Search,
  Printer,
  Wrench,
  Brain,
} from "lucide-react";
import { studyModules, type StudyQuestion, type CertStudy } from "../data/study";
import { site } from "../data/portfolio";
import { StudyReview } from "./StudyReview";

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

/* A search result — question with a reveal for the answer + explanation. */
function SearchResult({
  q,
  certName,
  certSlug,
}: {
  q: StudyQuestion;
  certName: string;
  certSlug: string;
}) {
  return (
    <li className="card">
      <div className="flex items-center justify-between gap-3">
        <a
          href={`#/study/${certSlug}`}
          className="text-xs font-semibold uppercase tracking-wide text-brand-600 hover:underline dark:text-brand-400"
        >
          {certName}
        </a>
        <span className="chip">{q.t}</span>
      </div>
      <p className="mt-2 font-semibold text-slate-900 dark:text-white">{q.q}</p>
      <details className="group mt-2">
        <summary className="cursor-pointer text-sm font-medium text-brand-600 dark:text-brand-400">
          Show answer &amp; explanation
        </summary>
        <ul className="mt-3 space-y-1.5">
          {q.o.map((opt, i) => (
            <li
              key={i}
              className={`flex items-start gap-2 rounded-lg border px-3 py-2 text-sm ${
                i === q.a
                  ? "border-emerald-400 bg-emerald-50 dark:border-emerald-500/50 dark:bg-emerald-500/10"
                  : "border-slate-200 opacity-70 dark:border-white/10"
              }`}
            >
              <span className="font-semibold text-slate-500 dark:text-slate-400">
                {String.fromCharCode(65 + i)}.
              </span>
              <span className="flex-1 text-slate-700 dark:text-slate-200">{opt}</span>
              {i === q.a && <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-500" />}
            </li>
          ))}
        </ul>
        <p className="mt-3 rounded-lg border border-brand-200 bg-brand-50/60 p-3 text-sm leading-relaxed text-slate-700 dark:border-brand-500/20 dark:bg-brand-500/[0.06] dark:text-slate-300">
          {q.e}
        </p>
      </details>
    </li>
  );
}

/* Print-only full material for a cert (shown only when printing / Save as PDF). */
function CertPrintable({ m }: { m: CertStudy }) {
  return (
    <div className="hidden print:block print-doc">
      <h1>{m.name}</h1>
      <p className="muted">{m.issuer} · {m.level}</p>
      <p>{m.blurb}</p>
      <p className="muted">{m.examFormat}</p>

      {m.about && m.about.length > 0 && (
        <>
          <h2>What it is</h2>
          {m.about.map((p, i) => <p key={i}>{p}</p>)}
        </>
      )}
      {m.usage && m.usage.length > 0 && (
        <>
          <h2>Where it's used</h2>
          <ul>{m.usage.map((u, i) => <li key={i}>{u}</li>)}</ul>
        </>
      )}
      {m.layman && m.layman.length > 0 && (
        <>
          <h2>In plain English</h2>
          <ul>{m.layman.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </>
      )}
      {m.tips && m.tips.length > 0 && (
        <>
          <h2>Exam shortcut tricks</h2>
          <ol>{m.tips.map((t, i) => <li key={i}>{t}</li>)}</ol>
        </>
      )}
      <h2>Study roadmap</h2>
      <ol>{m.roadmap.map((s, i) => <li key={i}>{s}</li>)}</ol>

      <h2>Study notes</h2>
      {m.notes.map((n) => (
        <div key={n.h}>
          <h3>{n.h}</h3>
          <ul>{n.points.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
      ))}

      {m.projects && m.projects.length > 0 && (
        <>
          <h2>Hands-on projects</h2>
          {m.projects.map((p, i) => (
            <div key={i}>
              <h3>{i + 1}. {p.title}</h3>
              <p><strong>Goal:</strong> {p.goal}</p>
              {p.architecture && <p><strong>Architecture &amp; data model:</strong> {p.architecture}</p>}
              <p><strong>Concepts covered:</strong></p>
              {p.conceptDetails && p.conceptDetails.length > 0 ? (
                <ul>{p.conceptDetails.map((c, j) => <li key={j}><strong>{c.name}:</strong> {c.detail}</li>)}</ul>
              ) : (
                <p>{p.concepts.join(", ")}</p>
              )}
              <p><strong>{p.steps && p.steps.length > 0 ? "Implementation steps:" : "Approach:"}</strong></p>
              <ol>{(p.steps && p.steps.length > 0 ? p.steps : p.approach).map((s, j) => <li key={j}>{s}</li>)}</ol>
              {p.outcomes && p.outcomes.length > 0 && (
                <>
                  <p><strong>Outcomes:</strong></p>
                  <ul>{p.outcomes.map((o, j) => <li key={j}>{o}</li>)}</ul>
                </>
              )}
              <p><strong>Stack:</strong> {p.stack.join(", ")}</p>
              <p><em>{p.relevance}</em></p>
            </div>
          ))}
        </>
      )}

      <h2>Practice questions ({m.questions.length})</h2>
      <ol className="print-q">
        {m.questions.map((q, i) => (
          <li key={i}>
            <p className="q">{q.q}</p>
            <ul>
              {q.o.map((opt, j) => (
                <li key={j} className={j === q.a ? "correct" : ""}>
                  {String.fromCharCode(65 + j)}. {opt}{j === q.a ? "  ✓" : ""}
                </li>
              ))}
            </ul>
            <p className="exp"><strong>Explanation:</strong> {q.e}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function StudyHub({ slug, theme, onToggleTheme }: Props) {
  const active = useMemo(
    () => (slug ? studyModules.find((m) => m.slug === slug) : undefined),
    [slug]
  );

  const [query, setQuery] = useState("");
  const [issuerFilter, setIssuerFilter] = useState("All");

  const issuers = useMemo(
    () => ["All", ...Array.from(new Set(studyModules.map((m) => m.issuer)))],
    []
  );

  const flatQuestions = useMemo(
    () =>
      studyModules.flatMap((m) =>
        m.questions.map((q) => ({ q, certName: m.name, certSlug: m.slug, issuer: m.issuer }))
      ),
    []
  );

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    return flatQuestions
      .filter((r) => issuerFilter === "All" || r.issuer === issuerFilter)
      .filter(
        (r) =>
          r.q.q.toLowerCase().includes(term) ||
          r.q.e.toLowerCase().includes(term) ||
          r.q.t.toLowerCase().includes(term) ||
          r.q.o.some((o) => o.toLowerCase().includes(term))
      )
      .slice(0, 80);
  }, [query, issuerFilter, flatQuestions]);

  const totalQuestions = flatQuestions.length;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (slug === "review") {
    return <StudyReview theme={theme} onToggleTheme={onToggleTheme} />;
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-md print:hidden dark:border-white/10 dark:bg-navy-900/70">
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
                Roadmaps, study notes, and {totalQuestions.toLocaleString()} interactive practice
                questions with detailed explanations across {studyModules.length} certifications.
                Search all questions, or pick a certification to begin.
              </p>
              <a href="#/study/review" className="btn-primary mt-6">
                <Brain className="h-4 w-4" /> Start spaced-repetition review
              </a>
            </div>

            {/* Search / filter across all questions */}
            <div className="mx-auto mb-10 flex max-w-2xl flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search all 1,100 questions (e.g. MERGE, RAG, CALCULATE, set analysis)…"
                  className="w-full rounded-full border border-slate-300 bg-white/70 py-2.5 pl-10 pr-4 text-sm text-slate-800 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/30 dark:border-white/15 dark:bg-white/[0.04] dark:text-slate-100"
                />
              </div>
              <select
                value={issuerFilter}
                onChange={(e) => setIssuerFilter(e.target.value)}
                aria-label="Filter by issuer"
                className="rounded-full border border-slate-300 bg-white/70 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-brand-400 dark:border-white/15 dark:bg-white/[0.04] dark:text-slate-200"
              >
                {issuers.map((iss) => (
                  <option key={iss} value={iss}>
                    {iss === "All" ? "All issuers" : iss}
                  </option>
                ))}
              </select>
            </div>

            {query.trim() ? (
              <div>
                <p className="mb-5 text-sm text-slate-500 dark:text-slate-400">
                  {results.length === 0
                    ? "No questions match your search."
                    : `Showing ${results.length}${results.length === 80 ? "+" : ""} matching question${results.length === 1 ? "" : "s"}.`}
                </p>
                <ul className="space-y-4">
                  {results.map((r, i) => (
                    <SearchResult key={i} q={r.q} certName={r.certName} certSlug={r.certSlug} />
                  ))}
                </ul>
              </div>
            ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {studyModules
                .filter((m) => issuerFilter === "All" || m.issuer === issuerFilter)
                .map((m) => (
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
            )}
          </>
        ) : (
          <article className="mx-auto max-w-3xl">
            <CertPrintable m={active} />
            <div className="print:hidden">
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

            <button
              type="button"
              onClick={() => window.print()}
              className="btn-secondary mt-6"
            >
              <Printer className="h-4 w-4" /> Save as PDF
            </button>

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

            {/* Hands-on projects */}
            {active.projects && active.projects.length > 0 && (
              <section className="mt-12">
                <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
                  <Wrench className="h-5 w-5 text-brand-500" /> Hands-on projects
                  <span className="ml-1 text-sm font-normal text-slate-500 dark:text-slate-400">
                    ({active.projects.length})
                  </span>
                </h2>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Portfolio-relevant projects that together cover the exam's concepts.
                </p>
                <div className="mt-6 space-y-5">
                  {active.projects.map((p, i) => (
                    <div key={i} className="card">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {i + 1}. {p.title}
                      </h3>
                      {p.diagram && (
                        <figure className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white/60 dark:border-white/10 dark:bg-white/[0.02]">
                          <img
                            src={p.diagram}
                            alt={`${p.title} — architecture diagram`}
                            className="w-full"
                            loading="lazy"
                          />
                        </figure>
                      )}
                      <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        <span className="font-semibold text-slate-700 dark:text-slate-200">Goal: </span>
                        {p.goal}
                      </p>

                      {p.architecture && (
                        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                          <span className="font-semibold text-slate-700 dark:text-slate-200">Architecture &amp; data model: </span>
                          {p.architecture}
                        </p>
                      )}

                      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-400">
                        Concepts covered
                      </p>
                      {p.conceptDetails && p.conceptDetails.length > 0 ? (
                        <ul className="mt-2 space-y-1.5">
                          {p.conceptDetails.map((c) => (
                            <li key={c.name} className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                              <span className="font-semibold text-slate-800 dark:text-slate-200">{c.name}:</span> {c.detail}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <ul className="mt-2 flex flex-wrap gap-2">
                          {p.concepts.map((c) => (
                            <li key={c} className="chip">{c}</li>
                          ))}
                        </ul>
                      )}

                      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-400">
                        {p.steps && p.steps.length > 0 ? "Implementation steps" : "Approach"}
                      </p>
                      <ol className="mt-2 space-y-1.5">
                        {(p.steps && p.steps.length > 0 ? p.steps : p.approach).map((step, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400"
                          >
                            <span className="mt-0.5 font-semibold text-slate-400">{j + 1}.</span>
                            {step}
                          </li>
                        ))}
                      </ol>

                      {p.outcomes && p.outcomes.length > 0 && (
                        <>
                          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-400">
                            Outcomes
                          </p>
                          <ul className="mt-2 space-y-1.5">
                            {p.outcomes.map((o, j) => (
                              <li
                                key={j}
                                className="flex items-start gap-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400"
                              >
                                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                                {o}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}

                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.stack.map((s) => (
                          <span
                            key={s}
                            className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-300"
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      <p className="mt-4 border-l-2 border-brand-400 pl-3 text-sm italic leading-relaxed text-slate-500 dark:text-slate-400">
                        {p.relevance}
                      </p>

                      {p.repo && (
                        <a
                          href={p.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:underline dark:text-brand-400"
                        >
                          <Wrench className="h-4 w-4" /> Open project lab (README + starter) →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

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
