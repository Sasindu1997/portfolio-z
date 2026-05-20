import { redirect } from "next/navigation";
import Image from "next/image";
import Logo2 from "@/app/assets/img/logo2.png";
import { getAdminSession } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login — Zenode",
};

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) redirect("/admin/dashboard");

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 bg-grid">
      {/* Glow */}
      <div className="absolute inset-0 bg-zenode-glow opacity-40 pointer-events-none" />

      <div className="relative w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Image src={Logo2} alt="Zenode" className="h-12 w-auto" />
          </div>
          <h1 className="text-xl font-bold">Admin Login</h1>
          <p className="text-sm text-muted-foreground">Zenode Software CMS</p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
