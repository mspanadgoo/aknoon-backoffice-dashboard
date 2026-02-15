import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBankAccount,
  deleteBankAccount,
  getBankAccount,
  listBankAccounts,
  updateBankAccount,
} from "./bank-account.api";
import {
  CreateBankAccountInput,
  ListBankAccountsParams,
  UpdateBankAccountInput,
} from "./bank-account.types";
import { useToast } from "@/hooks/toast";

export function useBankAccounts(params: ListBankAccountsParams = {}) {
  return useQuery({
    queryKey: ["bank-accounts", params],
    queryFn: () => listBankAccounts(params),
  });
}

export function useBankAccount(id: string) {
  return useQuery({
    queryKey: ["bank-account", id],
    queryFn: () => getBankAccount(id),
    enabled: !!id,
  });
}

export function useCreateBankAccount() {
  const qc = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (input: CreateBankAccountInput) => createBankAccount(input),
    onSuccess: () => {
      toast.success("حساب بانکی با موفقیت ایجاد شد");
      qc.invalidateQueries({ queryKey: ["bank-accounts"] });
    },
    onError: (err) => {
      const msg =
        err instanceof Error ? err.message : "ایجاد حساب بانکی ناموفق بود";
      toast.error(msg);
    },
  });
}

export function useUpdateBankAccount(id: string) {
  const qc = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (input: UpdateBankAccountInput) =>
      updateBankAccount(id, input),
    onSuccess: () => {
      toast.success("حساب بانکی با موفقیت به‌روزرسانی شد");
      qc.invalidateQueries({ queryKey: ["bank-accounts"] });
      qc.invalidateQueries({ queryKey: ["bank-account", id] });
    },
    onError: (err) => {
      const msg =
        err instanceof Error ? err.message : "به‌روزرسانی حساب بانکی ناموفق بود";
      toast.error(msg);
    },
  });
}

export function useDeleteBankAccount() {
  const qc = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (id: string) => deleteBankAccount(id),
    onSuccess: () => {
      toast.success("حذف حساب بانکی با موفقیت انجام شد");
      qc.invalidateQueries({ queryKey: ["bank-accounts"] });
    },
    onError: (err) => {
      const msg =
        err instanceof Error ? err.message : "حذف حساب بانکی ناموفق بود";
      toast.error(msg);
    },
  });
}
