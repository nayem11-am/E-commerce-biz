"use client";

import Image from "next/image";
import Link from "next/link";
import type { ChangeEvent } from "react";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import type { CartItem as CartItemType } from "@/types/cart";

interface CartItemProps {
  item: CartItemType;
  onIncrease: () => void;
  onDecrease: () => void;
  onSetQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export function CartItem({ item, onIncrease, onDecrease, onSetQuantity, onRemove }: CartItemProps) {
  const maxQuantity = typeof item.stock === "number" ? Math.max(1, Math.floor(item.stock)) : 99;

  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = Number.parseInt(event.target.value, 10);
    if (Number.isNaN(next)) return;
    onSetQuantity(Math.min(maxQuantity, Math.max(1, next)));
  };

  return (
    <article className="premium-surface p-4 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-xl bg-zinc-800 sm:w-28">
          <Image
            src={item.image ?? "/file.svg"}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, 112px"
            className="object-contain p-4"
          />
        </div>

        <div className="flex-1 space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            {item.category ?? "General"}
          </p>
          <Link href={`/product/${item.slug}`} className="block">
            <h3 className="text-base font-semibold text-white transition hover:text-zinc-300">
              {item.name}
            </h3>
          </Link>
          <p className="text-sm text-zinc-400">{formatCurrency(item.price)} each</p>
        </div>

        <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
          <div className="inline-flex items-center overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900">
            <button
              type="button"
              onClick={onDecrease}
              className="h-9 w-9 text-base font-semibold text-zinc-300 transition hover:bg-zinc-800"
              aria-label={`Decrease quantity of ${item.name}`}
            >
              -
            </button>
            <input
              type="number"
              min={1}
              max={99}
              value={item.quantity}
              onChange={handleQuantityChange}
              className="h-9 w-12 border-x border-zinc-700 bg-zinc-900 text-center text-sm font-semibold text-white outline-none"
              aria-label={`Quantity of ${item.name}`}
            />
            <button
              type="button"
              onClick={onIncrease}
              className="h-9 w-9 text-base font-semibold text-zinc-300 transition hover:bg-zinc-800"
              aria-label={`Increase quantity of ${item.name}`}
              disabled={item.quantity >= maxQuantity}
            >
              +
            </button>
          </div>

          <div className="text-right">
            <p className="text-sm text-zinc-500">Line total</p>
            <p className="text-base font-semibold text-white">
              {formatCurrency(item.price * item.quantity)}
            </p>
          </div>

          <button
            type="button"
            onClick={onRemove}
            className="text-sm font-medium text-rose-600 transition hover:text-rose-500"
          >
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}
