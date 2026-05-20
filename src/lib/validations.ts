import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const projectSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(2, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  shortDesc: z.string().min(10, "Short description is required"),
  fullDesc: z.string().min(20, "Full description is required"),
  technologies: z.array(z.string()).min(1, "At least one technology is required"),
  category: z.string().min(1, "Category is required"),
  client: z.string().optional(),
  projectUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  orderIndex: z.number().int().default(0),
  thumbnail: z.string().optional(),
  images: z.array(z.string()).default([]),
  seoTitle: z.string().optional(),
  seoDesc: z.string().optional(),
  completedAt: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type LoginValues = z.infer<typeof loginSchema>;
export type ProjectFormValues = z.infer<typeof projectSchema>;
