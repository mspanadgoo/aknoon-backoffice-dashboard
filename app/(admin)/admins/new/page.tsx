"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminForm } from "@/app/(admin)/admins/_components/AdminForm";
import { useCreateAdmin } from "@/api/admin/admin.hooks";
import { useRouter } from "next/navigation";
import { CreateAdminInput } from "@/api/admin/admin.types";

export default function AdminNewPage() {
  const router = useRouter();
  const { mutate, isPending } = useCreateAdmin();
  const handleSubmit = (values: CreateAdminInput) =>
    mutate(values, {
      onSuccess: () => router.push("/admins"),
    });
  return (
    <div className="w-full max-w-2xl mx-auto px-2 md:px-4">
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-primary">افزودن ادمین</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminForm
            mode="create"
            submitting={isPending}
            onSubmit={handleSubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
}
