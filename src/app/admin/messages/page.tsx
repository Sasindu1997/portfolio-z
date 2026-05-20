import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Messages — Admin" };
export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const messages = await db.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <div className="max-w-4xl space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Messages</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Contact form submissions
            </p>
          </div>

          {messages.length === 0 ? (
            <div className="p-12 text-center rounded-2xl border border-border bg-card text-muted-foreground">
              No messages yet.
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-5 rounded-2xl border bg-card space-y-2 ${
                    !msg.read
                      ? "border-zenode-cyan/20 bg-zenode-cyan/[0.02]"
                      : "border-border"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium text-sm">{msg.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {msg.email}
                        {msg.company && ` · ${msg.company}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {!msg.read && (
                        <span className="w-2 h-2 rounded-full bg-zenode-cyan" />
                      )}
                      <span className="text-xs text-muted-foreground">
                        {formatDate(msg.createdAt)}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {msg.message}
                  </p>
                  <div className="flex gap-3 pt-1">
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-xs text-zenode-cyan hover:text-zenode-teal transition-colors"
                    >
                      Reply
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
