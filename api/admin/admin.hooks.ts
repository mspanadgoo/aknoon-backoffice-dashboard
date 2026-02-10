 import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
 import { createAdmin, deleteAdmin, getAdmin, listAdmins, updateAdmin } from "./admin.api";
 import { CreateAdminInput, ListAdminsParams, UpdateAdminInput } from "./admin.types";
 import { useToast } from "@/hooks/toast";
 
 export function useAdmins(params: ListAdminsParams = {}) {
   return useQuery({
     queryKey: ["admins", params],
     queryFn: () => listAdmins(params),
   });
 }
 
 export function useAdmin(id: string) {
   return useQuery({
     queryKey: ["admin", id],
     queryFn: () => getAdmin(id),
     enabled: !!id,
   });
 }
 
 export function useCreateAdmin() {
   const qc = useQueryClient();
   const toast = useToast();
   return useMutation({
     mutationFn: (input: CreateAdminInput) => createAdmin(input),
     onSuccess: () => {
       toast.success("ادمین با موفقیت ایجاد شد");
       qc.invalidateQueries({ queryKey: ["admins"] });
     },
     onError: () => {
       toast.error("ایجاد ادمین ناموفق بود");
     },
   });
 }
 
 export function useUpdateAdmin(id: string) {
   const qc = useQueryClient();
   const toast = useToast();
   return useMutation({
     mutationFn: (input: UpdateAdminInput) => updateAdmin(id, input),
     onSuccess: () => {
       toast.success("ویرایش با موفقیت انجام شد");
       qc.invalidateQueries({ queryKey: ["admin", id] });
       qc.invalidateQueries({ queryKey: ["admins"] });
     },
     onError: () => {
       toast.error("ویرایش ناموفق بود");
     },
   });
 }
 
 export function useDeleteAdmin() {
   const qc = useQueryClient();
   const toast = useToast();
   return useMutation({
     mutationFn: (id: string) => deleteAdmin(id),
     onSuccess: () => {
       toast.success("حذف با موفقیت انجام شد");
       qc.invalidateQueries({ queryKey: ["admins"] });
     },
     onError: () => {
       toast.error("حذف ناموفق بود");
     },
   });
 }
