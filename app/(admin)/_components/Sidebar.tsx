"use client";

import { useSidebarStore } from "./sidebar.store";
import Link from "next/link";
import { Home, Users, Settings } from "lucide-react";

export function Sidebar() {
  const { open, setOpen } = useSidebarStore();

  const menu = [
    { title: "داشبورد", href: "/dashboard", icon: <Home size={18} /> },
    { title: "کاربران", href: "/users", icon: <Users size={18} /> },
    { title: "تنظیمات", href: "/settings", icon: <Settings size={18} /> },
  ];

  return (
    <>
      <aside
        className={`fixed md:static top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full md:translate-x-0"}`}
      >
        {/* Close button (mobile only) */}
        <div className="flex justify-end p-4 md:hidden">
          <button onClick={() => setOpen(false)}>
            <span className="text-xl">✕</span>
          </button>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-bold text-amber-700 mb-6">پنل مدیریت</h2>

          <nav className="space-y-3">
            {menu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-amber-100 text-amber-800"
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 md:hidden z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
