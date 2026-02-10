import { LoginInput } from "./auth.types";

export async function loginApi(data: LoginInput) {
  const res = await fetch("/api/auth/sign-in", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Login failed");
  }
  return res.json();
}
