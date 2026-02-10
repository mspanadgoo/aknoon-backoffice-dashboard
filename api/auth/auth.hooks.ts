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
    onError: () => {
      toast.error("ورود ناموفق بود");
    },
  });
}
