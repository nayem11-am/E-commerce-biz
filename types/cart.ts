export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
}

export interface AddCartItemInput {
  id: string;
  slug: string;
  name: string;
  price: number;
  quantity?: number;
  image?: string;
  category?: string;
}

export interface CartContextValue {
  items: CartItem[];
  addItem: (item: AddCartItemInput) => void;
  removeItem: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isHydrated: boolean;
}
