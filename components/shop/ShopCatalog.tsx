"use client";

import { useMemo, useState } from "react";
import { AnimatedProductGrid } from "@/components/common/AnimatedProductGrid";
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
              className={`rounded-full border px-4 py-2 text-sm font-medium transition duration-300 ${
                isActive
                  ? "border-red-600 bg-red-600 text-white"
                  : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:-translate-y-0.5 hover:border-zinc-700 hover:text-white"
              }`}
            >
              {option.name}
            </button>
          );
        })}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="premium-surface border-dashed border-zinc-800 p-10 text-center">
          <p className="text-zinc-400">No products found for this category.</p>
        </div>
      ) : (
        <AnimatedProductGrid
          key={activeCategory}
          products={filteredProducts}
          className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6"
        />
      )}
    </div>
  );
}
