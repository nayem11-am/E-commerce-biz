"use client";

import Link from "next/link";
import { CartItem } from "@/components/cart/CartItem";
import { Container } from "@/components/common/Container";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils/formatCurrency";

export default function CartPage() {
  const { items, totalItems, totalPrice, isHydrated, clearCart, removeItem, updateItemQuantity } =
    useCart();

  return (
    <section className="py-10 sm:py-12">
      <Container>
        <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Your Cart</h1>
            <p className="mt-1 text-sm text-slate-600">
              Review selected products, adjust quantities, and continue to checkout.
            </p>
          </div>

          {items.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Clear Cart
            </button>
          )}
        </div>

        {!isHydrated ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">
            Loading cart...
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center sm:p-10">
            <h2 className="text-xl font-semibold text-slate-900">Your cart is empty</h2>
            <p className="mt-2 text-sm text-slate-600">
              Start exploring products and add items to your cart.
            </p>
            <Link
              href="/shop"
              className="mt-5 inline-flex rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-semibold !text-white transition hover:bg-brand-500 hover:!text-white"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.8fr_1fr] lg:items-start">
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={() => updateItemQuantity(item.id, item.quantity + 1)}
                  onDecrease={() => updateItemQuantity(item.id, item.quantity - 1)}
                  onRemove={() => removeItem(item.id)}
                />
              ))}
            </div>

            <aside className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-slate-900">Order Summary</h2>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Items</span>
                  <span>{totalItems}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Delivery</span>
                  <span>Free</span>
                </div>
              </div>

              <div className="mt-5 border-t border-slate-200 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-slate-900">Total</span>
                  <span className="text-xl font-bold text-slate-900">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-brand-700 px-5 py-3 text-sm font-semibold !text-white transition hover:bg-brand-500 hover:!text-white"
              >
                Proceed to Checkout
              </Link>
            </aside>
          </div>
        )}
      </Container>
    </section>
  );
}
