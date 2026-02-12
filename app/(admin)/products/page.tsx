"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Pencil, Trash2, Plus, Package } from "lucide-react";
import { useProducts, useDeleteProduct } from "@/api/product/product.hooks";
import { Product, ListProductsParams } from "@/api/product/product.types";
import { useRouter } from "next/navigation";
import { useCategories } from "@/api/category/category.hooks";
import { useState } from "react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

const currency = (n: number) => new Intl.NumberFormat("fa-IR").format(n);

function RowActions(row: Product) {
  const router = useRouter();
  const { mutate } = useDeleteProduct();
  const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        title="ویرایش"
        onClick={() => router.push(`/products/${row.id}/edit`)}
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
        title="حذف محصول"
        description="آیا از حذف این محصول مطمئن هستید؟ این عملیات قابل بازگشت نیست."
        confirmText="حذف"
        cancelText="انصراف"
        onConfirm={() => mutate(row.id)}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

export default function ProductsPage() {
  const [filters, setFilters] = useState<ListProductsParams>({});
  const { data, isLoading } = useProducts(filters);
  const rows: Product[] = data?.result ?? [];
  const { data: catData } = useCategories({ pageSize: 1000 });
  const categories = catData?.result ?? [];
  const nameById = new Map(categories.map((c) => [c.id, c.name]));
  const [showFilters, setShowFilters] = useState(false);
  const columns = [
    { header: "عنوان", accessor: (p: Product) => p.name },
    {
      header: "دسته",
      accessor: (p: Product) => nameById.get(p.categoryId) ?? p.categoryId,
    },
    {
      header: "قیمت (تومان)",
      accessor: (p: Product) => currency(p.price * 1000),
    },
    {
      header: "فعال",
      accessor: (p: Product) => (
        <span
          className={`px-2 py-1 text-xs rounded ${
            p.active
              ? "bg-sky-100 text-sky-900 border border-sky-200 dark:bg-sky-900/30 dark:text-sky-100 dark:border-sky-800"
              : "bg-rose-100 text-rose-900 border border-rose-200 dark:bg-rose-900/30 dark:text-rose-100 dark:border-rose-800"
          }`}
        >
          {p.active ? "فعال" : "غیرفعال"}
        </span>
      ),
    },
    {
      header: "تاریخ",
      accessor: (p: Product) =>
        p.createdAt ? new Date(p.createdAt).toLocaleDateString("fa-IR") : "-",
    },
  ];

  return (
    <div className="space-y-4">
      {isLoading && (
        <div className="rounded-xl border bg-card p-4">
          <div className="h-6 w-36 bg-muted rounded mb-3 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-9 bg-muted rounded animate-pulse" />
            ))}
          </div>
        </div>
      )}
      <DataTable
        data={isLoading ? [] : rows}
        columns={columns}
        rowActions={(row) => <RowActions {...row} />}
        caption={
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                <Package />
                محصولات
              </h2>
              <Button asChild title="افزودن محصول">
                <Link href="/products/new">
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
                  placeholder="جستجوی عنوان"
                  value={filters.name ?? ""}
                  onChange={(e) =>
                    setFilters((f) => ({
                      ...f,
                      name: e.target.value || undefined,
                    }))
                  }
                />
                <select
                  className="rounded-md border px-3 py-2 text-sm bg-background"
                  value={filters.categoryId ?? ""}
                  onChange={(e) =>
                    setFilters((f) => ({
                      ...f,
                      categoryId: e.target.value || undefined,
                    }))
                  }
                >
                  <option value="">دسته‌بندی (همه)</option>
                  {categories.map((c, i) => (
                    <option key={`${String(c.id)}-${i}`} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <input
                  className="rounded-md border px-3 py-2 text-sm bg-background"
                  placeholder="حداقل قیمت"
                  type="number"
                  value={filters.minPrice ?? ""}
                  onChange={(e) =>
                    setFilters((f) => ({
                      ...f,
                      minPrice:
                        e.target.value === ""
                          ? undefined
                          : Number(e.target.value),
                    }))
                  }
                />
                <input
                  className="rounded-md border px-3 py-2 text-sm bg-background"
                  placeholder="حداکثر قیمت"
                  type="number"
                  value={filters.maxPrice ?? ""}
                  onChange={(e) =>
                    setFilters((f) => ({
                      ...f,
                      maxPrice:
                        e.target.value === ""
                          ? undefined
                          : Number(e.target.value),
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
