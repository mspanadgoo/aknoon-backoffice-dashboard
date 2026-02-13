"use client";

import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { ToastProvider } from "@/hooks/toast";

export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (err: unknown) => {
            if (typeof window === "undefined") return;
            let status: number | undefined;
            let rawMsg: string | undefined;
            if (typeof err === "object" && err) {
              const hasResponse = "response" in (err as object);
              if (hasResponse) {
                const resp = (err as { response?: unknown }).response;
                if (typeof resp === "object" && resp) {
                  if ("status" in (resp as object)) {
                    status = (resp as { status?: number }).status;
                  }
                  if ("data" in (resp as object)) {
                    const data = (resp as { data?: unknown }).data;
                    if (typeof data === "object" && data) {
                      if ("message" in (data as object)) {
                        const v = (data as { message?: unknown }).message;
                        if (typeof v === "string") rawMsg = v;
                      }
                      if (!rawMsg && "error" in (data as object)) {
                        const v = (data as { error?: unknown }).error;
                        if (typeof v === "string") rawMsg = v;
                      }
                    }
                  }
                }
              }
            }
            const baseMsg =
              err instanceof Error ? err.message : "Request failed";
            const isAuthExpired =
              status === 401 ||
              status === 403 ||
              baseMsg.toLowerCase().includes("unauthorized") ||
              baseMsg.toLowerCase().includes("forbidden") ||
              baseMsg.toLowerCase().includes("expired");
            const msg = isAuthExpired
              ? rawMsg && typeof rawMsg === "string"
                ? rawMsg
                : "نشست شما منقضی شده است. لطفاً دوباره وارد شوید."
              : baseMsg;
            window.dispatchEvent(
              new CustomEvent("app:toast", {
                detail: { type: "error", message: msg },
              }),
            );
            if (isAuthExpired) {
              try {
                fetch("/api/auth/logout", { method: "POST" });
              } catch {}
              const current = window.location.pathname + window.location.search;
              window.location.href = `/login?redirect=${encodeURIComponent(current)}`;
            }
          },
        }),
        mutationCache: new MutationCache({
          onError: (err: unknown) => {
            if (typeof window === "undefined") return;
            let status: number | undefined;
            let rawMsg: string | undefined;
            if (typeof err === "object" && err) {
              const hasResponse = "response" in (err as object);
              if (hasResponse) {
                const resp = (err as { response?: unknown }).response;
                if (typeof resp === "object" && resp) {
                  if ("status" in (resp as object)) {
                    status = (resp as { status?: number }).status;
                  }
                  if ("data" in (resp as object)) {
                    const data = (resp as { data?: unknown }).data;
                    if (typeof data === "object" && data) {
                      if ("message" in (data as object)) {
                        const v = (data as { message?: unknown }).message;
                        if (typeof v === "string") rawMsg = v;
                      }
                      if (!rawMsg && "error" in (data as object)) {
                        const v = (data as { error?: unknown }).error;
                        if (typeof v === "string") rawMsg = v;
                      }
                    }
                  }
                }
              }
            }
            const baseMsg =
              err instanceof Error ? err.message : "Request failed";
            const isAuthExpired =
              status === 401 ||
              status === 403 ||
              baseMsg.toLowerCase().includes("unauthorized") ||
              baseMsg.toLowerCase().includes("forbidden") ||
              baseMsg.toLowerCase().includes("expired");
            const msg = isAuthExpired
              ? rawMsg && typeof rawMsg === "string"
                ? rawMsg
                : "نشست شما منقضی شده است. لطفاً دوباره وارد شوید."
              : baseMsg;
            window.dispatchEvent(
              new CustomEvent("app:toast", {
                detail: { type: "error", message: msg },
              }),
            );
            if (isAuthExpired) {
              try {
                fetch("/api/auth/logout", { method: "POST" });
              } catch {}
              const current = window.location.pathname + window.location.search;
              window.location.href = `/login?redirect=${encodeURIComponent(current)}`;
            }
          },
        }),
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>{children}</ToastProvider>
    </QueryClientProvider>
  );
}
