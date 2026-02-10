"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Pencil, Trash2, Plus, Users } from "lucide-react";
import { useAdmins, useDeleteAdmin } from "@/api/admin/admin.hooks";
import { Admin } from "@/api/admin/admin.types";
import { useRouter } from "next/navigation";

const columns = [
  { header: "نام", accessor: (a: Admin) => `${a.firstName} ${a.lastName}` },
  { header: "نام کاربری", accessor: (a: Admin) => a.username },
  {
    header: "ایجاد",
    accessor: (a: Admin) =>
      a.createdAt ? new Date(a.createdAt).toLocaleDateString("fa-IR") : "-",
  },
];

function RowActions({ row }: { row: Admin }) {
  const router = useRouter();
  const { mutate } = useDeleteAdmin();
  return (
    <div className="flex justify-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        title="ویرایش"
        onClick={() => router.push(`/admins/${row.id}/edit`)}
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

export default function AdminsPage() {
  const { data, isLoading } = useAdmins();
  const rows: Admin[] = data?.result ?? [];

  return (
    <div className="space-y-4">
      <DataTable
        data={isLoading ? [] : rows}
        columns={columns}
        rowActions={(row) => <RowActions row={row} />}
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
