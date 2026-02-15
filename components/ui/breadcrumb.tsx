"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const labels: Record<string, string> = {
  dashboard: "داشبورد",
  admins: "ادمین‌ها",
  categories: "دسته‌بندی‌ها",
  products: "محصولات",
  "bank-accounts": "حساب‌های بانکی",
  orders: "سفارش‌ها",
  baskets: "سبدها",
  new: "افزودن",
  edit: "ویرایش",
  login: "ورود",
};

export function Breadcrumb({
  className,
  includeCurrent = false,
}: {
  className?: string;
  includeCurrent?: boolean;
}) {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);

  const mapped = parts.map((part, idx) => {
    const href = "/" + parts.slice(0, idx + 1).join("/");
    const label = labels[part] ?? null;
    return { href, label };
  });

  const items =
    parts[0] === "dashboard"
      ? mapped
      : [
          { href: "/dashboard", label: labels["dashboard"] ?? "خانه" },
          ...mapped,
        ];

  return (
    <nav
      aria-label="breadcrumb"
      className={cn("mb-4 px-1 text-sm overflow-x-auto", className)}
    >
      <ol className="flex items-center gap-2 text-muted-foreground">
        {(() => {
          const trail = items.filter((it) => it.label != null);
          if (!includeCurrent && trail.length > 0) {
            trail.pop();
          }
          return trail.map((item, i, arr) => {
            const isLast = i === arr.length - 1;
            const isCurrent = includeCurrent && isLast;
            return (
              <li key={item.href} className="flex items-center gap-2 shrink-0">
                {isCurrent ? (
                  <span className="font-semibold text-foreground">
                    {item.label as string}
                  </span>
                ) : (
                  <Link href={item.href} className="hover:text-primary">
                    {item.label as string}
                  </Link>
                )}
                {!isLast && <span aria-hidden>›</span>}
              </li>
            );
          });
        })()}
      </ol>
    </nav>
  );
}
