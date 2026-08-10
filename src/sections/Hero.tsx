import { ArrowRight, Download, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { site, socials } from "../data/portfolio";
import { SocialIcons } from "../components/ui/SocialIcons";

export function Hero() {
  const initials = site.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <section id="hero" className="relative overflow-hidden pt-28 sm:pt-36">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl dark:bg-brand-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(100,116,139,0.12)_1px,transparent_0)] [background-size:28px_28px]" />
      </div>

      <div className="container-x grid items-center gap-12 pb-20 lg:grid-cols-[1.2fr_0.8fr] lg:pb-28">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/60 px-4 py-1.5 text-sm font-medium text-slate-600 backdrop-blur dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            Available for new opportunities
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-6xl dark:text-white"
          >
            Hi, I&apos;m {site.name}.
            <span className="block bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
              {site.title}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-400"
          >
            {site.tagline} {site.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a href="#projects" className="btn-primary">
              View My Work <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={site.resumeUrl}
              download
              className="btn-secondary"
            >
              <Download className="h-4 w-4" /> Download Resume
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-6"
          >
            <SocialIcons links={socials} />
            <span className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
              <MapPin className="h-4 w-4" /> {site.location}
            </span>
          </motion.div>
        </div>

        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto lg:mx-0"
        >
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-brand-500/20 to-brand-300/10 blur-2xl" />
            <div className="relative aspect-square w-64 overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-brand-500/15 to-slate-200/40 shadow-2xl sm:w-80 dark:border-slate-800 dark:to-slate-800/40">
              {site.avatar ? (
                <img
                  src={site.avatar}
                  alt={`Portrait of ${site.name}`}
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-7xl font-extrabold text-brand-600/70 dark:text-brand-300/60">
                    {initials || "ME"}
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
