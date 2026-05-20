"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: 50, suffix: "+", label: "Projects Completed" },
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 40, suffix: "+", label: "Happy Clients" },
  { value: 20, suffix: "+", label: "Technologies Used" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="section-padding border-y border-border bg-black/20" style={{ perspective: "800px" }}>
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40, rotateX: 20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.21,0.47,0.32,0.98] }}
              whileHover={{ scale: 1.06, rotateY: 4, z: 20 }}
              className="text-center space-y-2 cursor-default"
            >
              <div className="text-4xl md:text-5xl font-bold gradient-text">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
