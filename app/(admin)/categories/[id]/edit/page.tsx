"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryForm } from "@/app/(admin)/categories/_components/CategoryForm";
import { useCategory, useUpdateCategory } from "@/api/category/category.hooks";
import { useParams, useRouter } from "next/navigation";
import { CreateCategoryInput } from "@/api/category/category.types";

export default function CategoryEditPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data, isLoading } = useCategory(id);
  const { mutate, isPending } = useUpdateCategory(id);
  const handleSubmit = (values: CreateCategoryInput) =>
    mutate(values, {
      onSuccess: () => router.push("/categories"),
    });
  return (
    <div className="w-full max-w-2xl mx-auto px-2 md:px-4">
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-primary">ویرایش دسته‌بندی</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <div className="h-5 w-28 bg-muted rounded animate-pulse" />
              <div className="h-10 bg-muted rounded animate-pulse" />
              <div className="h-5 w-24 bg-muted rounded animate-pulse" />
              <div className="h-10 bg-muted rounded animate-pulse" />
              <div className="h-10 w-24 bg-muted rounded animate-pulse" />
            </div>
          ) : (
            <CategoryForm
              mode="edit"
              initialValues={{ name: data?.name, active: data?.active }}
              submitting={isPending}
              onSubmit={handleSubmit}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
