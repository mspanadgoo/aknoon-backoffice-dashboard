"use client";
import { DataTable } from "@/components/ui/data-table";
import { ShoppingBag } from "lucide-react";
import { useOrders, useUpdateOrderStatus } from "@/api/order/order.hooks";
import { Order, OrderStatus } from "@/api/order/order.types";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const currency = (n: number) =>
  new Intl.NumberFormat("fa-IR").format(n) + " تومان";

const STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING_PAYMENT: "در انتظار پرداخت",
  PENDING_CONFIRMATION: "در انتظار تایید",
  CONFIRMED: "تایید شده",
  DELIVERED: "تحویل شده",
};

const columns = [
  { header: "شناسه", accessor: (o: Order) => o.id },
  { header: "کاربر تلگرام", accessor: (o: Order) => o.telegramUsername },
  { header: "شناسه تلگرام", accessor: (o: Order) => o.telegramUserId },
  {
    header: "آیتم‌ها",
    accessor: (o: Order) => (Array.isArray(o.items) ? o.items.length : 0),
  },
  { header: "مجموع", accessor: (o: Order) => currency(o.totalPrice) },
  {
    header: "وضعیت",
    accessor: (o: Order) => (
      <span className="px-2 py-1 text-xs rounded bg-secondary text-secondary-foreground">
        {STATUS_LABELS[o.status as OrderStatus] ?? o.status}
      </span>
    ),
  },
  {
    header: "ایجاد",
    accessor: (o: Order) =>
      o.createdAt ? new Date(o.createdAt).toLocaleDateString("fa-IR") : "-",
  },
];

function StatusPopover(row: Order) {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useUpdateOrderStatus(row.id);
  const statuses: OrderStatus[] = [
    "PENDING_PAYMENT",
    "PENDING_CONFIRMATION",
    "CONFIRMED",
    "DELIVERED",
  ];
  return (
    <div className="relative inline-block text-left">
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setOpen((v) => !v)}
        disabled={isPending}
        title="تغییر وضعیت سفارش"
      >
        {STATUS_LABELS[row.status as OrderStatus] ?? row.status}
      </Button>
      {open && (
        <div
          className="absolute z-50 mt-2 w-40 origin-top-right rounded-md border bg-background shadow-lg"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1">
            {statuses.map((s) => (
              <button
                key={s}
                className={
                  "w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground " +
                  (s === row.status ? "font-semibold" : "")
                }
                onClick={() => {
                  mutate(s, {
                    onSettled: () => setOpen(false),
                  });
                }}
              >
                {STATUS_LABELS[s]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function OrdersPage() {
  const { data, isLoading } = useOrders();
  const rows: Order[] = data?.result ?? [];

  return (
    <div className="space-y-4">
      <DataTable
        data={isLoading ? [] : rows}
        columns={columns}
        rowActions={(row) => <StatusPopover {...row} />}
        caption={
          <h2 className="text-xl font-bold text-primary flex items-center gap-2">
            <ShoppingBag />
            سفارش‌ها
          </h2>
        }
      />
    </div>
  );
}
