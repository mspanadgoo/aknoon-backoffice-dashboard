"use client";

import { Menu } from "lucide-react";
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
      </div>
      <div />
    </header>
  );
}
