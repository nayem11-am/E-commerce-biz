import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { ShopCatalog } from "@/components/shop/ShopCatalog";
import { allProducts, productCategories } from "@/lib/constants/catalogData";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse all products and filter by category.",
};

export default function ShopPage() {
  return (
    <section className="py-10 sm:py-12">
      <Container>
        <div className="mb-7">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Shop Products
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
            Explore our catalog and filter products by category. Click any product card to
            view details.
          </p>
        </div>

        <ShopCatalog categories={productCategories} products={allProducts} />
      </Container>
    </section>
  );
}
