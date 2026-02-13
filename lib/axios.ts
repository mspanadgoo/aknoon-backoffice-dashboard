import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;
    if ((status === 401 || status === 403) && typeof window !== "undefined") {
      try {
        const raw =
          error?.response?.data?.message || error?.response?.data?.error || "";
        const msg =
          raw && typeof raw === "string"
            ? raw
            : "نشست شما منقضی شده است. لطفاً دوباره وارد شوید.";
        window.dispatchEvent(
          new CustomEvent("app:toast", {
            detail: { type: "error", message: msg },
          }),
        );
      } catch {}
      try {
        await fetch("/api/auth/logout", { method: "POST" });
      } catch {}
      const current = window.location.pathname + window.location.search;
      window.location.href = `/login?redirect=${encodeURIComponent(current)}`;
    }
    return Promise.reject(error);
  },
);
