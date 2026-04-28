"use client";

import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import type { CartItem as CartItemType } from "@/types/cart";

interface CartItemProps {
  item: CartItemType;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export function CartItem({ item, onIncrease, onDecrease, onRemove }: CartItemProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:w-28">
          <Image
            src={item.image ?? "/file.svg"}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, 112px"
            className="object-contain p-4"
          />
        </div>

        <div className="flex-1 space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {item.category ?? "General"}
          </p>
          <Link href={`/product/${item.slug}`} className="block">
            <h3 className="text-base font-semibold text-slate-900 transition hover:text-brand-700">
              {item.name}
            </h3>
          </Link>
          <p className="text-sm text-slate-600">{formatCurrency(item.price)} each</p>
        </div>

        <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
          <div className="inline-flex items-center overflow-hidden rounded-xl border border-slate-300">
            <button
              type="button"
              onClick={onDecrease}
              className="h-9 w-9 text-base font-semibold text-slate-700 transition hover:bg-slate-100"
              aria-label={`Decrease quantity of ${item.name}`}
            >
              -
            </button>
            <span className="flex h-9 w-10 items-center justify-center border-x border-slate-300 text-sm font-semibold text-slate-900">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={onIncrease}
              className="h-9 w-9 text-base font-semibold text-slate-700 transition hover:bg-slate-100"
              aria-label={`Increase quantity of ${item.name}`}
            >
              +
            </button>
          </div>

          <div className="text-right">
            <p className="text-sm text-slate-500">Line total</p>
            <p className="text-base font-semibold text-slate-900">
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

