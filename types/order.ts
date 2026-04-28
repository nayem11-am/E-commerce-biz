import type { CartItem } from "@/types/cart";

export interface OrderCustomerDetails {
  fullName: string;
  phoneNumber: string;
  address: string;
  note?: string;
}

export interface OrderSummary {
  orderId: string;
  items: CartItem[];
  totalPrice: number;
  createdAt: string;
  customer: OrderCustomerDetails;
}
