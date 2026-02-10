import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createOrder,
  deleteOrder,
  getOrder,
  listOrders,
  updateOrder,
  updateOrderStatus,
  getOrderStatistics,
  getUserOrderStats,
  getUserOrders,
} from "./order.api";
import {
  CreateOrderInput,
  ListOrdersParams,
  UpdateOrderInput,
} from "./order.types";
import { useToast } from "@/hooks/toast";
import type { OrderStatus } from "./order.types";

export function useOrders(params: ListOrdersParams = {}) {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: () => listOrders(params),
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrder(id),
    enabled: !!id,
  });
}

export function useCreateOrder() {
  const qc = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (input: CreateOrderInput) => createOrder(input),
    onSuccess: () => {
      toast.success("سفارش با موفقیت ایجاد شد");
      qc.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: () => {
      toast.error("ایجاد سفارش ناموفق بود");
    },
  });
}

export function useUpdateOrder(id: string) {
  const qc = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (input: UpdateOrderInput) => updateOrder(id, input),
    onSuccess: () => {
      toast.success("سفارش با موفقیت به‌روزرسانی شد");
      qc.invalidateQueries({ queryKey: ["orders"] });
      qc.invalidateQueries({ queryKey: ["order", id] });
    },
    onError: () => {
      toast.error("به‌روزرسانی سفارش ناموفق بود");
    },
  });
}

export function useUpdateOrderStatus(id: string) {
  const qc = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (status: OrderStatus) => updateOrderStatus(id, status),
    onSuccess: () => {
      toast.success("وضعیت سفارش با موفقیت به‌روزرسانی شد");
      qc.invalidateQueries({ queryKey: ["orders"] });
      qc.invalidateQueries({ queryKey: ["order", id] });
    },
    onError: () => {
      toast.error("به‌روزرسانی وضعیت سفارش ناموفق بود");
    },
  });
}

export function useDeleteOrder() {
  const qc = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (id: string) => deleteOrder(id),
    onSuccess: () => {
      toast.success("حذف سفارش با موفقیت انجام شد");
      qc.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: () => {
      toast.error("حذف سفارش ناموفق بود");
    },
  });
}

export function useOrderStatistics() {
  return useQuery({
    queryKey: ["orders", "stats"],
    queryFn: () => getOrderStatistics(),
  });
}

export function useUserOrderStats(telegramUserId: string | number) {
  return useQuery({
    queryKey: ["orders", "user", "stats", telegramUserId],
    queryFn: () => getUserOrderStats(telegramUserId),
    enabled: !!telegramUserId,
  });
}

export function useUserOrders(telegramUserId: string | number) {
  return useQuery({
    queryKey: ["orders", "user", telegramUserId],
    queryFn: () => getUserOrders(telegramUserId),
    enabled: !!telegramUserId,
  });
}
