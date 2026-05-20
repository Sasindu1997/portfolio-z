"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  className,
  align = "center",
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        "space-y-4",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {badge && (
        <div
          className={cn(
            "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase",
            "border border-zenode-cyan/20 bg-zenode-cyan/5 text-zenode-cyan",
            align === "center" ? "mx-auto" : ""
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-zenode-cyan animate-pulse" />
          {badge}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
        {title.includes("|") ? (
          <>
            {title.split("|")[0]}
            <span className="gradient-text">{title.split("|")[1]}</span>
            {title.split("|")[2] || ""}
          </>
        ) : (
          title
        )}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
          {align === "center" && <span className="block mx-auto">{subtitle}</span>}
          {align === "left" && subtitle}
        </p>
      )}
    </motion.div>
  );
}
