"use client";
import { DataTable } from "@/components/ui/data-table";
import Image from "next/image";
import { ShoppingBag, Eye, Copy } from "lucide-react";
import { useOrders, useUpdateOrderStatus } from "@/api/order/order.hooks";
import { Order, OrderStatus, ListOrdersParams } from "@/api/order/order.types";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const fa = new Intl.NumberFormat("fa-IR");

const currency = (n: number) => new Intl.NumberFormat("fa-IR").format(n);

const STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING_PAYMENT: "در انتظار پرداخت",
  COLLECTING_ZIP: "در حال دریافت اطلاعات",
  COLLECTING_ADDRESS: "در حال دریافت اطلاعات",
  PENDING_CONFIRMATION: "در انتظار تایید",
  CONFIRMED: "تایید شده",
  DELIVERED: "تحویل شده",
};
const STATUS_STYLES: Record<OrderStatus, string> = {
  PENDING_PAYMENT:
    "bg-yellow-100 text-yellow-900 border border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-100 dark:border-yellow-800",
  COLLECTING_ZIP:
    "bg-amber-100 text-amber-900 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-100 dark:border-amber-800",
  COLLECTING_ADDRESS:
    "bg-orange-100 text-orange-900 border border-orange-200 dark:bg-orange-900/30 dark:text-orange-100 dark:border-orange-800",
  PENDING_CONFIRMATION:
    "bg-indigo-100 text-indigo-900 border border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-100 dark:border-indigo-800",
  CONFIRMED:
    "bg-emerald-100 text-emerald-900 border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-100 dark:border-emerald-800",
  DELIVERED:
    "bg-sky-100 text-sky-900 border border-sky-200 dark:bg-sky-900/30 dark:text-sky-100 dark:border-sky-800",
};

const FILTER_STATUSES: OrderStatus[] = [
  "PENDING_PAYMENT",
  "COLLECTING_ZIP",
  "COLLECTING_ADDRESS",
  "PENDING_CONFIRMATION",
  "CONFIRMED",
  "DELIVERED",
];

const CHANGEABLE_STATUSES: OrderStatus[] = [
  "PENDING_PAYMENT",
  "PENDING_CONFIRMATION",
  "CONFIRMED",
  "DELIVERED",
];

const columns = [
  { header: "کاربر تلگرام", accessor: (o: Order) => o.telegramUsername },
  { header: "شناسه تلگرام", accessor: (o: Order) => o.telegramUserId },
  { header: "کد پستی", accessor: (o: Order) => o.zipCode || "-" },
  { header: "آدرس", accessor: (o: Order) => o.address || "-" },
  {
    header: "آیتم‌ها",
    accessor: (o: Order) =>
      Array.isArray(o.items) ? fa.format(o.items.length) : 0,
  },
  {
    header: "مجموع (تومان)",
    accessor: (o: Order) => currency(o.totalPrice),
  },
  {
    header: "وضعیت",
    accessor: (o: Order) => (
      <span
        className={`px-2 py-1 text-xs rounded ${STATUS_STYLES[o.status as OrderStatus] ?? ""}`}
      >
        {STATUS_LABELS[o.status as OrderStatus] ?? o.status}
      </span>
    ),
  },
  {
    header: "تاریخ",
    accessor: (o: Order) =>
      o.createdAt ? new Date(o.createdAt).toLocaleDateString("fa-IR") : "-",
  },
  {
    header: "زمان",
    accessor: (o: Order) =>
      o.createdAt
        ? new Date(o.createdAt).toLocaleTimeString("fa-IR", {
            hour: "2-digit",
            minute: "2-digit",
            hourCycle: "h23",
          })
        : "-",
  },
];

