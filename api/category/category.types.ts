export type Category = {
  id: string;
  name: string;
  active: boolean;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type CreateCategoryInput = {
  name: string;
  active: boolean;
};

export type UpdateCategoryInput = Partial<CreateCategoryInput>;

export type ListCategoriesParams = {
  page?: number;
  pageSize?: number;
  name?: string;
  active?: boolean;
  sortName?: 1 | -1;
  sortCreatedAt?: 1 | -1;
};

export type ListCategoriesResponse = {
  statusCode?: number;
  message?: string;
  data?: { result: Category[]; count: number };
};
