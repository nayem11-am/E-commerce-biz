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
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const canPurchase = product.inStock;

  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));
  const increaseQuantity = () => setQuantity((prev) => Math.min(10, prev + 1));

  const addToCart = () => {
    if (!canPurchase) return;

    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
      category: product.category,
    });
  };

  const buyNow = () => {
    if (!canPurchase) return;

    addToCart();
    router.push("/checkout");
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">Quantity</p>
        <div className="inline-flex items-center overflow-hidden rounded-xl border border-slate-300 bg-white">
          <button
            type="button"
            onClick={decreaseQuantity}
            className="h-11 w-11 text-lg font-semibold text-slate-700 transition hover:bg-slate-100"
            aria-label="Decrease quantity"
            disabled={!canPurchase}
          >
            -
          </button>
          <div className="flex h-11 w-12 items-center justify-center border-x border-slate-300 text-sm font-semibold text-slate-900">
            {quantity}
          </div>
          <button
            type="button"
            onClick={increaseQuantity}
            className="h-11 w-11 text-lg font-semibold text-slate-700 transition hover:bg-slate-100"
            aria-label="Increase quantity"
            disabled={!canPurchase}
          >
            +
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={addToCart}
          disabled={!canPurchase}
          className="rounded-xl border border-brand-700 px-5 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-50 disabled:cursor-not-allowed disabled:border-slate-300 disabled:text-slate-400"
        >
          Add to Cart
        </button>
        <button
          type="button"
          onClick={buyNow}
          disabled={!canPurchase}
          className="rounded-xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
