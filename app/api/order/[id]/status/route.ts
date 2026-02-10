import { NextResponse } from "next/server";
import { cookies } from "next/headers";

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
  if (!body || typeof body.status !== "string") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const ctx = context as { params: { id: string } | Promise<{ id: string }> };
  const p = ctx.params;
  const id =
    typeof (p as Promise<{ id: string }>).then === "function"
      ? (await (p as Promise<{ id: string }>)).id
      : (p as { id: string }).id;
  const res = await fetch(`${base}/api/v1/order/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status: body.status }),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    return NextResponse.json(
      data ?? { error: "Failed to update order status" },
      { status: res.status },
    );
  }
  return NextResponse.json(data);
}
