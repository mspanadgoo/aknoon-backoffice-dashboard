import { LoginInput } from "./auth.types";

export async function loginApi(data: LoginInput) {
  const res = await fetch("/api/auth/sign-in", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) {
    const msg = (json && (json.message || json.error)) || "خطا در ورود";
    throw new Error(msg);
  }
  return json;
}
