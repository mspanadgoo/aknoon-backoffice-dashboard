"use client";
import { DataTable } from "@/components/ui/data-table";
import { ShoppingBag, Eye } from "lucide-react";
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

export default function OrdersPage() {
  const { data, isLoading } = useOrders();
  const rows: Order[] = data?.result ?? [];
  const [selected, setSelected] = useState<Order | null>(null);
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useUpdateOrderStatus(selected?.id ?? "");
  const statuses: OrderStatus[] = [
    "PENDING_PAYMENT",
    "PENDING_CONFIRMATION",
    "CONFIRMED",
    "DELIVERED",
  ];

  return (
    <div className="space-y-4">
      <DataTable
        data={isLoading ? [] : rows}
        columns={columns}
        rowActions={(row) => (
          <Button
            variant="outline"
            size="sm"
            title="مشاهده جزئیات"
            onClick={() => {
              setSelected(row as Order);
              setOpen(true);
            }}
          >
            <Eye size={16} />
          </Button>
        )}
        caption={
          <h2 className="text-xl font-bold text-primary flex items-center gap-2">
            <ShoppingBag />
            سفارش‌ها
          </h2>
        }
      />
      {open && selected && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl rounded-lg border bg-background shadow-xl">
              <div className="px-4 py-3 border-b flex items-center justify-between">
                <h3 className="text-lg font-semibold">جزئیات سفارش</h3>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setOpen(false)}
                >
                  بستن
                </Button>
              </div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1 text-sm">
                    <div>کاربر: {selected.telegramUsername}</div>
                    <div>شناسه تلگرام: {selected.telegramUserId}</div>
                    <div>جمع کل: {currency(selected.totalPrice)}</div>
                    <div>
                      وضعیت:{" "}
                      <span className="px-2 py-1 text-xs rounded bg-secondary text-secondary-foreground">
                        {STATUS_LABELS[selected.status]}
                      </span>
                    </div>
                  </div>
                  {selected.paymentImageUrl && (
                    <div className="text-center">
                      <img
                        src={selected.paymentImageUrl}
                        alt="رسید پرداخت"
                        className="inline-block max-h-40 rounded border"
                      />
                    </div>
                  )}
                </div>

                <div className="rounded-md border">
                  <div className="px-3 py-2 bg-muted text-sm">آیتم‌ها</div>
                  <div className="divide-y">
                    {Array.isArray(selected.items) &&
                    selected.items.length > 0 ? (
                      selected.items.map((it, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-2 text-sm flex justify-between"
                        >
                          <div className="flex-1">
                            <div className="font-medium">{it.name}</div>
                            <div className="text-muted-foreground">
                              مقدار: {it.quantity} × قیمت: {currency(it.price)}
                            </div>
                          </div>
                          <div className="text-primary font-medium">
                            {currency(it.price * it.quantity)}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-3 py-4 text-center text-muted-foreground text-sm">
                        آیتمی ثبت نشده است
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    تغییر وضعیت
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {statuses.map((s) => (
                      <Button
                        key={s}
                        variant={
                          s === selected.status ? "secondary" : "outline"
                        }
                        size="sm"
                        disabled={isPending}
                        onClick={() =>
                          mutate(s, {
                            onSettled: () => {
                              setOpen(false);
                              setSelected(null);
                            },
                          })
                        }
                      >
                        {STATUS_LABELS[s]}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
