"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Target, Lightbulb } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const HIGHLIGHTS = [
  "Founded with a mission to democratize premium software",
  "Remote-first team of senior engineers and designers",
  "Specializing in high-performance, scalable web systems",
  "Trusted by startups and enterprises worldwide",
  "Agile delivery with transparent communication",
  "Long-term partnerships, not one-off projects",
];

const VALUES = [
  {
    icon: Target,
    title: "Precision",
    description:
      "Every pixel and every line of code is intentional. We sweat the details others skip.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We stay ahead of the curve, using modern tooling and cutting-edge techniques.",
  },
  {
    icon: CheckCircle2,
    title: "Reliability",
    description:
      "On-time delivery, honest communication, and code that stands the test of time.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="section-padding">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div className="space-y-8">
            <SectionHeader
              badge="About Zenode"
              title="A Team Built for |Excellence"
              subtitle="We are a team of passionate engineers and designers who believe great software is an art form — combining technical mastery with aesthetic precision."
              align="left"
            />

            <div className="grid grid-cols-1 gap-3">
              {HIGHLIGHTS.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-zenode-cyan flex-shrink-0" />
                  {item}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — Value cards */}
          <div className="space-y-4">
            {VALUES.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + i * 0.12,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className="flex gap-4 p-5 rounded-2xl border border-border bg-card hover:border-zenode-cyan/25 hover:shadow-[0_0_20px_rgba(18,171,141,0.05)] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl border border-zenode-cyan/20 bg-zenode-cyan/5 flex items-center justify-center flex-shrink-0">
                  <val.icon size={18} className="text-zenode-cyan" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">{val.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Stats mini card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-5 rounded-2xl border border-zenode-cyan/15 bg-zenode-cyan/5 space-y-1"
            >
              <p className="text-zenode-cyan text-sm font-medium">
                Our Mission
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                To build software that doesn't just function — but inspires,
                scales, and gives our clients a lasting competitive edge in
                their industries.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
