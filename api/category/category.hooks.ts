import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCategory, deleteCategory, getCategory, listCategories, updateCategory } from "./category.api";
import { CreateCategoryInput, ListCategoriesParams, UpdateCategoryInput } from "./category.types";
import { useToast } from "@/hooks/toast";

export function useCategories(params: ListCategoriesParams = {}) {
  return useQuery({
    queryKey: ["categories", params],
    queryFn: () => listCategories(params),
  });
}

export function useCategory(id: string) {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategory(id),
    enabled: !!id,
  });
}

export function useCreateCategory() {
  const qc = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (input: CreateCategoryInput) => createCategory(input),
    onSuccess: () => {
      toast.success("دسته‌بندی با موفقیت ایجاد شد");
      qc.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      toast.error("ایجاد دسته‌بندی ناموفق بود");
    },
  });
}

export function useUpdateCategory(id: string) {
  const qc = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (input: UpdateCategoryInput) => updateCategory(id, input),
    onSuccess: () => {
      toast.success("دسته‌بندی با موفقیت به‌روزرسانی شد");
      qc.invalidateQueries({ queryKey: ["categories"] });
      qc.invalidateQueries({ queryKey: ["category", id] });
    },
    onError: () => {
      toast.error("به‌روزرسانی دسته‌بندی ناموفق بود");
    },
  });
}

export function useDeleteCategory() {
  const qc = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      toast.success("حذف دسته‌بندی با موفقیت انجام شد");
      qc.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      toast.error("حذف دسته‌بندی ناموفق بود");
    },
  });
}
