"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { parseJsonArray } from "@/lib/utils";
import type { Project } from "@prisma/client";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="section-padding bg-black/30">
      <div className="container-custom">
        <SectionHeader
          badge="Featured Work"
          title="Projects That |Speak for Themselves"
          subtitle="A curated selection of our most impactful work. Each project represents our commitment to quality and innovation."
        />

        {projects.length === 0 ? (
          <div className="mt-16 text-center text-muted-foreground py-20">
            <p>Projects coming soon.</p>
          </div>
        ) : (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1200px" }}>
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 h-11 px-7 text-sm font-medium rounded-xl border border-zenode-cyan/25 text-zenode-cyan hover:border-zenode-cyan/50 hover:bg-zenode-cyan/5 transition-all duration-200"
          >
            View All Projects
            <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const technologies = parseJsonArray(project.technologies);

  return (
    <motion.div
      initial={{ opacity: 0, y: 48, rotateX: 16 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.65,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      whileHover={{ y: -8, rotateY: 2, z: 20, transition: { duration: 0.25 } }}
      style={{ transformStyle: "preserve-3d" }}
      className="group rounded-2xl overflow-hidden border border-border bg-card hover:border-zenode-cyan/25 hover:shadow-glow-sm transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        {project.thumbnail ? (
          <ProjectImage
            src={project.thumbnail}
            alt={project.title}
            fallback={project.title[0]}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-zenode-cyan/10 to-transparent flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl border border-zenode-cyan/20 bg-zenode-cyan/5 flex items-center justify-center">
              <span className="text-2xl font-bold gradient-text">
                {project.title[0]}
              </span>
            </div>
          </div>
        )}
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zenode-cyan text-black text-sm font-medium translate-y-3 group-hover:translate-y-0 transition-transform duration-300"
          >
            View Case Study
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Category badge */}
        <span className="inline-block px-2.5 py-1 text-xs rounded-md bg-zenode-cyan/10 border border-zenode-cyan/20 text-zenode-cyan">
          {project.category}
        </span>

        <h3 className="font-semibold text-sm leading-snug text-foreground line-clamp-1">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {project.shortDesc}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs rounded-md bg-white/[0.04] border border-white/[0.06] text-muted-foreground"
            >
              {tech}
            </span>
          ))}
          {technologies.length > 4 && (
            <span className="px-2 py-0.5 text-xs text-muted-foreground">
              +{technologies.length - 4}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <Link
            href={`/projects/${project.slug}`}
            className="text-xs text-zenode-cyan hover:text-zenode-teal transition-colors flex items-center gap-1"
          >
            Case Study <ArrowUpRight size={12} />
          </Link>
          {project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              Live Site <ExternalLink size={11} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
