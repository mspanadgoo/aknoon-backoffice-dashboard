"use client";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CreateBankAccountInput } from "@/api/bank-account/bank-account.types";
import { useEffect } from "react";
import { PatternFormat } from "react-number-format";
import { digitsFaToEn } from "@persian-tools/persian-tools";

export function BankAccountForm({
  initialValues,
  onSubmit,
  submitting,
  mode = "create",
}: {
  initialValues?: Partial<CreateBankAccountInput>;
  onSubmit: (values: CreateBankAccountInput) => void;
  submitting?: boolean;
  mode?: "create" | "edit";
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<CreateBankAccountInput>({
    defaultValues: {
      cardNumber: initialValues?.cardNumber ?? "",
      ownerName: initialValues?.ownerName ?? "",
      active: initialValues?.active ?? false,
    },
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        cardNumber: initialValues.cardNumber ?? "",
        ownerName: initialValues.ownerName ?? "",
        active: initialValues.active ?? false,
      });
    }
  }, [initialValues, reset]);

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="ownerName">نام صاحب حساب</Label>
        <Input
          id="ownerName"
          {...register("ownerName", { required: "نام صاحب حساب الزامی است" })}
          placeholder="مثال: علی رضایی"
        />
        {errors.ownerName && (
          <p className="text-sm text-red-500">{errors.ownerName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="cardNumber">شماره کارت</Label>
        <Controller
          name="cardNumber"
          control={control}
          rules={{ required: "شماره کارت الزامی است" }}
          render={({ field }) => (
            <PatternFormat
              id="cardNumber"
              format="#### #### #### ####"
              allowEmptyFormatting
              mask="_"
              inputMode="numeric"
              dir="ltr"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-left placeholder:text-right"
              placeholder="مثال: 6219 8610 1234 5678"
              value={digitsFaToEn((field.value as string) ?? "")}
              onValueChange={(values) => {
                field.onChange(digitsFaToEn(values.value));
              }}
            />
          )}
        />
        {errors.cardNumber && (
          <p className="text-sm text-red-500">{errors.cardNumber.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="active">فعال</Label>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="active" {...register("active")} />
          <span className="text-sm">فعال بودن حساب</span>
        </div>
      </div>

      <Button
        className="w-full bg-primary hover:bg-primary/90"
        disabled={submitting}
      >
        {submitting ? "در حال ارسال..." : mode === "create" ? "ثبت" : "ذخیره"}
      </Button>
    </form>
  );
}
