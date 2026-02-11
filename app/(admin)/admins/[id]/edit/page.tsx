"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminForm } from "@/app/(admin)/admins/_components/AdminForm";
import { useParams, useRouter } from "next/navigation";
import { useAdmin, useUpdateAdmin } from "@/api/admin/admin.hooks";
import { CreateAdminInput, UpdateAdminInput } from "@/api/admin/admin.types";

export default function AdminEditPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data, isLoading } = useAdmin(id);
  const { mutate, isPending } = useUpdateAdmin(id);
  const handleSubmit = (values: CreateAdminInput) => {
    const pw = values.password?.trim();
    const payload: UpdateAdminInput = {
      firstName: values.firstName,
      lastName: values.lastName,
      username: values.username,
      ...(pw ? { password: pw } : {}),
    };
    return mutate(payload, {
      onSuccess: () => router.push("/admins"),
    });
  };
  return (
    <div className="w-full max-w-2xl mx-auto px-2 md:px-4">
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-primary">ویرایش ادمین</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <div className="h-5 w-28 bg-muted rounded animate-pulse" />
              <div className="h-10 bg-muted rounded animate-pulse" />
              <div className="h-5 w-24 bg-muted rounded animate-pulse" />
              <div className="h-10 bg-muted rounded animate-pulse" />
              <div className="h-5 w-20 bg-muted rounded animate-pulse" />
              <div className="h-10 bg-muted rounded animate-pulse" />
              <div className="h-10 w-24 bg-muted rounded animate-pulse" />
            </div>
          ) : (
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}
