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
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-slate-400 hover:text-slate-900"
              }`}
            >
              {option.name}
            </button>
          );
        })}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="premium-surface border-dashed p-10 text-center">
          <p className="text-slate-600">No products found for this category.</p>
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
