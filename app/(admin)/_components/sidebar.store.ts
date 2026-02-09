"use client";

import { create } from "zustand";

interface SidebarState {
  open: boolean; // mobile drawer
  collapsed: boolean; // desktop collapse
  setOpen: (value: boolean) => void;
  toggleCollapsed: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  open: false,
  collapsed: false,
  setOpen: (value) => set({ open: value }),
  toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
}));
