"use client";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CreateProductInput } from "@/api/product/product.types";
import { useCategories } from "@/api/category/category.hooks";
import { Category } from "@/api/category/category.types";

export function ProductForm({
  initialValues,
  onSubmit,
  submitting,
  mode = "create",
}: {
  initialValues?: Partial<CreateProductInput>;
  onSubmit: (values: CreateProductInput) => void;
  submitting?: boolean;
  mode?: "create" | "edit";
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductInput>({
    defaultValues: {
      name: initialValues?.name ?? "",
      price: initialValues?.price ?? 0,
      categoryId: initialValues?.categoryId ?? "",
      active: initialValues?.active ?? true,
    },
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="name">نام محصول</Label>
        <Input
          id="name"
          {...register("name", { required: "نام محصول الزامی است" })}
          placeholder="نام محصول"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">قیمت</Label>
        <Input
          id="price"
          type="number"
          step="1"
          {...register("price", {
            required: "قیمت الزامی است",
            valueAsNumber: true,
            min: { value: 0, message: "قیمت نباید منفی باشد" },
          })}
          placeholder="قیمت"
        />
        {errors.price && (
          <p className="text-sm text-red-500">{errors.price.message}</p>
        )}
      </div>

      <CategorySelect
        registerCategory={register("categoryId", {
          required: "انتخاب دسته‌بندی الزامی است",
        })}
        error={errors.categoryId?.message}
        selected={initialValues?.categoryId}
      />

      <div className="space-y-2">
        <Label htmlFor="active">فعال</Label>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="active" {...register("active")} />
          <span className="text-sm">فعال بودن محصول</span>
        </div>
      </div>

      <Button
        className="w-full bg-amber-600 hover:bg-amber-700"
        disabled={submitting}
      >
        {submitting ? "در حال ارسال..." : mode === "create" ? "ثبت" : "ذخیره"}
      </Button>
    </form>
  );
}

function CategorySelect({
  registerCategory,
  error,
  selected,
}: {
  registerCategory: UseFormRegisterReturn;
  error?: string;
  selected?: string;
}) {
  const { data, isLoading } = useCategories({ pageSize: 100 });
  const list: Category[] = data?.result ?? [];
  return (
    <div className="space-y-2">
      <Label htmlFor="categoryId">دسته‌بندی</Label>
      <select
        id="categoryId"
        className="w-full h-9 px-3 py-2 rounded-md border bg-background"
        defaultValue={selected ?? ""}
        {...registerCategory}
      >
        <option value="" disabled>
          {isLoading ? "در حال بارگذاری..." : "یک دسته‌بندی را انتخاب کنید"}
        </option>
        {list.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
