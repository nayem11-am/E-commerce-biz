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
          <div className="group grid items-center gap-8 overflow-hidden rounded-3xl border border-white/5 bg-zinc-950/50 px-5 py-10 shadow-2xl backdrop-blur-md sm:px-8 sm:py-12 lg:grid-cols-2 lg:px-12">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
                Cash on Delivery Available
              </p>
              <h1 className="max-w-xl text-5xl font-extrabold leading-[1.05] tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-500 sm:text-6xl lg:text-[4.5rem]">
                Discover Top Picks Across Every Category
              </h1>
              <p className="mt-4 max-w-lg text-sm text-zinc-400 sm:text-base">
                Shop fashion, electronics, beauty, and home essentials in one place with
                a fast and clean buying experience.
              </p>
              <div className="mt-6">
                <Link
                  href="/shop"
                  className="premium-button inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white"
                >
                  Explore Shop
                  <span aria-hidden="true">-&gt;</span>
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md lg:max-w-none transition-transform duration-700 ease-out group-hover:scale-[1.02]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-900 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.8)] ring-1 ring-white/10 md:shadow-[0_0_80px_rgba(229,9,20,0.15)]">
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

      <section id="shop-section" className="py-4">
        <Container>
          <div className="mb-6 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tighter text-white sm:text-4xl">Shop by Category</h2>
              <p className="mt-2 text-sm text-zinc-400">
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

      <section className="py-4">
        <Container>
          <div className="mb-6 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tighter text-white sm:text-4xl">Featured Products</h2>
              <p className="mt-2 text-sm text-zinc-400">
                Handpicked products popular with our shoppers.
              </p>
            </div>
            <Link
              href="/shop"
              className="text-sm font-semibold text-red-600 transition hover:text-red-500"
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
