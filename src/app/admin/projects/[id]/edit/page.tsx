import { redirect, notFound } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { parseJsonArray } from "@/lib/utils";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = { title: "Edit Project — Admin" };
export const dynamic = "force-dynamic";

export default async function EditProjectPage({ params }: Props) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const project = await db.project.findUnique({ where: { id } });
  if (!project) notFound();

  const initialData = {
    ...project,
    technologies: parseJsonArray(project.technologies),
    images: parseJsonArray(project.images),
    completedAt: project.completedAt
      ? project.completedAt.toISOString().split("T")[0]
      : "",
    client: project.client ?? "",
    projectUrl: project.projectUrl ?? "",
    githubUrl: project.githubUrl ?? "",
    seoTitle: project.seoTitle ?? "",
    seoDesc: project.seoDesc ?? "",
    thumbnail: project.thumbnail ?? "",
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <div className="max-w-4xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Edit Project</h1>
            <p className="text-sm text-muted-foreground mt-1">{project.title}</p>
          </div>
          <ProjectForm mode="edit" projectId={id} initialData={initialData} />
        </div>
      </main>
    </div>
  );
}
