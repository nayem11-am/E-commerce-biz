import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { AppProviders } from "@/context/AppProviders";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.shopverse.com"),
  title: {
    default: "ShopVerse | Multi-Category Online Store",
    template: "%s | ShopVerse",
  },
  description:
    "Shop apparel, electronics, home essentials, and more with secure Cash on Delivery checkout.",
  keywords: [
    "e-commerce",
    "online shopping",
    "cash on delivery",
    "multi category store",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ShopVerse | Multi-Category Online Store",
    description:
      "Discover products across categories with a seamless user experience and COD checkout.",
    url: "https://www.shopverse.com",
    siteName: "ShopVerse",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
    >
      <body className="min-h-screen text-slate-900">
        <AppProviders>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
