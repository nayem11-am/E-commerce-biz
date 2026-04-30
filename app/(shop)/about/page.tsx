import type { Metadata } from "next";
import { InfoPageLayout } from "@/components/common/InfoPageLayout";
import { AnimatedSection } from "@/components/common/AnimatedSection";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about ShopVerse and our customer-first Cash on Delivery shopping experience.",
};

export default function AboutPage() {
  return (
    <InfoPageLayout
      title="About ShopVerse"
      description="ShopVerse is a multi-category online store focused on simple, trustworthy shopping with Cash on Delivery convenience."
    >
      <AnimatedSection delay={0.1}>
        <h2 className="text-xl font-semibold text-white">Who We Are</h2>
        <p className="text-sm leading-7 text-zinc-300 sm:text-base">
          We built ShopVerse to make everyday online shopping easier for families and
          professionals who want variety, clear pricing, and reliable fulfillment. Our
          catalog includes fashion, electronics, home essentials, and beauty products.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <h2 className="text-xl font-semibold text-white">Our Shopping Promise</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-zinc-300 sm:text-base">
          <li>Transparent product information and straightforward pricing.</li>
          <li>Cash on Delivery for customers who prefer paying at delivery time.</li>
          <li>Responsive support to help with orders, delivery updates, and returns.</li>
          <li>Continuous improvements based on real customer feedback.</li>
        </ul>
      </AnimatedSection>

      <AnimatedSection delay={0.3}>
        <h2 className="text-xl font-semibold text-white">Why Customers Choose Us</h2>
        <p className="text-sm leading-7 text-zinc-300 sm:text-base">
          Customers choose ShopVerse because we keep the experience practical and clear.
          From browsing to checkout, we reduce unnecessary steps and focus on helping you
          find the right products quickly.
        </p>
      </AnimatedSection>
    </InfoPageLayout>
  );
}

