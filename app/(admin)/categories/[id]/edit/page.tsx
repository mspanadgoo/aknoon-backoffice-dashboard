"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BackButton } from "@/components/ui/back-button";
import { CategoryForm } from "@/app/(admin)/categories/_components/CategoryForm";
import { useCategory, useUpdateCategory } from "@/api/category/category.hooks";
import { useParams, useRouter } from "next/navigation";
import { CreateCategoryInput } from "@/api/category/category.types";

export default function CategoryEditPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data } = useCategory(id);
  const { mutate, isPending } = useUpdateCategory(id);
  const handleSubmit = (values: CreateCategoryInput) =>
    mutate(values, {
      onSuccess: () => router.push("/categories"),
    });
  return (
    <div className="max-w-xl">
      <BackButton />
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">ویرایش دسته‌بندی</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoryForm
            mode="edit"
            initialValues={{ name: data?.name, active: data?.active }}
            submitting={isPending}
            onSubmit={handleSubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
}
