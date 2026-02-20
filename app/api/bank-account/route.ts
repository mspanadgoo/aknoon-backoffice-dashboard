import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL;
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
  const ownerName = url.searchParams.get("ownerName") ?? "";
  const cardNumber = url.searchParams.get("cardNumber") ?? "";
  const active = url.searchParams.get("active") ?? "";
  const sortOwnerName = url.searchParams.get("sortOwnerName") ?? "";
  const sortCreatedAt = url.searchParams.get("sortCreatedAt") ?? "";
  const page = url.searchParams.get("page") ?? "1";
  const pageSize = url.searchParams.get("pageSize") ?? "1000";

  const qs = new URLSearchParams();
  if (ownerName) qs.set("ownerName", ownerName);
  if (cardNumber) qs.set("cardNumber", cardNumber);
  if (active) qs.set("active", active);
  if (sortOwnerName) qs.set("sortOwnerName", sortOwnerName);
  if (sortCreatedAt) qs.set("sortCreatedAt", sortCreatedAt);
  qs.set("page", page);
  qs.set("pageSize", pageSize);

  let res: Response;
  try {
    res = await fetch(`${base}/api/v1/bank-account?${qs.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Upstream API unreachable", details: String(e) },
      { status: 502 },
    );
  }
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    return NextResponse.json(
      data ?? { error: "Failed to fetch bank accounts" },
      { status: res.status },
    );
  }
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL;
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
  let res: Response;
  try {
    res = await fetch(`${base}/api/v1/bank-account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Upstream API unreachable", details: String(e) },
      { status: 502 },
    );
  }
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    return NextResponse.json(
      data ?? { error: "Failed to create bank account" },
      { status: res.status },
    );
  }
  return NextResponse.json(data);
}
