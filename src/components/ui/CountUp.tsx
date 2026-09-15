import { useEffect, useRef, useState } from "react";

/**
 * Animates a numeric value from 0 → target when it scrolls into view.
 * Keeps any prefix/suffix (e.g. "94%", "9+", "36h → 2h"). Non-numeric strings
 * render unchanged. Respects prefers-reduced-motion (shows the final value).
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const match = /^(\D*)(\d[\d,]*(?:\.\d+)?)(.*)$/.exec(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(match ? `${match[1]}0${match[3]}` : value);

  useEffect(() => {
    if (!match) {
      setDisplay(value);
      return;
    }
    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr.replace(/,/g, ""));
    const decimals = (numStr.split(".")[1] || "").length;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(value);
      return;
    }

    let started = false;
    const el = ref.current;
    if (!el) {
      setDisplay(value);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            io.disconnect();
            const dur = 1100;
            const t0 = performance.now();
            const step = (t: number) => {
              const p = Math.min(1, (t - t0) / dur);
              const eased = 1 - Math.pow(1 - p, 3);
              const cur = target * eased;
              setDisplay(`${prefix}${cur.toFixed(decimals)}${suffix}`);
              if (p < 1) requestAnimationFrame(step);
              else setDisplay(value);
            };
            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
