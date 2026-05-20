"use client";

import { motion } from "framer-motion";
import {
  Globe,
  LayoutDashboard,
  Cloud,
  ShoppingCart,
  Plug,
  Settings,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const SERVICES = [
  {
    icon: Globe,
    title: "Business Websites",
    description:
      "High-performance, conversion-optimized business websites built with cutting-edge technology and premium design.",
    tags: ["Next.js", "SEO", "Analytics"],
  },
  {
    icon: Settings,
    title: "Management Systems",
    description:
      "Custom enterprise management systems streamlining operations, workflows, and resource management at scale.",
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    icon: Cloud,
    title: "SaaS Platforms",
    description:
      "Scalable, multi-tenant SaaS platforms with subscription billing, analytics, and enterprise integrations.",
    tags: ["SaaS", "Stripe", "AWS"],
  },
  {
    icon: LayoutDashboard,
    title: "Admin Dashboards",
    description:
      "Powerful, real-time admin interfaces with data visualization and intuitive management capabilities.",
    tags: ["Charts", "Real-time", "Auth"],
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    description:
      "Full-featured e-commerce platforms with inventory, payments, and AI-powered recommendations.",
    tags: ["Commerce", "Payments", "AI"],
  },
  {
    icon: Plug,
    title: "API Integrations",
    description:
      "Seamless third-party API integrations, custom backends, and microservices architecture.",
    tags: ["REST", "GraphQL", "Webhooks"],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="section-padding">
      <div className="container-custom">
        <SectionHeader
          badge="What We Build"
          title="Services That |Deliver Results"
          subtitle="From concept to deployment, we build digital products that scale and perform flawlessly."
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1000px" }}>
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 48, rotateX: 18 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.65,
                delay: i * 0.09,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              whileHover={{ y: -6, rotateY: 3, z: 24, transition: { duration: 0.25 } }}
              className="group relative rounded-2xl p-6 border border-border bg-card hover:border-zenode-cyan/30 hover:shadow-glow-sm transition-all duration-300 cursor-default overflow-hidden"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-px rounded-2xl bg-gradient-to-br from-zenode-cyan/5 to-transparent" />
              </div>

              {/* Icon */}
              <div className="relative w-11 h-11 rounded-xl bg-zenode-cyan/10 border border-zenode-cyan/20 flex items-center justify-center mb-5 group-hover:border-zenode-cyan/40 group-hover:bg-zenode-cyan/15 transition-all duration-300">
                <service.icon size={20} className="text-zenode-cyan" />
              </div>

              {/* Content */}
              <h3 className="font-semibold text-base mb-2 text-foreground">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {service.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs rounded-md bg-white/[0.04] border border-white/[0.06] text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
