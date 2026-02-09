"use client";

import { create } from "zustand";

interface ThemeState {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => {
  const initialTheme =
    typeof window !== "undefined" && localStorage.getItem("theme") === "dark"
      ? "dark"
      : "light";

  if (typeof window !== "undefined") {
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }

  return {
    theme: initialTheme,
    toggleTheme: () =>
      set((state) => {
        const newTheme = state.theme === "light" ? "dark" : "light";
        if (typeof window !== "undefined") {
          localStorage.setItem("theme", newTheme);
          document.documentElement.classList.toggle(
            "dark",
            newTheme === "dark",
          );
        }
        return { theme: newTheme };
      }),
  };
});
