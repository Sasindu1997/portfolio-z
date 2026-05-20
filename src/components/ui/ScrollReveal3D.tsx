"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollReveal3DProps {
  children: React.ReactNode;
  className?: string;
  /** How deep the 3D entrance is — higher = more dramatic (default 14) */
  depth?: number;
}

/**
 * Wraps a section so it fades + rises with a 3D rotateX effect as it
 * enters the viewport, and subtly shifts as the page scrolls past.
 */
export function ScrollReveal3D({ children, className, depth = 14 }: ScrollReveal3DProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "start 30%"],
  });

  const opacity  = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const rotateX  = useTransform(scrollYProgress, [0, 0.7], [depth, 0]);
  const y        = useTransform(scrollYProgress, [0, 0.7], [40, 0]);

  return (
    <div ref={ref} style={{ perspective: "1200px" }} className={className}>
      <motion.div style={{ opacity, rotateX, y }}>
        {children}
      </motion.div>
    </div>
  );
}
