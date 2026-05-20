import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("Admin@2025!", 12);
  await prisma.adminUser.upsert({
    where: { email: "admin@zenode.com" },
    update: {},
    create: {
      email: "admin@zenode.com",
      password: hashedPassword,
    },
  });

  // Create categories
  const categories = [
    { name: "Business Website", slug: "business-website" },
    { name: "Management System", slug: "management-system" },
    { name: "SaaS Platform", slug: "saas-platform" },
    { name: "Admin Dashboard", slug: "admin-dashboard" },
    { name: "E-Commerce", slug: "e-commerce" },
    { name: "API Integration", slug: "api-integration" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  // Create sample projects
  const projects = [
    {
      title: "NexaFlow SaaS Platform",
      slug: "nexaflow-saas-platform",
      shortDesc: "A modern workflow automation SaaS with real-time collaboration and analytics.",
      fullDesc: "NexaFlow is a comprehensive SaaS platform built for enterprise teams. It features real-time collaboration, advanced analytics dashboards, team management, and seamless third-party integrations. Built with performance and scalability at its core.",
      technologies: JSON.stringify(["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Redis", "AWS", "Stripe"]),
      category: "SaaS Platform",
      client: "NexaFlow Inc.",
      projectUrl: "https://nexaflow.app",
      featured: true,
      published: true,
      orderIndex: 1,
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80",
      ]),
      completedAt: new Date("2024-11-01"),
    },
    {
      title: "QuantumShop E-Commerce",
      slug: "quantumshop-ecommerce",
      shortDesc: "Full-featured e-commerce platform with AI-powered recommendations.",
      fullDesc: "QuantumShop is a cutting-edge e-commerce solution featuring AI-driven product recommendations, dynamic pricing, inventory management, and multi-vendor support. Designed to handle millions of transactions with sub-second response times.",
      technologies: JSON.stringify(["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe", "Algolia", "Vercel"]),
      category: "E-Commerce",
      client: "QuantumRetail Ltd.",
      projectUrl: "https://quantumshop.io",
      featured: true,
      published: true,
      orderIndex: 2,
      thumbnail: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80",
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
      ]),
      completedAt: new Date("2024-10-15"),
    },
    {
      title: "Meridian Management System",
      slug: "meridian-management-system",
      shortDesc: "Enterprise resource management system with real-time dashboards.",
      fullDesc: "Meridian is a comprehensive enterprise management system built for mid-to-large organizations. It includes HR management, project tracking, financial reporting, and custom workflow automation. The system integrates with existing enterprise tools seamlessly.",
      technologies: JSON.stringify(["React", "Node.js", "Express", "PostgreSQL", "Docker", "AWS"]),
      category: "Management System",
      client: "Meridian Corp",
      featured: true,
      published: true,
      orderIndex: 3,
      thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=80",
      ]),
      completedAt: new Date("2024-09-01"),
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }

  // Create testimonials
  const testimonials = [
    {
      name: "Marcus Chen",
      role: "CTO",
      company: "NexaFlow Inc.",
      content: "Zenode transformed our vision into an exceptional product. Their technical expertise and attention to detail exceeded every expectation. The team delivered on time with outstanding quality.",
      rating: 5,
      published: true,
    },
    {
      name: "Sarah Mitchell",
      role: "Founder",
      company: "QuantumRetail Ltd.",
      content: "Working with Zenode was a game-changer for our business. They built a world-class e-commerce platform that has significantly increased our conversion rates and customer satisfaction.",
      rating: 5,
      published: true,
    },
    {
      name: "David Okafor",
      role: "COO",
      company: "Meridian Corp",
      content: "The management system Zenode built has revolutionized our operations. The attention to UX and performance is remarkable. Our teams now work 40% more efficiently.",
      rating: 5,
      published: true,
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t }).catch(() => {});
  }

  console.log("Database seeded successfully!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
