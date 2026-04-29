"use client";

import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import { ProductCard } from "@/components/common/ProductCard";
import { useIsMobile } from "@/hooks/useIsMobile";
import { inViewOnce, slideInLeft, staggerContainer } from "@/lib/animations/productMotion";
import type { Product } from "@/types/product";

interface AnimatedProductGridProps {
  products: Product[];
  className?: string;
}

export function AnimatedProductGrid({ products, className }: AnimatedProductGridProps) {
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();
  const useLightweightMode = isMobile || shouldReduceMotion;

  const containerVariants = staggerContainer(useLightweightMode);
  const itemVariants = slideInLeft(useLightweightMode);

  if (useLightweightMode) {
    return (
      <div className={className}>
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={className}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
      >
        {products.map((product) => (
          <m.div key={product.id} variants={itemVariants} style={{ willChange: "transform, opacity" }}>
            <ProductCard product={product} />
          </m.div>
        ))}
      </m.div>
    </LazyMotion>
  );
}
