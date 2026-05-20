"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  LayoutDashboard,
  FolderOpen,
  PlusCircle,
  MessageSquare,
  Tags,
  LogOut,
  ChevronLeft,
  Menu,
} from "lucide-react";
import Image from "next/image";
import Logo2 from "@/app/assets/img/logo2.png";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/projects", icon: FolderOpen, label: "Projects" },
  { href: "/admin/projects/new", icon: PlusCircle, label: "Add Project" },
  { href: "/admin/messages", icon: MessageSquare, label: "Messages" },
  { href: "/admin/categories", icon: Tags, label: "Categories" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    toast.success("Logged out");
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-border bg-card transition-all duration-300 sticky top-0 h-screen",
        collapsed ? "w-[68px]" : "w-56"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-14 px-4 border-b border-border">
        {!collapsed && (
          <Link href="/admin/dashboard">
            <Image src={Logo2} alt="Zenode" className="h-7 w-auto" />
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground transition-colors"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <Menu size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {NAV.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150",
                active
                  ? "bg-zenode-cyan/10 text-zenode-cyan"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]",
                collapsed && "justify-center"
              )}
            >
              <Icon size={16} className="flex-shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border">
        <button
          onClick={handleLogout}
          title={collapsed ? "Logout" : undefined}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-red-400 hover:bg-red-400/5 transition-all duration-150",
            collapsed && "justify-center"
          )}
        >
          <LogOut size={16} className="flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
