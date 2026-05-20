import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactFormSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid form data", errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, company, message } = parsed.data;

    await db.contactMessage.create({
      data: { name, email, company: company ?? null, message },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { message: "Failed to save message" },
      { status: 500 }
    );
  }
}
