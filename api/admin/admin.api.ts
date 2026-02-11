import {
  CreateAdminInput,
  ListAdminsParams,
  ListAdminsResponse,
  UpdateAdminInput,
} from "./admin.types";

const qs = (params: Record<string, string | number | undefined>) =>
  Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(
      ([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`,
    )
    .join("&");

export async function listAdmins(params: ListAdminsParams = {}) {
  const query = qs({
    name: params.name,
    page: params.page ?? 1,
    pageSize: params.pageSize ?? 10,
  });
  const res = await fetch(`/api/admin?${query}`, { method: "GET" });
  const data: ListAdminsResponse = await res
    .json()
    .catch(() => ({}) as ListAdminsResponse);
  if (!res.ok) {
    const raw = data as unknown as { message?: string; error?: string };
    const msg = raw?.message || raw?.error || "بارگذاری ادمین‌ها ناموفق بود";
    throw new Error(msg);
  }
  const result = data?.data?.result ?? (Array.isArray(data) ? data : []);
  const count = data?.data?.count ?? result.length ?? 0;
  return { result, count };
}

export async function getAdmin(id: string) {
  const res = await fetch(`/api/admin/${id}`, { method: "GET" });
  const json = (await res.json().catch(() => null)) as {
    message?: string;
    error?: string;
  } | null;
  if (!res.ok) {
    const msg = json?.message || json?.error || "بارگذاری ادمین ناموفق بود";
    throw new Error(msg);
  }
  return json;
}

export async function createAdmin(input: CreateAdminInput) {
  const res = await fetch(`/api/admin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const json = (await res.json().catch(() => null)) as {
    message?: string;
    error?: string;
  } | null;
  if (!res.ok) {
    const msg = json?.message || json?.error || "ایجاد ادمین ناموفق بود";
    throw new Error(msg);
  }
  return json;
}

export async function updateAdmin(id: string, input: UpdateAdminInput) {
  const res = await fetch(`/api/admin/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const json = (await res.json().catch(() => null)) as {
    message?: string;
    error?: string;
  } | null;
  if (!res.ok) {
    const msg = json?.message || json?.error || "به‌روزرسانی ادمین ناموفق بود";
    throw new Error(msg);
  }
  return json;
}

export async function deleteAdmin(id: string) {
  const res = await fetch(`/api/admin/${id}`, { method: "DELETE" });
  const json = (await res.json().catch(() => null)) as {
    message?: string;
    error?: string;
  } | null;
  if (!res.ok) {
    const msg = json?.message || json?.error || "حذف ادمین ناموفق بود";
    throw new Error(msg);
  }
  return json;
}
