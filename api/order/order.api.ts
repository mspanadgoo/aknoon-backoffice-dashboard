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
  if (!res.ok) throw new Error("Failed to load orders");
  const data: ListOrdersResponse["data"] = (await res.json())?.data;
  return data ?? { result: [], count: 0 };
}

export async function getOrder(id: string) {
  const res = await fetch(`/api/order/${id}`, { method: "GET" });
  if (!res.ok) throw new Error("Failed to load order");
  return res.json();
}

export async function createOrder(input: CreateOrderInput) {
  const res = await fetch(`/api/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("Failed to create order");
  return res.json();
}

export async function updateOrder(id: string, input: UpdateOrderInput) {
  const res = await fetch(`/api/order/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("Failed to update order");
  return res.json();
}

export async function deleteOrder(id: string) {
  const res = await fetch(`/api/order/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete order");
  return res.json();
}

export async function updateOrderStatus(id: string, status: string) {
  const res = await fetch(`/api/order/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to update order status");
  return res.json();
}

export async function getOrderStatistics() {
  const res = await fetch(`/api/order/statistics`, { method: "GET" });
  if (!res.ok) throw new Error("Failed to load order statistics");
  return res.json();
}

export async function getUserOrderStats(telegramUserId: string | number) {
  const res = await fetch(`/api/order/user/${telegramUserId}/orders/stats`, {
    method: "GET",
  });
  if (!res.ok) throw new Error("Failed to load user order stats");
  return res.json();
}

export async function getUserOrders(telegramUserId: string | number) {
  const res = await fetch(`/api/order/user/${telegramUserId}`, {
    method: "GET",
  });
  if (!res.ok) throw new Error("Failed to load user orders");
  return res.json();
}
