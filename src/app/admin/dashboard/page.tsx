import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — Admin",
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const [totalProjects, publishedProjects, featuredProjects, totalMessages] =
    await Promise.all([
      db.project.count(),
      db.project.count({ where: { published: true } }),
      db.project.count({ where: { featured: true } }),
      db.contactMessage.count({ where: { read: false } }),
    ]);

  const recentProjects = await db.project.findMany({
    orderBy: { updatedAt: "desc" },
    take: 5,
  });

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <AdminDashboardClient
          stats={{
            totalProjects,
            publishedProjects,
            featuredProjects,
            unreadMessages: totalMessages,
          }}
          recentProjects={recentProjects}
          adminEmail={session.email}
        />
      </main>
    </div>
  );
}
