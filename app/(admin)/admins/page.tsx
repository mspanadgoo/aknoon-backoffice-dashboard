"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Pencil, Trash2, Plus, Users } from "lucide-react";

type Admin = {
  id: string;
  name: string;
  username: string;
  role: "admin" | "superadmin";
  createdAt: string;
};

const data: Admin[] = [
  { id: "a1", name: "مدیر ارشد", username: "root", role: "superadmin", createdAt: "2025-12-01" },
  { id: "a2", name: "مدیر فروش", username: "sales", role: "admin", createdAt: "2025-12-10" },
];

const columns = [
  { header: "نام", accessor: (a: Admin) => a.name },
  { header: "نام کاربری", accessor: (a: Admin) => a.username },
  { header: "نقش", accessor: (a: Admin) => (a.role === "superadmin" ? "سوپرادمین" : "ادمین") },
  { header: "ایجاد", accessor: (a: Admin) => new Date(a.createdAt).toLocaleDateString("fa-IR") },
];

function RowActions(row: Admin) {
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

export default function AdminsPage() {
  return (
    <div className="space-y-4">
      <DataTable
        data={data}
        columns={columns}
        rowActions={RowActions}
        caption={
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-primary flex items-center gap-2">
              <Users /> ادمین‌ها
            </h2>
            <Button asChild title="افزودن ادمین">
              <Link href="/admins/new">
                <Plus />
              </Link>
            </Button>
          </div>
        }
      />
    </div>
  );
}
