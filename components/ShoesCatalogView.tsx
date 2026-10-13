"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Star,
  Heart,
  Shuffle,
  Sparkles,
  ArrowRight,
  Search,
  SlidersHorizontal,
  ChevronRight,
  Check,
} from "lucide-react";
import { PRODUCTS, getRandomProduct } from "../data/products";

export default function ShoesCatalogView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialCategory = searchParams.get("category") || "All";
  const initialSaleOnly = searchParams.get("sale") === "true";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [saleOnly, setSaleOnly] = useState<boolean>(initialSaleOnly);
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  const categories = ["All", "Running", "Walking", "Sports", "Lifestyle", "Training"];

  const handleRandomShoe = () => {
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

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== "All" && product.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      // Sale filter
      if (saleOnly && !product.originalPrice) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        const matchesTag = product.tag.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat && !matchesTag) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, saleOnly, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#fcfcfd] py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold text-gray-500">
          <Link href="/" className="hover:text-black transition">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-950 font-bold">Shoes Collection</span>
          {selectedCategory !== "All" && (
            <>
              <ChevronRight className="h-3 w-3" />
              <span className="text-gray-950 font-bold">{selectedCategory}</span>
            </>
          )}
        </nav>

        {/* Page Hero Header */}
        <div className="relative mb-10 overflow-hidden rounded-3xl bg-neutral-950 px-6 py-10 sm:px-12 sm:py-14 text-white shadow-xl">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gray-200 mb-3 backdrop-blur-xs">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                Footwear Catalog
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                All Shoes & Footwear
              </h1>
              <p className="mt-3 text-sm sm:text-base text-gray-300 leading-relaxed">
                Explore every performance model engineered with precision cushioning, breathable knit upper, and all-day stability. Click any shoe to view its dedicated details page.
              </p>
            </div>

            <button
              onClick={handleRandomShoe}
              className="inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-black shadow-lg hover:bg-gray-100 transition active:scale-95 shrink-0 self-start md:self-auto"
            >
              <Shuffle className="h-4 w-4" />
              <span>🎲 View Random Shoe Page</span>
            </button>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-gray-200 pb-6">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
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

          {/* Search & Sort Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search models, specs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-gray-250 bg-white py-2 pl-9 pr-4 text-xs font-semibold text-gray-900 placeholder-gray-400 focus:border-black focus:outline-hidden"
              />
            </div>

            {/* Sale Toggle */}
            <button
              onClick={() => setSaleOnly(!saleOnly)}
              className={`rounded-full border px-3.5 py-2 text-xs font-bold transition ${
                saleOnly
                  ? "border-red-600 bg-red-600 text-white"
                  : "border-gray-250 bg-white text-gray-700 hover:border-black"
              }`}
            >
              Sale Deals
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 rounded-full border border-gray-250 bg-white px-3 py-1.5">
              <SlidersHorizontal className="h-3.5 w-3.5 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs font-bold text-gray-800 outline-hidden cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6 flex items-center justify-between text-xs font-semibold text-gray-500">
          <span>
            Showing <strong className="text-gray-900">{filteredProducts.length}</strong> of {PRODUCTS.length} shoes
          </span>
          {(selectedCategory !== "All" || searchQuery || saleOnly) && (
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
                setSaleOnly(false);
                setSortBy("featured");
              }}
              className="text-blue-600 hover:underline"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-16 text-center">
            <h3 className="text-lg font-bold text-gray-900">No shoes found matching your search</h3>
            <p className="mt-2 text-xs text-gray-500">
              Try adjusting your category filter, clearing your search keywords, or reset filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
                setSaleOnly(false);
              }}
              className="mt-5 rounded-full bg-black px-6 py-2.5 text-xs font-bold text-white hover:bg-neutral-800 transition"
            >
              Show All Shoes
            </button>
          </div>
        ) : (
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
                    {/* Top Badges & Wishlist */}
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

                    {/* Shoe Image Box */}
                    <div className="relative mb-5 flex h-52 w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-tr from-gray-50 via-stone-50 to-gray-100 p-3 group-hover:bg-gray-100 transition duration-300">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={400}
                        height={280}
                        className="h-auto max-h-44 w-auto object-contain transition duration-500 group-hover:scale-110"
                      />

                      {discount && (
                        <span className="absolute top-2.5 left-2.5 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-black text-white shadow-xs">
                          -{discount}%
                        </span>
                      )}

                      {/* View Details Hover Badge */}
                      <div className="absolute inset-x-4 bottom-3 flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition duration-200">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/90 px-3.5 py-1.5 text-xs font-bold text-white shadow-md backdrop-blur-xs">
                          <span>View Product Page</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>

                    {/* Category */}
                    <div className="mb-1.5">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400">
                        {product.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="mb-2 text-lg font-extrabold text-gray-950 transition group-hover:text-blue-600 line-clamp-1">
                      {product.name}
                    </h2>

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
        )}

      </div>
    </div>
  );
}
