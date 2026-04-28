"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, items } = useCart();
  const isPlaceholderImage = product.image.endsWith(".svg");
  const isInCart = items.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    if (!product.inStock || isInCart) return;

    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      quantity: 1,
      stock: product.stock,
      image: product.image,
      category: product.category,
    });
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_18px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(15,23,42,0.12)] sm:rounded-3xl">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative h-32 overflow-hidden bg-gradient-to-br from-slate-100 via-slate-50 to-sky-100/60 sm:h-40 lg:h-48">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={`transition duration-500 group-hover:scale-110 ${
              isPlaceholderImage ? "object-contain p-4 sm:p-6 lg:p-8" : "object-cover"
            }`}
            priority={false}
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent" />

          <div className="absolute left-2 top-2 inline-flex items-center rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-700 backdrop-blur sm:left-3 sm:top-3 sm:px-3 sm:text-[11px]">
            {product.category}
          </div>

          <div className="absolute bottom-2 right-2 rounded-full bg-slate-900/80 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur sm:bottom-3 sm:right-3 sm:px-3 sm:text-[11px]">
            {product.inStock ? "Ready to Ship" : "Sold Out"}
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col space-y-2 p-3 sm:space-y-3 sm:p-4 lg:space-y-4 lg:p-5">
        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-slate-900 transition group-hover:text-brand-700 sm:text-base lg:text-lg">
            {product.name}
          </h3>
        </Link>

        <p className="line-clamp-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
          {product.description}
        </p>

        <div className="flex items-end justify-between border-t border-slate-200 pt-2 sm:pt-3">
          <p className="text-base font-bold tracking-tight text-slate-900 sm:text-xl lg:text-2xl">
            {formatCurrency(product.price)}
          </p>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold sm:px-2.5 sm:py-1 sm:text-xs ${
              product.inStock ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
            }`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <div className="mt-auto pt-1">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!product.inStock || isInCart}
            className="w-full rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 disabled:cursor-not-allowed disabled:bg-slate-300 sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-sm"
          >
            {!product.inStock ? "Unavailable" : isInCart ? "Already in Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
}
