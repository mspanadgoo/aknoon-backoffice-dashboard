import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const base = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) {
    return NextResponse.json(
      { error: "API base URL not configured" },
      { status: 500 },
    );
  }

  const body = await req.json().catch(() => null);
  if (!body?.username || !body?.password) {
    return NextResponse.json(
      { error: "username and password required" },
      { status: 400 },
    );
  }

  let res: Response;
  try {
    res = await fetch(`${base}/api/v1/auth/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: body.username,
        password: body.password,
      }),
    });
  } catch (e) {
    const isLocalhost = base.includes("localhost");
    if (isLocalhost) {
      const fallbackBase = base.replace("localhost", "host.docker.internal");
      try {
        res = await fetch(`${fallbackBase}/api/v1/auth/sign-in`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: body.username,
            password: body.password,
          }),
        });
      } catch (e2) {
        return NextResponse.json(
          {
            error: "Upstream API unreachable",
            details: String(e2),
            hint: "If running inside Docker, set API_BASE_URL to http://host.docker.internal:3010",
          },
          { status: 502 },
        );
      }
    } else {
      return NextResponse.json(
        { error: "Upstream API unreachable", details: String(e) },
        { status: 502 },
      );
    }
  }

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    return NextResponse.json(data ?? { error: "Login failed" }, {
      status: res.status,
    });
  }

  const token: string | undefined = data?.accessToken;
  if (!token) {
    return NextResponse.json(
      { error: "No access token returned" },
      { status: 500 },
    );
  }

  const forwarded = req.headers.get("x-forwarded-proto") ?? "";
  const envSecure = (process.env.COOKIE_SECURE ?? "").toLowerCase() === "true";
  const isHttps = forwarded.includes("https");
  const secure = envSecure || isHttps;
  const response = NextResponse.json({
    user: {
      id: data?.userId,
      name: `${data?.firstName ?? ""} ${data?.lastName ?? ""}`.trim(),
      role: "admin",
    },
  });
  response.cookies.set("auth_token", token, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
  return response;
}
