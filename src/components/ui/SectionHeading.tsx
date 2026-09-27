import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

interface Props {
  eyebrow: string;
  title: string;
  description?: string;
  /** Optional editorial section number, e.g. "03" */
  index?: string;
}

export function SectionHeading({ eyebrow, title, description, index }: Props) {
  return (
    <Reveal className="mx-auto mb-14 max-w-2xl text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 dark:border-brand-500/25 dark:bg-brand-500/[0.07]">
        {index && (
          <span className="font-mono text-[0.7rem] tracking-normal text-slate-500 dark:text-slate-500">
            {index}
          </span>
        )}
        {index && <span className="h-px w-6 bg-brand-500/40" aria-hidden="true" />}
        <span className="text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
          {eyebrow}
        </span>
      </span>
      <h2 className="section-title">{title}</h2>
      {/* Accent underline that draws itself in when the heading enters view */}
      <motion.span
        aria-hidden="true"
        className="mx-auto mt-4 block h-0.5 w-16 origin-center rounded-full bg-gradient-to-r from-brand-500 to-brand-300"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
      />
      {description && (
        <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
          {description}
        </p>
      )}
    </Reveal>
  );
}
