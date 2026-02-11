import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const forwarded = req.headers.get("x-forwarded-proto") ?? "";
  const envSecure = (process.env.COOKIE_SECURE ?? "").toLowerCase() === "true";
  const isHttps = forwarded.includes("https");
  const secure = envSecure || isHttps;
  const res = NextResponse.json({ ok: true });
  res.cookies.set("auth_token", "", {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}

export async function GET(req: Request) {
  return POST(req);
}
