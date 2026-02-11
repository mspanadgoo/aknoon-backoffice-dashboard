import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const base = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) {
    return NextResponse.json(
      { error: "API base URL not configured" },
      { status: 500 },
    );
  }
  const c = await cookies();
  const token = c.get("auth_token")?.value;
  if (!token) {
    return NextResponse.json({ valid: false }, { status: 401 });
  }
  let res: Response;
  try {
    res = await fetch(`${base}/api/v1/auth/validate-token`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (e) {
    return NextResponse.json(
      { valid: false, error: "Upstream API unreachable", details: String(e) },
      { status: 502 },
    );
  }
  if (!res.ok) {
    return NextResponse.json({ valid: false }, { status: 401 });
  }
  return NextResponse.json({ valid: true });
}
