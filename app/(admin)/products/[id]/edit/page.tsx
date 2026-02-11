"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductForm } from "@/app/(admin)/products/_components/ProductForm";
import { useParams, useRouter } from "next/navigation";
import { useProduct, useUpdateProduct } from "@/api/product/product.hooks";
import {
  CreateProductInput,
  UpdateProductInput,
} from "@/api/product/product.types";

export default function ProductEditPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data, isLoading } = useProduct(id);
  const { mutate, isPending } = useUpdateProduct(id);
  const handleSubmit = (values: CreateProductInput) => {
    const payload: UpdateProductInput = {
      name: values.name,
      price: values.price,
      categoryId: values.categoryId,
      active: values.active,
    };
    return mutate(payload, {
      onSuccess: () => router.push("/products"),
    });
  };
  return (
    <div className="w-full max-w-2xl mx-auto px-2 md:px-4">
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-primary">ویرایش محصول</CardTitle>
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
            <ProductForm
              mode="edit"
              initialValues={{
                name: data?.name,
                price: data?.price,
                categoryId: data?.categoryId,
                active: data?.active,
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
