import {
  CreateOrderInput,
  ListOrdersParams,
  ListOrdersResponse,
  UpdateOrderInput,
} from "./order.types";

const qs = (params: Record<string, string | number | boolean | undefined>) =>
  Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(
      ([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`,
    )
    .join("&");

export async function listOrders(params: ListOrdersParams = {}) {
  const res = await fetch(
    `/api/order?${qs(params as Record<string, string | number | boolean | undefined>)}`,
    { method: "GET" },
  );
  const raw = (await res.json().catch(() => null)) as {
    message?: string;
    error?: string;
    data?: ListOrdersResponse["data"];
  } | null;
  if (!res.ok) {
    const msg = raw?.message || raw?.error || "بارگذاری سفارش‌ها ناموفق بود";
    throw new Error(msg);
  }
  const data: ListOrdersResponse["data"] = raw?.data;
  return data ?? { result: [], count: 0 };
}

export async function getOrder(id: string) {
  const res = await fetch(`/api/order/${id}`, { method: "GET" });
  const json = (await res.json().catch(() => null)) as {
    message?: string;
    error?: string;
  } | null;
  if (!res.ok) {
    const msg = json?.message || json?.error || "بارگذاری سفارش ناموفق بود";
    throw new Error(msg);
  }
  return json;
}

export async function createOrder(input: CreateOrderInput) {
  const res = await fetch(`/api/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const json = (await res.json().catch(() => null)) as {
    message?: string;
    error?: string;
  } | null;
  if (!res.ok) {
    const msg = json?.message || json?.error || "ایجاد سفارش ناموفق بود";
    throw new Error(msg);
  }
  return json;
}

export async function updateOrder(id: string, input: UpdateOrderInput) {
  const res = await fetch(`/api/order/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const json = (await res.json().catch(() => null)) as {
    message?: string;
    error?: string;
  } | null;
  if (!res.ok) {
    const msg = json?.message || json?.error || "به‌روزرسانی سفارش ناموفق بود";
    throw new Error(msg);
  }
  return json;
}

export async function deleteOrder(id: string) {
  const res = await fetch(`/api/order/${id}`, { method: "DELETE" });
  const json = (await res.json().catch(() => null)) as {
    message?: string;
    error?: string;
  } | null;
  if (!res.ok) {
    const msg = json?.message || json?.error || "حذف سفارش ناموفق بود";
    throw new Error(msg);
  }
  return json;
}

export async function updateOrderStatus(id: string, status: string) {
  const res = await fetch(`/api/order/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  const json = (await res.json().catch(() => null)) as {
    message?: string;
    error?: string;
  } | null;
  if (!res.ok) {
    const msg =
      json?.message || json?.error || "به‌روزرسانی وضعیت سفارش ناموفق بود";
    throw new Error(msg);
  }
  return json;
}

export async function getOrderStatistics() {
  const res = await fetch(`/api/order/statistics`, { method: "GET" });
  const json = (await res.json().catch(() => null)) as {
    message?: string;
    error?: string;
  } | null;
  if (!res.ok) {
    const msg =
      json?.message || json?.error || "بارگذاری آمار سفارش ناموفق بود";
    throw new Error(msg);
  }
  return json;
}

export async function getUserOrderStats(telegramUserId: string | number) {
  const res = await fetch(`/api/order/user/${telegramUserId}/orders/stats`, {
    method: "GET",
  });
  const json = (await res.json().catch(() => null)) as {
    message?: string;
    error?: string;
  } | null;
  if (!res.ok) {
    const msg =
      json?.message ||
      json?.error ||
      "بارگذاری آمار سفارش‌های کاربر ناموفق بود";
    throw new Error(msg);
  }
  return json;
}

export async function getUserOrders(telegramUserId: string | number) {
  const res = await fetch(`/api/order/user/${telegramUserId}`, {
    method: "GET",
  });
  const json = (await res.json().catch(() => null)) as {
    message?: string;
    error?: string;
  } | null;
  if (!res.ok) {
    const msg =
      json?.message || json?.error || "بارگذاری سفارش‌های کاربر ناموفق بود";
    throw new Error(msg);
  }
  return json;
}
