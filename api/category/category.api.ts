import {
  CreateCategoryInput,
  ListCategoriesParams,
  ListCategoriesResponse,
  UpdateCategoryInput,
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
  if (!res.ok) throw new Error("Failed to load categories");
  const data: ListCategoriesResponse["data"] = (await res.json())?.data;
  return data ?? { result: [], count: 0 };
}

export async function getCategory(id: string) {
  const res = await fetch(`/api/category/${id}`, { method: "GET" });
  if (!res.ok) throw new Error("Failed to load category");
  return res.json();
}

export async function createCategory(input: CreateCategoryInput) {
  const res = await fetch(`/api/category`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("Failed to create category");
  return res.json();
}

export async function updateCategory(id: string, input: UpdateCategoryInput) {
  const res = await fetch(`/api/category/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("Failed to update category");
  return res.json();
}

export async function deleteCategory(id: string) {
  const res = await fetch(`/api/category/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete category");
  return res.json();
}
