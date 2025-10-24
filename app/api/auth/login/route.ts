import { NextRequest, NextResponse } from "next/server";

// POST /api/auth/login
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { username, password, type } = body;

    // TODO: replace with real auth lookup
    if (!username || !password) {
      return NextResponse.json(
        { ok: false, error: "Missing credentials" },
        { status: 400 }
      );
    }

    // Fake token (replace with signed JWT)
    const token = `tok_${Buffer.from(`${username}:${Date.now()}`).toString("base64")}`;

    // set httpOnly session cookie (secure in prod)
    const res = NextResponse.json({ ok: true });
    res.cookies.set("sid", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });
    return res;
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Unhandled error" },
      { status: 500 }
    );
  }
}

// Optional GET for quick health checks
export async function GET() {
  return NextResponse.json({ ok: true });
}
