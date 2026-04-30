import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/common/Container";
import { ProductActions } from "@/components/product/ProductActions";
import { allProducts } from "@/lib/constants/catalogData";
import { formatCurrency } from "@/lib/utils/formatCurrency";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = allProducts.find((entry) => entry.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = allProducts.find((entry) => entry.slug === slug);

  if (!product) notFound();

  return (
    <section className="py-10 sm:py-12">
      <Container>

        <div className="premium-surface grid gap-7 p-5 sm:gap-8 sm:p-7 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-800">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-10"
              priority
            />
          </div>

          <div className="flex flex-col justify-between gap-6">
            <div className="space-y-3">
              <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
                {product.category}
              </p>
              <h1 className="text-3xl font-bold tracking-[-0.02em] text-white">{product.name}</h1>
              <p className="text-base text-zinc-400">{product.description}</p>
            </div>

            <div className="space-y-4">
              <p className="text-3xl font-bold text-white">
                {formatCurrency(product.price)}
              </p>
              <p
                className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                  product.inStock
                    ? "bg-green-900/30 text-green-400"
                    : "bg-red-900/30 text-red-400"
                }`}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </p>
              <ProductActions product={product} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
