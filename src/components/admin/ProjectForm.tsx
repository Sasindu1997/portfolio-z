"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Plus, X, Eye, AlertCircle } from "lucide-react";
import { projectSchema, type ProjectFormValues } from "@/lib/validations";
import { slugify } from "@/lib/utils";

interface ProjectFormProps {
  mode: "create" | "edit";
  projectId?: string;
  initialData?: Partial<ProjectFormValues & { id: string }>;
}

const CATEGORIES = [
  "Business Website",
  "Management System",
  "SaaS Platform",
  "Admin Dashboard",
  "E-Commerce",
  "API Integration",
];

export function ProjectForm({ mode, projectId, initialData }: ProjectFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [techInput, setTechInput] = useState("");
  const [thumbPreviewError, setThumbPreviewError] = useState(false);

  /** Convert imgbb share page URLs to direct image URLs automatically */
  const normalizeImageUrl = (url: string): string => {
    // https://ibb.co/ABC123 → https://i.ibb.co/ABC123 won't work directly;
    // the actual embed URL pattern is https://i.ibb.co/{id}/{filename}
    // We can't resolve it server-side, so just warn the user.
    return url.trim();
  };

  const isNonImageUrl = (url: string) => {
    if (!url) return false;
    try {
      const u = new URL(url);
      // Flag known share-page hosts
      if (u.hostname === "ibb.co" || u.hostname === "imgur.com") return true;
      // Flag URLs with no image extension and no query params that hint at images
      const ext = u.pathname.split(".").pop()?.toLowerCase() ?? "";
      const imageExts = ["jpg","jpeg","png","webp","gif","svg","avif"];
      if (!imageExts.includes(ext) && !url.includes("images.") && !url.includes("/image") && !url.includes("img") && !url.includes("photo")) return true;
    } catch { return false; }
    return false;
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      slug: "",
      shortDesc: "",
      fullDesc: "",
      technologies: [],
      category: "",
      client: "",
      projectUrl: "",
      githubUrl: "",
      featured: false,
      published: false,
      orderIndex: 0,
      thumbnail: "",
      images: [],
      seoTitle: "",
      seoDesc: "",
      completedAt: "",
      ...initialData,
    },
  });

  const title = watch("title");
  const technologies = watch("technologies");
  const images = watch("images");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("title", e.target.value);
    if (mode === "create") {
      setValue("slug", slugify(e.target.value));
    }
  };

  const addTech = () => {
    if (!techInput.trim()) return;
    const current = getValues("technologies");
    if (!current.includes(techInput.trim())) {
      setValue("technologies", [...current, techInput.trim()]);
    }
    setTechInput("");
  };

  const removeTech = (tech: string) => {
    setValue("technologies", getValues("technologies").filter((t) => t !== tech));
  };

  const addImage = (url: string) => {
    if (!url.trim()) return;
    const current = getValues("images") || [];
    setValue("images", [...current, url.trim()]);
  };

  const removeImage = (idx: number) => {
    const current = getValues("images") || [];
    setValue("images", current.filter((_, i) => i !== idx));
  };

  const onSubmit = async (data: ProjectFormValues) => {
    setIsSubmitting(true);
    try {
      const url =
        mode === "create"
          ? "/api/admin/projects"
          : `/api/admin/projects/${projectId}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success(
          mode === "create"
            ? "Project created successfully!"
            : "Project updated successfully!"
        );
        router.push("/admin/projects");
        router.refresh();
      } else {
        const err = await res.json();
        toast.error(err.message || "Failed to save project");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Basic Info */}
      <FormSection title="Basic Information">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Title *" error={errors.title?.message}>
            <input
              value={watch("title")}
              onChange={handleTitleChange}
              placeholder="Project title"
              className={inputCls}
            />
          </FormField>
          <FormField label="Slug *" error={errors.slug?.message}>
            <input
              {...register("slug")}
              placeholder="project-slug"
              className={inputCls}
            />
          </FormField>
        </div>

        <FormField label="Short Description *" error={errors.shortDesc?.message}>
          <input
            {...register("shortDesc")}
            placeholder="Brief one-liner description"
            className={inputCls}
          />
        </FormField>

        <FormField label="Full Description *" error={errors.fullDesc?.message}>
          <textarea
            {...register("fullDesc")}
            rows={8}
            placeholder="Detailed project description..."
            className={`${inputCls} resize-y`}
          />
        </FormField>
      </FormSection>

      {/* Category & Details */}
      <FormSection title="Project Details">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Category *" error={errors.category?.message}>
            <select {...register("category")} className={inputCls}>
              <option value="">Select a category</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Client">
            <input
              {...register("client")}
              placeholder="Client name (optional)"
              className={inputCls}
            />
          </FormField>
          <FormField label="Project URL">
            <input
              {...register("projectUrl")}
              placeholder="https://..."
              className={inputCls}
            />
          </FormField>
          <FormField label="GitHub URL">
            <input
              {...register("githubUrl")}
              placeholder="https://github.com/..."
              className={inputCls}
            />
          </FormField>
          <FormField label="Completion Date">
            <input
              {...register("completedAt")}
              type="date"
              className={inputCls}
            />
          </FormField>
          <FormField label="Order Index">
            <input
              {...register("orderIndex", { valueAsNumber: true })}
              type="number"
              min={0}
              className={inputCls}
            />
          </FormField>
        </div>
      </FormSection>

      {/* Technologies */}
      <FormSection title="Technologies">
        <div className="flex gap-2">
          <input
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTech(); } }}
            placeholder="Add technology (e.g., React)"
            className={`${inputCls} flex-1`}
          />
          <button
            type="button"
            onClick={addTech}
            className="h-10 px-4 text-sm rounded-lg border border-border hover:border-zenode-cyan/30 hover:bg-zenode-cyan/5 text-muted-foreground hover:text-zenode-cyan transition-all"
          >
            <Plus size={16} />
          </button>
        </div>
        {errors.technologies && (
          <p className="text-xs text-red-400">{errors.technologies.message}</p>
        )}
        <div className="flex flex-wrap gap-2">
          {technologies?.map((tech) => (
            <span
              key={tech}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-zenode-cyan/10 border border-zenode-cyan/20 text-zenode-cyan"
            >
              {tech}
              <button
                type="button"
                onClick={() => removeTech(tech)}
                className="hover:text-red-400 transition-colors"
              >
                <X size={11} />
              </button>
            </span>
          ))}
        </div>
      </FormSection>

      {/* Images */}
      <FormSection title="Images">
        <FormField label="Thumbnail URL">
          <input
            {...register("thumbnail")}
            placeholder="https://i.ibb.co/xxx/image.jpg  or  https://images.unsplash.com/..."
            className={inputCls}
            onChange={(e) => {
              const val = normalizeImageUrl(e.target.value);
              setValue("thumbnail", val);
              setThumbPreviewError(false);
            }}
          />
          {/* Warning for share-page URLs */}
          {isNonImageUrl(watch("thumbnail") ?? "") && (
            <div className="flex items-start gap-2 mt-2 p-2.5 rounded-lg border border-yellow-500/30 bg-yellow-500/5 text-yellow-400 text-xs">
              <AlertCircle size={13} className="mt-0.5 shrink-0" />
              <span>
                This looks like a <strong>share page URL</strong>, not a direct image.
                On <strong>imgbb</strong>: open your image → right-click the image → &quot;Copy image address&quot; to get a direct URL like <code className="font-mono bg-black/30 px-1 rounded">https://i.ibb.co/xxx/name.jpg</code>
              </span>
            </div>
          )}
          {/* Live thumbnail preview */}
          {watch("thumbnail") && !isNonImageUrl(watch("thumbnail") ?? "") && (
            <div className="mt-3">
              {!thumbPreviewError ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={watch("thumbnail")}
                  alt="Thumbnail preview"
                  onError={() => setThumbPreviewError(true)}
                  className="w-full max-h-40 object-cover rounded-lg border border-border"
                />
              ) : (
                <div className="flex items-center gap-2 p-2.5 rounded-lg border border-red-500/30 bg-red-500/5 text-red-400 text-xs">
                  <AlertCircle size={13} className="shrink-0" />
                  <span>Image failed to load — double-check the URL is a direct image link.</span>
                </div>
              )}
            </div>
          )}
        </FormField>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">
            Gallery Images
          </label>
          <div className="flex gap-2">
            <input
              id="imageUrlInput"
              placeholder="https://example.com/image.jpg"
              className={`${inputCls} flex-1`}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addImage((e.target as HTMLInputElement).value);
                  (e.target as HTMLInputElement).value = "";
                }
              }}
            />
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("imageUrlInput") as HTMLInputElement;
                addImage(el.value);
                el.value = "";
              }}
              className="h-10 px-4 text-sm rounded-lg border border-border hover:border-zenode-cyan/30 hover:bg-zenode-cyan/5 text-muted-foreground hover:text-zenode-cyan transition-all"
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="space-y-2">
            {images?.map((img, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card text-sm"
              >
                <span className="flex-1 truncate text-muted-foreground">{img}</span>
                <a href={img} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
                  <Eye size={13} />
                </a>
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="text-muted-foreground hover:text-red-400 transition-colors"
                >
                  <X size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </FormSection>

      {/* SEO */}
      <FormSection title="SEO">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="SEO Title">
            <input {...register("seoTitle")} placeholder="Optional SEO title" className={inputCls} />
          </FormField>
          <FormField label="SEO Description">
            <input {...register("seoDesc")} placeholder="Optional meta description" className={inputCls} />
          </FormField>
        </div>
      </FormSection>

      {/* Status toggles */}
      <FormSection title="Status">
        <div className="flex flex-col sm:flex-row gap-4">
          <Controller
            control={control}
            name="published"
            render={({ field }) => (
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => field.onChange(!field.value)}
                  className={`w-10 h-5 rounded-full transition-colors relative ${field.value ? "bg-green-500" : "bg-border"}`}
                >
                  <span
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${field.value ? "translate-x-5" : "translate-x-0.5"}`}
                  />
                </div>
                <span className="text-sm">Published</span>
              </label>
            )}
          />
          <Controller
            control={control}
            name="featured"
            render={({ field }) => (
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => field.onChange(!field.value)}
                  className={`w-10 h-5 rounded-full transition-colors relative ${field.value ? "bg-zenode-cyan" : "bg-border"}`}
                >
                  <span
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${field.value ? "translate-x-5" : "translate-x-0.5"}`}
                  />
                </div>
                <span className="text-sm">Featured</span>
              </label>
            )}
          />
        </div>
      </FormSection>

      {/* Submit */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 h-10 px-6 text-sm font-medium rounded-xl bg-zenode-cyan text-black hover:bg-zenode-teal disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isSubmitting && <Loader2 size={15} className="animate-spin" />}
          {isSubmitting
            ? "Saving..."
            : mode === "create"
            ? "Create Project"
            : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="h-10 px-6 text-sm rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-border/80 transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

const inputCls =
  "w-full h-10 px-3 rounded-lg text-sm bg-background border border-border focus:border-zenode-cyan/40 focus:ring-1 focus:ring-zenode-cyan/20 outline-none transition-all placeholder:text-muted-foreground/50";

function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4 p-6 rounded-2xl border border-border bg-card">
      <h3 className="font-semibold text-sm text-foreground border-b border-border pb-3">
        {title}
      </h3>
      {children}
    </div>
  );
}

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
