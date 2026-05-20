"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zenode-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-50 disabled:pointer-events-none select-none";

    const variants = {
      primary:
        "bg-zenode-cyan text-black hover:bg-zenode-teal shadow-glow-sm hover:shadow-glow",
      outline:
        "border border-zenode-cyan/30 text-zenode-cyan hover:border-zenode-cyan/60 hover:bg-zenode-cyan/5 hover:shadow-glow-sm",
      ghost:
        "text-foreground hover:bg-white/5",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    };

    const sizes = {
      sm: "h-8 px-4 text-sm",
      md: "h-10 px-6 text-sm",
      lg: "h-12 px-8 text-base",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button };
