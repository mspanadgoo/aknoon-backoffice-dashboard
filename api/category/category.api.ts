import {
  CreateCategoryInput,
  ListCategoriesParams,
  ListCategoriesResponse,
  UpdateCategoryInput,
  Category,
} from "./category.types";

const qs = (params: Record<string, string | number | boolean | undefined>) =>
  Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(
      ([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`,
    )
    .join("&");

export async function listCategories(params: ListCategoriesParams = {}) {
  const res = await fetch(
    `/api/category?${qs(params as Record<string, string | number | boolean | undefined>)}`,
    { method: "GET" },
  );
  const raw = (await res.json().catch(() => null)) as {
    message?: string;
    error?: string;
    data?: ListCategoriesResponse["data"];
  } | null;
  if (!res.ok) {
    const msg =
      raw?.message || raw?.error || "بارگذاری دسته‌بندی‌ها ناموفق بود";
    throw new Error(msg);
  }
  const data: ListCategoriesResponse["data"] = raw?.data;
  return data ?? { result: [], count: 0 };
}

export async function getCategory(id: string): Promise<Category> {
  const res = await fetch(`/api/category/${id}`, { method: "GET" });
  const json = (await res.json().catch(() => null)) as
    | Category
    | { message?: string; error?: string }
    | null;
  if (!res.ok) {
    const err = json as { message?: string; error?: string } | null;
    const msg = err?.message || err?.error || "بارگذاری دسته‌بندی ناموفق بود";
    throw new Error(msg);
  }
  return json as Category;
}

export async function createCategory(input: CreateCategoryInput) {
  const res = await fetch(`/api/category`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const json = (await res.json().catch(() => null)) as {
    message?: string;
    error?: string;
  } | null;
  if (!res.ok) {
    const msg = json?.message || json?.error || "ایجاد دسته‌بندی ناموفق بود";
    throw new Error(msg);
  }
  return json;
}

export async function updateCategory(id: string, input: UpdateCategoryInput) {
  const res = await fetch(`/api/category/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const json = (await res.json().catch(() => null)) as {
    message?: string;
    error?: string;
  } | null;
  if (!res.ok) {
    const msg =
      json?.message || json?.error || "به‌روزرسانی دسته‌بندی ناموفق بود";
    throw new Error(msg);
  }
  return json;
}

export async function deleteCategory(id: string) {
  const res = await fetch(`/api/category/${id}`, { method: "DELETE" });
  const json = (await res.json().catch(() => null)) as {
    message?: string;
    error?: string;
  } | null;
  if (!res.ok) {
    const msg = json?.message || json?.error || "حذف دسته‌بندی ناموفق بود";
    throw new Error(msg);
  }
  return json;
}
