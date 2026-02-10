 "use client";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { CheckCircle2, AlertTriangle, XCircle, Info } from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info";

type ToastItem = {
  id: string;
  type: ToastType;
  title?: string;
  message?: string;
  duration?: number;
};

type ToastContextValue = {
  show: (t: Omit<ToastItem, "id">) => void;
  success: (message: string, opts?: Partial<ToastItem>) => void;
  error: (message: string, opts?: Partial<ToastItem>) => void;
  warning: (message: string, opts?: Partial<ToastItem>) => void;
  info: (message: string, opts?: Partial<ToastItem>) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const show = useCallback((t: Omit<ToastItem, "id">) => {
    const id = Math.random().toString(36).slice(2);
    const item: ToastItem = { id, duration: 3000, ...t };
    setItems((prev) => [item, ...prev]);
    const d = item.duration ?? 3000;
    if (d > 0) {
      setTimeout(() => remove(id), d);
    }
  }, [remove]);

  const api = useMemo<ToastContextValue>(() => ({
    show,
    success: (message, opts) => show({ type: "success", message, ...opts }),
    error: (message, opts) => show({ type: "error", message, ...opts }),
    warning: (message, opts) => show({ type: "warning", message, ...opts }),
    info: (message, opts) => show({ type: "info", message, ...opts }),
  }), [show]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="fixed top-4 right-4 z-[1000] space-y-2">
        {items.map((t) => (
          <div
            key={t.id}
            className={
              "flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg border " +
              (t.type === "success"
                ? "bg-green-600 text-white border-green-700"
                : t.type === "error"
                ? "bg-red-600 text-white border-red-700"
                : t.type === "warning"
                ? "bg-yellow-500 text-black border-yellow-600"
                : "bg-blue-600 text-white border-blue-700")
            }
          >
            {t.type === "success" ? (
              <CheckCircle2 className="size-5" />
            ) : t.type === "error" ? (
              <XCircle className="size-5" />
            ) : t.type === "warning" ? (
              <AlertTriangle className="size-5" />
            ) : (
              <Info className="size-5" />
            )}
            <div className="flex-1">
              {t.title && <div className="font-semibold">{t.title}</div>}
              {t.message && <div className="text-sm">{t.message}</div>}
            </div>
            <button
              onClick={() => remove(t.id)}
              className="text-white/90 hover:text-white"
              aria-label="dismiss"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
}
