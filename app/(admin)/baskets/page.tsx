"use client";
import { DataTable } from "@/components/ui/data-table";
import { ShoppingCart } from "lucide-react";

type Basket = {
  id: string;
  customer: string;
  items: number;
  total: number;
  updatedAt: string;
};

const currency = (n: number) =>
  new Intl.NumberFormat("fa-IR").format(n) + " تومان";

const data: Basket[] = [
  {
    id: "b1",
    customer: "علی رضایی",
    items: 3,
    total: 150000,
    updatedAt: "2026-01-05",
  },
  {
    id: "b2",
    customer: "سارا ملکی",
    items: 2,
    total: 98000,
    updatedAt: "2026-01-06",
  },
  {
    id: "b3",
    customer: "مجتبی نظری",
    items: 5,
    total: 390000,
    updatedAt: "2026-01-07",
  },
];

const columns = [
  { header: "شناسه", accessor: (b: Basket) => b.id },
  { header: "مشتری", accessor: (b: Basket) => b.customer },
  { header: "اقلام", accessor: (b: Basket) => b.items },
  { header: "مجموع", accessor: (b: Basket) => currency(b.total) },
  {
    header: "به‌روزرسانی",
    accessor: (b: Basket) => new Date(b.updatedAt).toLocaleDateString("fa-IR"),
  },
];

export default function BasketsPage() {
  return (
    <div className="space-y-4">
      <DataTable
        data={data}
        columns={columns}
        caption={
          <h2 className="text-xl font-bold text-primary flex items-center gap-2">
            <ShoppingCart />
            سبدها
          </h2>
        }
      />
    </div>
  );
}
