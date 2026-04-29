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
    <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-700/20 bg-slate-900/10 shadow-sm backdrop-blur-xl md:bg-slate-900/15">
      <div className="h-7 overflow-hidden bg-slate-900 text-slate-100">
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
          <Link href="/" className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-brand-700">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900/80 text-white">
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            </span>
            <span>ShopVerse</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <ul className="hidden items-center gap-2 text-sm font-medium text-slate-700 md:flex">
              {mainLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="relative px-2.5 py-1.5 text-slate-700 transition-colors duration-300 hover:text-slate-900 after:absolute after:bottom-0 after:left-2.5 after:h-[2px] after:w-0 after:rounded-full after:bg-blue-900 after:transition-all after:duration-300 hover:after:w-[calc(100%-1.25rem)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <button
              type="button"
              aria-label="Open navigation menu"
              onClick={() => setIsMenuOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/70 text-slate-800 shadow-sm transition hover:bg-white md:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>

            <Link
              href="/cart"
              aria-label={`Cart (${cartCount ?? 0} items)`}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/70 text-slate-800 shadow-sm transition hover:bg-white"
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
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-700 px-1 text-[11px] font-semibold leading-none text-white">
                  {cartCount}
                </span>
              ) : null}
            </Link>
          </div>
        </nav>
      </Container>

      <div
        className={`fixed inset-0 z-40 bg-slate-900/45 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-[82%] max-w-xs border-r border-slate-200 bg-white shadow-2xl transition-transform duration-300 md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Mobile navigation drawer"
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
          <p className="text-base font-semibold text-brand-700">Menu</p>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setIsMenuOpen(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-slate-100"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <ul className="space-y-2 px-4 py-5">
          {mobileLinks.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="relative block px-4 py-3 text-sm font-semibold text-slate-800 transition-colors duration-300 hover:text-slate-900 after:absolute after:bottom-2 after:left-4 after:h-[2px] after:w-0 after:rounded-full after:bg-blue-900 after:transition-all after:duration-300 hover:after:w-10"
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
