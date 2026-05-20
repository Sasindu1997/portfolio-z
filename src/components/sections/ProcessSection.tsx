"use client";

import { motion } from "framer-motion";
import {
  Search,
  FileText,
  Palette,
  Code2,
  FlaskConical,
  Rocket,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const STEPS = [
  {
    icon: Search,
    step: "01",
    title: "Discovery",
    description:
      "We deep-dive into your business goals, target audience, and technical requirements to define a precise project scope.",
  },
  {
    icon: FileText,
    step: "02",
    title: "Planning",
    description:
      "Detailed technical architecture, project roadmap, milestones, and resource planning before a single line of code is written.",
  },
  {
    icon: Palette,
    step: "03",
    title: "Design",
    description:
      "Premium UI/UX design with interactive prototypes, design system, and component library aligned with your brand.",
  },
  {
    icon: Code2,
    step: "04",
    title: "Development",
    description:
      "Clean, scalable, type-safe code with iterative sprints, code reviews, and continuous progress updates.",
  },
  {
    icon: FlaskConical,
    step: "05",
    title: "Testing",
    description:
      "Comprehensive QA — unit tests, integration tests, performance profiling, and cross-device compatibility checks.",
  },
  {
    icon: Rocket,
    step: "06",
    title: "Deployment",
    description:
      "Zero-downtime deployment with monitoring, analytics setup, documentation, and ongoing support.",
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="section-padding bg-black/20">
      <div className="container-custom">
        <SectionHeader
          badge="How We Work"
          title="Our |Process"
          subtitle="A proven, structured approach that consistently delivers exceptional results on time and within budget."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1000px" }}>
          {STEPS.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 40, rotateX: 20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.65,
                delay: i * 0.1,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              whileHover={{ y: -5, rotateY: 4, z: 16, transition: { duration: 0.22 } }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative group p-6 rounded-2xl border border-border bg-card hover:border-zenode-cyan/25 transition-all duration-300"
            >
              {/* Step number */}
              <span className="text-5xl font-bold text-white/[0.04] absolute top-4 right-5 select-none">
                {step.step}
              </span>

              {/* Icon */}
              <div className="w-10 h-10 rounded-xl border border-zenode-cyan/20 bg-zenode-cyan/5 flex items-center justify-center mb-4 group-hover:border-zenode-cyan/40 group-hover:bg-zenode-cyan/10 transition-all duration-300">
                <step.icon size={18} className="text-zenode-cyan" />
              </div>

              <h3 className="font-semibold text-sm mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>

              {/* Connector line (hide on last items in row) */}
              {i < STEPS.length - 1 && (i + 1) % 3 !== 0 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-border to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
