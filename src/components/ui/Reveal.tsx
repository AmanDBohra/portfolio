import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** delay in seconds */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}

/**
 * Lightweight scroll-reveal wrapper. Respects reduced-motion via framer-motion
 * (which reads the OS preference and skips animation automatically).
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
