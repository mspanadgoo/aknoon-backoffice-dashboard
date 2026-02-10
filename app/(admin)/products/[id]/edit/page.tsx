"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BackButton } from "@/components/ui/back-button";
import { ProductForm } from "@/app/(admin)/products/_components/ProductForm";
import { useParams, useRouter } from "next/navigation";
import { useProduct, useUpdateProduct } from "@/api/product/product.hooks";
import { CreateProductInput } from "@/api/product/product.types";

export default function ProductEditPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data } = useProduct(id);
  const { mutate, isPending } = useUpdateProduct(id);
  const handleSubmit = (values: CreateProductInput) =>
    mutate(values, {
      onSuccess: () => router.push("/products"),
    });
  return (
    <div className="max-w-xl">
      <BackButton />
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">ویرایش محصول</CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
}
