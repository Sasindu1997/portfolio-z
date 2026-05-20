"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";
import {
  FolderOpen,
  Globe,
  Star,
  MessageSquare,
  PlusCircle,
  ArrowUpRight,
  Eye,
} from "lucide-react";
import type { Project } from "@prisma/client";

interface Props {
  stats: {
    totalProjects: number;
    publishedProjects: number;
    featuredProjects: number;
    unreadMessages: number;
  };
  recentProjects: Project[];
  adminEmail: string;
}

export function AdminDashboardClient({ stats, recentProjects, adminEmail }: Props) {
  const STAT_CARDS = [
    {
      icon: FolderOpen,
      label: "Total Projects",
      value: stats.totalProjects,
      color: "text-zenode-cyan",
      bg: "bg-zenode-cyan/10",
      border: "border-zenode-cyan/20",
    },
    {
      icon: Globe,
      label: "Published",
      value: stats.publishedProjects,
      color: "text-green-400",
      bg: "bg-green-400/10",
      border: "border-green-400/20",
    },
    {
      icon: Star,
      label: "Featured",
      value: stats.featuredProjects,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      border: "border-yellow-400/20",
    },
    {
      icon: MessageSquare,
      label: "Unread Messages",
      value: stats.unreadMessages,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      border: "border-purple-400/20",
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Welcome back, {adminEmail}
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 h-9 px-4 text-sm font-medium rounded-xl bg-zenode-cyan text-black hover:bg-zenode-teal transition-all duration-200"
        >
          <PlusCircle size={15} />
          New Project
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`p-5 rounded-2xl border ${card.border} bg-card space-y-3`}
          >
            <div className={`w-9 h-9 rounded-lg ${card.bg} flex items-center justify-center`}>
              <card.icon size={17} className={card.color} />
            </div>
            <div>
              <p className="text-2xl font-bold">{card.value}</p>
              <p className="text-xs text-muted-foreground">{card.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Projects */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="font-semibold text-sm">Recent Projects</h2>
          <Link
            href="/admin/projects"
            className="text-xs text-zenode-cyan hover:text-zenode-teal transition-colors flex items-center gap-1"
          >
            View all <ArrowUpRight size={11} />
          </Link>
        </div>
        <div className="divide-y divide-border">
          {recentProjects.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              No projects yet.{" "}
              <Link href="/admin/projects/new" className="text-zenode-cyan underline">
                Create one
              </Link>
            </div>
          ) : (
            recentProjects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between px-5 py-3 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{project.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {project.category} · Updated {formatDate(project.updatedAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <span
                    className={`px-2 py-0.5 text-xs rounded-md ${
                      project.published
                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                        : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                    }`}
                  >
                    {project.published ? "Published" : "Draft"}
                  </span>
                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Edit project"
                  >
                    <ArrowUpRight size={14} />
                  </Link>
                  {project.published && (
                    <Link
                      href={`/projects/${project.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Preview project"
                    >
                      <Eye size={14} />
                    </Link>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { href: "/admin/projects/new", label: "Add Project", icon: PlusCircle, desc: "Create a new case study" },
          { href: "/admin/projects", label: "Manage Projects", icon: FolderOpen, desc: "Edit, reorder, publish" },
          { href: "/admin/messages", label: "View Messages", icon: MessageSquare, desc: "Read contact submissions" },
        ].map(({ href, label, icon: Icon, desc }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-zenode-cyan/25 hover:shadow-glow-sm transition-all duration-200"
          >
            <div className="w-9 h-9 rounded-lg border border-zenode-cyan/20 bg-zenode-cyan/5 flex items-center justify-center">
              <Icon size={16} className="text-zenode-cyan" />
            </div>
            <div>
              <p className="text-sm font-medium">{label}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
