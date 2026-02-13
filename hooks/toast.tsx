"use client";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
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

  const show = useCallback(
    (t: Omit<ToastItem, "id">) => {
      const id = Math.random().toString(36).slice(2);
      const item: ToastItem = { id, duration: 3000, ...t };
      setItems((prev) => [item, ...prev]);
      const d = item.duration ?? 3000;
      if (d > 0) {
        setTimeout(() => remove(id), d);
      }
    },
    [remove],
  );

  const api = useMemo<ToastContextValue>(
    () => ({
      show,
      success: (message, opts) => show({ type: "success", message, ...opts }),
      error: (message, opts) => show({ type: "error", message, ...opts }),
      warning: (message, opts) => show({ type: "warning", message, ...opts }),
      info: (message, opts) => show({ type: "info", message, ...opts }),
    }),
    [show],
  );

  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<{
        type: ToastType;
        message: string;
        title?: string;
        duration?: number;
      }>;
      const d = ce.detail;
      if (!d) return;
      show({
        type: d.type,
        message: d.message,
        title: d.title,
        duration: d.duration,
      });
    };
    window.addEventListener("app:toast", handler as EventListener);
    return () =>
      window.removeEventListener("app:toast", handler as EventListener);
  }, [show]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="fixed top-4 right-4 z-1000 space-y-2">
        {items.map((t) => (
          <div
            key={t.id}
            className={
              "flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg border transition-all animate-in fade-in slide-in-from-top-2 duration-300 " +
              (t.type === "success"
                ? "bg-green-100 text-green-900 border-green-200 dark:bg-green-900/30 dark:text-green-100 dark:border-green-800"
                : t.type === "error"
                  ? "bg-red-100 text-red-900 border-red-200 dark:bg-red-900/30 dark:text-red-100 dark:border-red-800"
                  : t.type === "warning"
                    ? "bg-yellow-100 text-yellow-900 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-100 dark:border-yellow-800"
                    : "bg-blue-100 text-blue-900 border-blue-200 dark:bg-blue-900/30 dark:text-blue-100 dark:border-blue-800")
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
              className="opacity-70 hover:opacity-100"
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
