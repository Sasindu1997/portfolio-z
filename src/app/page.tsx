import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ScrollReveal3D } from "@/components/ui/ScrollReveal3D";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

async function getFeaturedProjects() {
  try {
    return await db.project.findMany({
      where: { published: true, featured: true },
      orderBy: { orderIndex: "asc" },
      take: 6,
    });
  } catch {
    return [];
  }
}

async function getTestimonials() {
  try {
    return await db.testimonial.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [projects, testimonials] = await Promise.all([
    getFeaturedProjects(),
    getTestimonials(),
  ]);

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      <Navbar />

      <main>
        <HeroSection />
        <ScrollReveal3D depth={10}><StatsSection /></ScrollReveal3D>
        <ScrollReveal3D depth={12}><ServicesSection /></ScrollReveal3D>
        <ScrollReveal3D depth={12}><ProjectsSection projects={projects} /></ScrollReveal3D>
        <ScrollReveal3D depth={10}><AboutSection /></ScrollReveal3D>
        <ScrollReveal3D depth={8}><TechStackSection /></ScrollReveal3D>
        <ScrollReveal3D depth={12}><ProcessSection /></ScrollReveal3D>
        <ScrollReveal3D depth={10}><TestimonialsSection testimonials={testimonials} /></ScrollReveal3D>
        <ScrollReveal3D depth={8}><ContactSection /></ScrollReveal3D>
      </main>

      <Footer />
    </div>
  );
}
