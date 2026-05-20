"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  PlusCircle,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Star,
  StarOff,
  Search,
  ExternalLink,
} from "lucide-react";
import type { Project } from "@prisma/client";

interface Props {
  initialProjects: Project[];
}

export function AdminProjectsClient({ initialProjects }: Props) {
  const router = useRouter();
  const [projects, setProjects] = useState(initialProjects);
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        toast.success("Project deleted");
      } else {
        toast.error("Failed to delete project");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  const togglePublished = async (project: Project) => {
    const res = await fetch(`/api/admin/projects/${project.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !project.published }),
    });
    if (res.ok) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === project.id ? { ...p, published: !p.published } : p
        )
      );
      toast.success(project.published ? "Unpublished" : "Published");
    }
  };

  const toggleFeatured = async (project: Project) => {
    const res = await fetch(`/api/admin/projects/${project.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: !project.featured }),
    });
    if (res.ok) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === project.id ? { ...p, featured: !p.featured } : p
        )
      );
      toast.success(project.featured ? "Removed from featured" : "Added to featured");
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {projects.length} project{projects.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 h-9 px-4 text-sm font-medium rounded-xl bg-zenode-cyan text-black hover:bg-zenode-teal transition-all duration-200 w-fit"
        >
          <PlusCircle size={15} />
          New Project
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects..."
          className="w-full sm:max-w-xs h-9 pl-9 pr-3 rounded-lg text-sm bg-card border border-border focus:border-zenode-cyan/40 focus:ring-1 focus:ring-zenode-cyan/20 outline-none transition-all"
        />
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            {search ? "No projects match your search." : "No projects yet."}
            {!search && (
              <p className="mt-2">
                <Link href="/admin/projects/new" className="text-zenode-cyan underline">
                  Create your first project
                </Link>
              </p>
            )}
          </div>
        ) : (
          <div className="divide-y divide-border">
            {/* Header row */}
            <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-5 py-3 text-xs font-medium text-muted-foreground">
              <span className="w-12">Image</span>
              <span>Project</span>
              <span className="hidden sm:block">Status</span>
              <span className="hidden sm:block">Featured</span>
              <span>Actions</span>
            </div>

            <AnimatePresence>
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                  className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center px-5 py-3 hover:bg-white/[0.02] transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="w-12 h-9 rounded-lg overflow-hidden bg-muted relative flex-shrink-0">
                    {project.thumbnail ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-zenode-cyan/10 flex items-center justify-center text-xs font-bold text-zenode-cyan">
                        {project.title[0]}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{project.title}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {project.category} · /{project.slug}
                    </p>
                  </div>

                  {/* Published */}
                  <button
                    onClick={() => togglePublished(project)}
                    title={project.published ? "Unpublish" : "Publish"}
                    className={`hidden sm:flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg border transition-colors ${
                      project.published
                        ? "bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20"
                        : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20 hover:bg-yellow-500/20"
                    }`}
                  >
                    {project.published ? (
                      <Eye size={11} />
                    ) : (
                      <EyeOff size={11} />
                    )}
                    {project.published ? "Live" : "Draft"}
                  </button>

                  {/* Featured */}
                  <button
                    onClick={() => toggleFeatured(project)}
                    title={project.featured ? "Remove from featured" : "Feature"}
                    className={`hidden sm:flex items-center justify-center w-8 h-6 rounded transition-colors ${
                      project.featured
                        ? "text-yellow-400 hover:text-yellow-300"
                        : "text-border hover:text-yellow-400"
                    }`}
                  >
                    {project.featured ? <Star size={14} /> : <StarOff size={14} />}
                  </button>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <Link
                      href={`/admin/projects/${project.id}/edit`}
                      className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
                      title="Edit"
                    >
                      <Pencil size={14} />
                    </Link>
                    {project.published && (
                      <Link
                        href={`/projects/${project.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
                        title="Preview"
                      >
                        <ExternalLink size={14} />
                      </Link>
                    )}
                    <button
                      onClick={() => handleDelete(project.id, project.title)}
                      disabled={deletingId === project.id}
                      className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-colors disabled:opacity-50"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
