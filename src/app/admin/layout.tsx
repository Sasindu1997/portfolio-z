import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Zenode Software",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}
