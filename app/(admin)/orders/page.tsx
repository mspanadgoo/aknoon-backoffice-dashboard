 "use client";
import { DataTable } from "@/components/ui/data-table";

type Order = {
  id: string;
  customer: string;
  total: number;
  status: "پرداخت‌شده" | "در انتظار" | "لغو‌شده";
  createdAt: string;
};

const currency = (n: number) =>
  new Intl.NumberFormat("fa-IR").format(n) + " تومان";

const data: Order[] = [
  { id: "o1", customer: "رضا محمدی", total: 320000, status: "پرداخت‌شده", createdAt: "2026-01-05" },
  { id: "o2", customer: "مریم قاسمی", total: 185000, status: "در انتظار", createdAt: "2026-01-06" },
  { id: "o3", customer: "نیما احمدی", total: 450000, status: "لغو‌شده", createdAt: "2026-01-07" },
];

const columns = [
  { header: "شماره", accessor: (o: Order) => o.id },
  { header: "مشتری", accessor: (o: Order) => o.customer },
  { header: "مجموع", accessor: (o: Order) => currency(o.total) },
  { header: "وضعیت", accessor: (o: Order) => o.status },
  { header: "ایجاد", accessor: (o: Order) => new Date(o.createdAt).toLocaleDateString("fa-IR") },
];

export default function OrdersPage() {
  return (
    <div className="space-y-4">
      <DataTable
        data={data}
        columns={columns}
        caption={<h2 className="text-xl font-bold text-primary">سفارش‌ها</h2>}
      />
    </div>
  );
}
