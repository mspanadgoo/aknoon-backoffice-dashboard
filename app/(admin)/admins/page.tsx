"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Pencil, Trash2, Plus, Users } from "lucide-react";
import { useAdmins, useDeleteAdmin } from "@/api/admin/admin.hooks";
import { Admin, ListAdminsParams } from "@/api/admin/admin.types";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  const [filters, setFilters] = useState<ListAdminsParams>({});
  const { data, isLoading } = useAdmins(filters);
  const rows: Admin[] = data?.result ?? [];

  return (
    <div className="space-y-4">
      <DataTable
        data={isLoading ? [] : rows}
        columns={columns}
        rowActions={(row) => <RowActions row={row} />}
        caption={
          <div className="space-y-3">
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
            <div className="rounded-lg border p-3">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
                <input
                  className="rounded-md border px-3 py-2 text-sm bg-background"
                  placeholder="جستجو نام/نام‌خانوادگی"
                  value={filters.name ?? ""}
                  onChange={(e) =>
                    setFilters((f) => ({
                      ...f,
                      name: e.target.value || undefined,
                    }))
                  }
                />
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
