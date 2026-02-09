"use client";

import { Menu, PanelLeftClose, PanelLeftOpen, User } from "lucide-react";
import { useSidebarStore } from "./sidebar.store";

export function Header() {
  const { setOpen, collapsed, toggleCollapsed } = useSidebarStore();

  return (
    <header className="w-full bg-white shadow-sm p-4 flex justify-between items-center z-40 relative">
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button className="md:hidden p-2" onClick={() => setOpen(true)}>
          <Menu size={28} className="text-amber-800" />
        </button>

        {/* Desktop collapse button */}
        <button className="hidden md:block p-2" onClick={toggleCollapsed}>
          {collapsed ? (
            <PanelLeftOpen size={28} className="text-amber-800" />
          ) : (
            <PanelLeftClose size={28} className="text-amber-800" />
          )}
        </button>

        <h1 className="text-lg font-semibold text-amber-800">خوش آمدید</h1>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600 hidden sm:block">
          مدیر سیستم
        </span>
        <User size={24} className="text-amber-800" />
      </div>
    </header>
  );
}
