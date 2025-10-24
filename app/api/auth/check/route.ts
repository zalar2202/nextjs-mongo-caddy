import { NextRequest, NextResponse } from "next/server";

// GET /api/auth/check
export async function GET(req: NextRequest) {
  const sid = req.cookies.get("sid")?.value;
  if (!sid) {
    return NextResponse.json({ ok: false, authenticated: false }, { status: 401 });
  }
  // TODO: verify JWT / session against DB if you have one
  return NextResponse.json({ ok: true, authenticated: true });
}
