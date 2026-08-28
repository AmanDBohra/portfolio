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
      <p className="flex items-center justify-center gap-2 eyebrow">
        {index && (
          <span className="font-mono text-[0.7rem] tracking-normal text-slate-500 dark:text-slate-500">
            {index}
          </span>
        )}
        {index && <span className="h-px w-6 bg-brand-500/40" aria-hidden="true" />}
        {eyebrow}
      </p>
      <h2 className="section-title">{title}</h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
          {description}
        </p>
      )}
    </Reveal>
  );
}
