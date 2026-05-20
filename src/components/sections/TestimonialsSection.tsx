"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Testimonial } from "@prisma/client";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

const FALLBACK_TESTIMONIALS = [
  {
    id: "1",
    name: "Marcus Chen",
    role: "CTO",
    company: "NexaFlow Inc.",
    content:
      "Zenode transformed our vision into an exceptional product. Their technical expertise and attention to detail exceeded every expectation. Delivered on time, on budget, with outstanding quality.",
    rating: 5,
  },
  {
    id: "2",
    name: "Sarah Mitchell",
    role: "Founder",
    company: "QuantumRetail",
    content:
      "Working with Zenode was a game-changer for our business. They built a world-class e-commerce platform that significantly increased our conversion rates and customer satisfaction.",
    rating: 5,
  },
  {
    id: "3",
    name: "David Okafor",
    role: "COO",
    company: "Meridian Corp",
    content:
      "The management system Zenode built has revolutionized our operations. Remarkable attention to UX and performance. Our teams now work 40% more efficiently.",
    rating: 5,
  },
];

export function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  const data =
    testimonials.length > 0
      ? testimonials
      : FALLBACK_TESTIMONIALS;
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + data.length) % data.length);
  const next = () => setCurrent((c) => (c + 1) % data.length);

  return (
    <section id="testimonials" className="section-padding">
      <div className="container-custom">
        <SectionHeader
          badge="Client Voices"
          title="What Our |Clients Say"
          subtitle="Don't take our word for it — hear from the teams we've worked with."
        />

        <div className="mt-16 max-w-3xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-10 text-center">
            {/* Glow */}
            <div className="absolute inset-0 bg-zenode-glow opacity-30 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="relative space-y-6"
              >
                {/* Stars */}
                <div className="flex justify-center gap-1">
                  {Array.from({ length: data[current].rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-zenode-cyan text-zenode-cyan"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg md:text-xl leading-relaxed text-foreground/90 italic">
                  &ldquo;{data[current].content}&rdquo;
                </blockquote>

                {/* Author */}
                <div>
                  <p className="font-semibold text-sm">{data[current].name}</p>
                  <p className="text-sm text-muted-foreground">
                    {data[current].role} · {data[current].company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-zenode-cyan/30 transition-all duration-200"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {data.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-200 ${
                    i === current
                      ? "w-6 h-2 bg-zenode-cyan"
                      : "w-2 h-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-zenode-cyan/30 transition-all duration-200"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
