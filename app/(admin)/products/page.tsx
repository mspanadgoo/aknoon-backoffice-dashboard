"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Pencil, Trash2, Plus, Package } from "lucide-react";

type Product = {
  id: string;
  title: string;
  sku: string;
  price: number;
  stock: number;
  createdAt: string;
};

const data: Product[] = [
  {
    id: "p1",
    title: "کوکی شکلاتی",
    sku: "CK-CHOCO",
    price: 85000,
    stock: 120,
    createdAt: "2026-01-03",
  },
  {
    id: "p2",
    title: "کراسان کره‌ای",
    sku: "CR-BUTTER",
    price: 65000,
    stock: 90,
    createdAt: "2026-01-05",
  },
  {
    id: "p3",
    title: "نان سیر",
    sku: "BR-GARLIC",
    price: 45000,
    stock: 50,
    createdAt: "2026-01-06",
  },
];

const currency = (n: number) =>
  new Intl.NumberFormat("fa-IR").format(n) + " تومان";

const columns = [
  { header: "عنوان", accessor: (p: Product) => p.title },
  { header: "کد", accessor: (p: Product) => p.sku },
  { header: "قیمت", accessor: (p: Product) => currency(p.price) },
  { header: "انبار", accessor: (p: Product) => p.stock },
  {
    header: "ایجاد",
    accessor: (p: Product) => new Date(p.createdAt).toLocaleDateString("fa-IR"),
  },
];

function RowActions(row: Product) {
  return (
    <div className="flex justify-center gap-2">
      <Button variant="ghost" size="icon" title="ویرایش">
        <Pencil />
      </Button>
      <Button variant="ghost" size="icon" title="حذف">
        <Trash2 />
      </Button>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="space-y-4">
      <DataTable
        data={data}
        columns={columns}
        rowActions={RowActions}
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
