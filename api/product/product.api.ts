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
  if (!res.ok) throw new Error("Failed to load products");
  const data: ListProductsResponse["data"] = (await res.json())?.data;
  return data ?? { result: [], count: 0 };
}

export async function getProduct(id: string) {
  const res = await fetch(`/api/product/${id}`, { method: "GET" });
  if (!res.ok) throw new Error("Failed to load product");
  return res.json();
}

export async function createProduct(input: CreateProductInput) {
  const res = await fetch(`/api/product`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("Failed to create product");
  return res.json();
}

export async function updateProduct(id: string, input: UpdateProductInput) {
  const res = await fetch(`/api/product/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("Failed to update product");
  return res.json();
}

export async function deleteProduct(id: string) {
  const res = await fetch(`/api/product/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete product");
  return res.json();
}
