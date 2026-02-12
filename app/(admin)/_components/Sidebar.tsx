"use client";

import { useSidebarStore } from "./sidebar.store";
import { useThemeStore } from "./theme.store";
import Link from "next/link";
import {
  Home,
  Package,
  FolderTree,
  Moon,
  Sun,
  LogOut,
  Users,
  ShoppingBag,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import pkg from "../../../package.json";

export function Sidebar() {
  const { open, setOpen, collapsed } = useSidebarStore();
  const { toggleTheme } = useThemeStore();
  const router = useRouter();
  const pathname = usePathname();

  const menu = [
    { title: "داشبورد", href: "/dashboard", icon: <Home size={20} /> },
    { title: "ادمین‌ها", href: "/admins", icon: <Users size={20} /> },
    {
      title: "دسته‌بندی‌ها",
      href: "/categories",
      icon: <FolderTree size={20} />,
    },
    { title: "محصولات", href: "/products", icon: <Package size={20} /> },
    { title: "سفارش‌ها", href: "/orders", icon: <ShoppingBag size={20} /> },
  ];

  return (
    <>
      <aside
        className={` fixed md:static top-0 right-0 h-screen bg-sidebar text-sidebar-foreground shadow-lg z-50 transition-all duration-300 w-full ${open ? "translate-x-0" : "translate-x-full md:translate-x-0"} ${collapsed ? "md:w-20" : "md:w-64"} `}
      >
        <div className="h-full flex flex-col">
          <div className="flex justify-end p-4 md:hidden">
            <button onClick={() => setOpen(false)}>
              <span className="text-xl">✕</span>
            </button>
          </div>

          <div className="p-4">
            <h2
              className={`
                text-xl font-bold text-white text-center mb-6 transition-opacity duration-300
                ${collapsed ? "opacity-0 pointer-events-none" : "opacity-100"}
              `}
            >
              پنل مدیریت اَک‌/‌نونْ
            </h2>

            <nav className="space-y-3">
              {menu.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 p-3 rounded-lg ring-1 ring-transparent hover:bg-primary/20 hover:text-primary-foreground/30 hover:ring-primary/40 transition-colors ${
                    pathname.startsWith(item.href)
                      ? "bg-primary/50 text-primary-foreground/70 ring-primary/40"
                      : "text-sidebar-foreground"
                  }`}
                >
                  {item.icon}
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-auto p-4 border-t border-border">
            <div
              className={`flex items-center ${collapsed ? "flex-col gap-3" : "justify-between gap-3"}`}
            >
              <button
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary text-secondary-foreground ring-1 ring-transparent hover:ring-primary/40 hover:bg-primary/15 hover:text-primary transition-colors"
                onClick={toggleTheme}
                aria-label="toggle theme"
                title="تغییر حالت"
              >
                <Moon size={18} className="block dark:hidden" />
                <Sun size={18} className="hidden dark:block" />
              </button>

              <button
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary text-secondary-foreground ring-1 ring-transparent hover:ring-destructive/40 hover:bg-destructive/15 hover:text-destructive transition-colors"
                onClick={async () => {
                  try {
                    await fetch("/api/auth/logout", { method: "POST" });
                  } catch {}
                  router.push("/login");
                }}
                aria-label="exit"
                title="خروج"
              >
                <LogOut size={18} />
                {!collapsed && <span className="hidden md:inline">خروج</span>}
              </button>
            </div>
            <div className={`mt-3 text-xs text-muted-foreground text-center`}>
              {!collapsed ? (
                <span>نسخه: v{pkg.version}</span>
              ) : (
                <span>v{pkg.version}</span>
              )}
            </div>
          </div>
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 bg-black/30 md:hidden z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
