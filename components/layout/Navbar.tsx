"use client";

import { Menu, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { NAV_LINKS } from "@/lib/constants/navigation";
import { Container } from "@/components/common/Container";

export function Navbar() {
  const { items, isHydrated } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mainLinks = NAV_LINKS.filter((item) => item.href !== "/cart");
  const inlineMarqueeText =
    "Premium picks, better prices, smooth checkout. New arrivals updated daily.";
  const cartCount = isHydrated ? items.length : null;
  const mobileLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Checkout", href: "/checkout" },
  ];

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-zinc-800 bg-black/90 shadow-sm backdrop-blur-xl md:bg-black/95">
      <div className="hidden h-7 overflow-hidden bg-zinc-900 text-zinc-300 md:block">
        <Container>
          <div className="marquee-wrap whitespace-nowrap text-xs font-medium leading-7 tracking-[0.02em]">
            <div className="marquee-track">
              <span className="marquee-item">{inlineMarqueeText}</span>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <nav className="flex h-16 items-center justify-between gap-3">
          <Link href="/" className="group inline-flex items-center gap-2 text-xl font-black tracking-tighter">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-white shadow-[0_0_15px_rgba(229,9,20,0.5)] transition-transform duration-300 group-hover:scale-110">
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent">ShopVerse</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <ul className="hidden items-center gap-2 text-sm font-medium text-slate-300 md:flex">
              {mainLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="relative px-2.5 py-1.5 text-zinc-400 transition-colors duration-300 hover:text-white after:absolute after:bottom-0 after:left-2.5 after:h-[2px] after:w-0 after:rounded-full after:bg-red-600 after:transition-all after:duration-300 hover:after:w-[calc(100%-1.25rem)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/cart"
              aria-label={`Cart (${cartCount ?? 0} items)`}
              className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-zinc-100 shadow-sm transition hover:bg-zinc-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <circle cx="9" cy="20" r="1.25" />
                <circle cx="18" cy="20" r="1.25" />
                <path d="M3 4h2l2.1 10.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.78L20 8H7.2" />
              </svg>
              {cartCount !== null ? (
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[11px] font-semibold leading-none text-white">
                  {cartCount}
                </span>
              ) : null}
            </Link>

            <button
              type="button"
              aria-label="Open navigation menu"
              onClick={() => setIsMenuOpen(true)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-zinc-100 shadow-sm transition hover:bg-zinc-800 md:hidden"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </Container>

      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`fixed right-4 top-20 z-50 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_10px_40px_rgba(0,0,0,0.2)] transition-all duration-300 md:hidden ${
          isMenuOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
        aria-label="Mobile navigation menu"
      >
        <div className="mb-2 flex items-center justify-between border-b border-slate-100 px-3 pb-2 pt-1">
          <p className="text-sm font-bold text-slate-900">Menu</p>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setIsMenuOpen(false)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <ul className="flex flex-col gap-1">
          {mobileLinks.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-red-600"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      <style jsx>{`
        .marquee-wrap {
          position: relative;
          overflow: hidden;
        }
        .marquee-track {
          display: inline-block;
          white-space: nowrap;
          animation: top-navbar-marquee 18s linear infinite;
        }
        .marquee-item {
          display: inline-block;
          padding-right: 0;
        }
        @keyframes top-navbar-marquee {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(-100%);
          }
        }
        @media (max-width: 767px) {
          .marquee-track {
            animation: none;
            transform: translateX(0);
            display: block;
            max-width: 100%;
          }
          .marquee-item {
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      `}</style>
    </header>
  );
}
