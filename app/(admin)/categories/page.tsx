"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Pencil, Trash2, Plus } from "lucide-react";

type Category = {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
};

const data: Category[] = [
  {
    id: "1",
    title: "نان و باگت",
    slug: "bread-baguette",
    createdAt: "2025-12-01",
  },
  { id: "2", title: "شیرینی خشک", slug: "cookies", createdAt: "2025-12-05" },
  {
    id: "3",
    title: "کیک و تارت",
    slug: "cakes-tarts",
    createdAt: "2025-12-10",
  },
];

const columns = [
  { header: "عنوان", accessor: (c: Category) => c.title },
  { header: "اسلاگ", accessor: (c: Category) => c.slug },
  {
    header: "ایجاد",
    accessor: (c: Category) =>
      new Date(c.createdAt).toLocaleDateString("fa-IR"),
  },
];

function RowActions(row: Category) {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" title="ویرایش">
        <Pencil />
      </Button>
      <Button variant="ghost" size="icon" title="حذف">
        <Trash2 />
      </Button>
    </div>
  );
}

export default function CategoriesPage() {
  return (
    <div className="space-y-4">
      <DataTable
        data={data}
        columns={columns}
        rowActions={RowActions}
        caption={
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-primary">دسته‌بندی‌ها</h2>
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
