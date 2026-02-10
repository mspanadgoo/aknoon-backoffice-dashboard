"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Pencil, Trash2, Plus, Package } from "lucide-react";
import {
  useCategories,
  useDeleteCategory,
} from "@/api/category/category.hooks";
import { Category } from "@/api/category/category.types";
import { useRouter } from "next/navigation";

const columns = [
  { header: "عنوان", accessor: (c: Category) => c.name },
  {
    header: "فعال",
    accessor: (c: Category) => (
      <span
        className={
          c.active
            ? "px-2 py-1 text-xs rounded bg-secondary text-secondary-foreground"
            : "px-2 py-1 text-xs rounded bg-muted text-muted-foreground"
        }
      >
        {c.active ? "فعال" : "غیرفعال"}
      </span>
    ),
  },
  {
    header: "ایجاد",
    accessor: (c: Category) =>
      c.createdAt ? new Date(c.createdAt).toLocaleDateString("fa-IR") : "-",
  },
];

function RowActions({ row }: { row: Category }) {
  const router = useRouter();
  const { mutate } = useDeleteCategory();
  return (
    <div className="flex justify-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        title="ویرایش"
        onClick={() => router.push(`/categories/${row.id}/edit`)}
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

export default function CategoriesPage() {
  const { data, isLoading } = useCategories();
  const rows: Category[] = data?.result ?? [];
  return (
    <div className="space-y-4">
      <DataTable
        data={isLoading ? [] : rows}
        columns={columns}
        rowActions={(row) => <RowActions row={row} />}
        caption={
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-primary flex items-center gap-2">
              <Package />
              دسته‌بندی‌ها
            </h2>
            <Button asChild title="افزودن دسته‌بندی">
              <Link href="/categories/new">
                <Plus />
              </Link>
            </Button>
          </div>
        }
      />
    </div>
  );
}
