"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BackButton } from "@/components/ui/back-button";
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
    <div className="max-w-xl">
      <BackButton />
      <Card>
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
