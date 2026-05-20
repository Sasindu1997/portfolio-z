import { redirect } from "next/navigation";
import Link from "next/link";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminProjectsClient } from "@/components/admin/AdminProjectsClient";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Projects — Admin" };
export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const projects = await db.project.findMany({
    orderBy: [{ orderIndex: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <AdminProjectsClient initialProjects={projects} />
      </main>
    </div>
  );
}
