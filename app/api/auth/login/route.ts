import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const username = body?.username ?? "";
  const password = body?.password ?? "";

  // Very simple mock: accept any non-empty credentials
  const ok = username.trim().length > 0 && password.trim().length > 0;
  if (!ok) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  const token = "mock-token-" + Math.random().toString(36).slice(2);
  const res = NextResponse.json({
    user: {
      id: "u1",
      name: username,
      role: "admin",
    },
    token,
  });

  // Set cookie for proxy-based auth
  res.cookies.set("auth_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });

  return res;
}
