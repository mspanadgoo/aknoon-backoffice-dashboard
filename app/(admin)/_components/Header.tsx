"use client";

import { Menu, User } from "lucide-react";
import { useSidebarStore } from "./sidebar.store";

export function Header() {
  const { setOpen, toggleCollapsed } = useSidebarStore();

  return (
    <header className="w-full bg-card text-foreground shadow-sm p-4 flex justify-between items-center z-40 relative transition-colors duration-300">
      <div className="flex items-center gap-3">
        <button className="md:hidden p-2" onClick={() => setOpen(true)}>
          <Menu size={28} className="text-foreground" />
        </button>

        <button className="hidden md:block p-2" onClick={toggleCollapsed}>
          <Menu size={28} className="text-foreground" />
        </button>

        <h1 className="text-lg font-semibold text-primary">خوش آمدید</h1>
      </div>

      <div />

      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground hidden sm:block">
          مدیر سیستم
        </span>
        <User size={24} className="text-foreground" />
      </div>
    </header>
  );
}
