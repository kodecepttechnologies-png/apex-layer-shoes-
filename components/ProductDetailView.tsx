"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  Check,
  Truck,
  RotateCcw,
  ShieldCheck,
  Shuffle,
  Heart,
  ShoppingBag,
  ChevronRight,
  ArrowLeft,
  Info,
  Sparkles,
} from "lucide-react";
import { Product, PRODUCTS, getRandomProduct } from "../data/products";

interface ProductDetailViewProps {
  product: Product;
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || "");
  const [selectedSize, setSelectedSize] = useState<string | number>(
    product.sizes[2] || product.sizes[0] || 9
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"highlights" | "specs">("highlights");

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const savings = product.originalPrice
    ? (product.originalPrice - product.price).toFixed(2)
    : null;

  const relatedShoes = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  const handleRandomAnother = () => {
    const nextRandom = getRandomProduct(product.id);
    router.push(`/shoes/${nextRandom.id}`);
  };

  const handleAddToCart = () => {
    setAddedSuccess(true);
    // Dispatch cart updated event for header CartBadge
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("apex-cart-updated", {
          detail: { product, quantity, size: selectedSize, color: selectedColor },
        })
      );
    }
    setTimeout(() => {
      setAddedSuccess(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] py-6 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Navigation & Breadcrumb */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-gray-500">
            <Link href="/" className="hover:text-black transition">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/shoes" className="hover:text-black transition">Shoes</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={`/shoes?category=${product.category}`} className="hover:text-black transition">
              {product.category}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gray-950 font-bold truncate max-w-[180px] sm:max-w-none">
              {product.name}
            </span>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/shoes"
              className="inline-flex items-center gap-1.5 rounded-full border border-gray-250 bg-white px-4 py-2 text-xs font-bold text-gray-700 shadow-xs hover:border-black hover:bg-black hover:text-white transition"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to All Shoes</span>
            </Link>

            <button
              onClick={handleRandomAnother}
              className="inline-flex items-center gap-1.5 rounded-full border border-gray-250 bg-white px-4 py-2 text-xs font-bold text-gray-700 shadow-xs hover:border-black hover:bg-black hover:text-white transition active:scale-95"
            >
              <Shuffle className="h-3.5 w-3.5" />
              <span>View Random Shoe</span>
            </button>
          </div>
        </div>

        {/* Main Product Showcase Grid */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            
            {/* Left Column: Image Showcase */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Primary Large Image */}
              <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-b from-gray-50 via-stone-50 to-gray-100 flex items-center justify-center min-h-[380px] sm:min-h-[480px] p-8 group">
                {product.tag && (
                  <span className="absolute top-5 left-5 z-10 rounded-full bg-black/85 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-xs shadow-xs">
                    {product.tag}
                  </span>
                )}

                {discountPercent && (
                  <span className="absolute top-5 right-5 z-10 rounded-full bg-red-600 px-3 py-1 text-xs font-black text-white shadow-xs">
                    {discountPercent}% OFF
                  </span>
                )}

                <Image
                  src={selectedImage || product.image}
                  alt={product.name}
                  width={750}
                  height={520}
                  priority
                  className="h-auto max-h-[400px] w-full object-contain transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* Angle Thumbnails */}
              {product.additionalImages && product.additionalImages.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {product.additionalImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`relative h-20 w-24 shrink-0 overflow-hidden rounded-2xl border-2 transition ${
                        selectedImage === img
                          ? "border-black shadow-md scale-102"
                          : "border-gray-200 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} angle ${idx + 1}`}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Guarantees Strip */}
              <div className="grid grid-cols-3 gap-3 rounded-2xl border border-gray-150 bg-gray-50/80 p-4 text-center text-xs text-gray-700">
                <div className="flex flex-col items-center gap-1.5">
                  <Truck className="h-5 w-5 text-gray-900" />
                  <span className="font-bold text-gray-950">Free 2-Day Shipping</span>
                  <span className="text-[11px] text-gray-500">Orders over $100</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 border-x border-gray-200 px-2">
                  <RotateCcw className="h-5 w-5 text-gray-900" />
                  <span className="font-bold text-gray-950">30-Day Wear Test</span>
                  <span className="text-[11px] text-gray-500">Run in them, return if unhappy</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <ShieldCheck className="h-5 w-5 text-gray-900" />
                  <span className="font-bold text-gray-950">100% Authentic</span>
                  <span className="text-[11px] text-gray-500">Original manufacturer warranty</span>
                </div>
              </div>
            </div>

            {/* Right Column: Product Options & Purchase Actions */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                
                {/* Category & Rating */}
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-widest text-gray-500">
                    {product.category} Footwear
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-gray-400 font-normal">
                      ({product.reviewsCount.toLocaleString()} reviews)
                    </span>
                  </div>
                </div>

                {/* Product Name */}
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-950">
                  {product.name}
                </h1>

                {/* Pricing Block */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-4xl font-black text-gray-950">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl font-semibold text-gray-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {savings && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      Save ${savings}
                    </span>
                  )}
                </div>

                {/* Stock Tag */}
                <div className="mt-3 flex items-center gap-2 text-xs font-bold text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>In Stock — Ships within 24 hours</span>
                </div>

                {/* Short & Long Description */}
                <p className="mt-5 text-sm leading-relaxed text-gray-600">
                  {product.longDescription || product.description}
                </p>

                {/* Color Selector */}
                <div className="mt-6 border-t border-gray-150 pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                      Colorway: <span className="text-gray-950 font-black">{selectedColor}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {product.colors.map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(color.name)}
                        className={`group relative flex h-10 w-10 items-center justify-center rounded-full transition ${
                          selectedColor === color.name
                            ? "ring-2 ring-black ring-offset-2 scale-110"
                            : "hover:scale-105"
                        }`}
                        title={color.name}
                      >
                        <span
                          className={`h-8 w-8 rounded-full shadow-inner ${color.class}`}
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selector */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                      Select Size (US Men/Unisex)
                    </span>
                    <Link
                      href="/buying-guide"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:underline"
                    >
                      <Info className="h-3 w-3" /> Size Guide
                    </Link>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`rounded-xl border py-2.5 text-xs font-bold transition ${
                          selectedSize === size
                            ? "border-black bg-black text-white shadow-xs"
                            : "border-gray-200 bg-white text-gray-800 hover:border-gray-400 hover:bg-gray-50"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity & Wishlist */}
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex items-center rounded-xl border border-gray-200 bg-white p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="h-9 w-9 rounded-lg text-gray-600 hover:bg-gray-100 font-bold transition flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-sm font-bold text-gray-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="h-9 w-9 rounded-lg text-gray-600 hover:bg-gray-100 font-bold transition flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border transition ${
                      isWishlisted
                        ? "border-red-200 bg-red-50 text-red-600"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-400"
                    }`}
                    aria-label="Save to Wishlist"
                  >
                    <Heart
                      className={`h-5 w-5 ${isWishlisted ? "fill-red-500" : ""}`}
                    />
                  </button>
                </div>

                {/* Purchase Actions */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 inline-flex items-center justify-center gap-2 rounded-2xl py-4 px-6 font-bold text-sm shadow-md transition active:scale-95 ${
                      addedSuccess
                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                        : "bg-black text-white hover:bg-neutral-800"
                    }`}
                  >
                    {addedSuccess ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span>Added to Cart ({quantity})</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="h-4 w-4" />
                        <span>Add to Cart • ${(product.price * quantity).toFixed(2)}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleAddToCart}
                    className="inline-flex items-center justify-center rounded-2xl border border-gray-300 bg-gray-50 py-4 px-6 text-sm font-bold text-gray-900 hover:border-black hover:bg-white transition active:scale-95"
                  >
                    Instant Checkout
                  </button>
                </div>

                {/* Tabs: Highlights vs Specs */}
                <div className="mt-8 border-t border-gray-150 pt-6">
                  <div className="flex border-b border-gray-200">
                    <button
                      onClick={() => setActiveTab("highlights")}
                      className={`pb-2.5 text-xs font-bold uppercase tracking-wider transition ${
                        activeTab === "highlights"
                          ? "border-b-2 border-black text-black"
                          : "text-gray-400 hover:text-gray-700"
                      }`}
                    >
                      Key Highlights
                    </button>
                    <button
                      onClick={() => setActiveTab("specs")}
                      className={`ml-6 pb-2.5 text-xs font-bold uppercase tracking-wider transition ${
                        activeTab === "specs"
                          ? "border-b-2 border-black text-black"
                          : "text-gray-400 hover:text-gray-700"
                      }`}
                    >
                      Tech Specs
                    </button>
                  </div>

                  <div className="mt-4">
                    {activeTab === "highlights" ? (
                      <ul className="space-y-2 text-xs text-gray-600">
                        {product.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="rounded-xl bg-gray-50 p-2.5 border border-gray-100">
                          <span className="block text-[10px] uppercase font-bold text-gray-400">
                            Cushioning
                          </span>
                          <span className="font-semibold text-gray-900">
                            {product.specs.cushioning}
                          </span>
                        </div>
                        <div className="rounded-xl bg-gray-50 p-2.5 border border-gray-100">
                          <span className="block text-[10px] uppercase font-bold text-gray-400">
                            Drop
                          </span>
                          <span className="font-semibold text-gray-900">
                            {product.specs.drop}
                          </span>
                        </div>
                        <div className="rounded-xl bg-gray-50 p-2.5 border border-gray-100">
                          <span className="block text-[10px] uppercase font-bold text-gray-400">
                            Weight
                          </span>
                          <span className="font-semibold text-gray-900">
                            {product.specs.weight}
                          </span>
                        </div>
                        <div className="rounded-xl bg-gray-50 p-2.5 border border-gray-100">
                          <span className="block text-[10px] uppercase font-bold text-gray-400">
                            Surface
                          </span>
                          <span className="font-semibold text-gray-900">
                            {product.specs.surface}
                          </span>
                        </div>
                        <div className="rounded-xl bg-gray-50 p-2.5 border border-gray-100">
                          <span className="block text-[10px] uppercase font-bold text-gray-400">
                            Closure
                          </span>
                          <span className="font-semibold text-gray-900">
                            {product.specs.closure}
                          </span>
                        </div>
                        <div className="rounded-xl bg-gray-50 p-2.5 border border-gray-100">
                          <span className="block text-[10px] uppercase font-bold text-gray-400">
                            Upper
                          </span>
                          <span className="font-semibold text-gray-900">
                            {product.specs.upperMaterial}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* You May Also Like / Related Shoes */}
        <div className="mt-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-gray-950">
              You May Also Like
            </h2>
            <Link href="/shoes" className="text-xs font-bold text-gray-600 hover:text-black hover:underline">
              View all shoes
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedShoes.map((item) => (
              <Link
                key={item.id}
                href={`/shoes/${item.id}`}
                className="group flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-xs hover:border-black hover:shadow-lg transition duration-200"
              >
                <div>
                  <div className="relative mb-3 flex h-40 w-full items-center justify-center rounded-xl bg-gray-50 p-2">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={280}
                      height={200}
                      className="h-auto max-h-32 w-auto object-contain transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-sm text-gray-950 line-clamp-1 group-hover:text-blue-600 transition">
                    {item.name}
                  </h3>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="font-black text-gray-950">${item.price.toFixed(2)}</span>
                  <span className="flex items-center gap-1 font-bold text-gray-700">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    {item.rating}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
