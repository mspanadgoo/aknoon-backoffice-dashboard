"use client";
import Image from "next/image";
import { useOrderStatistics } from "@/api/order/order.hooks";
import { useState } from "react";

export default function DashboardPage() {
  const { data, isLoading } = useOrderStatistics();
  const stats = data ?? {};
  type StatsShape = {
    data?: Record<string, unknown>;
    totalOrders?: number;
    count?: number;
    byStatus?: Record<string, number>;
    deliveredCount?: number;
    pendingPayment?: number;
    pendingPaymentCount?: number;
    pendingConfirmation?: number;
    pendingConfirmationCount?: number;
    confirmed?: number;
    confirmedCount?: number;
    revenueToday?: number;
    totalRevenue?: number;
    revenue?: { today?: number; byDay?: Array<{ day: string; value: number }> };
    orders?: { byDay?: Array<{ day: string; value: number }> };
    revenueByDay?: Array<{ day: string; value: number }>;
    ordersByDay?: Array<{ day: string; value: number }>;
  };
  const s =
    ((stats as StatsShape)?.data as StatsShape | undefined) ??
    (stats as StatsShape);
  const fa = new Intl.NumberFormat("fa-IR");
  const [adminName] = useState<string>(() =>
    typeof window !== "undefined"
      ? localStorage.getItem("user_name") || ""
      : "",
  );

  const totalOrders =
    (s.totalOrders as number | undefined) ??
    (s.count as number | undefined) ??
    0;
  const byStatus = (s.byStatus as Record<string, number> | undefined) ?? {};
  const delivered =
    byStatus["DELIVERED"] ?? (s.deliveredCount as number | undefined) ?? 0;
  const pendingPayment =
    byStatus["PENDING_PAYMENT"] ??
    (s.pendingPayment as number | undefined) ??
    (s.pendingPaymentCount as number | undefined) ??
    0;
  const pendingConfirmation =
    byStatus["PENDING_CONFIRMATION"] ??
    (s.pendingConfirmation as number | undefined) ??
    (s.pendingConfirmationCount as number | undefined) ??
    0;
  const confirmed =
    byStatus["CONFIRMED"] ??
    (s.confirmed as number | undefined) ??
    (s.confirmedCount as number | undefined) ??
    0;
  const revenueToday =
    (s.revenueToday as number | undefined) ??
    (s.totalRevenue as number | undefined) ??
    (s.revenue?.today as number | undefined) ??
    0;
  const revenueByDay =
    (s.revenueByDay as Array<{ day: string; value: number }> | undefined) ??
    (s.revenue?.byDay as Array<{ day: string; value: number }> | undefined) ??
    [];
  const ordersByDay =
    (s.ordersByDay as Array<{ day: string; value: number }> | undefined) ??
    (s.orders?.byDay as Array<{ day: string; value: number }> | undefined) ??
    [];

  return (
    <div className="px-2 md:px-6 py-6 rounded-xl transition-colors duration-300 space-y-6">
      <div className="relative overflow-hidden rounded-2xl border bg-card text-card-foreground">
        <div className="absolute inset-0 bg-linear-to-l from-bakery-accent/20 to-transparent pointer-events-none" />
        <div className="p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-right">
            <h1
              className="text-3xl lg:text-4xl font-extrabold text-primary"
              suppressHydrationWarning
            >
              {adminName
                ? `خوش آمدید، ${adminName}`
                : "به داشبورد اکنون خوش آمدید"}
            </h1>
            <p className="text-sm text-muted-foreground">
              مدیریت سریع و ساده محصولات، دسته‌بندی‌ها و سفارش‌ها
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2">
              <a
                href="/products"
                className="px-3 py-2 rounded bg-primary text-primary-foreground text-sm"
              >
                محصولات
              </a>
              <a
                href="/categories"
                className="px-3 py-2 rounded bg-secondary text-secondary-foreground text-sm"
              >
                دسته‌بندی‌ها
              </a>
              <a
                href="/orders"
                className="px-3 py-2 rounded bg-muted text-muted-foreground text-sm"
              >
                سفارش‌ها
              </a>
              <a href="/admins" className="px-3 py-2 rounded border text-sm">
                ادمین‌ها
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/favicon.svg"
              alt="اکنون"
              width={112}
              height={112}
              className="w-24 h-24 lg:w-28 lg:h-28 drop-shadow-lg"
              priority
            />
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-primary">آمار کلی</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="bg-card text-card-foreground p-5 rounded-xl border shadow-sm">
          <div className="text-sm text-muted-foreground">کل سفارش‌ها</div>
          <div className="text-3xl font-bold mt-2">
            {isLoading ? "..." : fa.format(totalOrders)}
          </div>
        </div>
        <div className="bg-card text-card-foreground p-5 rounded-xl border shadow-sm">
          <div className="text-sm text-muted-foreground">تحویل‌شده</div>
          <div className="text-3xl font-bold mt-2">
            {isLoading ? "..." : fa.format(delivered)}
          </div>
        </div>
        <div className="bg-card text-card-foreground p-5 rounded-xl border shadow-sm">
          <div className="text-sm text-muted-foreground">در انتظار پرداخت</div>
          <div className="text-3xl font-bold mt-2">
            {isLoading ? "..." : fa.format(pendingPayment)}
          </div>
        </div>
        <div className="bg-card text-card-foreground p-5 rounded-xl border shadow-sm">
          <div className="text-sm text-muted-foreground">کل درآمد</div>
          <div className="text-3xl font-bold mt-2">
            {isLoading ? "..." : `${fa.format(revenueToday)} تومان`}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <div className="bg-card text-card-foreground p-6 rounded-xl border shadow-sm">
          <h3 className="text-lg font-semibold text-primary">وضعیت سفارش‌ها</h3>
          <div className="mt-4 space-y-3">
            {[
              { label: "تایید شده", value: confirmed },
              { label: "در انتظار تایید", value: pendingConfirmation },
              { label: "در انتظار پرداخت", value: pendingPayment },
              { label: "تحویل شده", value: delivered },
            ].map((item, idx) => {
              const max = Math.max(
                1,
                confirmed,
                pendingConfirmation,
                pendingPayment,
                delivered,
              );
              const width = Math.round((item.value / max) * 100);
              return (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-28 text-sm text-muted-foreground">
                    {item.label}
                  </div>
                  <div className="flex-1 h-3 rounded bg-muted overflow-hidden">
                    <div
                      className="h-3 bg-primary"
                      style={{ width: `${width}%` }}
                      aria-label={`${item.label}: ${fa.format(item.value)}`}
                    />
                  </div>
                  <div className="w-16 text-right text-sm">
                    {fa.format(item.value)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-card text-card-foreground p-6 rounded-xl border shadow-sm">
          <h3 className="text-lg font-semibold text-primary">
            سفارش‌ها در روزهای اخیر
          </h3>
          <div className="mt-4 grid grid-cols-7 gap-2 items-end h-32">
            {ordersByDay.slice(-7).map((d, idx) => {
              const max = Math.max(1, ...ordersByDay.map((x) => x.value));
              const height = Math.round((d.value / max) * 100);
              return (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <div
                    className="w-6 bg-primary rounded"
                    style={{ height: `${height}%` }}
                    aria-label={`${d.day}: ${fa.format(d.value)}`}
                  />
                  <div className="text-[10px] text-muted-foreground">
                    {d.day}
                  </div>
                </div>
              );
            })}
            {ordersByDay.length === 0 && (
              <div className="text-sm text-muted-foreground">
                داده‌ای موجود نیست
              </div>
            )}
          </div>
        </div>

        <div className="bg-card text-card-foreground p-6 rounded-xl border shadow-sm lg:col-span-2">
          <h3 className="text-lg font-semibold text-primary">درآمد روزانه</h3>
          <div className="mt-4 grid grid-cols-7 gap-2 items-end h-32">
            {revenueByDay.slice(-7).map((d, idx) => {
              const max = Math.max(1, ...revenueByDay.map((x) => x.value));
              const height = Math.round((d.value / max) * 100);
              return (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <div
                    className="w-6 bg-secondary rounded"
                    style={{ height: `${height}%` }}
                    aria-label={`${d.day}: ${fa.format(d.value)}`}
                  />
                  <div className="text-[10px] text-muted-foreground">
                    {d.day}
                  </div>
                </div>
              );
            })}
            {revenueByDay.length === 0 && (
              <div className="text-sm text-muted-foreground">
                داده‌ای موجود نیست
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
