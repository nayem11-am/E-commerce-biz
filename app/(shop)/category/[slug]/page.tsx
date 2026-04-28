import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/common/Container";
import { ShopCatalog } from "@/components/shop/ShopCatalog";
import { allProducts, productCategories } from "@/lib/constants/catalogData";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = productCategories.find((entry) => entry.slug === slug);

  if (!category) {
    return {
      title: "Category Not Found",
      description: "The requested category does not exist.",
    };
  }

  return {
    title: `${category.name} Products`,
    description: `Browse ${category.name} products and discover best picks in this category.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = productCategories.find((entry) => entry.slug === slug);

  if (!category) notFound();

  return (
    <section className="py-10 sm:py-12">
      <Container>
        <div className="mb-7">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {category.name} Collection
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
            {category.description} Use filters below to switch categories without leaving
            the page.
          </p>
        </div>

        <ShopCatalog
          categories={productCategories}
          products={allProducts}
          initialCategorySlug={category.slug}
        />
      </Container>
    </section>
  );
}

