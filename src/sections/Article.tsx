import { useEffect } from "react";
import { ArrowLeft, Clock, Moon, Sun } from "lucide-react";
import type { Post } from "../lib/posts";
import { site } from "../data/portfolio";

interface Props {
  post: Post;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export function Article({ post, theme, onToggleTheme }: Props) {
  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = `${post.title} — ${site.name}`;
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content") ?? "";
    if (meta && post.excerpt) meta.setAttribute("content", post.excerpt);
    return () => {
      document.title = prevTitle;
      if (meta) meta.setAttribute("content", prevDesc);
    };
  }, [post]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-white/70 backdrop-blur-md dark:bg-navy-900/70">
        <div className="container-x flex h-16 items-center justify-between">
          <a href="#/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-brand-500 dark:text-slate-200">
            <ArrowLeft className="h-4 w-4" /> Back to portfolio
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

      <main id="main" className="container-x py-14 sm:py-20">
        <article className="mx-auto max-w-2xl">
          <a href="#writing" className="text-xs font-semibold uppercase tracking-widest text-brand-500 dark:text-brand-400">
            Writing
          </a>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
            <span>{post.dateLabel}</span>
            {post.readingTime && (
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {post.readingTime}
              </span>
            )}
            {post.tags.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>

          <div
            className="article-body mt-10"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <div className="mt-14 border-t border-white/10 pt-6">
            <a href="#/" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-500 dark:text-brand-400">
              <ArrowLeft className="h-4 w-4" /> Back to portfolio
            </a>
          </div>
        </article>
      </main>
    </>
  );
}
