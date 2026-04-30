"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

function ProductCardBase({ product }: ProductCardProps) {
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
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-[0_14px_30px_rgba(229,9,20,0.15)]">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative h-32 overflow-hidden bg-zinc-800 sm:h-40 lg:h-48">
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

          <div className="absolute left-2 top-2 inline-flex items-center rounded-full bg-zinc-800/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-zinc-100 backdrop-blur sm:left-3 sm:top-3 sm:px-3 sm:text-[11px]">
            {product.category}
          </div>

          <div className="absolute bottom-2 right-2 rounded-full bg-red-600/80 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur sm:bottom-3 sm:right-3 sm:px-3 sm:text-[11px]">
            {product.inStock ? "Ready to Ship" : "Sold Out"}
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col space-y-2.5 p-3.5 sm:space-y-3 sm:p-4 lg:space-y-4 lg:p-5">
        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="line-clamp-2 text-sm font-bold tracking-tight text-white transition group-hover:text-red-600 sm:text-base lg:text-lg">
            {product.name}
          </h3>
        </Link>

        <p className="line-clamp-2 text-xs leading-relaxed text-zinc-400 sm:text-sm">
          {product.description}
        </p>

        <div className="flex items-end justify-between border-t border-zinc-800 pt-2 sm:pt-3">
          <p className="text-base font-extrabold tracking-tight text-white sm:text-xl lg:text-2xl">
            {formatCurrency(product.price)}
          </p>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold sm:px-2.5 sm:py-1 sm:text-xs ${
              product.inStock ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"
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
            className="w-full rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 disabled:cursor-not-allowed disabled:bg-zinc-700 sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-sm"
          >
            {!product.inStock ? "Unavailable" : isInCart ? "Already in Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
}

ProductCardBase.displayName = "ProductCard";

export const ProductCard = memo(ProductCardBase);
