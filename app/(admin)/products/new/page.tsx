"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductForm } from "@/app/(admin)/products/_components/ProductForm";
import { useCreateProduct } from "@/api/product/product.hooks";
import { useRouter } from "next/navigation";
import { CreateProductInput } from "@/api/product/product.types";

export default function ProductNewPage() {
  const router = useRouter();
  const { mutate, isPending } = useCreateProduct();
  const handleSubmit = (values: CreateProductInput) =>
    mutate(values, {
      onSuccess: () => router.push("/products"),
    });
  return (
    <div className="max-w-xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">افزودن محصول</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm
            mode="create"
            submitting={isPending}
            onSubmit={handleSubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
}
