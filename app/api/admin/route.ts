 import { NextResponse } from "next/server";
 import { cookies } from "next/headers";
 
 export async function GET(req: Request) {
   const base =
     process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL;
   if (!base) {
     return NextResponse.json({ error: "API base URL not configured" }, { status: 500 });
   }
   const c = await cookies();
   const token = c.get("auth_token")?.value;
   if (!token) {
     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }
 const url = new URL(req.url);
 const name = url.searchParams.get("name") ?? "";
 const page = url.searchParams.get("page") ?? "1";
 const pageSize = url.searchParams.get("pageSize") ?? "1000";
 
   let res: Response;
   try {
    const qs = new URLSearchParams();
    if (name) qs.set("name", name);
    qs.set("page", page);
    qs.set("pageSize", pageSize);
    res = await fetch(`${base}/api/v1/admin?${qs.toString()}`, {
       headers: { Authorization: `Bearer ${token}` },
     });
   } catch (e) {
     return NextResponse.json(
       { error: "Upstream API unreachable", details: String(e) },
       { status: 502 }
     );
   }
   const data = await res.json().catch(() => null);
   if (!res.ok) {
     return NextResponse.json(data ?? { error: "Failed to fetch admins" }, { status: res.status });
   }
   return NextResponse.json(data);
 }
 
 export async function POST(req: Request) {
   const base =
     process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL;
   if (!base) {
     return NextResponse.json({ error: "API base URL not configured" }, { status: 500 });
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
     res = await fetch(`${base}/api/v1/admin`, {
       method: "POST",
       headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
       body: JSON.stringify(body),
     });
   } catch (e) {
     return NextResponse.json(
       { error: "Upstream API unreachable", details: String(e) },
       { status: 502 }
     );
   }
   const data = await res.json().catch(() => null);
   if (!res.ok) {
     return NextResponse.json(data ?? { error: "Failed to create admin" }, { status: res.status });
   }
   return NextResponse.json(data);
 }
