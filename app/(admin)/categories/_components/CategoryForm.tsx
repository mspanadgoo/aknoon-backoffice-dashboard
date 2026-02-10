"use client";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CreateCategoryInput } from "@/api/category/category.types";

export function CategoryForm({
  initialValues,
  onSubmit,
  submitting,
  mode = "create",
}: {
  initialValues?: Partial<CreateCategoryInput>;
  onSubmit: (values: CreateCategoryInput) => void;
  submitting?: boolean;
  mode?: "create" | "edit";
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCategoryInput>({
    defaultValues: {
      name: initialValues?.name ?? "",
      active: initialValues?.active ?? true,
    },
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="name">عنوان</Label>
        <Input
          id="name"
          {...register("name", { required: "عنوان الزامی است" })}
          placeholder="عنوان دسته‌بندی"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="active">فعال</Label>
        <div className="flex items-center gap-2">
          <input
            id="active"
            type="checkbox"
            className="size-4"
            {...register("active")}
          />
          <span className="text-sm text-muted-foreground">
            نمایش دسته‌بندی در لیست‌ها
          </span>
        </div>
      </div>

      <Button className="w-full bg-amber-600 hover:bg-amber-700" disabled={submitting}>
        {submitting ? "در حال ارسال..." : mode === "create" ? "ثبت" : "ذخیره"}
      </Button>
    </form>
  );
}
