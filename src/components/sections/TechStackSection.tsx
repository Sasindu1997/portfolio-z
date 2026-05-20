"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";

const TECH_STACK = [
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "TypeScript", icon: "𝗧𝗦" },
  { name: "Node.js", icon: "🟢" },
  { name: "Tailwind CSS", icon: "🎨" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "Prisma", icon: "◆" },
  { name: "Docker", icon: "🐳" },
  { name: "AWS", icon: "☁️" },
  { name: "Vercel", icon: "▲" },
  { name: "Redis", icon: "🔴" },
  { name: "GraphQL", icon: "◉" },
  { name: "Stripe", icon: "💳" },
  { name: "Figma", icon: "🎯" },
  { name: "WordPress", icon: "🔵" },
  { name: "Python", icon: "🐍" },
];

const ROW1 = TECH_STACK.slice(0, 8);
const ROW2 = TECH_STACK.slice(8, 16);

export function TechStackSection() {
  return (
    <section id="tech" className="section-padding overflow-hidden bg-black/20">
      <div className="container-custom">
        <SectionHeader
          badge="Our Stack"
          title="Technologies We |Master"
          subtitle="We work with the best modern technologies to deliver fast, scalable, and maintainable solutions."
        />

        <div className="mt-16 space-y-4">
          {/* Row 1 — scroll left */}
          <div className="relative overflow-hidden">
            <div className="flex gap-4 animate-marquee w-max">
              {[...ROW1, ...ROW1].map((tech, i) => (
                <TechCard key={`r1-${i}`} tech={tech} />
              ))}
            </div>
          </div>

          {/* Row 2 — scroll right */}
          <div className="relative overflow-hidden">
            <div
              className="flex gap-4 animate-marquee w-max"
              style={{ animationDirection: "reverse" }}
            >
              {[...ROW2, ...ROW2].map((tech, i) => (
                <TechCard key={`r2-${i}`} tech={tech} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TechCard({ tech }: { tech: { name: string; icon: string } }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-2.5 px-5 py-3 rounded-xl border border-border bg-card hover:border-zenode-cyan/25 hover:shadow-glow-sm transition-colors duration-200 cursor-default whitespace-nowrap"
    >
      <span className="text-lg">{tech.icon}</span>
      <span className="text-sm font-medium text-muted-foreground">
        {tech.name}
      </span>
    </motion.div>
  );
}
