"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryForm } from "@/app/(admin)/categories/_components/CategoryForm";
import { useCreateCategory } from "@/api/category/category.hooks";
import { useRouter } from "next/navigation";
import { CreateCategoryInput } from "@/api/category/category.types";

export default function CategoryNewPage() {
  const router = useRouter();
  const { mutate, isPending } = useCreateCategory();
  const handleSubmit = (values: CreateCategoryInput) =>
    mutate(values, {
      onSuccess: () => router.push("/categories"),
    });
  return (
    <div className="w-full max-w-2xl mx-auto px-2 md:px-4">
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-primary">افزودن دسته‌بندی</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoryForm
            mode="create"
            submitting={isPending}
            onSubmit={handleSubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
}
