"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Container } from "@/components/common/Container";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { writeLastOrderToStorage } from "@/lib/utils/orderStorage";

interface CheckoutFormValues {
  fullName: string;
  phoneNumber: string;
  address: string;
  note: string;
}

interface FormErrors {
  fullName?: string;
  phoneNumber?: string;
  address?: string;
}

const PHONE_REGEX = /^\+?[0-9\s-]{7,15}$/;

function validateForm(values: CheckoutFormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.fullName.trim()) errors.fullName = "Full name is required.";
  if (!values.phoneNumber.trim()) {
    errors.phoneNumber = "Phone number is required.";
  } else if (!PHONE_REGEX.test(values.phoneNumber.trim())) {
    errors.phoneNumber = "Enter a valid phone number.";
  }
  if (!values.address.trim()) errors.address = "Address is required.";

  return errors;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalItems, totalPrice, clearCart, isHydrated } = useCart();
  const [values, setValues] = useState<CheckoutFormValues>({
    fullName: "",
    phoneNumber: "",
    address: "",
    note: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const canPlaceOrder = isHydrated && items.length > 0;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canPlaceOrder) return;

    const nextErrors = validateForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    const orderId = `COD-${new Date().getTime().toString().slice(-6)}`;
    writeLastOrderToStorage({
      orderId,
      items,
      totalPrice,
      createdAt: new Date().toISOString(),
      customer: {
        fullName: values.fullName.trim(),
        phoneNumber: values.phoneNumber.trim(),
        address: values.address.trim(),
        note: values.note.trim() || undefined,
      },
    });
    clearCart();
    router.push("/order-confirmation");
  };

  if (!isHydrated) {
    return (
      <section className="py-10 sm:py-12">
        <Container>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">
            Loading checkout...
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-10 sm:py-12">
      <Container>
        <div className="mb-7">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Checkout (Cash on Delivery)
          </h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Enter your delivery details and place your order. Payment will be collected at
            delivery.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center sm:p-10">
            <h2 className="text-xl font-semibold text-slate-900">Your cart is empty</h2>
            <p className="mt-2 text-sm text-slate-600">
              Add items to cart before placing a COD order.
            </p>
            <Link
              href="/shop"
              className="mt-5 inline-flex rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-semibold !text-white transition hover:bg-brand-500 hover:!text-white"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-start">
            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
              noValidate
            >
              <div>
                <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={values.fullName}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                  placeholder="John Doe"
                  autoComplete="name"
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs font-medium text-rose-600">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Phone Number <span className="text-rose-600">*</span>
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                  placeholder="+1 555 123 4567"
                  autoComplete="tel"
                  required
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-xs font-medium text-rose-600">{errors.phoneNumber}</p>
                )}
              </div>

              <div>
                <label htmlFor="address" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                  placeholder="Street, city, postal code"
                />
                {errors.address && (
                  <p className="mt-1 text-xs font-medium text-rose-600">{errors.address}</p>
                )}
              </div>

              <div>
                <label htmlFor="note" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Optional Note
                </label>
                <textarea
                  id="note"
                  name="note"
                  value={values.note}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                  placeholder="Landmark or delivery instructions"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-500"
              >
                Place Order
              </button>
            </form>

            <aside className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-slate-900">Cart Summary</h2>

              <ul className="mt-4 space-y-3 border-b border-slate-200 pb-4">
                {items.map((item) => (
                  <li key={item.id} className="flex items-start justify-between gap-3 text-sm">
                    <div>
                      <p className="font-medium text-slate-900">{item.name}</p>
                      <p className="text-slate-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-slate-900">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Items</span>
                  <span>{totalItems}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Delivery</span>
                  <span>Free</span>
                </div>
              </div>

              <div className="mt-4 border-t border-slate-200 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-slate-900">Total</span>
                  <span className="text-xl font-bold text-slate-900">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </Container>
    </section>
  );
}
