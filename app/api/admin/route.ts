 import { NextResponse } from "next/server";
 import { cookies } from "next/headers";
 
 export async function GET(req: Request) {
   const base = process.env.NEXT_PUBLIC_API_BASE_URL;
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
   const pageSize = url.searchParams.get("pageSize") ?? "10";
 
   const res = await fetch(`${base}/api/v1/admin?name=${encodeURIComponent(name)}&page=${page}&pageSize=${pageSize}`, {
     headers: { Authorization: `Bearer ${token}` },
   });
   const data = await res.json().catch(() => null);
   if (!res.ok) {
     return NextResponse.json(data ?? { error: "Failed to fetch admins" }, { status: res.status });
   }
   return NextResponse.json(data);
 }
 
 export async function POST(req: Request) {
   const base = process.env.NEXT_PUBLIC_API_BASE_URL;
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
   const res = await fetch(`${base}/api/v1/admin`, {
     method: "POST",
     headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
     body: JSON.stringify(body),
   });
   const data = await res.json().catch(() => null);
   if (!res.ok) {
     return NextResponse.json(data ?? { error: "Failed to create admin" }, { status: res.status });
   }
   return NextResponse.json(data);
 }
