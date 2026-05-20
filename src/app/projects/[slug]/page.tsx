import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github, Calendar } from "lucide-react";
import { db } from "@/lib/db";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { parseJsonArray, formatDate } from "@/lib/utils";
import { ProjectGallery } from "@/components/project/ProjectGallery";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const projects = await db.project.findMany({
      where: { published: true },
      select: { slug: true },
    });
    return projects.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await db.project.findUnique({ where: { slug } });
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.seoTitle || project.title,
    description: project.seoDesc || project.shortDesc,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await db.project.findUnique({ where: { slug } });

  if (!project || !project.published) notFound();

  // Increment views (fire-and-forget)
  db.project.update({ where: { slug }, data: { views: { increment: 1 } } }).catch(() => {});

  const technologies = parseJsonArray(project.technologies);
  const images = parseJsonArray(project.images);

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar />
      <main className="pt-20">
        {/* Hero Banner */}
        <section className="relative overflow-hidden">
          <div className="relative aspect-[21/7] max-h-[500px] bg-muted overflow-hidden">
            {project.thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.thumbnail}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-zenode-cyan/10 via-black to-black" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          </div>

          {/* Overlay content */}
          <div className="container-custom relative -mt-32 z-10 pb-8">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft size={15} />
              All Projects
            </Link>

            <div className="max-w-3xl space-y-4">
              <span className="inline-block px-3 py-1 text-xs rounded-full bg-zenode-cyan/10 border border-zenode-cyan/20 text-zenode-cyan">
                {project.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                {project.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.shortDesc}
              </p>
            </div>
          </div>
        </section>

        {/* Details */}
        <section className="container-custom py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Overview */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Project Overview</h2>
                <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
                  {project.fullDesc}
                </div>
              </div>

              {/* Gallery */}
              {images.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Gallery</h2>
                  <ProjectGallery images={images} title={project.title} />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project info card */}
              <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
                <h3 className="font-semibold text-sm">Project Details</h3>

                {project.client && (
                  <InfoRow label="Client" value={project.client} />
                )}
                {project.completedAt && (
                  <InfoRow
                    label="Completed"
                    value={formatDate(project.completedAt)}
                  />
                )}
                <InfoRow label="Category" value={project.category} />

                {/* Links */}
                <div className="space-y-2 pt-2 border-t border-border">
                  {project.projectUrl && (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-zenode-cyan hover:text-zenode-teal transition-colors"
                    >
                      <ExternalLink size={14} />
                      View Live Site
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github size={14} />
                      GitHub Repository
                    </a>
                  )}
                </div>
              </div>

              {/* Tech stack */}
              <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
                <h3 className="font-semibold text-sm">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-xs rounded-lg bg-zenode-cyan/5 border border-zenode-cyan/15 text-zenode-cyan/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="rounded-2xl border border-zenode-cyan/15 bg-zenode-cyan/5 p-6 space-y-4">
                <p className="text-sm text-muted-foreground">
                  Interested in a similar project?
                </p>
                <Link
                  href="/#contact"
                  className="block text-center h-10 leading-10 text-sm font-medium rounded-xl bg-zenode-cyan text-black hover:bg-zenode-teal transition-all duration-200"
                >
                  Start a Project
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right max-w-[60%]">{value}</span>
    </div>
  );
}
