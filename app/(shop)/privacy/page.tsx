import type { Metadata } from "next";
import { InfoPageLayout } from "@/components/common/InfoPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Understand how ShopVerse collects, uses, and protects customer data.",
};

export default function PrivacyPage() {
  return (
    <InfoPageLayout
      title="Privacy Policy"
      description="Your privacy matters to us. This policy explains what information we collect and how we use it to fulfill your orders."
    >
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">1. Information We Collect</h2>
        <p className="text-sm leading-7 text-slate-700 sm:text-base">
          We collect basic details such as your name, phone number, delivery address, and
          order history so we can process and deliver your purchases.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">2. How We Use Your Data</h2>
        <p className="text-sm leading-7 text-slate-700 sm:text-base">
          We use your data to confirm orders, arrange COD deliveries, provide customer
          support, and improve shopping experience. We do not sell personal data to third
          parties.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">3. Sharing with Service Partners</h2>
        <p className="text-sm leading-7 text-slate-700 sm:text-base">
          We may share required delivery information with logistics partners to complete
          your order. These partners are expected to handle your data responsibly.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">4. Data Security</h2>
        <p className="text-sm leading-7 text-slate-700 sm:text-base">
          We use reasonable safeguards to protect customer data from unauthorized access or
          misuse. No system is fully risk-free, but we continuously improve security
          practices.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">5. Your Choices</h2>
        <p className="text-sm leading-7 text-slate-700 sm:text-base">
          You can request updates to incorrect profile details by contacting support. If
          you have questions about this policy, please reach out with your registered phone
          number and order ID (if applicable).
        </p>
      </section>
    </InfoPageLayout>
  );
}

