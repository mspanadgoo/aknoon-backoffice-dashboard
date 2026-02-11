"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import Link from "next/link";
import { useSidebarStore } from "./sidebar.store";

export function Header() {
  const { setOpen, toggleCollapsed, collapsed } = useSidebarStore();

  return (
    <header className="w-full bg-card text-foreground shadow-sm p-4 flex justify-between items-center z-40 relative transition-colors duration-300">
      <div className="flex items-center gap-3">
        <button className="md:hidden p-2" onClick={() => setOpen(true)}>
          <ChevronLeft size={28} className="text-foreground" />
        </button>

        <button className="hidden md:block p-2" onClick={toggleCollapsed}>
          {collapsed ? (
            <ChevronRight size={28} className="text-foreground" />
          ) : (
            <ChevronLeft size={28} className="text-foreground" />
          )}
        </button>
        <Image src="/favicon.svg" alt="اکنون" width={24} height={24} />
        <span className="font-bold">اکنون</span>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/dashboard"
          className="p-2 rounded hover:bg-accent/10 transition-colors"
          aria-label="پروفایل"
          title="پروفایل"
        >
          <User size={22} />
        </Link>
      </div>
    </header>
  );
}
