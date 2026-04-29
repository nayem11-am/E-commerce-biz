import Image from "next/image";
import Link from "next/link";
import { CategoryCard } from "@/components/common/CategoryCard";
import { Container } from "@/components/common/Container";
import { AnimatedProductGrid } from "@/components/common/AnimatedProductGrid";
import { ScrollToTopOnReload } from "@/components/common/ScrollToTopOnReload";
import { allProducts } from "@/lib/constants/catalogData";
import { featuredProducts, homeCategories } from "@/lib/constants/homeData";

export default function HomePage() {
  const productCountByCategory = allProducts.reduce<Record<string, number>>((acc, product) => {
    acc[product.categorySlug] = (acc[product.categorySlug] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-14 py-8 sm:space-y-16 sm:py-10 lg:space-y-20 lg:py-12">
      <ScrollToTopOnReload />
      <section>
        <Container>
          <div className="grid items-center gap-8 overflow-hidden rounded-2xl border border-slate-300/70 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300 px-5 py-10 text-slate-900 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:px-8 sm:py-12 lg:grid-cols-2 lg:px-12">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-rose-700">
                Cash on Delivery Available
              </p>
              <h1 className="max-w-xl bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-4xl font-bold leading-[1.08] tracking-[-0.025em] text-transparent sm:text-5xl lg:text-6xl">
                Discover Top Picks Across Every Category
              </h1>
              <p className="mt-4 max-w-lg text-sm text-slate-700 sm:text-base">
                Shop fashion, electronics, beauty, and home essentials in one place with
                a fast and clean buying experience.
              </p>
              <div className="mt-6">
                <Link
                  href="/shop"
                  className="premium-button inline-flex items-center gap-2 border border-slate-300 px-5 py-2.5 text-sm font-semibold !text-white shadow-[0_8px_20px_rgba(15,23,42,0.18)] hover:!text-white"
                >
                  Explore Shop
                  <span aria-hidden="true">-&gt;</span>
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white/20 p-6 backdrop-blur-sm">
                <Image
                  src="/home-image.webp"
                  alt="Stylish shopping hero visual"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="shop-section" className="rounded-2xl bg-slate-100/70 py-4">
        <Container>
          <div className="mb-6 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-3xl font-bold tracking-[-0.015em] text-slate-900 sm:text-4xl">Shop by Category</h2>
              <p className="mt-1 text-sm text-slate-600">
                Browse curated collections tailored to your needs.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {homeCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                productCount={productCountByCategory[category.slug] ?? 0}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="rounded-2xl bg-slate-50/70 py-4">
        <Container>
          <div className="mb-6 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-3xl font-bold tracking-[-0.015em] text-slate-900 sm:text-4xl">Featured Products</h2>
              <p className="mt-1 text-sm text-slate-600">
                Handpicked products popular with our shoppers.
              </p>
            </div>
            <Link
              href="/shop"
              className="text-sm font-semibold text-brand-700 transition hover:text-brand-500"
            >
              View all
            </Link>
          </div>

          <AnimatedProductGrid
            products={featuredProducts}
            className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6"
          />
        </Container>
      </section>
    </div>
  );
}
