"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginInput } from "@/api/auth/auth.types";
import { useLogin } from "@/api/auth/auth.hooks";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/toast";

export function LoginForm() {
  const router = useRouter();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();

  const { mutate, isPending, error } = useLogin();

  const onSubmit = (data: LoginInput) =>
    mutate(data, {
      onSuccess: () => {
        toast.success("ورود موفق");
        router.replace("/dashboard");
      },
      onError: () => {
        toast.error("خطا در ورود");
      },
    });

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="username">نام کاربری</Label>
        <Input
          id="username"
          {...register("username", { required: "نام کاربری الزامی است" })}
          placeholder="نام کاربری خود را وارد کنید"
        />
        {errors.username && (
          <p className="text-sm text-red-500">{errors.username.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">رمز عبور</Label>
        <Input
          id="password"
          type="password"
          {...register("password", { required: "رمز عبور الزامی است" })}
          placeholder="رمز عبور خود را وارد کنید"
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500">
          خطا در ورود. لطفاً اطلاعات را بررسی کنید.
        </p>
      )}

      <Button
        className="w-full bg-amber-600 hover:bg-amber-700"
        disabled={isPending}
      >
        {isPending ? "در حال ورود..." : "ورود"}
      </Button>
    </form>
  );
}
