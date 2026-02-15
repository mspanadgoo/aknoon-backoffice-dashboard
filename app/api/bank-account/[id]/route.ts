import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(_: Request, context: unknown) {
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
  const ctx = context as { params: { id: string } | Promise<{ id: string }> };
  const p = ctx.params;
  const id =
    typeof (p as Promise<{ id: string }>).then === "function"
      ? (await (p as Promise<{ id: string }>)).id
      : (p as { id: string }).id;
  let res: Response;
  try {
    res = await fetch(`${base}/api/v1/bank-account/${id}`, {
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
      data ?? { error: "Failed to fetch bank account" },
      { status: res.status },
    );
  }
  return NextResponse.json(data);
}

export async function PATCH(req: Request, context: unknown) {
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
  const ctx = context as { params: { id: string } | Promise<{ id: string }> };
  const p = ctx.params;
  const id =
    typeof (p as Promise<{ id: string }>).then === "function"
      ? (await (p as Promise<{ id: string }>)).id
      : (p as { id: string }).id;
  let res: Response;
  try {
    res = await fetch(`${base}/api/v1/bank-account/${id}`, {
      method: "PATCH",
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
      data ?? { error: "Failed to update bank account" },
      { status: res.status },
    );
  }
  return NextResponse.json(data);
}

export async function DELETE(_: Request, context: unknown) {
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
  const ctx = context as { params: { id: string } | Promise<{ id: string }> };
  const p = ctx.params;
  const id =
    typeof (p as Promise<{ id: string }>).then === "function"
      ? (await (p as Promise<{ id: string }>)).id
      : (p as { id: string }).id;
  let res: Response;
  try {
    res = await fetch(`${base}/api/v1/bank-account/${id}`, {
      method: "DELETE",
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
      data ?? { error: "Failed to delete bank account" },
      { status: res.status },
    );
  }
  return NextResponse.json(data);
}
