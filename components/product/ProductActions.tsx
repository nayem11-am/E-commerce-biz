"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/types/product";

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const router = useRouter();
  const { addItem, items } = useCart();
  const [quantity, setQuantity] = useState(1);

  const stockLimit = Math.max(0, Math.floor(product.stock));
  const canPurchase = product.inStock && stockLimit > 0;
  const isInCart = items.some((item) => item.id === product.id);

  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));
  const increaseQuantity = () => setQuantity((prev) => Math.min(stockLimit, prev + 1));

  const addToCart = () => {
    if (!canPurchase || isInCart) return;

    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      quantity,
      stock: stockLimit,
      image: product.image,
      category: product.category,
    });
  };

  const buyNow = () => {
    if (!canPurchase) return;

    if (!isInCart) {
      addToCart();
    }
    router.push("/checkout");
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-sm font-medium text-zinc-400">Quantity</p>
        <div className="inline-flex items-center overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900">
          <button
            type="button"
            onClick={decreaseQuantity}
            className="h-11 w-11 text-lg font-semibold text-zinc-300 transition hover:bg-zinc-800"
            aria-label="Decrease quantity"
            disabled={!canPurchase || isInCart}
          >
            -
          </button>
          <div className="flex h-11 w-12 items-center justify-center border-x border-zinc-700 text-sm font-semibold text-white">
            {quantity}
          </div>
          <button
            type="button"
            onClick={increaseQuantity}
            className="h-11 w-11 text-lg font-semibold text-zinc-300 transition hover:bg-zinc-800"
            aria-label="Increase quantity"
            disabled={!canPurchase || isInCart}
          >
            +
          </button>
        </div>
        {!isInCart && canPurchase ? (
          <p className="mt-2 text-xs text-zinc-500">Available stock: {stockLimit}</p>
        ) : null}
        {isInCart ? (
          <p className="mt-2 text-xs text-zinc-500">
            This product is already in cart. Change quantity from cart page.
          </p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={addToCart}
          disabled={!canPurchase || isInCart}
          className="rounded-xl border border-zinc-700 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:border-zinc-800 disabled:text-zinc-600"
        >
          {isInCart ? "Already in Cart" : "Add to Cart"}
        </button>
        <button
          type="button"
          onClick={buyNow}
          disabled={!canPurchase}
          className="premium-button rounded-xl px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
