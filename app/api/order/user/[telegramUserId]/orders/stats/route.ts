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
  const ctx = context as {
    params: { telegramUserId: string } | Promise<{ telegramUserId: string }>;
  };
  const p = ctx.params;
  const telegramUserId =
    typeof (p as Promise<{ telegramUserId: string }>).then === "function"
      ? (await (p as Promise<{ telegramUserId: string }>)).telegramUserId
      : (p as { telegramUserId: string }).telegramUserId;
  const res = await fetch(
    `${base}/api/v1/order/${telegramUserId}/orders/stats`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    return NextResponse.json(
      data ?? { error: "Failed to fetch user order stats" },
      { status: res.status },
    );
  }
  return NextResponse.json(data);
}
