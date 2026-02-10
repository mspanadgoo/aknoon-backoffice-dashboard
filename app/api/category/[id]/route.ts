import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(_: Request, context: unknown) {
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
  const ctx = context as { params: { id: string } | Promise<{ id: string }> };
  const p = ctx.params;
  const id =
    typeof (p as Promise<{ id: string }>).then === "function"
      ? (await (p as Promise<{ id: string }>)).id
      : (p as { id: string }).id;
  const res = await fetch(`${base}/api/v1/category/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    return NextResponse.json(data ?? { error: "Failed to fetch category" }, {
      status: res.status,
    });
  }
  return NextResponse.json(data);
}

export async function PATCH(req: Request, context: unknown) {
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
  const ctx = context as { params: { id: string } | Promise<{ id: string }> };
  const p = ctx.params;
  const id =
    typeof (p as Promise<{ id: string }>).then === "function"
      ? (await (p as Promise<{ id: string }>)).id
      : (p as { id: string }).id;
  const res = await fetch(`${base}/api/v1/category/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    return NextResponse.json(data ?? { error: "Failed to update category" }, {
      status: res.status,
    });
  }
  return NextResponse.json(data);
}

export async function DELETE(_: Request, context: unknown) {
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
  const ctx = context as { params: { id: string } | Promise<{ id: string }> };
  const p = ctx.params;
  const id =
    typeof (p as Promise<{ id: string }>).then === "function"
      ? (await (p as Promise<{ id: string }>)).id
      : (p as { id: string }).id;
  const res = await fetch(`${base}/api/v1/category/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const data = await res.json().catch(() => null);
    return NextResponse.json(data ?? { error: "Failed to delete category" }, {
      status: res.status,
    });
  }
  return NextResponse.json({ ok: true });
}
