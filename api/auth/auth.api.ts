import { api } from "@/lib/api";
import { LoginInput } from "./auth.types";

export async function loginApi(data: LoginInput) {
  const res = await api.post("/auth/login", data);
  return res.data;
}
