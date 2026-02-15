import {
  CreateBankAccountInput,
  ListBankAccountsParams,
  ListBankAccountsResponse,
  UpdateBankAccountInput,
  BankAccount,
} from "./bank-account.types";

const qs = (params: Record<string, string | number | boolean | undefined>) =>
  Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(
      ([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`,
    )
    .join("&");

export async function listBankAccounts(params: ListBankAccountsParams = {}) {
  const res = await fetch(
    `/api/bank-account?${qs(params as Record<string, string | number | boolean | undefined>)}`,
    { method: "GET" },
  );
  const raw = (await res.json().catch(() => null)) as {
    message?: string;
    error?: string;
    data?: ListBankAccountsResponse["data"];
  } | null;
  if (!res.ok) {
    const msg = raw?.message || raw?.error || "بارگذاری حساب‌های بانکی ناموفق بود";
    throw new Error(msg);
  }
  const data: ListBankAccountsResponse["data"] = raw?.data;
  return data ?? { result: [], count: 0 };
}

export async function getBankAccount(id: string): Promise<BankAccount> {
  const res = await fetch(`/api/bank-account/${id}`, { method: "GET" });
  const json = (await res.json().catch(() => null)) as
    | BankAccount
    | { message?: string; error?: string }
    | null;
  if (!res.ok) {
    const err = json as { message?: string; error?: string } | null;
    const msg =
      err?.message || err?.error || "بارگذاری حساب بانکی ناموفق بود";
    throw new Error(msg);
  }
  return json as BankAccount;
}

export async function createBankAccount(input: CreateBankAccountInput) {
  const res = await fetch(`/api/bank-account`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const json = (await res.json().catch(() => null)) as {
    message?: string;
    error?: string;
  } | null;
  if (!res.ok) {
    const msg =
      json?.message || json?.error || "ایجاد حساب بانکی ناموفق بود";
    throw new Error(msg);
  }
  return json;
}

export async function updateBankAccount(
  id: string,
  input: UpdateBankAccountInput,
) {
  const res = await fetch(`/api/bank-account/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const json = (await res.json().catch(() => null)) as {
    message?: string;
    error?: string;
  } | null;
  if (!res.ok) {
    const msg =
      json?.message ||
      json?.error ||
      "به‌روزرسانی حساب بانکی ناموفق بود";
    throw new Error(msg);
  }
  return json;
}

export async function deleteBankAccount(id: string) {
  const res = await fetch(`/api/bank-account/${id}`, { method: "DELETE" });
  const json = (await res.json().catch(() => null)) as {
    message?: string;
    error?: string;
  } | null;
  if (!res.ok) {
    const msg =
      json?.message || json?.error || "حذف حساب بانکی ناموفق بود";
    throw new Error(msg);
  }
  return json;
}