export default function OrdersPage() {
  const [filters, setFilters] = useState<ListOrdersParams>({});
  const { data, isLoading } = useOrders(filters);
  const rows: Order[] = data?.result ?? [];
  const [selected, setSelected] = useState<Order | null>(null);
  const [open, setOpen] = useState(false);
  const [openReceipt, setOpenReceipt] = useState(false);
  const { mutate, isPending } = useUpdateOrderStatus(selected?.id ?? "");

  return (
    <div className="space-y-4">
      {isLoading && (
        <div className="rounded-xl border bg-card p-4">
          <div className="h-6 w-36 bg-muted rounded mb-3 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-9 bg-muted rounded animate-pulse" />
            ))}
          </div>
        </div>
      )}
      <DataTable
        data={isLoading ? [] : rows}
        columns={columns}
        caption={
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-primary flex items-center gap-2">
              <ShoppingBag />
              سفارش‌ها
            </h2>
            <div className="rounded-lg border p-3">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
                <input
                  className="rounded-md border px-3 py-2 text-sm bg-background"
                  placeholder="نام کاربری تلگرام"
                  value={filters.telegramUsername ?? ""}
                  onChange={(e) =>
                    setFilters((f) => ({
                      ...f,
                      telegramUsername: e.target.value || undefined,
                    }))
                  }
                />
                <input
                  className="rounded-md border px-3 py-2 text-sm bg-background"
                  placeholder="شناسه تلگرام"
                  type="number"
                  value={filters.telegramUserId ?? ""}
                  onChange={(e) =>
                    setFilters((f) => ({
                      ...f,
                      telegramUserId:
                        e.target.value === ""
                          ? undefined
                          : Number(e.target.value),
                    }))
                  }
                />
                <input
                  className="rounded-md border px-3 py-2 text-sm bg-background"
                  placeholder="نام محصول"
                  value={filters.productName ?? ""}
                  onChange={(e) =>
                    setFilters((f) => ({
                      ...f,
                      productName: e.target.value || undefined,
                    }))
                  }
                />
                <input
                  className="rounded-md border px-3 py-2 text-sm bg-background"
                  placeholder="حداقل مبلغ"
                  type="number"
                  value={filters.minTotalPrice ?? ""}
                  onChange={(e) =>
                    setFilters((f) => ({
                      ...f,
                      minTotalPrice:
                        e.target.value === ""
                          ? undefined
                          : Number(e.target.value),
                    }))
                  }
                />
                <input
                  className="rounded-md border px-3 py-2 text-sm bg-background"
                  placeholder="حداکثر مبلغ"
                  type="number"
                  value={filters.maxTotalPrice ?? ""}
                  onChange={(e) =>
                    setFilters((f) => ({
                      ...f,
                      maxTotalPrice:
                        e.target.value === ""
                          ? undefined
                          : Number(e.target.value),
                    }))
                  }
                />
                <select
                  className="rounded-md border px-3 py-2 text-sm bg-background"
                  value={filters.status ?? ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    setFilters((f) => ({
                      ...f,
                      status: v ? (v as OrderStatus) : undefined,
                    }));
                  }}
                >
                  <option value="">وضعیت (همه)</option>
                  {FILTER_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {STATUS_LABELS[s]}
                    </option>
                  ))}
                </select>
                <input
                  className="rounded-md border px-3 py-2 text-sm bg-background"
                  placeholder="کد پستی"
                  value={filters.zipCode ?? ""}
                  onChange={(e) =>
                    setFilters((f) => ({
                      ...f,
                      zipCode: e.target.value || undefined,
                    }))
                  }
                />
                <input
                  className="rounded-md border px-3 py-2 text-sm bg-background"
                  placeholder="آدرس"
                  value={filters.address ?? ""}
                  onChange={(e) =>
                    setFilters((f) => ({
                      ...f,
                      address: e.target.value || undefined,
                    }))
                  }
                />
                <div className="md:col-span-3 lg:col-span-5 flex items-center gap-2 justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFilters({})}
                  >
                    پاک کردن
                  </Button>
                </div>
              </div>
            </div>
          </div>
        }
        rowActions={(row) => (
          <Button
            variant="ghost"
            size="icon"
            title="مشاهده جزئیات"
            onClick={() => {
              setSelected(row as Order);
              setOpen(true);
            }}
          >
            <Eye size={16} />
          </Button>
        )}
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
                <div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
                  <div className="space-y-3 text-sm">
                    <div className="rounded-lg border bg-muted/40 p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          زمان سفارش
                        </span>
                        <span className="font-medium">
                          {selected.createdAt
                            ? new Date(selected.createdAt).toLocaleTimeString(
                                "fa-IR",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hourCycle: "h23",
                                },
                              )
                            : "-"}
                          {" - "}
                          {selected.createdAt
                            ? new Date(selected.createdAt).toLocaleDateString(
                                "fa-IR",
                              )
                            : "-"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">جمع کل</span>
                        <span className="font-semibold">
                          {currency(selected.totalPrice) + " تومان"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">وضعیت</span>
                        <span
                          className={`px-2 py-1 text-xs rounded ${
                            STATUS_STYLES[selected.status]
                          }`}
                        >
                          {STATUS_LABELS[selected.status]}
                        </span>
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="rounded-lg border bg-muted/20 p-3 space-y-1">
                        <div className="text-xs text-muted-foreground mb-1">
                          اطلاعات مشتری
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">کاربر</span>
                          <span className="font-medium">
                            {selected.telegramUsername}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            شناسه تلگرام
                          </span>
                          <span className="font-mono text-xs">
                            {selected.telegramUserId}
                          </span>
                        </div>
                      </div>

                      <div className="rounded-lg border bg-muted/20 p-3 space-y-2">
                        <div className="text-xs text-muted-foreground mb-1">
                          اطلاعات ارسال
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-muted-foreground">کد پستی</span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs">
                              {selected.zipCode || "-"}
                            </span>
                            {selected.zipCode && (
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  navigator.clipboard.writeText(
                                    selected.zipCode || "",
                                  )
                                }
                                title="کپی کد پستی"
                              >
                                <Copy size={14} />
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-muted-foreground">آدرس</span>
                          <div className="flex-1 flex items-center justify-between gap-2">
                            <span className="text-xs md:text-sm break-words">
                              {selected.address || "-"}
                            </span>
                            {selected.address && (
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  navigator.clipboard.writeText(
                                    selected.address || "",
                                  )
                                }
                                title="کپی آدرس"
                              >
                                <Copy size={14} />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border bg-muted/10 p-3 flex items-center justify-center">
                    {selected.paymentImageUrl ? (
                      <div className="space-y-2 text-center">
                        <div className="text-sm text-muted-foreground">
                          رسید پرداخت ثبت شده است
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setOpenReceipt(true)}
                        >
                          مشاهده رسید
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center text-sm text-muted-foreground">
                        رسید پرداخت موجود نیست
                      </div>
                    )}
                  </div>
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
                              مقدار: {it.quantity} × قیمت:{" "}
                              {currency(it.price) + " تومان"}
                            </div>
                          </div>
                          <div className="text-primary font-medium">
                            {currency(it.price * it.quantity) + " تومان"}
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
                    {CHANGEABLE_STATUSES.map((s) => (
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
      {openReceipt && selected?.paymentImageUrl && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpenReceipt(false)}
          />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl rounded-lg border bg-background shadow-2xl overflow-hidden">
              <div className="px-4 py-3 border-b flex items-center justify-between">
                <h3 className="text-lg font-semibold">رسید پرداخت</h3>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setOpenReceipt(false)}
                >
                  بستن
                </Button>
              </div>
              <div className="p-4">
                <div className="relative w-full h-[75vh]">
                  <Image
                    src={selected.paymentImageUrl}
                    alt="رسید پرداخت"
                    fill
                    unoptimized
                    className="object-contain rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
