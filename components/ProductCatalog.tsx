"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  Heart,
  Shuffle,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { PRODUCTS, getRandomProduct } from "../data/products";

export default function ProductCatalog() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  const categories = ["All", "Running", "Walking", "Sports", "Lifestyle", "Training"];

  const filteredProducts =
    selectedCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleOpenRandomProduct = () => {
    const random = getRandomProduct();
    router.push(`/shoes/${random.id}`);
  };

  const handleToggleWishlist = (productId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return (
    <section id="shoes" className="border-t border-gray-100 bg-[#f8f9fa] py-16 sm:py-24 scroll-mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Interactive Controls */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-black uppercase tracking-widest text-gray-500">
                COLLECTIONS & STYLES
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-black/5 px-2.5 py-0.5 text-[10px] font-bold text-gray-700">
                <Sparkles className="h-3 w-3 text-amber-500" />
                {PRODUCTS.length} Models
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
              Explore Different Types of Shoes
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl">
              Click any shoe to view its dedicated details page with high-res photos, sizing options, and complete technical specifications.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenRandomProduct}
              className="group inline-flex items-center gap-2.5 rounded-full bg-white border border-gray-300 px-5 py-3 text-sm font-bold text-gray-900 shadow-xs hover:border-black hover:bg-gray-50 transition active:scale-95"
            >
              <Shuffle className="h-4 w-4 transition duration-300 group-hover:rotate-180" />
              <span>🎲 View Random Shoe Page</span>
            </button>

            <Link
              href="/shoes"
              className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-neutral-800 transition active:scale-95"
            >
              <span>View All Shoes Page</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Filter Tabs Strip */}
        <div className="mb-10 flex items-center justify-between border-b border-gray-200 pb-4 overflow-x-auto gap-4">
          <div className="flex items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-black text-white shadow-xs"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-black hover:text-black"
                }`}
              >
                {cat}
                {cat !== "All" && (
                  <span className="ml-1.5 opacity-60 text-xs">
                    ({PRODUCTS.filter((p) => p.category.toLowerCase() === cat.toLowerCase()).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          <Link
            href="/shoes"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-black hover:underline whitespace-nowrap"
          >
            <span>Go to /shoes catalog</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => {
            const isFav = wishlist[product.id];
            const discount = product.originalPrice
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : null;

            return (
              <Link
                key={product.id}
                href={`/shoes/${product.id}`}
                className="group relative flex flex-col justify-between rounded-3xl border border-gray-200/90 bg-white p-5 shadow-xs transition duration-300 hover:-translate-y-1.5 hover:border-black hover:shadow-xl cursor-pointer"
              >
                <div>
                  {/* Card Header: Tag & Wishlist */}
                  <div className="mb-4 flex items-center justify-between">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-bold border ${
                        product.badgeColor || "bg-gray-100 text-gray-800 border-gray-200"
                      }`}
                    >
                      {product.tag}
                    </span>

                    <button
                      onClick={(e) => handleToggleWishlist(product.id, e)}
                      aria-label="Save to Wishlist"
                      className="rounded-full p-2 text-gray-400 hover:text-red-500 hover:bg-gray-50 transition"
                    >
                      <Heart
                        className={`h-4.5 w-4.5 ${isFav ? "fill-red-500 text-red-500" : ""}`}
                      />
                    </button>
                  </div>

                  {/* Shoe Image Box with Hover Zoom */}
                  <div className="relative mb-5 flex h-48 w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-tr from-gray-50 via-stone-50 to-gray-100 p-3 group-hover:bg-gray-100 transition duration-300">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={380}
                      height={260}
                      className="h-auto max-h-40 w-auto object-contain transition duration-500 group-hover:scale-110"
                    />

                    {discount && (
                      <span className="absolute top-2.5 left-2.5 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-black text-white shadow-xs">
                        -{discount}%
                      </span>
                    )}

                    {/* View Details Floating Pill on Hover */}
                    <div className="absolute inset-x-4 bottom-3 flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition duration-200">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-black/90 px-3.5 py-1.5 text-xs font-bold text-white shadow-md backdrop-blur-xs">
                        <span>View Details Page</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* Category Pill */}
                  <div className="mb-1.5">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400">
                      {product.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 text-lg font-extrabold text-gray-950 transition group-hover:text-blue-600 line-clamp-1">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="line-clamp-2 text-xs leading-relaxed text-gray-600">
                    {product.description}
                  </p>
                </div>

                {/* Card Footer: Price & Rating */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 font-medium block">
                      Price
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-black text-gray-950">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs font-semibold text-gray-400 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1 text-xs font-bold text-gray-800">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span>{product.rating}</span>
                    </div>
                    <span className="text-[10px] text-gray-400">
                      ({product.reviewsCount})
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
          <div className="mb-4 sm:mb-0">
            <h4 className="font-extrabold text-gray-950 text-base">
              Looking for our complete footwear catalog?
            </h4>
            <p className="text-xs text-gray-500 mt-0.5">
              Browse all styles, filter by sport, search models, and compare technical specs on our dedicated Shoes page.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenRandomProduct}
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-2.5 text-xs font-bold text-gray-800 hover:border-black hover:bg-black hover:text-white transition"
            >
              <Shuffle className="h-3.5 w-3.5" />
              <span>Random Shoe Page</span>
            </button>
            <Link
              href="/shoes"
              className="inline-flex items-center gap-1.5 rounded-full bg-black px-5 py-2.5 text-xs font-bold text-white hover:bg-neutral-800 transition"
            >
              <span>Explore Shoes Page</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
