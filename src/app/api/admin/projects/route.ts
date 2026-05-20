import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { projectSchema } from "@/lib/validations";

// GET — list all projects
export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const projects = await db.project.findMany({
    orderBy: [{ orderIndex: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json(projects);
}

// POST — create project
export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

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

    // Check slug uniqueness
    const existing = await db.project.findUnique({ where: { slug: rest.slug } });
    if (existing) {
      return NextResponse.json(
        { message: "A project with this slug already exists" },
        { status: 409 }
      );
    }

    const project = await db.project.create({
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

    return NextResponse.json(project, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Failed to create project" },
      { status: 500 }
    );
  }
}
