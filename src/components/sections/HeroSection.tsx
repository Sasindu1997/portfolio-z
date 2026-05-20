"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowRight, ChevronDown, Zap } from "lucide-react";

/* ── floating orb config ── */
const ORBS = [
  { x: "8%",  y: "18%", size: 420, delay: 0,   dur: 10, depth: 0.4 },
  { x: "70%", y: "10%", size: 320, delay: 1.2, dur: 13, depth: 0.6 },
  { x: "80%", y: "60%", size: 260, delay: 2,   dur: 11, depth: 0.8 },
  { x: "2%",  y: "65%", size: 220, delay: 1.6, dur: 9,  depth: 0.5 },
];

/* ── 3D floating particles ── */
const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: 5 + (i * 37 + 11) % 90,
  y: 5 + (i * 53 + 7)  % 85,
  size: 2 + (i % 4),
  depth: 0.3 + (i % 7) * 0.1,
  dur: 6 + (i % 4) * 2,
  delay: (i % 5) * 0.8,
}));

/* ── 3D mouse-tilt card ── */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 150, damping: 22 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 22 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
    const dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
    rotateY.set(dx * 10);
    rotateX.set(-dy * 7);
  }, [rotateX, rotateY]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  /* ── scroll depth layers (parallax) ── */
  const bgY      = useTransform(scrollYProgress, [0, 1], ["0%",  "8%"]);
  const orbsY    = useTransform(scrollYProgress, [0, 1], ["0%",  "22%"]);
  const textY    = useTransform(scrollYProgress, [0, 1], ["0%",  "38%"]);
  const mockupY  = useTransform(scrollYProgress, [0, 1], ["0%",  "60%"]);
  const fade     = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const scaleOut = useTransform(scrollYProgress, [0, 0.7],  [1, 0.93]);
  const tiltX    = useTransform(scrollYProgress, [0, 0.5],  [0, -5]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden pt-16"
      style={{ perspective: "1000px" }}
    >
      {/* ── Layer 0: grid (slowest) ── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 bg-grid pointer-events-none" />

      {/* ── Layer 1: orbs + particles ── */}
      <motion.div style={{ y: orbsY }} className="absolute inset-0 pointer-events-none">
        {ORBS.map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: orb.x, top: orb.y,
              width: orb.size, height: orb.size,
              background: "radial-gradient(circle, rgba(18,171,141,0.1) 0%, transparent 70%)",
              filter: "blur(60px)",
              x: (mouse.x - 0.5) * -40 * orb.depth,
              y: (mouse.y - 0.5) * -25 * orb.depth,
            } as React.CSSProperties}
            animate={{ scale: [1, 1.08, 1], opacity: [0.65, 1, 0.65] }}
            transition={{ duration: orb.dur, repeat: Infinity, ease: "easeInOut", delay: orb.delay }}
          />
        ))}

        {/* Particles */}
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-zenode-cyan/50"
            style={{
              left: `${p.x}%`, top: `${p.y}%`,
              width: p.size, height: p.size,
              boxShadow: `0 0 ${p.size * 4}px rgba(18,171,141,0.6)`,
              x: (mouse.x - 0.5) * -60 * p.depth,
              y: (mouse.y - 0.5) * -40 * p.depth,
            } as React.CSSProperties}
            animate={{ y: [0, -18 * p.depth, 0], opacity: [0.25, 0.85, 0.25] }}
            transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          />
        ))}
      </motion.div>

      {/* Center glow */}
      <div className="absolute inset-0 bg-zenode-glow pointer-events-none" />

      {/* ── Layer 2: text content ── */}
      <motion.div
        style={{ y: textY, opacity: fade, scale: scaleOut, rotateX: tiltX }}
        className="relative z-10 container-custom text-center space-y-8 py-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zenode-cyan/25 bg-zenode-cyan/5 text-zenode-cyan text-xs font-medium tracking-widest uppercase"
        >
          <Zap size={12} className="fill-zenode-cyan" />
          Premium Software Development
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
        >
          Building Premium{" "}
          <span className="gradient-text-animated">Web Systems</span>
          <br />
          &amp; Digital Experiences
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          We craft exceptional SaaS platforms, management systems, and scalable
          web applications that drive real business growth.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 h-12 px-8 text-sm font-medium rounded-xl bg-zenode-cyan text-black hover:bg-zenode-teal transition-all duration-200 shadow-glow hover:shadow-glow-lg"
          >
            View Our Work
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 h-12 px-8 text-sm font-medium rounded-xl border border-white/10 text-foreground hover:border-zenode-cyan/30 hover:bg-zenode-cyan/5 transition-all duration-200"
          >
            Start a Project
          </Link>
        </motion.div>
      </motion.div>

      {/* ── Layer 3: 3D tilt dashboard mockup ── */}
      <motion.div
        style={{ y: mockupY, opacity: fade }}
        className="relative z-10 w-full container-custom pb-20 -mt-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 80, rotateX: 18 }}
          animate={{ opacity: 1, y: 0,  rotateX: 0  }}
          transition={{ duration: 1.1, delay: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          style={{ perspective: 1400 }}
        >
          <TiltCard className="relative mx-auto max-w-4xl">
            {/* Shine overlay follows mouse */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none z-20 transition-all duration-75"
              style={{
                background: `radial-gradient(circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(18,171,141,0.08) 0%, transparent 55%)`
              }}
            />

            <div
              className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-glow-xl bg-card"
              style={{ transform: "translateZ(0px)" }}
            >
              {/* Browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-black/60 border-b border-white/[0.06]">
                <span className="w-3 h-3 rounded-full bg-red-500/60" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <span className="w-3 h-3 rounded-full bg-green-500/60" />
                <div className="flex-1 mx-4 h-6 rounded-md bg-white/5 flex items-center px-3">
                  <span className="text-xs text-muted-foreground">app.zenodesoftware.com</span>
                </div>
              </div>

              {/* Dashboard grid */}
              <div className="p-6 bg-gradient-to-br from-black via-zenode-cyan/5 to-black min-h-[280px] grid grid-cols-3 gap-4">
                {[
                  { label: "Revenue", value: "$124K", change: "+18%" },
                  { label: "Projects", value: "48",   change: "+6"   },
                  { label: "Clients",  value: "32",   change: "+4"   },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0  }}
                    transition={{ delay: 1 + i * 0.15 }}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 space-y-1"
                    style={{ transform: "translateZ(18px)" }}
                  >
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="text-xl font-bold">{stat.value}</p>
                    <p className="text-xs text-zenode-cyan">{stat.change}</p>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  className="col-span-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
                  style={{ transform: "translateZ(10px)" }}
                >
                  <p className="text-xs text-muted-foreground mb-3">Activity Overview</p>
                  <div className="flex items-end gap-2 h-16">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 1.5 + i * 0.05, duration: 0.4 }}
                        className="flex-1 rounded-sm"
                        style={{ background: `rgba(18,171,141,${0.3 + (h / 100) * 0.5})` }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Glow reflection */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-zenode-cyan/10 blur-2xl rounded-full" />
          </TiltCard>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
