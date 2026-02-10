"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const labels: Record<string, string> = {
  dashboard: "داشبورد",
  admins: "ادمین‌ها",
  categories: "دسته‌بندی‌ها",
  products: "محصولات",
  orders: "سفارش‌ها",
  baskets: "سبدها",
  new: "افزودن",
  edit: "ویرایش",
  login: "ورود",
};

export function Breadcrumb({ className }: { className?: string }) {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);

  const mapped = parts.map((part, idx) => {
    const href = "/" + parts.slice(0, idx + 1).join("/");
    const isId =
      /^[a-zA-Z0-9_-]+$/.test(part) &&
      idx > 0 &&
      parts[idx - 1] !== "new" &&
      parts[idx - 1] !== "edit";
    const label = labels[part] ?? (isId ? `#${part}` : part);
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
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2 shrink-0">
              {isLast ? (
                <span className="font-semibold text-foreground">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-primary">
                  {item.label}
                </Link>
              )}
              {!isLast && <span aria-hidden>›</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
