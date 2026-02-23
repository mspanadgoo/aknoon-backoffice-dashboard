export type OrderItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

export type OrderStatus =
  | "PENDING_PAYMENT"
  | "COLLECTING_ZIP"
  | "COLLECTING_ADDRESS"
  | "PENDING_CONFIRMATION"
  | "CONFIRMED"
  | "DELIVERED";

export type Order = {
  id: string;
  telegramUserId: number;
  telegramUsername: string;
  items: OrderItem[];
  totalPrice: number;
  zipCode: string;
  address: string;
  paymentImageUrl?: string;
  status: OrderStatus;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type CreateOrderInput = {
  telegramUserId: number;
  telegramUsername: string;
  items: OrderItem[];
  totalPrice: number;
  zipCode: string;
  address: string;
  paymentImageUrl?: string;
};

export type UpdateOrderInput = Partial<CreateOrderInput> & {
  status?: OrderStatus;
};

export type ListOrdersParams = {
  page?: number;
  pageSize?: number;
  telegramUsername?: string;
  telegramUserId?: number;
  minTotalPrice?: number;
  maxTotalPrice?: number;
  status?: OrderStatus;
  productName?: string;
  zipCode?: string;
  address?: string;
  sortTotalPrice?: 1 | -1;
  sortCreatedAt?: 1 | -1;
  sortStatus?: 1 | -1;
};

export type ListOrdersResponse = {
  statusCode?: number;
  message?: string;
  data?: { result: Order[]; count: number; page?: number; pageSize?: number };
};
