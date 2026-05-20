import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { projectSchema } from "@/lib/validations";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET single project
export async function GET(_req: Request, { params }: RouteParams) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const project = await db.project.findUnique({ where: { id } });
  if (!project) return NextResponse.json({ message: "Not found" }, { status: 404 });

  return NextResponse.json(project);
}

// PUT — full update
export async function PUT(request: Request, { params }: RouteParams) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  try {
    const body = await request.json();
    const parsed = projectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Validation failed", errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const {
      technologies,
      images,
      completedAt,
      projectUrl,
      githubUrl,
      client,
      seoTitle,
      seoDesc,
      thumbnail,
      ...rest
    } = parsed.data;

    // Check slug uniqueness (exclude current project)
    const existing = await db.project.findFirst({
      where: { slug: rest.slug, NOT: { id } },
    });
    if (existing) {
      return NextResponse.json(
        { message: "A project with this slug already exists" },
        { status: 409 }
      );
    }

    const project = await db.project.update({
      where: { id },
      data: {
        ...rest,
        technologies: JSON.stringify(technologies),
        images: JSON.stringify(images),
        completedAt: completedAt ? new Date(completedAt) : null,
        projectUrl: projectUrl || null,
        githubUrl: githubUrl || null,
        client: client || null,
        seoTitle: seoTitle || null,
        seoDesc: seoDesc || null,
        thumbnail: thumbnail || null,
      },
    });

    return NextResponse.json(project);
  } catch {
    return NextResponse.json(
      { message: "Failed to update project" },
      { status: 500 }
    );
  }
}

// PATCH — partial update (toggle published/featured)
export async function PATCH(request: Request, { params }: RouteParams) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  try {
    const body = await request.json();
    // Only allow safe fields to be patched
    const allowedFields: Record<string, unknown> = {};
    if (typeof body.published === "boolean") allowedFields.published = body.published;
    if (typeof body.featured === "boolean") allowedFields.featured = body.featured;
    if (typeof body.orderIndex === "number") allowedFields.orderIndex = body.orderIndex;

    const project = await db.project.update({
      where: { id },
      data: allowedFields,
    });

    return NextResponse.json(project);
  } catch {
    return NextResponse.json(
      { message: "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(_req: Request, { params }: RouteParams) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  try {
    await db.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { message: "Failed to delete project" },
      { status: 500 }
    );
  }
}
