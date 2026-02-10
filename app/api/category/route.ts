import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) {
    return NextResponse.json(
      { error: "API base URL not configured" },
      { status: 500 },
    );
  }
  const c = await cookies();
  const token = c.get("auth_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const url = new URL(req.url);
  const name = url.searchParams.get("name") ?? "";
  const active = url.searchParams.get("active") ?? "";
  const sortName = url.searchParams.get("sortName") ?? "";
  const sortCreatedAt = url.searchParams.get("sortCreatedAt") ?? "";
  const page = url.searchParams.get("page") ?? "1";
  const pageSize = url.searchParams.get("pageSize") ?? "10";

  const qs = new URLSearchParams();
  if (name) qs.set("name", name);
  if (active) qs.set("active", active);
  if (sortName) qs.set("sortName", sortName);
  if (sortCreatedAt) qs.set("sortCreatedAt", sortCreatedAt);
  if (page) qs.set("page", page);
  if (pageSize) qs.set("pageSize", pageSize);

  const res = await fetch(`${base}/api/v1/category?${qs.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    return NextResponse.json(data ?? { error: "Failed to fetch categories" }, {
      status: res.status,
    });
  }
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) {
    return NextResponse.json(
      { error: "API base URL not configured" },
      { status: 500 },
    );
  }
  const c = await cookies();
  const token = c.get("auth_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const res = await fetch(`${base}/api/v1/category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    return NextResponse.json(data ?? { error: "Failed to create category" }, {
      status: res.status,
    });
  }
  return NextResponse.json(data);
}
