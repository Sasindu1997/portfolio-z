"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { loginSchema, type LoginValues } from "@/lib/validations";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginValues) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Welcome back!");
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        const err = await res.json();
        toast.error(err.message || "Invalid credentials");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-6 rounded-2xl border border-border bg-card"
    >
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          placeholder="admin@zenode.com"
          autoComplete="email"
          className="w-full h-10 px-3 rounded-lg text-sm bg-background border border-border focus:border-zenode-cyan/40 focus:ring-1 focus:ring-zenode-cyan/20 outline-none transition-all"
        />
        {errors.email && (
          <p className="text-xs text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">
          Password
        </label>
        <div className="relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="current-password"
            className="w-full h-10 px-3 pr-10 rounded-lg text-sm bg-background border border-border focus:border-zenode-cyan/40 focus:ring-1 focus:ring-zenode-cyan/20 outline-none transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-red-400">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full h-10 rounded-xl text-sm font-medium bg-zenode-cyan text-black hover:bg-zenode-teal disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
      >
        {isLoading && <Loader2 size={15} className="animate-spin" />}
        {isLoading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
