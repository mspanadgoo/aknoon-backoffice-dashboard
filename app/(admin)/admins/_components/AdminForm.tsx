"use client";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CreateAdminInput } from "@/api/admin/admin.types";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function AdminForm({
  initialValues,
  onSubmit,
  submitting,
  mode = "create",
}: {
  initialValues?: Partial<CreateAdminInput>;
  onSubmit: (values: CreateAdminInput) => void;
  submitting?: boolean;
  mode?: "create" | "edit";
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateAdminInput>({
    defaultValues: {
      firstName: initialValues?.firstName ?? "",
      lastName: initialValues?.lastName ?? "",
      username: initialValues?.username ?? "",
      password: "",
    },
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        firstName: initialValues.firstName ?? "",
        lastName: initialValues.lastName ?? "",
        username: initialValues.username ?? "",
        password: "",
      });
    }
  }, [initialValues, reset]);

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="firstName">نام</Label>
        <Input
          id="firstName"
          {...register("firstName", { required: "نام الزامی است" })}
          placeholder="نام"
        />
        {errors.firstName && (
          <p className="text-sm text-red-500">{errors.firstName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="lastName">نام خانوادگی</Label>
        <Input
          id="lastName"
          {...register("lastName", { required: "نام خانوادگی الزامی است" })}
          placeholder="نام خانوادگی"
        />
        {errors.lastName && (
          <p className="text-sm text-red-500">{errors.lastName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="username">نام کاربری</Label>
        <Input
          id="username"
          dir="ltr"
          className="text-left placeholder:text-right"
          autoCapitalize="none"
          autoCorrect="off"
          autoComplete="username"
          {...register("username", {
            required: "نام کاربری الزامی است",
            pattern: {
              value: /^[A-Za-z0-9_.-]+$/,
              message: "نام کاربری باید انگلیسی و بدون حروف فارسی باشد",
            },
          })}
          placeholder="نام کاربری"
        />
        {errors.username && (
          <p className="text-sm text-red-500">{errors.username.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">
          {mode === "create" ? "رمز عبور" : "رمز عبور (اختیاری)"}
        </Label>
        <PasswordField
          id="password"
          mode={mode}
          registerPassword={register("password", {
            required: mode === "create" ? "رمز عبور الزامی است" : false,
            validate: (v) =>
              !v || /^[\x20-\x7E]+$/.test(v) || "رمز عبور باید انگلیسی باشد",
          })}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
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

function PasswordField({
  id,
  mode,
  registerPassword,
}: {
  id: string;
  mode: "create" | "edit";
  registerPassword: UseFormRegisterReturn;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Input
        id={id}
        type={show ? "text" : "password"}
        dir="ltr"
        className="text-left pr-10 placeholder:text-right"
        autoCapitalize="none"
        autoCorrect="off"
        autoComplete={mode === "create" ? "new-password" : "new-password"}
        {...registerPassword}
        placeholder="رمز عبور"
      />
      <button
        type="button"
        className="absolute inset-y-0 right-2 flex items-center px-2 text-muted-foreground"
        onClick={() => setShow((v) => !v)}
        aria-label={show ? "پنهان کردن رمز" : "نمایش رمز"}
        title={show ? "پنهان کردن رمز" : "نمایش رمز"}
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
