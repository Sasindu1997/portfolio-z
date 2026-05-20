"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import LogoImg from "@/app/assets/img/logo2.png";

const NAV_LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/#projects", label: "Projects" },
  { href: "/#about", label: "About" },
  { href: "/#process", label: "Process" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      )}
    >
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src={LogoImg}
              alt="Zenode Software"
              height={36}
              priority
              className="h-9 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-lg hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 h-9 px-5 text-sm font-medium rounded-xl bg-zenode-cyan text-black hover:bg-zenode-teal transition-all duration-200 shadow-glow-sm hover:shadow-glow"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/[0.06] overflow-hidden"
          >
            <div className="container-custom py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-border">
                <Link
                  href="/#contact"
                  className="block px-4 py-3 text-sm font-medium text-center rounded-xl bg-zenode-cyan text-black"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
