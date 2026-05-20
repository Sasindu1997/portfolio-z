"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Send, Loader2, Mail, MessageSquare, Globe } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations";

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@zenodesoftware.com",
    href: "mailto:hello@zenodesoftware.com",
  },
  {
    icon: MessageSquare,
    label: "WhatsApp",
    value: "+1 (555) 000-0000",
    href: "https://wa.me/15550000000",
  },
  {
    icon: Globe,
    label: "Website",
    value: "zenodesoftware.com",
    href: "https://zenodesoftware.com",
  },
];

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success("Message sent! We'll be in touch soon.");
        reset();
      } else {
        throw new Error();
      }
    } catch {
      toast.error("Failed to send. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-black/20">
      <div className="container-custom">
        <SectionHeader
          badge="Get In Touch"
          title="Let's Build Something |Exceptional"
          subtitle="Have a project in mind? We'd love to hear about it. Let's discuss how we can help."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Whether you have a fully-scoped project or just an idea, we're
              happy to start a conversation. We typically respond within 24
              hours.
            </p>

            <div className="space-y-4">
              {CONTACT_INFO.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-zenode-cyan/25 hover:shadow-glow-sm transition-all duration-200 group"
                >
                  <div className="w-9 h-9 rounded-lg border border-zenode-cyan/20 bg-zenode-cyan/5 flex items-center justify-center group-hover:border-zenode-cyan/40 transition-colors">
                    <item.icon size={16} className="text-zenode-cyan" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="text-sm font-medium">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 space-y-4 p-6 rounded-2xl border border-border bg-card"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  Name *
                </label>
                <input
                  {...register("name")}
                  placeholder="John Smith"
                  className="w-full h-10 px-3 rounded-lg text-sm bg-background border border-border focus:border-zenode-cyan/40 focus:ring-1 focus:ring-zenode-cyan/20 outline-none transition-all placeholder:text-muted-foreground/50"
                />
                {errors.name && (
                  <p className="text-xs text-red-400">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  Email *
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="john@company.com"
                  className="w-full h-10 px-3 rounded-lg text-sm bg-background border border-border focus:border-zenode-cyan/40 focus:ring-1 focus:ring-zenode-cyan/20 outline-none transition-all placeholder:text-muted-foreground/50"
                />
                {errors.email && (
                  <p className="text-xs text-red-400">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Company
              </label>
              <input
                {...register("company")}
                placeholder="Your Company (optional)"
                className="w-full h-10 px-3 rounded-lg text-sm bg-background border border-border focus:border-zenode-cyan/40 focus:ring-1 focus:ring-zenode-cyan/20 outline-none transition-all placeholder:text-muted-foreground/50"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Message *
              </label>
              <textarea
                {...register("message")}
                rows={5}
                placeholder="Tell us about your project..."
                className="w-full px-3 py-2.5 rounded-lg text-sm bg-background border border-border focus:border-zenode-cyan/40 focus:ring-1 focus:ring-zenode-cyan/20 outline-none transition-all resize-none placeholder:text-muted-foreground/50"
              />
              {errors.message && (
                <p className="text-xs text-red-400">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 h-11 px-6 text-sm font-medium rounded-xl bg-zenode-cyan text-black hover:bg-zenode-teal disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-glow-sm hover:shadow-glow"
            >
              {isSubmitting ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
