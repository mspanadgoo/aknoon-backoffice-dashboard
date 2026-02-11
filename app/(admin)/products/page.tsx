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

const currency = (n: number) =>
  new Intl.NumberFormat("fa-IR").format(n) + " تومان";

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
  const columns = [
    { header: "عنوان", accessor: (p: Product) => p.name },
    {
      header: "دسته",
      accessor: (p: Product) => nameById.get(p.categoryId) ?? p.categoryId,
    },
    { header: "قیمت", accessor: (p: Product) => currency(p.price) },
    {
      header: "فعال",
      accessor: (p: Product) => (
        <span
          className={
            p.active
              ? "px-2 py-1 text-xs rounded bg-secondary text-secondary-foreground"
              : "px-2 py-1 text-xs rounded bg-muted text-muted-foreground"
          }
        >
          {p.active ? "فعال" : "غیرفعال"}
        </span>
      ),
    },
    {
      header: "ایجاد",
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
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
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
                  value={
                    filters.active === undefined
                      ? ""
                      : filters.active
                        ? "true"
                        : "false"
                  }
                  onChange={(e) => {
                    const v = e.target.value;
                    setFilters((f) => ({
                      ...f,
                      active:
                        v === "" ? undefined : v === "true" ? true : false,
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
