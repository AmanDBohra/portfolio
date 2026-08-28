import { ArrowRight, Download, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { site, socials } from "../data/portfolio";
import { SocialIcons } from "../components/ui/SocialIcons";
import { AnalyticsEnv } from "../components/ui/AnalyticsEnv";

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-28 sm:pt-32">
      {/* Ambient analytics environment */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-[0.5]">
          <AnalyticsEnv className="h-full w-full" variant="hero" />
        </div>
        <div className="absolute left-1/2 top-[-8%] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl" />
      </div>

      <div className="container-x grid items-center gap-12 pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:pb-24">
        {/* LEFT — copy */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-400 sm:text-sm"
          >
            {site.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-5 max-w-[15ch] text-[2.6rem] font-extrabold leading-[1.05] tracking-[-0.02em] text-slate-900 sm:text-6xl lg:text-[4.25rem] dark:text-white"
          >
            I Make Enterprise Analytics{" "}
            <span className="bg-gradient-to-r from-brand-500 to-brand-400 bg-clip-text text-transparent">
              Useful.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300"
          >
            {site.heroSupport}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-3 max-w-xl text-sm leading-relaxed text-brand-300"
          >
            {site.heroSupport2}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a href="#experience" className="btn-primary">
              Explore My Experience <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#journey" className="btn-secondary">
              View Analytics Journey
            </a>
            <a href={site.resumeUrl} download className="btn-secondary">
              <Download className="h-4 w-4" /> Resume
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-6"
          >
            <SocialIcons links={socials} />
            <span className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
              <MapPin className="h-4 w-4" /> {site.location}
            </span>
          </motion.div>
        </div>

        {/* RIGHT — portrait emerging from analytics environment */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative mx-auto"
        >
          <div className="relative h-72 w-72 sm:h-96 sm:w-96">
            {/* environment behind the portrait */}
            <AnalyticsEnv
              className="absolute inset-[-18%] h-[136%] w-[136%] opacity-60"
              variant="band"
            />
            {/* glow */}
            <div className="absolute inset-0 rounded-full bg-brand-500/20 blur-2xl" />
            {/* rotating dashed ring */}
            <div className="absolute inset-[-6%] rounded-full border border-dashed border-brand-400/30" />
            {/* portrait */}
            <div className="absolute inset-0 overflow-hidden rounded-full border border-brand-400/40 shadow-2xl shadow-brand-900/40 ring-1 ring-white/10">
              <img
                src={site.avatar}
                alt={`Portrait of ${site.name}, Senior Analytics & BI Professional`}
                className="h-full w-full object-cover"
                loading="eager"
                width={800}
                height={800}
              />
              {/* subtle navy vignette to marry photo to the dark theme */}
              <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_-40px_60px_-20px_rgba(7,26,43,0.55)]" />
            </div>
            {/* accent nodes on the ring */}
            <span className="absolute right-2 top-6 h-2.5 w-2.5 rounded-full bg-brand-400 shadow-[0_0_12px_2px_rgba(70,199,232,0.7)]" />
            <span className="absolute bottom-8 left-0 h-2 w-2 rounded-full bg-teal-400 shadow-[0_0_10px_2px_rgba(24,166,166,0.7)]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
