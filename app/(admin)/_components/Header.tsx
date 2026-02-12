"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { useSidebarStore } from "./sidebar.store";
import { useEffect, useRef, useState } from "react";

export function Header() {
  const { setOpen, toggleCollapsed, collapsed } = useSidebarStore();
  const [userName] = useState<string>(() =>
    typeof window !== "undefined"
      ? localStorage.getItem("user_name") || ""
      : "",
  );
  const nameRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.textContent = userName || "اَک‌/‌نونْ";
    }
  }, [userName]);

  return (
    <header className="w-full bg-card text-foreground shadow-sm p-4 grid grid-cols-3 items-center z-40 relative transition-colors duration-300">
      <div className="flex items-center gap-3 justify-start">
        <button className="md:hidden p-2" onClick={() => setOpen(true)}>
          <Menu size={28} className="text-foreground" />
        </button>
        <button className="hidden md:block p-2" onClick={toggleCollapsed}>
          {collapsed ? (
            <ChevronLeft size={28} className="text-foreground" />
          ) : (
            <ChevronRight size={28} className="text-foreground" />
          )}
        </button>

        <div className="hidden md:flex items-center gap-2 justify-end">
          <Image src="/logo.svg" alt="اکنون" width={40} height={40} priority />
          <span ref={nameRef} className="font-bold" aria-label="username" />
        </div>
      </div>

      <div className="flex items-center justify-center md:hidden">
        <Image src="/logo.svg" alt="اکنون" width={28} height={28} />
      </div>
    </header>
  );
}
