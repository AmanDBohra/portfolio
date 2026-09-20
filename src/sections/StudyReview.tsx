import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Moon, Sun, Brain, CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { studyModules, type StudyQuestion } from "../data/study";
import { site } from "../data/portfolio";

interface Props {
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

interface Card {
  id: string;
  q: StudyQuestion;
  certName: string;
}
interface SrsState {
  ease: number;
  interval: number; // days
  due: number; // timestamp ms
  reps: number;
}
type SrsMap = Record<string, SrsState>;

const KEY = "study-srs-v1";
const DAY = 86400000;
const NEW_PER_SESSION = 20;

function loadSrs(): SrsMap {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}
function saveSrs(m: SrsMap) {
  try {
    localStorage.setItem(KEY, JSON.stringify(m));
  } catch {
    /* ignore */
  }
}

/* SM-2-lite scheduler. grade: 0=Again 1=Hard 2=Good 3=Easy */
function schedule(prev: SrsState | undefined, grade: number): SrsState {
  const now = Date.now();
  let ease = prev?.ease ?? 2.5;
  let interval = prev?.interval ?? 0;
  let reps = prev?.reps ?? 0;

  if (grade === 0) {
    ease = Math.max(1.3, ease - 0.2);
    interval = 0;
    reps = 0;
    return { ease, interval, reps, due: now + 10 * 60 * 1000 }; // 10 min
  }
  if (grade === 1) {
    ease = Math.max(1.3, ease - 0.15);
    interval = interval < 1 ? 1 : Math.round(interval * 1.2);
  } else if (grade === 2) {
    interval = reps === 0 ? 1 : reps === 1 ? 6 : Math.round(interval * ease);
  } else {
    ease = ease + 0.15;
    interval = reps === 0 ? 3 : Math.round(interval * ease * 1.3);
  }
  reps += 1;
  return { ease, interval, reps, due: now + interval * DAY };
}

export function StudyReview({ theme, onToggleTheme }: Props) {
  const allCards: Card[] = useMemo(
    () =>
      studyModules.flatMap((m) =>
        m.questions.map((q, i) => ({ id: `${m.slug}#${i}`, q, certName: m.name }))
      ),
    []
  );

  const [issuer, setIssuer] = useState("All");
  const issuers = useMemo(
    () => ["All", ...Array.from(new Set(studyModules.map((m) => m.issuer)))],
    []
  );
  const certByIssuer = useMemo(() => {
    const map: Record<string, string> = {};
    studyModules.forEach((m) => (map[m.slug] = m.issuer));
    return map;
  }, []);

  const [srs, setSrs] = useState<SrsMap>({});
  const [queue, setQueue] = useState<Card[]>([]);
  const [current, setCurrent] = useState<Card | null>(null);
  const [picked, setPicked] = useState<number | null>(null);
  const [reviewed, setReviewed] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setSrs(loadSrs());
  }, []);

  function buildQueue(map: SrsMap) {
    const now = Date.now();
    const pool = allCards.filter(
      (c) => issuer === "All" || certByIssuer[c.id.split("#")[0]] === issuer
    );
    const due = pool.filter((c) => map[c.id] && map[c.id].due <= now);
    const fresh = pool.filter((c) => !map[c.id]).slice(0, NEW_PER_SESSION);
    // shuffle due lightly
    const q = [...due, ...fresh];
    for (let i = q.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [q[i], q[j]] = [q[j], q[i]];
    }
    return q;
  }

  function start() {
    const q = buildQueue(srs);
    setQueue(q);
    setCurrent(q[0] ?? null);
    setPicked(null);
    setReviewed(0);
    setStarted(true);
  }

  function grade(g: number) {
    if (!current) return;
    const next = { ...srs, [current.id]: schedule(srs[current.id], g) };
    setSrs(next);
    saveSrs(next);
    setReviewed((r) => r + 1);
    const rest = queue.slice(1);
    // if 'Again', requeue near the end
    const q = g === 0 ? [...rest, current] : rest;
    setQueue(q);
    setCurrent(q[0] ?? null);
    setPicked(null);
  }

  const now = Date.now();
  const pool = allCards.filter(
    (c) => issuer === "All" || certByIssuer[c.id.split("#")[0]] === issuer
  );
  const dueCount = pool.filter((c) => srs[c.id] && srs[c.id].due <= now).length;
  const newCount = pool.filter((c) => !srs[c.id]).length;
  const learned = pool.filter((c) => srs[c.id]).length;

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-navy-900/70">
        <div className="container-x flex h-16 items-center justify-between">
          <a
            href="#/study"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-brand-500 dark:text-slate-200"
          >
            <ArrowLeft className="h-4 w-4" /> Study Hub
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
        <div className="mx-auto max-w-2xl">
          <p className="flex items-center gap-2 eyebrow">
            <Brain className="h-4 w-4" /> Spaced Repetition
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Review
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
            An SM-2-style scheduler resurfaces questions right before you'd forget them. Rate each
            answer and it schedules the next review. Progress is saved in this browser.
          </p>

          {!started ? (
            <div className="mt-8 card">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-extrabold text-brand-500">{dueCount}</p>
                  <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Due now</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-brand-500">{newCount}</p>
                  <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">New</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-brand-500">{learned}</p>
                  <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Started</p>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <select
                  value={issuer}
                  onChange={(e) => setIssuer(e.target.value)}
                  className="rounded-full border border-slate-300 bg-white/70 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-brand-400 dark:border-white/15 dark:bg-white/[0.04] dark:text-slate-200"
                >
                  {issuers.map((iss) => (
                    <option key={iss} value={iss}>
                      {iss === "All" ? "All issuers" : iss}
                    </option>
                  ))}
                </select>
                <button type="button" onClick={start} className="btn-primary">
                  Start review session
                </button>
              </div>
              <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">
                Each session includes due cards plus up to {NEW_PER_SESSION} new ones.
              </p>
            </div>
          ) : !current ? (
            <div className="mt-8 card text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-500" />
              <p className="mt-3 text-lg font-bold text-slate-900 dark:text-white">Session complete</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                You reviewed {reviewed} card{reviewed === 1 ? "" : "s"}. Come back later for the next batch.
              </p>
              <div className="mt-5 flex justify-center gap-3">
                <button type="button" onClick={start} className="btn-secondary">
                  <RotateCcw className="h-4 w-4" /> Review again
                </button>
                <a href="#/study" className="btn-primary">Back to Study Hub</a>
              </div>
            </div>
          ) : (
            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>{current.certName}</span>
                <span>{queue.length} left · {reviewed} done</span>
              </div>
              <div className="card">
                <p className="font-semibold text-slate-900 dark:text-white">{current.q.q}</p>
                <span className="mt-1 inline-block text-xs font-medium uppercase tracking-wide text-brand-600/80 dark:text-brand-400/80">
                  {current.q.t}
                </span>
                <ul className="mt-4 space-y-2">
                  {current.q.o.map((opt, i) => {
                    const revealed = picked !== null;
                    const isCorrect = i === current.q.a;
                    const isPicked = i === picked;
                    let cls =
                      "flex w-full items-start gap-2 rounded-xl border px-4 py-3 text-left text-sm transition-colors ";
                    if (!revealed)
                      cls +=
                        "border-slate-200 hover:border-brand-400 hover:bg-brand-50/50 dark:border-white/10 dark:hover:border-brand-400/50 dark:hover:bg-white/[0.04]";
                    else if (isCorrect)
                      cls += "border-emerald-400 bg-emerald-50 dark:border-emerald-500/50 dark:bg-emerald-500/10";
                    else if (isPicked)
                      cls += "border-rose-400 bg-rose-50 dark:border-rose-500/50 dark:bg-rose-500/10";
                    else cls += "border-slate-200 opacity-60 dark:border-white/10";
                    return (
                      <li key={i}>
                        <button type="button" disabled={revealed} onClick={() => setPicked(i)} className={cls}>
                          <span className="mt-0.5 flex-shrink-0 font-semibold text-slate-500 dark:text-slate-400">
                            {String.fromCharCode(65 + i)}.
                          </span>
                          <span className="flex-1 text-slate-700 dark:text-slate-200">{opt}</span>
                          {revealed && isCorrect && <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-500" />}
                          {revealed && isPicked && !isCorrect && <XCircle className="h-5 w-5 flex-shrink-0 text-rose-500" />}
                        </button>
                      </li>
                    );
                  })}
                </ul>
                {picked !== null && (
                  <div className="mt-4 rounded-xl border border-brand-200 bg-brand-50/60 p-4 text-sm leading-relaxed text-slate-700 dark:border-brand-500/20 dark:bg-brand-500/[0.06] dark:text-slate-300">
                    <p className="mb-1 font-semibold text-brand-700 dark:text-brand-300">
                      {picked === current.q.a ? "Correct" : "Explanation"}
                    </p>
                    {current.q.e}
                  </div>
                )}
              </div>

              {picked !== null && (
                <div className="mt-4 grid grid-cols-4 gap-2">
                  <button type="button" onClick={() => grade(0)} className="rounded-xl border border-rose-300 bg-rose-50 py-2.5 text-sm font-semibold text-rose-700 hover:bg-rose-100 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-300">
                    Again
                  </button>
                  <button type="button" onClick={() => grade(1)} className="rounded-xl border border-amber-300 bg-amber-50 py-2.5 text-sm font-semibold text-amber-700 hover:bg-amber-100 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-300">
                    Hard
                  </button>
                  <button type="button" onClick={() => grade(2)} className="rounded-xl border border-brand-300 bg-brand-50 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-100 dark:border-brand-500/40 dark:bg-brand-500/10 dark:text-brand-300">
                    Good
                  </button>
                  <button type="button" onClick={() => grade(3)} className="rounded-xl border border-emerald-300 bg-emerald-50 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-100 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300">
                    Easy
                  </button>
                </div>
              )}
              {picked === null && (
                <p className="mt-4 text-center text-sm text-slate-400 dark:text-slate-500">
                  Choose an answer to reveal the explanation and rate it.
                </p>
              )}
            </div>
          )}
        </div>

        <p className="mt-16 text-center text-xs text-slate-400 dark:text-slate-500">
          Study Hub · {site.name}
        </p>
      </main>
    </>
  );
}
