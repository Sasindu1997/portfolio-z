"use client";

import { useState } from "react";

interface ProjectImageProps {
  src: string;
  alt: string;
  fallback: string;
  className?: string;
}

/** Renders an external project image with a letter fallback on error. */
export function ProjectImage({ src, alt, fallback, className }: ProjectImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-zenode-cyan/10 to-transparent flex items-center justify-center">
        <span className="text-3xl font-bold gradient-text">{fallback}</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className={className}
    />
  );
}
