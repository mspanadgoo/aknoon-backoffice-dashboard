import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  getProduct,
  listProducts,
  updateProduct,
} from "./product.api";
import {
  CreateProductInput,
  ListProductsParams,
  UpdateProductInput,
} from "./product.types";
import { useToast } from "@/hooks/toast";

export function useProducts(params: ListProductsParams = {}) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => listProducts(params),
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (input: CreateProductInput) => createProduct(input),
    onSuccess: () => {
      toast.success("محصول با موفقیت ایجاد شد");
      qc.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast.error("ایجاد محصول ناموفق بود");
    },
  });
}

export function useUpdateProduct(id: string) {
  const qc = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (input: UpdateProductInput) => updateProduct(id, input),
    onSuccess: () => {
      toast.success("محصول با موفقیت به‌روزرسانی شد");
      qc.invalidateQueries({ queryKey: ["products"] });
      qc.invalidateQueries({ queryKey: ["product", id] });
    },
    onError: () => {
      toast.error("به‌روزرسانی محصول ناموفق بود");
    },
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      toast.success("حذف محصول با موفقیت انجام شد");
      qc.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast.error("حذف محصول ناموفق بود");
    },
  });
}
