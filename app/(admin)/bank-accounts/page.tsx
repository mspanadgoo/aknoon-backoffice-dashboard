"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Pencil, Trash2, Plus, CreditCard } from "lucide-react";
import {
  useBankAccounts,
  useDeleteBankAccount,
} from "@/api/bank-account/bank-account.hooks";
import {
  BankAccount,
  ListBankAccountsParams,
} from "@/api/bank-account/bank-account.types";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { formatCardNumber } from "@/lib/utils";

function RowActions(row: BankAccount) {
  const router = useRouter();
  const { mutate } = useDeleteBankAccount();
  const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        title="ویرایش"
        onClick={() => router.push(`/bank-accounts/${row.id}/edit`)}
      >
        <Pencil />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        title="حذف"
        onClick={() => setOpen(true)}
      >
        <Trash2 />
      </Button>
      <ConfirmDialog
        open={open}
        title="حذف حساب بانکی"
        description="آیا از حذف این حساب بانکی مطمئن هستید؟ این عملیات قابل بازگشت نیست."
        confirmText="حذف"
        cancelText="انصراف"
        onConfirm={() => mutate(row.id)}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

export default function BankAccountsPage() {
  const [filters, setFilters] = useState<ListBankAccountsParams>({});
  const [showFilters, setShowFilters] = useState(false);
  const { data, isLoading } = useBankAccounts(filters);
  const rows = useMemo(() => data?.result ?? [], [data?.result]);

  const activeAccount = useMemo(() => rows.find((a) => a.active), [rows]);
  const others = useMemo(() => rows.filter((a) => !a.active), [rows]);
  const sortedRows = useMemo(
    () => (activeAccount ? [activeAccount, ...others] : rows),
    [activeAccount, others, rows],
  );

  const columns = [
    { header: "نام صاحب حساب", accessor: (a: BankAccount) => a.ownerName },
    {
      header: "شماره کارت",
      accessor: (a: BankAccount) => (
        <span
          dir="ltr"
          className="text-left inline-block font-mono tracking-widest"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {formatCardNumber(a.cardNumber)}
        </span>
      ),
    },
    {
      header: "فعال",
      accessor: (a: BankAccount) => (
        <span
          className={`px-2 py-1 text-xs rounded ${
            a.active
              ? "bg-emerald-100 text-emerald-900 border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-100 dark:border-emerald-800"
              : "bg-rose-100 text-rose-900 border border-rose-200 dark:bg-rose-900/30 dark:text-rose-100 dark:border-rose-800"
          }`}
        >
          {a.active ? "فعال" : "غیرفعال"}
        </span>
      ),
    },
    {
      header: "تاریخ",
      accessor: (a: BankAccount) =>
        a.createdAt ? new Date(a.createdAt).toLocaleDateString("fa-IR") : "-",
    },
  ];

  return (
    <div className="space-y-4">
      {!isLoading && activeAccount && (
        <div className="rounded-xl border bg-card p-4">
          <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
            <CreditCard />
            حساب فعال
          </h3>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">نام صاحب حساب:</span>{" "}
              <span className="font-medium">{activeAccount.ownerName}</span>
            </div>
            <div>
              <span className="text-muted-foreground">شماره کارت:</span>{" "}
              <span
                className="font-medium font-mono tracking-widest text-left inline-block"
                style={{ fontVariantNumeric: "tabular-nums" }}
                dir="ltr"
              >
                {formatCardNumber(activeAccount.cardNumber)}
              </span>
            </div>
          </div>
        </div>
      )}
      <DataTable
        data={isLoading ? [] : sortedRows}
        columns={columns}
        rowActions={(row) => <RowActions {...row} />}
        caption={
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                <CreditCard />
                حساب‌های بانکی
              </h2>
              <Button asChild title="افزودن حساب بانکی">
                <Link href="/bank-accounts/new">
                  <Plus />
                </Link>
              </Button>
            </div>
            <div className="rounded-lg border p-3">
              <div className="flex items-center justify-between md:hidden">
                <button
                  className="px-3 py-2 rounded bg-secondary text-secondary-foreground"
                  onClick={() => setShowFilters((v) => !v)}
                  aria-expanded={showFilters}
                >
                  فیلترها
                </button>
              </div>
              <div
                className={`${showFilters ? "block" : "hidden"} md:grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2`}
              >
                <input
                  className="rounded-md border px-3 py-2 text-sm bg-background"
                  placeholder="جستجوی نام صاحب حساب"
                  value={filters.ownerName ?? ""}
                  onChange={(e) =>
                    setFilters((f) => ({
                      ...f,
                      ownerName: e.target.value || undefined,
                    }))
                  }
                />
                <input
                  className="rounded-md border px-3 py-2 text-sm bg-background"
                  placeholder="شماره کارت"
                  value={filters.cardNumber ?? ""}
                  onChange={(e) =>
                    setFilters((f) => ({
                      ...f,
                      cardNumber: e.target.value || undefined,
                    }))
                  }
                />
                <select
                  className="rounded-md border px-3 py-2 text-sm bg-background"
                  value={filters.active ?? ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    setFilters((f) => ({
                      ...f,
                      active: v === "" ? undefined : (v as "true" | "false"),
                    }));
                  }}
                >
                  <option value="">وضعیت فعال (همه)</option>
                  <option value="true">فعال</option>
                  <option value="false">غیرفعال</option>
                </select>
                <div className="md:col-span-3 lg:col-span-5 flex items-center gap-2 justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFilters({})}
                  >
                    پاک کردن
                  </Button>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}
