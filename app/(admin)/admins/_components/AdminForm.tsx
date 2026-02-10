 "use client";
 import { useForm } from "react-hook-form";
 import { Input } from "@/components/ui/input";
 import { Label } from "@/components/ui/label";
 import { Button } from "@/components/ui/button";
 import { CreateAdminInput } from "@/api/admin/admin.types";
 
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
   } = useForm<CreateAdminInput>({
     defaultValues: {
       firstName: initialValues?.firstName ?? "",
       lastName: initialValues?.lastName ?? "",
       username: initialValues?.username ?? "",
       password: "",
     },
   });
 
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
           {...register("username", { required: "نام کاربری الزامی است" })}
           placeholder="نام کاربری"
         />
         {errors.username && (
           <p className="text-sm text-red-500">{errors.username.message}</p>
         )}
       </div>
 
       <div className="space-y-2">
         <Label htmlFor="password">{mode === "create" ? "رمز عبور" : "رمز عبور (اختیاری)"}</Label>
         <Input
           id="password"
           type="password"
           {...register("password", {
             required: mode === "create" ? "رمز عبور الزامی است" : false,
           })}
           placeholder="رمز عبور"
         />
         {errors.password && (
           <p className="text-sm text-red-500">{errors.password.message}</p>
         )}
       </div>
 
       <Button className="w-full bg-amber-600 hover:bg-amber-700" disabled={submitting}>
         {submitting ? "در حال ارسال..." : mode === "create" ? "ثبت" : "ذخیره"}
       </Button>
     </form>
   );
 }
