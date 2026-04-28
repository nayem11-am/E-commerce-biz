"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type PropsWithChildren,
} from "react";
import { readCartFromStorage, writeCartToStorage } from "@/lib/utils/cartStorage";
import type { AddCartItemInput, CartContextValue, CartItem } from "@/types/cart";

interface CartState {
  items: CartItem[];
  isHydrated: boolean;
}

type CartAction =
  | { type: "hydrate"; payload: CartItem[] }
  | { type: "add"; payload: AddCartItemInput }
  | { type: "remove"; payload: { id: string } }
  | { type: "updateQuantity"; payload: { id: string; quantity: number } }
  | { type: "clear" };

const CartContext = createContext<CartContextValue | undefined>(undefined);

function normalizeQuantity(quantity: number) {
  return Math.min(99, Math.max(1, Math.floor(quantity)));
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "hydrate":
      return { items: action.payload, isHydrated: true };
    case "add": {
      const quantity = normalizeQuantity(action.payload.quantity ?? 1);
      const existingItem = state.items.find((item) => item.id === action.payload.id);

      if (!existingItem) {
        return {
          isHydrated: state.isHydrated,
          items: [...state.items, { ...action.payload, quantity }],
        };
      }

      return {
        isHydrated: state.isHydrated,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: normalizeQuantity(item.quantity + quantity) }
            : item,
        ),
      };
    }
    case "remove":
      return {
        isHydrated: state.isHydrated,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    case "updateQuantity": {
      if (action.payload.quantity <= 0) {
        return {
          isHydrated: state.isHydrated,
          items: state.items.filter((item) => item.id !== action.payload.id),
        };
      }

      const quantity = normalizeQuantity(action.payload.quantity);
      return {
        isHydrated: state.isHydrated,
        items: state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity } : item,
        ),
      };
    }
    case "clear":
      return { items: [], isHydrated: state.isHydrated };
    default:
      return state;
  }
}

export function CartProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isHydrated: false });

  useEffect(() => {
    const storedItems = readCartFromStorage();
    dispatch({ type: "hydrate", payload: storedItems });
  }, []);

  useEffect(() => {
    if (!state.isHydrated) return;
    writeCartToStorage(state.items);
  }, [state.items, state.isHydrated]);

  const addItem = useCallback((item: AddCartItemInput) => {
    dispatch({ type: "add", payload: item });
  }, []);

  const removeItem = useCallback((id: string) => {
    dispatch({ type: "remove", payload: { id } });
  }, []);

  const updateItemQuantity = useCallback((id: string, quantity: number) => {
    dispatch({ type: "updateQuantity", payload: { id, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "clear" });
  }, []);

  const totalItems = useMemo(
    () => state.items.reduce((acc, item) => acc + item.quantity, 0),
    [state.items],
  );

  const totalPrice = useMemo(
    () => state.items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [state.items],
  );

  const value = useMemo(
    () => ({
      items: state.items,
      addItem,
      removeItem,
      updateItemQuantity,
      clearCart,
      totalItems,
      totalPrice,
      isHydrated: state.isHydrated,
    }),
    [
      state.items,
      addItem,
      removeItem,
      updateItemQuantity,
      clearCart,
      totalItems,
      totalPrice,
      state.isHydrated,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used inside CartProvider");
  }

  return context;
}
