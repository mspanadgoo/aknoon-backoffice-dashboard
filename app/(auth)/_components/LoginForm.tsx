"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginInput } from "@/api/auth/auth.types";
import { useLogin } from "@/api/auth/auth.hooks";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/toast";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function LoginForm() {
  type LoginResponse = { user?: { id?: string; name?: string; role?: string } };
  const router = useRouter();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();

  const { mutate, isPending, error } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: LoginInput) =>
    mutate(data, {
      onSuccess: (res: LoginResponse) => {
        try {
          const name = res?.user?.name ?? "";
          if (typeof window !== "undefined" && name) {
            localStorage.setItem("user_name", name);
          }
        } catch {}
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
          dir="ltr"
          className="text-left placeholder:text-right"
          autoCapitalize="none"
          autoCorrect="off"
          inputMode="text"
          autoComplete="username"
          {...register("username", {
            required: "نام کاربری الزامی است",
            pattern: {
              value: /^[A-Za-z0-9_.-]+$/,
              message: "نام کاربری باید انگلیسی و بدون حروف فارسی باشد",
            },
          })}
          placeholder="نام کاربری خود را وارد کنید"
        />
        {errors.username && (
          <p className="text-sm text-red-500">{errors.username.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">رمز عبور</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            dir="ltr"
            className="text-left pr-10 placeholder:text-right"
            autoCapitalize="none"
            autoCorrect="off"
            autoComplete="current-password"
            {...register("password", {
              required: "رمز عبور الزامی است",
            })}
            placeholder="رمز عبور خود را وارد کنید"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-2 flex items-center px-2 text-muted-foreground"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "پنهان کردن رمز" : "نمایش رمز"}
            title={showPassword ? "پنهان کردن رمز" : "نمایش رمز"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
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
        className="w-full bg-primary hover:bg-primary/90"
        disabled={isPending}
      >
        {isPending ? "در حال ورود..." : "ورود"}
      </Button>
    </form>
  );
}
