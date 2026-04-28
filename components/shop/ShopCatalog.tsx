"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/common/ProductCard";
import type { ProductCategory } from "@/lib/constants/catalogData";
import type { Product } from "@/types/product";

interface ShopCatalogProps {
  categories: ProductCategory[];
  products: Product[];
  initialCategorySlug?: string;
}

export function ShopCatalog({
  categories,
  products,
  initialCategorySlug = "all",
}: ShopCatalogProps) {
  const safeInitialCategory =
    initialCategorySlug === "all" ||
    categories.some((category) => category.slug === initialCategorySlug)
      ? initialCategorySlug
      : "all";

  const [activeCategory, setActiveCategory] = useState(safeInitialCategory);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((product) => product.categorySlug === activeCategory);
  }, [activeCategory, products]);

  const filterOptions = useMemo(
    () => [{ name: "All", slug: "all" }, ...categories.map(({ name, slug }) => ({ name, slug }))],
    [categories],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((option) => {
          const isActive = option.slug === activeCategory;
          return (
            <button
              key={option.slug}
              type="button"
              onClick={() => setActiveCategory(option.slug)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "border-brand-700 bg-brand-700 text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:border-brand-500 hover:text-brand-700"
              }`}
            >
              {option.name}
            </button>
          );
        })}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-slate-600">No products found for this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
