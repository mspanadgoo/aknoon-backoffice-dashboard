 import { CreateAdminInput, ListAdminsParams, ListAdminsResponse, UpdateAdminInput } from "./admin.types";
 
 const qs = (params: Record<string, string | number | undefined>) =>
   Object.entries(params)
     .filter(([, v]) => v !== undefined && v !== "")
     .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
     .join("&");
 
 export async function listAdmins(params: ListAdminsParams = {}) {
   const query = qs({
     name: params.name,
     page: params.page ?? 1,
     pageSize: params.pageSize ?? 10,
   });
   const res = await fetch(`/api/admin?${query}`, { method: "GET" });
   if (!res.ok) throw new Error("Failed to load admins");
   const data: ListAdminsResponse = await res.json();
   const result = data?.data?.result ?? (Array.isArray(data) ? data : []);
   const count = data?.data?.count ?? result.length ?? 0;
   return { result, count };
 }
 
 export async function getAdmin(id: string) {
   const res = await fetch(`/api/admin/${id}`, { method: "GET" });
   if (!res.ok) throw new Error("Failed to load admin");
   return res.json();
 }
 
 export async function createAdmin(input: CreateAdminInput) {
   const res = await fetch(`/api/admin`, {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(input),
   });
   if (!res.ok) throw new Error("Failed to create admin");
   return res.json();
 }
 
 export async function updateAdmin(id: string, input: UpdateAdminInput) {
   const res = await fetch(`/api/admin/${id}`, {
     method: "PATCH",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(input),
   });
   if (!res.ok) throw new Error("Failed to update admin");
   return res.json();
 }
 
 export async function deleteAdmin(id: string) {
   const res = await fetch(`/api/admin/${id}`, { method: "DELETE" });
   if (!res.ok) throw new Error("Failed to delete admin");
   return res.json();
 }
