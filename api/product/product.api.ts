import {
  CreateProductInput,
  ListProductsParams,
  ListProductsResponse,
  UpdateProductInput,
} from "./product.types";

const qs = (params: Record<string, string | number | boolean | undefined>) =>
  Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(
      ([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`,
    )
    .join("&");

export async function listProducts(params: ListProductsParams = {}) {
  const res = await fetch(
    `/api/product?${qs(params as Record<string, string | number | boolean | undefined>)}`,
    { method: "GET" },
  );
  const raw = (await res.json().catch(() => null)) as
    | { message?: string; error?: string; data?: ListProductsResponse["data"] }
    | null;
  if (!res.ok) {
    const msg = raw?.message || raw?.error || "بارگذاری محصولات ناموفق بود";
    throw new Error(msg);
  }
  const data: ListProductsResponse["data"] = raw?.data;
  return data ?? { result: [], count: 0 };
}

export async function getProduct(id: string) {
  const res = await fetch(`/api/product/${id}`, { method: "GET" });
  const json = (await res.json().catch(() => null)) as
    | { message?: string; error?: string }
    | null;
  if (!res.ok) {
    const msg = json?.message || json?.error || "بارگذاری محصول ناموفق بود";
    throw new Error(msg);
  }
  return json;
}

export async function createProduct(input: CreateProductInput) {
  const res = await fetch(`/api/product`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const json = (await res.json().catch(() => null)) as
    | { message?: string; error?: string }
    | null;
  if (!res.ok) {
    const msg = json?.message || json?.error || "ایجاد محصول ناموفق بود";
    throw new Error(msg);
  }
  return json;
}

export async function updateProduct(id: string, input: UpdateProductInput) {
  const res = await fetch(`/api/product/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const json = (await res.json().catch(() => null)) as
    | { message?: string; error?: string }
    | null;
  if (!res.ok) {
    const msg = json?.message || json?.error || "به‌روزرسانی محصول ناموفق بود";
    throw new Error(msg);
  }
  return json;
}

export async function deleteProduct(id: string) {
  const res = await fetch(`/api/product/${id}`, { method: "DELETE" });
  const json = (await res.json().catch(() => null)) as
    | { message?: string; error?: string }
    | null;
  if (!res.ok) {
    const msg = json?.message || json?.error || "حذف محصول ناموفق بود";
    throw new Error(msg);
  }
  return json;
}
