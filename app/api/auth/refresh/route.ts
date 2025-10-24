import { NextRequest, NextResponse } from "next/server";

// POST /api/auth/refresh
export async function POST(req: NextRequest) {
  const sid = req.cookies.get("sid")?.value;
  if (!sid) {
    return NextResponse.json({ ok: false, error: "No session" }, { status: 401 });
  }

  // TODO: verify + reissue token
  const newToken = sid; // placeholder: keep same token

  const res = NextResponse.json({ ok: true });
  res.cookies.set("sid", newToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24,
  });
  return res;
}

export async function GET() {
  // If your UI sometimes GETs refresh:
  return NextResponse.json({ ok: false, error: "Use POST" }, { status: 405 });
}
