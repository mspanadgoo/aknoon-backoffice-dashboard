import { useMutation } from "@tanstack/react-query";
import { loginApi } from "./auth.api";

export function useLogin() {
  return useMutation({
    mutationFn: loginApi,
  });
}
