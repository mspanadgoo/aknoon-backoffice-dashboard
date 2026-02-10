"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Pencil, Trash2, Plus, Package } from "lucide-react";
import { useProducts, useDeleteProduct } from "@/api/product/product.hooks";
import { Product } from "@/api/product/product.types";
import { useRouter } from "next/navigation";

const currency = (n: number) =>
  new Intl.NumberFormat("fa-IR").format(n) + " تومان";

const columns = [
  { header: "عنوان", accessor: (p: Product) => p.name },
  { header: "شناسه دسته", accessor: (p: Product) => p.categoryId },
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

function RowActions(row: Product) {
  const router = useRouter();
  const { mutate } = useDeleteProduct();
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
        onClick={() => mutate(row.id)}
      >
        <Trash2 />
      </Button>
    </div>
  );
}

export default function ProductsPage() {
  const { data, isLoading } = useProducts();
  const rows: Product[] = data?.result ?? [];

  return (
    <div className="space-y-4">
      <DataTable
        data={isLoading ? [] : rows}
        columns={columns}
        rowActions={(row) => <RowActions {...row} />}
        caption={
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
        }
      />
    </div>
  );
}
