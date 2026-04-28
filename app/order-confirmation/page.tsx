"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Link from "next/link";
import { useRef, useState, useSyncExternalStore } from "react";
import { Container } from "@/components/common/Container";
import { Invoice } from "@/components/order/Invoice";
import {
  getLastOrderServerSnapshot,
  readLastOrderFromStorage,
  subscribeLastOrder,
} from "@/lib/utils/orderStorage";

function SuccessIcon() {
  return (
    <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 fill-current">
        <path d="M12 2a10 10 0 1 0 10 10A10.01 10.01 0 0 0 12 2Zm-1.1 14.2-3.2-3.2 1.4-1.4 1.8 1.8 4.9-4.9 1.4 1.4Z" />
      </svg>
    </span>
  );
}

export default function OrderConfirmationPage() {
  const order = useSyncExternalStore(
    subscribeLastOrder,
    readLastOrderFromStorage,
    getLastOrderServerSnapshot,
  );
  const [isDownloading, setIsDownloading] = useState(false);
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handleDownloadInvoice = async () => {
    if (!invoiceRef.current || !order) return;

    setIsDownloading(true);
    try {
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imageData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 24;
      const renderWidth = pageWidth - margin * 2;
      const renderHeight = (canvas.height * renderWidth) / canvas.width;
      const contentHeightPerPage = pageHeight - margin * 2;

      let heightLeft = renderHeight;
      let position = margin;

      pdf.addImage(imageData, "PNG", margin, position, renderWidth, renderHeight);
      heightLeft -= contentHeightPerPage;

      while (heightLeft > 0) {
        pdf.addPage();
        position = margin - (renderHeight - heightLeft);
        pdf.addImage(imageData, "PNG", margin, position, renderWidth, renderHeight);
        heightLeft -= contentHeightPerPage;
      }

      pdf.save(`invoice-${order.orderId}.pdf`);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!order) {
    return (
      <section className="py-10 sm:py-12">
        <Container>
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center sm:p-10">
            <h1 className="text-2xl font-bold text-slate-900">No recent order found</h1>
            <p className="mt-2 text-sm text-slate-600">
              Place a Cash on Delivery order to view confirmation details.
            </p>
            <Link
              href="/shop"
              className="mt-5 inline-flex rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-semibold !text-white transition hover:bg-brand-500 hover:!text-white"
            >
              Continue Shopping
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  const orderDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="py-10 sm:py-12">
      <Container>
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-white p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <SuccessIcon />
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-emerald-900 sm:text-3xl">
                    Order Confirmed
                  </h1>
                  <p className="mt-2 text-sm text-emerald-800 sm:text-base">
                    Thank you for your order. We will contact you soon.
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
                <p>
                  <span className="font-semibold text-slate-900">Order ID:</span> {order.orderId}
                </p>
                <p className="mt-1">
                  <span className="font-semibold text-slate-900">Date:</span> {orderDate}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-slate-900">Customer Details</h2>
              <div className="mt-4 space-y-2 text-sm text-slate-700 sm:text-base">
                <p>
                  <span className="font-semibold text-slate-900">Name:</span>{" "}
                  {order.customer.fullName}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Phone:</span>{" "}
                  {order.customer.phoneNumber}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Address:</span>{" "}
                  {order.customer.address}
                </p>
                {order.customer.note ? (
                  <p>
                    <span className="font-semibold text-slate-900">Note:</span>{" "}
                    {order.customer.note}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-slate-900">Payment Method</h2>
              <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-800 sm:text-base">
                Cash on Delivery. Please keep the payable amount ready when the order arrives.
              </p>
              <div className="mt-4 border-t border-slate-200 pt-4">
                <p className="text-sm text-slate-600">Total Price</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 2,
                  }).format(order.totalPrice)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleDownloadInvoice}
              disabled={isDownloading}
              className="inline-flex items-center justify-center rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {isDownloading ? "Preparing PDF..." : "Download Invoice"}
            </button>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-semibold !text-white transition hover:bg-brand-500 hover:!text-white"
            >
              Continue Shopping
            </Link>
          </div>

          <div ref={invoiceRef}>
            <Invoice order={order} />
          </div>
        </div>
      </Container>
    </section>
  );
}
