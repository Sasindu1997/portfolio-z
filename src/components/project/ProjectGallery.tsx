"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const prev = () =>
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + images.length) % images.length : null
    );
  const next = () =>
    setLightboxIndex((i) =>
      i !== null ? (i + 1) % images.length : null
    );

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {images.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="relative overflow-hidden rounded-xl border border-border bg-muted cursor-pointer group"
            onClick={() => setLightboxIndex(i)}
          >
            <div className="aspect-video relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${title} — image ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <ZoomIn
                  size={24}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close */}
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-white hover:border-white/30 transition-colors"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close lightbox"
            >
              <X size={18} />
            </button>

            {/* Prev */}
            {images.length > 1 && (
              <button
                className="absolute left-4 w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-white hover:border-white/30 transition-colors z-10"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Previous image"
              >
                <ChevronLeft size={18} />
              </button>
            )}

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-5xl w-full max-h-[85vh] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[lightboxIndex]}
                alt={`${title} — image ${lightboxIndex + 1}`}
                className="w-full h-auto object-contain max-h-[85vh]"
              />
            </motion.div>

            {/* Next */}
            {images.length > 1 && (
              <button
                className="absolute right-4 w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-white hover:border-white/30 transition-colors z-10"
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Next image"
              >
                <ChevronRight size={18} />
              </button>
            )}

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/50">
              {lightboxIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
