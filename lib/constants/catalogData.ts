import type { Product } from "@/types/product";

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export const productCategories: ProductCategory[] = [
  {
    id: "cat-1",
    name: "Fashion",
    slug: "fashion",
    image: "/file.svg",
    description: "Trendy outfits and daily wear essentials.",
  },
  {
    id: "cat-2",
    name: "Electronics",
    slug: "electronics",
    image: "/window.svg",
    description: "Gadgets, devices, and smart tech picks.",
  },
  {
    id: "cat-3",
    name: "Home and Living",
    slug: "home-living",
    image: "/globe.svg",
    description: "Decor, utilities, and comfort-driven finds.",
  },
  {
    id: "cat-4",
    name: "Beauty",
    slug: "beauty",
    image: "/next.svg",
    description: "Skincare, grooming, and self-care products.",
  },
];

export const allProducts: Product[] = [
  {
    id: "prod-1",
    slug: "urban-classic-t-shirt",
    name: "Urban Classic T-Shirt",
    description: "Soft cotton fit for all-day comfort and casual styling.",
    price: 29.99,
    image: "/file.svg",
    category: "Fashion",
    categorySlug: "fashion",
    inStock: true,
  },
  {
    id: "prod-2",
    slug: "denim-everyday-jacket",
    name: "Denim Everyday Jacket",
    description: "Lightweight denim layer with timeless street style.",
    price: 54.0,
    image: "/file.svg",
    category: "Fashion",
    categorySlug: "fashion",
    inStock: true,
  },
  {
    id: "prod-3",
    slug: "wireless-smart-earbuds",
    name: "Wireless Smart Earbuds",
    description: "Compact earbuds with clear audio and quick pairing.",
    price: 79.0,
    image: "/window.svg",
    category: "Electronics",
    categorySlug: "electronics",
    inStock: true,
  },
  {
    id: "prod-4",
    slug: "portable-bluetooth-speaker",
    name: "Portable Bluetooth Speaker",
    description: "Deep bass performance in a compact travel-friendly body.",
    price: 64.5,
    image: "/window.svg",
    category: "Electronics",
    categorySlug: "electronics",
    inStock: false,
  },
  {
    id: "prod-5",
    slug: "minimal-table-lamp",
    name: "Minimal Table Lamp",
    description: "Warm ambient light with a modern, clean design.",
    price: 45.5,
    image: "/globe.svg",
    category: "Home and Living",
    categorySlug: "home-living",
    inStock: true,
  },
  {
    id: "prod-6",
    slug: "ceramic-vase-set",
    name: "Ceramic Vase Set",
    description: "Elegant neutral-toned vases for stylish interiors.",
    price: 38.0,
    image: "/globe.svg",
    category: "Home and Living",
    categorySlug: "home-living",
    inStock: true,
  },
  {
    id: "prod-7",
    slug: "hydrating-face-serum",
    name: "Hydrating Face Serum",
    description: "Daily-use serum made to refresh and moisturize skin.",
    price: 34.25,
    image: "/next.svg",
    category: "Beauty",
    categorySlug: "beauty",
    inStock: false,
  },
  {
    id: "prod-8",
    slug: "vitamin-glow-cream",
    name: "Vitamin Glow Cream",
    description: "Brightening cream designed for smooth daily hydration.",
    price: 27.75,
    image: "/next.svg",
    category: "Beauty",
    categorySlug: "beauty",
    inStock: true,
  },
];

