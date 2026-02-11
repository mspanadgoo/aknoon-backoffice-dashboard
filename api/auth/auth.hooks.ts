import { useMutation } from "@tanstack/react-query";
import { loginApi } from "./auth.api";
import { useToast } from "@/hooks/toast";

export function useLogin() {
  const toast = useToast();
  return useMutation({
    mutationFn: loginApi,
    onSuccess: () => {
      toast.success("ورود با موفقیت انجام شد");
    },
    onError: (err) => {
      const msg = err instanceof Error ? err.message : "ورود ناموفق بود";
      toast.error(msg);
    },
  });
}
