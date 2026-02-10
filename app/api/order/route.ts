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
  const telegramUsername = url.searchParams.get("telegramUsername") ?? "";
  const telegramUserId = url.searchParams.get("telegramUserId") ?? "";
  const minTotalPrice = url.searchParams.get("minTotalPrice") ?? "";
  const maxTotalPrice = url.searchParams.get("maxTotalPrice") ?? "";
  const status = url.searchParams.get("status") ?? "";
  const productName = url.searchParams.get("productName") ?? "";
  const sortTotalPrice = url.searchParams.get("sortTotalPrice") ?? "";
  const sortCreatedAt = url.searchParams.get("sortCreatedAt") ?? "";
  const sortStatus = url.searchParams.get("sortStatus") ?? "";
  const page = url.searchParams.get("page") ?? "1";
  const pageSize = url.searchParams.get("pageSize") ?? "10";

  const qs = new URLSearchParams();
  if (telegramUsername) qs.set("telegramUsername", telegramUsername);
  if (telegramUserId) qs.set("telegramUserId", telegramUserId);
  if (minTotalPrice) qs.set("minTotalPrice", minTotalPrice);
  if (maxTotalPrice) qs.set("maxTotalPrice", maxTotalPrice);
  if (status) qs.set("status", status);
  if (productName) qs.set("productName", productName);
  if (sortTotalPrice) qs.set("sortTotalPrice", sortTotalPrice);
  if (sortCreatedAt) qs.set("sortCreatedAt", sortCreatedAt);
  if (sortStatus) qs.set("sortStatus", sortStatus);
  if (page) qs.set("page", page);
  if (pageSize) qs.set("pageSize", pageSize);

  const res = await fetch(`${base}/api/v1/order?${qs.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    return NextResponse.json(
      data ?? { error: "Failed to fetch orders" },
      { status: res.status },
    );
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
  const res = await fetch(`${base}/api/v1/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    return NextResponse.json(
      data ?? { error: "Failed to create order" },
      { status: res.status },
    );
  }
  return NextResponse.json(data);
}
