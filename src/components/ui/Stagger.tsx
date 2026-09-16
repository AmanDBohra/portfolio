import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Container that reveals its children one after another when scrolled into view.
 * Pair <Stagger> with <StaggerItem>. Respects reduced-motion via framer-motion.
 */
export function Stagger({
  children,
  className,
  gap = 0.05,
  as = "ul",
}: {
  children: ReactNode;
  className?: string;
  /** delay between each child, in seconds */
  gap?: number;
  as?: "ul" | "div";
}) {
  const MotionTag = as === "ul" ? motion.ul : motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap } },
      }}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "li",
}: {
  children: ReactNode;
  className?: string;
  as?: "li" | "div";
}) {
  const MotionTag = as === "li" ? motion.li : motion.div;
  return (
    <MotionTag
      className={className}
      variants={{
        hidden: { opacity: 0, y: 10, scale: 0.96 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
      }}
    >
      {children}
    </MotionTag>
  );
}
