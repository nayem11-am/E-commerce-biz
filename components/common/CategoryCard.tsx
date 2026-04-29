"use client";

import Image from "next/image";
import Link from "next/link";

interface CategoryCardItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
}

interface CategoryCardProps {
  category: CategoryCardItem;
  productCount: number;
}

export function CategoryCard({ category, productCount }: CategoryCardProps) {
  const isPlaceholderImage = category.image.endsWith(".svg");

  return (
    <Link
      href={`/category/${category.slug}`}
      className="group block overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(15,23,42,0.14)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-slate-100 via-slate-50 to-sky-100/60">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={`transition duration-500 group-hover:scale-110 ${
            isPlaceholderImage ? "object-contain p-8" : "object-cover"
          }`}
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent" />

        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-slate-800 backdrop-blur">
          {productCount} items
        </span>

        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="text-lg font-semibold leading-tight text-white transition group-hover:text-sky-100">
            {category.name}
          </h3>
        </div>
      </div>

      <div className="p-4">
        <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">{category.description}</p>
      </div>
    </Link>
  );
}
