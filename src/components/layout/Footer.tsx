"use client";

import Link from "next/link";
import Image from "next/image";
import Logo2 from "@/app/assets/img/logo2.png";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const FOOTER_LINKS = {
  Services: [
    { label: "Business Websites", href: "/#services" },
    { label: "Management Systems", href: "/#services" },
    { label: "SaaS Platforms", href: "/#services" },
    { label: "Admin Dashboards", href: "/#services" },
    { label: "E-Commerce", href: "/#services" },
  ],
  Company: [
    { label: "About", href: "/#about" },
    { label: "Projects", href: "/#projects" },
    { label: "Process", href: "/#process" },
    { label: "Contact", href: "/#contact" },
  ],
};

const SOCIAL_LINKS = [
  { icon: Github, href: "https://github.com/zenodesoftware", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com/zenodesoftware", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/zenodesoftware", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hello@zenodesoftware.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-black/50">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-flex">
              <Image src={Logo2} alt="Zenode" className="h-9 w-auto" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Building premium web systems and digital experiences for ambitious businesses worldwide. Modern. Scalable. Exceptional.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-zenode-cyan hover:border-zenode-cyan/40 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Zenode Software. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Next.js 15 &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
