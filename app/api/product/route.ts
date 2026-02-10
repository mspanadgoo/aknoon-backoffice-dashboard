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
  const categoryId = url.searchParams.get("categoryId") ?? "";
  const minPrice = url.searchParams.get("minPrice") ?? "";
  const maxPrice = url.searchParams.get("maxPrice") ?? "";
  const active = url.searchParams.get("active") ?? "";
  const sortName = url.searchParams.get("sortName") ?? "";
  const sortPrice = url.searchParams.get("sortPrice") ?? "";
  const sortCreatedAt = url.searchParams.get("sortCreatedAt") ?? "";
  const sortUpdatedAt = url.searchParams.get("sortUpdatedAt") ?? "";
  const page = url.searchParams.get("page") ?? "1";
  const pageSize = url.searchParams.get("pageSize") ?? "10";

  const qs = new URLSearchParams();
  if (name) qs.set("name", name);
  if (categoryId) qs.set("categoryId", categoryId);
  if (minPrice) qs.set("minPrice", minPrice);
  if (maxPrice) qs.set("maxPrice", maxPrice);
  if (active) qs.set("active", active);
  if (sortName) qs.set("sortName", sortName);
  if (sortPrice) qs.set("sortPrice", sortPrice);
  if (sortCreatedAt) qs.set("sortCreatedAt", sortCreatedAt);
  if (sortUpdatedAt) qs.set("sortUpdatedAt", sortUpdatedAt);
  if (page) qs.set("page", page);
  if (pageSize) qs.set("pageSize", pageSize);

  const res = await fetch(`${base}/api/v1/product?${qs.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    return NextResponse.json(data ?? { error: "Failed to fetch products" }, {
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
  const res = await fetch(`${base}/api/v1/product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    return NextResponse.json(data ?? { error: "Failed to create product" }, {
      status: res.status,
    });
  }
  return NextResponse.json(data);
}
