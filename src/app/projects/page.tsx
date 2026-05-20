import Link from "next/link";
import { db } from "@/lib/db";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { parseJsonArray } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore our portfolio of premium web systems, SaaS platforms, and digital experiences.",
};

export const dynamic = "force-dynamic";

async function getProjects() {
  try {
    return await db.project.findMany({
      where: { published: true },
      orderBy: [{ featured: "desc" }, { orderIndex: "asc" }],
    });
  } catch {
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar />
      <main className="pt-24 pb-32">
        <div className="container-custom">
          {/* Header */}
          <div className="space-y-4 mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zenode-cyan/20 bg-zenode-cyan/5 text-zenode-cyan text-xs font-medium tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-zenode-cyan animate-pulse" />
              Our Work
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Projects That{" "}
              <span className="gradient-text">Define Excellence</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              A collection of our best work — each project crafted with precision and built to perform.
            </p>
          </div>

          {/* Projects Grid */}
          {projects.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              Projects coming soon.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => {
                const technologies = parseJsonArray(project.technologies);
                return (
                  <Link
                    key={project.id}
                    href={`/projects/${project.slug}`}
                    className="group rounded-2xl overflow-hidden border border-border bg-card hover:border-zenode-cyan/25 hover:shadow-glow-sm transition-all duration-300"
                  >
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
                          <span className="text-3xl font-bold gradient-text">
                            {project.title[0]}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5 space-y-3">
                      <span className="inline-block px-2.5 py-1 text-xs rounded-md bg-zenode-cyan/10 border border-zenode-cyan/20 text-zenode-cyan">
                        {project.category}
                      </span>
                      <h2 className="font-semibold text-sm">{project.title}</h2>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.shortDesc}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {technologies.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 text-xs rounded-md bg-white/[0.04] border border-white/[0.06] text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-zenode-cyan group-hover:gap-2 transition-all">
                        View Case Study <ArrowUpRight size={12} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
