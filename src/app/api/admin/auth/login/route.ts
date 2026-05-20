import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { loginSchema } from "@/lib/validations";
import { createToken, setAdminCookie } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    const admin = await db.adminUser.findUnique({ where: { email } });
    if (!admin) {
      // Prevent timing attacks by still running bcrypt comparison
      await bcrypt.compare(password, "$2b$12$invalid.hash.for.timing.attack.prevention");
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = await createToken({ id: admin.id, email: admin.email });
    await setAdminCookie(token);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { message: "Authentication failed" },
      { status: 500 }
    );
  }
}
