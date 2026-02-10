export type Product = {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  active: boolean;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type CreateProductInput = {
  name: string;
  price: number;
  categoryId: string;
  active: boolean;
};

export type UpdateProductInput = Partial<CreateProductInput>;

export type ListProductsParams = {
  page?: number;
  pageSize?: number;
  name?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  active?: boolean;
  sortName?: 1 | -1;
  sortPrice?: 1 | -1;
  sortCreatedAt?: 1 | -1;
  sortUpdatedAt?: 1 | -1;
};

export type ListProductsResponse = {
  statusCode?: number;
  message?: string;
  data?: { result: Product[]; count: number };
};
