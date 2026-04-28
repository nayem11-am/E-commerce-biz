import type { Metadata } from "next";
import { InfoPageLayout } from "@/components/common/InfoPageLayout";

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
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">1. Orders and Availability</h2>
        <p className="text-sm leading-7 text-slate-700 sm:text-base">
          All orders are subject to product availability and serviceability in your delivery
          area. We reserve the right to cancel or limit quantities for unusual or bulk
          orders when necessary.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">2. Pricing and Product Details</h2>
        <p className="text-sm leading-7 text-slate-700 sm:text-base">
          We aim to keep prices and product descriptions accurate. In rare cases of pricing
          or listing errors, we may contact you to confirm updates before dispatch.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">3. Cash on Delivery (COD)</h2>
        <p className="text-sm leading-7 text-slate-700 sm:text-base">
          COD orders must be paid in full at the time of delivery. Please ensure someone is
          available at the delivery address to receive and pay for the order.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">4. Returns and Support</h2>
        <p className="text-sm leading-7 text-slate-700 sm:text-base">
          Return or replacement eligibility depends on product condition, category, and
          reporting time. Contact support promptly with order details if there is any issue.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">5. Account and Platform Use</h2>
        <p className="text-sm leading-7 text-slate-700 sm:text-base">
          You agree to provide accurate contact and address information. Misuse of the
          platform, repeated rejected COD deliveries, or fraudulent activity may result in
          account restrictions.
        </p>
      </section>
    </InfoPageLayout>
  );
}

