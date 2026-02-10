"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminForm } from "@/app/(admin)/admins/_components/AdminForm";
import { useParams, useRouter } from "next/navigation";
import { useAdmin, useUpdateAdmin } from "@/api/admin/admin.hooks";
import { CreateAdminInput } from "@/api/admin/admin.types";

export default function AdminEditPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data } = useAdmin(id);
  const { mutate, isPending } = useUpdateAdmin(id);
  const handleSubmit = (values: CreateAdminInput) =>
    mutate(values, {
      onSuccess: () => router.push("/admins"),
    });
  return (
    <div className="max-w-xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">ویرایش ادمین</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminForm
            mode="edit"
            initialValues={{
              firstName: data?.firstName,
              lastName: data?.lastName,
              username: data?.username,
            }}
            submitting={isPending}
            onSubmit={handleSubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
}
