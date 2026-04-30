import type { Metadata } from "next";
import { InfoPageLayout } from "@/components/common/InfoPageLayout";
import { AnimatedSection } from "@/components/common/AnimatedSection";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Review the terms that govern shopping and Cash on Delivery orders on ShopVerse.",
};

export default function TermsPage() {
  return (
    <InfoPageLayout
      title="Terms & Conditions"
      description="These terms explain how orders, deliveries, and customer responsibilities work when you use ShopVerse."
    >
      <AnimatedSection delay={0.1}>
        <h2 className="text-xl font-semibold text-white">1. Orders and Availability</h2>
        <p className="text-sm leading-7 text-zinc-300 sm:text-base">
          All orders are subject to product availability and serviceability in your delivery
          area. We reserve the right to cancel or limit quantities for unusual or bulk
          orders when necessary.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <h2 className="text-xl font-semibold text-white">2. Pricing and Product Details</h2>
        <p className="text-sm leading-7 text-zinc-300 sm:text-base">
          We aim to keep prices and product descriptions accurate. In rare cases of pricing
          or listing errors, we may contact you to confirm updates before dispatch.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.3}>
        <h2 className="text-xl font-semibold text-white">3. Cash on Delivery (COD)</h2>
        <p className="text-sm leading-7 text-zinc-300 sm:text-base">
          COD orders must be paid in full at the time of delivery. Please ensure someone is
          available at the delivery address to receive and pay for the order.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.4}>
        <h2 className="text-xl font-semibold text-white">4. Returns and Support</h2>
        <p className="text-sm leading-7 text-zinc-300 sm:text-base">
          Return or replacement eligibility depends on product condition, category, and
          reporting time. Contact support promptly with order details if there is any issue.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.5}>
        <h2 className="text-xl font-semibold text-white">5. Account and Platform Use</h2>
        <p className="text-sm leading-7 text-zinc-300 sm:text-base">
          You agree to provide accurate contact and address information. Misuse of the
          platform, repeated rejected COD deliveries, or fraudulent activity may result in
          account restrictions.
        </p>
      </AnimatedSection>
    </InfoPageLayout>
  );
}

