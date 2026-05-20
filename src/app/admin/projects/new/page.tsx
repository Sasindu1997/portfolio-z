import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ProjectForm } from "@/components/admin/ProjectForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "New Project — Admin" };

export default async function NewProjectPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <div className="max-w-4xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">New Project</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Add a new project to your portfolio
            </p>
          </div>
          <ProjectForm mode="create" />
        </div>
      </main>
    </div>
  );
}
