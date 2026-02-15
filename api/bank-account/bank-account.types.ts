export type BankAccount = {
  id: string;
  cardNumber: string;
  ownerName: string;
  active: boolean;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type CreateBankAccountInput = {
  cardNumber: string;
  ownerName: string;
  active: boolean;
};

export type UpdateBankAccountInput = Partial<CreateBankAccountInput>;

export type ListBankAccountsParams = {
  page?: number;
  pageSize?: number;
  ownerName?: string;
  cardNumber?: string;
  active?: "true" | "false";
  sortOwnerName?: 1 | -1;
  sortCreatedAt?: 1 | -1;
};

export type ListBankAccountsResponse = {
  statusCode?: number;
  message?: string;
  data?: { result: BankAccount[]; count: number };
};
