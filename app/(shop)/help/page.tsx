import type { Metadata } from "next";
import { InfoPageLayout } from "@/components/common/InfoPageLayout";

const faqs = [
  {
    question: "How does Cash on Delivery work?",
    answer:
      "Place your order normally on ShopVerse. Once the order is delivered to your address, you pay the delivery agent in cash.",
  },
  {
    question: "Can I change my order after placing it?",
    answer:
      "If your order has not been dispatched yet, our support team can help update address details or quantities. Contact us as soon as possible.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Most orders arrive within 2-6 business days depending on your location and product availability.",
  },
  {
    question: "What if I receive a damaged or wrong item?",
    answer:
      "Please report the issue within 48 hours of delivery with your order ID. We will guide you through return or replacement options.",
  },
  {
    question: "Do you charge extra for COD?",
    answer:
      "In most service areas, COD is free. If any handling fee applies, it will be shown clearly before you place the order.",
  },
];

export const metadata: Metadata = {
  title: "Help Center",
  description: "Find answers to common shopping, delivery, and Cash on Delivery questions.",
};

export default function HelpPage() {
  return (
    <InfoPageLayout
      title="Help Center"
      description="Find quick answers to common questions about orders, delivery, and Cash on Delivery."
    >
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 open:bg-white"
            >
              <summary className="cursor-pointer list-none pr-6 text-sm font-semibold text-slate-900 sm:text-base">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Need More Help?</h2>
        <p className="text-sm leading-7 text-slate-700 sm:text-base">
          If your question is not listed above, reach out to our support team with your
          order ID and issue details. We aim to respond quickly during business hours.
        </p>
      </section>
    </InfoPageLayout>
  );
}

