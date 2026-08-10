interface Props {
  /** image path in /public, or "" to render a generated placeholder */
  src: string;
  alt: string;
  label?: string;
  className?: string;
}

/**
 * Renders a responsive, lazy-loaded image when `src` is provided, otherwise a
 * tasteful gradient placeholder so the layout looks complete before you add art.
 */
export function Thumb({ src, alt, label, className = "" }: Props) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-500/15 via-brand-400/10 to-slate-200/40 dark:from-brand-500/20 dark:via-brand-600/10 dark:to-slate-800/40 ${className}`}
    >
      <span className="select-none px-4 text-center text-xs font-semibold uppercase tracking-widest text-brand-700/70 dark:text-brand-300/70">
        {label ?? "Add image"}
      </span>
    </div>
  );
}
